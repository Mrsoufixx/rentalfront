
export let adminInitialState = localStorage.getItem("jwtAdmin");

export const adminreducer = (adminState, action) =>{
    if(action.type === "ADMIN"){
        return [action.payload,
        localStorage.setItem("jwtAdmin", action.payload)]
    }

    return adminState; 
    
}
