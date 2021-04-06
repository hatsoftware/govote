function do_fm_admin(){    
  FM_TABLE=DB_ADMIN;  
  FM_AXIOS_PHP=JBE_API+"z_admin.php";
  FM_FIELDS=[ //display on screen
    { div:"tx_usercode", fld:"usercode", disp:-1, save:true  },
    { div:"tx_username", fld:"username", disp:1, save:true  },
    { div:"tx_userid", fld:"userid", disp:1, save:true },
    { div:"tx_pword", fld:"pword", disp:1, save:true },
    { div:"tx_admin_photo", fld:"photo", disp:0, save:true  },    
   
    { div:"tx_usertype", fld:"usertype", disp:0, save:true  },    
        { div:"tx_usertype_name", fld:"", disp:2, save:false  }
  ];
  
  var fm_ob = {
    title:"Administrator File Maintenance",    
    width:"600px",height:"360px",
    h_photo:"100px"
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="465px";    
    fm_ob.h_photo="50px";
  }

  var fm_layout=
    '<div style="width:100%;height:100%;text-align:left;padding:5px;background:white;">'+
    
      '<input id="tx_usercode" type="text" style="display:none;" />'+
    
      '<div class="cls_fm_dtl">'+
        '<div>Username:'+
          '<input id="lu_usercode" type="image" src="../../gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;do_lu_admin&quot;,&quot;LOOKUP&quot;,DB_ADMIN,&quot;usercode&quot;,&quot;username&quot;)" />'+
        '</div>'+
        '<input id="tx_username" type="text" data-caption="Username" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_userid.id).focus()" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div>User ID:</div>'+
        '<input id="tx_userid" type="text" data-caption="Username" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_pword.id).focus()" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div>Password:</div>'+
        '<input id="tx_pword" type="text" data-caption="Password" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_pword.id).focus()" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div>User Type:</div>'+        
        '<input id="tx_usertype" type="text" data-caption="User Type" value=0 />'+                
        '<select id="tx_usertype_name" name="tx_usertype_name" value=5 onchange="chg_usertype(tx_usertype.id,this.value)">'+        
          '<option value=0>Supervisor</option>'+
          '<option value=5>Administrator</option>'+
        '</select>'+
      '</div>'+

      '<input type="file" id="inpfile_admin" data-orig="" data-sel=0 name="inpfile_admin" value="" hidden="hidden" />'+
      '<input id="tx_admin_photo" type="text" data-caption="Photo" style="display:none;" value="" />'+          
      '<div class="cls_fm_dtl" style="height:'+fm_ob.h_photo+';">'+
        '<div style="height:25px;">Photo:'+
          '<input id="lu_admin_photo" type="image" style="height:100%;background:dimgray;" src="../../gfx/jcam.png" onclick="JBE_PICK_IMAGE(0,inpfile_admin.id,img_fm_admin.id,&quot;put_Img_admin&quot;)">'+
        '</div>'+
        '<p>'+
          '<img id="img_fm_admin" data-img="" name="img_fm_admin" src="../../gfx/avatar.png" style="height:100%;width:auto;border:1px solid gray;"/>'+          
        '</p>'+   
      '</div>'+  
      
    '</div>';

  FM_FUNC={
    lu:"do_lu_admin",
    look:"do_look_admin",
    init:"do_init_admin",
    add:"do_add_admin",
    edit:"do_edit_admin",    
    del:"do_del_admin",
    disp:"do_disp_admin",
    save:"do_save_admin",
    cancel:"do_cancel_admin"
  }
  FM_MAIN(fm_ob,fm_layout);
}

function chg_usertype(div,fld){
  document.getElementById(div).value=fld;
}

function put_Img_admin(){
  var vimg=document.getElementById('img_fm_admin').getAttribute('data-img');  
  document.getElementById('tx_admin_photo').value=vimg;
}

