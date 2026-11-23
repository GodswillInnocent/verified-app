export function verifiedLogo(size = 120) {
  return `
    <svg
      width="${size}"
      height="${size}"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Verified logo"
    >
      <!-- White circular background -->
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="white"
      />

      <!-- Location pin -->
      <path
        d="M50 15 C37 15 29 25 29 37
           C29 50 50 72 50 72
           C50 72 71 50 71 37
           C71 25 63 15 50 15Z"
        fill="#171F58"
      />

      <!-- Hole inside pin -->
      <circle
        cx="50"
        cy="36"
        r="9"
        fill="white"
      />

      <!-- Checkmark -->
      <path
        d="M16 64 Q34 67 47 83
           Q67 54 87 52
           Q63 70 47 93
           Q32 75 16 64Z"
        fill="#171F58"
      />
    </svg>
  `;
}