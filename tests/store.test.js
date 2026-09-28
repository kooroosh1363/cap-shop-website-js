import test from "node:test";
import assert from "node:assert/strict";
import {
  addToCart, cartCount, cartSubtotal, createInitialState, filterProducts,
  setCartQuantity, toggleFavorite
} from "../assets/js/store.js";

const products=[
  {id:"a",name:"Alpha",color:"Black",price:10,tags:["classic"]},
  {id:"b",name:"Beta",color:"Green",price:20,tags:["outdoor"]}
];

test("cart math is deterministic",()=>{
  let state=createInitialState();
  state=addToCart(state,"a",2);
  state=addToCart(state,"b",1);
  assert.equal(cartCount(state),3);
  assert.equal(cartSubtotal(state,products),40);
});

test("setting quantity to zero removes a line",()=>{
  let state=addToCart(createInitialState(),"a");
  state=setCartQuantity(state,"a",0);
  assert.deepEqual(state.cart,{});
});

test("favorites toggle both directions",()=>{
  let state=toggleFavorite(createInitialState(),"a");
  assert.deepEqual(state.favorites,["a"]);
  state=toggleFavorite(state,"a");
  assert.deepEqual(state.favorites,[]);
});

test("catalog filtering matches text and favorites",()=>{
  assert.deepEqual(filterProducts(products,"green").map(p=>p.id),["b"]);
  assert.deepEqual(filterProducts(products,"",true,["a"]).map(p=>p.id),["a"]);
});
