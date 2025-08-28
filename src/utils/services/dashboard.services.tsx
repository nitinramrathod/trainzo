import protectedApi from "./protectedAxios"

        
const getUsers=async(params)=>{
    const response = await protectedApi({
        url:'/api/v1/user',
        params
    })

    if(response.statusText == "OK"){
        return response?.data;
    }
}
const getPackages=async(params)=>{
    const response = await protectedApi({
        url:'/api/v1/membership',
        params
    })

    if(response.statusText == "OK"){
        return response?.data;
    }
}

export {
    getUsers,
    getPackages
}