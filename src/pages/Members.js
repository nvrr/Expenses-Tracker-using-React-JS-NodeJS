 // hgp'' HG""  hg'' p *

import React,{useEffect,useContext,useState} from 'react';
import {AppContext} from '../App';
import axios from 'axios';
import {API_URL} from '../utils/Const';
import { DataTable  } from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';



function Members(){

    const context = useContext(AppContext)
    const [data,setData] = useState([]);
    const [selectedRow,setSelectedRecord] = useState({});
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDelDialog, setShowDelDialog] = useState(false);
    //const [memObj,setMemObj] = useState({name:'',phnum:'',passcode:''});
    const [nname,setName] = useState('')
    const [pphnum,setPhnum] = useState('')
    const [ppasscode,setPasscode] = useState('')
    

    useEffect(()=>{
        getData()
    },[])

     function getData()  { 
        console.log(context)
     
        axios({
            method:'POST',
            url:API_URL+'listofmem',
            data:{hhid: context.state.userobj.hhid},
            config:{headers:{"content-type":"application/json"}}
        
        }).then(res=>{
            console.log(res);
            context.dispatch({type:'MEMBER_LIST',payload:res.data.data})
            //setData(res.data.data)
            setSelectedRecord(res.data.data[0])

        }).catch(err=>{

        }).finally(()=>{})

     }

     function showDialog(op){
         if(op == 'ADD'){
            //  setMemObj({name: '', phnum:'', passcode: ''})
            setName('');
            setPhnum('');
            setPasscode('');
             setShowAddDialog(true);
         } else {
            //  setMemObj({
            //      name: selectedRow.MEM_NAME,
            //      phnum: selectedRow.MEM_PHNUM,
            //      passcode: selectedRow.MEM_PASS
            //  });
            setName(selectedRow.name)
            setPhnum(selectedRow.phnum)
            setPasscode(selectedRow.passcode)
            setShowAddDialog(true)
         }
     }

     function showDialogFooter(){
        return(
            <div>
                <Button label={'Cancel'} style={{marginRight:12}}
                  onClick={()=>{setShowAddDialog(false)}}></Button>
                <Button label={'Save'} style={{marginRight:12}}
                  onClick={()=>{saveRecord()}}></Button>
            </div>
        )
    }

    function saveRecord() {
        let inpobj = {
            hhid: context.state.userobj.hhid,
            memid:context.state.userobj.memid,
            name: nname,
            phnum: pphnum,
            passcode: ppasscode
        }

        axios({
            method: 'POST',
            url: pphnum ? API_URL+ 'updatemem' : API_URL+ 'addmem',
            data: inpobj,
            config:{headers:{"Content-Type":"application/json"}}
        }).then((res) => {
            console.log(res);
            console.log(data);
            //let currRow = res.data.data
            let currRow = {
                MEM_NAME: res.data.data.name,
                MEM_PHNUM: res.data.data.phnum,
                MEM_PASS: res.data.data.passcode
                // name: res.data.data.name,
                // phnum: res.data.data.phnum,
                // passcode: res.data.data.passcode
            }

            if(pphnum){
                for(let i=0; i<data.length; i++){
                    if(data[i].pphnum == currRow.MEM_PHNUM) {
                        data.splice(i,1,currRow);//it adds it and removes old same data
                        break;
                    }
                }
                setSelectedRecord(currRow);
                setShowAddDialog(false);
                setData(data);
                //data: setData(data)
            } else {
                data.splice(0,0,currRow);
                setData(data);
                setShowAddDialog(false);
                setSelectedRecord(currRow);
               // data:setData(data)
            }

        }).catch((err) =>{}).finally(()=>{})
        console.log('save record');
    }

 // hgp'' HG""  hg'' p *
    return(
        <div>

            <Card style={{margin:'auto',width:'95%',marginTop:12,padding:12}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                    <h4>Members</h4>
                    <div style={{marginRight:12}}>
                    <Button icon="pi pi-plus" className="p-button-rounded p-button-success" 
                    style={{marginRight:8}} onClick={()=>{showDialog('ADD')}}/>
                   
                    <Button icon="pi pi-user-edit" className="p-button-rounded p-button-success" 
                    style={{marginRight:8}} onClick={()=>{showDialog('EDIT')}}/>

                    <Button icon="pi pi-trash" className="p-button-rounded p-button-info" 
                    style={{marginRight:8}} onClick={()=>{setShowDelDialog({showDelDialog:true})}}/>

                    </div>

                </div>
            <DataTable 
            value={context.state.members} 
            selectionMode="single" 
            selection={selectedRow} 
            onSelectionChange={e => setSelectedRecord(e.value )}
            
            >
                <Column header='Name' field='name'/>
                <Column header='Phone Number' field='phnum'/>
                <Column header='Passcode' field='passcode'/>


            </DataTable>
            
            </Card>

            <Dialog header="Header"
               visible={showAddDialog}
               footer={showDialogFooter}
               style={{width:'50vw'}}
               onHide={()=>{setShowAddDialog(false)}}>
                <InputText value={nname} onChange={e=>setName(e.target.value)} placeholder="Enter Name"/>
                <InputText value={pphnum} onChange={(e)=>setPhnum(e.target.value)} placeholder="Enter Phone Number"/>
                <InputText value={ppasscode} onChange={(e) =>setPasscode(e.target.value)} placeholder="Enter Passcode"/>
            </Dialog>


        </div>)
}
export default Members;
 // hgp'' HG""  hg'' p *
























