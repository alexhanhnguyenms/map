let draggedItemId = null;

function allowDrop(event) {
    console.log("allowDrop: " + event);
    event.preventDefault(); // Ngăn hành vi mặc định khi kéo
}

function setDraggedItemId(itemId) {
    draggedItemId = itemId; // Lưu ID camera đang kéo
}

function drop(event) {
    console.log("drop: " + event);
    event.preventDefault(); // Ngăn hành vi mặc định khi thả
    const map = document.getElementById("map");
    const rect = map.getBoundingClientRect();

    // Tính toán tọa độ thả
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Ghi nhận tọa độ mới cho camera
    console.log(`Camera ID: ${draggedItemId} được thả tại: (${x}, ${y})`);

    // Thêm marker camera tại vị trí thả
    const cameraMarker = document.createElement("div");
    cameraMarker.innerText = `📷 Camera ${draggedItemId}`;
    cameraMarker.style.position = "absolute";
    cameraMarker.style.left = `${x}px`;
    cameraMarker.style.top = `${y}px`;
    cameraMarker.style.pointerEvents = "none"; // Không cho phép tương tác
    map.appendChild(cameraMarker);
}