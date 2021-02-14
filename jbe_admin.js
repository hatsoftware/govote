var lu_ob = []; 
var lu_db = [];
var FM_TABLE;
//var uxxlu_ob = ['dv_brgy','dv_city','dv_province','dv_region']; 
function dispAdmin(){    
  var dtl='<div style="width:100%;height:100%;overflow:auto;">'+
            '<div style="margin:0 auto;width:80%;height:500px;margin-top:100px;text-align:center;padding:2px;background:cyan;">'+

              '<div style="width:80%;margin:10%;height:auto;margin-top:100px;text-align:center;padding:10px;background:orange;">'+
                '<input type="button" onclick="do_fm_candidate()" style="width:100%;height:30px;" value="FM Candidate" />'+
                '<input type="button" onclick="do_fm_cluster()" style="width:100%;height:30px;margin-top:10px;" value="FM Cluster" />'+
                '<input type="button" onclick="do_fm_watcher()" style="width:100%;height:30px;margin-top:10px;" value="FM Watcher" />'+
              '</div>'+

            '</div>'+
          '</div>';

  document.getElementById("div_main_right").innerHTML=dtl; 
  
}



//################################################################################################################
function do_fm_candidate(){    
  var db=DB_CANDIDATE;  
  lu_db[0]=[];
  for(var i=0;i<db.length;i++){
    lu_db[0][i]=db[i]['lname']+', '+db[i]['fname']+' | '+db[i]['code'];
  }
  var fm_ob = {
    title:"My File Maintenance",
    top:"", left:"", bottom:"10%", right:"5%",
    width:"600px",height:"400px"
  };  

  var db=DB_CANDIDATE;  

  if(JBE_MOBILE){ 
    fm_ob.width="300px"; 
    fm_ob.height="400px";
    fm_ob.right="5px";  
    fm_ob.top="30px"; 
  }

  //var lu_ob = ['dv_brgy','dv_city','dv_province','dv_region']; 
  var lu_ob = ["dv_brgy","dv_city","dv_province","dv_region"]; 
  
  var fm_layout=
    '<div style="width:100%;height:100%;margin-top:0px;text-align:left;padding:0px;background:white;">'+
      '<div style="width:100%;height:25px;text-align:center;padding:5px;background:lightgray;">CANDIDATE ENTRY</div>'+

      '<div style="width:100%;height:auto;padding:5px;border:0px solid green;">'+        
        '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
          '<span style="float:left;width:25%;height:100%;padding:5px;">Code:</span>'+
          '<input type="image" src="gfx/jsearch.png" onclick="openLookup(dv_clusterno.value,lu_db,uxxlu_ob)" style="float:left;width:4.5%;height:100%;margin-right:0.5%;border:1px solid black;"/>'+
          '<input id="dv_clusterno" type="text" style="float:left;width:70%;height:100%;" value="" />'+
        '</div>'+
        '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
          '<div style="float:left;width:30%;height:100%;padding:5px;">Name of Candidate:</div>'+
          '<input id="candi_name" type="text" style="float:left;width:70%;height:100%;" value="" />'+
        '</div>'+
      '</div>'+

    '</div>';
  
  FM_MAIN(fm_ob,db,fm_layout);
}
//################################################################################################################
function do_fm_cluster(){   
  alert(brgy.length);
  
  lu_db[0]=[];

  var db=brgy;  
  lu_db[1]=[];
  for(var i=0;i<db.length;i++){
    lu_db[1][i]=db[i]['brgyDesc']+', '+lgetCityByCode(db[i]['citymunCode'])[0].citymunDesc+', '+ 
    lgetProvByCode(db[i]['provCode'])[0].provDesc+', '+db[i]['regCode'];  
  }

  var fm_ob = {
    title:"CLUSTER MASTER FILE",
    top:"10%", left:"", bottom:"", right:"10%",
    width:"600px",height:"400px"
  };  

  var fm_db = {
    title:"CLUSTER MASTER FILE",
    top:"10%", left:"", bottom:"", right:"10%",
    width:"600px",height:"400px"
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="300px"; 
    fm_ob.height="400px";
    fm_ob.right="5px";  
    fm_ob.top="30px"; 
  }

  //var lu_ob = ['dv_brgy','dv_city','dv_province','dv_region']; 
  lu_ob = ["dv_brgy","dv_city","dv_province","dv_region"]; 
    
  var fm_layout=
    '<div style="width:100%;height:100%;margin-top:0px;text-align:left;padding:0px;background:white;">'+
      '<div style="width:100%;height:25px;text-align:center;padding:5px;background:lightgray;">CLUSTER MASTER FILE</div>'+

      '<div style="width:100%;height:auto;padding:5px;border:0px solid green;">'+        

        '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
          '<div style="float:left;width:25%;height:100%;padding:5px;">Code:</div>'+
          '<input type="image" src="gfx/jsearch.png" style="float:left;width:4.5%;height:100%;padding:2px;margin-right:0.5%;border:1px solid gray;"/>'+
          '<input id="clusterno" type="text" style="float:left;width:70%;height:100%;" value="" />'+
        '</div>'+
        '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
          '<div style="float:left;width:30%;height:100%;padding:5px;">Cluster Name:</div>'+
          '<input id="clustername" type="text" style="float:left;width:70%;height:100%;" value="" />'+
        '</div>'+
        '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
          '<div style="float:left;width:30%;height:100%;padding:5px;">Precincts:</div>'+
          '<input id="precincts" type="text" style="float:left;width:70%;height:100%;" value="" />'+
        '</div>'+

        '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
          '<div style="float:left;width:25%;height:100%;padding:5px;">Barangay:</div>'+
          '<input type="image" src="gfx/jsearch.png" onclick="openLookup(dv_brgy.value,lu_db[1],lu_ob)" style="float:left;width:4.5%;height:100%;padding:2px;margin-right:0.5%;border:1px solid gray;"/>'+
          '<input id="dv_brgy" disabled type="text" style="float:left;width:70%;height:100%;" value="" />'+
        '</div>'+
        '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
          '<div style="float:left;width:30%;height:100%;padding:5px;">Municipal/City:</div>'+
          '<input id="dv_city" disabled type="text" style="float:left;width:70%;height:100%;" value="" />'+
        '</div>'+
        '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
          '<div style="float:left;width:30%;height:100%;padding:5px;">Province:</div>'+
          '<input id="dv_province" disabled type="text" style="float:left;width:70%;height:100%;" value="" />'+
        '</div>'+
        '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
          '<div style="float:left;width:30%;height:100%;padding:5px;">Region:</div>'+
          '<input id="dv_region" disabled type="text" style="float:left;width:70%;height:100%;" value="" />'+
        '</div>'+

      '</div>'+

    '</div>';
  
  FM_MAIN(fm_ob,db,fm_layout);
}

