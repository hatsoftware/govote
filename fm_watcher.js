function do_fm_watcher(){    
  FM_TABLE=DB_USER;  
  FM_AXIOS_PHP=JBE_API+"z_user.php";
  FM_FIELDS=[ //display on screen
    { div:"tx_usercode", fld:"usercode", disp:-1, save:true  },
    { div:"tx_username", fld:"username", disp:1, save:true  },
    { div:"tx_userid", fld:"userid", disp:1, save:true },
    { div:"tx_pword", fld:"pword", disp:1, save:true },
    { div:"tx_watcher_photo", fld:"photo", disp:0, save:true  },    
   
    { div:"tx_usertype", fld:"usertype", disp:0, save:true  },    
        { div:"tx_usertype_name", fld:"", disp:1, save:false  },

    { div:"tx_clusterno_watcher", fld:"clusterno", disp:0, save:true },
        { div:"tx_clustername_watcher", fld:"", disp:2, save:false },
        { div:"tx_precincts", fld:"", disp:2, save:false },
        { div:"tx_brgyName", fld:"", disp:2, save:false },
        { div:"tx_cityName", fld:"", disp:2, save:false },
        { div:"tx_provName", fld:"", disp:2, save:false },
        { div:"tx_regName", fld:"", disp:2, save:false },

    { div:"tx_brgyCode", fld:"brgyCode", disp:0, save:true }
  ];
  
  var fm_ob = {
    title:"Watchers File Maintenance",
    top:"8%", left:"", bottom:"", right:"5%",
    width:"600px",height:"510px",
    h_photo:"100px"
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="465px";
    fm_ob.right="5px";  
    fm_ob.top="30px"; 
    fm_ob.h_photo="50px";
  }

  var fm_layout=
    '<div style="width:100%;height:100%;text-align:left;padding:5px;background:white;">'+
    
      '<input id="tx_usercode" type="text" style="display:none;" />'+
    
      '<div class="cls_fm_dtl">'+
        '<div>Username:'+
          '<input id="lu_usercode" type="image" src="../../gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;do_lu_watcher&quot;,&quot;CANDIDATE LOOKUP&quot;,DB_USER,&quot;usercode&quot;,&quot;username&quot;)" />'+
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
        '<select id="tx_usertype_name" name="tx_usertype_name" value=0 onchange="chg_usertype(tx_usertype.id,this.value)">'+
        //'<select id="tx_usertype_name" name="tx_usertype_name" disabled value=0>'+
          '<option value=0>Watcher</option>'+
          '<option value=5>Administrator</option>'+
        '</select>'+
      '</div>'+

      '<input type="file" id="inpfile_watcher" data-orig="" data-sel=0 name="inpfile_watcher" value="" hidden="hidden" />'+
      '<input id="tx_watcher_photo" type="text" data-caption="Photo" style="display:none;" value="" />'+          
      '<div class="cls_fm_dtl" style="height:'+fm_ob.h_photo+';">'+
        '<div style="height:25px;">Photo:'+
          '<input id="lu_watcher_photo" type="image" style="height:100%;background:dimgray;" src="../../gfx/jcam.png" onclick="JBE_PICK_IMAGE(0,inpfile_watcher.id,img_watcher.id,&quot;put_Img_watcher&quot;)">'+
        '</div>'+
        '<p>'+
          '<img id="img_watcher" data-img="" name="img_watcher" src="../../gfx/avatar.png" style="height:100%;width:auto;border:1px solid gray;"/>'+          
        '</p>'+   
      '</div>'+  

/*
      '<div class="cls_fm_dtl">'+
        '<div>Cluster No.:'+
          '<input id="lu_clusterno_watcher" type="image" src="gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;do_lu_watcher&quot;,&quot;CLUSTER LOOKUP&quot;,DB_CLUSTER,&quot;clusterno&quot;,&quot;clustername&quot;)" />'+
        '</div>'+
        '<input id="tx_clusterno_watcher" type="text" data-caption="Watcger Code." onchange="FM_CHK_REC(this.value,&quot;do_disp_watcher&quot;)" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_username.id).focus()" />'+
      '</div>'+
      */

      '<div class="cls_fm_dtl">'+
        '<div>Cluster Precinct:'+
          '<input id="tx_clusterno_watcher" type="text" data-caption="Watcher Code." style="display:none;" />'+
          '<input id="lu_clusterno_watcher" type="image" src="../../gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;do_lu_watcher&quot;,&quot;CLUSTER LOOKUP&quot;,DB_CLUSTER,&quot;clusterno&quot;,&quot;clustername&quot;)" />'+
        '</div>'+
        '<input id="tx_clustername_watcher" type="text" data-caption="Cluster" value="" />'+
      '</div>'+
      
      '<div class="cls_fm_dtl">'+
        '<div>Precincts Details:</div>'+
        '<input id="tx_precincts" type="text" data-caption="" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_pword.id).focus()" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div>Barangay:</div>'+
        '<input id="tx_brgyCode" type="text" data-caption="Brgy Code." style="display:none;" />'+
        '<input id="tx_brgyName" type="text" data-caption="" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_pword.id).focus()" />'+
      '</div>'+
      '<div class="cls_fm_dtl">'+
        '<div>Municipal/City:</div>'+
        '<input id="tx_cityName" type="text" data-caption="" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_pword.id).focus()" />'+
      '</div>'+
      '<div class="cls_fm_dtl">'+
        '<div>Province:</div>'+
        '<input id="tx_provName" type="text" data-caption="" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_pword.id).focus()" />'+
      '</div>'+
      '<div class="cls_fm_dtl">'+
        '<div>Region:</div>'+
        '<input id="tx_regName" type="text" data-caption="" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_pword.id).focus()" />'+
      '</div>'+
      
    '</div>';

  FM_FUNC={
    lu:"do_lu_watcher",
    look:"do_look_watcher",
    init:"do_init_watcher",
    add:"do_add_watcher",
    edit:"do_edit_watcher",    
    del:"do_del_watcher",
    disp:"do_disp_watcher",
    save:"do_save_watcher",
    cancel:"do_cancel_watcher"
  }
  FM_MAIN(fm_ob,fm_layout);
}

