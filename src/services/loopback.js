/* eslint-disable */
import axios from 'axios';

const Storage = window.localStorage;

/**
 * Add a token in the local storage
 * */
function exportTokenToLocalStorage(token) {
    if (Storage) {
        Storage.setItem('loopback-token', JSON.stringify(token));
    }
}

/**
 * Remove token from local storage
 */
function removeTokenFromLocalStorage() {
    if (Storage) {
        Storage.removeItem('loopback-token');
        Storage.clear();
    }
}

function addTokenFromLocalStorage(http) {
    const token = Storage && Storage.getItem('loopback-token');
    if (token) {
        http.setToken(JSON.parse(token), false);
    }
}

const http = axios.create({
    //baseURL: 'http://api.ienergybook.com/api'
    baseURL: 'http://localhost:3000/api'
});

// Current setLoading function
let setLoading = () => {};

http.setLoadingFunction = fn => {
    setLoading = fn;
};

http.setToken = (token, save = true) => {
    http.token = token;
    http.defaults.headers.common.Authorization = token.id;
    if (save) {
        exportTokenToLocalStorage(token);
    }
};

http.removeToken = () => {
    delete http.defaults.headers.common.Authorization;
    removeTokenFromLocalStorage();
};

http.successCallback = (response) => {
    return response;
}

http.errorCallback = (error) => {
    return error;
}

const interceptResErrors = err => {
    try {
      setLoading(
          false,
          err.config.uid || err.response.config.uid
      );
          err = Object.assign(new Error(), err.response.data.error);
      } catch (e) {
    }
    return Promise.reject(err);
};

const interceptResponse = res => {
    setLoading(false, res.config.uid);
    try {
        return res.data;
    } catch (e) {
        return res;
    }
};
http.interceptors.response.use(interceptResponse, interceptResErrors);

// Set storage Token in http if exists
addTokenFromLocalStorage(http);

const interceptReqErrors = err => Promise.reject(err);
const interceptRequest = config => {
    config.uid = setLoading(true);
    return config;
};
http.interceptors.request.use(interceptRequest, interceptReqErrors);


export default http;
