function dispSetting(){
  if(CURR_AXTYPE <4){
    snackBar('ACCESS DENIED...');
    return;
  }

  var dtl=
  '<div style="width:100%;height:100%;padding:0px;color:white;overflow:auto;background:lightgray;">'+

      '<div id="sys_menu1" class="cls_ds_main">'+ 
        '<p style="background:'+JBE_CLOR+';">System Facility</p>'+   
        '<button onclick="reset_votes()">Clear Votes</button>'+   
        //'<button onclick="sys_scope()">Election Scope</button>'+           
        '<button onclick="do_fm_district()">District File</button>'+           
        '<button onclick="do_setup()">Setting</button>'+           
        '<input type="button" onclick="close_setting()" style="background:'+JBE_CLOR+';" value="Exit" />'+   
      '</div>'+

      '<div id="sys_menu2" style="display:none;"></div>'+      
    
  '</div>';
  
  JBE_OPEN_VIEW(dtl,'Settings','close_setting');  
  modal_ON(true);
}
function close_setting(){  
  //modal_ON(false);
  showMainPage(); 
}

function do_setup(){    
  document.getElementById('sys_menu1').style.display='none';
  document.getElementById('sys_menu2').style.display='block';

  var citymunCode=DB_SYS[0]['citymunCode'];
  var aryDB=JBE_GETARRY(ref_city,'citymunCode',citymunCode);
  
  var citymunDesc=aryDB['citymunDesc'];
  var provDesc=JBE_GETFLD('provDesc',ref_prov,'provCode',aryDB['provCode']);
  var regDesc=JBE_GETFLD('regDesc',ref_reg,'regCode',aryDB['regCode']);
  
  var dtl=
  '<div class="cls_ds_main">'+      
    '<p>Setting</p>'+
    '<div style="width:96%;height:auto;padding:10px;border:1px solid lightgray;margin:0 2% 0 2%;background:none;">'+

      '<div class="cls_fm_dtl">'+        
        '<div>Municipal/City:'+          
          '<input id="lu_set_citymunCode" type="image" src="gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;do_lu_city&quot;,&quot;LOOKUP&quot;,ref_city,&quot;citymunCode&quot;,&quot;citymunDesc&quot;)" />'+          
          '<input id="tx_set_citymunCode" type="text" data-caption="Barangay Code" style="display:none;" value="'+citymunCode+'" />'+
        '</div>'+
        '<input id="tx_set_cityName" style="pointer-events:none;" value="'+citymunDesc+'" type="text" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div>Province:</div>'+
        '<input id="tx_set_provCode" type="text" style="display:none;" value="" />'+
        '<input id="tx_set_provName" style="pointer-events:none;" type="text" value="'+provDesc+'" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div>Region:</div>'+
        '<input id="tx_set_regCode" type="text" style="display:none;" value="" />'+
        '<input id="tx_set_regName" style="pointer-events:none;" type="text" value="'+regDesc+'" />'+
      '</div>'+

    '</div>'+

    '<div id="chkbox"style="width:96%;padding:5px 10px 0px 10px;border:1px solid lightgray;color:black;overflow:auto;text-align:left;margin:0 2% 0 2%;background:none;">'+
      
    '</div>'+

    '<div id="dv_layas1" style="height:40px;margin-bottom:20px;padding:0 10px 0 10px">'+        
      '<button onclick="edit_setup()" style="float:left;width:100px;height:100%;color:white;background:'+JBE_CLOR+';">Edit</button>'+        
      '<button onclick="close_setup()" style="float:right;width:100px;height:100%;color:white;background:'+JBE_CLOR+';">Exit</button>'+        
    '</div>'+
    '<div id="dv_layas2" style="display:none;height:40px;margin-bottom:20px;padding:0 10px 0 10px;">'+        
      '<button onclick="save_setup()" style="float:left;width:40%;height:100%;color:white;background:'+JBE_CLOR+';">Save</button>'+        
      '<button onclick="init_setup()" style="float:right;width:40%;height:100%;color:white;background:'+JBE_CLOR+';">Cancel</button>'+        
    '</div>'+

  '</div>';
  document.getElementById('sys_menu2').innerHTML=dtl;  
  init_setup();
}
function close_setup(){
  document.getElementById('sys_menu1').style.display='block';
  document.getElementById('sys_menu2').style.display='none';
}

