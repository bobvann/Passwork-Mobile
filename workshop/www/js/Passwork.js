/**
 * Created by bob on 27/02/16.
 */
Passwork = {};

Passwork.data = {};

Passwork.login = function(email,password,crypto,okCallback,failCallback){
    var login = {
        'email' : email,
        'password' : password,
        'crypto' : crypto,
        'url' : 'https://passwork.me/'
    };

    var storage = new PWStorage({});

    var transport = new PWTransport(login);
    var transportWithCache = new PWCachedTransport(transport, storage);
    var crypt = new PWCrypt(login);
    var api = new PWApi(transportWithCache, crypt);

    api.login(function(logged){
        console.log("logged");  //debug
        console.log(logged);

        if(logged){
            api.getData(function(data){
                console.log(data);

                Passwork.data = data;

                /*
                data.groups.forEach(function(element,key,array){
                    var li = document.createElement("li");
                    li.innerHTML = element.name;

                    document.getElementById("groups").appendChild(li);
                });*/

                Data.saveLogin(email,password,crypto);
                okCallback();

            });


        }else{
            //not logged
            failCallback();
        }

    });

};




