Set-Location "D:\LongLineTracker"

$stamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$dest  = "D:\LongLineTracker\backups\session_$stamp"

New-Item -ItemType Directory -Force -Path $dest | Out-Null
robocopy ".\long-line-tracker" "$dest\long-line-tracker" /E /NFL /NDL /NJH /NJS | Out-Null

Write-Host ""
Write-Host "Backup created at:"
Write-Host $dest
Write-Host ""

git add .
git commit -m "Session save $stamp"
git push

git status
