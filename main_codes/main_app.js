var JBE_EMPTY_IMG='../../../main_gfx/jimg_error.png';

function start_app(){  
  JBE_MOBILE=true;  
  if(window.outerWidth > 500){
    JBE_MOBILE=false;    
    document.getElementById('div_header').style.display='none';
    document.getElementById('div_footer').style.display='none';    
    document.getElementById('bar_avatar').src='./gfx/icon-192x192.png';    
    document.getElementById('page_main').innerHTML='This App runs in mobile platform only.';    
    return;    
  }

  allow_start(false);
  JBE_ONLINE_NAVI=navigator.onLine;    
  JBE_ONLINE=false;   
  //****************
  //JBE_ONLINE_NAVI=true;
  //****************   
  axios.post(JBE_API+'app/zz_online.php',JBE_HEADER)  
  .then(function (response) {
    var res=parseInt(response.data);
    //alert('zz_online:  '+res);    
    //alert('CURR_USER '+CURR_USER);
    
    if(res > 0 && JBE_ONLINE_NAVI){      
      showOnline();
    }else{      
      showOffline();
    }     
        
    //setSysColors();          
  })
  .catch(function (error) { 
    //alert('naunsa na! '+error);
    snackBar('ERROR: '+error);
    if (!error.response) {
      // network error (server is down or no internet)
      console.log('JBE Found: network error (server is down or no internet)');
    } else {
      // http status code
      const code = error.response.status;
      // data from server while error
      const response = error.response.data;
      //console.log(code+' vs '+response);
      MSG_SHOW(vbOk,"INTERNAL ERROR:","CODE:"+code+". Server Response: "+response+". <br>Please Refresh.",function(){},function(){}); 
    }
    showOffline();          
  });
  
}

function showOnline(){
  //alert('show online');
  JBE_ONLINE=true;    
  
  document.getElementById('div_bar').style.display='block';
  get_app_default();

  document.getElementById('jtime').innerHTML='';   
  showMainPage(); 
  
  // Page is loaded
  const objects = document.getElementsByClassName('asyncImage');
  Array.from(objects).map((item) => {
    // Start loading image
    const img = new Image();
    img.src = item.dataset.src;
    // Once image is loaded replace the src of the HTML element
    img.onload = () => {
      item.classList.remove('asyncImage');
      return item.nodeName === 'IMG' ? 
        item.src = item.dataset.src :        
        item.style.backgroundImage = `url(${item.dataset.src})`;
    };
  });       
}

function showOffline(){    
  //alert('show offline');
  JBE_ONLINE=false;
  //CURR_USER='';
  CURR_AXTYPE=0;
  dispMenu(true,'mnu_main'); 
  
  getAllDataFromIDX();

  document.getElementById('jtime').innerHTML='OFFLINE';   
  document.getElementById('div_cluster').innerHTML='';
  document.getElementById('div_bar').style.display='block';  

  allow_start(true);
  showMainPage(); 
}

function allow_start(v){
  var vv='none';
  showProgress(true);
  if(v){ vv='auto'; showProgress(false); }
  document.getElementById('wrapper').style.pointerEvents=vv;
}

//=======APP DB AND DISPLAY==========================================================
function get_app_default(){    
  get_db_all();  
  //get_DB_MSG(CURR_USER);
  allow_start(true);
}

function get_db_candidate(){  
  DB_CANDIDATE=[];  
  DB_TRAN_VOTES=[];  
  axios.post(JBE_API+'app/zz_candidate.php', { clientno:CURR_CLIENT, watcherno:CURR_USER, request:1 },JBE_HEADER)
  .then(function (response) {    
    DB_CANDIDATE = response.data[0];    
    DB_TRAN_VOTES = response.data[1];   
    
    //alert('get_db_candidate '+DB_CANDIDATE.length+' vs '+DB_TRAN_VOTES.length);
    allow_start(true);
    
    show_candidates();
  })    
  .catch(function (error) { console.log(error); allow_start(true); });
}

