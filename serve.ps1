# UluKontrol Yerel PWA Test Sunucusu
$port = 5173
$root = $PSScriptRoot

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  UluKontrol PWA Yerel Test Sunucusu    " -ForegroundColor Green
Write-Host "  Adres: http://localhost:$port         " -ForegroundColor Yellow
Write-Host "  Durdurmak için Ctrl+C tuşlarına basın  " -ForegroundColor Gray
Write-Host "=========================================" -ForegroundColor Cyan

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Start-Process "http://localhost:$port"
} catch {
    Write-Warning "HttpListener başlatılamadı. Dosya doğrudan varsayılan tarayıcıda açılıyor..."
    Start-Process (Join-Path $root "index.html")
    exit
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($path)) { $path = "index.html" }

        $filePath = Join-Path $root $path

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length
            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 - Dosya Bulunamadı")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    } catch {
        # İstek işleme hatası
    }
}
