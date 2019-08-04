import Axios from 'axios'

const setAuthToken = token =>{
    if(token){
        Axios.defaults.headers.common['Authorization']= token
    }else{
        Axios.defaults.headers.commonp['Authorization']=''
    }
}
export default setAuthToken