const userId = document.getElementById("userId").value;
const replyCard = document.getElementById("card-reply");
const replyId = document.getElementById("mailto");
const replySub = document.getElementById("mailsubject");
const replyMessage = document.getElementById("mailcontent");

document.getElementById("btn-close-reply").addEventListener("click", () => {
    replyCard.style.bottom = "-450px";
    replyId.value = '';
    replySub.value = '';
    replyMessage.value = '';
});

function replyToMail() {
    replyCard.style.bottom = "10px";
}

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

async function fetchRegistrations() {
    document.getElementById("content-table").innerHTML = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;
    let response = await fetch(`/admin/eventlog8hUM5uE8unNJCOiGWhY197SqKPOJtwiJ/${userId}`, { method: 'GET' });
    const jsonData = await response.json();
    populateRegistraionDOM(jsonData);
}
function populateRegistraionDOM(data) {
    let tbodyContent = '';
    let i = 1;
    data.forEach(record => {
        tbodyContent += `<tr>
        <th scope="row">${i}</th>
        <td>${record.name}</td>
        <td>${record.stdno}</td>
        <td>${record.branch}-${record.section}</td>
        <td>${record.domain}</td>
        <td>${record.email}</td>
        <td>${record.contact}</td>
        <td class="d-flex">
            <button class="btn btn-outline-danger p-0 me-1" type="button"><span class="material-icons-outlined">delete</span></button>
            <button class="btn btn-outline-primary p-0" type="button"><span class="material-icons-outlined">edit</span></button>
        </td>
    </tr>`
        i++;
    });
    document.getElementById("content-table").innerHTML = `<thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Std.No.</th>
        <th scope="col">Branch</th>
        <th scope="col">Domain</th>
        <th scope="col">Email</th>
        <th scope="col">Contact</th>
        <th scope="col">Actions</th>
    </tr>
</thead>
<tbody id="content-table-body">
</tbody>`
    document.getElementById("content-table-body").innerHTML = tbodyContent;
}


async function fetchMails() {
    document.getElementById("content-table").innerHTML = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;
    let response = await fetch(`/admin/contactlogtehtp5Dy6FqYB6YEKvu4o9xJhlAeE3Xw/${userId}`, { method: 'GET' });
    const jsonData = await response.json();
    populateMailDOM(jsonData);
}
function populateMailDOM(data) {
    let tbodyContent = '';
    let i = 1;
    data.forEach(record => {
        tbodyContent += `<tr>
        <th scope="row">${i}</th>
        <td>${record.name}</td>
        <td>${record.email}</td>
        <td>${record.message}</td>
        <td class="d-flex">
            <button class="btn btn-outline-danger p-0" type="button"><span class="material-icons-outlined">delete</span></button>
            <button class="btn btn-outline-success p-0 mx-1" type="button" onclick="replyToMail()"><span class="material-icons-outlined">reply</span></button>
            <button class="btn btn-outline-primary p-0" type="button"><span class="material-icons-outlined">share</span></button>
        </td>
    </tr>`
        i++;
    });
    document.getElementById("content-table").innerHTML = `<thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Message</th>
        <th scope="col">Actions</th>
    </tr>
</thead>
<tbody id="content-table-body">
</tbody>`
    document.getElementById("content-table-body").innerHTML = tbodyContent;
}