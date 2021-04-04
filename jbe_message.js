function dispMessages(){ 
  //alert(CURR_CITYMUNCODE+' vs '+ref_brgy.length);
  //if(access_page(4)){ return; }
  var h_head=40;
  var dtl=
  '<div id="div_main_msg" data-mode=0 data-code="" data-fld="" data-div_id="" style="display:block;width:100%;height:100%;padding:10px;background:white;">'+

    '<div class="cls_msg" style="display:block;width:100%;height:'+(H_VIEW_DTL-20)+'px;background:none;">'+
    
      '<div id="mnu3_left" style="display:block;padding:0px;height:100%;background:none;">'+

        '<div id="chatters" style="width:100%;height:100%;">'+

          '<div id="mnu3_filter" style="height:'+h_head+'px;">'+
            '<div class="mnu3_filter_title">Barangay: </div>'+
            '<div class="mnu3_filter_select">'+
              '<select id="div_sel_msg0" name="div_sel_msg0" onchange="dispAllMode(0,this.value,this.id)" style="width:100%;height:100%;">';
                //<!-- select site for messages here -->   
                var sel_dtl='<option value=""> ALL </option>';
                var rbrgy=ref_brgy;
                rbrgy.sort(sortByMultipleKey(['brgyDesc']));
                for(var i=0;i<rbrgy.length;i++){
                  if(rbrgy[i]['citymunCode'] != CURR_CITYMUNCODE){ continue; }
                  sel_dtl+='<option value="'+rbrgy[i]['brgyCode']+'">'+rbrgy[i]['brgyDesc']+'</option>';
                }
                dtl+=sel_dtl+
              '</select>'+
            '</div>'+      
          '</div>'+  //head
          
          '<div id="div_chatters" data-code="" data-clor="" style="margin-top:10px;height:'+(H_VIEW_DTL-(h_head+20+10))+'px;">'+
          '</div>'+  //body
        '</div>'+

      '</div>'+

      '<div id="mnu3_right" style="display:block;height:100%;">'+

        //'<div id="div_msg" style="height:'+(H_VIEW_DTL-80)+'px;">'+
        '<div id="div_msg" style="height:'+(H_VIEW_DTL-80)+'px;">'+
          //<!-- messages here -->               
          '<div id="div_msg_items" style="width:100%;height:100%;overflow-y:scroll;overflow-x:hidden;background-color:none;">'+
          '</div>'+
          '<div id="msg_zoom" style="position:relative;text-align:center;display:none;width:100%;height:100%;padding:0px;border:0px solid gray;overflow:auto;background-color:black;">'+
            '<img id="msg_zoom_img" src="" style="height:100%;width:auto;max-width:100%;"/>'+
            '<button id="msg_zoom_x" onclick="ZOOM_CLOSE()" style="position:absolute;cursor:pointer;right:10px;bottom:10px;width:auto;height:30px;padding:5px;border:1px solid gray;border-radius:5px;color:white;background:black;">Close</button>'+
          '</div>'+
        '</div>'+
        
        '<div id="fm_msg">'+          
          '<div style="width:100%;height:100%;background:none;">'+
            '<span style="float:left;width:80px;height:100%;cursor:pointer;background-color:none;">'+
              '<img onclick="refreshMESSAGES()" src="../../gfx/jrefresh.png" style="height:100%;background-color:none;"/>'+
            '</span>'+
            '<input type="file" id="up_img" name="up_img" hidden="hidden" />'+
            '<div id="custom-img" style="float:left;cursor:pointer;height:100%;width:80px;border:0px solid lightgray;background:none;">'+
              '<img id="pre_img" name="pre_img" data-img="" onclick="JBE_PICK_IMAGE(0,up_img.id,pre_img.id)" src="../../gfx/jimage.png" style="height:100%;" />'+
            '</div>'+
            //'<textarea id="faddrss2" class="class_profile" name="faddrss" rows="4" cols="50" maxlength=300 placeholder="Address" style="resize:none;height:70px;">'+
            //  addrss+'</textarea>'+   
            '<textarea id="txtMsg" type="text" name="txtMsg" autocomplete="off" placeholder="Type your message..." '+
              'style="float:left;height:100%;width:45%;margin-left:10px;font-size:14px;padding:10px;border:1px solid lightgray;'+
                'resize:none;text-align:left;color:black;background-color:none;"></textarea>'+   
                
            '<button id="btnSend" onclick="sendMsg0()" style="float:right;height:100%;width:200px;font-size:20px;border-radius:10px;color:white;background:'+JBE_CLOR+';">Send</button>'+
          '</div>'+
        '</div>'+

      '</div>'+

    '</div>'+

  '</div>';

  JBE_OPEN_VIEW(dtl,'Chat','close_dispMessages');    
  modal_ON(true);
  dispAllMode(0,'','');
}
function close_dispMessages(){
  showMainPage();
}

