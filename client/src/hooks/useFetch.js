import React, { useEffect, useState } from 'react';

import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    //todo: Fetch Data:
    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true);
            try{
                const res = await axios.get(url);
                setData(res.data);
                // console.log(res.data)
            }
            catch(err){
                console.log('Error in fetching data : ',err)
                setError(err);
            };
            setLoading(false);
        };
        fetchData();
    },[url]);


    //Todo: ReFetch Data:
    const reFetchData = async()=>{
        setLoading(true);
        try{
            const res = await axios.get(url);
            setData(res.data);
        }catch(err){
            setError(err);
        };
        setLoading(false);
    };


    //todo: return Data:
  return { data, loading, error, reFetchData };
}

export default useFetch;