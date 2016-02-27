/**
 * Created by bob on 27/02/16.
 */
App = {};

App.init = function(){
    App.loadScript("js/libs/jquery.js",function(){
        App.loadScript("js/UI.js");
        App.loadScript("js/Data.js");
        App.loadScript("js/Passwork.js");
        App.loadScript("js/passwork/api.js");
        App.loadScript("js/passwork/crypt.js");
        App.loadScript("js/passwork/storage.js");
        App.loadScript("js/passwork/transport.js");
        App.loadScript("js/passwork/transport-cached.js");

        App.bindEvents();
    });



};

App.bindEvents = function(){
    document.addEventListener('deviceready', App.onDeviceReady, false);
};

App.onDeviceReady = function(){
    console.log("Device Ready");

    if(Data.isLoginDone()){
        //login done, show passwords
        //after passing data
        var loginData = Data.getLogin();
        Passwork.login(loginData[0], loginData[1], loginData[2],
            function(){
                //login was ok
                App.showPasswords();
            },
            function(){
                //login failed
                alert("FATAL ERROR");
                //TODO gestire questa situazione (al momento torna al login)
                UI.showFirstPage("login");
            }
        );
    }else{
        //login not done
        UI.showFirstPage("login");
    }


};

App.showPasswords = function(){
//after security checks
    touchid.checkSupport(function(){
        //supporting touch ID
        touchid.authenticate(function(){
            //touch ID success
            console.log("touch id passed");
            UI.doShowPasswords();
        }, function(){
            //TODO touch id failed
            //TOOD gestire meglio
            App.showPasswords();
        }, "Passwork Mobile");
    }, function(){
        //not supporting touch ID
        console.log("touch ID not supported, trying alternative security checks");
        App.alternativeSecurityCheck();
    });
};

App.alternativeSecurityCheck = function(){
    //TODO fare davvero controllo di sicurezza con codice
    UI.doShowPasswords();
};

//util
App.loadScript = function(file, callback){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = file;
    script.charset = "UTF-8";
    script.onload = callback;
    document.head.appendChild(script);
};

App.init();



setTimeout(function(){
    if(touchid == undefined){
        console.log("debug mode");
        //debug
        touchid = {};
        touchid.checkSupport=function(cb1,cb2){cb2()};
        touchid.authenticate=function(cb1,cb2,msg){cb2();};

       App.onDeviceReady();
    }

},1500);
