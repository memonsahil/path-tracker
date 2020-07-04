import axios from 'axios';

//Using ngrok, hence the baseURL changes every 8 hours.
export default axios.create({
    baseURL: 'http://35bfb47498bf.ngrok.io'
});