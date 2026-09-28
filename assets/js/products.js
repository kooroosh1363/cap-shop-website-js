export const products = Object.freeze([
  { id:"black", name:"Black Core Cap", color:"Black", price:40, originalPrice:50, image:"./assets/img/black.png", tags:["classic","dark"] },
  { id:"green", name:"Forest Cap", color:"Green", price:38, originalPrice:48, image:"./assets/img/green.png", tags:["outdoor","green"] },
  { id:"grey-white", name:"Grey White Cap", color:"Grey White", price:42, originalPrice:52, image:"./assets/img/greyWhite.png", tags:["neutral","contrast"] },
  { id:"red", name:"Signal Red Cap", color:"Red", price:39, originalPrice:49, image:"./assets/img/red.png", tags:["bold","red"] },
  { id:"sand", name:"Sand Cap", color:"Sand", price:41, originalPrice:51, image:"./assets/img/sand.png", tags:["neutral","warm"] },
  { id:"white", name:"White Essential Cap", color:"White", price:36, originalPrice:46, image:"./assets/img/white.png", tags:["minimal","light"] }
]);

export const productById = (id) => products.find((product) => product.id === id) ?? null;
