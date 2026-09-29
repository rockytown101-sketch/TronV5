$ErrorActionPreference='Stop'
Set-Location (Join-Path $PSScriptRoot '..')
if ((Get-Command docker -ErrorAction SilentlyContinue) -eq $null) { throw '未检测到 Docker Desktop。请先安装 Docker Desktop。' }
if (!(Test-Path '.env')) { Copy-Item '.env.example' '.env'; throw '已创建 .env。请填写 POSTGRES_PASSWORD、API_KEY、INTERNAL_WATCHER_KEY、AB_SIGNER_A、AB_SIGNER_B、WATCHED_RECEIVING_ADDRESS 后重新运行。' }
$envText=Get-Content '.env' -Raw
if ($envText -match 'CHANGE_ME|PUT_A_ADDRESS_HERE|PUT_B_ADDRESS_HERE|PUT_YOUR_MONITORED_RECEIVING_ADDRESS_HERE') { throw '.env 仍包含占位符，请先完成配置。' }
docker compose -f deploy/docker-compose.yml up -d --build
