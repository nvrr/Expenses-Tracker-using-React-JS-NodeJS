// hg'' HG""
import React ,{ useContext,useEffect,useState,useLayoutEffect } from 'react';
import { AppContext } from '../App';

import Members from '../pages/Members';
import Transactions from '../pages/Transactions';
import Dashboard from '../pages/Dashboard';
import Reminders from '../pages/Reminders';
import LoginPage from '../pages/LoginPage';
import TopNav from './TopNav';
import {appTheme} from '../utils/Const';

function SideNav(props){
    console.log(props);
    const context = useContext(AppContext);

    useLayoutEffect(function(){
        console.log('useLayoutEffect');
        let userobj = localStorage.getItem('userobj');
        if(userobj){
            userobj = JSON.parse(userobj);
            if(userobj.hhid){
                context.dispatch({type: 'USER_LOGGEDIN'});
                context.dispatch({type: 'SET_USEROBJ',payload: userobj})
            }
        }
    },[]);

    useEffect(() => {
        console.log('useEffect');
        let userobj = localStorage.getItem('userobj');
        let userLoggedIn = false;
        if(userobj){
            userobj = JSON.parse(userobj)
            if(userobj.hhid){
                userLoggedIn = true;
            }
        }

        let path = props.location.pathname;
        if((path == '/members' || path == '/transactions' || path == '/reminders' || 
             path == '/dashboard') && (!userLoggedIn)){ 

                props.history.replace('/login')
             }
    },[props.location.pathname])


    return (<>
        {
(props.location.pathname == '/' || props.location.pathname == '/login')
      ? <LoginPage nav={props.history} /> :

        <div>
           <TopNav nav={props.history}/>

           {/* grid */}
            <div className='p-grid'>
            {/* c1 */}
            <div className='p-col-2' style={{backgroundColor:appTheme.sideMenuColor,display: 'flex',flexDirection:'column',aligItems:'center',color:appTheme.sideMenuTxtColor,height:window.innerHeight-56}}>
                <div onClick={()=> {
                    if(props.location.pathname != '/dashboard')
                    props.history.push('/dashboard')
                }}>Dashboard</div>
                <div onClick={()=> {
                    if(props.location.pathname != '/transactions')
                    props.history.push('/transactions')
                }}>Transactions</div>
                <div onClick={()=> {
                    if(props.location.pathname != '/members')
                    props.history.push('/members')
                }}>Members</div>
                <div onClick={()=> {
                    if(props.location.pathname != '/reminders')
                    props.history.push('/reminders')
                }}>Reminders</div>
            </div>
            {/* c1 */}
            {/* c2 */}
            <div className='p-col-10'>
                {props.location.pathname == '/members' && <Members/>}
                {props.location.pathname == '/dashboard' && <Dashboard/>}
                {props.location.pathname == '/transactions' && <Transactions />}
                {props.location.pathname == '/reminders' && <Reminders />}
            </div>
            {/* c2 */}
            </div>
            {/* grid */}
            </div> }
        </> )
}

// hg'' HG""
export default SideNav;