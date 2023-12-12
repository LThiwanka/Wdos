const roomsPrices = {
  "1": 25000,
  "2": 35000,
  "3": 40000,
};

const kidsAbove5 = 5000;
const extraBed = 8000;
const promoDiscount = 5;

const roomReservationCheckin =
  document.getElementById("room-reservation-checkin");
const roomReservationCheckOut =
  document.getElementById("room-reservation-checkout");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
};

document.querySelectorAll(".contact .row .faq .box h3").forEach((faqBox) => {
  faqBox.onclick = () => {
    faqBox.parentElement.classList.toggle("active");
  };
});

var swiper = new Swiper(".home-slider", {
  loop: true,
  effect: "coverflow",
  spaceBetween: 30,
  grabCursor: true,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".gallery-slider", {
  loop: true,
  effect: "coverflow",
  slidesPerView: "auto",
  centeredSlides: true,
  grabCursor: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

var swiper = new Swiper(".reviews-slider", {
  loop: true,
  slidesPerView: "auto",
  grabCursor: true,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
  },
  breakpoints: {
    768: {
      slidesPerView: 1,
    },
    991: {
      slidesPerView: 2,
    },
  },
});

const roomReservation = document.getElementById("room-reservation-room");

function dateChangeEvent() {
  const roomReservationCheckinValue =
    document.getElementById("room-reservation-checkin").value;
  const roomReservationCheckOutValue =
    document.getElementById("room-reservation-checkout").value;

  if (roomReservationCheckinValue && roomReservationCheckOutValue) {
    roomReservation.removeAttribute("disabled");
  } else {
    roomReservation.setAttribute("disabled", "disabled");
  }
}

function roomReservationPrice() {
  const roomReservationCheckinValue =
    document.getElementById("room-reservation-checkin").value;
  const roomReservationCheckOutValue =
    document.getElementById("room-reservation-checkout").value;

  const roomReservationInfoWrapper = document.getElementById("room-reservation-info-wrapper");
  const roomReservationInfo = document.getElementById("room-reservation-info");

  const roomReservationFullName = document.getElementById("room-reservation-fullname").value;
  const roomReservationAdults = document.getElementById("room-reservation-adults").value;
  const roomReservationChildren = document.getElementById("room-reservation-childs").value;

  const checkboxes = document.querySelectorAll('.extrareq');

  const checkedValues = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  const checkedValuesString = checkedValues.join(', ');

  if (
    roomReservation.value !== null && roomReservationCheckOutValue &&
    roomReservationCheckinValue && roomReservationFullName !== ""
  ) {
    var checkIn = new Date(roomReservationCheckinValue);
    var checkOut = new Date(roomReservationCheckOutValue);

    var timeDiff = checkOut.getTime() - checkIn.getTime();

    var dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    var getPrice = roomsPrices[roomReservation.value] * dayDiff;

    if (isNaN(getPrice)) {
      roomReservationInfoWrapper.classList.add("hide-sections");
    } else {
      roomReservationInfoWrapper.classList.remove("hide-sections");
      roomReservationInfo.innerHTML = `<p class="typo">Full Name - ${roomReservationFullName}</p>` +
        `<p class="typo">Check In - ${roomReservationCheckinValue}</p>` +
        `<p class="typo">Check Out - ${roomReservationCheckOutValue}</p>` +
        `<p class="typo">Adult(s) - ${roomReservationAdults}</p>` +
        `<p class="typo">Children(s) - ${roomReservationChildren !== "" ? roomReservationChildren : `0`}</p>` +
        `<p class="typo">Total Price - ${getPrice}</p>` +
        `<p class="typo">Extra Requirements - ${checkedValuesString !== "" ? checkedValuesString : '-'}</p>`;
    }
  }
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  return `${year} -${month} -${day} `;
}

roomReservationCheckin.min = getCurrentDate();
roomReservationCheckOut.min = getCurrentDate();
