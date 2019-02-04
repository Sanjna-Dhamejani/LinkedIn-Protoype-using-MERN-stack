
const myData = (localStorage['myData']) ?
    JSON.parse(localStorage.getItem('myData')) :
    {}

const initialStore = {
    myData: myData
}

const reducer = (state = initialStore, action) => {
    if (action.type === "SAVEMYDATA") {
        if (action.payload.status == 1) {
            return {
                ...state,
                myData: action.payload.data
            };
        } else {
            return state
        }
    }
    if(action.type==="SIGNUPDATA"){
        return {
            ...state,
            signUpData: action.payload
        };
    }
    
    if (action.type === "UPDATEMYDATA") {
        if (action.payload.status == 1) {
            return Object.assign({}, state, {
                myData: Object.assign({}, state.myData, {
                    firstname: action.payload.data.firstname,
                })
            });
        } else {
            return state
        }
    }
    if (action.type === "PROFILEIMAGEMYDATA") {
        if (action.payload.status == 1) {
            return Object.assign({}, state, {
                myData: Object.assign({}, state.myData, {
                    profileImage: action.payload.data.profileImage,
                })
            });
        } else {
            return state
        }
    }

    return state;
}

export default reducer;