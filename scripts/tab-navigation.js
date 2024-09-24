const navMenuList = document.querySelectorAll(".menu");
const navBar = document.getElementById("nav");
const clippedDiv = document.querySelector("#clippedDiv");
const circle = document.querySelector("#circle");
let lastClicked = null;
let navMenuRectCenterList = [];

// Function to initialize navMenuRectCenterList
function initializeNavMenuRectCenterList() {
  navMenuRectCenterList = [];
  navMenuList.forEach((menu) => {
    const navMenuRect = menu.getBoundingClientRect();
    navMenuRectCenterList.push((navMenuRect.left + navMenuRect.right) / 2);
  });
}

// Initialize the navMenuRectCenterList
initializeNavMenuRectCenterList();

// Event listener for menu clicks
navMenuList.forEach((menu) => {
  menu.addEventListener("click", () => {
    lastClicked = menu;
    setActiveLink(menu); // Pass clicked menu to setActiveLink
  });
});

// Function to set active link based on clicked menu
function setActiveLink(clickedMenu) {
  navMenuList.forEach((link) => {
    if (link === clickedMenu) {
      link.classList.add("active");
      stylingMenu(link);
    } else {
      link.classList.remove("active");
    }
  });
}

// Function to apply styles and transformations
function stylingMenu(menu) {
  getBoundingRectOfElements();
  updateClippedDivAndCircle(menu);

  menu.classList.add("active");
}

// Function to reset non-active menu styles
function resetIconPositions() {
  navMenuList.forEach((menu) => {
    if (!menu.classList.contains('active')) {
      menu.classList.remove("active");
    }
  });
}

// Function to update clippedDiv and circle positions
function updateClippedDivAndCircle(menu) {
  const navMenuRect = menu.getBoundingClientRect();
  const navMenuRectCenter = (navMenuRect.left + navMenuRect.right) / 2;

  const halfOfTheClippedDiv = clippedDiv.getBoundingClientRect().width / 2;
  const clippedDivPosition = navMenuRectCenter - navBar.getBoundingClientRect().left - halfOfTheClippedDiv;
  clippedDiv.style.transform = `translateX(${clippedDivPosition / 16}rem)`;

  const halfOfTheCircle = circle.getBoundingClientRect().width / 2;
  const circlePosition = navMenuRectCenter - navBar.getBoundingClientRect().left - halfOfTheCircle;
  circle.style.transform = `translate(${circlePosition / 16}rem, -50%)`;

  menu.style.transform = `scale(1.25) translateY(-50%)`;
  menu.style.transition = `all .8s cubic-bezier(0.25, 1, 0.5, 1)`;
  menu.style.opacity = `1`;
}

// Function to get bounding rect of elements
function getBoundingRectOfElements() {
  navBarRect = navBar.getBoundingClientRect();
  clippedDivRect = clippedDiv.getBoundingClientRect();
  circleRect = circle.getBoundingClientRect();
}

// Event listeners for window resize and load
window.addEventListener("resize", () => {
  getBoundingRectOfElements();
  if (lastClicked) {
    stylingMenu(lastClicked);
  }
});

window.addEventListener("load", () => {
  const currentPage = window.location.pathname; // Get the current page URL path
  navMenuList.forEach((menu) => {
    if (menu.href.includes(currentPage)) {
      lastClicked = menu;
      setActiveLink(menu);
    }
  });
  circle.style.transition = `all .8s cubic-bezier(0.25, 1, 0.5, 1)`;
  clippedDiv.style.transition = `all .8s cubic-bezier(0.25, 1, 0.5, 1)`;
  stylingMenu(lastClicked); // Ensure styling is applied on load
});

navMenuList.forEach((menu) => {
  navMenuRect = menu.getBoundingClientRect();
  navMenuRectCenterList.push((navMenuRect.left + navMenuRect.right) / 2);
});


let navBarRect = navBar.getBoundingClientRect();


let clippedDivRect = clippedDiv.getBoundingClientRect();


let circleRect = circle.getBoundingClientRect();



navMenuList.forEach((menu) => {
  menu.addEventListener("click", () => {
    lastClicked = menu;
    stylingMenu(menu);
  });
});

function stylingMenu(menu) {
  getBoundingRectOfElements();
  resetIconPositons();

  navMenuRect = menu.getBoundingClientRect();
  let navMenuRectCenter = (navMenuRect.left + navMenuRect.right) / 2;

  let halfOftheClippedDiv = clippedDivRect.width / 2;
  let clippedDivPosition =
    navMenuRectCenter - navBarRect.left - halfOftheClippedDiv;
  clippedDiv.style.transform = `translateX(${clippedDivPosition / 16}rem)`;

  let halfOfTheCircle = circleRect.width / 2;
  let circlePosition = navMenuRectCenter - navBarRect.left - halfOfTheCircle;
  circle.style.transform = `translate(${circlePosition / 16}rem, -50%)`;

  menu.style.transform = `scale(1.25) translateY(-50%)`;
  menu.style.transition = `  all .8s cubic-bezier(0.25, 1, 0.5, 1)`;
  menu.style.opacity = `1`;
}

function resetIconPositons(menu) {
  navMenuList.forEach((menu) => {
    menu.style.transform = `scale(1) translateY(0)`;
    menu.style.transition = `  all .8s cubic-bezier(0.25, 1, 0.5, 1)`;
    menu.style.opacity = `0.5`;
  });
}

function getBoundingRectOfElements() {
  navBarRect = navBar.getBoundingClientRect();
  clippedDivRect = clippedDiv.getBoundingClientRect();
  circleRect = circle.getBoundingClientRect();
}

window.addEventListener("resize", () => {
  getBoundingRectOfElements();
  stylingMenu(lastClicked);
});

window.addEventListener("load", () => {
  stylingMenu(lastClicked);
    circle.style.transition = `all .8s cubic-bezier(0.25, 1, 0.5, 1)`;
  clippedDiv.style.transition = `all .8s cubic-bezier(0.25, 1, 0.5, 1)`;
});
 stylingMenu(lastClicked);
