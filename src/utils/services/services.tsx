import protectedApi from "./protectedAxios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const get = async(url:string)=>{
    const res = await protectedApi.get(url);

    if (res.status < 200 || res.status >= 300) {
        throw new Error("Fetch data error for " + url);
    }

    return res.data;
}

export{
    get,
    API_URL
}