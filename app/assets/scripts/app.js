import MobileMenu from './modules/MobileMenu';
import ScrollReveal from 'scrollreveal';

var mobileMenu = new MobileMenu();

function scrolly(classN) {
  ScrollReveal().reveal(classN, {
    distance: '20px',
    viewFactor: 0.2,
    delay: 0,
    duration: 1000,
    opacity: 0
  });
};

scrolly('.feature-item');
scrolly('.testimonial');
