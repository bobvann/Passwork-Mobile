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

UI.goBack = function(){

};

UI.doShowPasswords = function () {
    Passwork.data.groups.forEach(function (element, key, array) {

        var passwordList = $("<li class='list-group-item li-group-item' data-key='"+ key +"'>"+ element.name +"</li>");

        $("#ul-main-groups").append(passwordList);

    });

    $(".li-group-item").on("click",function(el){
        UI.populateGroup($(this).attr("data-key"));

        UI.switchPage("group");
    });

    UI.switchPage("main");

};

UI.populateGroup = function(groupIndex){
    var group = Passwork.data.groups[groupIndex];

    $("#h1-group-title").html(group.name);

    group.passwords.forEach(function (element, key, array) {

        var passwordList = $("<li class='list-group-item' data-key='"+ key +"'>"+ element.name +"</li>");

        $("#ul-group-passwords").append(passwordList);

    });


};

UI.init = function(){
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



};





