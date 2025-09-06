Write-Host "Installing TypeDB..." -ForegroundColor Green
$installPath = "$env:LOCALAPPDATA\TypeDB"
iwr "https://repo.typedb.com/public/public-release/raw/names/typedb-all-windows-x86_64/versions/latest/download" -OutFile "$env:TEMP\typedb.zip"

Write-Host "Extracting to $installPath..." -ForegroundColor Yellow
Expand-Archive "$env:TEMP\typedb.zip" -DestinationPath $installPath -Force
Remove-Item "$env:TEMP\typedb.zip"

Write-Host "Adding to PATH..." -ForegroundColor Yellow
$typedbFolder = Get-ChildItem $installPath -Directory | Where-Object {$_.Name -like "typedb-all-windows-x86_64*"} | Sort-Object Name -Descending | Select-Object -First 1
$typedbPath = $typedbFolder.FullName

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
