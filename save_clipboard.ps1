# Save Clipboard Image to Workspace Utility
# This script extracts any image from the Windows clipboard and saves it as a PNG, keeping a historical record.

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

try {
    if ([System.Windows.Forms.Clipboard]::ContainsImage()) {
        $image = [System.Windows.Forms.Clipboard]::GetImage()
        
        # Find next available sequential suffix
        $i = 1
        while (Test-Path (Join-Path $PSScriptRoot "screenshot_$i.png")) {
            $i++
        }
        $suffixPath = Join-Path $PSScriptRoot "screenshot_$i.png"
        $mainPath = Join-Path $PSScriptRoot "screenshot.png"
        
        # Save to the sequential path
        $image.Save($suffixPath, [System.Drawing.Imaging.ImageFormat]::Png)
        
        # Copy to the main screenshot path for the web app to load
        Copy-Item -Path $suffixPath -Destination $mainPath -Force
        
        $image.Dispose()
        Write-Output "[OK] Clipboard image saved successfully as: screenshot_$i.png"
        Write-Output "[OK] Copied to: screenshot.png for live app reload"
    } else {
        Write-Output "[!] Clipboard does not contain an image. Please copy an image (e.g. via Alt+PrintScreen) and run again."
    }
} catch {
    Write-Output "[ERR] Failed to extract image: $_"
}
