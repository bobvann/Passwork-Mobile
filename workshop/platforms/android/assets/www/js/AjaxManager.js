/**
 * Created by bob on 27/02/16.
 */
/**
 * Contains methods for communicate in ajax with WebServices
 */
AjaxManager = {};

/**
 * PRIVATE method:
 * @returns the ajax object depending on user browser
 */
AjaxManager.x = function() {
    //Browser veri
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }

    //Internet Explorer (WP)
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for(var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

/**
 * PRIVATE method
 * Actually does the request
 * @param url the url to point
 * @param callback the callback when completed
 * @param method the string of the method (e.g. 'POST','GET',...)
 * @param data the data to send as JS object
 * @param async bool: wether to make an async call
 */
AjaxManager.send = function(url, callback, method, data, async) {
    var x = AjaxManager.x();
    x.open(method, url, async);


    x.setRequestHeader('App-Version',app.getVersion());

    if(PlayerManager.isSetup()){
        x.setRequestHeader('Player-Id',PlayerManager.getId());
    }

    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }

    x.onreadystatechange = function() {
        if (x.readyState == 4) {
            callback(x.status, x.responseText)
        }
    };

    x.send(data)
};

/**
 * Make a GET call
 * @param url the url to point
 * @param callback the callback when completed
 * @param data the data to send as JS object
 * @param async bool: wether to make an async call
 */
AjaxManager.get = function(url, data, callback, async) {

    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    AjaxManager.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};

/**
 * Make a POST call
 * @param url the url to point
 * @param callback the callback when completed
 * @param data the data to send as JS object
 * @param async bool: wether to make an async call
 */
AjaxManager.post = function(url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    AjaxManager.send(url, callback, 'POST', query.join('&'), async)
};

