//1. Khởi tạo bản đồ
window.map = null; // Khai báo biến map ở cấp toàn cục
//2. init map
window.ItdInitializeMap = function () {
    //2.1. Map
    window.map = L.map('map').setView([10.7640502, 106.7487584], 13);    
    // Layer cơ bản từ OSM
    var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);   
    //Danh sách thiết bị
    window.Devices = {
        cameras: [], // Danh sách camera
        leds: [],    // Danh sách LED
        vdss: [],      // Danh sách VDS
        LayerGroups: {
            camera: L.layerGroup().addTo(window.map), // LayerGroup cho camera
            led: L.layerGroup().addTo(window.map), // LayerGroup cho LED
            vds: L.layerGroup().addTo(window.map) // LayerGroup cho VDS
        }
    };  
    //2.2. Event click
    window.ItdLine = {
        points: [],
        polylineDraw: null,
        isDrawing: false
    };
    window.map.on('click', function (e) {
        //1. lấy tọa độ đang click
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;   
        DotNet.invokeMethodAsync('OpenStreetMap', 'ItdReceiveCoordinates', lat, lng)
            .then(result => {
                console.log("Coordinates sent successfully");
            })
            .catch(error => {
                console.error("Error invoking method: " + error);
            });
        //2. Vẽ line bằng cách gọi hàm addPolylinePoint
        if (window.ItdLine.isDrawing) {
            addPolylinePoint(e.latlng);
        }        
    });   
    
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
    window.eventLayer = L.layerGroup().addTo(map);
    //overlay
    var overlays = {
        "Camera": window.Devices.LayerGroups.camera, // Sử dụng LayerGroup cho camera
        "LED": window.Devices.LayerGroups.led, // Sử dụng LayerGroup cho LED
        "VDS": window.Devices.LayerGroups.vds, // Sử dụng LayerGroup cho VDS (nếu có)
        "Marker": marker,
        "Polygon": polygon,
        "Polyline": polyline,
        "GeoJSON": geojsonLayer,
        "Event": window.eventLayer
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
};
