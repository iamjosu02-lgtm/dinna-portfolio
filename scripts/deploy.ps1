# Dinna Michael Portfolio — One-click deploy helper
# Run in PowerShell:  .\scripts\deploy.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$env:Path = "C:\Program Files\nodejs;C:\Program Files\Git\cmd;" + $env:Path

Write-Host "`n=== 1. Copy video backgrounds ===" -ForegroundColor Cyan
$src = Join-Path $Root "wall*.mp4"
$dest = Join-Path $Root "frontend\assets\videos"
if (Test-Path (Join-Path $Root "wall1.mp4")) {
  Copy-Item $src -Destination $dest -Force
  Write-Host "Videos copied to frontend/assets/videos/" -ForegroundColor Green
} else {
  Write-Host "Videos already in assets folder (or add wall1-wall7 to project root)." -ForegroundColor Yellow
}

Write-Host "`n=== 2. Deploy FRONTEND to Vercel ===" -ForegroundColor Cyan
Set-Location $Root
npx --yes vercel@latest deploy --prod
if ($LASTEXITCODE -ne 0) { throw "Vercel deploy failed. Run: npx vercel login" }

$vercelUrl = (npx --yes vercel@latest ls --prod 2>$null | Select-String "https://" | Select-Object -First 1)
Write-Host "Frontend URL: $vercelUrl" -ForegroundColor Green

Write-Host "`n=== 3. Deploy BACKEND to Render ===" -ForegroundColor Cyan
Write-Host @"

Render requires a GitHub repository (free):

  A) Push this project to GitHub:
     - Create repo: https://github.com/new  (name: dinna-portfolio)
     - Then run:
       cd "$Root"
       git remote add origin https://github.com/YOUR_USERNAME/dinna-portfolio.git
       git branch -M main
       git push -u origin main

  B) On https://dashboard.render.com:
     - New +  -> Blueprint  -> Connect repo  -> select dinna-portfolio
     - Or: New Web Service -> Root Directory: backend -> Build: npm install -> Start: npm start
     - Add env: FRONTEND_URL = your Vercel URL

  C) After Render deploys, copy the URL (e.g. https://dinna-portfolio-api.onrender.com)
     Edit frontend/js/config.js -> API_BASE_URL -> commit & redeploy on Vercel.

"@ -ForegroundColor White

Write-Host "Done. Open frontend/index.html locally or use your Vercel URL." -ForegroundColor Green