function init_setup(){
  var dtl='';
  var vdisp;
  for(var i=0;i<DB_POSITION.length;i++){
    vdisp='';
    if(DB_POSITION[i]['hide']==0){ vdisp='checked'; }
    dtl+=
    '<div style="width:100%;height:20px;margin-top:5px;padding:2px;background:none;">'+
      '<div style="float:left;width:10%;height:100%;background:none;">'+
        '<input disabled id="can_pos'+i+'" class="can_pos"  type="checkbox" '+vdisp+' style="float:right;margin:0px;margin-right:5px;width:20px;height:100%;background:none;" />'+
      '</div>'+
      '<div stlyle="float:left;width:90%;height:100%;padding:2px 0 0 0;">'+DB_POSITION[i]['descrp']+'</div>'+
    '</div>';
  }
  document.getElementById('lu_set_citymunCode').disabled=true;  
  document.getElementById('lu_set_citymunCode').style.opacity='0.5';

  document.getElementById('chkbox').innerHTML=dtl;
  
  document.getElementById('dv_layas1').style.display='block';
  document.getElementById('dv_layas2').style.display='none';  
}
//
function edit_setup(){
  document.getElementById('dv_layas1').style.display='none';
  document.getElementById('dv_layas2').style.display='block';

  document.getElementById('lu_set_citymunCode').disabled=false;  
  document.getElementById('lu_set_citymunCode').style.opacity='1';
  con_pos(0);
}

function do_lu_city(fld,val){  
  //alert(fld+' x '+val);
  var aryDB=JBE_GETARRY(ref_city,fld,val);
  var citymunCode=aryDB['citymunCode'];
  var provCode=aryDB['provCode'];
  var regCode=aryDB['regCode'];
  //document.getElementById('btn_set_save').disabled=false;

  document.getElementById('tx_set_citymunCode').value = citymunCode;
  document.getElementById('tx_set_provCode').value = provCode;
  document.getElementById('tx_set_regCode').value = regCode;
  document.getElementById('tx_set_cityName').value = JBE_GETFLD('citymunDesc',ref_city,'citymunCode',citymunCode);
  document.getElementById('tx_set_provName').value = JBE_GETFLD('provDesc',ref_prov,'provCode',provCode);
  document.getElementById('tx_set_regName').value = JBE_GETFLD('regDesc',ref_reg,'regCode',regCode);
  if(val != CURR_CITYMUNCODE){
    //init_set(1);
  }
}
function init_set(v){
  

  var vdisp1='block';
  var vdisp2='none';
  if(v==0){
    do_lu_city('citymunCode',CURR_CITYMUNCODE);
  }else{
    vdisp1='none'; vdisp2='block'; 
  }  

  document.getElementById('dv_setlayas1').style.display=vdisp1;
  document.getElementById('dv_setlayas2').style.display=vdisp2;
}
function save_setup(){
  var citymunCode = document.getElementById('tx_set_citymunCode').value;
  var provCode = document.getElementById('tx_set_provCode').value;
  var regCode = document.getElementById('tx_set_regCode').value;
    
  if(!citymunCode){    
    snackBar('ERROR: Code is Empty...');
    return;    
  }
  JBE_STORE_CANDIDATE=[];
  for(var i=0;i<DB_POSITION.length;i++){
    var vdisp='none';
    if(document.getElementById('can_pos'+i).checked){ vdisp='block'; }    
    let ob={
      "pos":DB_POSITION[i]['pos'],
      "posname":DB_POSITION[i]['descrp'],
      "display":vdisp
    }
    JBE_STORE_CANDIDATE[i]=ob;    
  }

  showProgress(true); 
  axios.post(JBE_API+'z_sysfile.php', { clientno:CURR_CLIENT, request: 302,    
    citymunCode:citymunCode,
    provCode:provCode,
    regCode:regCode,
    aryItems:JSON.stringify(JBE_STORE_CANDIDATE)
  },JBE_HEADER)
  .then(function (response) {    
    showProgress(false); 
    console.log(response.data);    
    DB_SYS=response.data[0];    
    DB_POSITION=response.data[1];    
    update_positions();
    CURR_SCOPE_TYPE=3;
    CURR_SCOPE_NO=citymunCode;
    CURR_CITYMUNCODE=citymunCode;  
    //dispBoard();
    show_scope();
    init_setup();
  })      
  .catch(function (error) { console.log(error); showProgress(false); });
}


