import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";




const AdminSignout = () => {



    const navigate = useNavigate();

    useEffect(()=>{
        fetch('/adminsignout',{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then((res)=>{
            localStorage.removeItem("jwtAdmin")
            // localStorage.removeItem("Admin")
            navigate('/adminsignin', {replace: true})
            if(res.status != 200){
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    })


    return (
        <>
            <h1>Log Out</h1>
        </>
    )
}

export default AdminSignout
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import SERVER_URL from "../../config";

// const AdminSignout = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('jwtoken');
//     axios
//       .get(SERVER_URL+'/adminsignout', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         localStorage.removeItem('jwtoken');
//         navigate('/adminsignin', { replace: true });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <>
//       <h1>Log Out</h1>
//     </>
//   );
// };

// export default AdminSignout;