//################################################################################################################
function do_fm_watcher(){    
  var db=DB_USER;  
  lu_db[0]=[];
  for(var i=0;i<db.length;i++){
    lu_db[0][i]=db[i]['lname']+', '+db[i]['fname']+' | '+db[i]['code'];
  }
  var fm_ob = {
    title:"WATCHER File Maintenance",
    top:"", left:"", bottom:"10%", right:"5%",
    width:"600px",height:"400px"
  };  

  var fm_fields = ["userid","username"];

  if(JBE_MOBILE){ 
    fm_ob.width="300px"; 
    fm_ob.height="400px";
    fm_ob.right="5px";  
    fm_ob.top="30px"; 
  }

  //var lu_ob = ['dv_brgy','dv_city','dv_province','dv_region']; 
  var lu_ob = ["dv_brgy","dv_city","dv_province","dv_region"]; 
  
  var fm_layout=
    '<div style="width:100%;height:100%;margin-top:0px;text-align:left;padding:0px;background:white;">'+
      '<div style="width:100%;height:25px;text-align:center;padding:5px;background:lightgray;">WATCHER ENTRY</div>'+

      '<div style="width:100%;height:auto;padding:5px;border:0px solid green;">'+        
        '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
          '<span style="float:left;width:25%;height:100%;padding:5px;">Code:</span>'+
          '<input type="image" src="gfx/jsearch.png" onclick="openLookup(dv_clusterno.value,lu_db,uxxlu_ob)" style="float:left;width:4.5%;height:100%;margin-right:0.5%;border:1px solid black;"/>'+
          '<input id="dv_watcherno" type="text" style="float:left;width:70%;height:100%;" value="" />'+
        '</div>'+
        '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
          '<div style="float:left;width:30%;height:100%;padding:5px;">Name of Watcher:</div>'+
          '<input id="txWatcherName" type="text" style="float:left;width:70%;height:100%;" value="" />'+
        '</div>'+
      '</div>'+

    '</div>';
  
  FM_MAIN(fm_ob,db,fm_fields,fm_layout);
}

function toggle_admin(f_true){    
  var vdisp='none';
  if(f_true){ vdisp='block'; }  
  document.getElementById("popadmin").style.display=vdisp;
}

function proc_admin(){
  toggle_admin(false);
  document.getElementById("div_mapbox").style.display='none';
  document.getElementById("div_pass").style.display='block';
  document.getElementById("txUser").value="";
  document.getElementById("txPass").value="";        
  document.getElementById("txUser").focus();
}

function openCity(evt, cityName) {    
  CURR_REC='';
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.firstElementChild.className += " w3-border-red";
}   

function access_page(n){        
  if(CURR_AXES.substr(n,1)=='1'){  
    return true;
  }
  
  MSG_SHOW(vbOk,"ACCESS DENIED",
    "You are not authorized to access this page. Please ask your System Administrator for assistance.",function(){},function(){});    
  return false;  
}

