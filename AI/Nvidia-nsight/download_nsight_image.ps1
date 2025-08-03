<#  PowerShell 7.x 전용: Nsight Compute 스크린샷 자동 다운로드  #>

# 필요한 경우 TLS 1.2 강제 (구형 Windows/Proxy 환경 대응)
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# ▶ 내려받을 JPG 해상도 목록 — 원하는 크기를 추가해도 됨
$sizes  = @('2000x1125', '1260x708', '630x354')
$base   = 'https://d29g4g2dyqv443.cloudfront.net/sites/default/files/akamai/nsight/nsight-compute-correlate-source-code-'
$referer = 'https://developer.nvidia.com/nsight-compute'

# ▶ JPG 순차 시도
foreach ($size in $sizes) {
    $url      = "$base$size.jpg"
    $outFile  = "nsight-compute-correlate-source-code-$size.jpg"
    Write-Host "Trying $url"

    try {
        Invoke-WebRequest -Uri $url -OutFile $outFile -ErrorAction Stop
        Write-Host "✓  downloaded  $outFile"
        exit 0                      # 하나라도 성공하면 스크립트 종료
    } catch {
        Write-Host "✗  failed  ($($_.Exception.Response.StatusCode))"
    }
}

# ▶ JPG가 모두 실패했으면 원본 PNG 재시도 (Referer 필요)
$pngUrl   = 'https://d29g4g2dyqv443.cloudfront.net/sites/default/files/akamai/nsight-compute/images/correlate-source-code-dark.png'
$pngOut   = 'correlate-source-code-dark.png'
Write-Host "Falling back to PNG with Referer…"

try {
    Invoke-WebRequest -Uri $pngUrl -Headers @{ Referer = $referer } `
                      -OutFile $pngOut -ErrorAction Stop
    Write-Host "✓  downloaded  $pngOut"
} catch {
    Write-Host "✗  all attempts failed." ; exit 1
}
