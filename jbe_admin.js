//var uxxlu_ob = ['dv_brgy','dv_city','dv_province','dv_region']; 
function dispAdmin(){    
  if(CURR_AXTYPE <4){
    snackBar('ACCESS DENIED...');
    return;
  }
    
  var dtl=
  '<div style="width:100%;height:100%;padding:0px;color:white;overflow:auto;background:darkgray;">'+

      '<div id="sys_menu1" class="cls_ds_main">'+ 
        '<p>Admin File Facility</p>'+   
        '<button onclick="do_fm_candidate()">Candidate File Maintenance</button>'+
        '<button onclick="do_fm_position()">Elective Position File Maintenance</button>'+
        '<button onclick="do_fm_party()">Political Party File Maintenance</button>'+        
        '<button onclick="do_fm_cluster()">Cluster File Maintenance</button>'+
        '<button onclick="do_fm_watcher()">Watchers File Maintenance</button>'+
        //'<button onclick="do_fm_cluster2()">xxx</button>'+
        //'<button onclick="do_fm_coor()">Add Coordinates</button>'+   
        '<input type="button" onclick="close_setting()" style="background:'+JBE_CLOR+';" value="Exit" />'+   
      '</div>'+
    
  '</div>';          

  JBE_OPEN_VIEW(dtl,'ADMIN','close_admin');    
  modal_ON(true);
}

function close_admin(){
  showMainPage();
}

function toggle_admin(f_true){    
  var vdisp='none';
  if(f_true){ vdisp='block'; }  
  document.getElementById("popadmin").style.display=vdisp;
}

function proc_admin(){
  //logout();
  //return;
  toggle_admin(false);
  //document.getElementById("div_mapbox").style.display='none';
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

