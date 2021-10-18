var connection = require('./dbcon');
const { v4: uuidv4 } = require('uuid');


class TransactionClass{

	constructor(){

	}

addTran(inpdata,res,sendResp){

		inpdata.tranid = uuidv4();

		connection.query("insert into mb_transactions (HH_ID,MEM_ID,TRAN_ID,DETAIL,AMOUNT,CRT_BY,TRANSACTION_TYPE,PAID_BY_ID) values(?,?,?,?,?,?,?,?)",
						[inpdata.hhid,inpdata.memid,inpdata.tranid,inpdata.detail,inpdata.amount,inpdata.crtby,inpdata.trantype,inpdata.paidbyid],(err,data)=>{
							if(err){
								sendResp(res,{code:'777',message:err})
							}else {
								sendResp(res,inpdata)
							}
						})
          }


	ListofTran(inpdata,res,sendResp){
		connection.query("select HH_ID as hhid, TRAN_ID as tranid,DETAIL as detail,AMOUNT as amount,TRANSACTION_TYPE type, CRT_ON crton, CRT_BY crtby from mb_transactions where HH_ID=?",[inpdata.hhid],
		(err,results)=>{
			//console.log(results);
			if(err){
					sendResp(res,{code:'777',message:err})
			}else{
				sendResp(res,{code:'999',message:'success',data:results})
			}

	})
}

updateTran(inpdata,res,sendResp){
	connection.query("update mb_transactions set CRT_BY=?, DETAIL=?,TRANSACTION_TYPE=?,PAID_BY_ID=? ,AMOUNT=? where TRAN_ID=? and HH_ID=?",
	[inpdata.crtby,inpdata.detail,inpdata.trantype,inpdata.paidbyid,inpdata.amount,inpdata.tranid,inpdata.hhid],(err,results)=>{
			if(err){
					sendResp(res,{code:'777',message:err})
			}else{
				sendResp(res,{code:'999',message:'Transaction Updated Successfully',data:inpdata})
			}

	})

}
deleteTran(inpdata,res,sendResp){
        connection.query("delete from mb_transactions where TRAN_ID=?",
        [inpdata.tranid],(err,results)=>{
              if(err){
                sendResp(res,{code:'777',message:err})
              }else{
            sendResp(res,{code:'999',message:'Transaction deleted ',data:inpdata})

        }
})
}



}
module.exports = TransactionClass;
