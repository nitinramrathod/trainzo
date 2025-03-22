const backendURL = "http://192.168.3.92:8080"

const get = async(url:any)=>{
    const res = await fetch(`${backendURL}${url}`);
    if(!res.ok){
        return Error('get error')
    }
    return await res.json()
}

export{
    get
}