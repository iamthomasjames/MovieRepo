
const authReducer = (state={isloggedIn:false}, action) => {

    switch(action.type)
    {
        case "setLogged":
            state.isloggedIn=action.payload;
            return state;
        default :
            return state;

    }
};

export default authReducer;
