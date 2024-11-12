// Product Data
let products = JSON.parse(localStorage.getItem("products")) || [];

// Add Product
function addProduct() {
    const name = document.getElementById("product-name").value;
    const category = document.getElementById("product-category").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const stock = parseInt(document.getElementById("product-stock").value);

    if (name && category && !isNaN(price) && !isNaN(stock)) {
        products.push({ id: Date.now(), name, category, price, stock });
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();
        renderCharts();
    } else {
        alert("Please fill in all fields with valid values.");
    }
}

// Delete Product
function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    renderCharts();
}

// Display Products
function displayProducts() {
    const productTable = document.querySelector("#product-table tbody");
    productTable.innerHTML = "";

    products.forEach(product => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>`;
        productTable.innerHTML += row;
    });
}

// Render Charts
function renderCharts() {
    const categories = [...new Set(products.map(p => p.category))];
    const categoryCounts = categories.map(
        cat => products.filter(p => p.category === cat).length
    );
    const stockCounts = categories.map(
        cat => products
            .filter(p => p.category === cat)
            .reduce((acc, p) => acc + p.stock, 0)
    );

    new Chart(document.getElementById("category-chart"), {
        type: "bar",
        data: {
            labels: categories,
            datasets: [{ label: "Products", data: categoryCounts, backgroundColor: "#0073e6" }]
        }
    });

    new Chart(document.getElementById("stock-chart"), {
        type: "pie",
        data: {
            labels: categories,
            datasets: [{ data: stockCounts, backgroundColor: ["#0073e6", "#e63946", "#2a9d8f"] }]
        }
    });
}

// Initialize
document.getElementById("add-product-btn").addEventListener("click", addProduct);
document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    renderCharts();
});
