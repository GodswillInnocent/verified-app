
import { onboardingPages } from "../data/onboarding-data.js";

let currentSlide = 0;

function renderSlideImage(slide) {
  return `
    <div class="w-full h-full flex items-center justify-center">
      <img
        src="${slide.image}"
        alt="${slide.title}"
        class="w-full h-full object-contain"
      />
    </div>
  `;
}

export function renderOnboarding(slideIndex = currentSlide) {
  currentSlide = slideIndex;

  const slide = onboardingPages[currentSlide];
  const isLast =
    currentSlide === onboardingPages.length - 1;

  return `
    <section class="relative w-full h-dvh overflow-hidden bg-white">

      <!-- NAVY LOWER SECTION AND CURVE -->
      <div class="absolute bottom-0 left-0 w-full h-[43dvh]
                  z-0 pointer-events-none">

        <svg
          class="w-full h-full"
          viewBox="0 0 400 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 0 Q200 145 400 0 L400 220 L0 220 Z"
            fill="#171F58"
          />
        </svg>

      </div>

      <!-- BACK BUTTON -->
      <button
        id="back"
        class="absolute z-30 top-5 left-5
               text-[#171F58] text-sm font-medium
               px-2 py-2"
      >
        ← Back
      </button>

      <!-- MAIN CONTENT -->
      <main class="relative z-10 w-full h-full
                   flex flex-col items-center">

        <div class="w-full max-w-[760px] h-full
                    px-6 sm:px-10">

          <!-- HEADING -->
          <h1 class="absolute top-[9dvh]
                     left-6 right-6
                     sm:left-10 sm:right-10
                     max-w-[680px] mx-auto
                     text-left
                     text-[#171F58]
                     text-2xl sm:text-3xl
                     font-bold">
            ${slide.title}
          </h1>

          <!-- ILLUSTRATION -->
          <div class="absolute top-[19dvh]
                      left-1/2 -translate-x-1/2
                      w-[94%] max-w-[680px]
                      h-[39dvh]">
            ${renderSlideImage(slide)}
          </div>

          <!-- DESCRIPTION -->
          <p class="absolute top-[60dvh]
                    left-1/2 -translate-x-1/2
                    w-[85%] max-w-[440px]
                    text-center
                    text-[#171F58]
                    text-base sm:text-lg
                    leading-relaxed">
            ${slide.description}
          </p>

        </div>

      </main>

      <!-- PROGRESS INDICATORS -->
      <div class="absolute z-30
                  bottom-[15dvh]
                  left-0 right-0
                  flex items-center justify-center gap-2">

        ${onboardingPages.map((_, index) => `
          <button
            data-slide="${index}"
            aria-label="Go to slide ${index + 1}"
            class="${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-2 bg-[#8C94BD]"
            } h-2 rounded-full transition-all"
          ></button>
        `).join("")}

      </div>

      <!-- BOTTOM ACTION AREA -->
      <div class="absolute z-30
                  bottom-[3dvh]
                  left-0 right-0
                  flex justify-center px-6 sm:px-10">

        <div class="w-full max-w-[520px]">

          ${
            isLast
              ? `
                <button
                  id="getStarted"
                  class="w-full bg-white
                         text-[#171F58]
                         py-3 rounded-md
                         text-base sm:text-lg
                         font-semibold"
                >
                  Get Started
                </button>

                <p class="text-white text-center
                          mt-3 text-sm sm:text-base">
                  Already have an account?
                  <button
                    id="login"
                    class="text-teal-400 font-semibold">
                    Log In
                  </button>
                </p>
              `
              : `
                <button
                  id="skip"
                  class="block ml-auto
                         text-white text-base
                         font-medium py-2"
                >
                  Skip
                </button>
              `
          }

        </div>
      </div>

    </section>
  `;
}

export function setupOnboarding(onBackToLanding, initialSlide = 0) {
  const app = document.getElementById("app");

  currentSlide = initialSlide;

  function update() {
    app.innerHTML = renderOnboarding(currentSlide);
    bindEvents();
  }

  function navigateToSlide(slideIndex) {
    if (
      slideIndex === currentSlide ||
      slideIndex < 0 ||
      slideIndex >= onboardingPages.length
    ) return;

    history.pushState(
      {
        page: "onboarding",
        slide: slideIndex
      },
      ""
    );

    currentSlide = slideIndex;
    update();
  }

  function bindEvents() {

    // SLIDE NAVIGATION
    document.querySelectorAll("[data-slide]").forEach(button => {
      button.addEventListener("click", () => {
        navigateToSlide(Number(button.dataset.slide));
      });
    });

    // BACK BUTTON
    document.getElementById("back")?.addEventListener("click", () => {
      history.back();
    });

    // SKIP BUTTON
    document.getElementById("skip")?.addEventListener("click", () => {
      navigateToSlide(currentSlide + 1);
    });

    
    // GET STARTED
    document.getElementById("getStarted")?.addEventListener("click", () => {
      history.pushState(
        { page: "create-account" },
        ""
      );

      window.dispatchEvent(
        new PopStateEvent("popstate", {
          state: history.state
        })
      );
    });

    // LOGIN
    document.getElementById("login")?.addEventListener("click", () => {
      history.pushState(
        { page: "login" },
        ""
      );

      window.dispatchEvent(
        new PopStateEvent("popstate", {
          state: history.state
        })
      );
    });
  }

  // INITIALIZE ONBOARDING
  update();
}
