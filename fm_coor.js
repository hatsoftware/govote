function do_fm_coor(){
  var dtl=
    '<div style="width:100%;height:100%;background:white;">'+
      '<div style="float:left;width:30%;height:100%;background:none;">'+
        
        '<div style="float:left;width:100%;height:200px;background:none;text-align:left;padding:10px;">'+
          '<p>Please select your preferred area:</p>'+

          '<div class="cls_coor_radio">'+
            '<input type="radio" id="rd_reg" name="contact" value="email">'+
            '<label for="rd_reg">Region</label>'+
          '</div>'+

          '<div class="cls_coor_radio">'+
            '<input type="radio" id="rd_prov" name="contact" value="phone">'+
            '<label style="float:left;padding:3px;width:auto;height:100%;" for="rd_prov">Province</label>'+
          '</div>'+

          '<div class="cls_coor_radio">'+
            '<input type="radio" id="rd_city" name="contact" value="mail">'+
            '<label style="float:left;padding:3px;width:auto;height:100%;" for="rd_city">City/Municipal</label>'+
          '</div>'+        

          '<div class="cls_coor_radio">'+
            '<input type="radio" id="rd_brgy" name="contact" value="mail">'+
            '<label style="float:left;padding:3px;width:auto;height:100%;" for="rd_brgy">Barangay</label>'+
          '</div>'+        
        
        '</div>'+        
      '</div>'+
      '<div style=float:left;width:70%;height:100%;background:none;>'+
        '<div id="cmap" style=width:100%;height:100%;background:none;>'+
        '</div>'+
      '</div>'+
    '</div>';

  JBE_OPEN_VIEW(dtl,'Create Coordinates','close_do_fm_coor');
  modal_ON(true);

  var c_map;
  var c_osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
  c_mqi = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{maxZoom: 20, subdomains:['mt0','mt1','mt2','mt3']});       
  c_map = L.map( 'cmap', {
  center: [12.8797, 121.7740],
  minZoom: 2,
  zoom: 6,
  layers: [c_osm],  
  labels: true,
  zoomControl: false  
  });

  c_map.on('click', function(e){    
  /*
  var coord = e.latlng;
  var lat = coord.lat;
  var lng = coord.lng;
  //alert(lat+'\n'+lng);
  document.getElementById('d_lat').value=lat;
  document.getElementById('d_lng').value=lng;
  //alert(lat);
  */
  });

  var c_baseMaps = {
    "Map View": c_osm,
    "Satellite View": c_mqi
  };

  var overlays =  {//add any overlays here    
  };

  L.control.zoom({
    position: 'topright'
  }).addTo(c_map);

  L.control.layers(c_baseMaps,overlays, {position: 'bottomleft'}).addTo(c_map);

  layerGroup = L.layerGroup().addTo(c_map); 

  
  //c_map.invalidateSize();
  //c_map.setView([11.8787, 121.7740],6);  
  function close_do_fm_coor(c_map){
    c_map.remove();
    return;
  }
}

