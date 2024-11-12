// Hardcoded Products
let products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
];

// CRUD Operations
function addProduct() {
    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);

    if (name && price) {
        const newProduct = { id: products.length + 1, name, price };
        products.push(newProduct);
        displayProducts();
    } else {
        alert("Please enter valid product details.");
    }
}

function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    displayProducts();
}

function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td><button onclick="deleteProduct(${product.id})">Delete</button></td>
            </tr>`;
        productList.innerHTML += row;
    });
}

// Chart.js Integration
function renderCharts() {
    const ctxBar = document.getElementById("bar-chart").getContext("2d");
    const ctxLine = document.getElementById("line-chart").getContext("2d");
    const ctxPie = document.getElementById("pie-chart").getContext("2d");

    new Chart(ctxBar, {
        type: "bar",
        data: {
            labels: products.map(p => p.name),
            datasets: [{
                label: "Product Prices",
                data: products.map(p => p.price),
                backgroundColor: "rgba(0, 123, 255, 0.6)",
            }]
        }
    });

    new Chart(ctxLine, {
        type: "line",
        data: {
            labels: products.map(p => p.name),
            datasets: [{
                label: "Product Prices",
                data: products.map(p => p.price),
                borderColor: "rgba(0, 123, 255, 1)",
                fill: false,
            }]
        }
    });

    new Chart(ctxPie, {
        type: "pie",
        data: {
            labels: products.map(p => p.name),
            datasets: [{
                data: products.map(p => p.price),
                backgroundColor: ["#0073e6", "#e63946", "#2a9d8f", "#f4a261", "#264653"],
            }]
        }
    });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    renderCharts();
});
