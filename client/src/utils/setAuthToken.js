import api from './api';

//log in the user
//the token name [twtBlog] is created when a user logs in or registers
const setAuthToken = token => {
    if (token) {
        api.defaults.headers.common['jwtBlog'] = token;
        localStorage.setItem('token', token);
    } else {
        delete api.defaults.headers.common['jwtBlog'];
        localStorage.removeItem('token');
    }
};

export default setAuthToken;