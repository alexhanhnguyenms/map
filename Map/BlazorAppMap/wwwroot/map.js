window.initMap = function () {
    var map = createMap();
    addTileLayer(map);
    addDefaultMarker(map);
    addParkingMarkers5(map);
    addPolygon(map);
    //setupClickListener(map);
};

// Hàm tạo bản đồ và thiết lập vị trí ban đầu
function createMap() {
    var map = L.map('map').setView([21.2152, 105.8003], 16); // Tăng mức zoom lên 15
    return map;
}

// Hàm thêm tile layer từ OpenStreetMap
function addTileLayer(map) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

// Hàm thêm marker tại vị trí mặc định
function addDefaultMarker(map) {
    var marker = L.marker([21.2152, 105.8003]).addTo(map);
    marker.bindPopup("<b>Sân bay Nội Bài</b><br />Tôi đang ở đây.").openPopup();
}
 
function addParkingMarkers5(map) {
    var parkingLots = [
        { name: "Bãi đỗ P1", coords: [21.2152, 105.8003], capacity: 100, carsIn: 60, carsOut: 40, adjustments: 2, lastAdjusted: "2024-10-01 14:30" },
        { name: "Bãi đỗ P2", coords: [21.2171, 105.7991], capacity: 150, carsIn: 80, carsOut: 70, adjustments: 1, lastAdjusted: "2024-10-01 12:00" },
        { name: "Bãi đỗ P4", coords: [21.2213, 105.7941], capacity: 120, carsIn: 90, carsOut: 30, adjustments: 3, lastAdjusted: "2024-10-01 09:15" },
        { name: "Bãi đỗ P7", coords: [21.2205, 105.8051], capacity: 200, carsIn: 150, carsOut: 50, adjustments: 0, lastAdjusted: "N/A" }
    ];

    parkingLots.forEach(function (lot) {
        var occupancyRate = ((lot.carsIn / lot.capacity) * 100).toFixed(2);

        // Tạo icon tùy chỉnh với style trực tiếp
        var customIcon = L.divIcon({
            className: 'custom-icon',
            html: `<div style="text-align: center; background-color: white; border: 2px solid purple; border-radius: 5px; padding: 5px; box-shadow: 0 0 5px rgba(0,0,0,0.5);">
                      <strong style="color: darkblue;">${lot.name}</strong><br />
                      <span style="color: green;">Dung lượng: ${lot.capacity}</span><br />
                      <span style="color: orange;">Xe hiện có: ${lot.carsIn - lot.carsOut}</span><br />
                      <span style="color: red;">Tỷ lệ chiếm dụng: ${occupancyRate}%</span>
                   </div>`,
            iconSize: [120, 60] // Kích thước của icon
        });

        // Thêm marker với icon tùy chỉnh
        var marker = L.marker(lot.coords, { icon: customIcon }).addTo(map);

        // Thêm popup nếu cần thiết
        marker.bindPopup(`<b style="color: darkblue;">${lot.name}</b><br />
                          <span style="color: green;">Dung lượng: ${lot.capacity}</span><br />
                          <span style="color: orange;">Xe vào: ${lot.carsIn}</span><br />
                          <span style="color: red;">Xe ra: ${lot.carsOut}</span><br />
                          <span style="color: darkgreen;">Xe hiện có: ${lot.carsIn - lot.carsOut}</span><br />
                          <span style="color: brown;">Tỷ lệ chiếm dụng: ${occupancyRate}%</span><br />
                          <span style="color: teal;">Số lần hiệu chỉnh: ${lot.adjustments}</span><br />
                          <span style="color: gray;">Giờ hiệu chỉnh: ${lot.lastAdjusted}</span>`);
    });
}


// Hàm thêm polygon
function addPolygon(map) {
    var polygon = L.polygon([
        [21.2152, 105.8003],
        [21.2213, 105.7941],
        [21.2205, 105.8051]
    ]).addTo(map);

    polygon.bindPopup("Khu vực đã chọn.");
}

// Hàm lắng nghe sự kiện click và thêm marker tại vị trí click
function setupClickListener(map) {
    map.on('click', function (e) {
        var newMarker = L.marker(e.latlng).addTo(map);
        newMarker.bindPopup("Bạn đã click vào vị trí: " + e.latlng.toString()).openPopup();
    });
}
