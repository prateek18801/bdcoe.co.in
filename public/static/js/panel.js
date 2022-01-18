const userId = document.getElementById("userId").value;
async function toggleRegistration() {
    const password = prompt("Enter Password:").toLocaleLowerCase().trim();
    if (!password) return;
    if (password.length > 0) {
        setLoading();
        const response = await fetch('/admin/togglenrUrxS5yvupftlt9RW6c1NeOdmz6ptOs', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userId, password: password }),
            mode: "cors"
        });
        const state = await response.json();
        populateDOM(state);
    }
}

async function fetchStatus() {
    setLoading();
    const response = await fetch(`/admin/statusozp7Fi8bKbDtNFGLXnOTsODvVuv52LPE/${userId}`, { method: 'GET' });
    const state = await response.json();
    populateDOM(state);
}

function setLoading() {
    let registrationStatus = false;
    const toggleBtn = document.getElementById("toggleRegistration");
    const statusBadge = document.getElementById("statusBadge");
    const dateAlert = document.getElementById("dateAlert");
    if (statusBadge.classList.contains("bg-success")) {
        registrationStatus = true;
    }
    toggleBtn.classList.remove(`${registrationStatus ? "btn-danger" : "btn-success"}`)
    toggleBtn.classList.add("btn-secondary");
    toggleBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ...loading`;
    statusBadge.classList.remove(`${registrationStatus ? "bg-success" : "bg-danger"}`);
    statusBadge.classList.add("bg-secondary");
    statusBadge.innerHTML = `<div class="spinner-border spinner-border-sm" role="status"> <span class="visually-hidden">Loading...</span> </div>`;
    dateAlert.innerHTML = `<div class="spinner-border text-primary" role="status"> <span class="visually-hidden">Loading...</span> </div>`;

}

function populateDOM(state) {
    const toggleBtn = document.getElementById("toggleRegistration");
    const statusBadge = document.getElementById("statusBadge");
    const dateAlert = document.getElementById("dateAlert");

    toggleBtn.classList.remove("btn-secondary");
    statusBadge.classList.remove("bg-secondary");

    toggleBtn.classList.add(`${state.status ? "btn-danger" : "btn-success"}`);
    statusBadge.classList.add(`${state.status ? "bg-success" : "bg-danger"}`);

    toggleBtn.innerHTML = `${state.status ? "Close" : "Open"} Registration`;
    statusBadge.innerHTML = `${state.status ? "Open" : "Closed"}`;
    dateAlert.innerHTML = `<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#info-fill" /></svg><div>${state.status ? "Opened" : "Closed"} on ${state.modified}</div>`;
}

document.getElementById("btn-close-reply").addEventListener("click", ()=>{
    document.getElementById("card-reply").style.bottom = "-450px";
});


function fetchRegistrations(){

}
function populateRegistraionDOM() {

}
function fetchMails() {

}
function populateMailDOM() {

}