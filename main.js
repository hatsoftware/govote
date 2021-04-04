var live_id;
var f_RESIZE=true;

function start_app(){    
  JBE_MOBILE=false;  
  if(window.innerWidth <= 900) { //for mobile only
    JBE_MOBILE=true;    
  } 

  document.getElementById('sys_tilt').innerHTML=SYS_TILT;
  document.title=SYS_TILT;
   
  JBE_ONLINE_NAVI=navigator.onLine;    
  JBE_ONLINE=false;   
  //****************
  JBE_ONLINE_NAVI=true;
  //****************  
  
  showMainPage(); 
  CURR_REC='';
  get_db_all();
  document.getElementById('wrapper').style.display='block';
  if(!CURR_USER) {   
    showLogin();    
    CURR_AXLEVEL=0;
    document.getElementById('logger').innerHTML="Log In";
  }else{
    if(CURR_AXTYPE==0){ showLogin(); return; }
    document.getElementById('logger').innerHTML="Hi!, "+CURR_NAME;      
  }
  var d_c="none";
  if(CURR_USER=='J7N7B8T8E4') { d_c="block"; }
  JBE_SET_COLOR_BY_CLASS('cls_pos_head','white','red');
}

function get_db_all(){
  //alert(CURR_CLIENT);
  DB_ADMIN=[];  
  DB_CANDIDATE=[];  
  DB_PARTYMAST=[];  
  DB_MSG=[];  
  DB_USER=[];  
  DB_POSITION = [];
  DB_PARTY = [];
  DB_COOR = [];
  DB_DISTRICT = [];
  DB_DISTRICT2 = [];

  showProgress(true);    
  axios.post(JBE_API+'z_all.php', { clientno:CURR_CLIENT,request:0 },JBE_HEADER) 
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
    DB_DISTRICT2 = response.data[9];
    DB_SYS = response.data[10];
    ref_city = response.data[11];
    ref_prov = response.data[12];
    ref_reg = response.data[13];
    DB_COOR = response.data[14];
    DB_ADMIN = response.data[15];   
    
    showProgress(false);
    
    //alert('DB_POSITION '+DB_POSITION.length);
    //alert('DB_CANDIDATE '+DB_CANDIDATE.length);

    if(DB_SYS.length > 0){      
      show_scope();
    }else{
      snackBar('System file cannot be found...');
      return;
    }
    
    // define to show position
    update_positions();
    CURR_CITYMUNCODE=DB_SYS[0]['citymunCode'];
    //create new temp ref_brgy
    create_tmp_ref_brgy(CURR_CITYMUNCODE);
    
    //dispGtMsg();

    update_main_head_total(false);
    
    dispBoard();
    
  })    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function create_sysfile(){
  showProgress(true);    
  axios.post(JBE_API+'z_sysfile.php', { clientno:CURR_CLIENT, request:222,        
    site:CURR_SITE    
  },JBE_HEADER) 
  .then(function (response) { 
    showProgress(false);
    //alert(response.data);    
    DB_SYS = response.data; 
  })    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function create_tmp_ref_brgy(){
  tmp_ref_brgy=[];
  var ctr=0;
  for(var i=0;i<ref_brgy.length;i++){    
    if(ref_brgy[i]['citymunCode'] != CURR_CITYMUNCODE){ continue; }
    
    let ob = {
      "id":ctr,
      "brgyCode":ref_brgy[i]["brgyCode"],
      "brgyDesc":ref_brgy[i]["brgyDesc"],
      "regCode":ref_brgy[i]["regCode"],
      "provCode":ref_brgy[i]["provCode"],
      "citymunCode":ref_brgy[i]["citymunCode"]
    };    
    tmp_ref_brgy[ctr]=ob;    
    ctr++;
  }
  //alert('tmp len:'+tmp_ref_brgy.length);
}

function update_main_head_total(f_refresh){
  if(!f_refresh){
    do_update_main_head_total();
    return;
  }
  showProgress(true);    
  axios.post(JBE_API+'z_refresh.php', {  clientno:CURR_CLIENT, request:0 },JBE_HEADER) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);
    DB_CANDIDATE = response.data[0];
    DB_MSG = response.data[1];
    DB_TRAN_VOTES = response.data[2];
    DB_CLUSTER = response.data[3];
    dispGtMsg();
    dispGtChatter();
    do_update_main_head_total();
    dispBoard();
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}

