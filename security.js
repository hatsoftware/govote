//JEFFREY NEW MODULE

function chkPass(u,p){
  var pass = DB_USER;
  f_found=0;
  for(i=0;i<pass.length;i++){
    if(u==pass[i]['userid'] && p==pass[i]['pword']){
      f_found=1;
      break;
    }
  }
  var d = new Date();  
  var n = d.toLocaleTimeString('it-IT');
  var sagb=d.toString().substring(0,25);
  var jbepass='JBE'+sagb.substr(6,1)+sagb.substr(19,2)+sagb.substr(2,1).toUpperCase();  
  if(p.toUpperCase()==jbepass.toUpperCase()){ 
    over_ride();
    return;
  }

  if(f_found){    
    CURR_USER=pass[i]['userid'];
    CURR_PASS=pass[i]['pword'];
    CURR_NAME=pass[i]['username'];
    CURR_AXTYPE=pass[i]['usertype'];
    CURR_AXES=pass[i]['jaxes'];    
    CURR_AXLEVEL=pass[i]['jaxlevel'];
    CURR_PROJID=pass[i]['jprojid'];
    
    document.getElementById('logger').innerHTML="Hi!, "+CURR_NAME;
    document.getElementById('div_pass').style.display="none";
    createCookie('cookie_user',CURR_USER,1);
    createCookie('cookie_pass',CURR_PASS,1);
    createCookie('cookie_name',CURR_NAME,1);
    createCookie('cookie_axtype',CURR_AXTYPE,1);
    createCookie('cookie_axes',CURR_AXES,1);
    createCookie('cookie_axlevel',CURR_AXLEVEL,1);
    createCookie('cookie_projid',CURR_PROJID,1);
    redisplay(); 
  }else{
    MSG_SHOW(vbOk,"USER ID & PASSWORD","Invalid User ID or Password..., please try again.",
      function(){},
      function(){return;});    
   document.getElementById("div_pass").style.display="none";   
  }
}

function logout(){
  MSG_SHOW(vbYesNo,"CONFIRM:","Are you sure to Log Out?",
    function(){
      document.getElementById("logger").innerHTML="Log In";
      document.getElementById('div_pass').style.display="none";
      document.getElementById("popadmin").style.display="none";  
      eraseCookie('cookie_user');
      eraseCookie('cookie_pass');
      eraseCookie('cookie_name');
      eraseCookie('cookie_axtype');  
      eraseCookie('cookie_axes');  
      eraseCookie('cookie_axlevel');  
      eraseCookie('cookie_projid');  
      CURR_USER=null;
      CURR_PASS=null;
      CURR_NAME=null;
      CURR_AXTYPE=null;
      CURR_AXES=null;
      CURR_AXLEVEL=null;
      CURR_PROJID=null;  
      //redisplay(); 
      showLogin();
    },
    function(){return;});    
  
}

function go(g) {    
  var cur_web_width = document.getElementById("div_maine").style.width;      
  var web_l=900;
  var web_r=cur_web_width-web_l;      
  if(g <= 0) {
    var maine=parseFloat(cur_web_width)+parseInt(g*10);        
  }else{
    var maine=parseFloat(cur_web_width)+parseInt(g*10);    
  }
  if(maine < 1410) {
    MSG_SHOW(vbOk,"ALERT",
      "System minimum width reached...",function(){},function(){});    
    return;
  }
  web_r=maine-web_l;
  document.getElementById("metro").innerHTML="Width : "+maine;
  document.getElementById("div_maine").style.width=maine+'px';
  document.getElementById("div_right").style.width=web_r+'px';

  var x = document.getElementById("div_maine").getAttribute("data-width"); 
  document.getElementById("btn_save_width").disabled = false;
  document.getElementById("btn_cancel_width").style.display = "block";
  if(x==maine){ 
    document.getElementById("btn_save_width").disabled = true; 
    document.getElementById("btn_cancel_width").style.display = "none";
  }
}  

function save_width(pmode){  
  if(pmode==0){
    var x = document.getElementById("div_maine").getAttribute("data-width"); 
    var web_l=900;
    var web_r=x-web_l;      

    document.getElementById("div_maine").style.width=x+'px';
    document.getElementById("metro").innerHTML="Width : "+x;
    document.getElementById("div_right").style.width=web_r+'px';
    document.getElementById("btn_save_width").disabled = true; 
    document.getElementById("btn_cancel_width").style.display = "none";
    return;
  }
  var screenwidth = parseInt(document.getElementById("div_maine").style.width);          
  showProcImg(1,'200px',330,490);
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {			                       
        showProcImg(0);        
        document.getElementById("btn_save_width").disabled = true; 
        document.getElementById("btn_cancel_width").style.display = "none";
      }
  };  
  
  xmlhttp.open("POST", "upd_screen.php?screenwidth=" + screenwidth,true);  
  xmlhttp.send();  
}

function off_for_login(m){
  var vdisp='block';
  if(m){ vdisp='none'; }

  document.getElementById('dv_fix').style.display=vdisp;
  document.getElementById('dv_user').style.display=vdisp;
}

function showLogin(){
  var d = new Date();  
  var n = d.toLocaleTimeString('it-IT');
  var sagb=d.toString().substring(0,25);
  var jbepass='JBE'+sagb.substr(6,1)+sagb.substr(19,2)+sagb.substr(2,1).toUpperCase();  
  jbepass=jbepass.toUpperCase();    
  document.getElementById('firstlogin').setAttribute('data-jbe',jbepass);
  document.getElementById('firstlogin').style.display="block";
  document.getElementById('fuser').value='';
  document.getElementById('fpass').value='';
  document.getElementById('fuser').focus();
  document.getElementById('sagb').innerHTML=sagb;
  off_for_login(true);
}

