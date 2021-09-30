// hg'' HG""

import axios from 'axios';
import {API_URL} from './Const';


export default function callSvc(inpobj, pathname,setdata, seterr) {
    axios({
        method: 'POST',
        url: API_URL + pathname,
        data: inpobj,
        config: {headers: {'content-type': 'application/json'}}
    }).then(res => {

    }).catch(err => {

    }).finally(()=>{})
}
