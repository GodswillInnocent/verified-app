
export function renderVerifyAccount() {
  return `
    <main class="min-h-dvh w-full bg-white flex flex-col
                items-center px-6 relative">

      <!-- BACK BUTTON -->
      <button
        id="verifyBack"
        type="button"
        aria-label="Go back"
        class="absolute top-[7.5dvh] left-6
               text-[#171F58] hover:opacity-70
               transition-opacity"
      >
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M25 6L10 21L25 36M11 21H36"
            stroke="#171F58"
            stroke-width="3.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <!-- MAIN CONTENT -->
      <section class="w-full max-w-[620px] flex flex-col
                      items-center pt-[15.5dvh]">

        <!-- HEADING -->
        <h1 class="text-[#171F58] text-[27px] sm:text-3xl
                   font-semibold text-center">
          Verify Account
        </h1>

        <!-- INSTRUCTIONS -->
        <p class="mt-[7.5dvh] text-center
                  text-[#171F58] text-base sm:text-xl
                  leading-[1.55]">
          Code has been sent to registered email
          <br />
          Enter the code to verify your account.
        </p>

        <!-- ENTER CODE LABEL -->
        <h2 class="mt-[10dvh] text-[#17365C]
                   text-lg sm:text-xl font-medium">
          Enter Code
        </h2>

        <!-- OTP INPUTS -->
        <div class="flex justify-center items-center
                    gap-3 sm:gap-5 mt-[6.5dvh]">

          ${[1, 2, 3, 4].map((number) => `
            <input
              type="text"
              inputmode="numeric"
              maxlength="1"
              pattern="[0-9]"
              autocomplete="${number === 1 ? "one-time-code" : "off"}"
              aria-label="Verification digit ${number}"
              class="otp-input w-[58px] h-[58px]
                     sm:w-[76px] sm:h-[76px]
                     rounded-full border border-[#8589AA]
                     bg-white text-center
                     text-2xl sm:text-3xl
                     text-[#171F58] font-medium
                     outline-none
                     focus:border-[#171F58]
                     focus:border-2
                     transition-all"
            />
          `).join("")}

        </div>

        <!-- RESEND CODE -->
        <div class="mt-[9dvh] text-center">

          <div class="flex flex-wrap justify-center
                      items-center gap-2 text-sm sm:text-lg">

            <span class="text-[#17365C] font-medium">
              Didn’t Receive Code?
            </span>

            <button
              id="resendCode"
              type="button"
              disabled
              class="text-[#999999] font-medium
                     disabled:cursor-not-allowed
                     enabled:text-[#16A6A1]"
            >
              Resend Code
            </button>

          </div>

          <p
            id="countdownText"
            class="mt-3 text-[#17365C]
                   text-sm sm:text-lg"
            aria-live="polite"
          >
            Resend code in 00:59
          </p>

          <p
            id="resendMessage"
            class="mt-2 text-xs text-gray-500"
            aria-live="polite"
          ></p>

        </div>

      </section>

      <!-- VERIFY BUTTON -->
      <div class="w-full max-w-[620px] mt-auto
                  pb-[13dvh]">

        <button
          id="verifyButton"
          type="button"
          class="w-full h-[64px] sm:h-[76px]
                 rounded-[15px]
                 bg-[#191F59] text-white
                 text-xl sm:text-2xl font-medium
                 hover:bg-[#222D75]
                 active:scale-[0.99]
                 transition-all"
        >
          Verify
        </button>

        <p
          id="verifyMessage"
          class="mt-3 text-sm text-center"
          aria-live="polite"
        ></p>

      </div>

    </main>
  `;
}


export function setupVerifyAccount(onVerified) {
  const inputs = [...document.querySelectorAll(".otp-input")];

  const verifyButton = document.getElementById("verifyButton");
  const resendButton = document.getElementById("resendCode");
  const countdownText = document.getElementById("countdownText");
  const resendMessage = document.getElementById("resendMessage");
  const verifyMessage = document.getElementById("verifyMessage");
  const backButton = document.getElementById("verifyBack");

  // BACK NAVIGATION
  backButton?.addEventListener("click", () => {
    history.back();
  });

  // OTP INPUT BEHAVIOUR
  inputs.forEach((input, index) => {

    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, "").slice(0, 1);

      verifyMessage.textContent = "";

      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (event) => {

      if (
        event.key === "Backspace" &&
        !input.value &&
        index > 0
      ) {
        inputs[index - 1].focus();
      }

      if (event.key === "ArrowLeft" && index > 0) {
        inputs[index - 1].focus();
      }

      if (
        event.key === "ArrowRight" &&
        index < inputs.length - 1
      ) {
        inputs[index + 1].focus();
      }
    });

    // PASTE COMPLETE OTP
    input.addEventListener("paste", (event) => {
      event.preventDefault();

      const pastedCode = event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 4);

      pastedCode.split("").forEach((digit, digitIndex) => {
        if (inputs[digitIndex]) {
          inputs[digitIndex].value = digit;
        }
      });

      const nextEmpty = inputs.find(field => !field.value);

      if (nextEmpty) {
        nextEmpty.focus();
      } else {
        inputs[inputs.length - 1].focus();
      }
    });
  });


  
// VERIFY BUTTON
verifyButton?.addEventListener("click", () => {
  const code = inputs.map(input => input.value).join("");

  if (code.length !== 4) {
    verifyMessage.textContent =
      "Please enter all four digits.";

    verifyMessage.className =
      "mt-3 text-sm text-center text-red-600";

    return;
  }

  onVerified?.();
});



  // RESEND COUNTDOWN
  let remainingSeconds = 59;
  let countdownTimer;

  function updateCountdown() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    countdownText.textContent =
      `Resend code in ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function startCountdown() {
    clearInterval(countdownTimer);

    remainingSeconds = 59;
    resendButton.disabled = true;

    resendButton.classList.remove("text-[#16A6A1]");
    resendButton.classList.add("text-[#999999]");

    updateCountdown();

    countdownTimer = setInterval(() => {
      remainingSeconds--;

      updateCountdown();

      if (remainingSeconds <= 0) {
        clearInterval(countdownTimer);

        countdownText.textContent = "";
        resendButton.disabled = false;
      }
    }, 1000);
  }

  resendButton?.addEventListener("click", () => {
    resendMessage.textContent =
      "Email resend functionality will be connected later.";

    startCountdown();
  });

  startCountdown();
}
