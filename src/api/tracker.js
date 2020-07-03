import axios from 'axios';

//Using ngrok, hence the baseURL changes every 8 hours.
export default axios.create({
    baseURL: 'http://28b0e8d41779.ngrok.io'
});