function do_update_main_head_total(){
  var tot_regvotes=0;
  var tot_precincts=0;
  var tot_votes=0;
  for(var i=0;i<DB_CLUSTER.length;i++){
    if(DB_CLUSTER[i]['citymunCode'] != CURR_CITYMUNCODE){ continue; }
    tot_regvotes+=parseInt(DB_CLUSTER[i]['regVoters']);
    tot_precincts+=parseInt(DB_CLUSTER[i]['prec_len']);
  }  
  
  var tot_votes=0;
  for(var i=0;i<DB_CANDIDATE.length;i++){
    tot_votes+=parseInt(DB_CANDIDATE[i]['votes']);
  } 
  //alert('tot_votes'+tot_votes);
  //alert(tot_regvotes+' = '+tot_precincts+' = '+tot_votes);
  document.getElementById('headTotRegVoters').innerHTML=jformatNumber(tot_regvotes);
  document.getElementById('headTotPrecincts').innerHTML=jformatNumber(tot_precincts);  
  document.getElementById('headTotVotes').innerHTML=jformatNumber(tot_votes);  
}

function show_header(pos,place){    
  //var header=document.getElementById('BOARD_MAIN').getAttribute('data-header');
  //alert('show_header '+header);
  var m=document.getElementById("myView1").getAttribute('data-JBEpage'); 
  //alert('show_header:'+m+place);
  var aryHead1=[
    "Presidential","Vice-Presidential","Senatorial","Gubernatorial","Vice-Gubernatorial","Board Member",
    "Congressional","Mayoratorial","Vice-Mayoratorial","Councilor","Barangay Chairmanship","Barangay Councilor"
  ];

  var vdisp='block';
  var reg='Registered';
  if(JBE_MOBILE){ 
    vdisp='none'; 
    reg='Reg.';
  }
  
  var vdate = JBE_DATE_FORMAT(new Date());
  var vtime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  //update main date and time
  document.getElementById('hd_date').innerHTML = vdate;
  document.getElementById('hd_time').innerHTML = vtime;

  var dtl=
  '<div style="position:relative;width:100%;height:100%;border:1px solid black;">'+ //head
    '<div class="cls_header" style="width:34%;">'+
      '<div>'+aryHead1[parseInt(pos)-1]+' Election Results</div>'+
      '<span id="subtilt_'+m+place+'"></span>'+
    '</div>'+
    
    '<div class="cls_header2" style="display:'+vdisp+';float:left;width:33%;height:100%;background:none;">'+
      '<div style="width:100%;height:55%;padding:0px;font-size:25px;text-align:center;background:none;">'+
        vdate+
      '</div>'+
      '<div style="width:100%;height:45%;padding:0px;font-size:20px;text-align:center;background:none;">'+
        vtime+
      '</div>'+
    '</div>'+

    '<div style="float:right;width:33%;height:100%;text-align:right;padding:2px;background:none;">'+
      '<div class="cls_totals">'+
        '<div>Total '+reg+' Voters : </div>'+
            '<span id="headTotRegVoters_'+m+place+'">0</span>'+
        '<div>Total Precincts : </div>'+
            '<span id="headTotPrecincts_'+m+place+'">0</span>'+
        '<div>Total Votes Counted : </div>'+
            '<span id="headTotVotes_'+m+place+'">0</span>'+
      '</div>'+
    '</div>'+
    
  '</div>';
  return dtl;
}

function update_datetime(){
  var vdate = JBE_DATE_FORMAT(new Date());
  var vtime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  //update main date and time
  document.getElementById('hd_date').innerHTML = vdate;
  document.getElementById('hd_time').innerHTML = vtime;
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

function get_db_candidate(m){
  DB_CANDIDATE=[];  
  showProgress(m);
  axios.post(JBE_API+'z_candidate.php', { clientno:CURR_CLIENT,request:0 },JBE_HEADER) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);    
    DB_CANDIDATE = response.data;     
    dispBoard();
  })    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function get_db_party(){
  DB_PARTYMAST=[];  
  showProgress(true);    
  axios.post(JBE_API+'z_party.php', { clientno:CURR_CLIENT, request:0 },JBE_HEADER) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);    
    DB_PARTYMAST = response.data;   
    //alert(JBE_PROJ); 
    //dispBoardDtl(normal_mode,pram);
  })    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function get_db_position(){
  DB_POSITION=[];  
  JBE_STORE_CANDIDATE = [];
  showProgress(true);    
  axios.post(JBE_API+'z_position.php', { clientno:CURR_CLIENT, request:0 },JBE_HEADER) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);    
    DB_POSITION = response.data;   
    for(var i=0;i<DB_POSITION.length;i++){
      //alert(DB_POSITION[i]['pos']);
      var vdisp='block';
      if(DB_POSITION[i]['hide']==1){ vdisp='none'; }
      let ob={
        "pos":DB_POSITION[i]['pos'],
        "posname":DB_POSITION[i]['descrp'],
        "display":vdisp
      }
      JBE_STORE_CANDIDATE[i]=ob;
    }

  })    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function get_db_msg(){
  DB_MSG=[];  
  showProgress(true);    
  axios.post(JBE_API+'z_msg.php', {  clientno:CURR_CLIENT, request:0 },JBE_HEADER) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);
    DB_MSG = response.data;
    dispGtMsg();
    dispGtChatter();
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}

