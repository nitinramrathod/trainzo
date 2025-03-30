const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const get = async(url:any)=>{
    const res = await fetch(`${API_URL}${url}`);
    if(!res.ok){
        return Error('Fetch data Error for '+ url)
    }
    return await res.json()
}

export{
    get,
    API_URL
}