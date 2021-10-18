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


// hgp'' HG""  hg'' p *

function Members(){

    const context = useContext(AppContext)
    const [data,setData] = useState([]);
    const [selectedRow,setSelectedRecord] = useState({});
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDelDialog, setShowDelDialog] = useState(false);
   // const [memObj,setMemObj] = useState({name:'',phnum:'',passcode:''});
    const [nname,setName] = useState('')
    const [pphnum,setPhnum] = useState('')
    const [ppasscode,setPasscode] = useState('')
    const [memId,setMemid] = useState('')
    

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
            setData(res.data.data)
            setSelectedRecord(res.data.data[0])
            console.log(selectedRow);
        }).catch(err=>{

        }).finally(()=>{})

     }

     function showDialog(op){
         if(op == 'ADD'){
            //   setMemObj({...memObj,name: '', phnum:'', passcode: ''})
            setName('');
            setPhnum('');
            setPasscode('');
            setShowAddDialog(true);
            setMemid('')
           console.log(selectedRow);
         } else {
             console.log(selectedRow)
            //  setMemObj({...memObj,
            //      name: selectedRow.MEM_NAME,
            //      phnum: selectedRow.MEM_PHNUM,
            //      passcode: selectedRow.MEM_PASS
            //  });
            setName(selectedRow.name)
            setPhnum(selectedRow.phnum)
            setPasscode(selectedRow.passcode)
            setShowAddDialog(true)
            setMemid(selectedRow.memid);
         }
     }//hg''

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
            memid: memId,
            name: nname,
            phnum: pphnum,
            passcode: ppasscode
        }
        //console.log(selectedRow);

        axios({
            method: 'POST',
            url:  memId ? API_URL + 'updatemem' : API_URL + 'addmem',
            data: inpobj,
            config:{headers:{"Content-Type":"application/json"}}
        }).then((res) => {
            console.log(res);
            console.log(data);
            let currRow = res.data.data;
            // let currRow = {
            //     // MEM_NAME: res.data.data.name,
            //     // MEM_PHNUM: res.data.data.phnum,
            //     // MEM_PASS: res.data.data.passcode
            //     name: res.data.data.name,
            //     phnum: res.data.data.phnum,
            //     passcode: res.data.data.passcode
            // }
            console.log(selectedRow);
            if(memId){
                for(let i=0; i<data.length; i++){
                    if(data[i].memid == currRow.memid) {
                        data.splice(i,1,currRow);//it adds it and removes old same data
                        break;
                    }
                }
                setSelectedRecord(currRow);
                setShowAddDialog(false);
                //setData(context.state.members)
                setData(data);
                //data: setData(data)
                console.log(selectedRow);
            } else {
                data.splice(0,0,currRow);
                setData(data);
                setSelectedRecord(currRow);
                setShowAddDialog(false);
                 console.log(selectedRow);
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
            //value={context.state.members} 
            value={data}
            selectionMode="single" 
            selection={selectedRow} dataKey="memid" 
            onSelectionChange={e => setSelectedRecord(e.value)}
            scrollable scrollHeight="400px" 
            >   
                <Column header='id' field='memid' />
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





