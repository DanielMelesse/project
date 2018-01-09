var config = {
	apiKey: "AIzaSyAXWDuvfvz9nzsbXLfBvrOgRI_87QSoZcM",
	authDomain: "fir-c505d.firebaseapp.com",
	databaseURL: "https://fir-c505d.firebaseio.com",
	projectId: "fir-c505d",
	storageBucket: "fir-c505d.appspot.com",
	messagingSenderId: "930932591042"
};



$("#list").hide();



firebase.initializeApp(config);

var db = firebase.database().ref();

db.on("child_added", function(snapshot) {
	// console.log("child_added", snapshot.val());
	var i = $("<tr>");
	var tdName = $("<td>");
	tdName.html(snapshot.val().Name);
	i.append(tdName);

	var tdAddress = $("<td>");
	tdAddress.html(snapshot.val().Address);
	i.append(tdAddress);

	var tdZipcode = $("<td>");
	tdZipcode.html(snapshot.val().Zipcode);
	i.append(tdZipcode);

	var tdOpen = $("<td>");
	tdOpen.html(snapshot.val().Open);
	i.append(tdOpen);

	$("#bars").append(i);
});

//eitien's code here
 // Call Geocode
    //geocode();

    // Get location form
    var locationForm = document.getElementById('location-form');

    // Listen for submit
    locationForm.addEventListener('submit', geocode);

    function geocode(e){

      
      // Prevent actual submit
      e.preventDefault();

      var map;
      var service;
      var infowindow;
      var lat;
      var lng;

      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          var rowOutput = '';
          for (var i = 0; i < 10; i++) {
            var place = results[i];

            rowOutput += `<tr>
            <th class="name" scope="row">${place.name ? place.name : "Name Missing"}</th>
            <td class="vacinity">${place.vicinity}</td>
            <td class="open">${place.opening_hours ? place.opening_hours.open_now ? "Yes" : "No" : "Unknown"}</td>
            <td>
              <button class="shot"></button>
            </td>
            </tr>
            `;

            //-------- please read this -----
            //use the "place" variable to post/put into Firebase; name, vicinity, opening_hours are the attributes to store. good luck!
            //------------------------------------------------------

            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
          }

          var tableOutput = `<table id="results" class="table">
          <thead>
          <tr>
          <th scope="col">Bar Name</th>
          <th scope="col">Address</th>
          <th scope="col">Open Now?</th>
          <th scope="col">Add to favorites?</th>
          </tr>
          </thead>
          <tbody>
          ${rowOutput}
          </tbody>
          </table>`;
          document.getElementById('table').innerHTML = tableOutput;
        }
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
      }

      var location = document.getElementById('location-input').value;

      axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
          address:location,
          key:'AIzaSyCBzRvVnw3ZoB3C-Sy9-hjq587aPST77RY'
        }
      })
      .then(function(response){

         lat = response.data.results[0].geometry.location.lat;
         lng = response.data.results[0].geometry.location.lng;
         var placeLatLong = new google.maps.LatLng(lat,  lng);

         map = new google.maps.Map(document.getElementById('map'), {
            center: placeLatLong,
            zoom: 14,
            scrollwheel: false
          });

         var request = {
           location: placeLatLong,
           radius: '5000',
           type: ['bar']
         };

         service = new google.maps.places.PlacesService(map);
         service.nearbySearch(request, callback);

      })
      .catch(function(error){
        // console.log(error);
      });

    }


$(document).on('click','#showList',function(){
  // 
  $('#map').slideUp(3000);
  $('#table').slideUp(3000);

  $("#list").slideDown(3000);

  });

$(document).on('click','#hideList',function(){
  $("#location-input").val('');
  $("#list").slideUp(3000);
  $('#map').slideDown(3000);
  $('#table').slideDown(3000);
  });
  

$(document).on('click','.shot',function(){

	var zip = $("#location-input").val();

    var name = $(this).closest("tr").find('th').text();
   
    var info = $(this).closest("tr").children('td:first').text();
  
    var open = $(this).closest("tr").children('td:nth-child(3)').text();
    
    db.push({
    	Name: name,
    	Address: info,
    	Zipcode: zip,
    	Open: open
	});

});

// SF Neighborhoods images

var imageArray = [
  "assets/img/alamoSquare.jpeg","assets/img/BernalHeights.jpeg",
    "assets/img/castro.jpeg", "assets/img/embarcadero.jpeg",
    "assets/img/fillmoreDistrict.jpeg", "assets/img/fishermanWharf.jpeg",
    "assets/img/goldenGatePark.jpeg", "assets/img/haightAshury.jpeg",
    "assets/img/hayesValley.jpeg","assets/img/huntersPoint.jpeg",
    "assets/img/japanTown.jpeg", "assets/img/marinaDistrict.jpeg",
    "assets/img/marinaDistrict.jpeg", "assets/img/nobHill.jpeg",
    "assets/img/noeValley.jpeg", "assets/img/northBeach.jpeg",
    "assets/img/pacificheights.jpeg", "assets/img/potreroHill.jpeg",
    "assets/img/presidio.jpeg", "assets/img/russianHill.jpeg",
    "assets/img/southOfMarket.jpeg", "assets/img/tenderloin.jpeg",
    "assets/img/treasureIsland.jpeg", "assets/img/twinPeaks.jpeg",
    "assets/img/unionSquare.jpeg"
];

// $(document).ready(function(){


//   function newRandomIame(){
//       // get random SF Neighborhoods image.
//       var randomItem = imageArray[Math.floor(Math.random()*imageArray.length)];
//       var img = $("<img>");
//       var div = $("<div>");
//       img.attr("class",  'imageone');
//       img.attr("src",randomItem )
//       div.prepend(img)
//       $("#image").append(div);
//   };

//   // making function call
//   newRandomIame();

// // query animate move 
// var right = function(){
//   newRandomIame();
//   $(".imageone").animate({ "left": "100%" }, 4000, left );

// }
// // still might need more work.. it should only move only one image at time
// var left = function(){
//   newRandomIame();
//   $(".imageone").animate({ "left": "100%" }, 4000, right );
  
// }

// right();

// });
