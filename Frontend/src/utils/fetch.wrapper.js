import React from 'react'


export const fetchWrapper = {
    AllMethods,
    postWithFile,
    get,
    }

    function AllMethods(url, body,method){

        const UserData = JSON.parse(localStorage.getItem('User_model')) ? JSON.parse(localStorage.getItem('User_model')) : {};
        const token = UserData[0]?.token ? UserData[0]?.token : "" ;

        const requestOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'api_key':"Library",
                'token':token},
            body: JSON.stringify(body)
        };
    
        return fetch(url, requestOptions).then(handleResponse);
    }

    function get(url){

        const UserData = JSON.parse(localStorage.getItem('User_model')) ? JSON.parse(localStorage.getItem('User_model')) : {};
        const token = UserData[0]?.token ? UserData[0]?.token : "" ;

        const requestOptions = {
            method: "GET",
            headers: {
                'api_key':"Library",
                'token':token},
        };
    
        return fetch(url, requestOptions).then(handleResponse);
    }


    function postWithFile(url, body){

        const UserData = JSON.parse(localStorage.getItem('User_model'));
        const token = UserData[0]?.token;
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'api_key':"Library",
                'token':token},
            body: body  
        };
    
        return fetch(url, requestOptions).then(handleResponse);
    }
    

    function handleResponse(response) {
        if(response.status == 401){
            window.location.href= '/';
            localStorage.removeItem('User_model');
            return;
        }
        return response.json().then(res=>{
            if(res.code === 0){
                const error = res.message || 'Some error occured please try again';
                return Promise.reject(error);
            }
            return res;
        })
    }