function toggle_close(v){
  var v_flag = "auto";
  document.getElementById("pg1_cutoff").style.display="block";
  document.getElementById("pg2_cutoff").style.display="none";  
  if(v !== 0) { 
    document.getElementById("pg1_cutoff").style.display="none";
    document.getElementById("pg2_cutoff").style.display="block";  
    v_flag="none";
  }else {
    openWindow(false);
  }
  $('#retback').css('pointer-events',v_flag);  
  $('#menu_bar').css('pointer-events',v_flag);  
  $('#div_right').css('pointer-events',v_flag); 
  $('#admin2').css('pointer-events',v_flag);   
  $('#div_manager').css('pointer-events',v_flag);    
  pageBacker_events(v_flag);
  
}


/******** FILEMAINTENANCE FOR MANAGERS ********** */
/*
function dispManagers(){  
  CURR_REC='';
  var managers = JBE_MNGR;
  var f_white=0;
  var bclor='white';
  
  var dtl_H='27px;';
  var details='';
    
  for(var i=0; i<managers.length; i++) {          
    var v_code=managers[i]['MCODE'];
    if(f_white==0) {				
      bclor="white";
      f_white=1;
    }	else {
      bclor="lightgray";
      f_white=0;
    }		
    
    //eppy
    details = details +    
      '<div id="manager_line'+v_code+'" class="manager_class" data="'+bclor+'" data-sel=0 data-row='+i+' onmouseover="subHover(this.id,1,&quot;'+i+'&quot;,&quot;red&quot;)" onmouseout="subHover(this.id,0,&quot;'+i+'&quot;,&quot;none&quot;)"'+ 
      '     onclick="HLrow(&quot;manager&quot;,&quot;'+v_code+'&quot;)" style="float:left;margin-bottom:0%;border:0px solid gray;width:100%;height:31px;padding:0%;background:'+bclor+';">'+          
      '  <div id="mngr_code'+v_code+'" class="centro mngr_width_code">'+managers[i]['MCODE']+'</div>'+            
      '  <div id="mngr_name'+v_code+'" class="centro mngr_width_name oberplo">'+managers[i]['MNAME']+'</div>'+				
      '  <div id="mngr_del'+v_code+'"  class="centro del_edit">'+
      '     <img src="gfx/jdele.png" onclick="del_manager(&quot;'+v_code+'&quot;)" /></div>'+
      '  <div id="mngr_edit'+v_code+'" class="centro del_edit">'+	            
      '     <img src="gfx/jedit.png" onclick="add_manager(false,&quot;'+v_code+'&quot;)" /></div>'+      
      '</div>';
    
  }
  document.getElementById("div_manager").innerHTML=details;
  highlightCurrRec('manager');
}

function init_manager(f_add,vcode){
  var aryDB=[];  
  if(!f_add){
    aryDB=JBE_GETARRY(JBE_MNGR,'MCODE',vcode);  
  }
  document.getElementById("txMcode").value = iif(f_add,'',aryDB['MCODE']);
  document.getElementById("txMname").value = iif(f_add,'',aryDB['MNAME']);     
 
  openManager();
}

function add_manager(f_add,vcode){    
  init_manager(f_add,vcode);

  if(f_add){
    document.getElementById("div_add_edit_manager").innerHTML='ADD ENTRY';    
    document.getElementById("txMcode").disabled=false;
    document.getElementById("manager").setAttribute('data-mode',1);
    document.getElementById("txMcode").focus();
  }else{
    document.getElementById("div_add_edit_manager").innerHTML='EDIT ENTRY';  
    document.getElementById("txMcode").disabled=true;  
    document.getElementById("manager").setAttribute('data-mode',0);
    document.getElementById("txMname").focus();
  }
}

function del_manager(vcode){      
  //var foundProj=found_manager_in_project(user);
  var foundProj=used_in_other_files(vcode,"MCODE",JBE_PROJ,"projcode");
  var foundCodex=used_in_other_files(vcode,"jprojid",DB_USER,"jname");
  
  var msg1a = "This project leader is used in Project page. <br><hr>Project-Code: "+vcode;
  var msg1b = "This project leader is used in Admin User Code page. <br><hr>User Code: "+vcode;
  if(foundProj !== null){
    MSG_SHOW(vbOk,"CAN'T DELETE THIS RECORD",msg1a,function(){},function(){});  
    return;
  }else if(foundCodex !== null){
    MSG_SHOW(vbOk,"CAN'T DELETE THIS RECORD",msg1b,function(){},function(){});  
    return;
  }

  //var n=retREC_SELECTED(DB_USER,"cdx1_line");
  var user=document.getElementById("mngr_name"+vcode).innerHTML;
  var msg1 = "Are you sure to Delete this Record: "+user.trim()+"?";
  MSG_SHOW(vbOkAbort,"DELETE A RECORD",msg1,function(){ 
    axios.post('z_mngr.php', { request: 4,    
      mcode:vcode        
    },JBE_HEADER)
    .then(function (response) {    
      showProgress(false); 
      //alert(response.data); 
      console.log(response.data); 
      JBE_MNGR=response.data;    
      closeManager();
      dispManagers();
    })    
    .catch(function (error) { console.log(error); showProgress(false); });
  },function(){ return; });
}


function save_manager(){
  var data_mode=document.getElementById("manager").getAttribute('data-mode');
  if( document.getElementById('txMcode').value.trim().length==0 ||
      document.getElementById('txMname').value.trim().length==0) {
    MSG_SHOW(vbOk,"ALERT","Please fill all the data fields.",function(){return},function(){return;});            
    return;
  }  
  if(data_mode==1){
    if(managerFound(document.getElementById('txMcode').value)){      
      MSG_SHOW(vbOk,"DUPLICATION","Record Already Exist.",function(){ document.getElementById('txMname').focus(); },function(){});    
      return;    
    }
  }
  
  var req=2; //add  
  if(data_mode !=1){ req=3; }
  showProgress(true);   
  axios.post('z_mngr.php', { request: req,  
    mcode:document.getElementById('txMcode').value,
    mname:document.getElementById('txMname').value
  },JBE_HEADER)
  .then(function (response) {    
    showProgress(false); 
    console.log(response.data); 
    JBE_MNGR=response.data;    
    fillTheFilter(JBE_FNDR,JBE_MNGR);
    closeManager();
    dispManagers();
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}

function managerFound(user){
  var rval=false;
  var managers=JBE_MNGR;
  
  for(i=0;i<managers.length;i++) {
    if(user.toUpperCase()==managers[i]['MCODE'].toUpperCase()){
      rval=true;
      break;
    }
  }
  return rval;
}
function found_manager_in_project(v){
  var rval=null;
  var projects=JBE_PROJ;
  
  for(i=0;i<projects.length;i++) {
    if(v==projects[i]['MCODE']){
      rval=projects[i]['PROJCODE']+'<br>Association Name: '+projects[i]['community'];
      break;
    }
  }
  return rval;
}

function openManager(m) { 
  openDoor('div_manager',true);  
  document.getElementById("div_add_manager").style.border = "2px solid black";
  var h_div_add_manager=200;
  if(JBE_MOBILE){ h_div_add_manager=105; }  
  document.getElementById("div_add_manager").style.height = h_div_add_manager+"px";  
  
  document.getElementById("btn_cancel_manager").style.display="block";  
  document.getElementById("btn_save_manager").style.display="block";  
  document.getElementById("btn_add_manager").style.display="none"; 
}

function closeManager() {
  openDoor('div_manager',false);  
  document.getElementById("div_add_manager").style.height = "0px";
  document.getElementById("div_add_manager").style.border = "0px solid black";
  
  document.getElementById("btn_cancel_manager").style.display="none";
  document.getElementById("btn_save_manager").style.display="none";
  
  document.getElementById("btn_add_manager").style.display="block";
}

// ******** FILEMAINTENANCE FOR FUNDERS ********** 
function dispFunders(){  
  CURR_REC='';
  var funder = JBE_FNDR;
  var f_white=0;
  var bclor='white';
  
  var dtl_H='27px;';
  var details='';
    
  for(var i=0; i<funder.length; i++) {          
    var v_code=funder[i]['FCODE'];
    if(f_white==0) {				
      bclor="white";
      f_white=1;
    }	else {
      bclor="lightgray";
      f_white=0;
    }		
    
    //eppy
    details = details +    
      '<div id="funder_line'+v_code+'" class="funder_class" data="'+bclor+'" data-sel=0 data-row='+i+' onmouseover="subHover(this.id,1,&quot;'+i+'&quot;,&quot;red&quot;)" onmouseout="subHover(this.id,0,&quot;'+i+'&quot;,&quot;none&quot;)"'+ 
      '     onclick="HLrow(&quot;funder&quot;,&quot;'+v_code+'&quot;)" style="float:left;margin-bottom:0%;border:0px solid gray;width:100%;height:31px;padding:0%;background:'+bclor+';">'+          
      '  <div id="fndr_code'+v_code+'" class="centro funder_width_code">'+funder[i]['FCODE']+'</div>'+            
      '  <div id="fndr_name'+v_code+'" class="centro funder_width_name oberplo">'+funder[i]['FNAME']+'</div>'+				
      '  <div id="fndr_del'+v_code+'"  class="centro del_edit">'+
      '     <img src="gfx/jdele.png" onclick="del_funder(&quot;'+v_code+'&quot;)"/></div>'+
      '  <div id="fndr_edit'+v_code+'" class="centro del_edit">'+	            
      '     <img src="gfx/jedit.png" onclick="add_funder(false,&quot;'+v_code+'&quot;)"/></div>'+      
      '</div>';
    
  }
  document.getElementById("div_funder").innerHTML=details;
  highlightCurrRec('funder');
}

function init_funder(f_add,vcode){
  var aryDB=[];  
  if(!f_add){
    aryDB=JBE_GETARRY(JBE_FNDR,'FCODE',vcode);  
  }
  document.getElementById("txFcode").value = iif(f_add,'',aryDB['FCODE']);
  document.getElementById("txFname").value = iif(f_add,'',aryDB['FNAME']);     
 
  openFunder();
}

function add_funder(f_add,vcode){
  init_funder(f_add,vcode);

  if(f_add){
    document.getElementById("div_add_edit_manager").innerHTML='ADD ENTRY';    
    document.getElementById("txFcode").disabled=false;
    document.getElementById("funder").setAttribute('data-mode',1);
    document.getElementById("txFcode").focus();
  }else{
    document.getElementById("div_add_edit_manager").innerHTML='EDIT ENTRY';  
    document.getElementById("txFcode").disabled=true;  
    document.getElementById("funder").setAttribute('data-mode',0);
    document.getElementById("txFname").focus();
  }
}

function del_funder(vcode){      
  //var foundProj=found_manager_in_project(vcode);
  var foundProj=used_in_other_files(vcode,"FCODE",JBE_PROJ,"projcode");
  var foundCodex=used_in_other_files(vcode,"jprojid",DB_USER,"jname");
  
  var msg1a = "This project leader is used in Project page. <br><hr>Project-Code: "+vcode;
  var msg1b = "This project leader is used in Admin User Code page. <br><hr>User Code: "+vcode;
    
  if(foundProj !== null){
    MSG_SHOW(vbOk,"CAN'T DELETE THIS RECORD",msg1a,function(){},function(){});  
    return;
  }else if(foundCodex !== null){
    MSG_SHOW(vbOk,"CAN'T DELETE THIS RECORD",msg1b,function(){},function(){});  
    return;
  }

  var user=document.getElementById("fndr_name"+vcode).innerHTML;
  var msg1 = "Are you sure to Delete this Record: "+user.trim()+"?";
  MSG_SHOW(vbOkAbort,"DELETE A RECORD",msg1,function(){ 
    axios.post('z_fndr.php', { request: 4,    
      fcode:vcode        
    },JBE_HEADER)
    .then(function (response) {    
      showProgress(false); 
      //alert(response.data); 
      console.log(response.data); 
      JBE_FNDR=response.data;    
      closeFunder();
      dispFunders();
    })    
    .catch(function (error) { console.log(error); showProgress(false); });
  },function(){ return; });
}


function save_funder(){
  var data_mode=document.getElementById("funder").getAttribute('data-mode');
  if( document.getElementById('txFcode').value.trim().length==0 ||
      document.getElementById('txFname').value.trim().length==0) {
    MSG_SHOW(vbOk,"ALERT","Please fill all the data fields.",function(){return},function(){return;});            
    return;
  }  
  if(data_mode==1){
    if(managerFound(document.getElementById('txFcode').value)){      
      MSG_SHOW(vbOk,"DUPLICATION","Record Already Exist.",function(){ document.getElementById('txFname').focus(); },function(){});    
      return;    
    }
  }
  
  var req=2; //add  
  if(data_mode !=1){ req=3; }
  showProgress(true);   
  axios.post('z_fndr.php', { request: req,  
    fcode:document.getElementById('txFcode').value,
    fname:document.getElementById('txFname').value
  },JBE_HEADER)
  .then(function (response) {    
    showProgress(false); 
    //alert(response.data); 
    console.log(response.data); 
    JBE_FNDR=response.data;    
    fillTheFilter(JBE_FNDR,JBE_MNGR);
    closeFunder();
    dispFunders();
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}

function openFunder(m) { 
  openDoor('div_funder',true);  
  document.getElementById("div_add_funder").style.border = "2px solid black";
  var h_div_add_manager=200;
  if(JBE_MOBILE){ h_div_add_manager=105; }  
  document.getElementById("div_add_funder").style.height = h_div_add_manager+"px";  
  
  document.getElementById("btn_cancel_funder").style.display="block";  
  document.getElementById("btn_save_funder").style.display="block";  
  document.getElementById("btn_add_funder").style.display="none"; 
}

function closeFunder() {
  openDoor('div_funder',false);  
  document.getElementById("div_add_funder").style.height = "0px";
  document.getElementById("div_add_funder").style.border = "0px solid black";
  
  document.getElementById("btn_cancel_funder").style.display="none";
  document.getElementById("btn_save_funder").style.display="none";
  
  document.getElementById("btn_add_funder").style.display="block";
}

*/

