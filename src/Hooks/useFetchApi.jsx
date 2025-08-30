import axios from "axios"
import { useEffect, useState } from "react"
import { baseUrl } from "../utils/baseUrl";

function useFetchApi(endPoint) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getApi() {
            let {data}= await axios.get(`${baseUrl}/${endPoint}`);
            setData(data);
        }
        getApi();
    }, [])
    return data
}

export default useFetchApi;

// let data = useFetchApi(endPoint);
// endPoint = "products" , "categories" , "brands"
