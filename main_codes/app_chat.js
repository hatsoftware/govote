function fm_chat(){
  var usercode=CURR_USER;  
  THISFILE[0]=null;
  if(!JBE_ONLINE){ 
    snackBar('OFFLINE');
    return;
  }
  if(!CURR_USER){
    snackBar("Please Log In");
    return;
  }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;
  
  if(usercode==''){ usercode=CURR_USER; }

  
  mnu_chat();

  var dtl=
    '<div id="div_main_chat" data-usercode="'+usercode+'" style="width:100%;height:100%;overflow-x:hidden;overflow-y:auto;background:white;">'+
      '<div id="div_chat" style="width:100%;height:100%;overflow-x:hidden;overflow-y:auto;background:white;"></div>'+
    '</div>';        
  
  JBE_OPEN_VIEW(dtl,'Chat Box','close_div_chat');

  document.getElementById('txtMsg').value='';
  getChats();  

  //showMenu('mnu_chat');
    
  if(!JBE_ONLINE){
    //showMenu('mnu_offline');
    return;
  }  
}

function close_div_chat(){ 
  markAsRead();      
  showMainPage();
}

function markAsRead(){
  var usercode=CURR_USER;
  var sender=1;
  if(CURR_AXTYPE > 0){ sender=0; }
  //showProgress(true);        
  axios.post(JBE_API+'app/zz_chat.php', { clientno:CURR_CLIENT, request: 31, usercode: usercode, sender:sender },JBE_HEADER)
  .then(function (response) {       
    //showProgress(false);      
    console.log(response.data);
    DB_MSG=response.data;    
    dispGtMsg();
  })
  .catch(function (error) {
    console.log(error);
    //showProgress(false);
  });
}

function getChats(){  
  var usercode=CURR_USER;
  DB_MSG=[];  
  showProgress(true);  
  axios.post(JBE_API+'app/zz_chat.php', { clientno:CURR_CLIENT, request: 1, 
    usercode: usercode 
  },JBE_HEADER) 
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);
    //alert('getchats '+response.data);
    DB_MSG = response.data;   
    dispChatDtl();
  })
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function dispChatDtl(){ 
  var aryChat=DB_MSG;  
   
  aryChat.sort((a, b) => a.usercode.localeCompare(b.usercode) || a.idx - b.idx);
  //aryChat.sort(sortByMultipleKey(['TRANSDAT','TRANSTIM']));  
     
  var dtl='<div style="width:100%;height:auto;padding:5px;background-color:none;">';
  document.getElementById('div_chat').innerHTML=dtl;
  for(var i=0;i<aryChat.length;i++){    
    if(aryChat[i]['clientno'] != CURR_CLIENT) { continue; }

    var n = new Date().toLocaleTimeString('it-IT'); 
    var v_usercode=aryChat[i]['usercode'];
    //alert(v_usercode);
    //var v_msg=aryChat[i]['idx']+' = '+aryChat[i]['MSG'];
    var v_msg=aryChat[i]['MSG'];
    var v_img='';
    var v_dispImg='none';
    if(aryChat[i]['PHOTO']){          
      v_img=JBE_API+'upload/chat/'+aryChat[i]['PHOTO']+'?'+n;
      //v_img='upload/chat/'+aryChat[i]['photo']+'?'+n;
      v_img_h=50;      
      v_dispImg='block';
    }
    var v_trano=aryChat[i]['TRANO'];
    var v_sender=parseInt(aryChat[i]['SENDER']);
    var v_admin='';
    var v_unread=parseInt(aryChat[i]['unread']);    
    var v_date=aryChat[i]['TRANSDAT'];
    var v_time=aryChat[i]['TRANSTIM'];
    //var v_userImg=JBE_GETFLD('photo',DB_USER,'usercode',v_usercode);  

    if(v_admin!=''){ v_admin=v_admin+'.jpg'; }
    var v_userImg=JBE_API+'upload/users/'+JBE_GETFLD('photo',DB_USER,'usercode',v_usercode)+'?'+n;
          
    var vdispDel='none'; 
    if(v_sender==1){      
      v_userImg=JBE_API+'upload/users/'+v_admin+'?'+n;
    }
        
    var v_username=JBE_GETFLD('username',DB_USER,'usercode',v_usercode);
    dtl+=ret_chatDtl(v_sender,v_trano,v_username,v_userImg,v_msg,v_img,v_date,v_time,v_admin);
  }
  dtl+='</div>';

  var eldiv = document.getElementById("div_chat");
  eldiv.innerHTML=dtl;  
  eldiv.scrollTop = eldiv.scrollHeight;
}

