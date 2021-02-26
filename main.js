var live_id;

function start_app(){    
  JBE_MOBILE=false;  
  if(window.innerWidth <= 900) { //for mobile only
    JBE_MOBILE=true;    
  } 
   
  JBE_ONLINE_NAVI=navigator.onLine;    
  JBE_ONLINE=false;   
  //****************
  JBE_ONLINE_NAVI=true;
  //****************  
  
  CURR_REC='';
  get_db_all();
  showMainPage(); 
/*
  get_db_candidate(true);
  get_db_watcher();
  get_db_msg();
  get_db_user();
*/
  //alert('CURR_PROJID '+CURR_PROJID);
  if(!CURR_USER) {   
   // jeff();
    //document.getElementById('div_mapbox').style.display='none';
    showLogin();
    
    CURR_AXLEVEL=0;
    document.getElementById('logger').innerHTML="Log In";
  }else{
    document.getElementById('logger').innerHTML="Hi!, "+CURR_NAME;      
    //fillTheFilter(JBE_FNDR,JBE_MNGR);
  }
  var d_c="none";
  if(CURR_USER=='J7N7B8T8E4') { d_c="block"; }
  //document.getElementById('div_creator').style.display=d_c;   
  //document.getElementById('div_main_left').style.border='1px solid white';
  JBE_SET_COLOR_BY_CLASS('cls_pos_head','white','red');
}

function get_db_all(){
  DB_CANDIDATE=[];  
  DB_WATCHER=[];  
  DB_MSG=[];  
  DB_USER=[];  
  DB_POSITION = [];
  DB_PARTY = [];

  showProgress(true);    
  axios.post(JBE_API+'z_all.php', { clientno:CURR_CLIENT,request:0 }) 
  .then(function (response) {     
    console.log(response.data);    
    DB_CANDIDATE = response.data[0];   
    DB_WATCHER = response.data[1];   
    DB_MSG = response.data[2];   
    DB_USER = response.data[3];   
    DB_CLUSTER = response.data[4];
    DB_POSITION = response.data[5];   
    DB_PARTY = response.data[6];
    DB_TRAN_VOTES = response.data[7];
    ref_brgy = response.data[8];
    showProgress(false);
    alert('ref_brgy '+ref_brgy.length);
    dispBoard();
  },JBE_HEADER)    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function get_db_candidate(m){
  DB_CANDIDATE=[];  
  showProgress(m);    
  axios.post(JBE_API+'z_candidate.php', { clientno:CURR_CLIENT,request:0 }) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);    
    DB_CANDIDATE = response.data;   
    dispBoard();
  },JBE_HEADER)    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function get_db_watcher(){
  DB_WATCHER=[];  
  showProgress(true);    
  axios.post(JBE_API+'z_watcher.php', { clientno:CURR_CLIENT, request:0 }) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);    
    DB_WATCHER = response.data;   
    //alert(JBE_PROJ); 
    //dispBoardDtl(normal_mode,pram);
  },JBE_HEADER)    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function get_db_msg(){
  DB_MSG=[];  
  showProgress(true);    
  axios.post(JBE_API+'z_msg.php', {  clientno:CURR_CLIENT, request:0 }) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);    
    DB_MSG = response.data;   
    //alert(JBE_PROJ); 
    //dispBoardDtl(normal_mode,pram);
  },JBE_HEADER)    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function get_db_user(){
  DB_USER=[];  
  showProgress(true);    
  axios.post(JBE_API+'z_user.php', { clientno:CURR_CLIENT,  request:0 }) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);    
    DB_USER = response.data;   
    //alert(JBE_PROJ); 
    //dispBoardDtl(normal_mode,pram);
  },JBE_HEADER)    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function get_db_tran_votes(){
  DB_USER=[];  
  showProgress(true);    
  axios.post(JBE_API+'z_tran_votes.php', { clientno:CURR_CLIENT,  request:0 }) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);    
    DB_USER = response.data;   
    //alert(JBE_PROJ); 
    //dispBoardDtl(normal_mode,pram);
  },JBE_HEADER)    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}



