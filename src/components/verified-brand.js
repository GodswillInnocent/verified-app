import { verifiedLogo } from "./verified-logo.js";

export function verifiedBrand({
  size = 120,
  showTagline = true
} = {}) {
  return `
    <div class="verified-brand">

      ${verifiedLogo(size)}

      <h1 class="verified-title">
        VERIFIED
      </h1>

      ${
        showTagline
          ? `<p class="verified-tagline">
               Navigate Smarter, Explore Better
             </p>`
          : ""
      }

    </div>
  `;
}