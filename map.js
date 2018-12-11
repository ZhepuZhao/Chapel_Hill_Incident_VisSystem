/*
 * Map preparation
 */
// initialize the map
var map = L.map('map').setView([35.913200, -79.055847], 12);

// add the tile layer to the map
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'sk.eyJ1IjoiemhlcHUiLCJhIjoiY2puaTBtZ3V5MDE0NjN3bzU5aDczM3p5NiJ9.-XZf8bZb9qomobINAOjXKQ'
}).addTo(map);

// circleMarker style
var geojsonMarkerOptions = {
    radius: 3,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

// load the data
var load_data = d3.csv('./data/data.csv', // go to the url
    function (datum) { // d is one row of the csv file, d is an object
        var month = datum.DateOfOccurence.substring(0, datum.DateOfOccurence.lastIndexOf('-'));
        return {
            incidentid: datum.IncidentID,
            offense: datum.Offense,
            type: datum.IncidentType,
            street: datum.Street,
            longitude: datum.Longitude,
            latitude: datum.Latitude,
            date_of_occurence: datum.DateOfOccurence,
            hour_of_occurence: datum.HourOfOccurence,
            premise_description: datum.PremiseDescription,
            victim_age: datum.VictimAge,
            weapon_description: datum.WeaponDescription,
            victim_race: datum.VictimRace,
            victim_sex: datum.VictimGender,
            month: month, // 2017-06, only the year and month
        }
    });

var markers = L.markerClusterGroup();