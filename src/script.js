const toggleButton = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const iconClose = document.getElementById("icon-close");
const iconMenu = document.getElementById("icon-menu");
const navMenu = document.getElementById("nav-menu");
const toTopButton = document.getElementById("to-top-button");

let isEncryptMode = true;
const inputTitle = document.getElementById("input-title");
const outputTitle = document.getElementById("output-title");
const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text");
const switchButton = document.getElementById("switch-button");

toggleButton.addEventListener("click", () => {
  iconMenu.classList.toggle("hidden");
  iconClose.classList.toggle("hidden");
  mobileMenu.classList.toggle("hidden");
});

function showModalAbout() {
  document.getElementById("modalAbout").classList.add("flex");
  document.getElementById("modalAbout").classList.remove("hidden");
}

function closeModalAbout() {
  document.getElementById("modalAbout").classList.add("hidden");
}

// navbar scroll
window.addEventListener("scroll", function () {
  if (window.scrollY > 0) {
    navMenu.classList.add("shadow-md");
    toTopButton.classList.remove("hidden");
  } else {
    navMenu.classList.remove("shadow-md");
    toTopButton.classList.add("hidden");
  }
});

// Encrypt vase64
function encrypt(text) {
  return btoa(text);
}
// Decrypt base64
function decrypt(text) {
  try {
    return atob(text);
  } catch (e) {
    return "Invalid Teks";
  }
}

function updateOutput() {
  outputText.value = isEncryptMode
    ? encrypt(inputText.value)
    : decrypt(inputText.value);
}

inputText.addEventListener("input", updateOutput);

switchButton.addEventListener("click", () => {
  // Swap modes
  isEncryptMode = !isEncryptMode;

  // Swap titles
  inputTitle.textContent = isEncryptMode ? "Encrypt" : "Decrypt";
  outputTitle.textContent = isEncryptMode ? "Encrypt Result" : "Decrypt Result";

  // Reset or swap content
  inputText.value = outputText.value;
  updateOutput();
});

function copyText() {
  const copyText = outputText;
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile
  navigator.clipboard.writeText(copyText.value)
  .then(() => {
    showMessageCopied();
  })
  .catch((err) => {
    console.error('Gagal menyalin teks: ', err);
  });

}

function showMessageCopied() {
  const message = document.getElementById("copied-message");
  message.classList.remove("hidden"); // Make it visible

  // Hide after 2 seconds
  setTimeout(() => {
    message.classList.add("hidden");
  }, 2000);
}

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-primary");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("text-primary");
    }
  });
});
