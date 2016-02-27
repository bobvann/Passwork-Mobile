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

UI.onBackPressed = function(){
    alert("back pressed");

    switch(UI.currentPage){
        case 'group':
            UI.switchPage("main");
            break;
    }
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

        var passwordList = $("<li class='list-group-item'><a role='button' data-toggle='collapse' href='#li-group-under-" + key + "' aria-expanded='false' aria-controls='li-group-under-" + key + "'>" +element.name+"</a></li>");
        var underPL = $("<li class='collapse li-group-password' id='li-group-under-"+key+"'>"+element.getPassword() +"</li>");

        $("#ul-group-passwords").append(passwordList);
        $("#ul-group-passwords").append(underPL);

    });
};

UI.init = function(){
    $("#btn-login-submit").on("click", function () {
        //TODO controllare che tutti i campi siano compilati
        var username=$("#txt-login-username").val(),
            password=$("#txt-login-password").val(),
            secretkey=$("#txt-login-secretkey").val();

        if(Utils.stringNullOrEmpty(username)){
            Dialogs.info("Please fill up your email");
            return;
        }
        if(Utils.stringNullOrEmpty(password)){
            Dialogs.info("Please fill up your password");
            return;
        }
        if(Utils.stringNullOrEmpty(secretkey)){
            Dialogs.info("Please fill up your secret key");
            return;
        }

        Passwork.login(username, password, secretkey,
            function () {
                //login was ok
                App.showPasswords();
            },
            function () {
                //login failed
                Dialogs.info("Login Failed. Please check your credentials");
            }
        );
    });

    $("#btn-menu-logout").on("click",function(){
       App.logout();
    });


};





