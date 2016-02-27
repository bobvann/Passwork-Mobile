/**
 * Created by bob on 27/02/16.
 */



UI = {};

UI.currentPage = '';

UI.showFirstPage = function (page) {
    $("#page-" + page).css("display", "");
    UI.currentPage = page;
};

UI.switchPage = function (page) {
    $("#page-" + UI.currentPage).css("display", "none");
    $("#page-" + page).css("display", "");
    UI.currentPage = page;
};

UI.doShowPasswords = function () {
    Passwork.data.groups.forEach(function (element, key, array) {

        var passwordList = $("<li class='list-group-item'>"+ element.name +"</li>");

        $("#ul-main-groups").append(passwordList);

    });

    UI.switchPage("main");

};

$("#btn-login-submit").on("click", function () {
    Passwork.login($("#txt-login-username").val(), $("#txt-login-password").val(), $("#txt-login-secretkey").val(),
        function () {
            //login was ok
            App.showPasswords();
        },
        function () {
            //login failed
            alert("login failed");
        }
    );
});




