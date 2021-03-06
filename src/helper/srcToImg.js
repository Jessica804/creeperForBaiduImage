const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);


module.exports = async (src,dir) =>{
	if(/\.(jpg|png|gif)$/.test(src)){
		await urlToImg(src,dir);    
	}else{
		await base64ToImg(src,dir);
	}
};

//url => img
const urlToImg = async (url,dir) =>{
	const mod = /^https:/.test(url)?https:http;
	const ext = path.extname(url); //返回path的扩展名，即从path的最后一部分的最后一个.(句号)字符到字符串结束
	const file = path.join(dir,`${Date.now()}${ext}`);
   
	mod.get(url, res => {
		res.pipe(fs.createWriteStream(file))  //createWriteStream 返回一个可写流
			.on('finish',() =>{               //
				console.log(file);
			});
	});

};



//base64 => img

const base64ToImg = async function(base64Str,dir){
	const matches = base64Str.match(/^data:(.+?);base64,(.+)$/);
	try{
		const ext = matches[1].split('/')[1]
			.replace('jpeg','jpg');
		const file = path.join(dir,`${Date.now()}.${ext}`);

		await writeFile(file,matches[2],'base64');
		console.log(file);

	}catch(err){
		console.log('非法的base64 字符串');
	}
};
