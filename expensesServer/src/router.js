
var HHClass = require('./hhclass');
var TranClass = require('./transactclass');
var RemindClass = require('./reminderclass');
var checkreqObj = require('./checkreq');
async function router(_path,_data,res,sendResponse){

	var hhClass = new HHClass();
	var transactclass = new TranClass();
	var remindclass = new RemindClass();


	switch(_path){
		case '/registerhh':{
			let reqflds = checkreqObj.checkreq(_data,['name','phnum','passcode'])
			const isPhoneUnique = await checkreqObj.isPhoneNumberUnique(_data)
			console.log(isPhoneUnique)
			if(reqflds){
				sendResponse(res,{code:'777',message:reqflds+' missing'});
			}else {
				if(checkreqObj.validatePhNum(_data).error){
					sendResponse(res,{code:'777',message:'Invalid Phone Number'});
				}else if(isPhoneUnique.code== '777'){
					console.log(isPhoneUnique.code)
					sendResponse(res,{code:'777',message:isPhoneUnique.message});
				}else if(isPhoneUnique.code== '9991'){  
					console.log(isPhoneUnique.code)
					sendResponse(res,{code:'9991',message:isPhoneUnique.message});
				}else {
         hhClass.registerHH(_data,res,sendResponse);
			}
}
			break
		}
		case '/updatehh':{
			let reqflds = checkreqObj.checkreq(_data,['name','hhid'])
			if(reqflds){
				sendResponse(res,{code:'777',message:reqflds+' missing'});
			}else {
			hhClass.updateHH(_data,res,sendResponse);
		}
			break;
		}
		case '/deletehh':{
			 let reqflds = checkreqObj.checkreq(_data,['hhid'])
			 if(reqflds){
				 sendResponse(res,{code:'777',message:reqflds+' missing'});
			 }else {
			 hhClass.deleteHH(_data,res,sendResponse);
		 }

			 break;
		 }

		case '/otpverify':{
			hhClass.OtpVerify(_data,res,sendResponse);

			break
		}
		case '/loginmem':{
			let reqflds = checkreqObj.checkreq(_data,['phnum','passcode'])
			if(reqflds){
				sendResponse(res,{code:'777',message:reqflds+' missing'});
			}else {
				if(checkreqObj.validatePhNum(_data).error){
					sendResponse(res,{code:'777',message:'Invalid Phone Number'});
				}else {
					hhClass.LoginMem(_data,res,sendResponse);
				}

		}
			break;
		}

		case '/addmem':{
			let reqflds = checkreqObj.checkreq(_data,['hhid','name','phnum','passcode'])
			if(reqflds){
				sendResponse(res,{code:'777',message:reqflds+' missing'});
			}else if(checkreqObj.validatePhNum(_data).error){
				sendResponse(res,{code:'777',message:'Enter valid Phone Number'});
			}else {
				hhClass.AddMem(_data,res,sendResponse);
			}
			break;
		}
		case '/listofmem':{
			let reqflds = checkreqObj.checkreq(_data,['hhid'])
			if(reqflds){
				sendResponse(res,{code:'777',message:reqflds+' missing'});
			}else {
				console.log(sendResponse);
				hhClass.ListofMem(_data,res,sendResponse);
			}
    break;

      }
				case '/updatemem':{
					let reqflds = checkreqObj.checkreq(_data,['memid','name','phnum','passcode','hhid'])
					if(reqflds){
						sendResponse(res,{code:'777',message:reqflds+' missing'});
					}else {
					hhClass.updateMem(_data,res,sendResponse);
				}
					break;
				}
				case '/deletemem':{
					let reqflds = checkreqObj.checkreq(_data,['memid'])
					if(reqflds){
						sendResponse(res,{code:'777',message:reqflds+' missing'});
					}else {
					hhClass.deleteMem(_data,res,sendResponse);
				}

					break;
				}


				case '/listoftran':{

					let reqflds = checkreqObj.checkreq(_data,['hhid'])
					if(reqflds){
						sendResponse(res,{code:'777',message:reqflds+' missing'});
					}else {
						transactclass.ListofTran(_data,res,sendResponse);
					}
					break;
		        }
						case '/addtran':{
							let reqflds = checkreqObj.checkreq(_data,['hhid','memid','amount','detail','paidbyid','crtby','trantype'])
							if(reqflds){
								sendResponse(res,{code:'777',message:reqflds+' missing'});
							}else {
							transactclass.addTran(_data,res,sendResponse);
						}
							break;
						}
						case '/updatetran':{
							let reqflds = checkreqObj.checkreq(_data,['hhid','memid','amount','detail','paidbyid','crtby','trantype','tranid'])
						if(reqflds){
							sendResponse(res,{code:'777',message:reqflds+' missing'});
						}else {

							transactclass.updateTran(_data,res,sendResponse);
						}
							break;
						}
						case '/deletetran':{
							let reqflds = checkreqObj.checkreq(_data,['tranid'])
							if(reqflds){
								sendResponse(res,{code:'777',message:reqflds+' missing'});
							}else {

						transactclass.deleteTran(_data,res,sendResponse);
					}
							break;
						}
						case '/listofrem':{
							let reqflds = checkreqObj.checkreq(_data,['hhid'])
							if(reqflds){
								sendResponse(res,{code:'777',message:reqflds+' missing'});
							}else {
				           remindclass.ListofRem(_data,res,sendResponse);
								 }
				            break;
				        }
								case '/addrem':{
									let reqflds = checkreqObj.checkreq(_data,['hhid','memid','detail','remfreq','remdt','remday'])
									if(reqflds){
										sendResponse(res,{code:'777',message:reqflds+' missing'});
									}else {
									remindclass.addRem(_data,res,sendResponse);
								}
									break;
								}
								case '/updaterem':{
									let reqflds = checkreqObj.checkreq(_data,['detail','remfreq','remdt','remday','remid','hhid'])
									if(reqflds){
										sendResponse(res,{code:'777',message:reqflds+' missing'});
									}else{
									remindclass.updateRem(_data,res,sendResponse);
								}
									break;
								}
								case '/deleterem':{
									let reqflds = checkreqObj.checkreq(_data,['remid'])
									if(reqflds){
										sendResponse(res,{code:'777',message:reqflds+' missing'});
									}else{
										remindclass.deleteRem(_data,res,sendResponse);
									}

									break;
								}
		default: {
			sendResponse(res,{code:'777',message:'Service Not Found'})
		}
	}
}

module.exports = router;
