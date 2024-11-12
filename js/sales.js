let sales = JSON.parse(localStorage.getItem("sales")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];

function addSale() {
    const productName = document.getElementById("sale-product").value;
    const quantity = parseInt(document.getElementById("sale-quantity").value);

    if (productName && !isNaN(quantity)) {
        const product = products.find(p => p.name === productName);
        if (product && product.stock >= quantity) {
            product.stock -= quantity;

            const revenue = product.price * quantity;
            const sale = { id: Date.now(), productName, quantity, revenue, date: new Date().toLocaleDateString() };
            sales.push(sale);
            localStorage.setItem("sales", JSON.stringify(sales));
            localStorage.setItem("products", JSON.stringify(products));

            displaySales();
            displayProducts();
        } else {
            alert("Not enough stock for this product.");
        }
    } else {
        alert("Please select a product and enter a valid quantity.");
    }
}

function displaySales() {
    const salesTable = document.getElementById("sales-table").querySelector("tbody");
    salesTable.innerHTML = "";

    sales.forEach(sale => {
        const row = `
            <tr>
                <td>${sale.productName}</td>
                <td>${sale.quantity}</td>
                <td>${sale.revenue.toFixed(2)}</td>
                <td>${sale.date}</td>
            </tr>`;
        salesTable.innerHTML += row;
    });
}

function populateProductDropdown() {
    const dropdown = document.getElementById("sale-product");
    dropdown.innerHTML = '<option value="" disabled selected>Select Product</option>';

    products.forEach(product => {
        const option = `<option value="${product.name}">${product.name}</option>`;
        dropdown.innerHTML += option;
    });
}

document.getElementById("add-sale-btn").addEventListener("click", addSale);
document.addEventListener("DOMContentLoaded", () => {
    populateProductDropdown();
    displaySales();
});

