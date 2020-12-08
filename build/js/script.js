const table = document.querySelector('.providers-table');
const statusArr = table.querySelectorAll('.provider-status__inner-cover');

const providers = document.querySelectorAll('.providers-list__item')

const statusOptions = document.querySelector('.provider-status__modal');
const optionsArr = statusOptions.querySelectorAll('.provider-modal__options-item');


const textArea = document.querySelector(`.modal__textarea`);
const detailMenu = document.querySelector(`.provider-more`);


const main = document.querySelector(`.main`);


const DETAIL_WIDTH = 160;

const windowClickHandler = () => {

  if (!detailMenu.contains(event.target) && !event.target.classList.contains(`provider-details`)) {
    detailMenu.classList.add('visually-hidden');
    window.removeEventListener('click', windowClickHandler)
  }
}

const optionsClickHandler = (option) => {
  status.innerHTML = option.innerHTML;
  option.removeEventListener(`click`, optionsClickHandler)
}

let obj = {
  status: '',
  index: ''
}

const statusClickHandler = function (event) {
  //this.removeEventListener(`click`, statusClickHandler);
  statusOptions.style.left = event.clientX + 'px';
  statusOptions.style.top = event.clientY + 'px';
  statusOptions.classList.remove('visually-hidden');

  obj.status = this;
  obj.index = [...statusArr].indexOf(this);
  console.log(obj.index);
  optionsArr.forEach(option => option.addEventListener('click', function () {
    obj.status.innerHTML = this.innerHTML;

    if (this.classList.contains('provider-modal__options-item--cancel')) {
      providers[obj.index].classList.add('providers-list__item--cancel')
    } else {
      providers[obj.index].classList.remove('providers-list__item--cancel')
    }
    statusOptions.classList.add('visually-hidden');
  }))
}

const providerDetails = document.querySelectorAll('.provider-details');
const providerFeedback = detailMenu.querySelector(`.provider-more__link--feedback`);

providerDetails.forEach(detail => detail.addEventListener('click', (evt) => {
  detailMenu.style.left = evt.clientX - DETAIL_WIDTH + 'px';
  detailMenu.style.top = evt.clientY + 'px';
  detailMenu.classList.remove('visually-hidden');
  window.addEventListener(`click`, windowClickHandler)

}))

for (let i = 0; i < statusArr.length; i++) {

  statusArr[i].addEventListener(`click`, statusClickHandler)
}

const modalFeedback = document.querySelector(`.modal__overlay`);
providerFeedback.addEventListener('click', () => {
  modalFeedback.classList.remove('visually-hidden');
  modalFeedback.style.zIndex = '1';
})

const modalClose = modalFeedback.querySelector(`.modal-close`);
const modalSave = modalFeedback.querySelector(`.modal__button-save`);


//star-rating
const stars = modalFeedback.querySelectorAll('.modal__star');

for (let i = 0; i < stars.length; i++) {
  stars[i].addEventListener('click', function () {
    stars.forEach(star => { if (star.classList.contains('modal__star--gold')) { star.classList.remove('modal__star--gold') } })
    for (let j = 0; j <= i; j++) {
      stars[j].classList.add('modal__star--gold')
    }
  })
}


const closePopup = function () {
  stars.forEach(star => star.classList.remove(`modal__star--gold`));
  textArea.value = '';
  modalFeedback.classList.add('visually-hidden');
}
modalClose.addEventListener('click', closePopup);
modalSave.addEventListener('click', closePopup);