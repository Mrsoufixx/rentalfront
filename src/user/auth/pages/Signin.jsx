import React, {useState, useContext} from 'react'
import { Link, useNavigate } from "react-router-dom";
import SERVER_URL from "../../../config";
import axios from "axios";
import { UserContext } from "../../../App"
import "../registerStyle.css";
import Navbar from '../../../layouts/NavBar';


const Signin = () => {

    const {state, dispatch} = useContext(UserContext)


    //User signin
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const signinUser =  async (e) =>{
        e.preventDefault();

        try {
            const res = await axios.post(
              `${SERVER_URL}/signin`,
              {
                email,
                password,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("jwtUser") || ""}`,
                },
                withCredentials: true,
              }
            );
              console.log(res.status)
            
            if (res.status === 200) {
                // localStorage.setItem("jwtUser", res.data.token);
                dispatch({type: "USER", payload:res.data.token})
              window.alert("Signin Successful");
              navigate("/");
            } else {
              window.alert("Invalid Credentials");
            }
          } catch (error) {
            console.log(error);
            window.alert("An error occurred");
          }
        };

    return (
        <>
        <Navbar />
            <div className="maincontainer">
                <div className="firstcontainer mt-36">
                    <div className="titled"></div>
                        <div id = "usersignin" style = {{display:"block"}} className="content">
                        <h2 className='text-center text-3xl font-bold'>S'inscrire</h2>
                            <form method="POST" className=' mt-20'>
                                <div className="user-details ">

                                    <div className="input-box">
                                        <span className="details">Email</span>
                                        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Ecrire votre Email" />
                                    </div>

                                    <div className="input-box">
                                        <span className="details">Mot de passe</span>
                                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Ecrire votre Mot de passe" />
                                    </div>

                                </div>

                                <div className="button">
                                    <input type="submit"  value="signin" onClick={signinUser} />
                                </div>
                            </form>
                            <div className='flex justify-between'>
                            <h3> Vous avez pas un compte ? <Link style={{color: "#00ADB5"}} to="/signup">créer une </Link></h3>
                            <h3 className='hover:text-[#00ADB5]'><Link >Mot de passe oublié ? </Link>  </h3>
                            </div>
                            
                        </div>


                    </div>
                </div>


        </>
    )
}

export default Signin