/******** FILEMAINTENANCE FOR AXES/Codex ********** */
function dispAxes(){
  CURR_REC='';
  var codexs = DB_USER;
  var f_white=0;
  var bclor='white';
  
  var dtl_H='27px';
  var details='';
  
  for(var i=0; i<codexs.length; i++) {          
    var v_code=codexs[i]['juser'];
    var v_projid=codexs[i]['jprojid'];
    if(f_white==0) {				
      bclor="white";
      f_white=1;
    }	else {
      bclor="lightgray";
      f_white=0;
    }		
    var jtype=parseInt(codexs[i]['jtype']);
    
    if(jtype==0) {
      var v_man = JBE_DISPFLD("code",JBE_MNGR,codexs[i]['jprojid'],"name");
    }else if(jtype==1) {
      var v_man = JBE_DISPFLD("code",JBE_FNDR,codexs[i]['jprojid'],"name");
    }else if(jtype==2) {
      var v_man = "Administrator";
    }

    details = details +    
      '<div id="axes_line'+v_code+'" class="axes_class" data="'+bclor+'" data-sel=0 data-row='+i+' onmouseover="subHover(this.id,1,&quot;'+i+'&quot;,&quot;red&quot;)" onmouseout="subHover(this.id,0,&quot;'+i+'&quot;,&quot;none&quot;)"'+ 
      '     onclick="HLrow(&quot;axes&quot;,&quot;'+v_code+'&quot;)" style="float:left;font-size:12px;border:0px solid gray;width:100%;height:'+dtl_H+';padding:0%;background:'+bclor+';">'+          
      '  <div id="cdx1_user'+v_code+'" class="centro axes_width_uid oberplo">'+codexs[i]['juser']+'</div>'+
      '  <div id="cdx1_pass'+v_code+'" class="centro axes_width_upass oberplo">'+codexs[i]['jpass']+'</div>'+
      '  <div id="cdx1_name'+v_code+'" class="centro axes_width_uname oberplo">'+codexs[i]['jname']+'</div>'+      
      '  <div id="cdx1_type'+v_code+'" class="centro axes_width_utype oberplo">'+retJtype(codexs[i]['jtype'])+'</div>'+
      '  <div id="cdx1_projid'+v_code+'" class="centro axes_width_ucode oberplo">'+codexs[i]['jprojid']+'</div>'+      
      
      '  <div id="cdx1_otype'+v_code+'" class="centro oberplo" style="display:none;width:15%;height:100%;text-align:center;">'+codexs[i]['jtype']+'</div>'+      
      '  <div id="cdx1_man'+v_code+'" class="centro oberplo" style="display:none;width:15%;height:100%;text-align:center;">'+codexs[i]['jprojid']+'</div>'+      
      '  <div id="cdx1_axes'+v_code+'" class="centro oberplo" style="display:none;width:15%;height:100%;text-align:center;">'+codexs[i]['jaxes']+'</div>'+
    
      '  <div id="fndr_del'+v_code+'" class="centro del_edit nomobile">'+
      '     <img src="gfx/jdele.png" onclick="del_axes(&quot;'+v_code+'&quot;)" style="height:100%;padding:1px;"></div>'+
      '  <div id="fndr_edit'+v_code+'" class="centro del_edit nomobile">'+
      '     <img src="gfx/jedit.png" onclick="add_axes(false,&quot;'+v_code+'&quot;)" style="height:100%;padding:1px;"></div>'+
      '</div>';
  }
  document.getElementById("div_axes").innerHTML=details;  
  //getSELEROW(codexs,'cdx1_line',0);
  //setRecord('cdx1_line',first_rec);
  highlightCurrRec('axes');
  //alert('finished display');
}

