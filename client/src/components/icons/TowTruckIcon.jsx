export function TowTruckIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      className={className}
      fill="none"
    >
      <circle cx="20" cy="20" r="19" fill="#d94318" stroke="#b83510" strokeWidth="1.5" />
      <g transform="translate(6, 10)" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M0 16h3" />
        <circle cx="6" cy="16" r="2.5" fill="white" />
        <path d="M8.5 16h7" />
        <circle cx="18" cy="16" r="2.5" fill="white" />
        <path d="M20.5 16H28v-4l-4-5h-5V2H5a2 2 0 0 0-2 2v12" />
        <path d="M19 7h4l3 4h-7V7z" fill="rgba(255,255,255,0.2)" />
        <path d="M3 7L1 12h8L7 4" />
      </g>
    </svg>
  );
}