//
function do_lu_admin(fld,val){
  if(fld=='usercode'){ FM_DISP_REC(val); }
  do_look_admin(fld);
}
//
function do_init_admin(){
  document.getElementById('lu_admin_photo').style.pointerEvents='none';
  document.getElementById('lu_admin_photo').style.opacity='0.5';

  document.getElementById('tx_userid').value='';
  document.getElementById('lu_usercode').disabled=false;
  document.getElementById('lu_usercode').style.opacity='1';

  document.getElementById('img_fm_admin').src='../../gfx/avatar.png';
}
//
function do_add_admin(){
  document.getElementById('tx_usertype').value=5;
  document.getElementById('tx_usertype_name').value=5;

  document.getElementById('img_fm_admin').src='../../gfx/avatar.png';
  document.getElementById('lu_admin_photo').style.pointerEvents='auto';
  document.getElementById('lu_admin_photo').style.opacity='1';
  
  document.getElementById('tx_username').focus();
}
//edit
function do_edit_admin(stat){
  if(stat==1){    
    //return true;
  }
  
  document.getElementById('lu_admin_photo').style.pointerEvents='auto';
  document.getElementById('lu_admin_photo').style.opacity='1';

  document.getElementById('lu_usercode').disabled=true;
  document.getElementById('lu_usercode').style.opacity='0.5';

  document.getElementById('tx_username').focus();

  if(stat==2){
    
  }
}
//look
function do_look_admin(fld){
  if(fld=='usercode'){ 
    do_disp_admin(0);
    do_disp_admin(1);
  }
}
//del
function do_del_admin(stat,r){
  if(stat==1){
    var rval=0;
    var watcherno=document.getElementById('tx_usercode').value;
    for(var i=0;i<DB_TRAN_VOTES.length;i++){
      if(DB_TRAN_VOTES[i]['watcherno']==watcherno){
        rval+=parseInt(DB_TRAN_VOTES[i]['votes']);
      }
    }
    if(rval > 0){
      snackBar('ERROR: Record Exist in Voting Database');
      return false;
    }else{
      return true;
    }
  }
  if(stat==2){ DB_ADMIN=r; } 
}
//save
function do_save_admin(stat,r){
  if(stat==1){
    var rval=0;
    var watcherno=document.getElementById('tx_usercode').value;
    for(var i=0;i<DB_TRAN_VOTES.length;i++){
      if(DB_TRAN_VOTES[i]['watcherno']==watcherno){
        rval+=parseInt(DB_TRAN_VOTES[i]['votes']);
      }
    }
    if(rval > 0 && orec != rec){
      snackBar('ERROR: Edit Not Allowed. This Record Exist in Voting Database');
      FM_CANCEL();
      return false;
    }else{
      return true;
    }
  }
  if(stat==2){
    DB_ADMIN=r;        
    var recno=document.getElementById('tx_usercode').value;    
    var targetDIR=JBE_API+'upload/users/';
    var newName = recno.trim() + '.jpg';
    if(THISFILE[0]){     
      let ob = [
        { "div":"img_fm_admin" }
      ];    
      uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
    }  
  }
}
//disp
function do_disp_admin(disp_mode){
  if(disp_mode==0){
    document.getElementById('tx_usertype_name').value=parseInt(document.getElementById('tx_usertype').value);

    document.getElementById('lu_usercode').disabled=false;
    document.getElementById('lu_usercode').style.opacity='1';  

    document.getElementById('lu_admin_photo').style.pointerEvents='none';
    document.getElementById('lu_admin_photo').style.opacity='0.5';
  }else if(disp_mode==1){  
    recno=document.getElementById('tx_usercode').value;
    var n = new Date().toLocaleTimeString('it-IT');  
    var vimg=JBE_API+'upload/users/'+recno.trim()+'.jpg';
    document.getElementById('img_fm_admin').setAttribute('data-img',vimg);
    document.getElementById('img_fm_admin').src=vimg;+'?'+n;
    //alert(n);
  }
  
}
