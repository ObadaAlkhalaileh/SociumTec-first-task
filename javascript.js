const productsArr = [
    { id:1, image: "sweets-1.jpeg", desc: "Sweets Item", price: 5 },
    { id:2, image: "cupcake-1.jpeg", desc: "Cupcake Item", price: 5 },
    { id:3, image: "cake-1.jpeg", desc: "Cake Item", price: 5 },
    { id:4, image: "doughnut-1.jpeg", desc: "doughnut Item", price: 5 },
    { id:5, image: "sweets-2.jpeg", desc: "Sweets Item", price: 10 },
    { id:6, image: "cupcake-2.jpeg", desc: "Cupcake Item", price: 10 },
    { id:7, image: "cake-2.jpeg", desc: "Cake Item", price: 10 },
    { id:8, image: "doughnut-2.jpeg", desc: "doughnut Item", price: 10 },
    { id:9, image: "sweets-3.jpeg", desc: "Sweets Item", price: 15 },
    { id:10, image: "cupcake-3.jpeg", desc: "Cupcake Item", price: 15 },
    { id:11, image: "cake-3.jpeg", desc: "Cake Item", price: 15 },
    { id:12, image: "doughnut-3.jpeg", desc: "doughnut Item", price: 15 },
  ];

  const cart=[];

  const products = document.querySelector(".cards-cont");

  productsArr.forEach((product)=>{
    
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
  img.alt= "product-image";
  imgSpanIcon.className = "fas fa-shopping-cart";
  imgSpanIcon.id = `${product.id}`
  desc.innerHTML=`${product.desc}`;
  price.innerHTML=`${product.price} $`;

  const addToCart=(e)=>{
    const item =productsArr.find(elem=>elem.id=e.target.id)
    cart.push(item)
    alert('item added to the cart')

    // render cart items
    const cartList=document.querySelector('#cart')

    cart.forEach(item=>{
    const cartItem = document.createElement("div");
    const cartItemImg = document.createElement("img");
    const cartItemData = document.createElement("div");
    const cartItemDesc = document.createElement("span");
    const cartItemPrice = document.createElement("span");
    const cartItemDelIcon = document.createElement("i");
    
    cartItem.className = "cart-item"
    cartItemImg.src = `${item.image}`
    cartItemImg.alt = "item-image"
    cartItemDesc.innerHTML = `${item.desc}`
    cartItemPrice.innerHTML = `${item.price} $`
    cartItemDelIcon.className = "fas fa-trash"
    cartItemDelIcon.id = `${item.id}`
  
    cartItem.appendChild(cartItemImg)
    cartItem.appendChild(cartItemData)
    cartItemData.appendChild(cartItemDesc)
    cartItemData.appendChild(cartItemPrice)
    cartItem.appendChild(cartItemDelIcon)
  
    cartList.prepend(cartItem)
    })
  }
imgSpanIcon.onclick=addToCart

  card.appendChild(imgDiv)
  card.appendChild(descDiv)
  imgDiv.appendChild(img)
  imgDiv.appendChild(imgSpan)
  imgSpan.appendChild(imgSpanIcon)
  descDiv.appendChild(desc)
  descDiv.appendChild(price)

  products.appendChild(card);
})



  
  