



var CLIENT_SECRET = 'AIzaSyBZvcs4S4_z1xqIkE1YXEe5CsVn7c4JMBA';
var fireBaseSecret = 'AIzaSyBryO5_5WW7VWqa8u1J1OGOzYwBGOJFAuM';
var dataBase = '';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBryO5_5WW7VWqa8u1J1OGOzYwBGOJFAuM",
    authDomain: "projectone-a74f4.firebaseapp.com",
    databaseURL: "https://projectone-a74f4.firebaseio.com",
    projectId: "projectone-a74f4",
    storageBucket: "projectone-a74f4.appspot.com",
    messagingSenderId: "1077113356205"
  };
  firebase.initializeApp(config);

 // Get a reference to the database service
  var db = firebase.database();
  var dataBase = db.ref().child('bars');



 var barName = 'Theater';
 var address = '1807 Telegraph Avenue';
 var openNow = 0;
 var favorite = 1;

 writeUserData();
 readUserDate();


function writeUserData() {
  dataBase.push({
    barName: barName,
    openNow: openNow,
    favorite : favorite
  });
}

function readUserDate(){
	dataBase.on("value", function(snapshot){
		console.log(snapshot.val());
	}, function(errorObject){
		console.log("error reading db" + errorObject.code);
	});
}

// do select query based on favorite bars and populate trending bars  frentend 
function trendingBars(){
	// dataBase.on()
}

