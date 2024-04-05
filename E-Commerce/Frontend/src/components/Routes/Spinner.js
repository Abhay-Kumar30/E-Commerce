import React,{useState,useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({path="login"}) => {

    // show the spinner for few sectons then we navigate to
    const [count,setCount]=useState(3);
    const navigate =useNavigate();
    const location = useLocation();
    
    useEffect(()=>{

       // here what happen
          // whenever someone try to access protected route 
          // we first store the current route path of user in 'state' and then we redirect him to 'login' page
          // after he press the login button we redirect the user to the path we have store in 'state' by  navigate(location.state || "/"); from "Login.js" page
          // what is the meaning of=>   location.state || "/"  is:-
          // if 'location.state' have some value then we redirect to 'location.state' other wise we redirect to "/"
          const interval = setInterval(()=>{

                // decrement the value of "prevValue" after every 1 second
                setCount((prevValue)=>{
                    return --prevValue;
                } );
            },1000);

             // when "count" is 0 then we navigate to "/login"
            // here [ {state: location.pathname} ] we store the current location of user, and the we redirect him ti login page
          count === 0 && navigate(`/${path}`, {state: location.pathname});

            return ()=> clearInterval(interval);
       },[count, navigate,path]);

  return (
    <>
    <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"100vh"}}>
        <h3 className="Text-center">Please Login first, Redirecting to you in {count} seconds</h3>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
    </div>
    </>
  )
}

export default Spinner