// import React,{useEffect,useContext,useState} from 'react';
// import {AppContext} from '../App';
// import axios from 'axios';
// import {API_URL} from '../utils/Const';
// import { DataTable  } from 'primereact/datatable';
// import {Column} from 'primereact/column';
// import {Card} from 'primereact/card';
// import {Button} from 'primereact/button';
// import {Dialog} from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// // hg'' HG""

// export default function Members() {
//     const context = useContext(AppContext)
//     const [data,setData] = useState([]);
//     const [selectedRow,setSelectedRecord] = useState({})
//     const [showAddDialog, setShowAddDialog] = useState(false);
//     const [showDelDialog, setShowDelDialog] = useState(false);
//     const [memObj,setMemObj] = useState({name:'',phnum:'',passcode:''});
    
   


// // hg''
//     useEffect(()=>{
//         getData();
//     },[])
    

//     function getData(){
//         console.log(context);

//         axios({
//             method: 'POST',
//             url: API_URL + 'listofmem',
//             data: {hhid: context.state.userobj.hhid},
//             config: {headers: {'content-type': 'application/json'}}
//         }).then(res => {
//             console.log(res);
//             context.dispatch({type: 'MEMBER_LIST', payload: res.data.data})
//             //setData(res.data.data)
//             setSelectedRecord(res.data.data[0])
//         }).catch(err => {

//         }).finally(()=>{})
//     }

//     //-----------------------------------//
//     // hg'' HG""
//     function showDialog (op){
//         if(op == 'ADD'){
//             setMemObj({name:'',phnum:'',passcode:''}, ()=> {
//                 setShowAddDialog(true)
//             })
//         }else{
//             setMemObj({
//                 name: selectedRow.name,
//                 phnum: selectedRow.phnum,
//                 passcode: selectedRow.passcode
//             }, ()=>{
//                 setShowAddDialog(true)
//             })
//         }
//     }

//     function showDialogFooter (){
//         return (
//             <div>
//                 <Button label={'Cancel'} style={{marginRight:12}}
//                     onClick={()=>{setShowAddDialog(false)}}></Button>
//                 <Button label={'Save'} style={{marginRight:12}}
//                     onClick={()=>{saveRecord()}}></Button>
//             </div>
//         )
//     }
// // hg'' HG""
//     function saveRecord(){
//         let inpobj = {
//             name: memObj.name,
//             phnum: memObj.phnum,
//             passcode: memObj.passcode
//         }
//         axios({
//             method: 'POST',
//             url: memObj.phnum ? API_URL + 'addmem' : API_URL + 'updatemem' ,
//             data: inpobj,
//             config: {headers:{"Content-Type":"application/json"}}
//         }).then((res) => {
//             console.log(res);
//             console.log(context.state.members);
//             let currRow = {
//                 name: res.data.data.name,
//                 phnum: res.data.data.phnum,
//                 passcode: res.data.data.passcode
//             }

