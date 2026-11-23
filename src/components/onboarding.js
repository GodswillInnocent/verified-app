import { onboardingSlides } from "../data/onboarding-data.js";

let currentSlide = 0;

function imageCollage(images) {
  return `
    <div class="relative w-full max-w-[360px]
                h-[260px] mx-auto">

      <img
        src="${images[0]}"
        alt="Navigation illustration"
        class="absolute left-[2%] top-[12%]
               w-[54%] h-[78%] object-cover
               rounded-2xl -rotate-6"
      />

      <img
        src="${images[2]}"
        alt="Travel illustration"
        class="absolute right-[2%] top-[12%]
               w-[54%] h-[78%] object-cover
               rounded-2xl rotate-6"
      />

      <img
        src="${images[1]}"
        alt="Featured navigation illustration"
        class="absolute left-1/2 top-[3%]
               -translate-x-1/2
               w-[54%] h-[92%] object-cover
               rounded-2xl border-2 border-white
               shadow-md"
      />

    </div>
  `;
}

export function renderOnboarding() {
  const slide = onboardingSlides[currentSlide];
  const isLast = currentSlide === onboardingSlides.length - 1;

  return `
    <section class="min-h-dvh bg-[#171F58] flex flex-col">

      <div class="relative h-[75dvh] bg-white">

        <div class="relative z-10 h-full flex flex-col
                    items-center justify-around
                    px-5 pb-20 text-center">

          <h1 class="text-[#171F58] text-2xl
                     font-bold">
            ${slide.title}
          </h1>

          ${imageCollage(slide.images)}

          <p class="text-[#171F58] text-lg
                    max-w-[310px] leading-relaxed">
            ${slide.description}
          </p>

        </div>

        <!-- White curved bottom -->
        <svg
          class="absolute top-full left-0 w-full
                 h-[110px] -mt-[1px]"
          viewBox="0 0 400 110"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 0 Q200 210 400 0 Z"
            fill="white"
          />
        </svg>

      </div>

      <div class="flex-1 flex flex-col
                  items-center justify-between
                  pt-32 pb-8 px-6">

        <div class="flex items-center gap-2">
          ${onboardingSlides.map((_, index) => `
            <button
              data-slide="${index}"
              aria-label="Go to slide ${index + 1}"
              class="${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-2 bg-[#8C94BD]"
              } h-2 rounded-full"
            ></button>
          `).join("")}
        </div>

        <div class="w-full max-w-sm">
          ${
            isLast
              ? `
                <button id="getStarted"
                  class="w-full bg-white text-[#171F58]
                         py-3 rounded-md font-semibold">
                  Get Started
                </button>
                <p class="text-white text-center mt-5 text-sm">
                  Already have an account?
                  <button id="login" class="text-teal-400">
                    Log In
                  </button>
                </p>
              `
              : `
                <button id="skip"
                  class="block ml-auto text-white text-lg">
                  Skip
                </button>
              `
          }
        </div>
      </div>
    </section>
  `;
}

export function setupOnboarding() {
  const app = document.getElementById("app");

  function update() {
    app.innerHTML = renderOnboarding();
    setupOnboarding();
  }

  document.querySelectorAll("[data-slide]").forEach(button => {
    button.addEventListener("click", () => {
      currentSlide = Number(button.dataset.slide);
      update();
    });
  });

  document.getElementById("skip")?.addEventListener("click", () => {
    currentSlide = onboardingSlides.length - 1;
    update();
  });

  document.getElementById("getStarted")?.addEventListener("click", () => {
    app.innerHTML = `
      <main class="min-h-dvh bg-[#171F58]
                   flex items-center justify-center
                   text-white">
        <h1 class="text-2xl font-bold">Create Account</h1>
      </main>
    `;
  });

  document.getElementById("login")?.addEventListener("click", () => {
    app.innerHTML = `
      <main class="min-h-dvh bg-[#171F58]
                   flex items-center justify-center
                   text-white">
        <h1 class="text-2xl font-bold">Login</h1>
      </main>
    `;
  });
}