$ErrorActionPreference = "Stop"

Write-Host "Installing TypeDB..." -ForegroundColor Green
$installPath = "$env:LOCALAPPDATA\TypeDB"

# Check for existing installation with data BEFORE downloading
if (Test-Path $installPath) {
    Write-Host "Existing TypeDB installation found." -ForegroundColor Yellow

    # Check if there's a data directory that might contain databases
    $dataPath = Join-Path $installPath "server\data"
    if (Test-Path $dataPath) {
        $dataFiles = Get-ChildItem $dataPath -Recurse -File -ErrorAction SilentlyContinue
        if ($dataFiles.Count -gt 0) {
            Write-Host "" -ForegroundColor Red
            Write-Host "ERROR: Existing TypeDB data directory found at:" -ForegroundColor Red
            Write-Host "  $dataPath" -ForegroundColor White
            Write-Host "" -ForegroundColor Red
            Write-Host "This installer cannot safely upgrade an installation with existing databases." -ForegroundColor Yellow
            Write-Host "" -ForegroundColor Yellow
            Write-Host "To proceed safely:" -ForegroundColor Yellow
            Write-Host "  1. Export your databases using TypeDB's export feature. Choose a path outside the TypeDB directory. If you have customized your config file, consider backing it up too." -ForegroundColor White
            Write-Host "     See: https://typedb.com/docs/maintenance-operation/database-export-import/" -ForegroundColor Gray
            Write-Host "  2. Stop any running TypeDB server instances" -ForegroundColor White
            Write-Host "  3. Delete the TypeDB installation directory:" -ForegroundColor White
            Write-Host "     Remove-Item '$installPath' -Recurse -Force" -ForegroundColor Gray
            Write-Host "  4. Run this installer again" -ForegroundColor White
            Write-Host "  5. Import your databases back using TypeDB's import feature" -ForegroundColor White
            Write-Host "" -ForegroundColor Red
            exit 1
        }
    }

    # No data found, safe to remove
    try {
        Remove-Item $installPath -Recurse -Force -ErrorAction Stop
    } catch {
        Write-Host "" -ForegroundColor Red
        Write-Host "ERROR: Failed to remove existing TypeDB installation." -ForegroundColor Red
        Write-Host "This usually means TypeDB is currently running." -ForegroundColor Yellow
        Write-Host "" -ForegroundColor Red
        Write-Host "Please stop any running TypeDB processes and try again:" -ForegroundColor Yellow
        Write-Host "  1. Close any TypeDB server instances" -ForegroundColor White
        Write-Host "  2. Check Task Manager for 'typedb' processes" -ForegroundColor White
        Write-Host "  3. Run this installer again" -ForegroundColor White
        Write-Host "" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Downloading TypeDB..." -ForegroundColor Green
try {
    Invoke-WebRequest "https://repo.typedb.com/public/public-release/raw/names/typedb-all-windows-x86_64/versions/latest/download" -OutFile "$env:TEMP\typedb.zip"
} catch {
    Write-Host "Failed to download TypeDB: $_" -ForegroundColor Red
    exit 1
}

Write-Host "Extracting to $installPath..." -ForegroundColor Yellow
# Create a temporary extraction directory
$tempExtractPath = "$env:TEMP\typedb_extract"
Expand-Archive "$env:TEMP\typedb.zip" -DestinationPath $tempExtractPath -Force

# Find the extracted folder (with version/arch info)
$extractedFolder = Get-ChildItem $tempExtractPath -Directory | Where-Object {$_.Name -like "typedb-all-windows-x86_64*"} | Select-Object -First 1

try {
    Move-Item $extractedFolder.FullName $installPath -ErrorAction Stop
} catch {
    Write-Host "ERROR: Failed to install TypeDB to $installPath" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red

    # Clean up
    if (Test-Path "$env:TEMP\typedb.zip") {
        Remove-Item "$env:TEMP\typedb.zip" -Force
    }
    if (Test-Path $tempExtractPath) {
        Remove-Item $tempExtractPath -Recurse -Force
    }

    exit 1
}

# Clean up temporary files
Remove-Item "$env:TEMP\typedb.zip"
Remove-Item $tempExtractPath -Recurse -Force

Write-Host "Adding to PATH..." -ForegroundColor Yellow
# Now we can use the clean install path directly
$typedbPath = $installPath

# Update user PATH (not system PATH)
$userPath = [Environment]::GetEnvironmentVariable('PATH', 'User')
$newPath = ($userPath -split ';' | Where-Object {$_ -notlike '*typedb*'}) -join ';'
[Environment]::SetEnvironmentVariable('PATH', $newPath + ';' + $typedbPath, 'User')

# Refresh PATH in current session
$env:PATH = [Environment]::GetEnvironmentVariable('PATH', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('PATH', 'User')

Write-Host "TypeDB installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Installation directory: $installPath" -ForegroundColor Cyan
Write-Host "Installed version: $($extractedFolder.Name -replace 'typedb-all-windows-x86_64-', '')" -ForegroundColor Cyan
Write-Host ""
Write-Host "Get started using the following commands:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  View TypeDB Console CLI options:" -ForegroundColor White
Write-Host "    typedb console --help" -ForegroundColor Gray
Write-Host "  Run a local database server (you'll need to allow network access when prompted):" -ForegroundColor White
Write-Host "    typedb server" -ForegroundColor Gray
Write-Host "  Read the docs:" -ForegroundColor White
Write-Host "    https://typedb.com/docs/home/get-started/" -ForegroundColor Gray
Write-Host ""