//             if(memObj.phnum){
//                 for(let i=0; i<data.length; i++){
//                     if(data[i] == currRow.phnum){
//                         data.splice(i,1,currRow);
//                         break;
//                     }
//                 }
//                 setSelectedRecord({currRow})
//                 setShowAddDialog(false)
//                 setData(data)
//             }else{
//                 setData(data.splice(0,0,currRow))
//                 setShowAddDialog(true)
//                 setSelectedRecord(currRow)
//                 setData(data)
//             }
//         }).catch((err)=>{}).finally(()=>{});
//         console.log('save record');
//     }

//     function deleteRecord(){
//         axios({
//             method:'POST',
//             url: API_URL + 'deletemem',
//             data: selectedRow,
//             config:{headers:{"Content-Type":"application/json"}}
//         }).then((res)=>{
//             let currIndex=0;
//             console.log(res);
//             if(res.data.code == "999"){
//                 for(let i=0; i< data.length; i++){
//                     if(data[i].phnum == selectedRow.phnum){
//                         data.splice(i,1)//deltes i position
//                         currIndex = i;
//                         break;
//                     }
//                 }

//                 let i = currIndex;
//                 let selRow = data[i] ? data[i] : data[i-1] ? data[i-1] : {};
//                 setData(data)
//                 setSelectedRecord(selRow)
//                 setShowDelDialog(false)

//                 console.log(selectedRow.phnum);
//             } else {
//                 console.log('unable to delete');
//             }
//         }).catch((err)=>{
//             console.log(err);
//         }).finally(()=>{})
//     }
// //-----------------------------------//
//     // hgp'' HG""  hg'' p *
//     return (
//         <div>
//             <Card style={{margin: 'auto',width:'95%',marginTop:12,padding:12}}>
//                 <div style={{display:'flex',justifyContent:'space-between'}}>
//                     <h4>Members</h4>
//                     <div style={{marginRight:12}}>
//                         <Button icon="pi pi-plus" className="p-button-rounded p-button-success" 
//                     style={{marginRight:8}} onClick={()=>{showDialog('ADD')}}/>

//                     <Button icon="pi pi-user-edit" className="p-button-rounded p-button-success" 
//                     style={{marginRight:8}} onClick={()=>{showDialog('EDIT')}}/>

//                     <Button icon="pi pi-trash" className="p-button-rounded p-button-info" 
//                     style={{marginRight:8}} onClick={()=>{setShowDelDialog({showDelDialog:true})}}/>
//                     </div>
//                 </div>

//                 <DataTable value={data}
//                     selectionMode= "single"
//                     selection={selectedRow}
//                     onSelectionChange={e => setSelectedRecord({selectedRow:e.value})}>
//                     <Column header='Name' field='name'/>
//                     <Column header='Phone Number' field='phnum'/>
//                     <Column header='Passcode' field='passcode'/>
//                 </DataTable>

//             </Card>
             
//              {/* ---- Dialog-- hg'' p */}
//             <Dialog header="Header"
//                 visible={showAddDialog}
//                 footer={showDialogFooter}
//                 style={{ width: '50vw' }}
//                 onHide={() => setShowAddDialog(false)}
//                 >
//                 <InputText value={memObj.name} onChange={(e) => {setMemObj({name:e.target.value})}} placeholder="Enter Name"/>
//                 <InputText value={memObj.phnum} onChange={(e) => {setMemObj({phnum:e.target.value})}} placeholder="Enter phone num"/>
//                 <InputText value={memObj.passcode} onChange={(e) => {setMemObj({passcode:e.target.value})}} placeholder="Enter passcode"/>

//             </Dialog>

//             <Dialog header='Delete Record'
//                 visible={showDelDialog}
//                 style={{marginRight:12}}
//                 onHide={()=>{setShowDelDialog(false)}}
//                 footer={()=> {
//                     return (
//                         <div>
//                             <Button label='Cancel' style={{marginRight:12}}
//                                onClick={()=>{setShowDelDialog(false)}}
//                             />
//                             <Button label='Delete' style={{marginRight:12}}
//                                onClick={()=>{deleteRecord()}}
//                             />
//                         </div>
//                     )
//                 }}
                
//                 />
//         </div>
//     )
// }
