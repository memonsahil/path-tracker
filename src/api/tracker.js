import axios from 'axios';

//Using ngrok, hence the baseURL changes every 8 hours.
export default axios.create({
    baseURL: 'http://e1780fd3359d.ngrok.io'
});