function ret_chatDtl(v_sender,v_trano,v_username,v_userImg,v_msg,v_img,v_date,v_time,v_admin){    
  var n = new Date().toLocaleTimeString('it-IT'); 
  var v_kulay='black';
  var v_dispImg='block';
  var h_img=50;
  if(v_img==''){ 
    v_dispImg='none'; 
    h_img=0;
  }

  
    var vdispDel='none'; 
    if(v_sender==0){      
      //v_userImg='upload/users/'+v_admin+'.jpg';
      v_username='ADMIN';//JBE_GETFLD('username',DB_USER,'usercode',v_admin);
      var direksyon='left';
      var v_dispUserImg='block';      
      var v_bg='lightgray';
    }else{
      var direksyon='right';
      var v_dispUserImg='none'; 
      var v_bg='darkgray';      
    }
  

  var div_direksyon='float:'+direksyon+';margin-left:5px;';

  var dtl = 
    '<div style="width:100%;height:auto;text-align:'+direksyon+';background-color:none;">'+
      
      '<div style="float:'+direksyon+';width:100%;height:auto;margin-top:10px;background:none;">'+
        '<div style="display:'+v_dispUserImg+';width:100%;height:30px;font-size:15px;font-weight:bold;">'+
          //'<img src="'+v_userImg+'" style="float:'+direksyon+';height:30px;width:30px;border-radius:50%;border:1px solid gray;background:none;"/>'+
          '<div style="float:'+direksyon+';margin-left:5px;margin-right:5px;height:30px;width:auto;padding:10px 0 0 0;color:black;background:none;"/>'+v_username+'</div>'+
        '</div>'+
      '</div>'+
      
      '<div style='+div_direksyon+';width:70%;height:auto;margin-top:2px;border-radius:6px;padding:0.5%;background-color:'+v_bg+';">'+  
        '<div id="chatdel_'+v_trano+'"  title="Delete this chat" style="display:'+vdispDel+';width:100%;height:20px;text-align:center;font-size:14px;cursor:pointer;background-color:none;color:white;">'+
          '<span onclick="delChat(&quot;'+v_trano+'&quot;)" style="float:right;width:15px;border-radius:5px;background:red;">X</span>'+
        '</div>'+
        '<div style="float:'+direksyon+';width:100%;height:auto;font-size:16px;border-radius:5px;padding:1%;background-color:none;">'+
          '<div style="height:'+h_img+'px;">'+
            '<img id="'+v_trano+'" src="'+v_img+'" style="float:'+direksyon+';display:'+v_dispImg+';width:auto;height:auto;max-width:100%;max-height:100%;border-radius:5px;" onclick="JBE_ZOOM(&quot;'+v_img+'&quot;,&quot;&quot;)" />'+
          '</div>'+
          '<div style="height:auto;width:100%;font-size:12px;color:black;background:none;">'+
            v_msg+
          '</div>'+
        '</div>'+ 
      '</div>'+

      '<div style='+div_direksyon+';width:70%;height:auto;font-size:11px;background-color:none;">Date:'+v_date+'&nbsp;&nbsp;&nbsp;&nbsp;Time:'+v_time+'</div>'+
    '</div>';
  return dtl;
}

