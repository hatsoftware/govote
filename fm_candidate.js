function do_fm_candidate(){         
  FM_TABLE=DB_CANDIDATE;
  FM_AXIOS_PHP=JBE_API+"z_candidate.php";
  FM_FIELDS=[ //display on screen
    { div:"tx_candi_no", fld:"code", disp:1, save:true  },
    { div:"tx_candi_lname", fld:"lname", disp:1, save:true  },
    { div:"tx_candi_fname", fld:"fname", disp:1, save:true  },
    
    { div:"tx_candi_photo", fld:"photo", disp:0, save:true  },

    
    { div:"tx_candi_pos", fld:"pos", disp:0, save:true  },
        { div:"tx_candi_posname", fld:"pos", disp:2, save:false  },

    { div:"tx_candi_partyno", fld:"partyno", disp:0, save:true  },    
        { div:"tx_candi_partyname", fld:"partyname", disp:2, save:false  },
        
    { div:"tx_brgyCode", fld:"brgyCode", disp:0, save:true  }, 
        { div:"tx_brgyName", fld:"brgyName", disp:2, save:false  },

    { div:"tx_citymunCode", fld:"citymunCode", disp:0, save:true  }, 
        { div:"tx_cityName", fld:"cityName", disp:2, save:false  },

    { div:"tx_provCode", fld:"provCode", disp:0, save:true  }, 
        { div:"tx_provName", fld:"provName", disp:2, save:false  },

    { div:"tx_regCode", fld:"regCode", disp:0, save:true  },   
        { div:"tx_regName", fld:"regName", disp:2, save:false  },

  ];

  /*
  FM_LK_OB[0]=[
    { div:"tx_candi_no", fld:"code" },
    { div:"tx_candi_lname", fld:"lname" },
    { div:"tx_candi_fname", fld:"fname" },

    { div:"tx_candi_photo", fld:"photo" },
    { div:"tx_candi_pos", fld:"pos" },
    { div:"tx_candi_partyno", fld:"partyno" },
  ];
  */
  var fm_ob = {
    title:"CANDIDATE MASTER FILE",
    top:"", left:"", bottom:"10%", right:"5%",
    width:"600px",height:"580px"
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="250px"; 
    fm_ob.height="400px";
    fm_ob.right="5px";  
    fm_ob.top="30px"; 
  }
  
  var fm_layout=
    '<div class="cl_item" style="width:100%;height:100%;margin-top:0px;text-align:left;padding:5px;background:white;">'+
      
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:25%;height:100%;padding:5px;">User Code:</div>'+
        '<input id="lu_candi_no" type="image" src="gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;do_lu_candi&quot;,&quot;CANDIDATE&quot;,DB_CANDIDATE,&quot;code&quot;,&quot;name&quot;)" style="float:left;width:auto;height:100%;padding:2px;margin-right:0.5%;border:1px solid gray;"/>'+
        '<input id="tx_candi_no" type="text" data-caption="Candidate Code" onchange="FM_CHK_REC(this.value,&quot;do_disp_candi&quot;)" style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_candi_lname.id).focus()" />'+
      '</div>'+     
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">Last Name:</div>'+
        '<input id="tx_candi_lname" type="text" data-caption="Last Name" style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_candi_fname.id).focus()" />'+
      '</div>'+
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">First Name:</div>'+
        '<input id="tx_candi_fname" type="text" data-caption="First Name" style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_candi_no.id).focus()" />'+
      '</div>'+

      '<div style="width:100%;height:85px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:25%;height:30px;padding:5px;">Photo:</div>'+

        '<div id="lu_candi_photo" style="float:left;pointer-events:none;width:26px;height:25px;cursor:pointer;padding:2px;margin-right:0.5%;border:1px solid gray;background:dimgray;">'+            
          '<input type="file" id="inpfile" data-orig="" data-sel=0 name="inpfile" value="" hidden="hidden" />'+
          '<input id="tx_candi_photo" type="text" data-caption="Photo" style="display:none;" value="" />'+          
          '<img src="gfx/jcam.png" onclick="JBE_PICK_IMAGE(0,inpfile.id,img_eavatar.id,&quot;putImg&quot;)" style="width:100%;"/>'+
        '</div>'+

        '<div style="float:left;width:70%;height:100%;padding:2px;text-align:center;border:1px solid lightgray;">'+
          '<img id="img_eavatar" data-img="" name="img_eavatar" src="gfx/avatar.png" style="height:100%;width:auto;border:1px solid gray;"/>'+          
        '</div>'+   

      '</div>'+  

      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:25%;height:100%;padding:5px;">Barangay:</div>'+
        '<input id="lu_brgyCode_candi" type="image" src="gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;do_lu_candi&quot;,&quot;BARANGAY&quot;,ref_brgy,&quot;brgyCode&quot;,&quot;brgyDesc&quot;,ref_city,&quot;citymunCode&quot;,&quot;citymunDesc&quot;)" style="float:left;height:100%;padding:2px;margin-right:0.5%;opacity:0.5;border:1px solid gray;"/>'+          
        '<input id="tx_brgyCode" type="text" data-caption="Barangay Code" style="display:none;float:left;width:20%;height:100%;" value="" />'+
        '<input id="tx_brgyName" disabled type="text" style="float:left;width:70%;height:100%;" value="" />'+
      '</div>'+
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">Municipal/City:</div>'+
        '<input id="tx_citymunCode" type="text" style="display:none;float:left;width:20%;height:100%;" value="" />'+
        '<input id="tx_cityName" disabled type="text" style="float:left;width:70%;height:100%;" value="" />'+
      '</div>'+
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">Province:</div>'+
        '<input id="tx_provCode" type="text" style="display:none;float:left;width:20%;height:100%;" value="" />'+
        '<input id="tx_provName" disabled type="text" style="float:left;width:70%;height:100%;" value="" />'+
      '</div>'+
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">Region:</div>'+
        '<input id="tx_regCode" type="text" style="display:none;float:left;width:20%;height:100%;" value="" />'+
        '<input id="tx_regName" disabled type="text" style="float:left;width:70%;height:100%;" value="" />'+
      '</div>'+    
      
      '<div style="width:100%;height:30px;margin-top:20px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">Position:</div>'+
        '<input id="tx_candi_pos" type="text" data-caption="Position" style="display:none;" value="" />'+
        '<select id="tx_candi_posname" name="tx_candi_posname" value="" onchange="chg_candi_fld(tx_candi_pos.id,this.value)" style="float:left;width:70%;height:100%;font-size:11px;padding:0px;">';
          var sel_dtl='';
          for(var i=0;i<DB_POSITION.length;i++){
            var pos_code=DB_POSITION[i]["pos"];
            var pos_descrp=DB_POSITION[i]["descrp"];
            sel_dtl+='<option value="'+pos_code+'">'+pos_descrp+'</option>';
          }
          fm_layout+=sel_dtl+
        '</select>'+
      '</div>'+

      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">Political Party:</div>'+
        '<input id="tx_candi_partyno" type="text" data-caption="Political Party" style="display:none;" value="" />'+
        '<select id="tx_candi_partyname" name="tx_candi_partyname" value="" onchange="chg_candi_fld(tx_candi_partyno.id,this.value)" style="float:left;width:70%;height:100%;font-size:11px;padding:0px;">';
          var sel_dtl2='';
          for(var i=0;i<DB_PARTY.length;i++){
            var partyno=DB_PARTY[i]["partyno"];
            var partyname=DB_PARTY[i]["partyname"];
            sel_dtl2+='<option value="'+partyno+'">'+partyname+'</option>';
          }
          fm_layout+=sel_dtl2+
        '</select>'+        
      '</div>'+

    '</div>';
  
  FM_FUNC={
    lu:"do_lu_candi",
    look:"do_look_candi",
    init:"do_init_candi",
    add:"do_add_candi",
    edit:"do_edit_candi",
    del:"do_del_candi",
    disp:"do_disp_candi",
    save:"do_save_candi"
  }
  FM_MAIN(fm_ob,fm_layout);
}
function chg_candi_fld(div,fld){
  document.getElementById(div).value=fld;
}
function putImg(){
  var vimg=document.getElementById('img_eavatar').getAttribute('data-img');  
  document.getElementById('tx_candi_photo').value=vimg;
}
//
function do_lu_candi(fld,val){
  if(fld=='code'){ FM_DISP_REC(val); }
  else{ document.getElementById('tx_brgyCode').value = val; }
  do_look_candi(fld);
}
//
function do_init_candi(){  
  document.getElementById('tx_candi_no').value='';
  document.getElementById('lu_candi_no').disabled=false;
  document.getElementById('lu_candi_no').style.opacity='1';
  document.getElementById('lu_candi_photo').style.pointerEvents='none';
  document.getElementById('lu_candi_photo').style.opacity='0.5';
  document.getElementById('lu_brgyCode_candi').disabled=true;
  document.getElementById('lu_brgyCode_candi').style.opacity='0.5';

  document.getElementById('img_eavatar').src='gfx/avatar.png';
  
}
//
function do_add_candi(){
  document.getElementById('img_eavatar').src='gfx/avatar.png';
  document.getElementById('lu_candi_no').disabled=true;
  document.getElementById('lu_candi_no').style.opacity='0.5';

  document.getElementById('lu_candi_photo').style.pointerEvents='auto';
  document.getElementById('lu_candi_photo').style.opacity='1';

  document.getElementById('lu_brgyCode_candi').disabled=false;
  document.getElementById('lu_brgyCode_candi').style.opacity='1';

  document.getElementById('tx_candi_posname').disabled=false;
  document.getElementById('tx_candi_partyname').disabled=false;
  
  document.getElementById('tx_candi_no').focus();
}
//edit
function do_edit_candi(){
  //document.getElementById('lu_brgyCode_candi').disabled=false;
  //document.getElementById('lu_brgyCode_candi').style.opacity='1';
  document.getElementById('lu_candi_no').disabled=true;
  document.getElementById('lu_candi_no').style.opacity='0.5';

  document.getElementById('lu_candi_photo').style.pointerEvents='auto';
  document.getElementById('lu_candi_photo').style.opacity='1';

  document.getElementById('lu_brgyCode_candi').disabled=false;
  document.getElementById('lu_brgyCode_candi').style.opacity='1';

  document.getElementById('tx_candi_posname').disabled=false;
  document.getElementById('tx_candi_partyname').disabled=false;

  document.getElementById('tx_candi_lname').focus();
}
//look
function do_look_candi(fld){
  if(fld=='code'){ 
    do_disp_candi(0);
    do_disp_candi(1);
    do_disp_candi(2);
  }else if(fld=='brgyCode'){
    do_disp_candi(2);
  } 
}
//del
function do_del_candi(stat,r){
  if(stat==2){
    DB_CANDIDATE=r;  
  }
}
//save
function do_save_candi(stat,r){
  //var recno=document.getElementById('FM_HEAD').getAttribute('data-recno');
  var recno=document.getElementById('tx_candi_no').value;
  //alert(' recno '+recno);
  if(stat==2){
    var targetDIR=JBE_API+'upload/photo/';
    var newName = recno.trim() + '.jpg';
    if(THISFILE[0]){     
      let ob = [
        { "div":"img_eavatar" }
      ];    
      uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
    }  
    DB_CANDIDATE=r; 
  }
}
//disp
function do_disp_candi(disp_mode){    
  var n = new Date().toLocaleTimeString('it-IT');  
  recno=document.getElementById('tx_candi_no').value;
  if(disp_mode==0){
    document.getElementById('lu_candi_no').disabled=false;
    document.getElementById('lu_candi_no').style.opacity='1';  

    document.getElementById('lu_brgyCode_candi').disabled=true;
    document.getElementById('lu_brgyCode_candi').style.opacity='0.5';
      
    document.getElementById('tx_candi_posname').value=document.getElementById('tx_candi_pos').value;
    document.getElementById('tx_candi_partyname').value=document.getElementById('tx_candi_partyno').value;

    document.getElementById('lu_candi_photo').style.pointerEvents='none';
    document.getElementById('lu_candi_photo').style.opacity='0.5';
  }else if(disp_mode==1){
    var vimg=JBE_API+'upload/photo/'+recno.trim()+'.jpg?'+n;
    document.getElementById('img_eavatar').setAttribute('data-img',vimg);
    document.getElementById('img_eavatar').src=vimg+'?'+n;
  }else if(disp_mode==2){
    var brgyCode=document.getElementById('tx_brgyCode').value;         
    var aryDB=JBE_GETARRY(ref_brgy,'brgyCode',brgyCode);    

    var citymunCode=aryDB['citymunCode'];
    var provCode=aryDB['provCode'];
    var regCode=aryDB['regCode'];

    document.getElementById('tx_brgyCode').value = brgyCode;
    document.getElementById('tx_citymunCode').value = citymunCode;
    document.getElementById('tx_provCode').value = provCode;
    document.getElementById('tx_regCode').value = regCode;

    document.getElementById('tx_brgyName').value = JBE_GETFLD('brgyDesc',ref_brgy,'brgyCode',brgyCode);
    document.getElementById('tx_cityName').value = JBE_GETFLD('citymunDesc',ref_city,'citymunCode',citymunCode);
    document.getElementById('tx_provName').value = JBE_GETFLD('provDesc',ref_prov,'provCode',provCode);
    document.getElementById('tx_regName').value = JBE_GETFLD('regDesc',ref_reg,'regCode',regCode);
  }
}
