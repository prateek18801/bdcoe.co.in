const valHead = /^[a-zA-Z0-9 ]*$/;
const valName = /^[a-zA-Z ]*$/;
const valStdno = /^[\dx]{7,8}[-dD]{0,2}$/;
const valEmail = /^\w+[\dx]{7,8}[-dD]{0,2}@akgec\.ac\.in$/;
const errCode = ["*Characters Only(Max. 30)", "*Invalid Student Number", "*Use College Email ID", "*Invalid Contact Number", "*Enter Unique Student No.", "*Enter Unique Email ID"];

const teamNameErr = document.getElementsByClassName("team-name-val")[0];
const nameErr = document.getElementsByClassName("name-val")
const stdnoErr = document.getElementsByClassName("stdno-val");
const emailErr = document.getElementsByClassName("email-val");
const yearErr = document.getElementsByClassName("year-val");

const form = document.forms['registrationForm'];

function validateForm() {
    resetErr();

    let returnVal = true;

    const team = form['teamname'].value;
    const year = form['year'].value;

    const leadName = form['leadname'].value;
    const leadStdno = form['leadstdno'].value;
    const leadEmail = form['leademail'].value;

    const memName = form['memname'].value;
    const memStdno = form['memstdno'].value;
    const memEmail = form['mememail'].value;

    if (!valHead.test(team)) {
        throwErr(teamNameErr, errCode[0]);
        returnVal = false;
    }

    if (year === "1") {
        if (!/^21[\dx]{5,6}$/.test(leadStdno)) {
            throwErr(stdnoErr[0], errCode[1]);
            returnVal = false;
        }
        if (!/^21[\dx]{5,6}$/.test(memStdno)) {
            throwErr(stdnoErr[1], errCode[1]);
            returnVal = false;
        }
    }

    if (year === "2") {
        if (!/^20[\d]{5}[-dD]{0,2}$/.test(leadStdno)) {
            throwErr(stdnoErr[0], errCode[1]);
            returnVal = false;
        }
        if (!/^20[\d]{5}[-dD]{0,2}$/.test(memStdno)) {
            throwErr(stdnoErr[1], errCode[1]);
            returnVal = false;
        }
    }

    

    if (!valName.test(leadName)) {
        throwErr(nameErr[0], errCode[0]);
        returnVal = false;
    }
    if (!valName.test(memName)) {
        throwErr(nameErr[1], errCode[0]);
        returnVal = false;
    }

    if (!valStdno.test(leadStdno)) {
        throwErr(stdnoErr[0], errCode[1]);
        returnVal = false;
    }
    if (!valStdno.test(memStdno)) {
        throwErr(stdnoErr[1], errCode[1]);
        returnVal = false;
    }

    if (!valEmail.test(leadEmail)) {
        throwErr(emailErr[0], errCode[2]);
        returnVal = false;
    }
    if (!valEmail.test(memEmail)) {
        throwErr(emailErr[1], errCode[2]);
        returnVal = false;
    }

    if (leadStdno === memStdno) {
        throwErr(stdnoErr[0], errCode[4]);
        throwErr(stdnoErr[1], errCode[4]);
        returnVal = false;
    }

    if (leadEmail === memEmail) {
        throwErr(emailErr[0], errCode[5]);
        throwErr(emailErr[1], errCode[5]);
        returnVal = false;
    }

    return returnVal;
}

function throwErr(id, err) {
    id.innerHTML = err;
}

function resetErr() {
    const errors = document.getElementsByClassName("err");
    for (let error of errors) {
        error.innerHTML = "";
    }
}

function captchaCb() {
    document.getElementById("btn-submit").removeAttribute("disabled");
}

function toggleInfo() {

    (document.getElementById("info-div").style.top === "4rem") ?
        document.getElementById("info-div").style.top = "-35rem"
        :
        document.getElementById("info-div").style.top = "4rem";
}

function autoFillLeadEmail() {
    const leadName = form['leadname'].value.replace(/ .*/, '').toLowerCase();
    const leadStdno = form['leadstdno'].value;
    if (leadName != '' && leadStdno != '') {
        form['leademail'].value = `${leadName}${leadStdno}@akgec.ac.in`;
    }
}
function autoFillMem1Email() {
    const mem1Name = form['memname'].value.replace(/ .*/, '').toLowerCase();
    const mem1Stdno = form['memstdno'].value;
    if (mem1Name != '' && mem1Stdno != '') {
        form['mememail'].value = `${mem1Name}${mem1Stdno}@akgec.ac.in`;
    }
}
function autoFillMem2Email() {
    const mem2Name = form['memname'].value.replace(/ .*/, '').toLowerCase();
    const mem2Stdno = form['memstdno'].value;
    if (mem2Name != '' && mem2Stdno != '') {
        form['mememail'].value = `${mem2Name}${mem2Stdno}@akgec.ac.in`;
    }
}
function fillSections() {
    const memsection = form['memsection'];
    const leadsection = form['leadsection'];
    if (form['year'].value === "1") {
        memsection.innerHTML = leadsection.innerHTML = `<option value="" disabled selected hidden>Section</option>
        <option value="1">S - 01</option>
        <option value="2">S - 02</option>
        <option value="3">S - 03</option>
        <option value="4">S - 04</option>
        <option value="5">S - 05</option>
        <option value="6">S - 06</option>
        <option value="7">S - 07</option>
        <option value="8">S - 08</option>
        <option value="9">S - 09</option>
        <option value="10">S - 10</option>
        <option value="11">S - 11</option>
        <option value="12">S - 12</option>
        <option value="13">S - 13</option>
        <option value="14">S - 14</option>
        <option value="15">S - 15</option>
        <option value="16">S - 16</option>
        <option value="17">S - 17</option>
        <option value="18">S - 18</option>
        <option value="19">S - 19</option>`
    } else if (form['year'].value === '2') {
        memsection.innerHTML = leadsection.innerHTML = `<option value="" disabled selected hidden>Section</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>`
    }
}
async function checkAvailability() {
    const t = form['teamname'].value;
    if (t === "") return;
    const response = await fetch(`/api/v1/availability?t=${t}`);
    const json = await response.json();
    if (json.error) {
        alert(json.message);
    }
    if (!json.available) {
        throwErr(teamNameErr, json.message);
    } else {
        teamNameErr.innerHTML = `<span style="color: green;">Available</span>`;
    }
}