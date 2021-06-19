import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

/*
Connect to the mongoDB database from the location-tracking-server project. ngrok is
setup in location-tracking-server and is used to redirect the baseURL to the database.
Replace the current baseURL with the ngrok forwareded URL. Note that the ngrok forwarded URL
changes every 2 hours; therefore, it needs to be updated accordingly.
*/

const instance = axios.create({
  baseURL: "https://b2c5d295eac4.ngrok.io",
});

// Method to intercept every request instance.
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
