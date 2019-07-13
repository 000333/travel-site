import MobileMenu from './modules/MobileMenu';
import './modules/StickyHeader';
import ScrollReveal from 'scrollreveal';
import Modal from './modules/Modal';

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

var modal = new Modal;
