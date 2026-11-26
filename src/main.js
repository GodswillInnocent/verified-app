import {renderCreateAccount,setupCreateAccount
} from "./components/create-account.js";

import {
  renderAccountSuccess,
  setupAccountSuccess
} from "./components/account-success.js";

import {
  renderVerifyAccount,
  setupVerifyAccount
} from "./components/verify-account.js";

import "./style.css";


import { verifiedBrand } from "./components/verified-brand.js";
import {
  renderOnboarding,
  setupOnboarding
} from "./components/onboarding.js";

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

  document
    .querySelector(".landing-page")
    .addEventListener("click", () => {
      history.pushState(
        { page: "onboarding", slide: 0 },
        ""
      );

      showOnboarding(0);
    });
}

// DISPLAY ONBOARDING
function showOnboarding(slideIndex = 0) {
  setupOnboarding(showLanding, slideIndex);
}

// DISPLAY CREATE ACCOUNT PAGE
function showCreateAccount() {
  app.innerHTML = renderCreateAccount();

  setupCreateAccount(() => {
    history.pushState(
      { page: "verify-account" },
      ""
    );

    showVerifyAccount();
  });
}

// DISPLAY VERIFY ACCOUNT PAGE
function showVerifyAccount() {
  app.innerHTML = renderVerifyAccount();

  setupVerifyAccount(() => {
    history.pushState(
      { page: "account-success" },
      ""
    );

    showAccountSuccess();
  });
}

// DISPLAY LOGIN PAGE
function showLogin() {
  app.innerHTML = `
    <main class="min-h-dvh bg-[#171F58]
                 flex items-center justify-center
                 text-white">
      <h1 class="text-2xl font-bold">Login</h1>
    </main>
  `;
}

// DISPLAY ACCOUNT SUCCESS PAGE
function showAccountSuccess() {
  app.innerHTML = renderAccountSuccess();

  setupAccountSuccess(
    () => history.back(),

    () => {
      history.pushState({ page: "login" }, "");
      showLogin();
    },

    () => {
      alert("Your next page will be connected here.");
    }
  );
}


// HANDLE BROWSER BACK AND FORWARD BUTTONS
window.addEventListener("popstate", (event) => {
  const page = event.state?.page;

  if (page === "onboarding") {
    showOnboarding(event.state.slide ?? 0);

  } else if (page === "create-account") {
    showCreateAccount();

  } else if (page === "verify-account") {
    showVerifyAccount();

  } else if (page === "account-success") {
    showAccountSuccess();

  } else if (page === "login") {
    showLogin();

  } else {
    showLanding();
  }
});


// SET INITIAL PAGE
history.replaceState(
  { page: "landing" },
  ""
);

showLanding();
