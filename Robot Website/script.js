function openShopModal() {
  document.getElementById('shopModal').style.display = 'block';
}

function closeShopModal() {
  document.getElementById('shopModal').style.display = 'none';
}

function openBasketModal() {
  document.getElementById('basketModal').style.display = 'block';
}

function closeBasketModal() {
  document.getElementById('basketModal').style.display = 'none';
}

function openCheckoutModal() {
  document.getElementById('checkoutModal').style.display = 'block';
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal').style.display = 'none';
}

function openAboutusModal() {
  document.getElementById('aboutUsModal').style.display = 'block';
}

function closeAboutusModal() {
  document.getElementById('aboutUsModal').style.display = 'none';
}

const basketTable = document.getElementById("basketTable");
const clearBasketButton = document.getElementById("clearBasketButton");
const addButtons = document.getElementsByClassName("add-to-basket");
const basketCount = document.getElementById("basketCount");


let basket = [];

// Add event listeners to the "Add to Basket" buttons
for (let addButton of addButtons) {
  addButton.addEventListener("click", addToBasket);
}

function addToBasket(event) {
  // Get the details of the product
  const productRow = event.target.parentNode.parentNode;
  const productImage = productRow.querySelector(".product-image").src;
  const productDescription = productRow.querySelector("td:nth-child(2)").textContent;
  const productPrice = parseFloat(productRow.querySelector("td:nth-child(3)").textContent);

  // Get the quantity from the user input
  const quantityInput = prompt("Enter the quantity you want to add to the basket:");
  const quantity = parseInt(quantityInput);

  // Calculate the total price for the product
  const totalPrice = productPrice * quantity;

  // Add the item to the basket array
  basket.push({ image: productImage, description: productDescription, price: productPrice, quantity: quantity, totalPrice: totalPrice });


  updateBasket();

  // Update the basket count in the nav link
  basketCount.textContent = `(${basket.length})`;


  const image = document.createElement("img");
  image.src = productImage;
  image.alt = "Product Image";
  image.style.height = "50px";
  image.style.width = "50px";

  // Add the image to the cell
  const imageCell = row.insertCell();
  imageCell.appendChild(image);
}

function updateBasket() {
  // Clear the basket table
  basketTable.innerHTML = "";

  // Add a item in the basket
  for (let item of basket) {
    const row = basketTable.insertRow();

    const imageCell = row.insertCell();
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = "Product Image";
    image.width = 130; 
    image.height = 130; 
    imageCell.appendChild(image);

    const descriptionCell = row.insertCell();
    descriptionCell.textContent = item.description;

    const quantityCell = row.insertCell();
    quantityCell.textContent = item.quantity;

    const priceCell = row.insertCell();
    priceCell.textContent = item.totalPrice.toFixed(2);
  }

  // Update the total price
  const totalPrice = basket.reduce((total, item) => total + item.totalPrice, 0);
  const totalRow = basketTable.insertRow();
  const totalLabelCell = totalRow.insertCell();
  const totalLabel = document.createTextNode("Total:");
  totalLabelCell.colSpan = 3;
  totalLabelCell.appendChild(totalLabel);
  const totalPriceCell = totalRow.insertCell();
  const totalPriceValue = document.createTextNode(totalPrice.toFixed(2));
  totalPriceCell.appendChild(totalPriceValue);

  // Update the basket count in the nav link
  const basketCount = document.getElementById("basketCount");
  basketCount.textContent = `(${basket.length})`;

  // Add event listener to the "Clear" button
  clearBasketButton.addEventListener("click", clearBasket);
}

function clearBasket() {
  // Empty the basket
  basket = [];

 
  updateBasket();
}

// Add event listener to the "Clear" button
clearBasketButton.addEventListener("click", clearBasket);