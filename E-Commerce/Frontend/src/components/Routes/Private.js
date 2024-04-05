import React, { useState, useEffect } from "react";

import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
import { REACT_APP_API } from "../../context/helper";
export default function PrivateRoute(){
    const [ok,setOk]=useState(false);
    const [auth,setAuth]=useAuth();

    useEffect(()=>{
  
        const authCheck = async ()=>{
            // if the user is logged in only  then we can enter the dashboard
            const res = await axios.get(`${REACT_APP_API}/api/v1/auth/user-auth`,
                       {
                           headers:{"Authorization": auth?.token}
                       }  
                    )
            
            if(res.data.ok){
                setOk(true);
            }else{
                setOk(false)
            }

          }
          if(auth?.token) authCheck();
        
         },[auth?.token]);

    return ok ? <Outlet/> : <Spinner/>

}

// Outlet is use to make the nested route, here we make the nested route to make the inner route protected
