/**
 * Created by bob on 27/02/16.
 */

Dialogs = {};


/**
 * Shows up a dialog with an message
 * @param message the message to show
 */
Dialogs.info = function(message){
    navigator.notification.alert(
        message,  // message
        undefined,         // callback
        'Passwork Mobile',          // title
        'OK'               // buttonName
    );
};

/**
 * Shows up a confirm to the user
 * @param title the title of the dialog
 * @param message the message to write into the dialog
 * @param yesCallback the function to call when user clicked YES/OK
 */
Dialogs.confirm = function(title, message, yesCallback){
    navigator.notification.confirm(
        message, // message
        function(index){
            if(index==1){ //popup accepted
                yesCallback();
            }
        },            // callback to invoke with index of button pressed
        title,           // title
        ["OK","Cancel"]     // buttonLabels
    );
};