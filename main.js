
// Small JS helpers
document.getElementById('year')?.textContent = new Date().getFullYear();
document.getElementById('year2')?.textContent = new Date().getFullYear();

function openAR(usdzPath){
  // For iOS Quick Look: open the .usdz file directly
  // For scene-viewer on Android, model-viewer handles it when ar attribute is present.
  // This helper tries to open the .usdz in a new window (iOS).
  const a = document.createElement('a');
  a.href = usdzPath;
  a.rel = 'ar';
  a.click();
}
