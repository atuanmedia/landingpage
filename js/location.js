// ==========================
// API TỈNH / HUYỆN / XÃ
// ==========================
const API = "https://provinces.open-api.vn/api/";


// ==========================
// FORM NGOÀI (Ở MỤC ĐĂNG KÝ)
// ==========================
const city = document.getElementById("city");
const district = document.getElementById("district");
const ward = document.getElementById("ward");

// Load Tỉnh
async function loadCities() {
    if (!city) return;
    let data = await fetch(API + "?depth=1").then(r => r.json());
    city.innerHTML = `<option value="">Tỉnh/thành</option>`;
    data.forEach(c => {
        city.innerHTML += `<option value="${c.name}">${c.name}</option>`;
    });
}

// Load Huyện
async function loadDistricts(cityName) {
    if (!district || !ward) return;

    district.innerHTML = `<option value="">Quận/huyện</option>`;
    ward.innerHTML = `<option value="">Phường/xã</option>`;

    if (!cityName) return;

    // Lấy danh sách tỉnh => tìm tỉnh theo name => lấy code
    let provinces = await fetch(API + "?depth=2").then(r => r.json());
    let found = provinces.find(p => p.name === cityName);

    if (!found) return;

    found.districts.forEach(d => {
        district.innerHTML += `<option value="${d.name}">${d.name}</option>`;
    });
}

// Load Xã
async function loadWards(districtName) {
    if (!ward || !city.value) return;

    ward.innerHTML = `<option value="">Phường/xã</option>`;

    let provinces = await fetch(API + "?depth=3").then(r => r.json());
    let foundCity = provinces.find(p => p.name === city.value);
    if (!foundCity) return;

    let foundDistrict = foundCity.districts.find(d => d.name === districtName);
    if (!foundDistrict) return;

    foundDistrict.wards.forEach(w => {
        ward.innerHTML += `<option value="${w.name}">${w.name}</option>`;
    });
}

// Gán sự kiện form ngoài
if (city) city.addEventListener("change", () => loadDistricts(city.value));
if (district) district.addEventListener("change", () => loadWards(district.value));

loadCities();


// ==========================
// FORM POPUP BÁO GIÁ
// ==========================
const popupCity = document.getElementById("popup-city");
const popupDistrict = document.getElementById("popup-district");
const popupWard = document.getElementById("popup-ward");


// Load tỉnh popup
async function loadPopupCities() {
    if (!popupCity) return;

    let data = await fetch(API + "?depth=1").then(r => r.json());
    popupCity.innerHTML = `<option value="">Tỉnh/TP</option>`;
    data.forEach(c => {
        popupCity.innerHTML += `<option value="${c.name}">${c.name}</option>`;
    });
}

// Load huyện popup
async function loadPopupDistricts(cityName) {
    popupDistrict.innerHTML = `<option value="">Quận/huyện</option>`;
    popupWard.innerHTML = `<option value="">Phường/xã</option>`;

    if (!cityName) return;

    let provinces = await fetch(API + "?depth=2").then(r => r.json());
    let found = provinces.find(p => p.name === cityName);
    if (!found) return;

    found.districts.forEach(d => {
        popupDistrict.innerHTML += `<option value="${d.name}">${d.name}</option>`;
    });
}

// Load xã popup
async function loadPopupWards(districtName) {
    popupWard.innerHTML = `<option value="">Phường/xã</option>`;

    if (!popupCity.value) return;

    let provinces = await fetch(API + "?depth=3").then(r => r.json());
    let foundCity = provinces.find(p => p.name === popupCity.value);
    if (!foundCity) return;

    let foundDistrict = foundCity.districts.find(d => d.name === districtName);
    if (!foundDistrict) return;

    foundDistrict.wards.forEach(w => {
        popupWard.innerHTML += `<option value="${w.name}">${w.name}</option>`;
    });
}

// Gán sự kiện popup
if (popupCity) popupCity.addEventListener("change", () => loadPopupDistricts(popupCity.value));
if (popupDistrict) popupDistrict.addEventListener("change", () => loadPopupWards(popupDistrict.value));


// Hàm mở popup
function openPopup() {
    document.getElementById("price-popup").style.display = "flex";
    loadPopupCities();
}

function closePopup() {
    document.getElementById("price-popup").style.display = "none";
}