function lgetCityByCode(code) {
  return ref_city.filter(
      function(ref_city){ return ref_city.citymunCode == code }
  );
}
function lgetProvByCode(code) {
  return ref_prov.filter(
      function(ref_prov){ return ref_prov.provCode == code }
  );
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


function chg(v){  
  $('#'+v.id).val(v.value.substr(0,4));
}


function onHover(div,n,c) {		
	
  //var datasel = $('#'+div).attr('data-sel');  
   
  obg=$('#'+div).attr('data');
  
  if(n==1){
    $('#'+div).css('background-color',c);    
  } else {    
    $('#'+div).css('background-color',obg);
  }
}

function searchPlot(divname,divno,lat,lng){    
  setRecord(divname,divno);
}

function convertDate(pdate){
  var rval;
  const xdate = new Date(pdate);  // 2009-11-10  
  const mmm = xdate.toLocaleString('default', { month: 'long' });
  const dd=xdate.getDay();
  const yyyy=xdate.getFullYear();
  rval=mmm+' '+dd+', '+yyyy;
  return rval;
}



function setRecord(divname,divno){
  //alert(divname+' and '+divno);
  var fg='white';
  var bg=JBE_CLOR2;
  disp_proj_record(divno);
  
  //var obg=$('#'+divname+CURR_REC).attr('data');
  var obg=document.getElementById(divname+CURR_REC).getAttribute('data');
  document.getElementById(divname+CURR_REC).style.color='black';
  document.getElementById(divname+CURR_REC).style.backgroundColor=obg;
  document.getElementById(divname+CURR_REC).setAttribute('data-sel',0);
  
  document.getElementById(divname+divno).style.color=fg;
  document.getElementById(divname+divno).style.backgroundColor=bg;
  document.getElementById(divname+divno).setAttribute('data-sel',1);

  CURR_REC=divno;
}



function JBE_DISPFLD(p0,p1,p2,p3){  
  var projects = p1;      
  var rval='';  
  for(var i=0; i<projects.length; i++) {     
    //Object.keys(ahash)[0];
    if(p2==projects[i][p0]){
      rval=projects[i][p3];      
      break;
    }    
  }  
  return rval;
}

function winpop(mode,t='10',l='10',rKey1,rKey2,title,aryJBE,code,name) {    
  if(!mode)	{
    document.getElementById('winpop').style.display='none';
    document.getElementById('div_btns').style.pointerEvents='auto';   
    return;
  }  

  RKEY1=rKey1;
  RKEY2=rKey2;
  RROW=0;
  var v_rKey1=document.getElementById(rKey1).value;
  
  var ary = aryJBE;    
  var f_white=0;
  var bclor='white';
  
  var dtl_H='15px;';
  var details='';    

  document.getElementById('wp_title').innerHTML=title;
  document.getElementById('div_btns').style.pointerEvents='none';
  document.getElementById('winpop').setAttribute('data-sele',0);
  document.getElementById('winpop_box').style.top=t+'px';
  var details='';

  for(var i=0; i<ary.length; i++) {          
    var v_code=ary[i][code];
    if(f_white==0) {				
      bclor="white";
      f_white=1;
    }	else {
      bclor="lightgray";
      f_white=0;
    }		
    details = details +    
    '<div id="winpop_line'+v_code+'" class="winpop_class" data="'+bclor+'" data-sel=1 data-row='+i+' onmouseover="subHover(this.id,1,&quot;'+i+'&quot;,&quot;red&quot;)" onmouseout="subHover(this.id,0,&quot;'+i+'&quot;,&quot;none&quot;)"'+ 
    '     onclick="HLrow(&quot;winpop&quot;,&quot;'+v_code+'&quot;); winpop_sele('+i+')" ondblclick="winpop_go()" style="float:left;margin-bottom:0%;border:0px solid gray;cursor:pointer;width:100%;height:'+(parseInt(dtl_H)+4)+'px;padding:0%;background:'+bclor+';">'+          
    '  <div id="win_code'+i+'" class="wcentro" style="float:left;width:20%;height:100%;padding:2px 0 0 0;text-align:center;border:1px solid gray;">'+ary[i][code]+'</div>'+            
    '  <div id="win_name'+i+'" class="wcentro" style="float:left;width:80%;height:100%;padding:2px 0 0 2px;text-align:left;border:1px solid gray;">'+ary[i][name]+'</div>'+				      
    '</div>';    
  }  
  document.getElementById("div_winpop").innerHTML=details;  
  var v_RROW=(HLrowselect(ary.length,'winpop_line','win_code',v_rKey1));
  
  winpop_sele(v_RROW);      
  document.getElementById("winpop").style.display='block';  
}

function winpop_sele(s){
  document.getElementById('winpop').setAttribute('data-sele',s);
  document.getElementById('wp_btn').disabled=false;
  RROW=s;
}
function winpop_go(){  
  var x = document.getElementById('winpop').getAttribute('data-sele');   
  var sel_code=document.getElementById("win_code"+RROW).innerText;
  var sel_name=document.getElementById("win_name"+RROW).innerText;

  document.getElementById(RKEY1).value=sel_code;
  document.getElementById(RKEY2).value=sel_name;  
  winpop(false);
}
//**************************************************************************************************** */

function showProcImg(mode,sz='200px',t='10',l='10') {    
  if(mode==1)	{
    $('#wrapper').css('pointer-events','none'); 
    
    $('#divProcImg').css('width',sz);
    $('#divProcImg').css('height',sz);
    $('#divProcImg').css('top',t+'px');
    $('#divProcImg').css('left',l+'px');
    $('#divProcImg').show();
  } else {
    $('#divProcImg').hide();
    $('#wrapper').css('pointer-events','auto'); 
  }
}

function subHover(div,n){   
  //alert(div);
  //var datasel = $('#'+div).attr('data-sel');  
  var datasel = document.getElementById(div).getAttribute('data-sel');  
  if(datasel==1) { return; }   
  //$('#btn_up').val(datasel);
   
  //obg=$('#'+div).attr('data');
  var obg=document.getElementById(div).getAttribute('data');  
  
  if(n==1){
    //$('#'+div).css('background-color','#85d0e6'); 
    document.getElementById(div).style.color='white';   
    document.getElementById(div).style.backgroundColor=JBE_CLOR;
  } else {    
    //$('#'+div).css('background-color',obg);
    document.getElementById(div).style.color='black';
    document.getElementById(div).style.backgroundColor=obg;
  }
}

function xxxsubHover(div,n,i,c){   
  //alert(div);
  var datasel = $('#'+div).attr('data-sel');  
  if(datasel==1) { return; }   
  //$('#btn_up').val(datasel);
   
  obg=$('#'+div).attr('data');
  
  if(n==1){
    $('#'+div).css('background-color','#85d0e6');    
  } else {    
    $('#'+div).css('background-color',obg);
  }
}

function highlightCurrRec(div){  
  var divmain='div_'+div;
  var vcode=document.getElementById(divmain).getAttribute('data-rec');  
  if(vcode==''){ return; }
  
  var divline=div+'_line'+vcode;  
  //alert('vcode '+vcode);
  
  var fg='white';
  var bg=JBE_CLOR;
  
  document.getElementById(divline).style.color=fg;
  document.getElementById(divline).style.backgroundColor=bg;
  document.getElementById(divline).setAttribute('data-sel',1);  
}

function HLrow(div,rkey){    //highlights the record row -by JBE
  var div_main='div_'+div;
  var div_class=div+'_class';
  var div_line=div+'_line';
  
  var bg=JBE_CLOR;
  
  document.querySelectorAll('.'+div_class).forEach(function(el) {
    var obg=el.getAttribute('data');
    el.style.color='black';    
    el.style.backgroundColor=obg;    
    el.setAttribute('data-sel',0);
  });
  document.getElementById(div_line+rkey).style.color='white';
  document.getElementById(div_line+rkey).style.backgroundColor=bg;
  document.getElementById(div_line+rkey).setAttribute('data-sel',1);
  document.getElementById(div_main).setAttribute('data-rec',rkey);
  //alert('HLrow rkey: '+document.getElementById(div_main).getAttribute('data-rec'));
  //CURR_REC=rkey; 
}

function HLrowselect(rowcntr,div,div2,rKey){    //select/highlights the record row -by JBE
  var rval=0;  
  var bg='cyan';    
  for(var i=0;i<rowcntr;i++) {    
    if($('#'+div2+i).text()==rKey) {  
      $('#'+div+i).css('background-color',bg);    
      $('#'+div+i).attr('data-sel',1);
      rval=i;
      break;
    }
  }
  if(rval==0){
    $('#'+div+0).css('background-color',bg);    
    $('#'+div+0).attr('data-sel',1);
  }
  return rval;
}

function retREC_SELECTED(jbe,div){    //get current record row -by JBE  
  var rval=0;
  var rowcntr=jbe.length;
  for(var i=0;i<rowcntr;i++) {    
    if($('#'+div+i).attr('data-sel')==1) {
      //rval=$('#'+div2+i).text();
      rval=i;
      break;
    }
  }  
  return rval;
}

function openImgViewer() {          
  if($('#txProg_id').val().trim().length==0){
    //alert('Error: Empty Proj-ID.');
    MSG_SHOW(vbOk,"ERROR","Empty Project Code.",function(){return;},function(){return;});
    $('#txProg_id').focus();
    return;
  }
  var cur_img="site_img/"+$('#txImg').val();

  $('#div_add_proj').css('pointer-events','none'); 
  $('#div_btns').css('pointer-events','none'); 
  
  $('#preview').attr('src',cur_img);
  loadImg(cur_img);
  $('#divImgViewer').show();  
  
}
function closeImgViewer(){
  $('#divImgViewer').hide();  
  $('#div_add_proj').css('pointer-events','auto'); 
  $('#div_btns').css('pointer-events','auto'); 
}

function loadImg(ci){
  var image = new Image();
  image.src = ci;
  image.onload = function() {
    //alert('width - ' + preview.naturalWidth+'\n'+'height - ' + preview.naturalHeight);
    if(image.naturalHeight >= image.naturalWidth) {
      $('#preview').css('height','100%');
      $('#preview').css('width','auto');
      //alert('portrait');
    } else {
      $('#preview').css('height','auto');
      $('#preview').css('width','100%');
      //alert('landscape');
    }
  }
}
function show_upload_div(m){
  if(m==1){
    $('#ImgViewer_edit').hide();
    $('#ImgViewer_upload').show();
    $('#img_holder').val('');
  }else{
    $('#ImgViewer_edit').show();
    $('#ImgViewer_upload').hide();
  }
}
function save_holder(){     
  if($('#img_holder').val().trim().length==0){
    alert('image hold empty');
    return;
  }

  var the_img=$('#img_holder').val();
  
  $('#prev_img').attr('src',$('#preview').attr('src'));
  $('#prev_img').attr('data',the_img);
  $('#txImg').val(the_img);
  closeImgViewer();
}

function iif(cond,tt,ff){
  //alert(cond);
  //alert(tt);
  //alert(ff);
  var rval=ff;
  if(cond){ rval=tt; }
  return rval;
}
function isNumberKey(evt,div){    
  var charCode = (evt.which) ? evt.which : event.keyCode
  var inputValue = $("#"+div).val();
  if (charCode == 46){        
      var count = (inputValue.match(/'.'/g) || []).length;
      if(count<1){
        if (inputValue.indexOf('.') < 1){
          if (inputValue.charAt(0) == '.') return false;
            return true;
        }
        return false;
      }else{
        return false;
      }
  }
  
  if (charCode == 45) {      
    var xcount = (inputValue.match(/'-'/g) || []).length;      
    if(xcount<1){        
      if (inputValue.indexOf('-') < 1){                      
        if (inputValue.charAt(0) == '-') return false;
        //if (getCursorPosition(inputValue) != 0) return false;
        return true;
      }
    }else{
      //alert(888);
      return false;
    }
    
    //if (currentValue.charAt(0) == '-') return false;
    //if (getCursorPosition(this) != 0) return false;
  } 

  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)){
      return false;
  }
  return true;
}  

function jformatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
function jformatNumber2(xnum) {
  num=Number(xnum);
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function jeffNumber(mode,div) {  
  var vv = document.getElementById(div).value;
  if(vv==''){ vv='0'; }
  //alert('jeffNumber vv='+vv);
  var v = vv.replace(/,/g, '');
  //var res = str.replace(/,/g, ".");
  
  if(mode==1) {
    v=parseInt(v);
    var rval = jformatNumber(v);
  } else if(mode==2) {
    v=parseFloat(v);
    rval=jformatNumber2(v);
  }
  
  document.getElementById(div).value=rval;
  return;
}

function chk_aryPROJsele(v){
  var rval=false;
  for(var k=0;k<aryPROJsele.length;k++){
    if(v==aryPROJsele[k]){
      rval=true;
      break;
    }
  }
  return rval;
}

function sort_msg_byDate_Descending(a,b) {
  if (a.sortdate < b.sortdate)
    return -1;
  if (a.sortdate > b.sortdate)
    return 1;
  return 0;
}

function enadfy(arr){
  //alert('333666');
  /*
  var countries = { "ABW": "Aruba", "AFG": "Afghanistan", "AGO": "Angola" };
  for(code in countries){
      alert("code: " + code + "\n" + "country: " + countries[code]);
  }
  */

  for(var i=0;i<arr.length;i++){          
    for(var x in arr[0]){      
      coldata=arr[i][x];  
     
      var pos = coldata.search('\"');      
      if(pos !== -1){        
        coldata=coldata.replace(/\"/g, "'");
        //alert(coldata);
      }

      var pos2 = coldata.search('\~');      
      if(pos2 !== -1){    
        //alert(coldata);    
        coldata=coldata.replace(/\~/g, '"');        
      }

      arr[i][x]=coldata;      
    }    
  }    
  return arr;
}

function wrongChr(jClass){
  var x = document.getElementsByClassName(jClass);
  var xx=""
  var retval=false;
  var i;
  for (i = 0; i < x.length; i++) {
    //x[i].style.backgroundColor = "red";
    var xstr=x[i].value;
    var pos1 = xstr.search('\&');
    var pos2 = xstr.search('\#');
    var pos3 = xstr.search('\~');
    
    if(pos1 !== -1){
      xx='"&" or Ampersand';      
      retval=true;
      break;
    }
    if(pos2 !== -1){
      xx='"#" or Hashtag';      
      retval=true;
      break;
    }
    if(pos3 !== -1){
      xx='"~" or Tilde';      
      retval=true;
      break;
    }
    
    var strHasBackslashes = (/\\/).test(xstr);   
    if (strHasBackslashes) { 
      xx='"\\" or Backslash';      
      retval=true;
      break;
    }
    
  }
  if(retval){
    MSG_SHOW(vbOk,"ERROR","Invalid Entry. "+xx+" is found.",function(){},function(){});    
  }
  return retval;
}

function used_in_other_files(s,f,j,r){ //serch,field,RRY,retcode
  var retval=null;
  for(var i=0; i<j.length; i++) {      
    if(s==j[i][f]) {
      retval=j[i][r];        
      break;
    }      
  }
  //alert(retval);
  return retval;
}

function jdate_diff(startDate,endDate){ 
  var rval=0;  
  var timeDiff  = (new Date(endDate)) - (new Date(startDate));
  rval = timeDiff / (1000 * 60 * 60 * 24);  
  return rval;
}

function task1(){ //put FCODE, MCODE to projhist
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {						
        //document.getElementById("mnu4").innerHTML=xmlhttp.responseText;			
        var reply = this.responseText;
        alert(reply);
      }
  };  
  
  xmlhttp.open("POST", "z_task1.php",true);  
  xmlhttp.send();  
}
function task2(){ //clear All Watered Delivered
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {						
        //document.getElementById("mnu4").innerHTML=xmlhttp.responseText;			
        var reply = this.responseText;
        alert(reply);
      }
  };  
  
  xmlhttp.open("POST", "z_task2.php",true);  
  xmlhttp.send();  
}

