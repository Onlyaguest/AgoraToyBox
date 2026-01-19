const LANGUAGE_CONFIG = {
  en: { label: "English", checkId: "checkEn" },
  zh: { label: "中文", checkId: "checkZh" },
  ja: { label: "日本語", checkId: "checkJa" },
  ko: { label: "한국어", checkId: "checkKo" },
};

const NON_EN_LANGS = ["zh", "ja", "ko"];

function getCurrentLanguageFromPath(pathname) {
  for (const lang of NON_EN_LANGS) {
    if (pathname.includes(`/language/${lang}/`)) return lang;
  }
  return "en";
}

function getCurrentFileName(pathname) {
  if (!pathname || pathname.endsWith("/")) return "index.html";
  const parts = pathname.split("/");
  const last = parts[parts.length - 1];
  return last || "index.html";
}

function buildTargetPath(targetLang) {
  const pathname = window.location.pathname;
  const fileName = getCurrentFileName(pathname);
  const isLanguagePage = /\/language\/(zh|ja|ko)\//.test(pathname);

  if (targetLang === "en") {
    if (!isLanguagePage) return pathname;
    return pathname.replace(/\/language\/(zh|ja|ko)\//, "/");
  }

  if (isLanguagePage) {
    return pathname.replace(/\/language\/(zh|ja|ko)\//, `/language/${targetLang}/`);
  }

  const prefix = pathname.endsWith(fileName) ? pathname.slice(0, -fileName.length) : pathname;
  return `${prefix}language/${targetLang}/${fileName}`;
}

function updateLanguageUI(lang) {
  const dropdown = document.getElementById("languageDropdown");
  const selectedLanguage = document.getElementById("selectedLanguage");

  if (dropdown) dropdown.classList.add("hidden");
  if (selectedLanguage) selectedLanguage.textContent = LANGUAGE_CONFIG[lang]?.label ?? "English";

  for (const code of Object.keys(LANGUAGE_CONFIG)) {
    const check = document.getElementById(LANGUAGE_CONFIG[code].checkId);
    if (check) check.classList.add("hidden");
  }

  const activeCheck = document.getElementById(LANGUAGE_CONFIG[lang]?.checkId ?? "checkEn");
  if (activeCheck) activeCheck.classList.remove("hidden");
}

function selectLanguage(lang) {
  console.log("selectLanguage called with:", lang);
  if (!LANGUAGE_CONFIG[lang]) lang = "en";

  updateLanguageUI(lang);
  const targetPath = buildTargetPath(lang);

  if (targetPath === window.location.pathname) {
    window.location.reload();
    return;
  }

  window.location.href = targetPath;
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

  const currentLang = getCurrentLanguageFromPath(window.location.pathname);
  updateLanguageUI(currentLang);
  console.log("Initialized language:", currentLang);
});

// Make functions globally available
window.toggleLanguageDropdown = toggleLanguageDropdown;
window.selectLanguage = selectLanguage;
