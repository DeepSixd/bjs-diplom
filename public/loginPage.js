"use strict"

const form = new UserForm();

form.loginFormCallback = function(loginData) {
    let loginCallback = (alertLogin) => {
        if(!alertLogin.errorMessage) {
            this.setLoginErrorMessage('error_login_test');
        } else {
            location.reload();
        }
    };
    ApiConnector.login(loginData, loginCallback);
};

form.registerFormCallback = function(registerData) {
    let registerCallback = (alertRegister) => {
        if(!alertRegister.errorMessage) {
            this.setRegisterErrorMessage('error_register_test');
        } else {
            location.reload();
        };
    };
    ApiConnector.register(registerData,registerCallback);
};
