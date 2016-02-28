/**
 * Created by bob on 27/02/16.
 */
App = {};

App.totalScriptsLoaded = 0;
App.TOTAL_SCRIPTS = 12;

App.touchIdAttempts=0;
App.MAX_TOUCHID_ATTEMPTS=3;

App.logout = function(){
    Dialogs.confirm("Passwork","Are you sure you want to logout?",function(){
        Data.logout();
        location.reload(true);
    });
};

App.registerPasscode = function(){
    UI.switchPage("passcode");
    Passcode.registerPasscode();
};

App.init = function(){
    App.loadScript("js/libs/jquery.js",function(){
        App.totalScriptsLoaded++;

        $.fn.extend({
            animateCss: function (animationName) {
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                    $(this).removeClass('animated ' + animationName);
                });
            }
        });

        App.loadScript("js/Utils.js", function(){App.totalScriptsLoaded++;});
        App.loadScript("js/UI.js", function(){App.totalScriptsLoaded++;});
        App.loadScript("js/Data.js", function(){App.totalScriptsLoaded++;});
        App.loadScript("js/Dialogs.js", function(){App.totalScriptsLoaded++;});
        App.loadScript("js/Passcode.js", function(){App.totalScriptsLoaded++;});
        App.loadScript("js/Passwork.js", function(){App.totalScriptsLoaded++;});
        App.loadScript("js/passwork/libs/aes.js", function(){App.totalScriptsLoaded++;});
        App.loadScript("js/passwork/libs/base32.js", function(){App.totalScriptsLoaded++;});
        App.loadScript("js/passwork/libs/json2.js", function(){App.totalScriptsLoaded++;});
        App.loadScript("js/passwork/libs/md5.js", function(){App.totalScriptsLoaded++;});
        App.loadScript("js/passwork/api.js", function(){App.totalScriptsLoaded++;});
        App.loadScript("js/passwork/crypt.js", function(){App.totalScriptsLoaded++;});
        App.loadScript("js/passwork/storage.js", function(){App.totalScriptsLoaded++;});
        App.loadScript("js/passwork/transport.js", function(){App.totalScriptsLoaded++;});
        App.loadScript("js/passwork/transport-cached.js", function(){App.totalScriptsLoaded++;});

        App.bindEvents();
    });

};

App.bindEvents = function(){
    document.addEventListener('deviceready', App.onDeviceReady, false);
    document.addEventListener('backbutton',App.onBackPressed,false);
    document.addEventListener('pause', App.onPause, false);
};

App.onPause = function(){
    location.reload(true);
};

App.onBackPressed = function () {
  UI.onBackPressed();
};

App.onDeviceReady = function(){

    if(App.totalScriptsLoaded < App.TOTAL_SCRIPTS){
        setTimeout(App.onDeviceReady, 20);
        return;
    }

    UI.init();
    console.log("Device Ready");

    if(Utils.getDevice()==Utils.DEVICES.IOS){
        $(".navbar").css("padding-top","15px").css("height","60px;").css("min-height","60px");
        $(".navbar-brand").css("top","15px");
    }

    if(Data.isLoginDone()){
        //login done, show passwords
        //after passing data
        var loginData = Data.getLogin();
        Passwork.login(loginData[0], loginData[1], loginData[2],
            function(){
                //login was ok

                App.showPasswords(true);
            },
            function(){
                //login failed
                UI.showFirstPage("login");
            }
        );
    }else{
        //login not done
        UI.showFirstPage("login");
    }

};

App.showPasswords = function(isFirst, skipAuth){
    if(skipAuth){
        UI.switchPage("groups");
        UI.doShowPasswords(isFirst);
        return;
    }

    if(Utils.getDevice() == Utils.DEVICES.IOS){
        touchid.checkSupport(function(){
            //supporting touch ID
            touchid.authenticate(function(){
                //touch ID success
                console.log("touch id passed");
                UI.doShowPasswords(isFirst);
            }, function(){
                App.touchIdAttempts++;

                if(App.touchIdAttempts<App.MAX_TOUCHID_ATTEMPTS){
                    App.alternativeSecurityCheck(isFirst);
                }else{
                    App.showPasswords(isFirst);
                }

            }, "Passwork Mobile");
        }, function(){
            //not supporting touch ID
            console.log("touch ID not supported, trying alternative security checks");
            App.alternativeSecurityCheck(isFirst);
        });
    }else{
        App.alternativeSecurityCheck(isFirst);
    }

};

App.alternativeSecurityCheck = function(isFirst){
    Passcode.setOnCompleteCallback(function(pc){
        if(Data.checkPasscode(pc)){
            UI.switchPage("groups");
            UI.doShowPasswords(isFirst);
        }else{
            Passcode.clear();
            Dialogs.showShortBottomToast("Typed passcode is not correct. Please try again");
        }
    });
    UI.switchPage("passcode");
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
