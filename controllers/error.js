exports.get404 = (req, res, next) => {
    res.status(404).render("error/404", {
        pageTitle: "Page not found"
    });
}

exports.getFailed = (req, res, next) => {
    res.status(400).render("error/fail", {
        pageTitle: "Error"
    });
}