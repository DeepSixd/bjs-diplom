'use strict'

let logoutButton = new LogoutButton();
let ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

let callback = method => response => (response.da) && method(response.aga);
// Блок 1 - логаут
let reloadPage = response => {
    if (response.success == true) {
        location.reload();
    } 
}
logoutButton.action = () => ApiConnector.logout(reloadPage);

// Блок 2 - получение информации о пользователе

let showCurrent = response => {
    if (response.success == true) {
        ProfileWidget.showProfile(response.data); // в респонс получаем ответ от сервера, который передает нам data и success
    };
}
let getCurrentUser = ApiConnector.current(showCurrent);

// // Блок 3 - получение курсов валюты

let updateTable = response => {
    if (response.success == true) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }
};

let updateStocksTable = () => ApiConnector.getStocks(updateTable);
updateStocksTable();
setInterval(updateStocksTable, 60000);

// // Блок 4 - операции с деньгами

moneyManager.addMoneyCallback = dataAddMoney => ApiConnector.addMoney(dataAddMoney,addMoneyMethod);
let addMoneyMethod = response => {

    console.log(response.data);

    if (response.success == true) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(false, 'Баланс пополнен');
    } else {
        moneyManager.setMessage(true, response.data);
    }
}

moneyManager.conversionMoneyCallback = dataConversion => ApiConnector.convertMoney(dataConversion, conversionMoneyMethod);
let conversionMoneyMethod = response => {

    console.log(response.data);

    if (response.success == true) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(false, 'Деньги конвертированы');
    } else {
        moneyManager.setMessage(true, response.data);
    }
}

moneyManager.sendMoneyCallback = dataSendMoney => ApiConnector.transferMoney(dataSendMoney, transferMoneyMethod);
let transferMoneyMethod = response => {

    console.log(response.data);

    if (response.success == true) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(false, 'Деньги переданы');
    } else {
        moneyManager.setMessage(true, response.data);
    }
}

// Блок 5 - Работа с избранным



ApiConnector.getFavorites(response => {

    console.log(response.data);

    if(response.success == true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data); 
    };
});

favoritesWidget.addUserCallback = data = ApiConnector.addUserToFavorites(data, addUserToFavoritesMethod);
let addUserToFavoritesMethod = response => {
    
    console.log(response.data);

    if (response.success == true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(false, 'Пользователь добавлен');
    } else {
        favoritesWidget.setMessage(true, response.data);
    }
}


favoritesWidget.removeUserCallback = data = ApiConnector.removeUserFromFavorites(data, removeUserFromFavoritesMethod);
let removeUserFromFavoritesMethod = response => {
    
    console.log(response.data);

    if (response.success == true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(false, 'Пользователь удален');
    } else {
        favoritesWidget.setMessage(true, response.data);
    }
}
