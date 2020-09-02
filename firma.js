
var DomParser = require('dom-parser');
var parser = new DomParser();
var SignedXml = require('xml-crypto').SignedXml	  
	  , fs = require('fs')

	var xml = "<library>" +
	            "<book>" +
	              "<name>Harry Potter</name>" +
	            "</book>" +
			  "</library>"

			  /*
			  fs.readFile('htmlToParse.html', 'utf8', function(err, html){
				if (!err){
				  var dom = parser.parseFromString(html);
			  
				  console.log(dom.getElementById('myElement').innerHTML);
				}
			  })
*/
			  
	const data = fs.readFileSync('10309611131-01-F001-2529sf.xml','utf8');

	//parser = new DOMParser();
   xmlDoc = parser.parseFromString(data,"text/xml");
   ns = xmlDoc.getElementsByTagName("ExtensionContent")[0].namespaceURI


	var sig = new SignedXml()
	sig.addReference("//*[local-name(.)='ExtensionContent']")    
	sig.signingKey = fs.readFileSync("private_key.pem")
	sig.computeSignature(xmlDoc)
	fs.writeFileSync("signed.xml", sig.getSignedXml())