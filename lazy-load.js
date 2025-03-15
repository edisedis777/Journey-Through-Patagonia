/**
 * Lazy Load Implementation
 * This script implements lazy loading for images to improve page performance
 */

document.addEventListener("DOMContentLoaded", function () {
  // Select all images that should be lazy loaded
  const lazyImages = document.querySelectorAll(".photo-item img");

  // Function to determine if an element is in the viewport
  const isInViewport = function (element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Function to load images when they come into view
  const lazyLoad = function () {
    lazyImages.forEach(function (img) {
      if (isInViewport(img) && img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        img.classList.remove("lazy");
      }
    });
  };

  // Add data-src attribute to all images in the photo grid
  lazyImages.forEach(function (img) {
    // Store the current src in data-src
    if (!img.dataset.src) {
      img.dataset.src = img.src;
      // Set a placeholder or low-res version initially
      // img.src = 'images/placeholder.jpg'; // Uncomment if you have a placeholder
      img.classList.add("lazy");
    }
  });

  // Add event listeners
  window.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);

  // Initial check
  lazyLoad();
});
