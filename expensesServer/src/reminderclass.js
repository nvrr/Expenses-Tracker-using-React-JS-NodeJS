var connection = require('./dbcon');
const { v4: uuidv4 } = require('uuid');


class ReminderClass{

	constructor(){

	}

addRem(inpdata,res,sendResp){

		inpdata.remid = uuidv4();

		connection.query("insert into mb_reminders (REM_ID,HH_ID,MEM_ID,DETAIL,REM_FREQ,REM_DT,REM_DAY) values(?,?,?,?,?,?,?)",
						[inpdata.remid,inpdata.hhid,inpdata.memid,inpdata.detail,inpdata.remfreq,inpdata.remdt,inpdata.remday],(err,data)=>{
							if(err){
								sendResp(res,{code:'777',message:err})
							}else {
								sendResp(res,{code:'999',message:'Reminder added',data:inpdata})
							}
          })
          }


	ListofRem(inpdata,res,sendResp){
		connection.query("select REM_ID as remid,HH_ID as hhid,MEM_ID as memid,DETAIL as detail,REM_FREQ as remfreq,REM_DT as remdt,REM_DAY  as remday from mb_reminders where HH_ID=?",[inpdata.hhid],
		(err,results)=>{
			console.log(results);
			if(err){
					sendResp(res,{code:'777',message:err})
			}else{
				sendResp(res,{code:'999',message:'success',data:results})
			}

	})
}

updateRem(inpdata,res,sendResp){
	connection.query("update mb_reminders set DETAIL=?,REM_FREQ=?,REM_DT=?,REM_DAY=?  where REM_ID=? and HH_ID=?",
	[inpdata.detail,inpdata.remfreq,inpdata.remdt,inpdata.remday,inpdata.remid,inpdata.hhid],(err,results)=>{
			if(err){
					sendResp(res,{code:'777',message:err})
			}else{
				sendResp(res,{code:'999',message:'Reminder Updated Successfully',data:inpdata})
			}

	})

}
deleteRem(inpdata,res,sendResp){
        connection.query("delete from mb_reminders where REM_ID=?",
        [inpdata.remid],(err,results)=>{
          if(err){
    					sendResp(res,{code:'777',message:err})
    			}else{
            sendResp(res,{code:'999',message:'Reminder deleted ',data:inpdata})

        }
      })
}

}
module.exports = ReminderClass;
