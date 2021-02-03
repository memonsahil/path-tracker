import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

//Using ngrok, hence the baseURL changes every 8 hours.
const instance = axios.create({
  baseURL: "http://3bb5ff501a80.ngrok.io",
});

//Function to intercept every request instance.
instance.interceptors.request.use(
  async (config) => {
    //Handling configuration by passing the jwt with every request instance.
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    //Handling errors is found any.
    return Promise.reject(err);
  }
);

export default instance;
