var config = {
	apiKey: "AIzaSyAXWDuvfvz9nzsbXLfBvrOgRI_87QSoZcM",
	authDomain: "fir-c505d.firebaseapp.com",
	databaseURL: "https://fir-c505d.firebaseio.com",
	projectId: "fir-c505d",
	storageBucket: "fir-c505d.appspot.com",
	messagingSenderId: "930932591042"
};

firebase.initializeApp(config);

var db = firebase.database().ref();

db.on("child_added", function(snapshot) {
	console.log("child_added", snapshot.val());
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


	
	// var Name = $("#Train-Name").val().trim();
	// var Destination = $("#Destination").val().trim();
	// var FirstTime = $("#Time").val().trim();
	// var Frequency = $("#Frequency").val().trim();
	// var firstTimeConverted = moment(FirstTime, "hh:mm").subtract(1, "years");
	// var currentTime = moment();
	// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	// var tRemainder = diffTime % Frequency;
	// var minutesTillTrain = Frequency - tRemainder;
	// var nextTrain = moment().add(minutesTillTrain, "minutes");
	// var nextTrainFormatted = moment(nextTrain).format("hh:mm");
	// var zipcode = $(".active").val();
	// console.log(zipcode);
	// console.log(typeof(zipcode));

	// db.push({
	// 	Name: Name,
	// 	Destination: Destination,
	// 	FirstTime: FirstTime,
	// 	Frequency: Frequency,
	// 	Arrival: nextTrainFormatted,
	// 	Away: minutesTillTrain
	// });

	// alert("Your train has been addded!");

	// $("#trainForm").children('input').val('');
	




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
              <button class="shot">SHOT</button>
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


 	
          var tableOutput = `<table class="table">
          <thead>
          <tr>
          <th scope="col">Bar Name</th>
          <th scope="col">Address</th>
          <th scope="col">Open Now?</th>
          <th scope="col">Try a shot here?</th>
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
        console.log(error);
      });

    }

function Push(){
	var zip = $("#location-input").val();
	
	console.log(name);
};

$(document).on('click','.shot',function(){

	var zip = $("#location-input").val();
	console.log(zip);

    var name = $(this).closest("tr").find('th').text();
    console.log(name);
   
    var info = $(this).closest("tr").children('td:first').text();
    
    console.log(info);

    var open = $(this).closest("tr").children('td:nth-child(3)').text();
    
    console.log(open);

    db.push({
	Name: name,
	Address: info,
	Zipcode: zip,
	Open: open
	});


});
