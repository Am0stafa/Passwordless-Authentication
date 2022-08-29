import Axios from "axios";
import React, { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const cookie = new Cookies();
  
  useEffect(() => {
    Axios.post("http://localhost:5001/auth", {
      token: searchParams.get("token"),
    }).then((response) => {
      console.log(response.data)
      cookie.set("sessionToken", response.data);
    }).catch((error) => {
      console.log(error)
    });
  });


  return <Navigate to="/" replace />;
}

export default Auth