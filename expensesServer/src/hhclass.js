var connection = require('./dbcon');
const { v4: uuidv4 } = require('uuid');



class HouseholdClass {

	constructor(){

	}

	registerHH(inpdata,res,sendResp){

		inpdata.hhid = uuidv4(); inpdata.memid = uuidv4();

		connection.query("insert into mb_hh (HH_ID,HH_NAME,PR_MEM_ID) values(?,?,?)",
			[inpdata.hhid,inpdata.name+' Household'],(err,data)=>{
				if(err){
					sendResp(res,{code:'777',message:err})

				}else {

					connection.query("insert into mb_hh_mem (HH_ID,MEM_ID,MEM_NAME,MEM_PHNUM,MEM_PASS,MEM_ACT_CD,ACTIVE)	values (?,?,?,?,?,?,?)",
						[inpdata.hhid,inpdata.memid,inpdata.name,inpdata.phnum,inpdata.passcode,'111111',inpdata.active],(err,data)=>{
							if(err){
								sendResp(res,{code:'777',message:err})
							}else {
								sendResp(res,inpdata)
							}
						})


				}
			})
	}
	updateHH(inpdata,res,sendResp){
		connection.query("update mb_hh set HH_NAME=? where HH_ID=?",
		[inpdata.name+' Household',inpdata.hhid],(err,results)=>{
				if(err){
						sendResp(res,{code:'777',message:err})
				}else{
					sendResp(res,{code:'999',message:'Household Name Updated Successfully',data:inpdata})
				}

		})

	}
	deleteHH(inpdata,res,sendResp){
	        connection.query("delete from mb_hh where HH_ID=?",
	        [inpdata.hhid],(err,results)=>{
						if(err){
							sendResp(res,{code:'777',message:err})
						}else {
					 	sendResp(res,{code:'999',message:"Household deleted",data:inpdata})
					 }
				 })
}
	OtpVerify(inpdata,res,sendResp){

		connection.query("SELECT MEM_ACT_CD from mb_hh_mem where MEM_ID=?",[inpdata.memid],(err,result)=>{

			if(err){
				sendResp(res,{code:'777',message:err})
			}else{
				if(result.length == 0){
					sendResp(res,{code:'9991',message:'Member not found'})
				}else {
					if(result[0].MEM_ACT_CD == inpdata.otp){
						sendResp(res,{code:'999',message:'Otp validated'})
					}else {
						sendResp(res,{code:'9992',message:'Invalid OTP,Please try again'})
					}
				}

			}
  })
}


AddMem(inpdata,res,sendResp){
	let memid = uuidv4();
        
        //let memid = (Math.random() + 1).toString(36).substring(7);
        inpdata.memid = memid;
	connection.query("insert into mb_hh_mem(MEM_ID,MEM_NAME,MEM_PHNUM,MEM_PASS,HH_ID) values(?,?,?,?,?) ",
	[inpdata.memid,inpdata.name,inpdata.phnum,inpdata.passcode,inpdata.hhid],
	(err,data)=>{
		if(err){
			sendResp(res,{code:'777',message:err})
		}else {
			sendResp(res,{code:'999',message:'Member added to Household',data:inpdata})
		}
})
}
	ListofMem(inpdata,res,sendResp){
		connection.query("select HH_ID as hhid,MEM_ID as memid,MEM_NAME as name,MEM_PHNUM as phnum,MEM_PASS as passcode  from mb_hh_mem where HH_ID=?", [inpdata.hhid],
		(err,results)=>{
			if(err){
					sendResp(res,{code:'777',message:err})
			}else{
				console.log(results);
				sendResp(res,{code:'999',message:'success',data:results})
			}

	})
}

updateMem(inpdata,res,sendResp){
	connection.query("update mb_hh_mem set MEM_NAME=?,MEM_PHNUM=?,MEM_PASS=? where MEM_ID=? and HH_ID=?",
	[inpdata.name,inpdata.phnum,inpdata.passcode,inpdata.memid,inpdata.hhid],(err,results)=>{
			if(err){
					sendResp(res,{code:'777',message:err})
			}else{
				sendResp(res,{code:'999',message:'Member Updated Successfully',data:inpdata})
			}

	})

}
deleteMem(inpdata,res,sendResp){
        connection.query("delete from mb_hh_mem where MEM_ID=?",
        [inpdata.memid],(err,results)=>{
					if(err){
							sendResp(res,{code:'777',message:err})
					}else{
            sendResp(res,{code:'999',message:'Member deleted ',data:inpdata})

        }
			})
}

LoginMem(inpdata,res,sendResp){
	connection.query("SELECT MEM_PASS,MEM_ID,HH_ID,MEM_NAME from mb_hh_mem where MEM_PHNUM=?",[inpdata.phnum],(err,result)=>{

	if(err){
		sendResp(res,{code:'777',message:err})
	}else {
	if(result.length == 0){
			sendResp(res,{code:'9991',message:'Phone number is not registered.'})

	}else{
		if(result[0].MEM_PASS == inpdata.passcode){
				sendResp(res,{code:'999',message:'Login success',name:result[0].MEM_NAME,hhid:result[0].HH_ID,memid:result[0].MEM_ID})
			}else {

					sendResp(res,{code:'9992',message:'Invalid passcode,Please try again'})

			}
	}
	}
})

}
// function isPhnum(inpobj){
//   connection.query("Select MEM_PHNUM as phnum from mb_hh_mem where MEM_PHNUM=?",
//   [inpobj.phnum],(err,results)=>{
//     if(err){
//       console.log(err);
//     return {code:'777',message:err}
//   }else if(results[0].phnum == inpobj.phnum){
//       console.log(results);
//       return {code:'9991',message:'Phone Number Already Exist'}
//     }else{
//       return {code:'999',message:''}
//   }
//
// })
// }
 }

module.exports = HouseholdClass;
