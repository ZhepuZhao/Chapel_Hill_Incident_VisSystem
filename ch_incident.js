/*
 * Map preparation
 */
// initialize the map
var mymap = L.map('mapid').setView([35.913200, -79.055847], 12);

// add the tile layer to the map
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'sk.eyJ1IjoiemhlcHUiLCJhIjoiY2puaTBtZ3V5MDE0NjN3bzU5aDczM3p5NiJ9.-XZf8bZb9qomobINAOjXKQ'
}).addTo(mymap);

// popup for a click event on the map to show latitude and longitude
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

/*
 * Do something on the map
 */
// circle style
var geojsonMarkerOptions = {
    radius: 3,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var markersLayer = new L.LayerGroup(); // NOTE: Layer is created here!

class MapVis {
    constructor(){
        this.year = '2017';
        this.data_url = './data/police-incident-reports-written.csv';
    }

    setYear(new_year){
        this.year = new_year;
        this.render();
    }

    render(){
        var thisvis = this;
        // console.log(thisvis.year);
        markersLayer.clearLayers();
        d3.csv(this.data_url, // got to the url
            function (datum) { // d is one row of the csv file, d is an object
                return {
                    incidentid: datum.IncidentID,
                    agency: datum.Agency,
                    offence: datum.Offense,
                    category: datum.Category,
                    street: datum.Street,
                    city: datum.City,
                    state: datum.State,
                    longitude: datum.Longitude,
                    latitude: datum.Latitude,
                    forcible: datum.Forcible,
                    maps: datum.maps,
                    date_of_report: datum.DateOfReport,
                    hour_of_report: datum.HourOfReport,
                    date_of_occurence: datum.DateOfOccurence,
                    hour_of_occurence: datum.HourOfOccurence,
                    date_found: datum.DateFound,
                    hour_found: datum.HourFound,
                    apartment: datum.Apartment,
                    zipcode: datum.Zipcode,
                    reported_as: datum.ReportedAs,
                    premise_description: datum.PremiseDescription,
                    victim_age: datum.VictimAge,
                    weapon_description: datum.WeaponDescription,
                    victim_race: datum.VictimRace,
                    victim_gender: datum.VictimGender,
                }
            }).then(function (data) {

            data.forEach(function (value) {
                var date = value.date_of_occurence.substring(0,4);
                if (value.latitude != "" && value.longitude != "" && date == thisvis.year) {

                    var latlng = L.latLng(value.latitude, value.longitude);
                    var marker = L.circleMarker(latlng, geojsonMarkerOptions)
                        .addTo(mymap)
                        .bindTooltip("incident ID: " + value.incidentid);
                    markersLayer.addLayer(marker);
                }
            })
            markersLayer.addTo(mymap);
        });
    }
}

// work with geoJSON
// get data from the json file through d3.json
// var geoJson = './data/police-incident-reports-written.geojson';

// d3.json(geoJson, function (d) {
//
//     // construct json objects
//     var incidents = d.features;
//     // console.log(incidents);
//
//     // circle style
//     var geojsonMarkerOptions = {
//         radius: 3,
//         fillColor: "#ff7800",
//         color: "#000",
//         weight: 1,
//         opacity: 1,
//         fillOpacity: 0.8
//     };
//
//     // draw circles on the map
//     L.geoJSON(incidents, {
//         pointToLayer: function (feature, latlng) {
//             return L.circleMarker(latlng, geojsonMarkerOptions)
//                 .addTo(mymap)
//                 .bindTooltip("incident ID: " + feature.properties.incidentid +
//                     "<br />" + "weapon_description: " + feature.properties.weapon_description +
//                     "<br />" + "street: " + feature.properties.street +
//                     "<br />" + "offense: " + feature.properties.offense +
//                     "<br />" + "victim_gender: " + feature.properties.victim_gender +
//                     "<br />" + "victim_age: " + feature.properties.victim_age +
//                     "<br />" + "victim_race: " + feature.properties.victim_race +
//                     "<br />" + "hour_of_report: " + feature.properties.hour_of_report);
//         }
//     }).addTo(mymap);
// });






