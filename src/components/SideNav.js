// hg'' HG""
import React ,{ useContext,useEffect,useState } from 'react';
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


    return (<>
        {
(props.location.pathname == '/' || props.location.pathname == '/login')
      ? <LoginPage nav={props.history} /> :

        <div>
           <TopNav/>

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