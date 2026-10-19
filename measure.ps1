Add-Type -AssemblyName System.Drawing

$files = @(
    "d:\Experiment_with_antigrabity\Chapcha_practice\assets\challenges\challenge_1_panda.png",
    "d:\Experiment_with_antigrabity\Chapcha_practice\assets\challenges\challenge_2_elephant.jpg",
    "d:\Experiment_with_antigrabity\Chapcha_practice\assets\challenges\challenge_3_bicycle.png",
    "d:\Experiment_with_antigrabity\Chapcha_practice\assets\challenges\challenge_4_elephant.jpg",
    "d:\Experiment_with_antigrabity\Chapcha_practice\assets\challenges\challenge_5_panda.png"
)

foreach ($f in $files) {
    $bmp = New-Object System.Drawing.Bitmap($f)
    $w = $bmp.Width
    $h = $bmp.Height
    
    # Scan for yellow button at bottom (Y > 0.75 * H)
    $btnMinX = 9999; $btnMaxX = 0; $btnMinY = 9999; $btnMaxY = 0
    $gridMinX = 9999; $gridMaxX = 0; $gridMinY = 9999; $gridMaxY = 0
    
    for ($y = [int]($h * 0.15); $y -lt [int]($h * 0.88); $y += 3) {
        for ($x = [int]($w * 0.02); $x -lt [int]($w * 0.98); $x += 3) {
            $p = $bmp.GetPixel($x, $y)
            # Grid pixels are colorful non-white (the background of the card is white #FFFFFF)
            if ($p.R -lt 250 -or $p.G -lt 250 -or $p.B -lt 250) {
                if ($x -lt $gridMinX) { $gridMinX = $x }
                if ($x -gt $gridMaxX) { $gridMaxX = $x }
                if ($y -lt $gridMinY) { $gridMinY = $y }
                if ($y -gt $gridMaxY) { $gridMaxY = $y }
            }
        }
    }
    
    for ($y = [int]($h * 0.80); $y -lt $h; $y += 2) {
        for ($x = [int]($w * 0.40); $x -lt $w; $x += 2) {
            $p = $bmp.GetPixel($x, $y)
            if ($p.R -gt 220 -and $p.G -gt 180 -and $p.B -lt 80) {
                if ($x -lt $btnMinX) { $btnMinX = $x }
                if ($x -gt $btnMaxX) { $btnMaxX = $x }
                if ($y -lt $btnMinY) { $btnMinY = $y }
                if ($y -gt $btnMaxY) { $btnMaxY = $y }
            }
        }
    }
    
    $bmp.Dispose()
    Write-Host "$([System.IO.Path]::GetFileName($f)) ($w x $h)"
    Write-Host "  Grid: X=($gridMinX..$gridMaxX), Y=($gridMinY..$gridMaxY) -> W=$($gridMaxX-$gridMinX), H=$($gridMaxY-$gridMinY)"
    Write-Host "  Button: X=($btnMinX..$btnMaxX), Y=($btnMinY..$btnMaxY)"
}
