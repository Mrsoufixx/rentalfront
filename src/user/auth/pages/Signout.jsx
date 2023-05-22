import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SERVER_URL from '../../../config';

const Signout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const signoutUser = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/signout`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          localStorage.removeItem('jwtUser');
          navigate('/signin', { replace: true });
          window.location.reload();
        } else {
          throw new Error(response.data.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    signoutUser();
  }, []);

  return (
    <>
      <h1>Log Out</h1>
    </>
  );
};

export default Signout;
