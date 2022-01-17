const users = [
    { id: "xp4tDSCVEZ6M64rWTJnPITtiSpC5B2A7", username: "prateek18801", role: "admin", password: process.env.PASSKEY_SUPERUSER },
    { id: "1g0KJcMfTaZOOvKkwFj4eY0TEAWxfi4z", username: "admin@bdcoe", role: "admin", password: process.env.PASSKEY_ADMIN },
    { id: "naKNdMU1F7vVMt6ObmSPjwABcL5WzL1i", username: "user", role: "user", password: null }
];

module.exports = class User {

    static authenticateUsername(username, password) {
        const user = users.find(u => u.username === username);
        if (user.password === password && user.role === "admin") {
            return true;
        } else {
            return false;
        }
    }

    static authenticateId(id, password) {
        const user = users.find(u => u.id === id);
        if (user.password === password && user.role === "admin") {
            return true;
        } else {
            return false;
        }
    }

    static getUsername(id) {
        const user = users.find(u => u.id === id);
        return user.username;
    }

    static getId(username) {
        const user = users.find(u => u.username === username);
        return user.id;
    }

}