function jret(){
  return "checked";
}

function init_axes(f_add,vcode){
  var aryDB=[];  
  if(!f_add){
    aryDB=JBE_GETARRY(DB_USER,'juser',vcode);  
  }
  document.getElementById("txAXuser").value = iif(f_add,'',aryDB['juser']);
  document.getElementById("txAXpass").value = iif(f_add,'',aryDB['jpass']);
  document.getElementById("txAXname").value = iif(f_add,'',aryDB['jname']);
  document.getElementById("txAXtype").value = iif(f_add,'',aryDB['jtype']);
  document.getElementById("txAXman").value = iif(f_add,'','');
  document.getElementById("txAXprojid").value = iif(f_add,'',aryDB['jprojid']);

  document.getElementById("txAXaxes").value = iif(f_add,'',aryDB['jaxes']);
  
  
  //checker
  var v_axes=iif(f_add,'',aryDB['jaxes']);
  for(i=0;i<v_axes.length;i++) {            
    if(v_axes.substr(i,1)=='1'){ 
      document.getElementById(aryAXES2[i]).checked = true;
    }else{
      document.getElementById(aryAXES2[i]).checked = false;
    }
  }
  
  inpClick('inp_admin',false);
  if(!f_add){   
    chgJtype(aryDB['jtype']);
    document.getElementById("txAXman").value = aryDB['jprojid'];
    document.getElementById("txAXprojid").value = aryDB['jprojid'];
  }
  openAxes();
}

