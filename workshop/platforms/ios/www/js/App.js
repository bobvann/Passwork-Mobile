/**
 * Created by bob on 27/02/16.
 */
App = {};

App.init = function(){
    App.loadScript("js/libs/jquery.js",function(){
        App.loadScript("js/AjaxManager.js");
        App.loadScript("js/passwork-js/api.js");
        App.loadScript("js/passwork-js/crypt.js");
        App.loadScript("js/passwork-js/storage.js");
        App.loadScript("js/passwork-js/transport.js");
        App.loadScript("js/passwork-js/transport-cached.js");

        App.bindEvents();
    });

    setTimeout(function(){
        App.loadScript("js/passwork-js/example.js");
    },200);






};

App.bindEvents = function(){
    document.addEventListener('deviceready', App.onDeviceReady, false);
};

App.onDeviceReady = function(){
    console.log("Device Ready");

    touchid.checkSupport(function(){
        //supporting touch ID
        touchid.authenticate(function(){
            //touch ID success
            alert("yess! successo");
        }, function(){
            alert("touch ID fallito");
        }, "testo di prova");
    }, function(){
        //not supporting touch ID

        alert("touch ID non supportato");
    });
};

App.loadScript = function(file, callback){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = file;
    script.charset = "UTF-8";
    script.onload = callback;
    document.head.appendChild(script);
};

App.init();