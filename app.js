// fjrois
var express = require('express');
var bodyParser = require('body-parser');
const app = express();
var request = require('request');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const endpoint = 
'https://notification-test.germanycentral.cloudapp.microsoftazure.de/api/Notification/Create/Car';

var Guid = require('guid');

// Insert headers to avoid Access-Control-Allow-Origin issue when requesting directly fron the website.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());

var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log('Express app listening at port %s', port);
});
module.exports = server;

// Homepage to test unique identifier generation
app.get('/', function (req, res) {
	var guid = Guid.create();
	res.status(200).send(guid.value);
});

// Receive url as parameter and test post request 
// (Deprecated)
app.post('/proxy/:url', function(req,res){
	console.log('params: ',req.params.url);

	var options = {
	    url: endpoint,
	    headers: {}
	};

	request(options, function(error,response,body){
		if (error){
			console.log("Error making the request: ", error);
		}
		else{

		}
	});

	res.send("POST received");
});

// Post emulating Postman request, directly to the HU endpoint. Includes randomly generated unique notification identifier in the body.
app.post('/proxy/', function(req,res){
	var generated_guid = Guid.create();
	var body = req.body;
	console.log('generated_uid: ',generated_guid.value);
	console.log("BODY: ",body);
	// console.log("REQ: ",req);
	var finorvin = "WDD1770031Z000032";
	var lat = 48.745373;
	var lon = 8.806573;
	
	if(typeof body.finorvin !== 'undefined'){
		finorvin = body.finorvin;
	}
	if(typeof body.lat !== 'undefined'){
		lat = body.lat;
	}
	if(typeof body.lon !== 'undefined'){
		lon = body.lon;
	}
	
	var options = { 
		method: 'POST',
		url: 'https://notification-test.germanycentral.cloudapp.microsoftazure.de/api/Notification/Create/Car',
		headers:
		{ 'Postman-Token': '5b9cb6b9-387b-c31a-e1bc-3ab615bafc9b',
		'Cache-Control': 'no-cache' },
		// body: '{\r\n  "Category": "Information",\r\n  "FinOrVin": "WDD1770031Z000032",\r\n  "NotificationUID": "4a4fa210-03e6-4227-950f-1989a3ca5845",\r\n  "SourceServiceName": "Postman",\r\n  "Priority": "Default",\r\n  "Type": "UserNotification",\r\n\r\n\r\n  "Notification": {\r\n  \r\n    "ActionTemplate": [{\r\n      "Arguments": [\r\n        {\r\n          "Arguments": "{\\"DestinationID\\":0,\\"Destination\\":{\\"Title\\":\\"Hausbrauerei Moenchwasen\\",\\"City\\":\\"Simmozheim\\",\\"Street\\":\\"Im Moenchgraben\\",\\"HouseNumber\\":\\"30\\",\\"CrossRoad\\":null,\\"PostalCode\\":\\"75397\\",\\"Country\\":\\"Deutschland\\",\\"CountryIsoCode\\":null,\\"State\\":\\"Baden Würtemberg\\",\\"Lon\\":8.806573,\\"Lat\\":48.745373,\\"AirDistance\\":0.0,\\n\\"DetourTimeInMinutes\\": 0,\\n\\"Type\\": \\"Tourist\\"\\n  },\\n\\"Name\\": null,\\n\\"Destinations\\": null\\n}",\r\n          "LanguageCode": "default"\r\n        }\r\n      ],\r\n      "Group": "Navigation",\r\n      "ID": 196609,\r\n      "Name": "AddAsNavigationTarget",\r\n      "Text": [\r\n        {\r\n          "LanguageCode": "default",\r\n          "Text": "Navigate To"\r\n        }\r\n      ],\r\n      "TrustLevelForExecution": 0\r\n    }],\r\n  \r\n  "MessageLargeIcon": {       \r\n  "IconResourceUID": "testIconAMGGTR"  \r\n  },  \r\n    \r\n    "Message": [\r\n      {\r\n        "LanguageCode": "default",\r\n        "PrimaryText": "PN + Navi Action (Add As Navigation Target)",\r\n        "ReadOut": "Vorlesen Deutsch",\r\n        "SecondaryText": ""\r\n      }\r\n    ]\r\n  }\r\n}\r\n' 
		// body: '{\r\n  "Category": "Information",\r\n  "FinOrVin": "WDD1770031Z000032",\r\n  "NotificationUID": "'+generated_guid.value+'",\r\n  "SourceServiceName": "Postman",\r\n  "Priority": "Default",\r\n  "Type": "UserNotification",\r\n\r\n\r\n  "Notification": {\r\n  \r\n    "ActionTemplate": [{\r\n      "Arguments": [\r\n        {\r\n          "Arguments": "{\\"DestinationID\\":0,\\"Destination\\":{\\"Title\\":\\"Hausbrauerei Moenchwasen\\",\\"City\\":\\"Simmozheim\\",\\"Street\\":\\"Im Moenchgraben\\",\\"HouseNumber\\":\\"30\\",\\"CrossRoad\\":null,\\"PostalCode\\":\\"75397\\",\\"Country\\":\\"Deutschland\\",\\"CountryIsoCode\\":null,\\"State\\":\\"Baden Würtemberg\\",\\"Lon\\":8.806573,\\"Lat\\":48.745373,\\"AirDistance\\":0.0,\\n\\"DetourTimeInMinutes\\": 0,\\n\\"Type\\": \\"Tourist\\"\\n  },\\n\\"Name\\": null,\\n\\"Destinations\\": null\\n}",\r\n          "LanguageCode": "default"\r\n        }\r\n      ],\r\n      "Group": "Navigation",\r\n      "ID": 196609,\r\n      "Name": "AddAsNavigationTarget",\r\n      "Text": [\r\n        {\r\n          "LanguageCode": "default",\r\n          "Text": "Navigate To"\r\n        }\r\n      ],\r\n      "TrustLevelForExecution": 0\r\n    }],\r\n  \r\n  "MessageLargeIcon": {       \r\n  "IconResourceUID": "testIconAMGGTR"  \r\n  },  \r\n    \r\n    "Message": [\r\n      {\r\n        "LanguageCode": "default",\r\n        "PrimaryText": "PN + Navi Action (Add As Navigation Target)",\r\n        "ReadOut": "Vorlesen Deutsch",\r\n        "SecondaryText": ""\r\n      }\r\n    ]\r\n  }\r\n}\r\n' 
		 body: '{\r\n  "Category": "Information",\r\n  "FinOrVin": "'+finorvin+'",\r\n  "NotificationUID": '+generated_guid.value+',\r\n  "SourceServiceName": "Postman",\r\n  "Priority": "Default",\r\n  "Type": "UserNotification",\r\n  "TimeDefinition":{"ActivationStartTime":"2006-01-02T15:04:05Z","ActivationEndTime":"2019-01-02T15:04:05Z"},\r\n\r\n  "Notification": {\r\n  \r\n    "ActionTemplate": [{\r\n      "Arguments": [\r\n        {\r\n          "Arguments": "{\\"DestinationID\\":0,\\"Destination\\":{\\"Title\\":\\"Hausbrauerei Moenchwasen\\",\\"City\\":\\"Simmozheim\\",\\"Street\\":\\"Im Moenchgraben\\",\\"HouseNumber\\":\\"30\\",\\"CrossRoad\\":null,\\"PostalCode\\":\\"75397\\",\\"Country\\":\\"Deutschland\\",\\"CountryIsoCode\\":null,\\"State\\":\\"Baden Würtemberg\\",\\"Lon\\":'+lon+',\\"Lat\\":'+lat+',\\"AirDistance\\":0.0,\\n\\"DetourTimeInMinutes\\": 0,\\n\\"Type\\": \\"Tourist\\"\\n  },\\n\\"Name\\": null,\\n\\"Destinations\\": null\\n}",\r\n          "LanguageCode": "default"\r\n        }\r\n      ],\r\n      "Group": "Navigation",\r\n      "ID": 196609,\r\n      "Name": "AddAsNavigationTarget",\r\n      "Text": [\r\n        {\r\n          "LanguageCode": "default",\r\n          "Text": "Navigate To"\r\n        }\r\n      ],\r\n      "TrustLevelForExecution": 0\r\n    }],\r\n  \r\n  "MessageLargeIcon": {       \r\n\t"IconResourceUID": "testIconAMGGTR"  \r\n\t},  \r\n    \r\n    "Message": [\r\n      {\r\n        "LanguageCode": "default",\r\n        "PrimaryText": "PN + Navi Action (Add As Navigation Target)",\r\n        "ReadOut": "Vorlesen Deutsch",\r\n        "SecondaryText": ""\r\n      }\r\n    ]\r\n  }\r\n}\r\n'
	};

	console.log('\noptions: ',options.body+'\n');
	request(options, function(error,response,body){
		if (error){
			console.log("Error making the request: ", error);
		}
		else{
			// console.log(body);
			res.send("POST request received and sent");
		}
	});
});


