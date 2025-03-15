/**
 * Smooth Scroll Implementation
 * This script provides smooth scrolling behavior for navigation links
 */

document.addEventListener("DOMContentLoaded", function () {
  // Select all links with hash (#) that link to elements on the same page
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Prevent default anchor click behavior
      e.preventDefault();

      // Get the target element from the href attribute
      const targetId = this.getAttribute("href");

      // Return if the target is just '#' (link to top)
      if (targetId === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      // Find the target element
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate offset to account for fixed header if needed
        const headerOffset = 60; // Adjust this value based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        // Scroll to the target with smooth behavior
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Update URL hash (optional)
        history.pushState(null, null, targetId);
      }
    });
  });

  // Navigation highlighting has been removed to keep text color consistent
});
