function dispMessages(normal_mode,pram){      
  getAllMessages(normal_mode,pram);
}
function getAllMessages(normal_mode,pram){
  JBE_MSG=[];  
  showProgress(true);    
  axios.post(JBE_API+'z_chat.php', {  request:0 },JBE_HEADER) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);    
    JBE_MSG = response.data;   
    dispGtMsg(); 
    dispNewMessages(normal_mode,pram);
  })    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function dispNewMessages(normal_mode,pram){      
  $("#div_sel_msg0").prop('disabled',false);
  $("#div_sel_msg").prop('disabled',false);
  if(parseInt(CURR_AXTYPE)==1){ return; }
  if(normal_mode && !access_page(2)){return;}

  if(pram==null){    
    return;
  }
  //alert("dispMessages pram is : "+pram);
  showPage(3);         
  
  aryPROJsele.length = 0; //clear the array

  if(CURR_AXTYPE==0){
    var newOptionsHtml0 = "";
  }else{
    var newOptionsHtml0 = "<option value='ALL'> ALL </option>";
  }
  
  var mngr = JBE_MNGR;  

  for(var i=0;i<mngr.length;i++){   
    var v_mcode=mngr[i]['MCODE'];
    var v_mname=mngr[i]['MNAME'];
    //dont allow funders
    if(parseInt(CURR_AXTYPE)==1){      
      continue;      
    }
    if(pram !== 'ADMIN') {
      if(v_mcode !== pram){
        continue;
      }
    }    
    newOptionsHtml0=newOptionsHtml0+"<option value='"+v_mcode+"'>"+v_mcode+" - "+v_mname+"</option>";   
  }
    
  $("#div_sel_msg0").html(newOptionsHtml0);      

  //---------------------------------------------------------
  
  if(pram=='ADMIN'){
    pram="ALL";
  }
  dispChatter(pram);
}

function dispChatter(pram){
  //alert('dispChatter: '+pram);
  var first_proj='';
  if(JBE_PROJ.length == 0){ return; }
  var proj = JBE_PROJ; 
  proj.sort(sortByMultipleKey(['community','PROJCODE']));
  
  document.getElementById('div_chatters').setAttribute('data-projid',first_proj);  
  
  var dtl='<div style="width:100%;height:32px;background:none;">';
  var bg='lightgray';
  
  var gt_msg=0;
  
  for(var i=0;i<proj.length;i++){       
    var v_mcode=proj[i]['MCODE'];
    var v_proj=proj[i]['PROJCODE'];
    var v_comm=proj[i]['community'];
    
    var v_numMsg=getNumMsg(v_proj);    
    gt_msg += v_numMsg;
    var v_numMsgDisp='none';
    if(v_numMsg>0){ v_numMsgDisp='block'; }
    
    //dont allow funders
    if(parseInt(CURR_AXTYPE)==1){      
      continue;      
    }
    if(pram !== 'ALL') {
      if(v_mcode !== pram){
        continue;
      }
    }
    //get first record
    if(first_proj==''){ first_proj=v_proj; }
    
    dtl += '<div id="chatters_line'+v_proj+'" data-sel=0 data-bg="'+bg+'" style="font-size:12px;height:100%;padding:2px;background:'+bg+';" onclick="dispMsg0('+v_proj+')" class="manager_class" data="'+bg+'" data-sel=0 data-row='+i+' onmouseover="subHover(this.id,1,&quot;'+i+'&quot;,&quot;blue&quot;)" onmouseout="subHover(this.id,0,&quot;'+i+'&quot;,&quot;none&quot;)">'+
                 '<div style="float:left;width:90%;height:100%;overflow:auto;">'+v_comm+'</div>'+
                 '<div style="float:left;width:10%;height:100%;background:none;">'+
                   '<div id="nmsg'+v_proj+'" onclick="alert(2)" style="display:'+v_numMsgDisp+';float:right;width:25px;height:25px;padding:4.5px 0 0 0;text-align:center;border:1px solid white;border-radius:50%;color:white;background:red;">'+v_numMsg+'</div>'+
                 '</div>'+
               '</div>';

    if(bg=='lightgray'){
      bg='darkgray';
    }else {
      bg='lightgray';
    }
  }
  dtl+='</div>';
  
  var eldiv = document.getElementById("div_chatters");
  eldiv.innerHTML=dtl;  
  eldiv.scrollTop = 0;
  
  //document.getElementById('gt_msg').innerHTML=gt_msg;
  //document.getElementById('gt_msg').style.display=gt_msg;
  
  document.getElementById('div_msg_items').innerHTML='';
  document.getElementById('fm_msg').style.pointerEvents='none';
  //alert('first_proj: '+first_proj);
  //dispMsg0(first_proj);
}

