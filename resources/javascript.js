
document.querySelector('.menu-icon').addEventListener('click', function() {
  var navUl = document.querySelector('.nav-ul');
  var overlay = document.querySelector('.overlay');
  var logo = document.querySelector('#header-logo');
  
  if (navUl.style.right === '0px') {
    navUl.style.right = '-350px';
    overlay.classList.remove('active');
    logo.src = '/resources/images/logo1a.png'; // Original logo
  } else {
    navUl.style.right = '0px';
    overlay.classList.add('active');
    logo.src = '/resources/images/logo1b.png'; // New logo when menu is out
  }
});

document.querySelector('.overlay').addEventListener('click', function() {
  var navUl = document.querySelector('.nav-ul');
  var overlay = document.querySelector('.overlay');
  var logo = document.querySelector('#header-logo');
  
  navUl.style.right = '-350px';
  overlay.classList.remove('active');
  logo.src = '/resources/images/logo1a.png'; // Original logo
});

document.addEventListener('DOMContentLoaded', function() {
  var carouselInner = document.querySelector('.carousel-inner');
  var carouselItems = document.querySelectorAll('.carousel-item');
  var prevBtn = document.querySelector('.prev');
  var nextBtn = document.querySelector('.next');
  var currentIndex = 0;
  var interval;
  var typingSpeed = 10; // Adjust typing speed as needed
  var hasCompletedCycle = false; // Flag to track if the carousel has completed one full cycle

  function typeText(element, text, speed, callback) {
    element.innerHTML = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    }
    type();
  }

  function showCarouselItem(index) {
    stopCarousel(); // Stop the carousel before showing a new item
    var offset = -index * 100;
    carouselInner.style.transform = 'translateX(' + offset + '%)';
    currentIndex = index;

    // Animate the text typing for the description paragraph
    var description = carouselItems[currentIndex].querySelector('p[data-text]');
    if (description) {
      var text = description.getAttribute('data-text');
      if (hasCompletedCycle) {
        description.innerHTML = text; // Display text immediately after the first cycle
        startCarousel();
      } else {
          typeText(description, text, typingSpeed, function() {
          // Start the interval again after the text is fully typed
          startCarousel();
        });
      }
    } else {
      // If no description, start the carousel immediately
      startCarousel();
    }
  }

  function showPrev() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
    showCarouselItem(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
    if (currentIndex === 0) {
      hasCompletedCycle = true; // Set the flag after completing one full cycle
    }
    showCarouselItem(currentIndex);
  }

  function startCarousel() {
    var description = carouselItems[currentIndex].querySelector('p[data-text]');
    if (description) {
      var text = description.getAttribute('data-text');
      var duration = text.length * typingSpeed + 1000; // Add some buffer time
      interval = setTimeout(showNext, duration);
    } else {
      interval = setTimeout(showNext, 3000); // Default duration if no description
    }
  }

  function stopCarousel() {
    clearTimeout(interval);
  }

  prevBtn.addEventListener('click', function() {
    stopCarousel();
    showPrev();
  });
  nextBtn.addEventListener('click', function() {
    stopCarousel();
    showNext();
  });
  carouselInner.addEventListener('mouseover', stopCarousel);
  carouselInner.addEventListener('mouseout', startCarousel);

  // Initialize the carousel
  showCarouselItem(currentIndex);
});

document.addEventListener('DOMContentLoaded', function() {
  // Get the slide-out menu and the menu icon
  var menu = document.querySelector(".nav-ul");
  var menuIcon = document.querySelector(".menu-icon");

  // Get all links in the slide-out menu
  var menuLinks = document.querySelectorAll(".nav-ul a");

  // Function to toggle the menu visibility
  function toggleMenu() {
    menu.classList.toggle("menu-hidden");
    document.body.classList.toggle("overlay-active");
  }

  // Add click event listener to the menu icon
  menuIcon.addEventListener('click', toggleMenu);

  // Add click event listener to each link
  menuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      // Hide the menu
      menu.classList.add("menu-hidden");

      // Remove the overlay
      document.body.classList.remove("overlay-active");
    });
  });

  // Get the modal
  var modal = document.getElementById("contact-modal");

  // Get the button that opens the modal
  var btn = document.querySelector(".contact-button");

  // Get the <span> element that closes the modal
  var span = document.querySelector(".close-button");

  // Get the contact link in the slide-out menu
  var contactLink = document.getElementById("contact-link");

  // Function to open the modal
  function openModal() {
      modal.style.display = "block";
  }

  // When the user clicks the button, open the modal 
  btn.onclick = openModal;

  // When the user clicks the contact link, open the modal and hide the menu if in mobile mode
  contactLink.onclick = function(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    openModal();

    // Check if the menu is visible (mobile mode)
    if (window.getComputedStyle(menu).display !== "none") {
      menu.classList.add("menu-hidden");
      document.body.classList.remove("overlay-active");
    }
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});