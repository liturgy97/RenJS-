const ssParallax = function () {
  const rellax = new Rellax(".rellax");
}; // end ssParallax

/* offcanvas menu
 * ------------------------------------------------------ */
const ssOffCanvas = function () {
  const menuToggle = document.querySelector(".s-header__menu-toggle");
  const nav = document.querySelector(".s-header__nav");
  const closeButton = document.querySelector(".s-header__nav-close-btn");
  const siteBody = document.querySelector("body");

  if (!(menuToggle && nav)) return;

  menuToggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    siteBody.classList.add("menu-is-open");
  });

  closeButton.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (siteBody.classList.contains("menu-is-open")) {
      siteBody.classList.remove("menu-is-open");
    }
  });

  siteBody.addEventListener("click", function (e) {
    if (!e.target.matches(".s-header__nav, .smoothscroll")) {
      closeButton.dispatchEvent(new Event("click"));
    }
  });
}; // end ssOffcanvas

/* masonry
 * ------------------------------------------------------ */
const ssMasonry = function () {
  const containerBricks = document.querySelector(".bricks");
  if (!containerBricks) return;

  imagesLoaded(containerBricks, function () {
    const msnry = new Masonry(containerBricks, {
      itemSelector: ".brick",
      columnWidth: ".brick",
      percentPosition: true,
      resize: true,
    });
  });
}; // end ssMasonry

/* animate elements if in viewport
 * ------------------------------------------------------ */

/* swiper
 * ------------------------------------------------------ */
const ssSwiper = function () {
  const clientsSwiper = new Swiper(".clients", {
    slidesPerView: 3,
    spaceBetween: 6,
    slideClass: "clients__slide",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      // when window width is > 500px
      501: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
      // when window width is > 900px
      901: {
        slidesPerView: 5,
        spaceBetween: 32,
      },
      // when window width is > 1200px
      1201: {
        slidesPerView: 6,
        spaceBetween: 40,
      },
    },
  });

  const testimonialsSwiper = new Swiper(".testimonial-slider", {
    slidesPerView: 1,
    effect: "slide",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}; // end ssSwiper

/* photoswipe
 * ----------------------------------------------------- */
const ssPhotoswipe = function (id = "", folioContainer = document) {
  const items = [];
  var pswp = document.querySelectorAll(".pswp")[0];
  if (id) pswp = document.getElementById(id);
  const folioItems = folioContainer.querySelectorAll(".folio-item");

  if (!(pswp && folioItems)) return;

  folioItems.forEach(function (folioItem) {
    let folio = folioItem;
    let thumbLink = folio.querySelector(".folio-item__thumb-link");
    let title = folio.querySelector(".folio-item__title");
    let caption = folio.querySelector(".folio-item__caption");
    let titleText = "";
    let captionText = "";
    if (title) titleText = "<h4>" + title.innerHTML + "</h4>";
    if (caption) captionText = caption.innerHTML;
    let href = thumbLink.getAttribute("href");
    let img = folio.querySelector("img");
    let datasize = imageDataSize(img);
    let size = datasize.split("x");
    let width = size[0];
    let height = size[1];

    let item = {
      src: href,
      w: width,
      h: height,
    };

    if (caption) {
      item.title = titleText.trim() + captionText.trim();
    }

    items.push(item);
  });

  // bind click event
  folioItems.forEach(function (folioItem, i) {
    let thumbLink = folioItem.querySelector(".folio-item__thumb-link");

    thumbLink.addEventListener("click", function (event) {
      event.preventDefault();

      let options = {
        index: i,
        showHideOpacity: true,
      };

      // initialize PhotoSwipe
      let lightBox = new PhotoSwipe(pswp, PhotoSwipeUI_Default, items, options);
      lightBox.init();
    });
  });
}; // end ssPhotoSwipe

/* alert boxes
 * ------------------------------------------------------ */
const ssAlertBoxes = function () {
  const boxes = document.querySelectorAll(".alert-box");

  boxes.forEach(function (box) {
    box.addEventListener("click", function (event) {
      if (event.target.matches(".alert-box__close")) {
        event.stopPropagation();
        event.target.parentElement.classList.add("hideit");

        setTimeout(function () {
          box.style.display = "none";
        }, 500);
      }
    });
  });
}; // end ssAlertBoxes

/* Back to Top
 * ------------------------------------------------------ */
const easeFunctions = {
  easeInQuad: function (t, b, c, d) {
    t /= d;
    return c * t * t + b;
  },
  easeOutQuad: function (t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
  },
  easeInOutQuad: function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  },
  easeInOutCubic: function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  },
};

const moveTo = new MoveTo(
  {
    tolerance: 0,
    duration: 1200,
    easing: "easeInOutCubic",
    container: document.querySelector("#regularPassage .scrollableDiv"),
  },
  easeFunctions
);

const moveToInstant = new MoveTo(
  {
    tolerance: 0,
    duration: 0,
    easing: "easeInOutCubic",
    container: document.querySelector("#regularPassage .scrollableDiv"),
  },
  easeFunctions
);

const moveToID = function (id) {
  const newMoveTo = new MoveTo(
    {
      tolerance: 0,
      duration: 1200,
      easing: "easeInOutCubic",
      container: document.querySelector("#regularPassage .scrollableDiv"),
    },
    easeFunctions
  );
  // console.log(document.querySelector('#regularPassage .scrollableDiv #' + id))
  newMoveTo.move(
    document.querySelector("#regularPassage .scrollableDiv #" + id)
  );
};

const moveToIDInstantly = function (id) {
  moveToInstant.move(
    document.querySelector("#regularPassage .scrollableDiv #" + id)
  );
};
