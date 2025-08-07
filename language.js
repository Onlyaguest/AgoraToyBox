function selectLanguage(lang, langName) {
  console.log("selectLanguage called with:", lang, langName);

  const dropdown = document.getElementById("languageDropdown");
  const selectedLanguage = document.getElementById("selectedLanguage");
  const checkEn = document.getElementById("checkEn");
  const checkKo = document.getElementById("checkKo");

  if (dropdown) {
    dropdown.classList.add("hidden");
  }

  if (selectedLanguage) {
    selectedLanguage.textContent = langName;
  }

  if (checkEn) checkEn.classList.add("hidden");
  if (checkKo) checkKo.classList.add("hidden");

  if (lang === "en") {
    if (checkEn) checkEn.classList.remove("hidden");
    console.log("Redirecting to English page");

    if (window.location.pathname.includes("/language/ko/")) {
      window.location.href = "../../index.html";
    } else {
      window.location.reload();
    }
  } else if (lang === "ko") {
    if (checkKo) checkKo.classList.remove("hidden");
    console.log("Redirecting to Korean page");

    if (!window.location.pathname.includes("/language/ko/")) {
      window.location.href = "./language/ko/index.html";
    } else {
      window.location.reload();
    }
  }
}

function toggleLanguageDropdown() {
  console.log("toggleLanguageDropdown called");
  const dropdown = document.getElementById("languageDropdown");

  if (dropdown) {
    dropdown.classList.toggle("hidden");
    console.log(
      "Dropdown toggled, hidden:",
      dropdown.classList.contains("hidden")
    );
  } else {
    console.error("Dropdown element not found!");
  }
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("languageDropdown");
  const button = document.getElementById("languageButton");

  if (dropdown && button) {
    if (!button.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.classList.add("hidden");
    }
  }
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, pathname:", window.location.pathname);

  const selectedLanguage = document.getElementById("selectedLanguage");
  const checkEn = document.getElementById("checkEn");
  const checkKo = document.getElementById("checkKo");

  if (selectedLanguage && checkEn && checkKo) {
    if (window.location.pathname.includes("/language/ko/")) {
      // Korean page
      selectedLanguage.textContent = "한국어";
      checkEn.classList.add("hidden");
      checkKo.classList.remove("hidden");
      console.log("Initialized as Korean page");
    } else {
      // English page
      selectedLanguage.textContent = "English";
      checkEn.classList.remove("hidden");
      checkKo.classList.add("hidden");
      console.log("Initialized as English page");
    }
  } else {
    console.error("Language elements not found");
  }
});

// Make functions globally available
window.toggleLanguageDropdown = toggleLanguageDropdown;
window.selectLanguage = selectLanguage;
