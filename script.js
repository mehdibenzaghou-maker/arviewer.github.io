// Simple site script that loads data.json and renders the pages.
// Designed to work on GitHub Pages (static files).
async function fetchData(){
  const res = await fetch('data.json');
  return await res.json();
}

function makeCard(dish){
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <img src="${dish.image}" alt="${dish.name}" />
    <h3>${dish.name}</h3>
    <p class="price">${dish.price}</p>
    <a class="btn" href="dish.html?id=${encodeURIComponent(dish.id)}">View</a>
  `;
  return div;
}

function getQueryParam(name){
  const url = new URL(location.href);
  return url.searchParams.get(name);
}

async function renderIndex(){
  const data = await fetchData();
  const grid = document.getElementById('dishes-grid');
  data.dishes.forEach(d => {
    grid.appendChild(makeCard(d));
  });
}

async function renderDish(){
  const id = getQueryParam('id');
  if(!id){
    document.getElementById('dish-detail').innerHTML = '<p>Dish not found.</p>';
    return;
  }
  const data = await fetchData();
  const dish = data.dishes.find(x => x.id === id);
  if(!dish){
    document.getElementById('dish-detail').innerHTML = '<p>Dish not found.</p>';
    return;
  }

  const container = document.getElementById('dish-detail');
  container.innerHTML = `
    <div class="dish-header">
      <img src="${dish.image}" alt="${dish.name}" />
      <div class="dish-meta">
        <h2>${dish.name}</h2>
        <p class="price">${dish.price}</p>
        <p class="dish-description">${dish.description}</p>
        <p style="margin-top:12px;">
          <a id="ar-btn" class="btn" href="${dish.usdz}" rel="ar">View in AR</a>
        </p>
        <p style="margin-top:10px;color:#6b7280">Tip: On iOS, tapping "View in AR" opens the USDZ in the AR Quick Look viewer.</p>
      </div>
    </div>
  `;

  // For iOS AR Quick Look, linking the .usdz file directly is sufficient.
  // If you later host large .usdz files, keep them in /assets/ and update data.json accordingly.
}

window.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('dishes-grid')){
    renderIndex();
  } else if(document.getElementById('dish-detail')){
    renderDish();
  }
});
