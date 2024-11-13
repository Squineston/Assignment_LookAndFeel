// Load Products and Sales Data
const products = JSON.parse(localStorage.getItem("products")) || [];
const sales = JSON.parse(localStorage.getItem("sales")) || [];

// Render Sales Trends Chart
function renderSalesTrendsChart() {
    const ctx = document.getElementById("sales-trends-chart").getContext("2d");

    // Aggregate sales data by date
    const salesByDate = sales.reduce((acc, sale) => {
        acc[sale.date] = (acc[sale.date] || 0) + sale.revenue;
        return acc;
    }, {});

    const dates = Object.keys(salesByDate);
    const revenues = Object.values(salesByDate);

    new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [{
                label: "Revenue",
                data: revenues,
                borderColor: "#0073e6",
                fill: false,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
            },
        },
    });
}

// Render Top-Selling Products Chart
function renderTopProductsChart() {
    const ctx = document.getElementById("top-products-chart").getContext("2d");

    // Aggregate sales data by product
    const salesByProduct = sales.reduce((acc, sale) => {
        acc[sale.productName] = (acc[sale.productName] || 0) + sale.quantity;
        return acc;
    }, {});

    const productNames = Object.keys(salesByProduct);
    const quantities = Object.values(salesByProduct);

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: productNames,
            datasets: [{
                label: "Quantities Sold",
                data: quantities,
                backgroundColor: "#2a9d8f",
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
            },
        },
    });
}

// Render Stock Distribution Chart
function renderStockDistributionChart() {
    const ctx = document.getElementById("stock-distribution-chart").getContext("2d");

    // Aggregate stock data by category
    const stockByCategory = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + product.stock;
        return acc;
    }, {});

    const categories = Object.keys(stockByCategory);
    const stockCounts = Object.values(stockByCategory);

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: categories,
            datasets: [{
                data: stockCounts,
                backgroundColor: ["#0073e6", "#e63946", "#2a9d8f", "#f4a261", "#264653"],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
            },
        },
    });
}

// Initialize Charts
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("sales-trends-chart")) {
        renderSalesTrendsChart();
        renderTopProductsChart();
        renderStockDistributionChart();
    }
});
