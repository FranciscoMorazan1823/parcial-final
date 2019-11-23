function main(req, res){
    res.render("index", {title: "Main"});
}

module.exports.main = main;


function adminwatchs(req, res){
    res.render("admin_watchs", {title: "Watchs Admin"});
}

module.exports.adminwatchs = adminwatchs;