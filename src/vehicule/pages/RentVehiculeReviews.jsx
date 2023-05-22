import React, {useState, useEffect, useContext} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import SERVER_URL from "../../config";
import { UserContext } from "../../App"

const Rentvehiculereviews = () => {

    const {state, dispatch} = useContext(UserContext)

    let location = useLocation();
    const selectedVehiculeId = location.state
    console.log(selectedVehiculeId)
    const [userData, setUserData] = useState({id:"", name:"", email:"", message:""});
    const [renttvehiculesData, setrenttvehiculesData] = useState({
        id: "",
        brand : "",
        model : "",
        year : "",
        color : "",
        seats : "",
        rent : "",
        fileName : "",
        filePath : "",
        fileType : "",
        fileSize : ""
    });
    const [allrenttvehiculeReviews, setAllrenttvehiculeReviews] = useState([]);

    const sendId = async () =>{
        try {
            const res = await fetch(SERVER_URL+"/sendReviewRentVehiculeId", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtUser") || ""}`,
                },
                body: JSON.stringify({
                    selectedvehiculeId: selectedVehiculeId,
                  })
            })

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        sendId();
    }, [])

    const reviewVehiculeData = async () =>{
        try {
            const res = await fetch (SERVER_URL+'/getRentVehiculeReviews', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtUser") || ""}`,
                  },
            });

            const data = await res.json();
            setrenttvehiculesData({
            id : data.findVehicule._id,
            brand : data.findVehicule.brand,
            model : data.findVehicule.model,
            year : data.findVehicule.year,
            color : data.findVehicule.color,
            seats : data.findVehicule.seats,
            rent : data.findVehicule.rent,
            fileName : data.findVehicule.fileName,
            filePath : data.findVehicule.filePath,
            fileType : data.findVehicule.fileType,
            fileSize : data.findVehicule.fileSize
            })
            
            setUserData({...userData, id:data.findUser._id, name:data.findUser.name, email:data.findUser.email})

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        reviewVehiculeData();
    }, [])



    const getallreviews = async () =>{
        try {
            const res = await fetch (SERVER_URL+'/getallreviewsforselectedrentvehicule', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtUser") || ""}`,
                  },
            });

            const data = await res.json();

            setAllrenttvehiculeReviews(data.allReviews);

        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getallreviews();
    }, [])



    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value });
    }



     
    const submitReviews = async (e) =>{
        e.preventDefault();

        const {id, name, email, message}= userData;

        const res = await fetch(SERVER_URL+'/postrentvehiculereviews',{
            method:'POST',
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtUser") || ""}`,
            },
            body : JSON.stringify({
                id, name, email, message, selectedVehiculeId
            })
        });

        const data = await res.json();


        if(data.status === 500 || !data){
            window.alert("reviews not submited");
            console.log("reviews not submited");
        }
        else if(data.status===201){
            window.alert("reviews submited");
            setUserData({...userData, message:""});
        }
        else{
            window.alert("reviews submited");
            setUserData({...userData, message:""});
        }
    }


    
   
    


    return (
        <> 
            <div className = "reviewsdiv">    

                <img src={renttvehiculesData.filePath} alt="" style={{width: "80%", height: "70%"}}/>
                <h4><b>{renttvehiculesData.brand}</b></h4>
                <p>Model : {renttvehiculesData.model}</p>
                <p>Year : {renttvehiculesData.year}</p>
                <p>Color : {renttvehiculesData.color}</p>
                <p>Seats : {renttvehiculesData.seats}</p>
                <p>Rent : {renttvehiculesData.rent}</p>

            </div>
                   
            
        <section className="contact" id="contact">
            <h1 className="heading"><span>Reviews</span></h1>

            {allrenttvehiculeReviews.map((allrenttvehiculeReviews) => 
                    <div className = "reviewsli"  key={allrenttvehiculeReviews._id}>
                            <ul>
                                <li style={{wordSpacing: "10px"}}>{allrenttvehiculeReviews.name} :- {allrenttvehiculeReviews.comments}</li>
                            </ul> 
                        </div>
                     
            )}

            <div className="row">
                <form method="POST">
                    <h3>write your reviews</h3>
                    <input type="text" name="name" value={userData.name} onChange={handleInputs} placeholder="your name" className="box"/>
                    <input type="email" name="email" value={userData.email} onChange={handleInputs} placeholder="your email" className="box"/>
                    <textarea placeholder="your reviews" name="message" value={userData.message} onChange={handleInputs} className="box" cols="30" rows="10"></textarea>
                    <input type="submit" value="submit reviews" onClick={submitReviews} className="btn"/>
                </form>

            </div>

        </section>
        </>
    )
}

export default Rentvehiculereviews
