le cinq - Package
--------------
This package contains a simple two-page static website (Accueil + Menu) with:
 - Black / White / Orange color theme
 - SVG '5' logo (assets/logo.svg)
 - Examples of model-viewer integration (replace assets/placeholder.glb and assets/placeholder.usdz with your real 3D files)
 - index.html and menu.html
 - css/style.css and js/main.js

How to use:
1. Unzip le_cinq_website.zip
2. Upload the folder contents to your GitHub repo (root of the repo or gh-pages branch)
3. Replace assets/placeholder.glb and assets/placeholder.usdz with your actual models.
   - For iOS Quick Look, ensure .usdz file is reachable and linked via ios-src in <model-viewer>.
   - For web preview, provide a .glb/.gltf file as src.
4. If you have many .usdz files, upload them to Cloudflare R2 or your static host and update paths in menu.html.
5. The "Voir en AR" button attempts to open the .usdz directly (iOS). Model-viewer also provides AR via scene-viewer / webxr.

Notes:
- The placeholder model files in this package are dummy files; replace them before production.
- This is a starting template matching your requested colors and name "le cinq". Modify content and images as needed.

If you want, I can:
 - Replace placeholder models with real GLB/USDZ files you upload.
 - Generate a higher-fidelity logo (SVG or PNG variants).
 - Bundle with a ready GitHub repository structure and a deploy script.