function do_print_x(){  
  var originalContents = document.body.innerHTML;    
  var printContents = document.getElementById('sys_menu1').innerHTML;//.cloneNode(true);
    
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  
  /*
  f_RESIZE=false;
  
  var xx=window.innerWidth - parseInt(document.getElementById('div_main_left').style.width)-10;
  alert(parseInt(window.innerWidth));
  alert(parseInt(document.getElementById('div_main_left').style.width));
  alert('xx '+xx);
  xx=xx-5;
  document.getElementById('div_main_right').style.width=xx + 'px';
  */
}

function reset_votes(){
  MSG_SHOW(vbYesNo,"CONFIRM:","Are you sure to RESET VOTES now?",
    function(){

      axios.post(JBE_API+'z_reset.php', { clientno:CURR_CLIENT, request:3 },JBE_HEADER)
      .then(function (response) {    
        DB_CANDIDATE = response.data[0];    
        DB_TRAN_VOTES = response.data[1];    
        //alert('get_db_candidate '+DB_CANDIDATE.length+' vs '+DB_TRAN_VOTES.length);
        snackBar('Votes Resetted Successfully');
        get_db_all();
        showMainPage();
      })    
      .catch(function (error) { console.log(error); allow_start(true); });

    },function(){}
  );
}

function sys_scope(){

  document.getElementById('sys_menu1').style.display='none';
  document.getElementById('sys_menu2').style.display='block';
  var dtl=
  '<div class="cls_ds_main">'+      
    '<p>Election Scope</p>'+
    '<div style="width:96%;height:auto;padding:10px;border:1px solid lightgray;margin:0 2% 0 2%;background:none;">'+

      '<div style="width:100%;height:25px;text-align:left;background:none;">'+
        '<div style="float:left;width:40%;height:100%;padding:5px;">Scope Type: </div>'+
        '<select id="sel_scope" disabled data-type=0 name="sel_scope" value="" onchange="chg_scope(this.value)" style="float:left;width:60%;height:100%;font-size:12px;padding:0px;">'+
          '<option value=0>National</option>'+
          '<option value=1>Provincial</option>'+
          '<option value=2>District</option>'+
          '<option value=3>City / Municipal</option>'+
          '<option value=4>Barangay</option>'+
        '</select>'+  
      '</div>'+

      '<div id="dv_scope" style="display:none;width:100%;height:auto;max-height:400px;text-align:left;overflow:auto;background:none;">'+
        '<div style="width:100%;height:25px;padding:0px;margin-top:10px;border:0px solid white;">'+        
          '<div id="cap_scope" style="float:left;width:40%;height:100%;padding:5px;">Scope Area:</div>'+
          '<select id="sel_scope2" disabled data-code="" name="sel_scope2" value="" onchange="chg_scope2(this.value)" style="float:left;width:60%;height:100%;font-size:12px;padding:0px;">'+
          '</select>'+  
        '</div>'+ 
      '</div>'+

    '</div>'+

    '<div id="chkbox"style="width:96%;padding:5px 10px 0px 10px;border:1px solid lightgray;color:black;overflow:auto;text-align:left;margin:0 2% 0 2%;background:none;">'+
      
    '</div>'+

    '<div id="dv_layas1" style="height:40px;margin-bottom:20px;padding:0 10px 0 10px">'+        
      '<button onclick="edit_sys_scope()" style="float:left;width:100px;height:100%;color:white;background:'+JBE_CLOR+';">Edit</button>'+        
      '<button onclick="close_sys_scope()" style="float:right;width:100px;height:100%;color:white;background:'+JBE_CLOR+';">Exit</button>'+        
    '</div>'+
    '<div id="dv_layas2" style="display:none;height:40px;margin-bottom:20px;padding:0 10px 0 10px;">'+        
      '<button onclick="save_sys_scope()" style="float:left;width:40%;height:100%;color:white;background:'+JBE_CLOR+';">Save</button>'+        
      '<button onclick="init_sys_scope()" style="float:right;width:40%;height:100%;color:white;background:'+JBE_CLOR+';">Cancel</button>'+        
    '</div>'+

  '</div>';
  document.getElementById('sys_menu2').innerHTML=dtl; 
  init_sys_scope();
}

