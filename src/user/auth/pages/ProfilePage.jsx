import React from "react";
import { useParams } from "react-router";
import Navbar from "../../../layouts/Navbar";

function ProfilePage() {
    
  return (
    <>
    <Navbar/>
    <div className="maincontainer"> 
    <div style={{ marginLeft: "auto", marginRight: "auto",  }}>
      <div className="updateBox">
        <div
          style={{
            background: "#C3073F",
            width: "100%",
            height: "4.5rem",
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          <h3 style={{ color: "white", padding: "1em" }}>MY PROFILE</h3>
        </div>

        <div style={{ padding: 30, textAlign: "left" }}>
          <div
            style={{
              background: "#4E4E50",
              borderRadius: 5,
              marginBottom: 10,
              padding: 8,
            }}
            >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              >
              <h4 style={{ fontSize: 20, color: "white", marginBottom: 0 }}>
                First Name: 
              </h4>

              <h4 className="changeText" style={{ marginTop: 0, color: "yellow" }}>change</h4>
            </div>
          </div>

          <div
            style={{
              background: "#4E4E50",
              borderRadius: 5,
              marginBottom: 10,
              padding: 8,
            }}
            >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              >
              <h4 style={{ fontSize: 20, color: "white", marginBottom: 0 }}>
                Last Name: 
              </h4>

              <h4 className="changeText" style={{ marginTop: 0, color: "yellow" }}>change</h4>
            </div>
          </div>

          <div
            style={{
              background: "#4E4E50",
              borderRadius: 5,
              marginBottom: 10,
              padding: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              >
              <h4 style={{ fontSize: 20, color: "white", marginBottom: 0 }}>
                Company Name: 
              </h4>

              <h4 className="changeText" style={{ marginTop: 0, color: "yellow" }}>change</h4>
            </div>
          </div>

          <div
            style={{
              background: "#4E4E50",
              borderRadius: 5,
              marginBottom: 10,
              padding: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              >
              <h4 style={{ fontSize: 20, color: "white", marginBottom: 0 }}>
                Email: 
              </h4>

              <h4 className="changeText" style={{ marginTop: 0, color: "yellow" }}>change</h4>
            </div>
          </div>

          <div
            style={{
              background: "#4E4E50",
              borderRadius: 5,
              marginBottom: 10,
              padding: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4 style={{ fontSize: 20, color: "white", marginBottom: 0 }}>
                Password: ***
              </h4>

              <h4 className="changeText" style={{ marginTop: 0, color: "yellow" }}>change</h4>
              
            </div>

            
          </div>
          <button className="customizedButton updateProfileButton">Update Profile</button>
        </div>
        
      </div>
      
    </div>
              </div>
              </>
  );
}

export default ProfilePage;
