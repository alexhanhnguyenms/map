window.initializeMap = function () {
    var map = L.map('map').setView([10.7640502, 106.7487584], 13); // Cập nhật tọa độ tại đây

    // Layer cơ bản từ OSM
    var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Các layer khác
    var marker = L.marker([10.7640502, 106.7487584]).bindPopup('Tòa nhà ITD, Số 01 đường Sáng Tạo, Phường Tân Thuận Đông, Quận 7, TP.HCM.'); // Cập nhật tọa độ tại đây
    var polygon = L.polygon([
        [10.766, 106.7487584],
        [10.7640502, 106.7587584],
        [10.760, 106.7487584]
    ]).bindPopup('Đây là một đa giác.');
    var polyline = L.polyline([
        [10.7640502, 106.7487584],
        [10.770, 106.7487584],
        [10.772, 106.7387584]
    ]).bindPopup('Đây là một polyline.');

    // GeoJSON layer
    var geojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": "Một điểm GeoJSON"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [106.7487584, 10.7640502]
        }
    };
    var geojsonLayer = L.geoJSON(geojsonFeature).bindPopup('Đây là một điểm GeoJSON.');

    // Tạo biểu tượng cho camera
    var cameraIcon = L.icon({
        iconUrl: 'assets/camera.png', // Thay thế bằng đường dẫn thực tế đến biểu tượng camera
        iconSize: [32, 32], // Kích thước biểu tượng
        iconAnchor: [16, 32], // Điểm neo biểu tượng
        popupAnchor: [0, -32] // Điểm neo popup
    });

    // Tạo biểu tượng cho LED
    var ledIcon = L.icon({
        iconUrl: 'assets/monitor.png', // Thay thế bằng đường dẫn thực tế đến biểu tượng LED
        iconSize: [32, 32], // Kích thước biểu tượng
        iconAnchor: [16, 32], // Điểm neo biểu tượng
        popupAnchor: [0, -32] // Điểm neo popup
    });

    // Tạo nhóm layer cho camera
    var cameraLayer = L.layerGroup();
    for (var i = 0; i < 20; i++) {
        var lat = 10.7640502 + (Math.random() - 0.5) * 0.01;
        var lon = 106.7487584 + (Math.random() - 0.5) * 0.01;
        L.marker([lat, lon], { icon: cameraIcon }).bindPopup('Camera ' + (i + 1)).addTo(cameraLayer);
    }

    // Tạo nhóm layer cho LED
    var ledLayer = L.layerGroup();
    for (var i = 0; i < 10; i++) {
        var lat = 10.7640502 + (Math.random() - 0.5) * 0.01;
        var lon = 106.7487584 + (Math.random() - 0.5) * 0.01;
        L.marker([lat, lon], { icon: ledIcon }).bindPopup('LED Display ' + (i + 1)).addTo(ledLayer);
    }

    // Tạo nhóm layer cho sự kiện
    var eventLayer = L.layerGroup();

    function addRandomEvents() {
        eventLayer.clearLayers(); // Xóa tất cả các sự kiện cũ
        var eventCount = Math.floor(Math.random() * 10) + 1; // Số lượng sự kiện ngẫu nhiên (từ 1 đến 10)
        for (var i = 0; i < eventCount; i++) {
            var lat = 10.7640502 + (Math.random() - 0.5) * 0.01;
            var lon = 106.7487584 + (Math.random() - 0.5) * 0.01;
            L.circle([lat, lon], {
                color: 'red',
                radius: 50
            }).bindPopup('Event ' + (i + 1)).addTo(eventLayer);
        }
    }

    // Gọi hàm addRandomEvents mỗi 5 giây
    setInterval(addRandomEvents, 5000);

    // Layer control
    var baseLayers = {
        "OSM": osmLayer
    };

    var overlays = {
        "Marker": marker,
        "Polygon": polygon,
        "Polyline": polyline,
        "GeoJSON": geojsonLayer,
        "Camera": cameraLayer,
        "LED": ledLayer,
        "Event": eventLayer
    };

    L.control.layers(baseLayers, overlays).addTo(map);

    // Thêm các layer vào map
    marker.addTo(map);
    polygon.addTo(map);
    polyline.addTo(map);
    geojsonLayer.addTo(map);
    cameraLayer.addTo(map);
    ledLayer.addTo(map);
    eventLayer.addTo(map);

    // Thêm các sự kiện ban đầu
    addRandomEvents();
}
