'use strict';


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

