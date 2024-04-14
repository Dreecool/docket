import { UseSelector, useSelector } from "react-redux";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const PrivateRoute = ({element}) => {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token = Cookies.get('authToken');
    
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // Redirect to the login page if not authenticated
      navigate('/');
    }
  }, [navigate]);

  return isAuthenticated ? <Outlet /> : null;
};

export default PrivateRoute;