/**
 * DEPRECATED
 */

// Post emulating Postman request, first to the CORS-anywhere proxy and then to the HU endpoint. Includes randomly generated unique notification identifier in the body.
app.post('/proxytocors/', function(req,res){
	var generated_guid = Guid.create();
	console.log('generated_uid: ',generated_guid.value);
	var options = { 
		method: 'POST',
		url: 'https://myproxycors.herokuapp.com/https://notification-test.germanycentral.cloudapp.microsoftazure.de/api/Notification/Create/Car',
		headers:
		{ 'Postman-Token': '5b9cb6b9-387b-c31a-e1bc-3ab615bafc9b',
		'Cache-Control': 'no-cache','X-Requested-With': 'https://h6nztsbktj7wp8qd2lh5ia-on.drv.tw/SendingPositionTestWebpage' },
		// body: '{\r\n  "Category": "Information",\r\n  "FinOrVin": "WDD1770031Z000032",\r\n  "NotificationUID": "4a4fa210-03e6-4227-950f-1989a3ca58f0",\r\n  "SourceServiceName": "Postman",\r\n  "Priority": "Default",\r\n  "Type": "UserNotification",\r\n\r\n\r\n  "Notification": {\r\n  \r\n    "ActionTemplate": [{\r\n      "Arguments": [\r\n        {\r\n          "Arguments": "{\\"DestinationID\\":0,\\"Destination\\":{\\"Title\\":\\"Hausbrauerei Moenchwasen\\",\\"City\\":\\"Simmozheim\\",\\"Street\\":\\"Im Moenchgraben\\",\\"HouseNumber\\":\\"30\\",\\"CrossRoad\\":null,\\"PostalCode\\":\\"75397\\",\\"Country\\":\\"Deutschland\\",\\"CountryIsoCode\\":null,\\"State\\":\\"Baden Würtemberg\\",\\"Lon\\":8.806573,\\"Lat\\":48.745373,\\"AirDistance\\":0.0,\\n\\"DetourTimeInMinutes\\": 0,\\n\\"Type\\": \\"Tourist\\"\\n  },\\n\\"Name\\": null,\\n\\"Destinations\\": null\\n}",\r\n          "LanguageCode": "default"\r\n        }\r\n      ],\r\n      "Group": "Navigation",\r\n      "ID": 196609,\r\n      "Name": "AddAsNavigationTarget",\r\n      "Text": [\r\n        {\r\n          "LanguageCode": "default",\r\n          "Text": "Navigate To"\r\n        }\r\n      ],\r\n      "TrustLevelForExecution": 0\r\n    }],\r\n  \r\n  "MessageLargeIcon": {       \r\n  "IconResourceUID": "testIconAMGGTR"  \r\n  },  \r\n    \r\n    "Message": [\r\n      {\r\n        "LanguageCode": "default",\r\n        "PrimaryText": "PN + Navi Action (Add As Navigation Target)",\r\n        "ReadOut": "Vorlesen Deutsch",\r\n        "SecondaryText": ""\r\n      }\r\n    ]\r\n  }\r\n}\r\n' 
		// body: '{\r\n  "Category": "Information",\r\n  "FinOrVin": "WDD1770031Z000032",\r\n  "NotificationUID": '+generated_guid.value+',\r\n  "SourceServiceName": "Postman",\r\n  "Priority": "Default",\r\n  "Type": "UserNotification",\r\n\r\n\r\n  "Notification": {\r\n  \r\n    "ActionTemplate": [{\r\n      "Arguments": [\r\n        {\r\n          "Arguments": "{\\"DestinationID\\":0,\\"Destination\\":{\\"Title\\":\\"Hausbrauerei Moenchwasen\\",\\"City\\":\\"Simmozheim\\",\\"Street\\":\\"Im Moenchgraben\\",\\"HouseNumber\\":\\"30\\",\\"CrossRoad\\":null,\\"PostalCode\\":\\"75397\\",\\"Country\\":\\"Deutschland\\",\\"CountryIsoCode\\":null,\\"State\\":\\"Baden Würtemberg\\",\\"Lon\\":8.806573,\\"Lat\\":48.745373,\\"AirDistance\\":0.0,\\n\\"DetourTimeInMinutes\\": 0,\\n\\"Type\\": \\"Tourist\\"\\n  },\\n\\"Name\\": null,\\n\\"Destinations\\": null\\n}",\r\n          "LanguageCode": "default"\r\n        }\r\n      ],\r\n      "Group": "Navigation",\r\n      "ID": 196609,\r\n      "Name": "AddAsNavigationTarget",\r\n      "Text": [\r\n        {\r\n          "LanguageCode": "default",\r\n          "Text": "Navigate To"\r\n        }\r\n      ],\r\n      "TrustLevelForExecution": 0\r\n    }],\r\n  \r\n  "MessageLargeIcon": {       \r\n  "IconResourceUID": "testIconAMGGTR"  \r\n  },  \r\n    \r\n    "Message": [\r\n      {\r\n        "LanguageCode": "default",\r\n        "PrimaryText": "PN + Navi Action (Add As Navigation Target)",\r\n        "ReadOut": "Vorlesen Deutsch",\r\n        "SecondaryText": ""\r\n      }\r\n    ]\r\n  }\r\n}\r\n' 
		 body: '{\r\n  "Category": "Information",\r\n  "FinOrVin": "WDD1770031Z000032",\r\n  "NotificationUID": '+generated_guid.value+',\r\n  "SourceServiceName": "Postman",\r\n  "Priority": "Default",\r\n  "Type": "UserNotification",\r\n  "TimeDefinition":{"ActivationStartTime":"2006-01-02T15:04:05Z","ActivationEndTime":"2019-01-02T15:04:05Z"},\r\n\r\n  "Notification": {\r\n  \r\n    "ActionTemplate": [{\r\n      "Arguments": [\r\n        {\r\n          "Arguments": "{\\"DestinationID\\":0,\\"Destination\\":{\\"Title\\":\\"Hausbrauerei Moenchwasen\\",\\"City\\":\\"Simmozheim\\",\\"Street\\":\\"Im Moenchgraben\\",\\"HouseNumber\\":\\"30\\",\\"CrossRoad\\":null,\\"PostalCode\\":\\"75397\\",\\"Country\\":\\"Deutschland\\",\\"CountryIsoCode\\":null,\\"State\\":\\"Baden Würtemberg\\",\\"Lon\\":8.806573,\\"Lat\\":48.745373,\\"AirDistance\\":0.0,\\n\\"DetourTimeInMinutes\\": 0,\\n\\"Type\\": \\"Tourist\\"\\n  },\\n\\"Name\\": null,\\n\\"Destinations\\": null\\n}",\r\n          "LanguageCode": "default"\r\n        }\r\n      ],\r\n      "Group": "Navigation",\r\n      "ID": 196609,\r\n      "Name": "AddAsNavigationTarget",\r\n      "Text": [\r\n        {\r\n          "LanguageCode": "default",\r\n          "Text": "Navigate To"\r\n        }\r\n      ],\r\n      "TrustLevelForExecution": 0\r\n    }],\r\n  \r\n  "MessageLargeIcon": {       \r\n\t"IconResourceUID": "testIconAMGGTR"  \r\n\t},  \r\n    \r\n    "Message": [\r\n      {\r\n        "LanguageCode": "default",\r\n        "PrimaryText": "PN + Navi Action (Add As Navigation Target)",\r\n        "ReadOut": "Vorlesen Deutsch",\r\n        "SecondaryText": ""\r\n      }\r\n    ]\r\n  }\r\n}\r\n'
	};


	request(options, function(error,response,body){
		if (error){
			console.log("Error making the request: ", error);
		}
		// console.log(body);
		res.send("POST received");
	});
});