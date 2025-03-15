// Accessibility enhancements
document.addEventListener("DOMContentLoaded", () => {
  // Initialize focus-visible polyfill
  if (typeof applyFocusVisiblePolyfill === "function") {
    applyFocusVisiblePolyfill(document);
  }

  // Add aria labels to all images that don't have alt text
  document.querySelectorAll("img:not([alt])").forEach((img) => {
    img.setAttribute("alt", "");
    img.setAttribute("aria-hidden", "true");
  });

  // Make the lightbox more accessible
  document.querySelectorAll("[data-lightbox]").forEach((item) => {
    item.setAttribute("role", "button");
    item.setAttribute(
      "aria-label",
      `View larger image: ${item.querySelector("img").alt}`
    );
    item.setAttribute("tabindex", "0");

    // Allow keyboard activation
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        item.click();
      }
    });
  });

  // Initialize A11y-dialog for any modal windows
  const dialogs = document.querySelectorAll("[data-a11y-dialog]");
  if (dialogs.length && typeof A11yDialog === "function") {
    dialogs.forEach((dialogEl) => {
      const dialog = new A11yDialog(dialogEl);

      // Store the dialog instance for later use
      window.dialogs = window.dialogs || {};
      window.dialogs[dialogEl.id] = dialog;
    });
  }

  // Ensure all interactive elements have appropriate ARIA attributes
  document
    .querySelectorAll("button:not([aria-label]):not([aria-labelledby])")
    .forEach((button) => {
      if (!button.textContent.trim()) {
        button.setAttribute("aria-label", "Button");
      }
    });

  // Add role="presentation" to decorative elements
  document.querySelectorAll(".decorative").forEach((el) => {
    el.setAttribute("role", "presentation");
    el.setAttribute("aria-hidden", "true");
  });

  // Implement keyboard trap for modal dialogs
  document.addEventListener("keydown", function (e) {
    // Check if any modal is open
    const openModal = document.querySelector('.modal[aria-hidden="false"]');
    if (!openModal) return;

    // If Escape key is pressed, close the modal
    if (e.key === "Escape") {
      e.preventDefault();
      const dialogId = openModal.id;
      if (window.dialogs && window.dialogs[dialogId]) {
        window.dialogs[dialogId].hide();
      }
    }
  });
});