function getNumMsg(vproj){
  var rrval=0;

  for(var i=0;i<JBE_MSG.length;i++){ 
    if(JBE_MSG[i]['PROJCODE'] == vproj && parseInt(JBE_MSG[i]['unread'])==0 && parseInt(JBE_MSG[i]['SENDER'])==1){
      rrval++;
    }      
  }
  return rrval;
}
  

function dispMsg0(projcode){
  document.getElementById('fm_msg').style.pointerEvents='none';
  document.getElementById('div_msg_items').innerHTML='';
  document.getElementById('txtMsg').value='';
  document.getElementById('pre_img').src='gfx/jimage.png';  
  if(!projcode){ return; }

  document.getElementById('fm_msg').style.pointerEvents='auto';
  var orec=document.getElementById('div_chatters').getAttribute('data-projid');  
  /*
  alert(
    'orec:'+orec+'\n'+
    'projcode:'+projcode
  );
  */

  if(orec){ 
    var obg=document.getElementById('chatters_line'+orec).getAttribute('data-bg');  
    if(obg){
      document.getElementById('chatters_line'+orec).setAttribute('data-sel',0);  
      document.getElementById('chatters_line'+orec).style.color='black';
      document.getElementById('chatters_line'+orec).style.backgroundColor=obg;
    }
  }

  //document.getElementById('chatters_line'+orec).setAttribute('data-sel',0);  
  document.getElementById('div_chatters').setAttribute('data-projid',projcode);  
  document.getElementById('chatters_line'+projcode).style.color='white';
  document.getElementById('chatters_line'+projcode).style.backgroundColor='black';
  document.getElementById('chatters_line'+projcode).setAttribute('data-sel',1);  
  getChat0(projcode); 
}
  
function getChat0(projcode){
  JBE_MSG=[];  
  showProgress(true);    
  //axios.post('z_chat.php', {  request:1, projcode: projcode },JBE_HEADER) 
  axios.post(JBE_API+'z_chat.php', {  request:0 },JBE_HEADER) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);    
    JBE_MSG = response.data;   
    //alert(JBE_MSG.length);
    dispChat0(projcode);
  })    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function dispChat0(projcode){   
  if(CURR_AXTYPE > 0) { f_owner=true; }
  var aryChat=JBE_MSG;
  //alert('dispchat len:'+JBE_MSG.length); 
  aryChat.sort(sortByMultipleKey(['TRANSDAT','TRANSTIM']));  
  //aryChat.sort(sortByMultipleKey(['id']));  
  var dtl='<div style="width:100%;height:auto;padding:5px;background-color:none;">';
  document.getElementById('div_msg_items').innerHTML=dtl;
  for(var i=0;i<aryChat.length;i++){    
    if(aryChat[i]['PROJCODE']  != projcode) { continue; }
    var n = new Date().toLocaleTimeString('it-IT'); 
    //var v_projcode=aryChat[i]['PROJCODE'];
    var v_msg=aryChat[i]['MSG'];
    var v_img=aryChat[i]['PHOTO'];
    var v_trano=aryChat[i]['TRANO'];
    var v_sender=parseInt(aryChat[i]['SENDER']);    
    var v_unread=parseInt(aryChat[i]['unread']);    
    var v_date=aryChat[i]['TRANSDAT'];
    var v_time=aryChat[i]['TRANSTIM'];
    var v_username=JBE_GETFLD('community',JBE_PROJ,'PROJCODE',projcode);
    //alert(v_username);
    dtl+=ret_chatDtl0(v_sender,v_trano,v_username,v_msg,v_img,v_date,v_time);
  }
  dtl+='</div>';
  var eldiv = document.getElementById("div_msg_items");
  eldiv.innerHTML=dtl;  
  eldiv.scrollTop = eldiv.scrollHeight;
  //mark as read
  axios.post(JBE_API+'z_chat.php', {  request:31, projcode: projcode },JBE_HEADER) 
  .then(function (response) { 
    console.log(response.data);    
    JBE_MSG=response.data;
    dispGtMsg(); 
    document.getElementById('nmsg'+projcode).style.display='none';
  })    
  .catch(function (error) { console.log(error);  }); 
}

