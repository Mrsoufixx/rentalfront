
export let initialState = localStorage.getItem("jwtUser");

export const reducer = (state, action) =>{
    if(action.type === "USER"){
        return [action.payload,
        localStorage.setItem("jwtUser", action.payload)]
    }

    return state; 
    
}
