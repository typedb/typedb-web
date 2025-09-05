if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Start-Process powershell "-Command `"iwr https://your-domain.com/install-typedb.ps1 -useb | iex`"" -Verb RunAs
    exit
}

Write-Host "Installing TypeDB..." -ForegroundColor Green
iwr "https://repo.typedb.com/public/public-release/raw/names/typedb-all-windows-x86_64/versions/latest/download" -OutFile "$env:TEMP\typedb.zip"

Write-Host "Extracting to Program Files..." -ForegroundColor Yellow
Expand-Archive "$env:TEMP\typedb.zip" -DestinationPath "C:\Program Files\" -Force
Remove-Item "$env:TEMP\typedb.zip"

Write-Host "Adding to PATH..." -ForegroundColor Yellow
$typedbFolder = Get-ChildItem "C:\Program Files\" -Directory | Where-Object {$_.Name -like "typedb-all-windows-x86_64*"} | Sort-Object Name -Descending | Select-Object -First 1
$typedbPath = $typedbFolder.FullName
$path = [Environment]::GetEnvironmentVariable('PATH', 'Machine')
$newPath = ($path -split ';' | Where-Object {$_ -notlike '*typedb*'}) -join ';'
[Environment]::SetEnvironmentVariable('PATH', $newPath + ';' + $typedbPath, 'Machine')

Write-Host "Refreshing PATH in current session..." -ForegroundColor Yellow
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")

Write-Host "TypeDB installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Get started using the following commands:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  View TypeDB Console CLI options:" -ForegroundColor White
Write-Host "    typedb console --help" -ForegroundColor Gray
Write-Host "  Run a local database server:" -ForegroundColor White
Write-Host "    typedb server" -ForegroundColor Gray
Write-Host "  Read the docs:" -ForegroundColor White
Write-Host "    https://typedb.com/docs/home/get-started/" -ForegroundColor Gray
Write-Host ""
