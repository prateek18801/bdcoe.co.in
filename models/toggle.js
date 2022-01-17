const fs = require("fs");
const path = require("path");
const p = path.join(path.dirname(require.main.filename), "data", "toggle.json");

module.exports = class Toggle {

    static toggleRegistration(cb) {
        fs.readFile(p, (err, content) => {

            const date = new Date();
            let toggle = { status: true, modified: date.toString() };

            if (!err) toggle = JSON.parse(content);
            else console.log(err);

            toggle.status = !toggle.status;
            toggle.modified = date.toString();

            fs.writeFile(p, JSON.stringify(toggle), err => {
                if (err) return console.log(err);
                cb(toggle);
            });
        });
    }

    static openRegistration(cb) {
        const date = new Date();
        const toggle = { status: true, modified: date.toString() };

        fs.writeFile(p, JSON.stringify(toggle), err => {
            if (err) return console.log(err);
            cb(toggle);
        });
    }

    static closeRegistration(cb) {
        const date = new Date();
        const toggle = { status: false, modified: date.toString() };

        fs.writeFile(p, JSON.stringify(toggle), err => {
            if (err) return console.log(err);
            cb(toggle);
        });
    }
    
    static getStatus(cb) {
        fs.readFile(p, (err, content) => {
            if (err) {
                cb(null);
                console.log(err);
            } else {
                const toggle = JSON.parse(content)
                cb(toggle);
            }
        });
    }
}