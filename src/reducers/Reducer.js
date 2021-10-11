// hg'' HG""

function appReducer(state,action){

    switch(action.type) {
        case 'USER_LOGGEDIN': {
            let a = Object.assign({}, state, {userLoggedIn: true});
            console.log(a);
            return a;
            break;
        }
        case 'SET_USEROBJ': {
            let a = Object.assign({}, state, {userobj: action.payload});
            console.log(a);
            return a;
            break;
        }
        case 'MEMBER_LIST': {
            let a = Object.assign({}, state, {members: action.payload});
            console.log(a);
            return a;
            break;
        }
        case 'SIGN_OUT': {
            let a = Object.assign({},state,{userLoggedIn:false,userobj: {}});
            console.log(a);
            return a;
            break;
        }
        default: {
            return state;
        }
    }
}

export default appReducer;