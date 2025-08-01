//1.1 dotNetHelper
window.registerCoordinateUpdater = function (dotNetHelper) {
    //1. Change coordinate
    window.updateCoordinatesDrawPoint = function (name, lat, lng) {
        dotNetHelper.invokeMethodAsync('UpdateCoordinatesDrawPoint', name, lat, lng)
            .then(() => console.log("Coordinates updated in Blazor"))
            .catch(err => console.error("Error updating coordinates:", err));
    };
    //2.select item
    window.selectItemDrawPoint = function (name) {      

        dotNetHelper.invokeMethodAsync('SelectItemDrawPoint', name)
            .then(() => console.log("Selected item sent to Blazor"))
            .catch(error => console.error("Error selecting item:", error));
    }
};
//2. init map
window.initializeMap = function () {
    //2.1. Map
    var map = L.map('map').setView([10.7640502, 106.7487584], 13);    
    // Layer cơ bản từ OSM
    var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    //2.2. Event click
    //thong tin line
    var isDrawing = false;
    var points = [];
    var polylineDraw = null;
    map.on('click', function (e) {
        //1. lấy tọa độ đang click
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;   
        DotNet.invokeMethodAsync('OpenStreetMap', 'ReceiveCoordinates', lat, lng)
            .then(result => {
                console.log("Coordinates sent successfully");
            })
            .catch(error => {
                console.error("Error invoking method: " + error);
            });
        //2. ve line
        if (isDrawing) {
            var latLng = e.latlng;
            points.push(latLng);

            // Kiểm tra xem đã có ít nhất hai điểm để tạo polyline
            if (points.length >= 2) {
                if (!polylineDraw) {
                    console.log("Tạo polyline mới với các điểm:", points);
                    polylineDraw = L.polyline(points, { color: 'purple', weight: 15, opacity: 0.5 }).addTo(map);
                } else {
                    // Cập nhật polyline với các điểm mới
                    console.log("Cập nhật polyline với các điểm mới:", points);
                    polylineDraw.setLatLngs(points);
                }
            } else {
                console.log("Cần ít nhất hai điểm để vẽ một polyline.");
            }
        }
    });
    //2.3. Draw point
    var markers = {}; // Để lưu các marker theo tên
    //2.3.1 Add
    window.addDraggableItemDrawPoint = function (itemName, lat, lon) {
        var marker = L.marker([lat, lon], { draggable: true })
            .bindPopup(itemName)
            .addTo(map);

        // Lưu marker để quản lý sau
        markers[itemName] = marker;
        //2.3.1.1 Sự kiện `dragend` để gửi tọa độ về Blazor khi marker được kéo
        marker.on('dragend', function (e) {
            var newLatLng = marker.getLatLng();
            window.updateCoordinatesDrawPoint(itemName, newLatLng.lat, newLatLng.lng);

        });
        //2.3.1.2 Sự kiện click để chọn marker
        marker.on('click', function () {
            window.selectItemDrawPoint(itemName);
        });
    };
    //2.3.2 Hàm xóa item draw point
    window.removeItemDrawPoint = function (itemName) {
        console.log("removeItemDrawPoint: " + itemName);
        var marker = markers[itemName];
        if (marker) {
            map.removeLayer(marker); // Xóa marker khỏi bản đồ
            delete markers[itemName]; // Xóa marker khỏi danh sách quản lý
        }
    };
    //2.4.Vẽ line   
    window.toggleDrawLine = function (drawState) {
        console.log("toggleDrawLine: " + drawState);
        isDrawing = drawState;
        if (!isDrawing && polylineDraw) {
            // Khi kết thúc vẽ line, xóa điểm để chuẩn bị vẽ mới
            points = [];
            polylineDraw = null;
        }
    };


    //////////////////////////////////////////////////////////////
    //2.4. Các layer khác
    var marker = L.marker([10.7640502, 106.7487584]).bindPopup('Tòa nhà ITD, Số 01 đường Sáng Tạo, Phường Tân Thuận Đông, Quận 7, TP.HCM.');
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
    //2.5. show/hile layer
    var baseLayers = {
        "OSM": osmLayer
    };
    var eventLayer = L.layerGroup().addTo(map);
    //overlay
    var overlays = {
        "Marker": marker,
        "Polygon": polygon,
        "Polyline": polyline,
        "GeoJSON": geojsonLayer,
        "Event": eventLayer
    };
    // Tạo control layer và chọn mặc định các overlay mà bạn muốn
    var control = L.control.layers(baseLayers, overlays, { collapsed: false }).addTo(map);
    //add control
    // Mở popup cho các layer mặc định
    marker.openPopup();//uncheck
    polygon.openPopup();//uncheck
    polyline.openPopup();//uncheck
    geojsonLayer.openPopup();//uncheck
    eventLayer.addTo(map);//check
    //2.6 randow event to map
    window.addMapEvent = function (eventTypes, lats, lons) {
        console.log("addMapEvent");
        eventLayer.clearLayers(); // Xóa tất cả các sự kiện cũ
        // Kiểm tra số lượng sự kiện, vĩ độ và kinh độ phải giống nhau
        if (eventTypes.length !== lats.length || eventTypes.length !== lons.length) {
            console.error("Số lượng sự kiện, vĩ độ và kinh độ không khớp!");
            return;
        }

        for (var i = 0; i < eventTypes.length; i++) {
            var eventType = eventTypes[i];
            var lat = lats[i];
            var lon = lons[i];
            //console.log("eventType: " + eventType + ", lat: " + lat + ", lon: " + lon);
            // Vẽ vòng tròn cho từng sự kiện
            L.circle([lat, lon], {
                color: 'red',
                radius: 50
            }).bindPopup(eventType).addTo(eventLayer);
        }
    };
};