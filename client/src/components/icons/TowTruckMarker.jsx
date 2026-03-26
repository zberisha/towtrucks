import L from "leaflet";

const towTruckMarkerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 56" width="40" height="56">
  <defs>
    <filter id="shadow" x="-20%" y="-10%" width="140%" height="130%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
    </filter>
  </defs>
  <path d="M20 54 C20 54, 4 34, 4 20 A16 16 0 1 1 36 20 C36 34, 20 54, 20 54Z" 
        fill="#d94318" stroke="#b83510" stroke-width="1.5" filter="url(#shadow)"/>
  <circle cx="20" cy="19" r="12" fill="white" opacity="0.95"/>
  <g transform="translate(10.5, 11.5)" stroke="#d94318" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M0 12h2"/>
    <circle cx="4" cy="12" r="1.8" fill="#d94318"/>
    <path d="M5.8 12h5.4"/>
    <circle cx="13" cy="12" r="1.8" fill="#d94318"/>
    <path d="M14.8 12H19v-3l-3-3.5h-3V1H4a1.5 1.5 0 0 0-1.5 1.5V12"/>
    <path d="M13 5.5h3l2.5 3H13V5.5z" fill="rgba(217,67,24,0.15)"/>
    <path d="M2.5 5.5L1 9.5h6L5.5 3"/>
  </g>
</svg>
`;

const towTruckMarkerIcon = new L.DivIcon({
  html: towTruckMarkerSvg,
  className: "custom-towtruck-marker",
  iconSize: [40, 56],
  iconAnchor: [20, 56],
  popupAnchor: [0, -56],
});

export default towTruckMarkerIcon;
