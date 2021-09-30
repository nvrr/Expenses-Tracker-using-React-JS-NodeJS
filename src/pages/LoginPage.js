// hg'' HG""

import React, { useContext,useState } from 'react';
import {AppContext} from '../App';
import axios from 'axios';
import {API_URL} from '../utils/Const';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';

export default function LoginPage(props) {

    const context = useContext(AppContext);
    const [userobj, setUserObj] = useState({phnum:'', passcode:''});
    console.log(context);

  function checkLogin() {
    console.log(userobj);
    axios({
        method: 'POST',
        url: API_URL + 'loginmem',
        data: userobj,
        config: {headers: {'content-type': 'application/json'}}
    }).then(res => {
        if(res.data.code == '999'){
            localStorage.setItem('userobj',JSON.stringify(res.data));
            context.dispatch({type: 'USER_LOGGEDIN'})
            context.dispatch({type: 'SET_USEROBJ', payload: res.data});
            props.nav.replace('/dashboard')
        }
        console.log(res);
    }).catch(err => {
        console.log(err);
    }).finally(()=>{})

  }
    return (
        <div style={{height:window.innerHeight,width:window.innerWidth,backgroundColor:'#333',display:'flex',justifyContent:'center',aligItems:'center'}}>
            <div style={{padding:12,display:'flex',flexDirection:'column',justifyContent:'center',aligItems:'center'}}>
                <h2>Login</h2>
                <InputText placeholder='User Id' value={userobj.phnum}
                    onChange={(e) => setUserObj({...userobj,phnum:e.target.value})} /><br/>
                <Password placeholder="Password" 
                    value={userobj.passcode} 
                    onChange = {(e)=> setUserObj({...userobj,passcode:e.target.value})} /><br/>
                <Button onClick={()=>{checkLogin()}} label="Login"/> 
            </div>
        </div>
    )
}