function redisplay(){  
  dispBoard();  
}

function dispGtMsg(){  
  var gtmsg_disp='none';
  var gtmsg=0;
  for(var i=0;i<JBE_MSG.length;i++){ 
    if(parseInt(JBE_MSG[i]['unread'])==0 && parseInt(JBE_MSG[i]['SENDER'])==1){
      gtmsg++;
    }      
  }
  
  if(gtmsg > 0){ gtmsg_disp='block'; }
  document.getElementById("gt_msg").style.display=gtmsg_disp;
  document.getElementById("gt_msg").innerHTML=gtmsg;
}

function showPage(n){  
  CURR_PAGE=n;
  for(var i=1;i<=7;i++){
    //$("#mnu"+i).hide();   
    document.getElementById('mnu'+i).style.display='none';   
    document.getElementById('m_arrow'+i).style.display='none';   
  }     
  //closeMapBox();
  //$("#mnu"+n).show();  
  //$("#mnu"+n).fadeIn();
  document.getElementById('mnu'+n).style.display='block';

  //alert('showPage is: '+n);
  
  document.getElementById('m_arrow'+n).style.display='block';
  //document.getElementById('btnMapClose').style.display='block';
  document.getElementById('btnMapClose').disabled=false;
  if(n==2){
    map.setView([12.8797, 121.7740], 6);
    if(!JBE_MOBILE){
      viewMapBox();       
      openWindow(false);
      //document.getElementById('btnMapClose').style.display='none';  
      document.getElementById('btnMapClose').disabled=true;
    }
  }else{
    closeMapBox();
  }

  //document.getElementById('copyright').style.display='none';
  //document.getElementById('retback').style.display='block';
  //if(n==2){
    document.getElementById('copyright').style.display='block';
    document.getElementById('retback').style.display='none';
  //}
  $('html,body').animate({scrollTop:0},1);    
}

