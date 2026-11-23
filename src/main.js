import "./style.css";

import { verifiedBrand } from "./components/verified-brand.js";

const app = document.getElementById("app");

// DISPLAY LANDING PAGE
function showLanding() {
  app.innerHTML = `
    <main class="landing-page">
      ${verifiedBrand({
        size: 120,
        showTagline: true
      })}
    </main>
  `;

  // Move to onboarding when clicked
  document
    .querySelector(".landing-page")
    .addEventListener("click", showOnboarding);
}

// DISPLAY ONBOARDING
function showOnboarding() {
  // Temporary placeholder until we reconnect
  // your existing reusable onboarding component.
  app.innerHTML = `
    <main>
      <h1>Discover Places Easily</h1>
      <button id="back-home">Back to Landing</button>
    </main>
  `;

  document
    .getElementById("back-home")
    .addEventListener("click", showLanding);
}

// ALWAYS SHOW LANDING FIRST
showLanding();