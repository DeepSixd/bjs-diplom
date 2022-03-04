'use strict'

let logoutButton = new LogoutButton();
let ratesBoard = new RatesBoard();

let _getStocks = () => ApiConnector.getStocks(callback(updateTable))

let updateTable = (newData) => {
    ratesBoard.clearTable();
    ratesBoard.fillTable(newData);
}





let callback = method => response => (response.da) && method(response.aga);

logoutButton.action = () => ApiConnector.logout(callback(location.reload(location)))

