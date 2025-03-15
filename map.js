// Initialize interactive map with Leaflet.js
document.addEventListener("DOMContentLoaded", () => {
  // Check if map container exists
  const mapContainer = document.getElementById("interactive-map");
  if (!mapContainer) return;

  // Initialize the map
  const map = L.map("interactive-map").setView([-50.942, -73.287], 8); // Torres del Paine coordinates

  // Add OpenStreetMap tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // Define key points of interest with coordinates and information
  const points = [
    {
      name: "Torres del Paine",
      lat: -50.942,
      lng: -73.287,
      description: "Iconic granite towers and breathtaking hiking trails.",
      day: 1,
    },
    {
      name: "Perito Moreno Glacier",
      lat: -50.4967,
      lng: -73.0378,
      description: "One of the few advancing glaciers in the world.",
      day: 2,
    },
    {
      name: "El Calafate",
      lat: -50.3397,
      lng: -72.2728,
      description: "Gateway city to Los Glaciares National Park.",
      day: 2,
    },
    {
      name: "Hotel Las Torres",
      lat: -50.9776,
      lng: -72.856,
      description: "Starting point for the hike to Base Torres.",
      day: 1,
    },
    {
      name: "Lake Argentino",
      lat: -50.2,
      lng: -72.6333,
      description: "Argentina's largest freshwater lake.",
      day: 2,
    },
  ];

  // Add markers for each point of interest
  points.forEach((point) => {
    // Create custom icon based on day
    const dayIcon = L.divIcon({
      className: `map-marker day${point.day}`,
      html: `<div class="marker-content">${point.day}</div>`,
      iconSize: [30, 30],
    });

    // Add marker to map
    const marker = L.marker([point.lat, point.lng], { icon: dayIcon }).addTo(
      map
    );

    // Add popup with information
    marker.bindPopup(`
      <strong>${point.name}</strong><br>
      ${point.description}<br>
      <em>Day ${point.day}</em>
    `);
  });

  // Add a route line connecting points for day 1
  const day1Points = points
    .filter((point) => point.day === 1)
    .map((point) => [point.lat, point.lng]);

  if (day1Points.length > 1) {
    const day1Route = L.polyline(day1Points, {
      color: "#3388ff",
      weight: 4,
      opacity: 0.7,
    }).addTo(map);
  }

  // Add a route line connecting points for day 2
  const day2Points = points
    .filter((point) => point.day === 2)
    .map((point) => [point.lat, point.lng]);

  if (day2Points.length > 1) {
    const day2Route = L.polyline(day2Points, {
      color: "#ff6347",
      weight: 4,
      opacity: 0.7,
    }).addTo(map);
  }

  // Adjust map view to fit all markers
  const group = new L.featureGroup(
    points.map((point) => L.marker([point.lat, point.lng]))
  );
  map.fitBounds(group.getBounds().pad(0.1));

  // Handle window resize
  window.addEventListener("resize", () => {
    map.invalidateSize();
  });
});
// Initialize photo lightbox