function viewMapBox(){
  var vmode=document.getElementById('btnShowMap').getAttribute('data-mode');
  if(vmode==0){        
    document.getElementById('btnShowMap').setAttribute('data-mode',1);
    openWindow(true);

    document.getElementById('div_mapbox').style.width=CURR_MAP_WIDTH+'px';
    document.getElementById('div_mapbox').style.display='block';
  }else{
    closeMapBox();
  }
}

function closeMapBox() {
  document.getElementById("div_mapbox").style.width = "0px";    
  openWindow(false);
  document.getElementById('btnShowMap').setAttribute('data-mode',0);
  //event.stopPropagation();    
}

function myResize(){    
  if(!JBE_MOBILE){ myResizeFunction(); }
}

function myResizeFunction(){  
  //return;
  
 document.getElementById('div_body_main').style.height='0px';

  const box = document.querySelector('#div_body_main');
  var scrollWidth = box.offsetWidth - box .clientWidth;
  //alert(scrollWidth);
    
  var hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
  //scrollWidth=20;
  if(hasScrollbar){   
    //alert('MAY SCROLL BAR '+scrollWidth);
    scrollWidth=0;
  }

  var w = window.innerWidth;

  JBE_MOBILE=false;
  var vdisp='none';
  if(w <= 900) { //for mobile only
    JBE_MOBILE=true;
    vdisp='block';  
  } 

  var px_left=80;
  //alert('px_left '+px_left);
  if(w <= 900){
    px_left=60;
  }  
  
  var px_right=w-px_left-scrollWidth;
  
  var h = window.innerHeight;
  var h_head=parseFloat(document.getElementById('div_header').style.height);
  var h_foot=parseFloat(document.getElementById('div_footer').style.height);
  var h_body=h-(h_head+h_foot);

  H_HEADER=parseInt(document.getElementById('div_header').style.height);  
  H_FOOTER=parseInt(document.getElementById('div_footer').style.height);
  
  H_WRAPPER=window.innerHeight;
  H_BODY=window.innerHeight - (H_HEADER+H_FOOTER);
  H_PAGE=window.innerHeight - (H_FOOTER);
  H_VIEW=window.innerHeight - (H_HEADER+H_FOOTER+50);

  document.getElementById('div_body_main').style.width='100%';
  document.getElementById('div_body_main').style.height=(H_BODY)+'px';

  document.getElementById('div_main_left').style.width=px_left+'px';
  document.getElementById('div_main_left').style.height='100%';

  document.getElementById('div_main_right').style.width=px_right+'px';
  document.getElementById('div_main_right').style.height='100%';

  document.querySelectorAll('.myView').forEach(function(el) {
    el.style.height=H_BODY+'px';
    el.style.width='100%';
  });

  document.getElementById('dv_fix').style.width=px_right+'px';
}

