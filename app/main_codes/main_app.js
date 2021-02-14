var JBE_EMPTY_IMG='../main_gfx/jimg_error.png';

function start_app(){  
  allow_start(false);
  JBE_ONLINE_NAVI=navigator.onLine;    
  JBE_ONLINE=false;   
  //****************
  JBE_ONLINE_NAVI=true;
  //****************   
  axios.post(JBE_API+'zz_online.php',JBE_HEADER)  
  .then(function (response) {
    var res=parseInt(response.data);
    //alert('zz_online:  '+res);    
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
  CURR_USER='';
  CURR_AXTYPE=0;
  dispMenu(true,'mnu_main'); 
  getAllDataFromIDX(0);
    
  document.getElementById('div_cluster').innerHTML='OFFLINE';
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
  //alert('tan awa : '+CURR_CLIENT);
  get_db_candidate();
  //get_db_tran_votes();  
  get_db_sys();  
  get_db_user(CURR_USER);  
}

function get_db_candidate(){  
  DB_CANDIDATE=[];  
  DB_TRAN_VOTES=[];  
  axios.post(JBE_API+'zz_candidate.php', { clientno:CURR_CLIENT, watcherno:CURR_USER, request:1 },JBE_HEADER)
  .then(function (response) {    
    DB_CANDIDATE = response.data[0];    
    DB_TRAN_VOTES = response.data[1];    
    //alert('get_db_candidate '+DB_CANDIDATE.length+' vs '+DB_TRAN_VOTES.length);
    allow_start(true);
    show_candidates();
  })    
  .catch(function (error) { console.log(error); allow_start(true); });
}

function get_db_user(u){
  DB_USER=[];
  axios.post(JBE_API+'zz_user.php', { clientno:CURR_CLIENT, request: 1, usercode: u },JBE_HEADER)
  .then(function (response) {    
    DB_USER = response.data;    
    document.getElementById('div_cluster').innerHTML='Cluster: '+JBE_GETFLD('clusterno',DB_USER,'usercode',u);
    document.getElementById('logger').innerHTML=JBE_GETFLD('username',DB_USER,'usercode',u);    
    showProfile();
    allow_start(true);
  })    
  .catch(function (error) { console.log('DB_USER: '+error); allow_start(true); });
}

function get_db_sys(){  
  //alert('get_db_sys:  clientno: '+CURR_CLIENT);
  DB_SYS=[]; DB_SLIDER=[];
  axios.post(JBE_API+'zz_sysfile.php', { clientno:CURR_CLIENT,site:CURR_SITE,request: 1 },JBE_HEADER) 
  .then(function (response) { 
    console.log(DB_SYS);             
    //alert('get_db_sys:  Slider : '+response.data);
    DB_SYS = response.data[0];
    //showSystem(); 
  })    
  .catch(function (error) { showOffline(); console.log(error); }); 
}

function get_db_chat(u){
  DB_CHAT=[];
  var req=1;
  if(CURR_AXTYPE > 0){
    req=0;
  }
  axios.post(JBE_API+'zz_chat.php', { clientno:CURR_CLIENT,request: req, usercode: u },JBE_HEADER)     
  .then(function (response) { console.log(response.data); DB_CHAT = response.data; })    
  .catch(function (error) { console.log(error); });
}

//=================================================================================
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
  console.log('mainpage '+f_MainPage);
  openPage('page_main');  
  //showMenu('mnu_main'); 
  var vmenu='mnu_main';  
  var v_curr_user=CURR_USER;    
  dispMenu(true,vmenu);
  if(!JBE_ONLINE) { return; }
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
  //dispHeaderMode();
  document.getElementById('div_bar').style.display='block';
  var n = new Date().toLocaleTimeString('it-IT');
  var v_mphoto='main_gfx/avatar.png';
  
  //if(DB_USER.length==0 || CURR_USER==null || CURR_USER==''){
  if(!CURR_USER){
    document.getElementById('bar_avatar').src=v_mphoto;
    document.getElementById('log_avatar').src=v_mphoto;
    document.getElementById('logger').innerHTML='';
    return;
  }

  //v_mphoto='upload/users/'+CURR_USER+'.jpg?'+n;
  v_mphoto=JBE_API+'upload/users/'+CURR_USER+'.jpg?'+n;
  if(!JBE_ONLINE){
    v_mphoto='data:image/png;base64,' + btoa(DB_USER[0]['photo']);
  }
  
  document.getElementById('bar_avatar').src=v_mphoto;
  document.getElementById('log_avatar').src=v_mphoto;
  document.getElementById('logger').innerHTML=CURR_NAME;
  
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
  dv.src="main_gfx/jimg_error.png";
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
 
  document.getElementById('wrapper').style.height=(window.innerHeight)+'px';
  
  document.querySelectorAll('.page_class').forEach(function(el) {    
    el.style.height=H_BODY+'px';    
    //el.style.backgroundColor='blue';
  });
  
  document.getElementById('user_main').style.height=window.innerHeight - (H_FOOTER+H_HEADER)+'px';  
  //alert('user main height: '+document.getElementById('user_main').style.height);
  document.getElementById('mySidenav').style.height=(window.innerHeight-H_HEADER)+'px';
  document.getElementById('mySidenav').style.top=H_HEADER+'px';

  JBE_MOBILE=true;
  if(window.outerWidth > 500){
    JBE_MOBILE=false;
  }
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
  document.getElementById('hd_img').src='main_gfx/jback.png';    
  //document.getElementById("mySidenav").style.display='none';
  document.getElementById("mySidenav").style.width = "100%";
  document.getElementById("menu_open").setAttribute('data-open','1');
  event.stopPropagation();    
}

function closeNav() {
  //document.getElementById('menu_open').innerHTML='&#9776;';
  document.getElementById('hd_img').src='main_gfx/jham.png';    
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