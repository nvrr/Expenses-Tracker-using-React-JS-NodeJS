var connection = require('./dbcon');

function checkReq(inpobj,arrofreqflds){
/*inpobj
['name','phnum','passcode']
{
"name": "Donald",
"phnum": "5555555555",
"passcode":"4545"
}
*/
let reqFlds = ''
for(let i=0;i<arrofreqflds.length;i++){
  if(!inpobj[arrofreqflds[i]])
  reqFlds += arrofreqflds[i] + ", ";

}

if(reqFlds){
  reqFlds = reqFlds.substring(0,reqFlds.length-2)
}


return reqFlds;


}

function validatePhNum(inpobj){
  if(inpobj.phnum.length != 10){
    return {error:true,message:'Invalid Phone Number'}
  }else{
    return {error:false,message:''}
  }
}

function isPhoneNumberUnique(inpobj){
  return new Promise((resolve, reject) => {
    connection.query("Select MEM_PHNUM as phnum from mb_hh_mem where MEM_PHNUM=?",
        [inpobj.phnum],
        (err, results) => {
            console.log(err, results)
            if(err){
                console.log('error',err);
                reject({
                    code: '777',
                    message: err
                })
            }
            if(results.length>0 ){
             if (results[0].phnum === inpobj.phnum) {
              console.log('exist')
              resolve({code:'9991',message:'Phone Number Already Exist'})
            }
          }
            else {
              console.log('does not exist')
              resolve({code:'999',message:''})
        }
    })
  })
}
function isPhnum(inpobj) {
    let response = {}
    console.log(inpobj)
    connection.query("Select MEM_PHNUM as phnum from mb_hh_mem where MEM_PHNUM=?",
        [inpobj.phnum],
        (err, results) => {
            console.log(err, results)
            if(err){
                console.log('error',err);
                response = {
                    code: '777',
                    message: err
                }
            }
            else if (results[0].phnum === inpobj.phnum) {
              console.log('exist')
              response = {code:'9991',message:'Phone Number Already Exist'}
            }
            else {
              console.log('does not exist')
              response = {code:'999',message:''}
        }
    })
    console.log(response)
    return response
}
// function isPhnum(inpobj){
//   //let phnumexist=false;
//   connection.query("Select MEM_PHNUM as phnum from mb_hh_mem where MEM_PHNUM=?",
//   [inpobj.phnum],(err,results)=>{
//     if(err){
//       console.log(err);
//     return {code:'777',message:err}
//   }else if(results[0].phnum === inpobj.phnum){
//       console.log(results);
//
//        //return phnumexist=true;
//    return {code:'9991',message:'Phone Number Already Exist'}
//    }else{
//     // return phnumexist;
//      return {code:'999',message:''}
//    }
//
// })
// //return phnumexist;
// }

// db.get("SELECT * from ACCOUNTS where username=? and password=?",
//  [req.body.user,req.body.password],function(err,row){
//       if(typeof row!=='undefined' && row!=null){ console.log('user exists'); }
// });

module.exports = {checkreq:checkReq,validatePhNum:validatePhNum,isPhnum:isPhnum, isPhoneNumberUnique: isPhoneNumberUnique}
