// import the library needed
import axios from 'axios';
import { getSession } from 'next-auth/react';

// create an axios instance
const axiosInstance = axios.create({
    // set the base url of the api
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});
// add an interceptor to the axios instance
axiosInstance.interceptors.request.use(
    async (config) => {
        // get the session
        const session = await getSession();
        if (session) {
            // add the authorization header to the request
            config.headers.Authorization = `Bearer ${session.user.backendAccessToken}`;
        }
        // return the finished config
        return config;
    },
    (error) => {
        // if not config, return the error
        return Promise.reject(error);
    }
);
// export the axios instance
export default axiosInstance;
