//Display form modal
function displayModal() {
    const modal = document.getElementById("contact_modal");
    const userName = document.getElementById("user-name");
    userName.textContent = photographerFactory(photographerDatas).name
	modal.style.display = "block";
}

//Close form modal
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

//Submit form
function formSubmit() {
    const form = document.forms[0];
    const formInputs = form.elements
    for (let i=0; i < (formInputs.length - 1); i++) {
        console.log(formInputs[i].name + " : " + formInputs[i].value)
    }
    closeModal()
    return false;
}