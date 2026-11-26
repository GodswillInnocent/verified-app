
export function renderAccountSuccess() {
  return `
    <main class="h-dvh min-h-dvh w-full bg-[#191F59]
                 text-white relative flex flex-col
                 items-center overflow-hidden px-6">

      <!-- BACK BUTTON -->
      <button
        id="successBack"
        type="button"
        aria-label="Go back"
        class="absolute top-[7.5dvh] left-6
               text-white hover:opacity-70"
      >
        <svg width="44" height="44" viewBox="0 0 44 44"
             fill="none" aria-hidden="true">
          <path
            d="M26 6L10 22L26 38M11 22H38"
            stroke="white"
            stroke-width="3.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <!-- CONGRATULATIONS -->
      <h1 class="mt-[19dvh] text-center
                 text-[27px] sm:text-3xl
                 font-normal tracking-wide">
        Congratulations
      </h1>

      <!-- SUCCESS ICON -->
      <div class="mt-[9dvh] w-[140px] h-[140px]
                  sm:w-[170px] sm:h-[170px]
                  rounded-full border-[3px] border-white
                  flex items-center justify-center">

        <svg
          viewBox="0 0 100 100"
          class="w-[75%] h-[75%]"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M19 51L39 70L81 22"
            stroke="white"
            stroke-width="7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

      </div>

      <!-- SUCCESS MESSAGE -->
      <p class="mt-[6dvh] text-center
                text-[23px] sm:text-3xl
                leading-[1.5] font-normal
                max-w-[420px]">
        Account successfully<br />
        created
      </p>

      <!-- BOTTOM BUTTONS -->
      <div class="w-full max-w-[620px]
                  mt-auto pb-[17dvh]
                  flex flex-col gap-5">

        <button
          id="successLogin"
          type="button"
          class="w-full h-[70px] sm:h-[78px]
                 rounded-[16px] bg-white
                 text-[#191F59] text-xl sm:text-2xl
                 font-semibold hover:bg-gray-100
                 transition-colors"
        >
          Login
        </button>

        <button
          id="successContinue"
          type="button"
          class="w-full h-[70px] sm:h-[78px]
                 rounded-[16px] border-2 border-white
                 bg-transparent text-white
                 text-xl sm:text-2xl font-normal
                 hover:bg-white/10 transition-colors"
        >
          Continue
        </button>

      </div>

    </main>
  `;
}


export function setupAccountSuccess(
  onBack,
  onLogin,
  onContinue
) {
  document.getElementById("successBack")
    ?.addEventListener("click", () => {
      onBack?.();
    });

  document.getElementById("successLogin")
    ?.addEventListener("click", () => {
      onLogin?.();
    });

  document.getElementById("successContinue")
    ?.addEventListener("click", () => {
      onContinue?.();
    });
}