function get_db_user(){
  DB_USER=[];  
  showProgress(true);    
  axios.post(JBE_API+'z_user.php', { clientno:CURR_CLIENT,  request:0 },JBE_HEADER) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);    
    DB_USER = response.data;
  })    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function get_db_tran_votes(){
  DB_USER=[];  
  showProgress(true);    
  axios.post(JBE_API+'z_tran_votes.php', { clientno:CURR_CLIENT,  request:0 },JBE_HEADER) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);    
    DB_USER = response.data;   
    //alert(JBE_PROJ); 
    //dispBoardDtl(normal_mode,pram);
  })    
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

/***************************************************** */
function openNav() {    
  if(document.getElementById('menu_open').getAttribute('data-open')=='1'){
    closeNav();
    return;
  }
  //document.getElementById('menu_open').innerHTML='&#8592;';
  //document.getElementById('hd_img').src='../../main_gfx/jback.png';    
  //document.getElementById("mySidenav").style.display='none';
  document.getElementById("mySidenav").style.width = "100px";
  document.getElementById("menu_open").setAttribute('data-open','1');
  event.stopPropagation();    
}

function closeNav() {
  //document.getElementById('menu_open').innerHTML='&#9776;';
  //document.getElementById('hd_img').src='../../main_gfx/jham.png';    
  document.getElementById("mySidenav").style.width = "0";   
  document.getElementById("menu_open").setAttribute('data-open','0'); 
  event.stopPropagation();    
}

/*
window.onclick = function(event) {  
  alert(2);
  alert(event.target.id);  
  //if(event.target.id !== 'mySidenav' && event.target.id !== 'menu_open') {       
  
  //if(event.target.id !== 'mySidenav') {
  if(event.target.id !== 'mySidenav' && event.target.id !== 'menu_open') {         
    closeNav();
  }
  //if (!event.target.matches('.dropbtn')) {
  //  closeDropdown();
  //}
}
*/

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


function redisplay(){  
  off_for_login(false);
  dispBoard();  
}


function dispGtMsg(){  
  var gtmsg_disp='none';
  var gtmsg=0;    
  DB_MSG.sort(sortByMultipleKey(['usercode']));   
  for(var i=0;i<DB_MSG.length;i++){ 
    var usercode=DB_MSG[i]['usercode'];
    if(parseInt(DB_MSG[i]['unread'])==0 && parseInt(DB_MSG[i]['SENDER'])==1){
      gtmsg++;      
      //alert(gtmsg);
      var msg_date=DB_MSG[i]['TRANSDAT'];
      //assign msg_date to proj for sort display
      for(var k=0;k<DB_USER.length;k++){ 
        if(DB_USER[k]['usercode'] == usercode){
          DB_USER[k]['msg_date'] = msg_date;  
          break;
        }
      }
    }      
  }
  
  if(gtmsg > 0){ 
    gtmsg_disp='block'; 
    JBE_AUDIO('../../gfx/snd/chimes',5); 
    var html=
    '<div style="width:100%;height:70px;background:none;">'+    
      '<div style="float:left;width:50%;height:100%;text-align:right;">'+
        '<img src="../../gfx/messages.png" style="height:100%;" />'+
      '</div>'+    
      '<div style="float:left;width:50%;height:100%;text-align:left;padding:20px 0 0 20px;font-size:22px;">New Message...</div>'+    
    '</div>';
    snackBar(html);
  }
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
  //alert('myResize:'+JBE_MOBILE);
  if(!JBE_MOBILE){ myResizeFunction(); }
}

