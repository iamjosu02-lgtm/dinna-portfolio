# Optional: update config.js with your Render API URL after deploy
param(
  [Parameter(Mandatory = $true)]
  [string]$RenderUrl
)

$configPath = Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) "..\frontend\js\config.js"
$content = Get-Content $configPath -Raw
$content = $content -replace "https://YOUR-RENDER-APP-NAME\.onrender\.com", $RenderUrl.TrimEnd('/')
Set-Content $configPath $content -NoNewline
Write-Host "Updated API_BASE_URL to $RenderUrl" -ForegroundColor Green
Write-Host "Redeploy frontend: npx vercel deploy --prod" -ForegroundColor Yellow