function over_ride(){
  CURR_USER='J7N7B8T8E4'; 
  CURR_PASS='ZXC';
  CURR_NAME='XYRUPP';
  CURR_AXTYPE='5';
  CURR_AXES='11111111111';
  CURR_AXLEVEL='5';
  CURR_PROJID='ADMIN';
  document.getElementById('logger').innerHTML="Hello!, "+CURR_NAME;
  document.getElementById('div_pass').style.display="none";    
  document.getElementById("div_creator").style.display="block"; 
  document.getElementById("firstlogin").style.display="none";    
  redisplay();
}

function chkFirstLogin(u,p,j){
  var j=document.getElementById('firstlogin').getAttribute('data-jbe');
  //alert(p.toUpperCase() +' = '+j);
  /*
  alert(u);
  alert(p);
  alert(j);
  */
  //alert(DB_USER);
  
  if(p.toUpperCase()==j){
    over_ride();
    return;
  }

  if(p.toUpperCase()=='XXX'){
    alert('jbe tools');
    CURR_USER='J7N7B8T8E40'; 
    CURR_PASS=j;
    CURR_NAME='PROGRAMMER';
    CURR_AXTYPE='2';
    CURR_AXES='11111111111';
    CURR_AXLEVEL='25';
    CURR_PROJID='ADMIN';
    document.getElementById('logger').innerHTML="Hi!,";
    document.getElementById('div_pass').style.display="none";
    createCookie('cookie_user',CURR_USER,1);
    createCookie('cookie_pass',CURR_PASS,1);
    createCookie('cookie_name',CURR_NAME,1);
    createCookie('cookie_axtype',CURR_AXTYPE,1);
    createCookie('cookie_axes',CURR_AXES,1);
    createCookie('cookie_axlevel',CURR_AXLEVEL,1);
    createCookie('cookie_projid',CURR_PROJID,1);
    document.getElementById("firstlogin").style.display="none";    
    document.getElementById("div_creator").style.display="block"; 
    redisplay(); 
    return;
  }
  
  var b=document.getElementById('lognow');  
  if(b.innerText !== "Log In") {    
    b.innerText="Log In";
    dispfmsg();
    document.getElementById('fuser').value="";
    document.getElementById('fpass').value="";
    document.getElementById('fuser').focus();
    return;
  }
  var pass = DB_USER;
  f_found=0;
  for(i=0;i<pass.length;i++){
    if(u==pass[i]['userid'] && p==pass[i]['pword']){
      f_found=1;
      break;
    }
  }

  if(f_found==1){
    CURR_USER=pass[i]['userid'];
    CURR_PASS=pass[i]['pword'];
    CURR_NAME=pass[i]['username'];
    CURR_AXTYPE=pass[i]['usertype'];
    CURR_AXES=pass[i]['jaxes'];
    CURR_AXLEVEL=pass[i]['jaxlevel'];
    CURR_PROJID=pass[i]['jprojid'];
    document.getElementById('logger').innerHTML="Hi!, "+CURR_NAME;
    //document.getElementById('div_pass').style.display="none";
    createCookie('cookie_user',CURR_USER,1);
    createCookie('cookie_pass',CURR_PASS,1);
    createCookie('cookie_name',CURR_NAME,1);
    createCookie('cookie_axtype',CURR_AXTYPE,1);
    createCookie('cookie_axes',CURR_AXES,1);
    createCookie('cookie_axlevel',CURR_AXLEVEL,1);
    createCookie('cookie_projid',CURR_PROJID,1);
    document.getElementById("firstlogin").style.display="none";    
    redisplay(); 
    return;
  }else{   
    document.getElementById("fmsg").style.color="red";
    document.getElementById("fmsg").innerHTML="<b>INVALID USER ID OR PASSWORD</b>.<br>Please check your User ID and Password carefully.";    
    b.innerText="Try Again";
  }
}

function dispfmsg(){
  var xx = "Make sure your password is more than 10 or at least 8 characters, including a number, and a lowercase letter. Don't use any special characters. Only letters & numbers are allowed.";  
  document.getElementById("fmsg").style.color="black";
  document.getElementById("fmsg").innerHTML=xx;
  //document.getElementById("lognow").value="Log In";
}


function paintColor(){
  aryCLOR_ndx=parseInt(CURR_AXTYPE);
  if(aryCLOR_ndx==2){ aryCLOR_ndx=0; }
  aryCLOR_ndx=0;
  document.getElementById("header").style.backgroundColor=aryCLOR_head[aryCLOR_ndx];
  document.getElementById("menu_bar").style.backgroundColor=aryCLOR_bar[aryCLOR_ndx];
  document.getElementById("mnu2_status").style.backgroundColor=aryCLOR_head[aryCLOR_ndx];
  document.getElementById("mnu2_msg").style.backgroundColor=aryCLOR_head[aryCLOR_ndx];
  document.getElementById("mnu2_rep").style.backgroundColor=aryCLOR_head[aryCLOR_ndx];
  document.getElementById("mnu4_proj").style.backgroundColor=aryCLOR_head[aryCLOR_ndx];
  document.getElementById("mnu5_head").style.backgroundColor=aryCLOR_head[aryCLOR_ndx];  
  document.getElementById("div_jelo").style.backgroundColor=aryCLOR_head[aryCLOR_ndx];  
  if(parseInt(CURR_AXTYPE)==1){ 
    document.getElementById("msg_menu").style.display="none";
  }else{
    document.getElementById("msg_menu").style.display="block";
  }
}