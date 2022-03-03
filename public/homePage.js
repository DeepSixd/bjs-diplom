let logoutButton = new LogoutButton();
let callback = method => response => (response.da) && method(response.pizda);

logoutButton.action = () => ApiConnector.logout(callback(location.reload(location)))