function dispAllMode(mode,code,div_id){  
  //alert('dispAllMode mode='+mode+' code:'+code);
  //alert(div_id);
  var fld='';
  if(mode==0){
    if(code){
      fld='brgyCode';
    }else{      
      fld='';
    }
    document.getElementById('btnSend').innerHTML='Send to All';
  }else if(mode==1){
    fld='usercode';    
    document.getElementById('btnSend').innerHTML='Send';
  }
  document.getElementById('div_main_msg').setAttribute('data-mode',mode);
  document.getElementById('div_main_msg').setAttribute('data-code',code);
  document.getElementById('div_main_msg').setAttribute('data-fld',fld);
  document.getElementById('div_main_msg').setAttribute('data-div_id',div_id);
  if(mode < 1){
    dispChatter(code);
  }
  dispChat0();
}

function dispChatter(pram){
  //alert('dispChatter: '+pram);
  var chatlinecap='ALL WATCHERS';
  if(pram){
    chatlinecap='ALL WATCHERS of '+JBE_GETFLD('brgyDesc',ref_brgy,'brgyCode',pram).toUpperCase();
  }
  var watchers = DB_USER; 
  watchers.sort(sortByMultipleKey(['*msg_date','username']));

  var bg='lightgray';  
  var gt_msg=0;
  var ctr=0;
  var dtl=
  '<div style="width:100%;height:32px;background:none;">'+
    //'<div id="chatters_line000" class="cls_chatters_line" style="padding:6px;" onclick="dispAllMode(0,&quot;'+pram+'&quot;,this.id);" data-sel=0 data-bg="'+bg+'" class="manager_class" data="'+bg+'" data-row='+0+' onmouseover="xsubHover(this.id,1,&quot;'+0+'&quot;,&quot;blue&quot;)" onmouseout="xsubHover(this.id,0,&quot;'+0+'&quot;,&quot;none&quot;)">'+chatlinecap+'</div>';
    '<div id="chatters_line000" class="cls_chatters_line" style="padding:6px;" onclick="dispAllMode(0,&quot;'+pram+'&quot;,this.id);" data-sel=0 data-bg="'+bg+'" class="manager_class" data="'+bg+'" data-row='+0+'>'+chatlinecap+'</div>';

  for(var i=0;i<watchers.length;i++){
    if(pram != ''){
      if(watchers[i]['brgyCode'] != pram){ continue; }
    }
    ctr++;
    var v_code=watchers[i]['usercode'];
    var v_name=watchers[i]['username'];    
    var v_numMsg=getNumMsg(v_code);    

    gt_msg += v_numMsg;
    var v_numMsgDisp='none';
    if(v_numMsg>0){ v_numMsgDisp='block'; }
       
    //dtl += '<div id="chatters_line'+v_code+'" class="cls_chatters_line" onclick="dispAllMode(1,&quot;'+v_code+'&quot;,this.id);" data-sel=0 data-bg="'+bg+'" data="'+bg+'"  data-row='+(i+1)+' onmouseover="xsubHover(this.id,1,&quot;'+(i+1)+'&quot;,&quot;blue&quot;)" onmouseout="xsubHover(this.id,0,&quot;'+(i+1)+'&quot;,&quot;none&quot;)">'+    
    dtl += '<div id="chatters_line'+v_code+'" class="cls_chatters_line" onclick="dispAllMode(1,&quot;'+v_code+'&quot;,this.id)" data-sel=0 data-bg="'+bg+'" data="'+bg+'"  data-row='+(i+1)+'>'+    
              '<div style="float:left;width:90%;height:100%;padding:5px;overflow:auto;">'+v_name+'</div>'+
              '<div style="float:left;width:10%;height:100%;background:none;">'+
                '<div id="nmsg'+v_code+'" style="display:'+v_numMsgDisp+';float:right;width:25px;height:25px;padding:3px 0 0 0;text-align:center;border:1px solid white;border-radius:50%;color:white;background:red;">'+v_numMsg+'</div>'+
              '</div>'+
            '</div>';

    if(bg=='lightgray'){
      bg='lightgray';
    }else {
      bg='lightgray';
    }
  }
  dtl+='</div></div>';
  
  var eldiv = document.getElementById("div_chatters");
  eldiv.innerHTML=dtl;  
  eldiv.scrollTop = 0;
  
  document.getElementById('gt_msg').innerHTML=gt_msg;
  document.getElementById('div_msg_items').innerHTML='';
  document.getElementById('fm_msg').style.pointerEvents='auto';
    
  document.getElementById('btnSend').innerHTML='Send to All ('+ctr+')';  
}

