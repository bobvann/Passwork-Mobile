/**
 * Created by bob on 27/02/16.
 */
Passcode = {};

Passcode.stack = [];
Passcode.onCompleteCallback = undefined;


Passcode.registerPasscode = function(){
    Passcode.setOnCompleteCallback(function(passcode1){
        Dialogs.showShortBottomToast("Please insert your passcode again");
        Passcode.clear();
        Passcode.setOnCompleteCallback(function(passcode2){
            if(passcode2==passcode1){
                Dialogs.showShortBottomToast("You successfully choosed a passcode. Enjoy our app!");
                Data.setPasscode(passcode2);
                UI.switchPage("groups");
                App.showPasswords(true);

            }else{
                Dialogs.showShortBottomToast("Two inserted passcodes do not match. Please try again");
                Passcode.clear();
                Passcode.registerPasscode();
            }

        })
    });
};


Passcode.clear = function(){
    Passcode.stack = [];
    Passcode.updateFilled();
};
/**
 * sets up the callback when passcode write has been completed
 * @param cb the function to call when completed, takes one parameter which is 4-characters string containing the passcode
 */
Passcode.setOnCompleteCallback=function(cb){
    Passcode.onCompleteCallback=cb;
    //TODO usare questa funzione
};

Passcode.updateFilled = function(){
    var i=1;
    for(i=1;i<=Passcode.stack.length;i++){
        $("#dv-passcode-code-"+i).addClass("dv-passcode-full");
    }
    for(i=i;i<=4;i++){
        $("#dv-passcode-code-"+i).removeClass("dv-passcode-full");
    }
};

Passcode.pressButton = function(number){
    Passcode.stack.push(number);

    Passcode.updateFilled();

    if(Passcode.stack.length==4){
        var pc = Passcode.stack[0] + Passcode.stack[1] + Passcode.stack[2] + Passcode.stack[3];

        Passcode.onCompleteCallback(pc);
    }
};

Passcode.deleteButton = function(){
    if(Passcode.stack.length>0){
        Passcode.stack.pop();
    }

    Passcode.updateFilled();
};