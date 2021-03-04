var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
mqi = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']});       
map = L.map( 'jmap', {
center: [12.8797, 121.7740],
minZoom: 2,
zoom: 6,
layers: [osm],  
labels: true,
zoomControl: false  
});

map.on('click', function(e){    

var coord = e.latlng;
var lat = coord.lat;
var lng = coord.lng;
//alert(lat+'\n'+lng);
document.getElementById('d_lat').value=lat;
document.getElementById('d_lng').value=lng;
//alert(lat);
});

var baseMaps = {
  "Map View": osm,
  "Satellite View": mqi
};

var overlays =  {//add any overlays here    
};

L.control.zoom({
position: 'topright'
}).addTo(map);

L.control.layers(baseMaps,overlays, {position: 'bottomleft'}).addTo(map);

layerGroup = L.layerGroup().addTo(map); 
//document.getElementById('jmap').hidden=false;

var geojsonObj = new L.GeoJSON.AJAX("zprov.geojson");
geojsonObj.addTo(map);

