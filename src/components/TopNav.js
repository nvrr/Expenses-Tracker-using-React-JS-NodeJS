import React, { useContext } from 'react'
import { appTheme } from '../utils/Const';
import { AppContext } from '../App';

// hg'' HG""

export default function TopNav(props) {

    const context = useContext(AppContext)

    function setUserSignOut(){
        console.log('setUserSignOut');
        context.dispatch({type: 'SIGN_OUT'});
        localStorage.removeItem('userobj');
        props.nav.replace('/login');
    }

    return (
      <div style={{
        height:56,
        backgroundColor:appTheme.headerColor,
        display:'flex',
        
        alignItems:'center',color:appTheme.headerTextColor}}
      >
        <div style={{marginLeft:12}}>TopNav</div>
        <div style={{flex:1}}></div>
        <div style={{marginRight:12}} onClick={()=>setUserSignOut()}>
        <i className="pi pi-sign-out" style={{'fontSize': '1.5em'}}></i>
        </div>

      </div>
    )
}
