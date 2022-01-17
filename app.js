if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const cookieparser = require("cookie-parser");
const path = require("path");

require("./utils/db").connect();
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const errorController = require("./controllers/error");

const PORT = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());

app.use(express.static(path.join(__dirname, "public", "build")));
app.use(express.static(path.join(__dirname, "public", "static")));

app.use(userRoutes);
app.use("/admin", adminRoutes);

app.use(errorController.get404);

app.listen(PORT, () => {
    console.log(`server up and running on port ${PORT}`);
});