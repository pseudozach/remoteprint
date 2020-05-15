const express = require('express')
const { exec } = require('child_process');
const textToImage = require('text-to-image');
var base64Img = require('base64-img');

var app = express()
.get('/', function(req,res) {
  res.sendfile('index.html');
})
.get('/printit', (req, res) => {
    console.log("printit hit: ",req.query.text)
//	printit();
textToImage.generate(req.query.text).then(function (dataUri) {
  console.log(dataUri);
	base64Img.img(dataUri, '', 'printit1', function(err, filepath) {
		console.log("filepath: ", filepath);
		printit(filepath);
	});
});
//	printit();
//    return res.send("ok")
})
.listen(3000, () => console.log(`Listening on 3000`))
function printit(filepath){
	console.log("printit filepath: ", filepath);
exec('brother_ql -m QL-820NWB -p tcp://192.168.0.136 print -l 29x90 ' + filepath, (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
}
