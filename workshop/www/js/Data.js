/**
 * Created by bob on 27/02/16.
 */
Data = {};

Data.isLoginDone = function(){
    return (localStorage.getItem("PassworkMobile_Username") != null);
};

Data.isSecretKeySaved = function(){
    return (localStorage.getItem("PassworkMobile_SecretKey") != null);
};

Data.saveLogin = function(username, password, secretkey){
    localStorage.setItem("PassworkMobile_Username",username);
    localStorage.setItem("PassworkMobile_Password",password);
    localStorage.setItem("PassworkMobile_SecretKey",secretkey);
};

Data.getLogin = function(){
    return[
        localStorage.getItem("PassworkMobile_Username"),
        localStorage.getItem("PassworkMobile_Password"),
        localStorage.getItem("PassworkMobile_SecretKey")
    ];
};

Data.getSecretKey = function(){
    return localStorage.getItem("PassworkMobile_SecretKey");
};

Data.setPasscode = function(passcode){
    localStorage.setItem("PassworkMobile_Passcode",passcode);
};

Data.getPasscode = function(){
    return localStorage.getItem("PassworkMobile_Passcode");
};

Data.checkPasscode = function(pc){
    return localStorage.getItem("PassworkMobile_Passcode")==pc;
};

Data.logout = function(){
    localStorage.clear();
};