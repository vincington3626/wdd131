document.addEventListener("DOMContentLoaded", function () {
    var toggleMenu = document.querySelector(".toggle-menu");
    if (toggleMenu) {
      toggleMenu.addEventListener("click", function () {
        var menuItems = document.querySelector(".menu-items");
        if (menuItems.style.display === "none") {
          menuItems.style.display = "block";
        } else {
          menuItems.style.display = "none";
        }
      });
    }
  });
  
  // Quick View Feature
  
  document.addEventListener("DOMContentLoaded", function () {
    // Select the elements
    var viewer = document.querySelector(".viewer");
    var images = document.querySelectorAll(".gallery img");
    var fullImageSrc = "Images/norris-full.jpeg"; // Path to the full image
  
    // Add event listener to the images
    images.forEach(function (image) {
      image.addEventListener("click", function () {
        viewer.classList.add("show");
        var img = document.createElement("img");
        img.src = fullImageSrc;
        img.alt = "Full Image";
        viewer.innerHTML = ""; // Clear previous content
        viewer.appendChild(img);
        var closeButton = document.createElement("button");
        closeButton.className = "close";
        closeButton.innerHTML = "X";
        viewer.appendChild(closeButton);
      });
    });
  
    // Add event listener to the close button
    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("close")) {
        viewer.classList.remove("show");
        viewer.innerHTML = ""; // Clear the viewer content when closing
      }
    });
  });