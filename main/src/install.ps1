Write-Host "Installing TypeDB..." -ForegroundColor Green
$installPath = "$env:LOCALAPPDATA\TypeDB"
iwr "https://repo.typedb.com/public/public-release/raw/names/typedb-all-windows-x86_64/versions/latest/download" -OutFile "$env:TEMP\typedb.zip"

Write-Host "Extracting to $installPath..." -ForegroundColor Yellow
# Create a temporary extraction directory
$tempExtractPath = "$env:TEMP\typedb_extract"
Expand-Archive "$env:TEMP\typedb.zip" -DestinationPath $tempExtractPath -Force

# Find the extracted folder (with version/arch info)
$extractedFolder = Get-ChildItem $tempExtractPath -Directory | Where-Object {$_.Name -like "typedb-all-windows-x86_64*"} | Select-Object -First 1

# Move contents to clean install path
if (Test-Path $installPath) {
    Remove-Item $installPath -Recurse -Force
}
Move-Item $extractedFolder.FullName $installPath

# Clean up
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
Write-Host "Get started using the following commands:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  View TypeDB Console CLI options:" -ForegroundColor White
Write-Host "    typedb console --help" -ForegroundColor Gray
Write-Host "  Run a local database server (you'll need to allow network access when prompted):" -ForegroundColor White
Write-Host "    typedb server" -ForegroundColor Gray
Write-Host "  Read the docs:" -ForegroundColor White
Write-Host "    https://typedb.com/docs/home/get-started/" -ForegroundColor Gray
Write-Host ""
