import axios from 'axios';

//Using ngrok, hence the baseURL changes every 8 hours.
export default axios.create({
    baseURL: 'http://b2a2a80a7fc5.ngrok.io'
});