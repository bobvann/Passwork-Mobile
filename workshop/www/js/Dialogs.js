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

/**
 * shows a short toast at the bottom of the app
 * @param message the message to be shown
 */
Dialogs.showShortBottomToast = function(message){

    window.plugins.toast.showWithOptions(
        {
            message: message,
            duration: "short",
            position: "bottom",
            //addPixelsY: -40  // added a negative value to move it up a bit (default 0)
            styling: {
                opacity: 0.5, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                backgroundColor: '#fdb540', // make sure you use #RRGGBB. Default #333333
                textColor: '#FFFFFF', // Ditto. Default #FFFFFF
                cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
                horizontalPadding: 20, // iOS default 16, Android default 50
                verticalPadding: 16 // iOS default 12, Android default 30
            }
        }
    );
};