function openPage(m){ 
  document.querySelectorAll('.page_class').forEach(function(el) {
    //alert(el.id);
    el.style.display = 'none';
  });
  document.getElementById(m).style.display='block';    
}

function showMainPage(){  
  document.getElementById("myView1").setAttribute('data-JBEpage',0); //reset openview page to 0 
  console.log('mainpage '+f_MainPage);
  openPage('page_main');  
  modal_ON(false);
}

function openWindow(t){
  var vdisp='none';
  var pE='auto';
  if(t){ pE='none'; vdisp='block'; }
  document.getElementById('img_admin').style.pointerEvents=pE;
  document.getElementById('div_main_left').style.pointerEvents=pE;
  document.getElementById('admin2').style.pointerEvents=pE;
  //document.getElementById(div).style.display=vdisp;
}

function openDoor(div,t){
  var pE='auto';  
  document.getElementById('img_admin').style.pointerEvents=pE;
  document.getElementById('div_main_left').style.pointerEvents=pE;
  document.getElementById('admin2').style.pointerEvents=pE;
  document.getElementById(div).style.pointerEvents=pE;
}

function modal_ON(vmode){
  var pE='auto';
  var vopacity='1';
  if(vmode){ pE='none';vopacity='0.2'; }

  document.getElementById('img_admin').style.pointerEvents=pE; document.getElementById('img_admin').style.opacity=vopacity;
  document.getElementById('div_main_left').style.pointerEvents=pE; document.getElementById('div_main_left').style.opacity=vopacity;
  //document.getElementById('admin2').style.pointerEvents=pE;
  //document.getElementById(div).style.pointerEvents=pE;
}
div_header

function nowLive() {
  var f_live=document.getElementById('btn_Live').getAttribute('data-live');
  
  if(f_live==0) {
    document.getElementById('id_LiveTime').innerHTML=new Date().toLocaleTimeString();
    live_id = setInterval(function(){ refresh_votes(); }, 9999);		
    
    document.getElementById('btn_Live').style.backgroundColor='red';
    document.getElementById('btn_Live').innerHTML='STOP';
    document.getElementById('btn_Live').setAttribute('data-live',1);

    document.getElementById('id_LiveTime').style.display='block';
    document.getElementById('id_LiveImg').style.display='block';    
  }else{
    clearInterval(live_id);
    document.getElementById('btn_Live').style.backgroundColor='black';
    document.getElementById('btn_Live').innerHTML='LIVE';
    document.getElementById('btn_Live').setAttribute('data-live',0);

    document.getElementById('id_LiveTime').style.display='none';
    document.getElementById('id_LiveImg').style.display='none';
  }      
}

function refresh_votes(){
  var n =  new Date().toLocaleTimeString();
  document.getElementById('id_LiveTime').innerHTML=n;  
  get_db_candidate(false);  
  get_db_tran_votes(false);  
  JBE_AUDIO('gfx/snd/chimes',5);
}