function get_db_all(){
  //alert('CURR_USER '+CURR_USER);
  DB_CANDIDATE=[];  
  DB_PARTYMAST=[];  
  //DB_MSG=[];  
  DB_USER=[];  
  DB_POSITION = [];
  DB_PARTY = [];

  showProgress(true);    
  axios.post(JBE_API+'app/zz_all.php', { clientno:CURR_CLIENT,request:0,usercode:CURR_USER },JBE_HEADER) 
  .then(function (response) {     
    console.log(response.data);    
    DB_CANDIDATE = response.data[0];   
    DB_PARTYMAST = response.data[1];   
    DB_MSG = response.data[2];   
    DB_USER = response.data[3];   
    DB_CLUSTER = response.data[4];
    DB_POSITION = response.data[5];   
    DB_PARTY = response.data[6];
    DB_TRAN_VOTES = response.data[7];
    DB_DISTRICT = response.data[8];
    DB_SYS = response.data[9];
    ref_city = response.data[10];
    ref_prov = response.data[11];
    ref_reg = response.data[12];
    showProgress(false);
   
    //saveAllDataToIDX();
    //saving_candidate();
    
    //alert('DB_MSG.length '+DB_MSG.length);

    
    if(CURR_SCOPE_TYPE == 2){
      var ctr=0;
      DB_DISTRICT2=[];
      for(var i=0;i<ref_city.length;i++){
        if(ref_city[i]['disCode'] != CURR_SCOPE_NO){ continue; }
        let ob={
          "citymunCode":ref_city[i]['citymunCode'],
          "disCode":CURR_SCOPE_NO
        }
        DB_DISTRICT2[ctr]=ob;
        ctr++;
      }
    
    }
    // define to show position
    
    showProfile();
    update_positions();

    show_candidates();

    saveDataToIDX(DB_CANDIDATE,0);
    saveDataToIDX(DB_POSITION,1);
    saveDataToIDX(DB_TRAN_VOTES,2);
    saveDataToIDX(DB_CLUSTER,3);
    saveDataToIDX(DB_USER,4);
    saveDataToIDX(DB_SYS,5);
    
  })    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}


function update_positions(){
  JBE_STORE_CANDIDATE = [];
  var aryPos=DB_POSITION;
  aryPos.sort(sortByMultipleKey(['pos']));   
  for(var i=0;i<aryPos.length;i++){
    //alert(aryPos[i]['pos']);
    var vdisp='block';
    if(aryPos[i]['hide']==1){ vdisp='none'; }
    let ob={
      "pos":aryPos[i]['pos'],
      "posname":aryPos[i]['descrp'],
      "display":vdisp
    }
    JBE_STORE_CANDIDATE[i]=ob;
  }
}

function get_db_user(u){  
  DB_USER=[];
  DB_CLUSTER=[];
  //alert('DI A KO DIRI');
  axios.post(JBE_API+'app/zz_user.php', { clientno:CURR_CLIENT, request: 1, usercode: u }, JBE_HEADER)
  .then(function (response) {    
    DB_USER = response.data[0];    
    DB_CLUSTER = response.data[1];
    //alert('DB_CANDIDATE lname '+DB_CANDIDATE[0]['lname']);
    var clusterno=JBE_GETFLD('clusterno',DB_USER,'usercode',u);
    document.getElementById('div_cluster').innerHTML=clusterno;
    showProfile();
    allow_start(true);
  })    
  .catch(function (error) { console.log('DB_USER: '+error); allow_start(true); });
}

function get_db_sys(){  
  //alert('get_db_sys:  clientno: '+CURR_CLIENT);
  DB_SYS=[]; DB_SLIDER=[];
  axios.post(JBE_API+'app/zz_sysfile.php', { clientno:CURR_CLIENT,site:CURR_SITE,request: 1 },JBE_HEADER) 
  .then(function (response) { 
    console.log(DB_SYS);             
    //alert('get_db_sys:  Slider : '+response.data);
    DB_SYS = response.data[0];
    //showSystem(); 
  })    
  .catch(function (error) { showOffline(); console.log(error); }); 
}

function get_DB_MSG(u){
  DB_MSG=[];
  var req=1;
  if(CURR_AXTYPE > 0){
    req=0;
  }
  axios.post(JBE_API+'app/zz_chat.php', { clientno:CURR_CLIENT, request:req, usercode:u },JBE_HEADER)     
  .then(function (response) { 
    //alert(response.data.length); 
    DB_MSG = response.data; 
    dispGtMsg();
    //clearStore(JBE_STORE_IDX[4]['flename']); saveDataToIDX(DB_MSG,4);       
  })    
  .catch(function (error) { console.log(error); });
}