function add_axes(f_add,vcode){
  if(JBE_MOBILE){
    vcode=document.getElementById('div_axes').getAttribute('data-rec');    
    if(!vcode && !f_add){ 
      MSG_SHOW(vbOk,"ERROR:",'Please Select a Record.',function(){},function(){});
      return;
    }
  }

  init_axes(f_add,vcode);
  if(f_add){
    document.getElementById("div_add_edit_axes").innerHTML='ADD ENTRY';    
    document.getElementById("txAXuser").disabled=false;
    document.getElementById("axes").setAttribute('data-mode',1);
  }else{
    document.getElementById("div_add_edit_axes").innerHTML='EDIT ENTRY';  
    document.getElementById("txAXuser").disabled=true;  
    document.getElementById("axes").setAttribute('data-mode',0);
  }

}

function del_axes(vcode){      //knowx    
  if(JBE_MOBILE){
    vcode=document.getElementById('div_axes').getAttribute('data-rec');    
    if(!vcode && !f_add){ 
      MSG_SHOW(vbOk,"ERROR:",'Please Select a Record.',function(){},function(){});
      return;
    }
  }
  //var n=retREC_SELECTED(DB_USER,"cdx1_line");
  var user=document.getElementById("cdx1_name"+vcode).innerHTML;
  var msg1 = "Are you sure to Delete this Record: "+user.trim()+"?";
  MSG_SHOW(vbOkAbort,"DELETE A RECORD",msg1,function(){ 
    axios.post('z_codex.php', { request: 4,    
      juser:vcode
    },JBE_HEADER)
    .then(function (response) {    
      showProgress(false); 
      //alert(response.data); 
      console.log(response.data); 
      DB_USER=response.data;    
      closeAxes();
      dispAxes();
    })    
    .catch(function (error) { console.log(error); showProgress(false); });
  },function(){ return; });
}


