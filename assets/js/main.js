import { products, productById } from "./products.js";
import {
  addToCart, cartCount, cartSubtotal, createInitialState, filterProducts,
  normalizeState, selectProduct, setCartQuantity, toggleFavorite
} from "./store.js";
import { loadState, saveState } from "./persistence.js";

let state=normalizeState(loadState() ?? createInitialState());

const $=(selector)=>document.querySelector(selector);
const $$=(selector)=>[...document.querySelectorAll(selector)];

const productGrid=$("[data-product-grid]");
const heroImage=$("[data-hero-image]");
const heroName=$("[data-hero-name]");
const heroPrice=$("[data-hero-price]");
const cartCountNode=$("[data-cart-count]");
const cartItems=$("[data-cart-items]");
const cartSubtotalNode=$("[data-cart-subtotal]");
const cartDrawer=$("[data-cart-drawer]");
const cartBackdrop=$("[data-cart-backdrop]");
const searchInput=$("[data-search]");
const favoritesToggle=$("[data-favorites-only]");
const menuButton=$("[data-menu-toggle]");
const nav=$("[data-nav]");

function money(value){ return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(value); }

function persistAndRender(){
  saveState(state);
  render();
}

function renderHero(){
  const product=productById(state.selectedId) ?? products[0];
  heroImage.src=product.image;
  heroImage.alt=product.name;
  heroName.textContent=product.name;
  heroPrice.textContent=money(product.price);

  $$(".swatch").forEach((button)=>{
    button.setAttribute("aria-pressed",String(button.dataset.productId===product.id));
  });
}

function productCard(product){
  const favorite=state.favorites.includes(product.id);
  const article=document.createElement("article");
  article.className="product-card";
  article.innerHTML=`
    <button class="product-card__media" type="button" data-select="${product.id}" aria-label="Preview ${product.name}">
      <img src="${product.image}" alt="" width="420" height="320" loading="lazy">
    </button>
    <div class="product-card__body">
      <div class="product-card__meta"><span>${product.color}</span><span>${product.tags[0]}</span></div>
      <h3>${product.name}</h3>
      <div class="product-card__footer">
        <strong>${money(product.price)}</strong>
        <div class="product-card__actions">
          <button type="button" data-favorite="${product.id}" aria-pressed="${favorite}" aria-label="${favorite?"Remove":"Add"} ${product.name} ${favorite?"from":"to"} favorites">${favorite?"♥":"♡"}</button>
          <button type="button" data-add="${product.id}" aria-label="Add ${product.name} to cart">Add</button>
        </div>
      </div>
    </div>`;
  return article;
}

function renderProducts(){
  const visible=filterProducts(products,searchInput.value,favoritesToggle.checked,state.favorites);
  productGrid.replaceChildren(...visible.map(productCard));
  $("[data-result-count]").textContent=`${visible.length} product${visible.length===1?"":"s"}`;
}

function renderCart(){
  cartCountNode.textContent=String(cartCount(state));
  const entries=Object.entries(state.cart);
  cartItems.replaceChildren();

  if(!entries.length){
    const empty=document.createElement("p");
    empty.className="cart-empty";
    empty.textContent="Your cart is empty.";
    cartItems.append(empty);
  } else {
    entries.forEach(([id,qty])=>{
      const product=productById(id);
      if(!product) return;
      const row=document.createElement("div");
      row.className="cart-row";
      row.innerHTML=`
        <img src="${product.image}" alt="" width="64" height="64">
        <div><strong>${product.name}</strong><span>${money(product.price)}</span></div>
        <label><span class="sr-only">Quantity for ${product.name}</span>
          <input type="number" min="0" max="99" value="${qty}" data-qty="${id}">
        </label>`;
      cartItems.append(row);
    });
  }

  cartSubtotalNode.textContent=money(cartSubtotal(state,products));
}

function render(){
  renderHero();
  renderProducts();
  renderCart();
}

function setCartOpen(open){
  cartDrawer.hidden=!open;
  cartBackdrop.hidden=!open;
  document.body.classList.toggle("no-scroll",open);
  $("[data-cart-toggle]").setAttribute("aria-expanded",String(open));
  if(open) cartDrawer.querySelector("button")?.focus();
}

document.addEventListener("click",(event)=>{
  const target=event.target.closest("button,a");
  if(!target) return;

  if(target.matches("[data-select]")){
    state=selectProduct(state,target.dataset.select);
    persistAndRender();
    document.querySelector("#configurator")?.scrollIntoView({behavior:"smooth"});
  }
  if(target.matches("[data-add]")){
    state=addToCart(state,target.dataset.add);
    persistAndRender();
    setCartOpen(true);
  }
  if(target.matches("[data-favorite]")){
    state=toggleFavorite(state,target.dataset.favorite);
    persistAndRender();
  }
  if(target.matches(".swatch")){
    state=selectProduct(state,target.dataset.productId);
    persistAndRender();
  }
  if(target.matches("[data-cart-toggle]")) setCartOpen(true);
  if(target.matches("[data-cart-close]")) setCartOpen(false);
});

cartBackdrop.addEventListener("click",()=>setCartOpen(false));
document.addEventListener("keydown",(event)=>{ if(event.key==="Escape") setCartOpen(false); });
searchInput.addEventListener("input",renderProducts);
favoritesToggle.addEventListener("change",renderProducts);
cartItems.addEventListener("change",(event)=>{
  if(event.target.matches("[data-qty]")){
    state=setCartQuantity(state,event.target.dataset.qty,event.target.value);
    persistAndRender();
  }
});
menuButton.addEventListener("click",()=>{
  const open=nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded",String(open));
});
$$("[data-nav] a").forEach((link)=>link.addEventListener("click",()=>{
  nav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded","false");
}));
$("[data-demo-form]").addEventListener("submit",(event)=>{
  event.preventDefault();
  $("[data-form-status]").textContent="Demo form validated locally. No message was sent.";
  event.currentTarget.reset();
});
$("[data-newsletter]").addEventListener("submit",(event)=>{
  event.preventDefault();
  $("[data-newsletter-status]").textContent="Demo subscription saved locally only.";
  event.currentTarget.reset();
});

render();
