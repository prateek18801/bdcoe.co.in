const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

// function autofillEmail() {
//   const name = document.forms[0].elements[0].value.split(' ')[0].toLowerCase().trim();
//   const stdno = document.forms[0].elements[1].value.trim();
//   document.forms[0].elements[2].value = `${name}${stdno}@akgec.ac.in`;
// }