function dispSetting(){
  if(CURR_AXTYPE <4){
    snackBar('ACCESS DENIED...');
    return;
  }

  var dtl=
  '<div style="width:100%;height:100%;padding:0px;color:white;overflow:auto;background:none;">'+

      '<div id="sys_menu1" class="cls_ds_main" style="height:390px;">'+ 
        '<p>System Facility</p>'+   
        '<button onclick="reset_votes()">Clear Votes</button>'+   
        '<button onclick="sys_scope()">System Scope</button>'+           
        '<button onclick="do_fm_district()">District File</button>'+           
        '<button onclick="close_setting()" style="margin-top:50px;color:white;background:'+JBE_CLOR+';">Exit</button>'+   
      '</div>'+

      '<div id="sys_menu2" style="display:none;"></div>'+
    
  '</div>';

  modal_ON(true);
  JBE_OPEN_VIEW(dtl,'Settings','close_setting');  
}
function close_setting(){  
  modal_ON(false);
  showMainPage(); 
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
  '<div class="cls_ds_main" style="width:600px;height:auto;margin-top:100px;">'+      
    '<p>Facility</p>'+
    '<div style="width:96%;height:auto;padding:10px;border:1px solid lightgray;margin:0 2% 0 2%;background:none;">'+

      '<div style="width:100%;height:30px;text-align:left;background:none;">'+
        '<div style="float:left;width:30%;height:100%;padding:5px;">Scope Type: </div>'+
        '<select id="sel_scope" data-type=0 name="sel_scope" value="" onchange="chg_scope(this.value)" style="float:left;width:70%;height:100%;font-size:14px;padding:0px;">'+
          '<option value=0>National</option>'+
          '<option value=1>Provincial</option>'+
          '<option value=2>District</option>'+
          '<option value=3>City / Municipal</option>'+
        '</select>'+  
      '</div>'+

      '<div id="dv_scope" style="display:none;width:100%;height:auto;max-height:400px;text-align:left;overflow:auto;background:none;">'+
        '<div style="width:100%;height:30px;padding:0px;margin-top:10px;border:0px solid white;">'+        
          '<div id="cap_scope" style="float:left;width:30%;height:100%;padding:5px;">Scope Area:</div>'+
          '<select id="sel_scope2" data-code="" name="sel_scope2" onchange="chg_scope2(this.value)" style="float:left;width:70%;height:100%;font-size:14px;padding:0px;">'+
          '</select>'+  
        '</div>'+ 
      '</div>'+

    '</div>'+
    '<div id="dv_layas1" style="height:40px;margin-bottom:20px;">'+        
      '<button onclick="close_sys_scope()" style="height:100%;color:white;background:'+JBE_CLOR+';">Exit</button>'+        
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
function chg_scope(v){
  var aryScope=["Scope of Area","Province:","District:","City/Municipality:"]; 
  var aryDb=[];
  var voption='<option value=""> - none - </option>';
  var fld='',fld2='';

  //if(v==0){
  //  document.getElementById('dv_scope').style.display='none';
  //  return;
  //}  
  
  document.getElementById('dv_scope').style.display='block';
  document.getElementById('cap_scope').innerHTML=aryScope[v];
  if(v==1){ aryDb=ref_prov; fld='provCode'; fld2='provDesc'; }
  else if(v==2){ aryDb=DB_DISTRICT; fld='disCode'; fld2='disDesc'; }
  else if(v==3){ aryDb=ref_city; fld='citymunCode'; fld2='citymunDesc'; }
  
  aryDb.sort(sortByMultipleKey([fld2]));  
  //alert(v+' aryDb= '+aryDb.length);
  for(var i=0;i<aryDb.length;i++){
    voption+='<option value='+aryDb[i][fld]+'>'+aryDb[i][fld2]+'</option>';
  }
  document.getElementById('sel_scope2').innerHTML=voption;

  var otype=document.getElementById('sel_scope').getAttribute('data-type');
  //alert(v+' vs '+ocode);
  if(v != otype){
    document.getElementById('dv_layas1').style.display='none';
    document.getElementById('dv_layas2').style.display='block';
  }
  //document.getElementById('sel_scope').setAttribute('data-code',v);
}

function chg_scope2(v){  
  var ocode=document.getElementById('sel_scope2').getAttribute('data-code');
  //alert(v+' vs '+ocode);
  if(v != ocode){
    document.getElementById('dv_layas1').style.display='none';
    document.getElementById('dv_layas2').style.display='block';
  }
  document.getElementById('sel_scope2').setAttribute('data-code',v);
}

function close_sys_scope(){
  document.getElementById('sys_menu1').style.display='block';
  document.getElementById('sys_menu2').style.display='none';
}

function init_sys_scope(){
  document.getElementById('sel_scope').value=CURR_SCOPE_TYPE;
  document.getElementById('sel_scope').setAttribute('data-type',CURR_SCOPE_TYPE);
  chg_scope(CURR_SCOPE_TYPE);
  document.getElementById('sel_scope2').value=CURR_SCOPE_NO;
  document.getElementById('sel_scope2').setAttribute('data-code',CURR_SCOPE_NO);

  document.getElementById('dv_layas1').style.display='block';
  document.getElementById('dv_layas2').style.display='none';
}

function save_sys_scope(){
  var vtype=document.getElementById('sel_scope').value;
  var vcode=document.getElementById('sel_scope2').value;
  /*
  if(vtype==0){ 
    do_save_scope();
    CURR_SCOPE_TYPE=vtype;
    CURR_SCOPE_NO='';
    init_sys_scope();
    return;
  }
  */
  if(!vcode){
    if(vtype!=0){
      snackBar('ERROR: Code is Empty...');
      return;
    }
  }

  axios.post(JBE_API+'z_sysfile.php', { clientno:CURR_CLIENT, request: 301,    
    vtype:vtype,
    vcode:vcode
  },JBE_HEADER)
  .then(function (response) {    
    showProgress(false); 
    console.log(response.data); 
    DB_SYS=response.data;    
    CURR_SCOPE_TYPE=vtype;
    CURR_SCOPE_NO=vcode;
    show_scope();
    init_sys_scope();
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}
