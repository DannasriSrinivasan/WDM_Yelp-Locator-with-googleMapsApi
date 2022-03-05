let markers = [];
function setMapOnAll(map) {
   for (let i = 0; i < markers.length; i++) {
     markers[i].setMap(map);
   }
 }
function hideMarkers() {
   setMapOnAll(null);
 }
function sendRequest () {
   var myInput = document.getElementById("output");
    if (myInput) {
        myInput.remove();
        if(markers.length>0){
         hideMarkers();
         markers = [];
        }
    }
   var output = document.createElement("div");
    output.setAttribute('id','output');
   var xhr = new XMLHttpRequest();
   var input = document.getElementById("search").value;
   xhr.open("GET", "proxy.php?term="+input+"&location=Arlington+Texas&limit=10");
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
         var data = json.businesses;
         if(data){
            var mainList = document.createElement("ul");
            mainList.setAttribute('id','mainlist');
            for(let i=0; i<data.length; i++){
               var orderList = document.createElement("li");
               orderList.setAttribute('id','sublist');
               var name = data[i].name;
               var url = data[i].url;
               var namediv = document.createElement("a");
               namediv.href = url;
               namediv.target = '_blank';
               namediv.title = name;
               namediv.innerHTML = i+1+". "+name;
               orderList.appendChild(namediv);
               
               var rating = data[i].rating;
               var ratingDiv = document.createElement("p");
               ratingDiv.innerHTML = "Rating: "+rating+" / 5";
               orderList.appendChild(ratingDiv);

               var contactAt = data[i].display_phone;
               var contactDiv = document.createElement("p");
               contactDiv.innerHTML = "Reach us: "+contactAt;
               orderList.appendChild(contactDiv);

               var image = data[i].image_url;
               var imgDiv = document.createElement("img");
               imgDiv.src = image;
               imgDiv.style.width = '320px';
               imgDiv.style.height = '300px';
               orderList.appendChild(imgDiv);

               mainList.appendChild(orderList);
               var latitude = data[i].coordinates.latitude;
               var longitude = data[i].coordinates.longitude;
               var itemValue = String(i+1);
               var marker = new google.maps.Marker({
                  position: { lat: latitude, lng: longitude },
                  map,
                  label: itemValue,
                });
                markers.push(marker);
            }
         }
         output.appendChild(mainList);
         document.body.appendChild(output); 
       }
   };
   xhr.send();
}
