param(
  [Parameter(Mandatory = $true)]
  [string]$FirebaseServiceAccountPath,

  [string]$Repo = "lmatekenya/Bocra-Hackathon-Frontend",
  [string]$ApiUrl = "https://bocra-hackathon-backend-production.up.railway.app",
  [string]$SiteUrl = "https://bocra-web.web.app",
  [string]$TurnstileSiteKey = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $FirebaseServiceAccountPath)) {
  throw "Firebase service account file not found: $FirebaseServiceAccountPath"
}

gh --version | Out-Null
gh auth status | Out-Null

$serviceAccountJson = Get-Content -LiteralPath $FirebaseServiceAccountPath -Raw

$serviceAccountJson | gh secret set FIREBASE_SERVICE_ACCOUNT_BOCRA_WEB --repo $Repo
gh secret set NEXT_PUBLIC_API_URL --repo $Repo --body $ApiUrl
gh secret set NEXT_PUBLIC_SITE_URL --repo $Repo --body $SiteUrl

if ($TurnstileSiteKey -and $TurnstileSiteKey.Trim().Length -gt 0) {
  gh secret set NEXT_PUBLIC_TURNSTILE_SITE_KEY --repo $Repo --body $TurnstileSiteKey.Trim()
}

Write-Host "GitHub Actions secrets configured for $Repo"
