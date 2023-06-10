
/* allows us to go from page to page depending 
        on whats clicked on the menu */
function transitionLayout(selectedItem) {
  var menu = document.getElementById("menu");
  var aboutPage = document.getElementById("about-page");
  var galleryPage = document.getElementById("gallery-page");
  var servicePage = document.getElementById("service-page");
  var schedulePage = document.getElementById("schedule-page");
  var contactPage = document.getElementById("contact-page");

  var menuItems = menu.getElementsByTagName("a");
  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.remove("active");
  }

  if (selectedItem === "About") {
    aboutPage.style.display = "inline-flex";
  } else {
    aboutPage.style.display = "none";
  }

  if (selectedItem === "Gallery") {
    galleryPage.style.display = "flex";
  } else {
    galleryPage.style.display = "none";
  }

  if (selectedItem === "Services") {
    servicePage.style.display = "inline-block";
  } else {
    servicePage.style.display = "none";
  }

  if (selectedItem === "Schedule") {
    schedulePage.style.display = "inline-block";
  } else {
    schedulePage.style.display = "none";
  }

  if (selectedItem === "Contact") {
    contactPage.style.display = "inline-block";
  } else {
    contactPage.style.display = "none";
  }

  var selectedMenuItem = document.querySelector(`[onclick="transitionLayout('${selectedItem}')"]`);
  selectedMenuItem.classList.add("active");
}

/* if the company name is clicked, return to nothing being displayed */
function returnToOriginal() {
  var aboutPage = document.getElementById("about-page");
  var galleryPage = document.getElementById("gallery-page");
  var servicePage = document.getElementById("service-page");
  var schedulePage = document.getElementById("schedule-page");
  var contactPage = document.getElementById("contact-page");

  aboutPage.style.display = "none";
  galleryPage.style.display = "none";
  servicePage.style.display = "none";
  schedulePage.style.display = "none";
  contactPage.style.display = "none";
}

/* displays services based on selected category */
function transitionLayout2(selectedItem) {
  var childrenPage = document.getElementById("children-page");
  var menPage = document.getElementById("men-page");
  var womenPage = document.getElementById("women-page");

  var servicesList = document.querySelectorAll(".services ul li a");

  servicesList.forEach(function (item) {
    item.classList.remove("active");
  });

  if (selectedItem === "Children") {
    childrenPage.style.display = "flex";
  } else {
    childrenPage.style.display = "none";
  }
  if (selectedItem === "Men") {
    menPage.style.display = "flex";
  } else {
    menPage.style.display = "none";
  }
  if (selectedItem === "Women") {
    womenPage.style.display = "flex";
  } else {
    womenPage.style.display = "none";
  }

  var selectedServiceItem = document.querySelector(".services ul li a[data-service='" + selectedItem + "']");
  selectedServiceItem.classList.add("active");
}

/* schedule steps change page */
window.onload = function() {
  let currentStep = 0;
  const formSteps = document.querySelectorAll('.form-step');
  const stepIndicators = document.querySelectorAll('.step-indicator li');
  const form = document.getElementById('appointment-form');
  const confirmationMessage = document.getElementById('confirmation-message');
  const bookAgainBtn = document.getElementById('book-again');

  function showCurrentStep() {
    formSteps.forEach((step, index) => {
      if (index === currentStep) {
        step.style.display = 'block';
      } else {
        step.style.display = 'none';
      }
    });
  }

  function updateStepIndicator() {
    stepIndicators.forEach((indicator, index) => {
      if (index === currentStep) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  function nextStep() {
    if (!validateStep()) {
      alert('Please fill in all the required fields.');
      return;
    }

    formSteps[currentStep].style.display = 'none';
    currentStep++;

    if (currentStep === formSteps.length) {
      submitForm();
    } else {
      showCurrentStep();
      updateStepIndicator();
    }
  }
  bookAgainBtn.addEventListener('click', function() {
    currentStep = 0; 
    showCurrentStep();
    updateStepIndicator();
    confirmationMessage.style.display = 'none'; 
    form.style.display = 'block'; 
    resetForm(); 
  });
  function previousStep() {
    formSteps[currentStep].style.display = 'none';
    currentStep--;
  
    if (currentStep < 0) {
      currentStep = 0;
    }
  
    showCurrentStep();
    updateStepIndicator();
  
    if (currentStep === 0) {
      confirmationMessage.style.display = 'none'; 
      form.style.display = 'block'; 
      resetForm(); 
      stepIndicators[2].classList.remove('active'); 
    }
  }
  function validateStep() {
    const inputs = formSteps[currentStep].querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        input.classList.add('invalid');
        isValid = false;
      } else {
        input.classList.remove('invalid');
      }
    });

    return isValid;
  }

  function resetForm() {
    form.reset(); 
  }

  function submitForm() {
    form.style.display = 'none'; 
    confirmationMessage.style.display = 'block'; 
  }

  showCurrentStep();
  updateStepIndicator();

  const step1ContinueBtn = document.getElementById('step1-continue');
  const step2ContinueBtn = document.getElementById('step2-continue');
  const step3ContinueBtn = document.getElementById('step3-continue');

  step1ContinueBtn.addEventListener('click', nextStep);
  step2ContinueBtn.addEventListener('click', nextStep);
  step3ContinueBtn.addEventListener('click', nextStep);

  bookAgainBtn.addEventListener('click', previousStep);
};

/* gallery image scrolling */
$(document).ready(function() {
  var gallery = $('.gallery');
  var galleryContainer = $('.gallery-container');
  var images = gallery.find('img');
  var currentIndex = 0;

  function showImage(index) {
      images.hide();
      images.eq(index).show();
  }

  function navigate(direction) {
      currentIndex += direction;
      if (currentIndex < 0) {
          currentIndex = images.length - 1;
      } else if (currentIndex >= images.length) {
          currentIndex = 0;
      }
      showImage(currentIndex);
  }

  showImage(currentIndex);

  $('.arrow-left').click(function() {
      navigate(-1);
  });

  $('.arrow-right').click(function() {
      navigate(1);
  });

  var totalWidth = images.length * 100;
  gallery.width(totalWidth + '%');
  images.width(100 / images.length + '%');

  $(window).resize(function() {
      var scrollLeft = galleryContainer.scrollLeft();
      var newScrollLeft = currentIndex * galleryContainer.width();
      if (scrollLeft !== newScrollLeft) {
          galleryContainer.scrollLeft(newScrollLeft);
      }
  });
});