function chg_usertype(div,fld){
  document.getElementById(div).value=fld;
}

function put_Img_watcher(){
  var vimg=document.getElementById('img_watcher').getAttribute('data-img');  
  document.getElementById('tx_watcher_photo').value=vimg;
}

//
function do_lu_watcher(fld,val){
  if(fld=='usercode'){ FM_DISP_REC(val); }
  else{ document.getElementById('tx_clusterno_watcher').value = val; }
  do_look_watcher(fld);
}
//
function do_init_watcher(){  
  document.getElementById('lu_clusterno_watcher').disabled=true;
  document.getElementById('lu_clusterno_watcher').style.opacity='0.5';

  document.getElementById('lu_watcher_photo').style.pointerEvents='none';
  document.getElementById('lu_watcher_photo').style.opacity='0.5';

  document.getElementById('tx_userid').value='';
  document.getElementById('lu_usercode').disabled=false;
  document.getElementById('lu_usercode').style.opacity='1';

  document.getElementById('img_watcher').src='../../gfx/avatar.png';
}
//
function do_add_watcher(){
  document.getElementById('tx_usertype').value=0;
  
  document.getElementById('lu_clusterno_watcher').disabled=false;
  document.getElementById('lu_clusterno_watcher').style.opacity='1';

  document.getElementById('img_watcher').src='../../gfx/avatar.png';
  document.getElementById('lu_watcher_photo').style.pointerEvents='auto';
  document.getElementById('lu_watcher_photo').style.opacity='1';
  
  document.getElementById('tx_username').focus();
}
//edit
function do_edit_watcher(stat){
  if(stat==1){
    var vclusterno=document.getElementById('tx_clusterno_watcher').value;   
    document.getElementById('tx_clusterno_watcher').setAttribute('data-orec',vclusterno);
    //alert('b4 do_edit_watcher '+vclusterno);
    return true;
  }
  document.getElementById('lu_clusterno_watcher').disabled=false;
  document.getElementById('lu_clusterno_watcher').style.opacity='1';

  document.getElementById('lu_watcher_photo').style.pointerEvents='auto';
  document.getElementById('lu_watcher_photo').style.opacity='1';

  document.getElementById('lu_usercode').disabled=true;
  document.getElementById('lu_usercode').style.opacity='0.5';

  document.getElementById('tx_username').focus();

  if(stat==2){
    //var orec=document.getElementById('tx_clusterno_watcher').getAttribute('data-orec');
    //alert(orec);
    //return true;
  }
}
//look
function do_look_watcher(fld){
  if(fld=='usercode'){ 
    do_disp_watcher(0);
    do_disp_watcher(1);
    do_disp_watcher(2); 
  }else if(fld=='clusterno'){ 
    do_disp_watcher(2);
  }
}
//del
function do_del_watcher(stat,r){
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
  if(stat==2){ DB_USER=r; } 
}
//save
function do_save_watcher(stat,r){
  if(stat==1){
    var orec=document.getElementById('tx_clusterno_watcher').getAttribute('data-orec');
    var rec=document.getElementById('tx_clusterno_watcher').value;
    //alert(orec+' vs '+rec);

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
    DB_USER=r;        
    var recno=document.getElementById('tx_usercode').value;    
    var targetDIR=JBE_API+'upload/users/';
    var newName = recno.trim() + '.jpg';
    if(THISFILE[0]){     
      let ob = [
        { "div":"img_watcher" }
      ];    
      uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
    }  
  }
}
//disp
function do_disp_watcher(disp_mode){   
  var vclusterno=document.getElementById('tx_clusterno_watcher').value;   
  
  if(disp_mode==0){
    document.getElementById('tx_usertype_name').value=parseInt(document.getElementById('tx_usertype').value);

    document.getElementById('lu_clusterno_watcher').disabled=true; 
    document.getElementById('lu_clusterno_watcher').style.opacity='0.5';
    document.getElementById('lu_usercode').disabled=false;
    document.getElementById('lu_usercode').style.opacity='1';  

    document.getElementById('lu_watcher_photo').style.pointerEvents='none';
    document.getElementById('lu_watcher_photo').style.opacity='0.5';
  }else if(disp_mode==1){  
    recno=document.getElementById('tx_usercode').value;
    var n = new Date().toLocaleTimeString('it-IT');  
    var vimg=JBE_API+'upload/users/'+recno.trim()+'.jpg';
    document.getElementById('img_watcher').setAttribute('data-img',vimg);
    document.getElementById('img_watcher').src=vimg;+'?'+n;
    //alert(n);
  }else if(disp_mode==2){        
    var aryDB=JBE_GETARRY(DB_CLUSTER,'clusterno',vclusterno); //last error gabii 
    var brgyCode=aryDB['brgyCode'];
    document.getElementById('tx_clustername_watcher').value = JBE_GETFLD('clustername',DB_CLUSTER,'clusterno',vclusterno);    
    document.getElementById('tx_precincts').value = aryDB['precincts'];
    document.getElementById('tx_brgyCode').value = brgyCode;
    document.getElementById('tx_brgyName').value = JBE_GETFLD('brgyDesc',ref_brgy,'brgyCode',aryDB['brgyCode']);
    document.getElementById('tx_cityName').value = JBE_GETFLD('citymunDesc',ref_city,'citymunCode',aryDB['citymunCode']);
    document.getElementById('tx_provName').value = JBE_GETFLD('provDesc',ref_prov,'provCode',aryDB['provCode']);
    document.getElementById('tx_regName').value = JBE_GETFLD('regCode',ref_prov,'provCode',aryDB['provCode']);
  }
  
}
