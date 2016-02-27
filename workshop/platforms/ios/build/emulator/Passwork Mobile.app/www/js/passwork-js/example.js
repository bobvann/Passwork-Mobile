'use strict';

var login = {
    'email' : 'roberto.vann.95@gmail.com',
    'password' : 'Bud4p3st2095',
    'crypto' : 'ud1n33@24d',
    'url' : 'https://passwork.me/',
};

var storage = new PWStorage({});

var transport = new PWTransport(login);
var transportWithCache = new PWCachedTransport(transport, storage);
var crypt = new PWCrypt(login);
var api = new PWApi(transportWithCache, crypt);

api.login(function(logged){
    console.log("logged");  //debug
    console.log(logged);
	api.getData(function(data){
        console.log(data);

        data.groups.forEach(function(element,key,array){
            var li = document.createElement("li");
            li.innerHTML = element.name;

            document.getElementById("groups").appendChild(li);
        });

	});
});

