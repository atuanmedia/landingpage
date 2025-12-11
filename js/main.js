// ================== GOOGLE SHEET CONFIG ==================
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxEeHme-VbsEVF2BjAPpHr3eYT2R6DOWUikxpWCxVZz1tUz3PVrWEbUgQ2ZsZAVuSa9jA/exec";

// ================== POPUP PRICE ==================
let selectedProductName = "";
function showPrice(id) {
    const product = currentProducts.find(p => p.id === id);
    selectedProductName = product.name;

    document.getElementById("productNameInput").value = selectedProductName;
    document.getElementById("price-popup").style.display = "flex";
    loadPopupCities();
}

function closePopup() {
    document.getElementById("price-popup").style.display = "none";
}

async function submitPriceForm(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch(GOOGLE_SHEET_URL, {
            method: "POST",
            body: formData   // KHÔNG gửi JSON
        });

        const result = await response.json();
        console.log(result);
    } catch (err) {
        console.error("Fetch error:", err);
    }
}







// Xuất hàm ra global
window.submitPriceForm = submitPriceForm;
// ================== SEND TO GOOGLE SHEET ==================

function setupFormSubmit() {
    const form = document.getElementById("priceForm");
    if (!form) {
        console.error("priceForm not found!");
        return;
    }

    form.addEventListener("submit", submitPriceForm);
}


// ================== PRODUCT DATA ==================
const existingProducts = [
    { id: 1, name: "LED Trụ Nhựa", img: "/images/sp9.jpg", header: "TẬP ĐOÀN RẠNG ĐÔNG", category: "Đèn ngoài trời" },
    { id: 2, name: "LED Trụ Kim Cương", img: "/images/sp16.jpg", header: "TẬP ĐOÀN RẠNG ĐÔNG", category: "Đèn ngoài trời" },
    { id: 3, name: "Đèn LED Downlight", img: "/images/sp11.jpg", header: "TẬP ĐOÀN RẠNG ĐÔNG", category: "Đèn trong nhà" },
    { id: 4, name: "Đèn Tích Điện Sạc Ngoài", img: "/images/sp14.jpg", header: "TẬP ĐOÀN RẠNG ĐÔNG", category: "Đèn khẩn cấp" },
    { id: 5, name: "Đèn Pha LED", img: "/images/sp4.jpg", header: "TẬP ĐOÀN RẠNG ĐÔNG", category: "Đèn trong nhà" },
    { id: 6, name: "Đèn LED Tích Điện", img: "/images/sp12.jpg", header: "TẬP ĐOÀN RẠNG ĐÔNG", category: "Đèn công nghiệp" },
    { id: 7, name: "Đèn LED DC", img: "/images/sp13.jpg", header: "TẬP ĐOÀN RẠNG ĐÔNG", category: "Đèn văn phòng" },
    { id: 8, name: "Đèn LED Downlight Đế Liền", img: "/images/sp15.jpg", header: "TẬP ĐOÀN RẠNG ĐÔNG", category: "Đèn công nghiệp" },
    { id: 9, name: "Đèn LED Ốp Trần", img: "/images/sp10.jpg", header: "TẬP ĐOÀN RẠNG ĐÔNG", category: "Đèn ngoài trời" },
    { id: 10, name: "Ấm Thuỷ Tinh Siêu Tốc", img: "/images/sp1.jpg", header: "TẬP ĐOÀN RẠNG ĐÔNG", category: "Ấm Thuỷ Tinh Siêu Tốc" },
    { id: 11, name: "Ấm Thuỷ Tinh Siêu Tốc", img: "/images/sp2.jpg", header: "TẬP ĐOÀN RẠNG ĐÔNG", category: "Ấm Thuỷ Tinh Siêu Tốc" },
    { id: 12, name: "Ấm Thuỷ Tinh Siêu Tốc", img: "/images/sp8.jpg", header: "TẬP ĐOÀN RẠNG ĐÔNG", category: "Ấm Thuỷ Tinh Siêu Tốc" }
];

// Danh sách sản phẩm thêm (khi bấm "Xem thêm")
const additionalProducts = [
    { id: 13, name: "Ấm Siêu Tốc", img: "/images/sp3.jpg", header: "TẬP ĐOÀN RẠNG ĐÔNG", category: "Ấm Siêu Tốc" },
    { id: 14, name: "Ấm Siêu Tốc", img: "/images/sp5.jpg", header: "TẬP ĐOÀN RẠNG ĐÔNG", category: "Ấm Siêu Tốc" },
    { id: 15, name: "Ấm Siêu Tốc", img: "/images/sp6.jpg", header: "TẬP ĐOÀN RẠNG ĐÔNG", category: "Ấm Siêu Tốc" },
    { id: 16, name: "Ấm Siêu Tốc", img: "/images/sp7.jpg", header: "TẬP ĐOÀN RẠNG ĐÔNG", category: "Ấm Siêu Tốc" },

];

let currentProducts = [...existingProducts];

// ================== RENDER PRODUCTS ==================
function renderProducts(products) {
    const grid = document.getElementById('product-grid');
    let html = "";

    products.forEach(product => {
        html += `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="product-card">
                <div class="hot-badge">HOT</div>
                <div class="product-header">${product.header}</div>
                <div class="product-img-wrapper">
                    <img src="${product.img}" alt="${product.name}">
                </div>
                <div class="product-body">
                    <div class="stars">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i>
                        <i class="fas fa-star"></i><i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h5 class="product-name">${product.name}</h5>
                    <small class="text-muted d-block mb-2">${product.category}</small>
                    <button class="btn btn-price" onclick="showPrice(${product.id})">THAM KHẢO GIÁ</button>
                </div>
            </div>
        </div>`;
    });

    grid.innerHTML = html;
}

// ================== LOAD MORE ==================
function loadMoreProducts() {
    const more = additionalProducts.splice(0, 4);
    currentProducts = [...currentProducts, ...more];
    renderProducts(currentProducts);

    if (additionalProducts.length === 0) {
        document.getElementById("load-more-btn").style.display = "none";
    }
}

// ================== INIT ==================
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(currentProducts);
    setupFormSubmit();

    const loadMoreBtn = document.getElementById("load-more-btn");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", loadMoreProducts);
    }
});


// Xuất hàm để HTML có thể gọi
window.showPrice = showPrice;
window.closePopup = closePopup;