function save_axes(){
  var data_mode=document.getElementById("axes").getAttribute('data-mode');
  //alert('data_mode '+data_mode);
  //return; 
  if( document.getElementById('txAXpass').value.trim().length==0 ||
      document.getElementById('txAXtype').value.trim().length==0 ||
      document.getElementById('txAXname').value.trim().length==0 ||
      document.getElementById('txAXprojid').value.trim().length==0 ||
      document.getElementById('txAXman').value.trim().length==0) {
    MSG_SHOW(vbOk,"ALERT","Please fill all the data fields.",function(){return},function(){return;});            
    return;
  }  
  if(data_mode==1){
    if(AxesFound(document.getElementById('txAXuser').value)){      
      MSG_SHOW(vbOk,"DUPLICATION","Record Already Exist.",function(){$('#txAXname').focus();},function(){});    
      return;    
    }
  }
  
  var req=2; //add
  var jaxes='';
  if(data_mode !=1){ req=3; }
  
  var v_dtl;
  for(var i=0;i<aryAXES2.length;i++) {        
    if(document.getElementById(aryAXES2[i]).checked){
      v_dtl='1';
    }else{      
      v_dtl='0';
    }
    jaxes=jaxes+v_dtl;
  }

  var jaxlevel=5;
    
  showProgress(true); 
  
  axios.post('z_codex.php', { request: req,    
    juser:document.getElementById("txAXuser").value,
    jpass:document.getElementById("txAXpass").value,
    jname:document.getElementById("txAXname").value,
    jtype:document.getElementById("txAXtype").value,    
    jaxlevel:document.getElementById("txAXlevel").innerHTML,  
    jaxes:jaxes,
    jprojid:document.getElementById("txAXprojid").value
  },JBE_HEADER)
  .then(function (response) {    
    showProgress(false); 
    //alert(response.data); 
    console.log(response.data); 
    DB_USER=response.data;    
    closeAxes();
    dispAxes();
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}

function AxesFound(user){
  var rval=false;
  var axes=DB_USER;
  
  for(i=0;i<axes.length;i++) {
    if(user.toUpperCase()==axes[i]['juser'].toUpperCase()){
      rval=true;
      break;
    }
  }
  return rval;
}

function openAxes(m) {    
  openDoor('div_axes',true);
  document.getElementById('div_main_left').style.pointerEvents='none';
  document.getElementById('admin2').style.pointerEvents='none';
  document.getElementById('div_axes').style.pointerEvents='none';
  
  document.getElementById("div_add_axes").style.border = "2px solid black";
  var h_div_add_axes=290;
  if(JBE_MOBILE){ h_div_add_axes=250; }
  
  document.getElementById("div_add_axes").style.height = h_div_add_axes+"px";  
  
  document.getElementById("btn_cancel_axes").style.display="block";  
  document.getElementById("btn_save_axes").style.display="block";  
  document.getElementById("btn_add_axes").style.display="none";  
  document.getElementById("btn_edit_axes").style.display="none";  
  document.getElementById("btn_del_axes").style.display="none";  
  
  document.getElementById("btn_add_axes").disabled=true;  
  document.getElementById("btn_edit_axes").disabled=true;  
  document.getElementById("btn_del_axes").disabled=true;  
  //alert('ok doki open axes');
}

function closeAxes() {  
  openDoor('div_axes',false);
  document.getElementById("div_add_axes").style.height = "0px";
  document.getElementById("div_add_axes").style.border = "0px solid black";
  document.getElementById("btn_cancel_axes").style.display="none";
  document.getElementById("btn_save_axes").style.display="none";
  if(JBE_MOBILE){
    document.getElementById("btn_edit_axes").style.display="block";  
    document.getElementById("btn_del_axes").style.display="block";  
  } 
  document.getElementById("btn_add_axes").style.display="block";   
  
  document.getElementById("btn_add_axes").disabled=false;  
  document.getElementById("btn_edit_axes").disabled=false;  
  document.getElementById("btn_del_axes").disabled=false;  
}

function inpClick(div,v){  
  //alert(div);  
  if(div=='inp_admin'){
    document.getElementById("inp_admin").checked=v;
    /*
    document.getElementById("inp_board").checked=v;
    document.getElementById("inp_msg").checked=v;
    document.getElementById("inp_proj").checked=v;
    document.getElementById("inp_projFM").checked=v;
    document.getElementById("inp_hist").checked=v;
    document.getElementById("inp_rep").checked=v;    
    */
  }else if(div=='inp_proj'){
    document.getElementById("inp_projFM").disabled = false;
    if(!v){
      document.getElementById("inp_projFM").checked=v;    
      document.getElementById("inp_projFM").disabled = true;
    }
  }
}
function retJtype(v){  
  let rval="Aidfi";
  if(v==1) {
    rval="Funder";
  }else if(v==2) {
    rval="Admin";
  }
  return rval;
}

function chgJtype(v){
  var newOptionsHtml = '<option style="color:red;" value=null disabled selected>Select your option...</option>';
  document.getElementById("txAXprojid").value='';
  if(v==0) {  
    var ary_jtype = JBE_MNGR;        
    //$("#txAXprojid").val(''); 
    var sel_code='MCODE';
    var sel_name='MNAME';       
    document.getElementById("txAXlevel").innerHTML='0';
  }else if(v==1) {  
    var ary_jtype = JBE_FNDR;   
    var sel_code='FCODE';
    var sel_name='FNAME';     
    //$("#txAXprojid").val('');  
    document.getElementById("txAXlevel").innerHTML='0';
  }else if(v==2) {  //admin  
    var ccc='<option value="ADMIN">Administrator</option>';    
    document.getElementById("txAXman").innerHTML=ccc;
    document.getElementById("txAXprojid").value='ADMIN';
    inpClick('inp_admin',true);  
    document.getElementById("txAXlevel").innerHTML='5';
    return;  
  }
  
  //<option selected> 3 </option>  
  for(i=0;i<ary_jtype.length;i++){    
    var r_mcode=ary_jtype[i][sel_code];
    var r_mname=ary_jtype[i][sel_name];
    
    newOptionsHtml=newOptionsHtml+"<option id="+r_mcode+" value="+r_mcode+">"+r_mname+"</option>";    
    //newOptionsHtml=newOptionsHtml+"<option value='"+r_mcode+"'>"+r_mcode+" - "+r_mname+"</option>";   
  }      

  $("#txAXman").html(newOptionsHtml); 
  
}

function chgJprojid(v){  
  document.getElementById("txAXprojid").value=v;
}

function getSELEROW(rowcntr,div,sel){   
  var bg='<?php echo $clor_head;?>';  
  bg='#8b9dc3';
  
  for(i=0;i<rowcntr;i++) {    
    if($('#'+div+i).attr('data-sel')==1) {
      var obg=$('#'+div+i).attr('data');
      $('#'+div+i).css('background-color',obg);    
      $('#'+div+i).attr('data-sel',0);
    }
  }
  $('#'+div+sel).css('background-color',bg);
  $('#'+div+sel).attr('data-sel',1);    
  
  //showAxes(sel);
}

function back_up_first(pmode){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {						
        var arr = this.responseText;        
        //alert("received: "+arr);
        //redisplay(CURR_PROJID);toggle_close(0);
        /*
        if(pmode==2){
          MSG_SHOW(vbOk,tilt,msg,
            function(){ window.location.href = "index.php"; },
            function(){});
        }else{
          MSG_SHOW(vbOk,tilt,msg,
            function(){ showPage(2); },
            function(){});          
        }
        */
      }
  };
  xmlhttp.open("GET", "bakres.php?pmode="+pmode, true);
  xmlhttp.send(); 
}


function dispRestoreFiles(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {						
        var arr = this.responseText;                
        alert(arr);
      }
  };
  xmlhttp.open("GET", "ret_res_files.php", true);
  xmlhttp.send(); 
}