function ret_chatDtl0(v_sender,v_trano,v_username,v_msg,v_img,v_date,v_time){    
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
          '<span onclick="delChat0(&quot;'+v_trano+'&quot;)" style="float:right;width:15px;cursor:pointer;border-radius:5px;background:red;">X</span>'+
        '</div>'+
        '<div style="float:'+direksyon+';width:100%;height:auto;font-size:16px;border-radius:5px;padding:1%;background-color:none;">'+
          '<div style="height:'+h_img+'px;">'+
            '<img id="'+v_trano+'" src="site_img/chat/'+v_img+'?'+n+'" style="float:'+direksyon+';display:'+v_dispImg+';width:auto;height:auto;max-width:100%;max-height:100%;border-radius:5px;" onclick="ZOOM_IMG(&quot;site_img/chat/'+v_img+'&quot;)" />'+
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

function delChat0(v_trano){  
  //alert(v_trano);
  var projcode=document.getElementById('div_chatters').getAttribute('data-projid');
  //alert('del projcode: '+projcode);
  var photo=JBE_GETFLD('PHOTO',JBE_MSG,'TRANO',v_trano);
  //alert(photo);
  
  var f_owner=false;
  if(CURR_AXTYPE > 0){ f_owner=true; }
  
  MSG_SHOW(vbYesNo,"CONFIRM:","Are you sure to Delete this Message?",
    function(){   
      showProgress(true);
      axios.post(JBE_API+'z_chat.php', { request: 4,
        trano: v_trano,
        projcode: projcode,
        photo:photo
      },JBE_HEADER)
      .then(function (response) {
        showProgress(false);
        console.log(response.data);
        //alert(response.data);
        JBE_MSG=response.data;
        //alert('after del len:'+JBE_MSG.length);
        dispChat0(projcode);
      })
      .catch(function (error) {
        console.log(error); showProgress(false);
      });
    },function(){ return; }
  ); 
}

function refreshMESSAGES(){
  var projcode=document.getElementById('div_chatters').getAttribute('data-projid');
  getChat0(projcode);
}

function sendMsg0(){
  var projcode=document.getElementById('div_chatters').getAttribute('data-projid');
  //alert(projcode);
  var mcode=JBE_GETFLD('MCODE',JBE_PROJ,'PROJCODE',projcode);  
  var v_sender=1; 
  if(CURR_AXTYPE>0){ v_sender=0; }
  
  var msg=document.getElementById('txtMsg').value;
  //alert(msg);  
  var newName='';
  
  var vDate=new Date();  
  var vTime = vDate.toLocaleTimeString('it-IT'); 

  vDate = new Date(vDate.getTime() - (vDate.getTimezoneOffset() * 60000 ))
                   .toISOString()
                   .split("T")[0].replace(/-\s*/g, "");
  
  var trano=vDate + new Date().toLocaleTimeString('it-IT').replace(/:\s*/g, "");
    
  if(thisFile){      
    newName = trano + '.jpg';//+getExt(thisFile.name);    
    document.getElementById('pre_img').src='gfx/jimage.png';   
  }  
  //alert('ready sender: '+v_sender);
  if(msg != '' || newName != ''){    
    showProgress(true);
    axios.post(JBE_API+'z_chat.php', {  request: 2,
      trano: trano,
      projcode: projcode,
      mcode: mcode,
      photo: newName,
      sender: 0,
      trandate: vDate,
      trantime: vTime,
      msg: msg
    },JBE_HEADER)
    .then(function (response) {   
      showProgress(false);      
      console.log(response.data);
      //alert('send Msg: '+response.data);
      JBE_MSG=response.data;
      dispChat0(projcode);
          
      document.getElementById('txtMsg').value='';
      document.getElementById('pre_img').src='gfx/jimage.png';

      if(thisFile){ 
        let ob = [
          { "div":trano }
        ];
        uploadNOW(thisFile,newName,'site_img/chat/',ob); 
      }        

      dispChat0(projcode);
      newName='';
      thisFile='';
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
      showProgress(false);
    });
  }else{
    snackBar('Fill all fields.');
  } 
}
