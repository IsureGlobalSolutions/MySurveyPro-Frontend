import { instance } from "../axios/axios";
import useAuth from "./useAuth";

const useRefreshToken = ()=>{
    const {setAuth} =useAuth()

    const refresh = async ()=>{
        const response = await instance.get('/refesh')

    }
    setAuth(prev=>{
        console.log(JSON.stringify(prev));
        console.log(response.data.accessToken);
        return{...prev, accessToken: response.data.accessToken}
    });
    return response.data.accessToken;

    return refresh;
}
export default useRefreshToken;