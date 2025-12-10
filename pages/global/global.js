/* global.js - incluir em todas as páginas logo antes do </body> */
/* funcionalidades: menu mobile, dropdown, carrinho simples, lazy maps, busca */
(function(){
  // mobile menu toggle
  const mobileBtn = document.getElementById('mobile-btn');
  const navLinks = document.querySelector('.nav-links');
  if(mobileBtn && navLinks){
    mobileBtn.addEventListener('click', ()=>{
      const shown = navLinks.style.display === 'flex';
      navLinks.style.display = shown ? 'none' : 'flex';
      mobileBtn.innerText = shown ? '☰' : '✕';
    });
  }

  // dropdown cardapio
  document.querySelectorAll('.drop-btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const menu = btn.nextElementSibling;
      if(!menu) return;
      const open = menu.style.display === 'block';
      document.querySelectorAll('.dropdown-menu').forEach(m=>m.style.display='none');
      menu.style.display = open ? 'none' : 'block';
      btn.setAttribute('aria-expanded', !open);
    });
  });
  // click outside to close dropdown
  document.addEventListener('click', e=>{
    if(!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(m=>m.style.display='none');
    }
  });

  // simple cart (localStorage)
  const cartKey = 'tempera_cart_v1';
  function getCart(){ try{ return JSON.parse(localStorage.getItem(cartKey)||'[]')}catch(e){return []}}
  function setCart(c){ localStorage.setItem(cartKey,JSON.stringify(c)); updateCartCount(); }
  function updateCartCount(){
    const el = document.querySelector('.cart-count');
    if(!el) return;
    const count = getCart().reduce((s,i)=>s+i.qty,0);
    el.innerText = count;
  }
  updateCartCount();

  // add-to-cart helper (delegation)
  document.addEventListener('click', e=>{
    const add = e.target.closest('[data-add-to-cart]');
    if(!add) return;
    const id = add.dataset.id||Date.now();
    const title = add.dataset.title||'Item';
    const price = parseFloat(add.dataset.price||0);
    const cart = getCart();
    const found = cart.find(it=>it.id==id);
    if(found) found.qty++;
    else cart.push({id,title,price,qty:1});
    setCart(cart);
    // feedback
    add.innerText = 'ADICIONADO ✓';
    setTimeout(()=> add.innerText = add.dataset.label || 'Adicionar', 1000);
  });

  // lazy load branch maps: click placeholder loads iframe src from data-src
  window.loadMap = function(el){
    const container = el.closest('.map-container') || el;
    const iframe = container.querySelector('iframe.branch-map');
    if(!iframe) return;
    if(iframe.getAttribute('src')) return;
    iframe.setAttribute('src', iframe.dataset.src);
    container.querySelector('.map-placeholder')?.remove();
  }

  // simple search (reads query param q or input)
  window.performSearch = function(q){
    q = (q||'').trim().toLowerCase();
    if(!q) { location.href = '/pages/busca/busca.html?q='; return; }
    // save to session and redirect to search page with q
    sessionStorage.setItem('tempera_last_search', q);
    location.href = '/pages/busca/busca.html?q=' + encodeURIComponent(q);
  }

  // fill search page with results (very simple demo)
  if(location.pathname.includes('/pages/busca/busca.html')){
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || sessionStorage.getItem('tempera_last_search') || '';
    document.addEventListener('DOMContentLoaded', ()=>{
      const input = document.getElementById('search-input');
      if(input) input.value = q;
      const results = document.getElementById('search-results');
      if(!results) return;
      if(!q){ results.innerHTML = '<p class="muted">Digite algo pra buscar pratos ou combos.</p>'; return; }
      // fake results array
      const catalog = [
        {id:'fit1',title:'Frango Fit',price:19.9,cat:'Fit'},
        {id:'veg1',title:'Bowl Vegano',price:21.9,cat:'Vegano'},
        {id:'low1',title:'Carne LowCarb',price:24.9,cat:'Low Carb'},
        {id:'mass1',title:'Massa Carbonara',price:28.9,cat:'Massas'},
      ];
      const filtered = catalog.filter(it=> it.title.toLowerCase().includes(q) || it.cat.toLowerCase().includes(q));
      if(filtered.length===0) results.innerHTML = `<p class="muted">Nenhum resultado pra "${q}"</p>`;
      else{
        results.innerHTML = filtered.map(it=>`
          <div class="result-item" style="background:rgba(255,255,255,0.02);padding:12px;border-radius:10px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center">
            <div>
              <strong>${it.title}</strong><div style="color:var(--muted);font-size:13px">${it.cat}</div>
            </div>
            <div style="display:flex;gap:8px;align-items:center">
              <div style="font-weight:700">R$ ${it.price.toFixed(2)}</div>
              <button class="btn small" data-add-to-cart data-id="${it.id}" data-title="${it.title}" data-price="${it.price}" data-label="Adicionar">Adicionar</button>
            </div>
          </div>
        `).join('');
      }
    })
  }

  // expose cart functions to page
  window.tempera = {
    getCart, setCart, updateCartCount,
    clearCart(){ setCart([]); }
  };

})();
