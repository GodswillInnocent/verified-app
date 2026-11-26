function eyeIcon() {
  return `
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#AEB5B8"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `;
}

function eyeOffIcon() {
  return `
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#AEB5B8"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3l18 18"/>
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/>
      <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7a15 15 0 0 1-3 3.8"/>
      <path d="M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7a10 10 0 0 0 4-.8"/>
    </svg>
  `;
}

export function renderCreateAccount() {
  return `
    <main class="min-h-dvh bg-white text-[#171F58]
                flex justify-center">

      <section class="w-full max-w-[760px]
                      min-h-dvh px-6 sm:px-10
                      py-8 flex flex-col">

        <!-- BACK BUTTON -->
        <button
          id="signupBack"
          type="button"
          aria-label="Go back"
          class="self-start mb-10"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M29 6L11 24L29 42M12 24H43"
              stroke="#171F58"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <!-- PAGE HEADING -->
        <h1 class="text-3xl sm:text-4xl
                   font-semibold mb-12">
          Sign Up
        </h1>

        <!-- REGISTRATION FORM -->
        <form id="signupForm" class="flex flex-col gap-7">

          <!-- FULL NAME -->
          <div>
            <label for="fullName"
                   class="block text-lg sm:text-xl mb-3">
              Full name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              autocomplete="name"
              required
              class="w-full h-16 px-5
                     border-2 border-[#D5DFEA]
                     rounded-2xl outline-none
                     focus:border-[#171F58]
                     text-base sm:text-lg"
            />
          </div>

          <!-- EMAIL -->
          <div>
            <label for="email"
                   class="block text-lg sm:text-xl mb-3">
              E-mail
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              autocomplete="email"
              required
              class="w-full h-16 px-5
                     border-2 border-[#D5DFEA]
                     rounded-2xl outline-none
                     focus:border-[#171F58]
                     text-base sm:text-lg"
            />
          </div>

          <!-- PASSWORD -->
          <div>
            <label for="password"
                   class="block text-lg sm:text-xl mb-3">
              Password
            </label>

            <div class="relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                autocomplete="new-password"
                minlength="8"
                required
                class="w-full h-16 px-5 pr-14
                       border-2 border-[#D5DFEA]
                       rounded-2xl outline-none
                       focus:border-[#171F58]
                       text-base sm:text-lg"
              />

              <button
                type="button"
                data-toggle-password="password"
                aria-label="Show password"
                class="absolute right-5 top-1/2
                       -translate-y-1/2"
              >
                ${eyeOffIcon()}
              </button>
            </div>
          </div>

          <!-- CONFIRM PASSWORD -->
          <div>
            <label for="confirmPassword"
                   class="block text-lg sm:text-xl mb-3">
              Confirm Password
            </label>

            <div class="relative">
              <input
             id="confirmPassword"
             name="confirmPassword"
             type="password"
             placeholder="Enter confirm password"
             autocomplete="new-password"
             minlength="8"
             required
                class="w-full h-16 px-5 pr-14
                       border-2 border-[#D5DFEA]
                       rounded-2xl outline-none
                       focus:border-[#171F58]
                       text-base sm:text-lg"
              />

              <button
                type="button"
                data-toggle-password="confirmPassword"
                aria-label="Show confirm password"
                class="absolute right-5 top-1/2
                       -translate-y-1/2"
              >
                ${eyeOffIcon()}
              </button>
            </div>
          </div>

          <!-- PASSWORD REQUIREMENT -->
          <p class="text-sm sm:text-base text-[#45617D]">
            Must contain 8 characters and match
          </p>

          <!-- CREATE ACCOUNT BUTTON -->
          <button
            type="submit"
            class="w-full bg-[#171F58]
                   text-white h-16 rounded-xl
                   text-lg sm:text-xl font-medium
                   mt-16 hover:opacity-90
                   transition-opacity"
          >
            Create account
          </button>

          <!-- TERMS AND PRIVACY -->
          <p class="text-center text-sm sm:text-lg
                    leading-relaxed mt-3">
            By clicking "create account" you agree to our
            <a href="#terms"
               class="text-[#26B7A5] font-medium">
              Terms of Service
            </a>
            and
            <a href="#privacy"
               class="text-[#26B7A5] font-medium">
              Privacy Policy
            </a>.
          </p>

        </form>
      </section>
    </main>
  `;
}

export function setupCreateAccount(onAccountCreated) {
  // BACK BUTTON
  document.getElementById("signupBack")
    ?.addEventListener("click", () => {
      history.back();
    });

  // SHOW AND HIDE PASSWORDS
document.querySelectorAll("[data-toggle-password]")
  .forEach(button => {
    button.innerHTML = eyeOffIcon();

    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", () => {
      const inputId = button.dataset.togglePassword;
      const input = document.getElementById(inputId);

      if (!input) return;

      const isHidden = input.type === "password";

      input.type = isHidden ? "text" : "password";

      button.innerHTML = isHidden
        ? eyeIcon()
        : eyeOffIcon();

      button.setAttribute(
        "aria-label",
        isHidden ? "Hide password" : "Show password"
      );

      button.setAttribute(
        "aria-pressed",
        String(isHidden)
      );
    });
  });

  // PASSWORD MATCHING
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  function checkPasswords() {
    if (!password || !confirmPassword) return;

if (confirmPassword.value === "") {
      confirmPassword.setCustomValidity("");
      return;
    }

    confirmPassword.setCustomValidity(
      password.value === confirmPassword.value
        ? ""
        : "Passwords do not match."
    );
  }

  password?.addEventListener("input", checkPasswords);
  confirmPassword?.addEventListener("input", checkPasswords);

  // FORM SUBMISSION
document.getElementById("signupForm")
  ?.addEventListener("submit", event => {
    event.preventDefault();

    checkPasswords();

    if (!event.currentTarget.reportValidity()) return;

    if (onAccountCreated) {
      onAccountCreated();
    }
  });
}
