# 💾 SESSION SAVE — LongLineTracker

Run this ANY time progress is made.

---

## 1) LOCAL BACKUP SNAPSHOT

cd D:\LongLineTracker

$stamp = Get-Date -Format "yyyy-MM-dd_HHmmss"
$dest = "D:\LongLineTracker\backups\session_$stamp"

mkdir $dest | Out-Null

robocopy .\long-line-tracker "$dest\long-line-tracker" /E /NFL /NDL /NJH /NJS | Out-Null

echo "Backup saved to:"
echo $dest

---

## 2) GIT SAVE

git add .
git commit -m "Session save $stamp"
git push

---

## 3) VERIFY CLEAN STATE

git status

Must show:

nothing to commit, working tree clean

---

SESSION SAFELY SAVED.