//
function init_sys_scope(){
  var aryDb=[];
  var fld2='';
  if(CURR_SCOPE_TYPE==1){ aryDb=ref_prov; fld='provCode'; fld2='provDesc'; fld3='regCode'; db2=ref_reg; skey='regCode'; }
  else if(CURR_SCOPE_TYPE==2){ aryDb=DB_DISTRICT; fld='disCode'; fld2='disDesc'; fld3='provDesc'; db2=ref_prov; skey='provCode'; }
  else if(CURR_SCOPE_TYPE==3){ aryDb=ref_city; fld='citymunCode'; fld2='citymunDesc'; fld3='provDesc'; db2=ref_prov; skey='provCode'; }
  else if(CURR_SCOPE_TYPE==4){ aryDb=ref_brgy; fld='brgyCode'; fld2='brgyDesc'; fld3='citymunDesc'; db2=ref_city; skey='citymunCode'; }
  aryDb.sort(sortByMultipleKey([fld2]));  
  var voption='';
  for(var i=0;i<aryDb.length;i++){
    var vdesc='';
    if(CURR_SCOPE_TYPE > 0){ vdesc=JBE_GETFLD(fld3,db2,skey,aryDb[i][skey]); }
    voption+='<option value='+aryDb[i][fld]+'>'+aryDb[i][fld2]+', '+vdesc+'</option>';
  }
  document.getElementById('sel_scope2').innerHTML=voption; 
  
  var dtl='';
  var vdisp;
  for(var i=0;i<DB_POSITION.length;i++){
    vdisp='';
    if(DB_POSITION[i]['hide']==0){ vdisp='checked'; }
    dtl+=
    '<div style="width:100%;height:20px;margin-top:5px;padding:2px;background:none;">'+
      '<div style="float:left;width:10%;height:100%;background:none;">'+
        '<input disabled id="can_pos'+i+'" class="can_pos"  type="checkbox" '+vdisp+' style="float:right;margin:0px;margin-right:5px;width:20px;height:100%;background:none;" />'+
      '</div>'+
      '<div stlyle="float:left;width:90%;height:100%;padding:2px 0 0 0;">'+DB_POSITION[i]['descrp']+'</div>'+
    '</div>';
  }
  document.getElementById('chkbox').innerHTML=dtl;

  document.getElementById('sel_scope').value=CURR_SCOPE_TYPE;
  document.getElementById('sel_scope').setAttribute('data-type',CURR_SCOPE_TYPE);
  //chg_scope(CURR_SCOPE_TYPE);
  //alert('init_sys_scope '+CURR_SCOPE_NO);
  document.getElementById('sel_scope2').value=CURR_SCOPE_NO;
  document.getElementById('sel_scope2').setAttribute('data-code',CURR_SCOPE_NO);

  document.getElementById('sel_scope').disabled=true;
  document.getElementById('sel_scope2').disabled=true;
  con_pos(true);
  
  if(CURR_SCOPE_TYPE==0){
    document.getElementById('dv_scope').style.display='none';
  }else{
    document.getElementById('dv_scope').style.display='block';
  }
  
  document.getElementById('dv_layas1').style.display='block';
  document.getElementById('dv_layas2').style.display='none';  
}
//
function edit_sys_scope(){
  document.getElementById('dv_layas1').style.display='none';
  document.getElementById('dv_layas2').style.display='block';

  document.getElementById('sel_scope').disabled=false;
  document.getElementById('sel_scope2').disabled=false;
  con_pos(false);
}
//
function chg_scope(v){ 
  var aryScope=["Scope of Area","Province:","District:","City/Municipality:","Barangay:"]; 
  var aryDb=[];

  var voption='<option value=""> - none - </option>';
  var fld='',fld2='';

  document.getElementById('dv_scope').style.display='block';
  if(v==0){
    document.getElementById('dv_scope').style.display='none';
  }
  disp_sel_positions(v);
  
  document.getElementById('cap_scope').innerHTML=aryScope[v];
  
  if(v==1){ aryDb=ref_prov; fld='provCode'; fld2='provDesc'; fld3='regDesc'; db2=ref_reg; skey='regCode'; }
  else if(v==2){ aryDb=DB_DISTRICT; fld='disCode'; fld2='disDesc'; fld3='regDesc'; db2=ref_city; skey='provCode'; }
  else if(v==3){ aryDb=ref_city; fld='citymunCode'; fld2='citymunDesc'; fld3='provDesc'; db2=ref_prov; skey='provCode'; }
  else if(v==4){ aryDb=ref_brgy; fld='brgyCode'; fld2='brgyDesc'; fld3='citymunDesc'; db2=ref_city; skey='citymunCode'; }
  
  aryDb.sort(sortByMultipleKey([fld2]));  
  for(var i=0;i<aryDb.length;i++){
    var vdesc='';
    if(v > 0){ vdesc=JBE_GETFLD(fld3,db2,skey,aryDb[i][skey]); }
    voption+='<option value='+aryDb[i][fld]+'>'+aryDb[i][fld2]+', '+vdesc+'</option>';
  }
  document.getElementById('sel_scope2').innerHTML=voption; 
}

