
document.getElementById('year')?.textContent = new Date().getFullYear();
document.getElementById('year2')?.textContent = new Date().getFullYear();

// small helper to open .usdz on iOS (Quick Look)
function openAR(usdzPath){
  const a = document.createElement('a');
  a.href = usdzPath;
  a.rel = 'ar';
  a.click();
}
window.openAR = openAR;
