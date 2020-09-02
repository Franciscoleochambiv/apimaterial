function signXml(xml, xpath, key, dest)
	{
	  var sig = new SignedXml()

	  /*configure the signature object to use the custom algorithms*/
	  sig.signatureAlgorithm = "http://mySignatureAlgorithm"
	  sig.keyInfoProvider = new MyKeyInfo()
	  sig.canonicalizationAlgorithm = "http://MyCanonicalization"
	  sig.addReference("//*[local-name(.)='x']", ["http://MyTransformation"], "http://myDigestAlgorithm")

	  sig.signingKey = fs.readFileSync(key)
	  sig.addReference(xpath)    
	  sig.computeSignature(xml)
	  fs.writeFileSync(dest, sig.getSignedXml())
	}

	var xml = "<library>" +
	            "<book>" +
	              "<name>Harry Potter</name>" +
	            "</book>"
	          "</library>"

	signXml(xml, 
	  "//*[local-name(.)='book']", 
	  "certificado.pem", 
	  "result.xml")