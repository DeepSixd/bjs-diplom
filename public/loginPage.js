'use strict'

const userForm = new UserForm();

userForm.loginFormCallback = loginData => {
    let loginCallback = alertLogin => {
        if(alertLogin.success) {
            location.reload();  
        } else {
            userForm.setLoginErrorMessage('Ошибка!');
        }
    };
    ApiConnector.login(loginData, loginCallback);
};

userForm.registerFormCallback = registerData => {
    let registerCallback = alertRegister => {
        if(alertRegister.success) {
            location.reload();  
        } else {
            userForm.setRegisterErrorMessage('Ошибка!');
        }
    };
    ApiConnector.register(registerData, registerCallback);
};