function get_db_places(){  
  ref_city = [];
  ref_prov = [];
  ref_reg = [];

  showProgress(true);    
  axios.post(JBE_API+'app/zz_places.php', { clientno:CURR_CLIENT,request:0 },JBE_HEADER) 
  .then(function (response) {     
    console.log(response.data);        
    ref_city = response.data[0];
    ref_prov = response.data[1];
    ref_reg = response.data[2];
    showProgress(false);
  })    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

//=================================================================================
function dispGtMsg(){  
  var usercode=CURR_USER;
  if(!usercode){ return; }
  var gtmsg_disp='none';
  var gtmsg=0;
  
  //alert(usercode+' = '+DB_MSG.length);
  for(var i=0;i<DB_MSG.length;i++){ 
    if(DB_MSG[i]['usercode'] != usercode){ continue; }
    if(parseInt(DB_MSG[i]['unread'])==0 && parseInt(DB_MSG[i]['SENDER'])==0){      
      gtmsg++;
      //alert(gtmsg);
      var msg_date=DB_MSG[i]['TRANSDAT'];
      //assign msg_date to proj for sort display
      for(var k=0;k<DB_USER.length;k++){ 
        if(DB_USER[k]['clientno'] == usercode){
          DB_USER[k]['msg_date'] = msg_date;
          break;
        }
      }
    }      
  }
  //alert('dispGtMsg '+gtmsg);
  if(gtmsg > 0){ 
    gtmsg_disp='block'; 
    JBE_AUDIO('../../../gfx/snd/chimes',5); 
    snackBar('New Message...');
  }
  document.getElementById("gt_msg").style.display=gtmsg_disp;
  document.getElementById("gt_msg").innerHTML=gtmsg;
}

//=======================show page=================================================
function showMainPage(){ 
  //alert('ako main page');
  f_MainPage=true;
  document.getElementById("myView1").setAttribute('data-JBEpage',0); //reset openview page to 0
  if(f_reload){
    snackBar('Press Back key to Exit');    
    //alert('Press Back key to Exit');    
    f_reload=false;
  }
  //allow_start(true);
  //document.getElementById('div_nobar').style.display='none';
  
  openPage('page_main');  
  //showMenu('mnu_main'); 
  var vmenu='mnu_main';  
  dispMenu(true,vmenu);
  getNewMsg();  
  console.log('mainpage '+f_MainPage);
}

function getNewMsg(){
  DB_MSG=[];  
  showProgress(true);  
  axios.post(JBE_API+'app/zz_chat.php', { clientno:CURR_CLIENT, request: 1, 
    usercode: CURR_USER 
  },JBE_HEADER) 
  .then(function (response) { 
    showProgress(false);
    console.log('getNewMsg: '+response.data);
    //alert('getchats '+response.data);
    DB_MSG = response.data;   
    dispGtMsg();
  })
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function dispHeaderMode(){
  if(!CURR_USER){
    document.getElementById('logger').innerHTML="Log In";
    document.getElementById("page_login").style.display="none";      
  }else{
    document.getElementById('logger').innerHTML=CURR_NAME;      
    document.getElementById("page_login").style.display="none";        
  }
  if(CURR_AXTYPE > 0){
    document.getElementById("menu_open").style.display='block';
    document.querySelectorAll('.dots').forEach(function(el) {
      el.style.display = 'block';
    });
  }else{
    document.getElementById("menu_open").style.display='none';
    document.querySelectorAll('.dots').forEach(function(el) {
      el.style.display = 'none';
    });
  }
}

// ** ======================= SHOW ROUTINES ===================================
function showProfile(){  
  //alert('showProfile: '+CURR_USER+' name:'+CURR_NAME);
  //dispHeaderMode();
  document.getElementById('div_bar').style.display='block';
  var n = new Date().toLocaleTimeString('it-IT');
  var v_mphoto='../../../main_gfx/avatar.png';
  
  //if(DB_USER.length==0 || CURR_USER==null || CURR_USER==''){
  if(!CURR_USER){
    document.getElementById('bar_avatar').src=v_mphoto;
    document.getElementById('log_avatar').src=v_mphoto;
    document.getElementById('logger').innerHTML='Pls. Log In';
    return;
  }
  
  v_mphoto=JBE_API+'upload/users/'+CURR_USER+'.jpg?'+n;  
  if(!JBE_ONLINE){
    v_mphoto='data:image/png;base64,' + btoa(DB_USER[0]['photo']);
    CURR_NAME=JBE_GETFLD('username',DB_USER,'usercode',CURR_USER);
  }
  
  document.getElementById('bar_avatar').src=v_mphoto;
  document.getElementById('log_avatar').src=v_mphoto;
  document.getElementById('logger').innerHTML=CURR_NAME;  

  // ----------------------------------------------------
  //alert('CURR_USER: '+CURR_USER);
  //alert('CURR_USER db: '+DB_USER.length);
  var aryDB=JBE_GETARRY(DB_USER,'usercode',CURR_USER);
  //alert('aryDB: '+Object.keys(aryDB).length);
  var clusterno=aryDB['clusterno'];  
  //alert('clusterno: '+aryDB['clusterno']);
  //alert('username: '+aryDB['username']);

  var aryDB2=JBE_GETARRY(DB_CLUSTER,'clusterno',clusterno);
  //alert('DB_CLUSTER.length '+DB_CLUSTER.length);
  document.getElementById('logger').innerHTML=aryDB['username'];
  document.getElementById('div_cluster').innerHTML=aryDB2['clustername'];  
  document.getElementById('div_precincts').innerHTML=aryDB2['precincts'];  
}

function showSystem(){  
  if(DB_SYS.length==0){ return; }
  var aryDB=DB_SYS;
  var n = new Date().toLocaleTimeString('it-IT'); 
  //alert('banner: '+aryDB[0]['banner']);

  //slide paint area==================
  //var v_banner='gfx/banner.jpg?'+n;  
  var v_banner='gfx/banner.jpg';  
  //alert('showSystem JBE_ONLINE: '+JBE_ONLINE);
  if(!JBE_ONLINE){
    //v_banner='data:image/png;base64,' + btoa(aryDB[0]['banner']);
  }   

  //document.getElementById('div_header').style.background='url("'+v_banner+'") center no-repeat';
/*
  document.getElementById('div_pg_title').innerHTML=aryDB[0]['pg_title'];
  if(!aryDB[0]['pg_title']){ document.getElementById('div_pg_title').innerHTML=aryDB[0]['clientname']; }
  document.getElementById('div_pg_body').value=aryDB[0]['pg_body'];
*/  
  setSysColors();    
}

function imgOnError(dv){	  
  dv.onerror=null;
  dv.src="../../../main_gfx/jimg_error.png";
}

function jdebug(t){
  if(t){
    document.getElementById('jdebug').style.display='block';
  }else{
    document.getElementById('jdebug').style.display='none';
  }
}

function myResizeFunction(){    
  var H_BAR=parseInt(document.getElementById('div_bar').style.height);  
  
  H_HEADER=parseInt(document.getElementById('div_header').style.height);  
  H_FOOTER=parseInt(document.getElementById('div_footer').style.height);
  
  H_WRAPPER=window.innerHeight;
  H_BODY=window.innerHeight - (H_FOOTER);
  H_PAGE=window.innerHeight - (H_FOOTER);
  H_VIEW=window.innerHeight - (H_FOOTER+H_BAR+0);
  H_VIEW_DTL=H_VIEW;
 
  document.getElementById('wrapper').style.height=(window.innerHeight)+'px';
  
  document.querySelectorAll('.page_class').forEach(function(el) {    
    el.style.height=H_BODY+'px';    
    //el.style.backgroundColor='blue';
  });

  document.querySelectorAll('.myView').forEach(function(el) {
    el.style.height=H_VIEW+'px';
    //el.style.width=(px_right+scrollWidth)+'px';
    el.style.width='100%';
    //el.style.backgroundColor='red';
    //el.style.border='2px solid green';
  });
   
  document.querySelectorAll('.myView_dtl').forEach(function(el) {    
    el.style.height=H_VIEW_DTL+'px';    
    el.style.width='100%';
  });
  
  document.getElementById('user_main').style.height=window.innerHeight - (H_FOOTER+H_HEADER)+'px';  
  //alert('user main height: '+document.getElementById('user_main').style.height);
  document.getElementById('mySidenav').style.height=(window.innerHeight-H_HEADER)+'px';
  document.getElementById('mySidenav').style.top=H_HEADER+'px';

  
}

function refreshMain(){
  location.reload(true);
}

/***************************************************** */
function openNav() {  
  if(!JBE_ONLINE){
    snackBar('OFFLINE');
    return;
  }
  
  if(document.getElementById('menu_open').getAttribute('data-open')=='1'){
    closeNav();
    return;
  }
  //document.getElementById('menu_open').innerHTML='&#8592;';
  document.getElementById('hd_img').src='../../../main_gfx/jback.png';    
  //document.getElementById("mySidenav").style.display='none';
  document.getElementById("mySidenav").style.width = "100%";
  document.getElementById("menu_open").setAttribute('data-open','1');
  event.stopPropagation();    
}

function closeNav() {
  //document.getElementById('menu_open').innerHTML='&#9776;';
  document.getElementById('hd_img').src='../../../main_gfx/jham.png';    
  document.getElementById("mySidenav").style.width = "0";   
  document.getElementById("menu_open").setAttribute('data-open','0'); 
  event.stopPropagation();    
}

window.onclick = function(event) {  
  //alert(event.target.id);  
  //if(event.target.id !== 'mySidenav' && event.target.id !== 'menu_open') {       
  
  if(event.target.id !== 'mySidenav') {
    closeNav();
  }
  if (!event.target.matches('.dropbtn')) {
    closeDropdown();
  }
}

function addAnimation(body) {
	let dynamicStyles = null;
  if (!dynamicStyles) {
    dynamicStyles = document.createElement('style');
    dynamicStyles.type = 'text/css';
    document.head.appendChild(dynamicStyles);
  }
  
  dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
}
 
function je_msg_color(fg,bg){
  document.getElementById('modal-header').style.backgroundColor=bg;
  document.getElementById('modal-footer').style.backgroundColor=bg;
  document.getElementById('modal-body').style.backgroundColor=fg;
}

function setSysColors(){  
  var aryDB=DB_SYS;
  if(DB_SYS.length > 0){   
    JBE_CLOR=aryDB[0]['clor1'];
    JBE_CLOR2=aryDB[0]['clor2'];
    JBE_CLOR3=aryDB[0]['clor3'];
    JBE_CLOR4=aryDB[0]['clor4'];
    JBE_TXCLOR1=aryDB[0]['txclor1'];
    JBE_TXCLOR2=aryDB[0]['txclor2'];
    JBE_TXCLOR3=aryDB[0]['txclor3'];
    JBE_TXCLOR4=aryDB[0]['txclor4'];
  }

  je_msg_color('white',JBE_CLOR);
  document.getElementById('modal-header').style.color=JBE_TXCLOR1;
  document.getElementById('modal-footer').style.color=JBE_TXCLOR1;
  document.getElementById('lognow').style.color=JBE_TXCLOR1;
  document.getElementById('lognow').style.backgroundColor=JBE_CLOR;
  //document.getElementById('logger').style.color=JBE_TXCLOR3;
  JBE_SET_COLOR_BY_CLASS('jheader',JBE_TXCLOR3,JBE_CLOR3);
  JBE_SET_COLOR_BY_CLASS('jfooter',JBE_TXCLOR1,JBE_CLOR);
  JBE_SET_COLOR_BY_CLASS('rowclass_dots',JBE_TXCLOR2,JBE_CLOR2);    
  JBE_SET_COLOR_BY_CLASS('hd_box',JBE_TXCLOR1,JBE_CLOR);
  JBE_SET_COLOR_BY_CLASS('back_main',JBE_TXCLOR1,JBE_CLOR);    
  JBE_SET_COLOR_BY_CLASS('class_notif2',JBE_TXCLOR4,JBE_CLOR4);
  JBE_SET_COLOR_BY_CLASS('footer_fonts',JBE_TXCLOR1,'none');

  JBE_SET_COLOR_BY_CLASS('head_color','white',JBE_CLOR);
  JBE_SET_COLOR_BY_CLASS('head_color3','white',JBE_CLOR2);
  JBE_SET_COLOR_BY_CLASS('head_color3','white',JBE_CLOR3);
  JBE_SET_COLOR_BY_CLASS('head_color4','white',JBE_CLOR4);
}

function dispMenu(f_main,m){
  document.querySelectorAll('.menu_class').forEach(function(el) {
    el.style.display = 'none';  
  });
  document.getElementById('mnu_main').style.display='none';  
  if(f_main){
    document.getElementById('mnu_mainmenu').style.display='block';    
    document.getElementById(m).style.display='block';
  }else{
    document.getElementById('mnu_submenu').style.display='block';    
    document.getElementById('mnu_submenu').innerHTML=m;
  }
}

function openPage(m){  
  document.querySelectorAll('.page_class').forEach(function(el) {
    //alert(el.id);
    el.style.display = 'none';
  });
  document.getElementById(m).style.display='block';    
}

function closeDropdown(){
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}

function jeff(){    
  alert(
    'DB_POSITION: '+DB_POSITION.length+'\n'+
    'field: '+DB_CANDIDATE[0]['lname']+'\n'+
    'DB_CANDIDATE: '+DB_CANDIDATE.length+'\n'+
    'field: '+DB_USER[0]['clusterno']+'\n'+
    'DB_USER: '+DB_USER.length+'\n'+
    'DB_CLIENTS: '+DB_CLIENTS.length+'\n'+
    'field: '+DB_CLUSTER[0]['clustername']+'\n'+
    'DB_TRAN_VOTES: '+DB_TRAN_VOTES.length+'\n'+
    'DB_CLUSTER: '+DB_CLUSTER.length
  );
}