



var CLIENT_SECRET = 'AIzaSyBZvcs4S4_z1xqIkE1YXEe5CsVn7c4JMBA';


// https://open.fda.gov/food/enforcement/
$(document).ready(function(){})
$(document).on('click', '.btn', function(){
  var city = $(".form-control").val().trim();
  console.log(city);
  console.log(CLIENT_SECRET);
  var queryURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars+in+'+ city + '&key=' + CLIENT_SECRET;

  // var queryURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=' + CLIENT_SECRET;
  console.log(queryURL);

  $.ajax({
    crossOrigin: true,
    type: 'GET',
    url: queryURL,
    // cache: false,
    // async: false,
    // jsonpCallback: 'onNowCallback',
    // jsonpCallback: 'onNowCallback',
    // jsonp: 'callback',
    contentType: "",
    dataType: 'jsonp',
    success: function (data) {
      console.log(data)
      console.log(JSON.stringify(data));
    },
    error: function (e) {
        console.log(e.message);
    }
  });


  // $.ajax({
  //   url: queryURL,
  //   headers: {
  //       'Content-Type': '	application/json; charset=UTF-8'
  //   },
  //   // contentType: "application/json",
  //   type: "GET", 
  //   async: false,
  //   dataType: "JSONP",
  //   jsonpCallback: 'jsonCallback',
  //   success: function (result) {
  //       console.log(result);
  //   },
  //   error: function () {
  //       console.log("error");
  //   }
  // });



    // $.ajax({
    //   url: queryURL,
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // },
    //   type: "GET",
    //   dataType: "json",
    //   data:{},
    // }).done(function(response){
    //   console.log(response.html_attributions.results);
    //   // alert("hello")
    //   var result = (JSON.stringify(response.results));
    //   console.log(result);
    //   $(".form-control").text(JSON.stringify(response.results));
      
    // });
    event.preventDefault();
    
});





// $(document).ready(function () {
//   $.ajax({
//   type: 'GET',
//   url: 'https://maps.googleapis.com/maps/api/place/searc/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&sensor=false&key='my_google_places_key';',
//   async: false,
//   jsonpCallback: 'jsonCallback',
//   contentType: "application/json",
//   dataType: 'jsonp',
//   success: function (data) {
//     console.log(data);
//   //      for (i = 0; i < data.results.length; i++) {
//   //     myAddress[i] = data.results[i].formatted_address;
//   //     document.getElementById("message").innerHTML += myAddress[i] + "<br>";
//   //     console.log(myAddress[i]);
//   // };
//   },
//   error: function (e) {
//       console.log(e.message);
//   }
// });
// }); 
