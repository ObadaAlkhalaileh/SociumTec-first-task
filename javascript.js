//Data
const productsArr = [
  {
    id: 1,
    image: "assets/sweets-1.jpeg",
    desc: "Colored Sweets",
    category: "sweets",
    price: 5,
  },
  {
    id: 2,
    image: "assets/cupcake-1.jpeg",
    desc: "Mini Cupcakes",
    category: "cupcakes",
    price: 5,
  },
  {
    id: 3,
    image: "assets/cake-1.jpeg",
    desc: "Casual Cake",
    category: "cakes",
    price: 5,
  },
  {
    id: 4,
    image: "assets/doughnut-1.jpeg",
    desc: "Special Doughnut",
    category: "doughnuts",
    price: 5,
  },
  {
    id: 5,
    image: "assets/sweets-2.jpeg",
    desc: "Children Sweets",
    category: "sweets",
    price: 10,
  },
  {
    id: 6,
    image: "assets/cupcake-2.jpeg",
    desc: "Chocklate Cupcake",
    category: "cupcakes",
    price: 10,
  },
  {
    id: 7,
    image: "assets/cake-2.jpeg",
    desc: "Luxury Cake",
    category: "cakes",
    price: 10,
  },
  {
    id: 8,
    image: "assets/doughnut-2.jpeg",
    desc: "Choclate Doughnuts",
    category: "doughnuts",
    price: 10,
  },
  {
    id: 9,
    image: "assets/sweets-3.jpeg",
    desc: "Choclate Sweets",
    category: "sweets",
    price: 15,
  },
  {
    id: 10,
    image: "assets/cupcake-3.jpeg",
    desc: "Blueberry Cupcakes",
    category: "cupcakes",
    price: 15,
  },
  {
    id: 11,
    image: "assets/cake-3.jpeg",
    desc: "Birthday Cake",
    category: "cakes",
    price: 15,
  },
  {
    id: 12,
    image: "assets/doughnut-3.jpeg",
    desc: "Bear Cupcake",
    category: "doughnuts",
    price: 15,
  },
];

let cart = [];
let cartTotal = 0;

let filterResult;

//render products onload
renderProducts();

//render products function
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
  let searchResult = filterResult
    ? filterResult.filter((item) => {
        return item.desc
          .toLocaleLowerCase()
          .includes(e.target.value.toLowerCase());
      })
    : productsArr.filter((item) => {
        return item.desc
          .toLocaleLowerCase()
          .includes(e.target.value.toLowerCase());
      });

  renderProducts(searchResult);
}

//filter function
function filter(e) {
  if (e.target.value === "all") return renderProducts();

  filterResult = productsArr.filter((item) => {
    return item.category.toLocaleLowerCase() == e.target.value.toLowerCase();
  });

  renderProducts(filterResult);
}

//remove cart item function
function clearCart() {
  //remove cart items from document
  cart.forEach((item) => {
    document.querySelector(".cart-item").remove();
  });

  //clear cart array
  cart = [];

  //reset total
  cartTotal = 0;

  //render updated total
  renderTotal();
}

//show/hide cart function
function toggleCart() {
  const cartClass = document.querySelector("#cart");

  cartClass.className
    ? (cartClass.className = "")
    : (cartClass.className = "visible-cart");
}

//show/hide nav function (mobile)
function toggleNav(){
  const navBar=document.querySelector('.header .small-part1')
  const header= document.querySelector('.header')

  if(navBar.style.display==='none'||navBar.style.display===""){
    header.style.maxHeight="300px"
    setTimeout(()=>navBar.style.display="block",500)
    
  }
    else{navBar.style.display="none";
    header.style.maxHeight="100px"

  }

  // document.querySelector('.header').appendChild(navBar)
}

//add event handler to search field
document.querySelector("#search-field").oninput = search;

//add event handlers to filter buttons
document.querySelector(".products .sub-flex-container [value=all]").onclick =
  filter;
document.querySelector(".products .sub-flex-container [value=cakes]").onclick =
  filter;
document.querySelector(
  ".products .sub-flex-container [value=cupcakes]"
).onclick = filter;
document.querySelector(".products .sub-flex-container [value=sweets]").onclick =
  filter;
document.querySelector(
  ".products .sub-flex-container [value=doughnuts]"
).onclick = filter;

//add clear cart event handler
document.querySelector("#clear-cart").onclick = clearCart;

//add toggle cart handler
document.querySelector('#cart-button').onclick = toggleCart;

//add nav bar in mobile mode
document.querySelector('header .fa-bars').onclick = toggleNav;