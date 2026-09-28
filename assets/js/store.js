export function createInitialState() {
  return { selectedId:"grey-white", cart:{}, favorites:[] };
}

export function normalizeState(value) {
  const base=createInitialState();
  const source=value && typeof value==="object" ? value : {};
  const cart={};
  if (source.cart && typeof source.cart==="object") {
    for (const [id,qty] of Object.entries(source.cart)) {
      const amount=Math.max(0,Math.trunc(Number(qty)||0));
      if (amount>0) cart[id]=amount;
    }
  }
  const favorites=Array.isArray(source.favorites) ? [...new Set(source.favorites.filter((id)=>typeof id==="string"))] : [];
  return {
    selectedId: typeof source.selectedId==="string" ? source.selectedId : base.selectedId,
    cart,
    favorites
  };
}

export function addToCart(state,id,amount=1) {
  const next=normalizeState(state);
  const qty=Math.max(1,Math.trunc(Number(amount)||1));
  return {...next,cart:{...next.cart,[id]:(next.cart[id]||0)+qty}};
}

export function setCartQuantity(state,id,quantity) {
  const next=normalizeState(state);
  const qty=Math.max(0,Math.trunc(Number(quantity)||0));
  const cart={...next.cart};
  if(qty===0) delete cart[id]; else cart[id]=qty;
  return {...next,cart};
}

export function toggleFavorite(state,id) {
  const next=normalizeState(state);
  const exists=next.favorites.includes(id);
  return {...next,favorites:exists?next.favorites.filter((item)=>item!==id):[...next.favorites,id]};
}

export function selectProduct(state,id) {
  const next=normalizeState(state);
  return {...next,selectedId:id};
}

export function cartCount(state) {
  return Object.values(normalizeState(state).cart).reduce((sum,qty)=>sum+qty,0);
}

export function cartSubtotal(state,products) {
  const map=new Map(products.map((p)=>[p.id,p.price]));
  return Object.entries(normalizeState(state).cart).reduce((sum,[id,qty])=>sum+(map.get(id)||0)*qty,0);
}

export function filterProducts(products,query="",favoritesOnly=false,favorites=[]) {
  const term=String(query).trim().toLowerCase();
  const fav=new Set(favorites);
  return products.filter((p)=>{
    const matchFav=!favoritesOnly||fav.has(p.id);
    const hay=[p.name,p.color,...p.tags].join(" ").toLowerCase();
    return matchFav && (!term || hay.includes(term));
  });
}
