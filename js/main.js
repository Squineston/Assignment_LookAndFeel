// Global State
let products = JSON.parse(localStorage.getItem("products")) || [];
let sales = JSON.parse(localStorage.getItem("sales")) || [];

// Update Dashboard Metrics
function updateDashboard() {
    const totalProducts = products.length;
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.revenue, 0).toFixed(2);
    const lowStockAlerts = products.filter(product => product.stock < 5).length;

    document.getElementById("total-products").textContent = totalProducts;
    document.getElementById("total-revenue").textContent = totalRevenue;
    document.getElementById("low-stock-alerts").textContent = lowStockAlerts;
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("total-products")) {
        updateDashboard();
    }
});
