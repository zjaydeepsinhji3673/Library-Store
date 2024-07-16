import axios from "axios";

export const request = async (url, method, token, payload, params = {}) => {

  const UserData = JSON.parse(localStorage.getItem('User_model')) ? JSON.parse(localStorage.getItem('User_model')) : {};
  const tokenu = UserData[0]?.token ? UserData[0]?.token : "" ;
  try {
    const headers = {
      "api_key": "Library",
      'Accept-language': 'en',
      'Content-Type': 'application/json',
      'app': 'W',
      ...(token && { token: tokenu }),
    };

    const result = await axios({ method, url, params, data:payload, headers });
    let decodeData = await result?.data;
    if (decodeData?.code === '0') {
      // TOAST_ERROR(decodeData?.message)
      console.log("Error")
    }
    return decodeData;
  } catch (error) {
    let decodeData = await (error?.response?.data);
    if (decodeData?.code == -1) {
      // logoutRedirection();
      let path = window.location.protocol + "//" + window.location.host + "/"
      window.location.href = path;
      localStorage.removeItem('User_model')
    } else {
      throw new Error(error);
    }
  }
};
export const  requestForFile = async (url, method, token, payload, params = {}) => {

  const UserData = JSON.parse(localStorage.getItem('User_model')) ? JSON.parse(localStorage.getItem('User_model')) : {};
  const tokenu = UserData[0]?.token ? UserData[0]?.token : "" ;
  try {
    const headers = {
      "api_key": "Library",
      'Accept-language': 'en',
      // 'Content-Type': 'application/json',
      'app': 'W',
      ...(token && { token: tokenu }),
    };

    const result = await axios({ method, url, params, data:payload, headers});
    let decodeData = await result?.data;
    if (decodeData?.code === '0') {
      // TOAST_ERROR(decodeData?.message)
      console.log("Error")
    }
    return decodeData;
  } catch (error) {
    let decodeData = await (error?.response?.data);
    if (decodeData?.code == -1) {
      // logoutRedirection();
      let path = window.location.protocol + "//" + window.location.host + "/admin/"
      window.location.href = path;
    } else {
      throw new Error(error);
    }
  }
};