function delChat(v_trano){  
  var usercode=document.getElementById('div_main_chat').getAttribute('data-usercode');
  var f_owner=false;
  var ddir=JBE_API+'upload/chat/';
  //alert(v_trano);
  //alert(ddir);
  if(CURR_AXTYPE > 0){ f_owner=true; }
  
  MSG_SHOW(vbYesNo,"CONFIRM:","Are you sure to Delete this Item?",
    function(){   
      showProgress(true);    
      axios.post(JBE_API+'app/zz_chat.php', { clientno:CURR_CLIENT, request: 4,
        trano: v_trano,
        usercode: usercode,
        dir:ddir        
      },JBE_HEADER)
      .then(function (response) {
        showProgress(false);
        console.log(response.data);
        DB_MSG=response.data;
        //alert(DB_MSG);
        getChats();
      })
      .catch(function (error) {
        console.log(error); showProgress(false);
      });
    },
    function(){
      return;
    }
  ); 
}

function sendMsg(){
  var usercode=document.getElementById('div_main_chat').getAttribute('data-usercode');  
    
  var msg=document.getElementById('txtMsg').value;  
  var newName='';
  
  var vDate=new Date();  
  var vTime = vDate.toLocaleTimeString('it-IT'); 
  vDate = new Date(vDate.getTime() - (vDate.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];  
  var trano='JBE_'+vDate+'_'+vTime;
  trano = trano.replace(/-/g, "").replace(/:/g, "").replace("T", "-");                       

  var targetDIR=JBE_API+'upload/chat/';
  
  if(THISFILE[0]){      
    newName = trano + '.jpg';
    document.getElementById('pre_img').src='../../../main_gfx/jimage.png';   
  }  
  
  if(!msg && !newName){    
    snackBar('Fill all fields.');
    return;
  }

  showProgress(true);
  axios.post(JBE_API+'app/zz_chat.php', { clientno:CURR_CLIENT, request: 2,
    usercode: usercode,
    trano: trano,      
    photo: newName,
    sender: 1,
    trandate: vDate,
    trantime: vTime,
    msg: msg
  },JBE_HEADER)
  .then(function (response) {   
    showProgress(false);      
    console.log(response.data);
    //alert('send Msg: '+response.data.length);
    DB_MSG=response.data;
    dispChatDtl();
    document.getElementById('txtMsg').value='';
    document.getElementById('pre_img').src='../../../main_gfx/jimage.png';

    let ob = [
      { "div":trano }
    ]; 

    if(THISFILE[0]){
      uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
    }
    
    newName='';
    THISFILE[0]='';
  })
  .catch(function (error) {
    console.log(error);
    showProgress(false);
  });
  
} 


function mnu_chat(){
  var jmenu=
    '<div style="width:100%;height:100%;">'+

      '<div onclick="getChats()" style="float:left;width:22%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../../main_gfx/jrefresh.png"  style="height:100%;" alt="Refresh image" />'+
        '</div>'+
        '<span class="footer_fonts">Refresh</span>'+      
      '</div>'+
  
      '<div onclick="sendMsg()" style="float:right;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="../../../main_gfx/jsend.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">Send</span>'+        
      '</div>'+

      '<div style="float:right;width:58%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+    
        '<input id="txtMsg" type="text" value="" style="display:block;float:right;height:100%;width:75%;margin-left:1%;" />'+
        '<input type="file" id="up_img" name="up_img" hidden="hidden" />'+
        '<div id="custom-img" style="display:block;float:right;cursor:pointer;height:100%;width:auto;background:white;">'+
          '<img id="pre_img" name="pre_img" data-img="" onclick="JBE_PICK_IMAGE(0,up_img.id,pre_img.id)" src="../../../main_gfx/jimage.png" style="height:100%;width:40px;" />'+
        '</div>'+
      '</div>'+
  
    '</div>';
  dispMenu(false,jmenu);
}
