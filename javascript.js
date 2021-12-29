//Data
const productsArr = [
  { id: 1, image: "sweets-1.jpeg", desc: "Sweets Item", category:"sweets", price: 5 },
  { id: 2, image: "cupcake-1.jpeg", desc: "Cupcake Item", category:"cupcakes", price: 5 },
  { id: 3, image: "cake-1.jpeg", desc: "Cake Item", category:"cakes", price: 5 },
  { id: 4, image: "doughnut-1.jpeg", desc: "doughnut Item", category:"doughnuts", price: 5 },
  { id: 5, image: "sweets-2.jpeg", desc: "Sweets Item", category:"sweets", price: 10 },
  { id: 6, image: "cupcake-2.jpeg", desc: "Cupcake Item", category:"cupcakes", price: 10 },
  { id: 7, image: "cake-2.jpeg", desc: "Cake Item", category:"cakes", price: 10 },
  { id: 8, image: "doughnut-2.jpeg", desc: "doughnut Item", category:"doughnuts", price: 10 },
  { id: 9, image: "sweets-3.jpeg", desc: "Sweets Item", category:"sweets", price: 15 },
  { id: 10, image: "cupcake-3.jpeg", desc: "Cupcake Item", category:"cupcakes", price: 15 },
  { id: 11, image: "cake-3.jpeg", desc: "Cake Item", category:"cakes", price: 15 },
  { id: 12, image: "doughnut-3.jpeg", desc: "doughnut Item", category:"doughnuts", price: 15 },
];

const cart = [];
let cartTotal = 0;

//render products onload
renderProducts();

//add event handler to search field
document.querySelector("#search-field").oninput = search;

//render products
function renderProducts(arr = productsArr) {
  const products = document.createElement("div");
  products.className = "cards-cont";

  arr.forEach((product) => {
    const card = document.createElement("div");
    const imgDiv = document.createElement("div");
    const img = document.createElement("img");
    const imgSpan = document.createElement("span");
    const imgSpanIcon = document.createElement("i");
    const descDiv = document.createElement("div");
    const desc = document.createElement("h4");
    const price = document.createElement("h4");

    card.className = "card";
    imgDiv.className = "card-image";
    img.src = `${product.image}`;
    img.alt = "product-image";
    imgSpanIcon.className = "fas fa-shopping-cart";
    imgSpanIcon.id = `${product.id}`;
    desc.innerHTML = `${product.desc}`;
    price.innerHTML = `${product.price} $`;

    imgSpanIcon.onclick = addToCart;

    card.appendChild(imgDiv);
    card.appendChild(descDiv);
    imgDiv.appendChild(img);
    imgDiv.appendChild(imgSpan);
    imgSpan.appendChild(imgSpanIcon);
    descDiv.appendChild(desc);
    descDiv.appendChild(price);

    products.appendChild(card);
  });

  //update
  document.querySelector(".cards-cont").replaceWith(products);
}

//add to cart function
function addToCart(e) {
  const item = productsArr.find((elem) => elem.id == e.target.id);
  cart.push(item);
  alert("item added to the cart");

  // change cart total
  cartTotal += item.price;

  // render new cart item (only)
  renderCartItem();

  //render updated total
  renderTotal();
}

//render new cart item function (after click add to cart)
function renderCartItem() {
  const cartList = document.querySelector("#cart");

  const cartItem = document.createElement("div");
  const cartItemImg = document.createElement("img");
  const cartItemData = document.createElement("div");
  const cartItemDesc = document.createElement("span");
  const cartItemPrice = document.createElement("span");
  const cartItemDelIcon = document.createElement("i");

  cartItem.className = "cart-item";
  cartItem.id = `cartItem-${cart[cart.length - 1].id}`;
  cartItemImg.src = `${cart[cart.length - 1].image}`;
  cartItemImg.alt = "item-image";
  cartItemDesc.innerHTML = `${cart[cart.length - 1].desc}`;
  cartItemPrice.innerHTML = `${cart[cart.length - 1].price} $`;
  cartItemDelIcon.className = "fas fa-trash";
  cartItemDelIcon.id = `trash-${cart[cart.length - 1].id}`;
  cartItemDelIcon.onclick = removeCartItem;

  cartItem.appendChild(cartItemImg);
  cartItem.appendChild(cartItemData);
  cartItemData.appendChild(cartItemDesc);
  cartItemData.appendChild(cartItemPrice);
  cartItem.appendChild(cartItemDelIcon);

  cartList.prepend(cartItem);
}

//remove cart item function
function removeCartItem(e) {
  const itemId = e.target.id.split("-")[1];
  let removedItem;

  //remove item from cart array(in order to keep a true total price)
  cart.forEach((item, index) => {
    if (item.id == itemId) {
      cart.splice(index, 1);
      removedItem = item;
    }
  });

  //remove item element from document
  const item = document.querySelector(`#cartItem-${itemId}`);
  document.querySelector("#cart").removeChild(item);

  //update cartTotal variable (((or we can make a function that recalculate the sum of cart)))
  cartTotal -= removedItem.price;

  //render updated total
  renderTotal();
}

//render new total on 2 different elements
function renderTotal() {
  const cartData = document.querySelector("#cart-button>span");
  const finalTotal = document.querySelector("#cart .cart-total").lastChild;

  cartData.innerHTML = `${cart.length} Items-$${cartTotal}`;
  finalTotal.innerHTML = `${cartTotal}$`;
}

//search function
function search(e) {
  let searchResult = productsArr.filter((item) => {
    return item.desc.toLocaleLowerCase().includes(e.target.value.toLowerCase());
  });

  renderProducts(searchResult);
}
