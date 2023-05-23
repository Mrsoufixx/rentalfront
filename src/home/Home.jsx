import React, {useState, useEffect, useContext} from 'react'
import Banner from "./sections/Banner";
// import StaticCards from "./sections/StaticCards";
import Services from "./sections/Services";
import Contact from "./sections/Contact";
import { UserContext } from "../App"
import NavBar from "../layouts/NavBar" 
import Footer from "../layouts/Footer" 
import PlanTrip from './sections/PlanTrip';
import ScrollToTop from "../shared/ScrollToTop";
import UseScrollToTop from '../hooks/useScrollToTop';

const Home = () => {

  const {state, dispatch} = useContext(UserContext)

    

  const userContact = async () =>{
      try {
          const res = await fetch ('/getdata', {
              method: 'GET',
              headers:{
                  "Content-Type" : "application/json"
              },
          });

          const data = await res.json();
          
          setUserData({...userData, name:data.name, email:data.email, phone:data.phone});


          if(!res.status === 200){
              const error = new Error(res.error);
              throw error;
          }

      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
     userContact();
  }, [])
  return (
    <>
    <NavBar />
    <ScrollToTop />
      <Banner />
      <PlanTrip/>
      {/* <StaticCards /> */}
      <Services />
      <Contact />
      <UseScrollToTop />
    <Footer />
    </>
  );
};

export default Home;
