// hg'' HG""

function appReducer(state,action){

    switch(action.type) {
        case 'USER_LoGGEDIN': {
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
        default: {
            return state;
        }
    }
}

export default appReducer;