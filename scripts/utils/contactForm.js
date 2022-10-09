// DOM elements
const mainHeader = document.getElementById("main-header");
const main = document.getElementById("main");
const modal = document.getElementById("contact-modal");
const contactBtn = document.querySelector(".contact-button");
const closeBtn = document.querySelector("#contact-modal img");
const submitBtn = document.querySelector('form button');
const contactTitle = document.getElementById("contact-title");
const form = document.forms[0];
const formInputs = form.elements;
const firstname = document.getElementById("firstname");

// Global variables
let testArray = {
    firstname:
            {
                regex: /^[A-Za-zŠŒŽœžÀ-ÿ\- ']{2,}$/,
                errorMsg: 'Veuillez renseigner un prénom comprenant au moins 2 lettres ou caractères autorisés (espace, - , \' ).',
                isValid: false
            },
    lastname:
            {
                regex: /^[A-Za-zŠŒŽœžÀ-ÿ\- ']{2,}$/,
                errorMsg: 'Veuillez renseigner un nom comprenant au moins 2 lettres ou caractères autorisés (espace, - , \' ).',
                isValid: false
            },
    email:
            {
                regex: /^([\dA-Za-z!#$%&'*\/=?^_+\-`{|}~]([.]?[\dA-Za-z!#$%&'*\/=?^_+\-`{|}~]+)+)@[\dA-Za-z]([\-]?[\dA-Za-z]+)+\.[A-Za-z]{2,}$/,
                errorMsg: 'Veuillez renseigner une adresse email valide.',
                isValid: false
            },
    message:
            {
                regex: /^.{25,500}$/,
                errorMsg: 'Veuillez renseigner un message comprenant entre 25 et 500 caractères.',
                isValid: false
            }
}

// Enable the buttons to open and close the form
function manageContactForm() {
    contactBtn.addEventListener('click', displayModal);
    contactBtn.addEventListener('keydown', displayModal);
    closeBtn.addEventListener('click', closeModal);
    closeBtn.addEventListener('keyup', closeModal);
    submitBtn.addEventListener('click', formSubmit)
    submitBtn.addEventListener('keyup', formSubmit)
    displayErrorMsg()
}

// Display form modal
function displayModal(e) {
    console.log(' Display modal')
    if (e.type === 'click' || e.key ==='Enter') {
        document.querySelectorAll('.error').forEach(msg => msg.remove())
        document.addEventListener('keyup', keyboard);
        contactTitle.innerHTML = 'Contactez-moi<br>' + photographerFactory(photographerDatas).name
        modal.setAttribute('aria-labelledby', 'contact-title')
        modal.style.display = "block";
        firstname.focus();
        modal.setAttribute('aria-hidden', false);
        mainHeader.setAttribute('aria-hidden', true);
        main.setAttribute('aria-hidden', true);
    }
}

function keyboard(e) {
    if (e.key ==='Escape') {
        closeModal(e)
    }
}

// Close form modal
function closeModal(e) {
    if ( e.type === 'click' || ((e.key ==='Enter') && (e.currentTarget === closeBtn)) || e.key === 'Escape') {
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', true);
        mainHeader.setAttribute('aria-hidden', false);
        main.setAttribute('aria-hidden', false);
        contactBtn.focus();
        document.removeEventListener('keyup', keyboard);
    }
}

// Display error messages and update testArray
function displayErrorMsg() {
    for (let input in testArray) {
        let inputNode = document.getElementsByName(input)[0];
        form[input].addEventListener('input', function() {
            form[input].setAttribute('aria-invalid', true);
            if (inputNode.nextSibling) {inputNode.nextSibling.remove()};
            if (testArray[input].regex.test(form[input].value) === false) {
                let text = document.createElement('p');
                text.innerText = testArray[input].errorMsg;
                text.className = 'error';
                inputNode.parentNode.appendChild(text);
                testArray[input].isValid = false;
            } else {
                form[input].setAttribute('aria-invalid', false);
                testArray[input].isValid = true;
            }
        })
    }
}

// Return true when all inputs are valid
function isFormValid() {
    if (Object.values(testArray).every(elt => elt.isValid === true)) {
        return true
    }
}

// Submit form
function formSubmit(e) {
    e.preventDefault()
    if (e.key === 'Enter' || e.type === 'click') {
        if (submitBtn.nextSibling) {
            submitBtn.nextSibling.remove()
        }
        if (isFormValid()) {
            for (let i = 0; i < (formInputs.length - 1); i++) {
                console.log(formInputs[i].name + " : " + formInputs[i].value);
                formInputs[i].value = '';
                testArray[formInputs[i].name].isValid = false;
            }
            closeModal(e)
        } else {
            let msg = document.createElement('p');
            msg.className = 'error';
            msg.innerText = 'Veuillez vérifier l\'ensemble des champs à remplir.'
            submitBtn.parentNode.appendChild(msg);
            firstname.focus()
        }
    }
}

