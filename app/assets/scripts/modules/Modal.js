import $ from 'jquery';

class Modal {
  constructor() {
    this.openModalBtn = $(".open-modal");
    this.modal = $(".modal");
    this.closeModalBtn = $(".modal__close");
    this.events();
  }
  events() {
    // click open modal btn
    this.openModalBtn.click(this.openModal.bind(this));

    // click X close btn
    this.closeModalBtn.click(this.closeModal.bind(this));

    // push any key
    $(document).keyup(this.keyPressHandler.bind(this));

  }

  keyPressHandler(e) {
    if (e.keyCode == 27) {
      this.closeModal();
    }
  }

  openModal() {
    this.modal.addClass("modal--is-visible");
    return false; //prevents default behavior of scroll up when link href="#"
  }
  closeModal() {
    this.modal.removeClass("modal--is-visible");
  }
}

export default Modal;