function disp_sel_positions(v){    
  var aary=[
    { "pattern":[1,1,1,1,1,1,1,1,1,1,1,1] },
    { "pattern":[0,0,0,1,1,1,1,1,1,1,1,1] },
    { "pattern":[0,0,0,0,0,0,1,1,1,1,1,1] },
    { "pattern":[0,0,0,0,0,0,0,1,1,1,1,1] },
    { "pattern":[0,0,0,0,0,0,0,0,0,0,1,1] }
  ];

  var xxx=aary[v]["pattern"];
  
  for(var i=0;i<xxx.length;i++){    
    var chk=false;
    if(xxx[i]==1){ chk=true; }
    document.getElementById('can_pos'+i).checked=chk;
  }
}
//
function chg_scope2(v){  
  var ocode=document.getElementById('sel_scope2').getAttribute('data-code');
  //alert(v+' vs '+ocode);
  if(v != ocode){
    document.getElementById('dv_layas1').style.display='none';
    document.getElementById('dv_layas2').style.display='block';
  }
  document.getElementById('sel_scope2').setAttribute('data-code',v);
  con_pos(false);
}
//
function con_pos(m){
  document.querySelectorAll('.can_pos').forEach(function(el) {
    //alert(el.id);
    el.disabled = m;
  }); 
}

function close_sys_scope(){
  document.getElementById('sys_menu1').style.display='block';
  document.getElementById('sys_menu2').style.display='none';
}



function save_sys_scope(){
  var vtype=document.getElementById('sel_scope').value;
  var vcode=document.getElementById('sel_scope2').value;
  
  if(!vcode){
    if(vtype!=0){
      snackBar('ERROR: Code is Empty...');
      return;
    }
  }

  JBE_STORE_CANDIDATE=[];
  for(var i=0;i<DB_POSITION.length;i++){
    var vdisp='none';
    if(document.getElementById('can_pos'+i).checked){ vdisp='block'; }    
    let ob={
      "pos":DB_POSITION[i]['pos'],
      "posname":DB_POSITION[i]['descrp'],
      "display":vdisp
    }
    JBE_STORE_CANDIDATE[i]=ob;    
  }
  showProgress(true); 
  axios.post(JBE_API+'z_sysfile.php', { clientno:CURR_CLIENT, request: 301,    
    vtype:vtype,
    vcode:vcode,
    aryItems:JSON.stringify(JBE_STORE_CANDIDATE)
  },JBE_HEADER)
  .then(function (response) {    
    showProgress(false); 
    console.log(response.data); 
    DB_SYS=response.data[0];    
    DB_POSITION=response.data[1];    
    update_positions();
    CURR_SCOPE_TYPE=vtype;
    CURR_SCOPE_NO=vcode;
    dispBoard();
    show_scope();
    init_sys_scope();    
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}