function markAsRead(usercode){  
  showProgress(true);    
  axios.post(JBE_API+'z_chat.php', { clientno:CURR_CLIENT, request:32, usercode:usercode },JBE_HEADER) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data); 
    getChat0();
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}
  
//clear proj msg_date
function clear_msg_date(usercode){
  //alert('clearing');
  for(var i=0;i<DB_USER.length;i++){ 
    if(DB_USER[i]['usercode']==usercode){
      DB_USER[i]['msg_date']='';
      break;
    }
  }
  document.getElementById('nmsg'+usercode).innerHTML=0;
}
  
function getChat0(){
  //alert('getChat0');
  DB_MSG=[];  
  showProgress(true);      
  axios.post(JBE_API+'z_chat.php', { clientno:CURR_CLIENT, request:0 },JBE_HEADER) 
  .then(function (response) { 
    showProgress(false);
    //console.log('getChat0 '+response.data);    
    DB_MSG = response.data;   
    //alert('getChat0: '+DB_MSG.length);
    dispGtMsg();
    dispGtChatter();
  })    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function dispGtChatter(){  
  if(!document.getElementById('chatters_line000')){ return; }

  DB_MSG.sort(sortByMultipleKey(['usercode']));     
  for(var i=0;i<DB_USER.length;i++){ 
    var usercode=DB_USER[i]['usercode'];    
    var tot_msg=getNumMsg(usercode);

    document.getElementById('nmsg'+usercode).style.display='block';
    document.getElementById('nmsg'+usercode).innerHTML=tot_msg;
    if(tot_msg==0){ document.getElementById('nmsg'+usercode).style.display='none'; }
  }
}

function getNumMsg(usercode){
  var rrval=0;
  for(var i=0;i<DB_MSG.length;i++){     
    if(DB_MSG[i]['usercode'] == usercode && parseInt(DB_MSG[i]['unread'])==0 && parseInt(DB_MSG[i]['SENDER'])==1){
      rrval++;
    }      
  }
  return rrval;
}

function dispChat0(){      
  //alert(9999);
  var vmode=document.getElementById('div_main_msg').getAttribute('data-mode');
  var vcode=document.getElementById('div_main_msg').getAttribute('data-code');
  var vfld=document.getElementById('div_main_msg').getAttribute('data-fld');
  var vdiv_id=document.getElementById('div_main_msg').getAttribute('data-div_id');
  
  //alert('dispChat: vmode:'+vmode+'  vcode:'+vcode+'  fld:'+vfld);
  var aryUSER=DB_USER;
  aryUSER.sort((a, b) => a.usercode.localeCompare(b.usercode) || a.idx - b.idx);
  
  var dtl='';
  
  for(var i=0;i<aryUSER.length;i++){
    if(vcode){
      if(aryUSER[i][vfld]!=vcode){ continue; }
    }
    dtl+=getDtlChats(aryUSER[i]['usercode']);
  }  

  if(dtl){
    document.getElementById('fm_msg').style.pointerEvents='auto';
    document.getElementById('fm_msg').style.opacity=1;
  }else{
    document.getElementById('fm_msg').style.pointerEvents='none';
    document.getElementById('fm_msg').style.opacity=0.5;
  }

  var eldiv = document.getElementById("div_msg_items");
  eldiv.innerHTML+=dtl;  
  eldiv.scrollTop = eldiv.scrollHeight;

  document.querySelectorAll('.cls_chatters_line').forEach(function(el) {    
    el.style.color='black';
    el.style.backgroundColor='lightgray';
    el.setAttribute('data-sel',0);  
  });
  if(vmode==1){
    var div=document.getElementById('chatters_line'+vcode);
    div.style.color='white';
    div.style.backgroundColor='black';
    div.setAttribute('data-sel',1);  
  }else{      
    if(vdiv_id=='chatters_line000'){      
      document.getElementById(vdiv_id).style.color='white';
      document.getElementById(vdiv_id).style.backgroundColor='black';
      document.getElementById(vdiv_id).setAttribute('data-sel',1);  
    } 
  } 
}

function ret_chatDtl0(v_sender,v_trano,v_idx,v_username,v_msg,v_img,v_date,v_time){    
  var n = new Date().toLocaleTimeString('it-IT');   
  var v_dispImg='block';
  var h_img=50;
  if(v_img==''){ 
    v_dispImg='none'; 
    h_img=0;
  }
  if(CURR_AXTYPE>0){ 
    var vdispDel='block'; 
    if(v_sender==1){      
      var direksyon='left';
      var v_dispUserImg='block';      
      var v_bg='lightgray';
    }else{  
      var direksyon='right';
      var v_dispUserImg='none'; 
      var v_bg='darkgray';      
    }
  }else{
    var vdispDel='none'; 
    if(v_sender==1){     
      var direksyon='left';
      var v_dispUserImg='none';      
      var v_bg='lightgray';
    }else{
      var direksyon='right';
      var v_dispUserImg='none'; 
      var v_bg='darkgray';      
    }
  }
  
  var div_direksyon='float:'+direksyon+';margin-left:5px;';

  v_img=JBE_API+'upload/chat/'+v_img+'?'+n;
  var dtl = 
   // '<div style="width:100%;height:auto;text-align:'+direksyon+';background-color:blue;padding:1px;">'+
      
      '<div style="float:'+direksyon+';width:100%;height:auto;margin-top:10px;background:none;">'+
        '<div style="display:'+v_dispUserImg+';width:100%;height:auto;">'+
          //'<img src="'+v_userImg+'" style="float:'+direksyon+';height:30px;width:30px;border-radius:50%;border:1px solid gray;background:none;"/>'+
          '<div style="float:'+direksyon+';height:auto;width:auto;margin:5px;margin-bottom:5px;color:black;"/>'+v_username+'</div>'+
        '</div>'+
      '</div>'+
      
      '<div style='+div_direksyon+';width:70%;height:auto;margin-top:2px;border-radius:6px;padding:0.5%;background-color:'+v_bg+';">'+  
        '<div id="chatdel_'+v_trano+'"  title="Delete this chat" style="display:'+vdispDel+';width:100%;height:20px;text-align:center;font-size:14px;background-color:none;color:white;">'+
          '<span onclick="delChat0('+v_idx+')" style="float:right;width:15px;cursor:pointer;border-radius:5px;background:red;">X</span>'+
        '</div>'+
        '<div style="float:'+direksyon+';width:100%;height:auto;font-size:16px;border-radius:5px;padding:1%;background-color:none;">'+
          '<div style="height:'+h_img+'px;">'+
            '<img id="'+v_trano+'" src="'+v_img+'" style="float:'+direksyon+';display:'+v_dispImg+';width:auto;height:auto;max-width:100%;max-height:100%;border-radius:5px;" onclick="JBE_ZOOM(&quot;'+v_img+'&quot;,&quot;&quot;)" />'+
          '</div>'+
          '<div style="height:auto;width:100%;font-size:12px;text-align:'+direksyon+';color:black;background:none;">'+
            v_msg+
          '</div>'+
        '</div>'+ 
      '</div>'+
      
      '<div style='+div_direksyon+';width:70%;height:auto;font-size:11px;background-color:none;">Date:'+v_date+'&nbsp;&nbsp;&nbsp;&nbsp;Time:'+v_time+'</div>'
    //'</div>';
  return dtl;
}

function delChat0(idx){
  //alert(idx);
  //var usercode=document.getElementById('div_chatters').getAttribute('data-code');
  var photo=JBE_GETFLD('PHOTO',DB_MSG,'idx',idx);
  if(photo){ photo='upload/chat/'+photo; }  
  //alert('photo: '+photo);
  if(CURR_AXTYPE > 0){ f_owner=true; }
  
  MSG_SHOW(vbYesNo,"CONFIRM:","Are you sure to Delete this Message?",
    function(){
      showProgress(true);
      axios.post(JBE_API+'z_chat.php', { clientno:CURR_CLIENT, request: 4,
        idx: idx,        
        photo:photo
      },JBE_HEADER)
      .then(function (response) {
        showProgress(false);
        console.log(response.data);  
        //alert(response.data);  
        //return;
        DB_MSG=response.data;  
        dispChat0();
      })
      .catch(function (error) {
        console.log(error); showProgress(false);
      });
    },function(){ return; }
  ); 
}

function refreshMESSAGES(){  
  var vmode=document.getElementById('div_main_msg').getAttribute('data-mode');
  var vcode=document.getElementById('div_main_msg').getAttribute('data-code');
  var vfld=document.getElementById('div_main_msg').getAttribute('data-fld');
  var vdiv_id=document.getElementById('div_main_msg').getAttribute('data-div_id');
  dispAllMode(vmode,vcode,vdiv_id);
  //getChat0();
  //dispChatter('');
  //dispChat0();
}

function sendMsg0(){
  var vmode=document.getElementById('div_main_msg').getAttribute('data-mode');
  var vcode=document.getElementById('div_main_msg').getAttribute('data-code');
  var vfld=document.getElementById('div_main_msg').getAttribute('data-fld');
  //alert('vmode:'+vmode+' vcode:'+vcode+' vfld:'+vfld);
    
  var mcode='';//JBE_GETFLD('MCODE',JBE_PROJ,'usercode',usercode);  
  
  if(CURR_AXTYPE>0){ v_sender=0; }
  
  var msg=document.getElementById('txtMsg').value;
  //alert(msg);  
  var newName='';
  var targetDIR=JBE_API+'upload/chat/';
  
  var vDate=new Date();
  var vTime = vDate.toLocaleTimeString('it-IT'); 

  vDate = new Date(vDate.getTime() - (vDate.getTimezoneOffset() * 60000 ))
                   .toISOString()
                   .split("T")[0].replace(/-\s*/g, "");
  
  var trano=vDate + new Date().toLocaleTimeString('it-IT').replace(/:\s*/g, "");
    
  var f_photo=false;
  if(THISFILE[0]){    
    f_photo=true;  
    newName = trano + '.jpg';//+getExt(THISFILE[0].name);
    document.getElementById('pre_img').src='../../gfx/jimage.png';
  }  
  //alert('ready sender: '+v_sender);
  if(!msg && !newName){    
    snackBar('Fill all fields.');
    return;
  }

  var aryItems=[];
  var photo='';

  if(vmode==0){  
    
    for(var i=0;i<DB_USER.length;i++){
      if(vcode){
        if(DB_USER[i][vfld] != vcode){ continue; }
      }

      if(f_photo){
        photo=trano+i+'.jpg';
      }

      let ob = {
        trano:trano+i,
        photo:photo,
        usercode:DB_USER[i]['usercode']
      };
      aryItems[i]=ob;  
    }     

  }else{    
    let ob = {      
      trano:trano,
      photo:trano + '.jpg',
      usercode:vcode
    };
    aryItems[0]=ob;  
  }

  /*
  alert('len: '+aryItems.length);
  for(var i=0;i<aryItems.length;i++){
    alert(
      'trano:'+aryItems[i]['trano']+
      '\nphoto:'+aryItems[i]['photo']+
      '\nusercode:'+aryItems[i]['usercode']
    );
  } 
  */
  //return;
    
  showProgress(true);
  axios.post(JBE_API+'z_chat.php', { clientno:CURR_CLIENT, request: 20,    
    mcode: mcode,
    sender: 0,
    trandate: vDate,
    trantime: vTime,
    msg: msg,
    aryItems:JSON.stringify(aryItems)
  },JBE_HEADER)
  .then(function (response) {   
    showProgress(false);      
    console.log(response.data);
    //alert('send Msg: '+response.data);
    DB_MSG=response.data;
    dispChat0();
        
    document.getElementById('txtMsg').value='';
    document.getElementById('pre_img').src='../../gfx/jimage.png';

    if(THISFILE[0]){ 
      if(vmode==0){  
        for(var i=0;i<DB_USER.length;i++){
          let ob = [
            { "div":aryItems[i]['trano'] }
          ];            
          newName=aryItems[i]['photo'];
          uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
        }
      }else{
        let ob = [
          { "div":trano }
        ];            
        uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
      }
    }        
    
    newName='';
    THISFILE[0]='';
  })
  .catch(function (error) {
    console.log(error);
    showProgress(false);
  });
}

function getDtlChats(usercode){
  var vmode=document.getElementById('div_main_msg').getAttribute('data-mode');
  var vcode=document.getElementById('div_main_msg').getAttribute('data-code');
  var aryChat=DB_MSG;    
  aryChat.sort((a, b) => a.usercode.localeCompare(b.usercode) || a.idx - b.idx);
  
  var dtl='<div style="width:100%;height:auto;padding:5px;background-color:none;">';
  document.getElementById('div_msg_items').innerHTML=dtl;
  for(var i=0;i<aryChat.length;i++){
    
    if(aryChat[i]['usercode']  != usercode) { continue; }      
    
    var n = new Date().toLocaleTimeString('it-IT'); 
    var v_usercode=aryChat[i]['usercode'];
    var v_msg=aryChat[i]['MSG'];
    var v_img=aryChat[i]['PHOTO'];
    var v_trano=aryChat[i]['TRANO'];
    var v_idx=aryChat[i]['idx'];
    var v_sender=parseInt(aryChat[i]['SENDER']);    
    var v_date=aryChat[i]['TRANSDAT'];
    var v_time=aryChat[i]['TRANSTIM'];
    var v_username=JBE_GETFLD('username',DB_USER,'usercode',v_usercode);
  
    dtl+=ret_chatDtl0(v_sender,v_trano,v_idx,v_username,v_msg,v_img,v_date,v_time);
  }
  dtl+='</div>';
  if(vmode==1 && parseInt(document.getElementById('nmsg'+usercode).innerHTML) > 0){
    //alert(document.getElementById('nmsg'+usercode).innerHTML);
    markAsRead(usercode);
  }
  return dtl;
}
