/**
 * Created by bob on 27/02/16.
 */



UI = {};

UI.currentPage = '';

UI.pagesWithBack = ["group"];

UI.showFirstPage = function (page) {
    $("#page-" + page).css("display", "");
    UI.currentPage = page;


    $("#page-" + page).animateCss('fadeInUpBig');

};

UI.switchPage = function (page, back) {
    $("#page-" + UI.currentPage).css("display", "none");
    $("#page-" + page).css("display", "");
    UI.currentPage = page;

    if(UI.pagesWithBack.indexOf(page)>-1){
        $("#img-menu-back").css("display","");
    }else{
        $("#img-menu-back").css("display","none");
    }

    if(back){
        $("#page-" + page).animateCss('fadeInLeftBig');
    }else{
        $("#page-" + page).animateCss('fadeInRightBig');
    }

};

UI.onBackPressed = function(){
    switch(UI.currentPage){
        case 'group':
            UI.switchPage("main",true);
            break;
    }
};

UI.doShowPasswords = function (isFirst) {
    Passwork.data.groups.forEach(function (element, key, array) {

        var passwordList = $("<li class='list-group-item li-group-item' data-key='"+ key +"'>"+ element.name +"</li>");

        $("#ul-main-groups").append(passwordList);

    });

    $(".li-group-item").on("click",function(el){
        UI.populateGroup($(this).attr("data-key"));

        UI.switchPage("group");
    });

    if(isFirst){
        UI.showFirstPage("main");
    }else{
        UI.switchPage("main");
    }


};

UI.populateGroup = function(groupIndex){
    var showedCount = 0;
    var group = Passwork.data.groups[groupIndex];

    $("#h1-group-title").html(group.name);

    $("#ul-group-passwords").html("");

    group.passwords.forEach(function (element, key, array) {
        showedCount++;
        var passwordList = $("<li class='list-group-item'><a role='button' data-toggle='collapse' href='#li-group-under-" + key + "' aria-expanded='false' aria-controls='li-group-under-" + key + "'>" +element.name+"</a><a href='#' class='a-group-clipboard'><span class='glyphicon glyphicon-copy' data-key='" + key + "'></span></a></li>");
        var underPL = $("<div class='collapse li-group-password' id='li-group-under-"+key+"'>"+
            element.getPassword() +
            "" +
            "</div>");

        $("#ul-group-passwords").append(passwordList);
        $("#ul-group-passwords").append(underPL);

    });

    if(showedCount==0){
        $("#ul-group-passwords").append( $("<li class='list-group-item'>No Passwords Available in this Group</li>") );
        $("#ul-group-passwords").append( $("<li class='list-group-item'><a href='#'>Go Back</a></li>").on("click",function(){UI.onBackPressed();}) );
    }

    $(".a-group-clipboard").on("click",function(){

        var k = $(this.children[0]).attr("data-key");
        var p = group.passwords[k].getPassword();

        cordova.plugins.clipboard.copy(p);
        Dialogs.showShortBottomToast("Your password has been copied to your clipboard");
    })
};

UI.init = function(){
    $("#btn-login-submit").on("click", function () {
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

    $("#img-menu-back").on("click",function(){
        UI.onBackPressed();
    });


    $(".dv-passcode-number").on("click",function(){
        var nr = $(this).html();
        Passcode.pressButton(nr);
    });

    //TODO rimuovere!!!
    $("#btn-pierocerone").on("click",function(){
        $("#txt-login-password").val("Skatefighter_93");
        $("#txt-login-secretkey").val("Skatefighter_93");
        $("#txt-login-username").val("pieroometto93@gmail.com");

        $("#btn-login-submit").click();
    })
};





