let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {
    const name = document.getElementById("product-name").value;
    const category = document.getElementById("product-category").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const stock = parseInt(document.getElementById("product-stock").value);

    if (name && category && !isNaN(price) && !isNaN(stock)) {
        const product = { id: Date.now(), name, category, price, stock };
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();
    } else {
        alert("Please enter valid product details.");
    }
}

function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

function displayProducts() {
    const productTable = document.getElementById("product-table").querySelector("tbody");
    productTable.innerHTML = "";

    products.forEach(product => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td><button onclick="deleteProduct(${product.id})">Delete</button></td>
            </tr>`;
        productTable.innerHTML += row;
    });
}

document.getElementById("add-product-btn").addEventListener("click", addProduct);
document.addEventListener("DOMContentLoaded", displayProducts);

