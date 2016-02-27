/**
 * Created by bob on 27/02/16.
 */
UI = {};

UI.currentPage = '';

UI.showFirstPage = function(page){
    $("#page-"+page).css("display","");
    UI.currentPage = page;
};

UI.switchPage = function(page){
    $("#page-"+UI.currentPage).css("display","none");
    $("#page-"+page).css("display","");
    UI.currentPage = page;
};

UI.doShowPasswords = function(){
    alert("TODO mostrare password"); //TODO


    Passwork.data.groups.forEach(function(element,key,array){
        var li = document.createElement("li");
        li.innerHTML = element.name;

        document.getElementById("ul-main-groups").appendChild(li);
    });

    UI.switchPage("main");
};

$("#btn-login-submit").on("click",function(){
    Passwork.login($("#txt-login-username").val(), $("#txt-login-password").val(), $("#txt-login-secretkey").val(),
        function(){
            //login was ok
            App.showPasswords();
        },
        function(){
            //login failed
            alert("login failed");
        }
    );
});