function myResizeFunction(){  
  //if(!f_RESIZE){ return; }
  //alert('myResize activated');
  //return;
  
  document.getElementById('div_body').style.height='0px';

  const box = document.querySelector('#div_body');
  var scrollWidth = box.offsetWidth - box .clientWidth;
  //alert(scrollWidth);
    
  var hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
  //scrollWidth=20;
  if(hasScrollbar){   
    //alert('MAY SCROLL BAR '+scrollWidth);
    //scrollWidth=scrollWidth-7;
    scrollWidth=0;
  }

  var w = window.innerWidth;

  JBE_MOBILE=false;
  var vdisp='none';
  if(w <= 900) { //for mobile only
    JBE_MOBILE=true;
    vdisp='block';  
  } 

  var px_left=0;
  //alert('px_left '+px_left);
  if(w <= 900){
    px_left=0;
  }  
  
  var px_right=(w-px_left)-scrollWidth;

  //alert(px_right+' scroll: '+scrollWidth);
  
  var h_view_head=parseInt(document.getElementById('div_header').style.height);  
  var h_back_main=50;  

  if(JBE_MOBILE){ 
    h_view_head=50; 
    h_back_main=30;  
    document.getElementById('div_header').style.height=h_view_head+'px';
  }

  H_HEADER=parseInt(document.getElementById('div_header').style.height);    
  H_FOOTER=parseInt(document.getElementById('div_footer').style.height);
  //alert(H_FOOTER);

  H_WRAPPER=window.innerHeight;
  H_BODY=window.innerHeight - (H_HEADER+H_FOOTER);
  H_PAGE=window.innerHeight - (H_FOOTER);  
  H_VIEW=window.innerHeight - (H_FOOTER);
  H_VIEW_DTL=H_VIEW-h_back_main;

  document.getElementById('div_body').style.width='100%';
  document.getElementById('div_body').style.height=(H_BODY)+'px';

  var h_head_main=parseInt(document.getElementById('head_main').style.height);
  document.getElementById('page_main2').style.height=(H_BODY-h_head_main)+'px';
  document.getElementById('page_main2').style.width='100%';
  document.getElementById('page_main2').style.marginTop=h_head_main+'px';
  
  document.getElementById('head_main').style.width='100%';
  
  document.querySelectorAll('.myView').forEach(function(el) {
    el.style.height=H_VIEW+'px';
    el.style.width='100%';
  });
   
  document.querySelectorAll('.myView_dtl').forEach(function(el) {    
    el.style.height=H_VIEW_DTL+'px';    
    el.style.width='100%';
  });

  if(document.getElementById('batch_dtl')){
    document.getElementById('batch_dtl').style.height=(H_VIEW_DTL-60)+'px';
  }

  //resize all repo forms  
  document.querySelectorAll('.cls_repo').forEach(function(el) {    
    el.style.height=(H_BODY-30)+'px';    
  });

  //resize messages
  document.querySelectorAll('.cls_msg').forEach(function(el) {    
    el.style.height=(H_BODY-10)+'px';        
  });  
  if(document.getElementById('div_chatters')){
    document.getElementById('div_chatters').style.height=(H_VIEW_DTL-70)+'px';
    document.getElementById('div_msg').style.height=(H_VIEW_DTL-80)+'px';    
  }

  //resize show_place  
  document.querySelectorAll('.cls_show_place').forEach(function(el) {    
    el.style.height=(H_VIEW_DTL-120)+'px';    
    //el.style.backgroundColor='coral';
  });  
  if(document.getElementById('sp_body')){
    document.getElementById('sp_body').style.height=(H_VIEW_DTL-60)+'px';
  }
  //
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
  console.log('mainpage '+f_syslive);
  openPage('page_main');  
  if(f_syslive==0){ getNewMsg(); }
  modal_ON(false);
}
function getNewMsg(){
  DB_MSG=[];  
  showProgress(true);  
  axios.post(JBE_API+'z_chat.php', { clientno:CURR_CLIENT, request: 0, 
    usercode: CURR_USER 
  },JBE_HEADER) 
  .then(function (response) { 
    showProgress(false);
    console.log('getNewMsg: '+response.data);
    //alert('getchats '+response.data);
    DB_MSG = response.data;   
    dispGtMsg();
    dispGtChatter();
  })
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function openWindow(t){
  var vdisp='none';
  var pE='auto';
  if(t){ pE='none'; vdisp='block'; }
  document.getElementById('img_admin').style.pointerEvents=pE;
  //document.getElementById('div_main_left').style.pointerEvents=pE;
  document.getElementById('admin2').style.pointerEvents=pE;
  //document.getElementById(div).style.display=vdisp;
}

function openDoor(div,t){
  var pE='auto';  
  document.getElementById('img_admin').style.pointerEvents=pE;
  //document.getElementById('div_main_left').style.pointerEvents=pE;
  document.getElementById('admin2').style.pointerEvents=pE;
  document.getElementById(div).style.pointerEvents=pE;
}

function modal_ON(vmode){
  var pE='auto';
  var vopacity='1';
  if(vmode){ pE='none';vopacity='0.2'; }

  document.getElementById('img_admin').style.pointerEvents=pE; document.getElementById('img_admin').style.opacity=vopacity;
  document.getElementById('menu_open').style.pointerEvents=pE; document.getElementById('hd_img').style.opacity=vopacity;
 // document.getElementById('div_main_left').style.pointerEvents=pE; document.getElementById('div_main_left').style.opacity=vopacity;
  //document.getElementById('admin2').style.pointerEvents=pE;
  //document.getElementById(div).style.pointerEvents=pE;
}

function show_scope(){
  let ob=[
    { "tilt":"National Scope","db":"","fld":"","fld2":"" },
    { "tilt":"Province: ","db":ref_prov,"fld":"provCode","fld2":"provDesc", "fld3":'regDesc',"db2":ref_reg,"skey":"regCode" },
    { "tilt":"District: ","db":DB_DISTRICT,"fld":"disCode","fld2":"disDesc", "fld3":'provDesc',"db2":ref_prov,"skey":"provCode" },
    { "tilt":"City/Municipality: ","db":ref_city,"fld":"citymunCode","fld2":"citymunDesc", "fld3":'provDesc',"db2":ref_prov,"skey":"provCode" },
    { "tilt":"Barangay: ","db":ref_brgy,"fld":"brgyCode","fld2":"brgyDesc", "fld3":'citymunDesc',"db2":ref_city,"skey":"citymunCode" }
  ];
  CURR_SCOPE_NO=DB_SYS[0]['scope_no'];
  CURR_SCOPE_TYPE=DB_SYS[0]['scope_type'];

  var tilt=ob[CURR_SCOPE_TYPE]["tilt"];
  var desc1='';
  var desc2='';

  if(CURR_SCOPE_TYPE > 0){
    var retfld1=ob[CURR_SCOPE_TYPE]["fld2"];
    var db1=ob[CURR_SCOPE_TYPE]["db"];
    var srecno=ob[CURR_SCOPE_TYPE]["fld"];
    var skey=ob[CURR_SCOPE_TYPE]["skey"];
    
    var db2=ob[CURR_SCOPE_TYPE]["db2"];

    var aryDB1=JBE_GETARRY(db1,srecno,CURR_SCOPE_NO);    
    var up_code=aryDB1[skey];
    desc1=aryDB1[retfld1];
   
    var vfld3=ob[CURR_SCOPE_TYPE]["fld3"];
    var aryDB2=JBE_GETARRY(db2,skey,up_code);    
    desc2=', '+aryDB2[vfld3];
  }  

  if(CURR_SCOPE_TYPE==2){
    desc2='';
  }

  document.getElementById('sys_tilt2').innerHTML=tilt+' '+desc1.trim()+desc2;  
}

function nowLive() {
  f_syslive=document.getElementById('btn_Live').getAttribute('data-live');
  
  if(f_syslive==0) {
    //document.getElementById('id_LiveTime').innerHTML=new Date().toLocaleTimeString();
    f_syslive=1;
    live_id = setInterval(function(){ refresh_votes(); }, 20000);		
    
    document.getElementById('btn_Live').style.backgroundColor='red';
    document.getElementById('btn_Live').innerHTML='STOP';
    document.getElementById('btn_Live').setAttribute('data-live',1);
    document.getElementById('id_LiveImg').style.display='block';      
  }else{
    clearInterval(live_id);
    f_syslive=0;
    document.getElementById('btn_Live').style.backgroundColor='black';
    document.getElementById('btn_Live').innerHTML='LIVE';
    document.getElementById('btn_Live').setAttribute('data-live',0);
    document.getElementById('id_LiveImg').style.display='none';    
  }      
}

function refresh_votes(){
  //var n =  new Date().toLocaleTimeString();
  JBE_AUDIO('../../gfx/snd/insight',5);
  update_datetime();
  update_main_head_total(true);
}

