// import the library needed
import axios from "axios";
import { BackendErrorResponse } from "@/types/api-types";

// create a function to get the error message
export const getAxiosErrorMessage = (error: unknown): string =>{
    // check if the error is an axios error
    if(axios.isAxiosError<BackendErrorResponse>(error)){
        // check if the error has a response
        if (error.response && error.response.data){
            // check if the error has a message
            const {message} = error.response.data;

            // check if the message is an array
            if(Array.isArray(message)){
                return message.join(", ");
            }
            // check if the message is a string
            if(typeof message === "string"){
                return message;
            }
            return `Something went wrong ${error.message}`;
        }
        // check if the error has a request
        if(error.request){
            return "this server is not responding";
        }
    }
    // check if the error is an instance of Error
    if(error instanceof Error){
        return error.message;
    }
    // return a default message
    return "This error is unknown";

}