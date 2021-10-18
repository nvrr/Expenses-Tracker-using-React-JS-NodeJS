
const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
var router = require('./src/router');



const webServer = http.createServer((req,res)=>{
	res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, contenttype');
  res.setHeader('Access-Control-Allow-Credentials', true);

	if(req.method == 'GET'){
		res.writeHead(200,{headers:{"Content-type":"application/json"}})
    	res.end(JSON.stringify({code:'777',message:'we do not accept get method'}));
	} else {

	var inpurl = req.protocol || 'http://' + req.headers.host+req.url
    var inpReqUrl = new url.URL(inpurl)
    var _path = inpReqUrl.pathname;
    var _data = "";
    let buffer = new stringDecoder('utf-8')
    req.on('data',(data)=>{
    		_data += buffer.write(data)

    })

    req.on('end',async ()=>{
    	   _data += buffer.end()
				 if(!_data){
					 sendResponse(res,{code:'777',message:'inpobj missing'})
				 } else {
					//_data = JSON.parse(_data);
					 try {
					 _data = JSON.parse(_data);
				 console.log(_data);
				 await router(_path,_data,res,sendResponse);
				 console.log("waiting for result")


	} catch(e) {

		  sendResponse(res,{code:'777',message:'invalid input object'+e})
			//alert(e); // error in the above string (in this case, yes)!
	}

				 }

    })
  }
}).listen(5000,()=>{
	console.log('webserver is started')})



function sendResponse(res,inpobj){
	res.writeHead(200,{headers:{"Content-type":"application/json"}})
    res.end(JSON.stringify(inpobj));
}
