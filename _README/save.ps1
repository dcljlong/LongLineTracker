Set-Location "D:\LongLineTracker"

$stamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$dest  = "D:\LongLineTracker\backups\session_$stamp"
New-Item -ItemType Directory -Force -Path $dest | Out-Null
robocopy "." "$dest\repo" /E /NFL /NDL /NJH /NJS | Out-Null
Write-Host "Backup: $dest"

git add .
git commit -m "Session save $stamp"
git push
git status
