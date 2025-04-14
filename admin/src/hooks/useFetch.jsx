import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {user} = useContext(AuthContext);
    // console.log('user id : ==== ' , user._id)

    
    //todo: Fetch Data:
    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true);
            try{
                const res = await axios.get(url, {
                    withCredentials: true,  // Allows cookies to be sent with the request
                    credentials: 'include',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token'))
                    }
                });
                setData(res.data);
                // console.log(res.data);
            }
            catch(error){
                // console.log('Error in fetching data : ',err)
                console.error("Error fetching users:", error.response?.data || error.message);
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
            const res = await axios.get(url,{
                withCredentials: true,  // Allows cookies to be sent with the request
                credentials: 'include',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token'))
                }
            });
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