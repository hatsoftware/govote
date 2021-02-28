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
        { div:"tx_candi_partyname", fld:"partyname", disp:2, save:false  }
    
  ];
  FM_LK_OB[0]=[
    { div:"tx_candi_no", fld:"code" },
    { div:"tx_candi_lname", fld:"lname" },
    { div:"tx_candi_fname", fld:"fname" },

    { div:"tx_candi_photo", fld:"photo" },
    { div:"tx_candi_pos", fld:"pos" },
    { div:"tx_candi_partyno", fld:"partyno" },
  ];
  
  var fm_ob = {
    title:"CANDIDATE MASTER FILE",
    top:"", left:"", bottom:"10%", right:"5%",
    width:"600px",height:"380px"
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
        '<input id="lu_candi_no" type="image" src="gfx/jsearch.png" onclick="FM_OPEN_LOOKUP(0,tx_candi_lname,&quot;code&quot;,DB_CANDIDATE,FM_LK_OB[0])" style="float:left;width:auto;height:100%;padding:2px;margin-right:0.5%;border:1px solid gray;"/>'+
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
          '<input id="tx_candi_photoname" type="text" data-caption="Photo" style="display:none;" value="" />'+
          '<img src="gfx/jcam.png" onclick="JBE_PICK_IMAGE(0,inpfile.id,img_eavatar.id,&quot;putImg&quot;)" style="width:100%;"/>'+
        '</div>'+

        '<div style="float:left;width:70%;height:100%;padding:2px;text-align:center;border:1px solid lightgray;">'+
          '<img id="img_eavatar" data-img="" name="img_eavatar" src="gfx/avatar.png" style="height:100%;width:auto;border:1px solid gray;"/>'+          
        '</div>'+   

      '</div>'+  
      
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
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
function do_lu_candi(p){  
  //alert(p);
  if(p==0){    
    var xdb=DB_CANDIDATE;
    xdb.sort(sortByMultipleKey(['lname','fname']));  
    FM_LU_DB[0]=[];
    for(var i=0;i<xdb.length;i++){
      FM_LU_DB[0][i]=xdb[i]['lname']+', '+xdb[i]['fname']+', '+xdb[i]['code'];
    }
  }
  return FM_LU_DB[p];
}
//
function do_init_candi(){  
  document.getElementById('tx_candi_no').value='';
  document.getElementById('lu_candi_no').disabled=false;
  document.getElementById('lu_candi_no').style.opacity='1';
  document.getElementById('lu_candi_photo').style.pointerEvents='none';
  document.getElementById('lu_candi_photo').style.opacity='0.5';

  document.getElementById('img_eavatar').src='gfx/avatar.png';
  
}
//
function do_add_candi(){
  document.getElementById('img_eavatar').src='gfx/avatar.png';
  document.getElementById('lu_candi_no').disabled=true;
  document.getElementById('lu_candi_no').style.opacity='0.5';

  document.getElementById('lu_candi_photo').style.pointerEvents='auto';
  document.getElementById('lu_candi_photo').style.opacity='1';

  document.getElementById('tx_candi_posname').disabled=false;
  document.getElementById('tx_candi_partyname').disabled=false;
  
  document.getElementById('tx_candi_no').focus();
}
//edit
function do_edit_candi(){
  //document.getElementById('lu_brgyCode').disabled=false;
  //document.getElementById('lu_brgyCode').style.opacity='1';
  document.getElementById('lu_candi_no').disabled=true;
  document.getElementById('lu_candi_no').style.opacity='0.5';

  document.getElementById('lu_candi_photo').style.pointerEvents='auto';
  document.getElementById('lu_candi_photo').style.opacity='1';

  document.getElementById('tx_candi_posname').disabled=false;
  document.getElementById('tx_candi_partyname').disabled=false;

  document.getElementById('tx_candi_lname').focus();
}
//look
function do_look_candi(){
  //do_disp_watcher();
  //document.getElementById('lu_brgyCode').disabled=false;
  //document.getElementById('lu_brgyCode').style.opacity='1';
  return;
}
//del
function do_del_candi(r){
  DB_CANDIDATE=r;  
}
//save
function do_save_candi(r){
  var recno=document.getElementById('FM_HEAD').getAttribute('data-recno');
  //alert('FM_HEAD recno '+recno);
  
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
//disp
function do_disp_candi(recno){   
  var n = new Date().toLocaleTimeString('it-IT');  
  recno=document.getElementById('tx_candi_no').value;
  var vimg=JBE_API+'upload/photo/'+recno.trim()+'.jpg';
  //alert(vimg);
  document.getElementById('lu_candi_no').disabled=false;
  document.getElementById('lu_candi_no').style.opacity='1';  
  document.getElementById('img_eavatar').src=vimg;
  
  document.getElementById('tx_candi_posname').value=document.getElementById('tx_candi_pos').value;
  document.getElementById('tx_candi_partyname').value=document.getElementById('tx_candi_partyno').value;

  document.getElementById('lu_candi_photo').style.pointerEvents='none';
  document.getElementById('lu_candi_photo').style.opacity='0.5';
}


//################################################################################################################
function do_fm_cluster(){     
  FM_TABLE=DB_CLUSTER;    
  FM_AXIOS_PHP=JBE_API+"z_cluster.php";
  FM_FIELDS=[ //display on screen
    { div:"tx_clusterno", fld:"clusterno", disp:1, save:true },
    { div:"tx_clustername", fld:"clustername", disp:1, save:true  },
    { div:"tx_precincts", fld:"precincts", disp:1, save:true  },

    { div:"tx_brgyCode", fld:"brgyCode", disp:0, save:true  }, 
        { div:"tx_brgyName", fld:"brgyName", disp:2, save:false  },

    { div:"tx_citymunCode", fld:"citymunCode", disp:0, save:true  }, 
        { div:"tx_cityName", fld:"cityName", disp:2, save:false  },

    { div:"tx_provCode", fld:"provCode", disp:0, save:true  }, 
        { div:"tx_provName", fld:"provName", disp:2, save:false  },

    { div:"tx_regCode", fld:"regCode", disp:0, save:true  },   
        { div:"tx_regName", fld:"regName", disp:2, save:false  }
  ];

  FM_LK_OB[0]=[
    { div:"tx_clusterno", fld:"clusterno" },
    { div:"tx_clustername", fld:"clustername" },
    { div:"tx_precincts", fld:"precincts" },
    { div:"tx_brgyCode", fld:"brgyCode" },  
    { div:"tx_citymunCode", fld:"citymunCode" },  
    { div:"tx_provCode", fld:"provCode" },  
    { div:"tx_regCode", fld:"regCode" }
  ];

  FM_LK_OB[1]=[
    { div:"tx_brgyCode", fld:"brgyCode" },  
    { div:"tx_citymunCode", fld:"citymunCode" },  
    { div:"tx_provCode", fld:"provCode" },  
    { div:"tx_regCode", fld:"regCode" }
  ];
  
  var fm_ob = {
    title:"CLUSTER MASTER FILE",
    top:"10%", left:"", bottom:"", right:"10%",
    width:"600px",height:"360px"
  };  
 
  if(JBE_MOBILE){ 
    fm_ob.width="300px"; 
    fm_ob.height="350px";
    fm_ob.right="5px";  
    fm_ob.top="30px"; 
  }
    
  var fm_layout=
    '<div style="width:100%;height:100%;text-align:left;padding:5px;background:white;">'+

      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:25%;height:100%;padding:5px;">Code:</div>'+
        '<input id="lu_clusterno" type="image" src="gfx/jsearch.png" onclick="FM_OPEN_LOOKUP(0,tx_clustername,&quot;clusterno&quot;,DB_CLUSTER,FM_LK_OB[0])" style="float:left;width:auto;height:100%;padding:2px;margin-right:0.5%;border:1px solid gray;"/>'+
        '<input id="tx_clusterno" type="text" data-caption="Cluster No." onchange="FM_CHK_REC(this.value,&quot;do_disp_cluster&quot;)" style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_clustername.id).focus()" />'+
      '</div>'+
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">Cluster Name:</div>'+
        '<input id="tx_clustername" type="text" data-caption="Cluster Name." style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_precincts.id).focus()" />'+
      '</div>'+
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">Precincts:</div>'+
        '<input id="tx_precincts" type="text" data-caption="Precincts" style="float:left;width:70%;height:100%;" value="" />'+
      '</div>'+

      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:25%;height:100%;padding:5px;">Barangay:</div>'+
        '<input id="lu_brgyCode" type="image" src="gfx/jsearch.png" onclick="FM_OPEN_LOOKUP(1,tx_brgyName,&quot;brgyCode&quot;,ref_brgy,FM_LK_OB[1])" style="float:left;height:100%;padding:2px;margin-right:0.5%;opacity:0.5;border:1px solid gray;"/>'+          
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
      
    '</div>';
      
  FM_FUNC={
    lu:"do_lu_cluster",
    look:"do_look_cluster",
    init:"do_init_cluster",
    add:"do_add_cluster",
    edit:"do_edit_cluster",
    del:"do_del_cluster",
    disp:"do_disp_cluster",
    save:"do_save_cluster"
  }
  FM_MAIN(fm_ob,fm_layout);
}

function do_lu_cluster(p){  
  //alert(p);
  if(p==0){    
    var xdb=DB_CLUSTER;  
    FM_LU_DB[0]=[];
    for(var i=0;i<xdb.length;i++){
      FM_LU_DB[0][i]=xdb[i]['clustername']+', '+xdb[i]['precincts']+', '+xdb[i]['clusterno'];
    }
  }
  if(p==1){ 
    var xdb=ref_brgy;  
    FM_LU_DB[1]=[];
    for(var i=0;i<xdb.length;i++){
      FM_LU_DB[1][i]=xdb[i]['brgyDesc']+', '+lgetCityByCode(xdb[i]['citymunCode'])[0].citymunDesc+', '+ 
      lgetProvByCode(xdb[i]['provCode'])[0].provDesc+', '+xdb[i]['brgyCode'];  
    }    
  }

  return FM_LU_DB[p];
}
//
function do_init_cluster(){  
  document.getElementById('lu_brgyCode').disabled=true;
  document.getElementById('lu_brgyCode').style.opacity='0.5';
  document.getElementById('tx_clusterno').value='';
  document.getElementById('lu_clusterno').disabled=false;
  document.getElementById('lu_clusterno').style.opacity='1';
}
//
function do_add_cluster(){
  document.getElementById('lu_brgyCode').disabled=false;
  document.getElementById('lu_brgyCode').style.opacity='1';
  document.getElementById('tx_clusterno').focus();
}
//edit
function do_edit_cluster(){
  document.getElementById('lu_brgyCode').disabled=false;
  document.getElementById('lu_brgyCode').style.opacity='1';
  document.getElementById('lu_clusterno').disabled=true;
  document.getElementById('lu_clusterno').style.opacity='0.5';
  document.getElementById('tx_clustername').focus();
}
//look
function do_look_cluster(){
  do_disp_cluster();
  document.getElementById('lu_brgyCode').disabled=false;
  document.getElementById('lu_brgyCode').style.opacity='1';
}
//del
function do_del_cluster(r){
  DB_CLUSTER=r;  
}
//save
function do_save_cluster(r){
  DB_CLUSTER=r;  
}
//disp
function do_disp_cluster(recno,f_main_disp){  
  var vbrgyCode=document.getElementById('tx_brgyCode').value;     
  var aryDB=JBE_GETARRY(ref_brgy,'brgyCode',vbrgyCode);
    
  document.getElementById('tx_brgyName').value = JBE_GETFLD('brgyDesc',ref_brgy,'brgyCode',aryDB['brgyCode']);
  document.getElementById('tx_cityName').value = JBE_GETFLD('citymunDesc',ref_city,'citymunCode',aryDB['citymunCode']);
  document.getElementById('tx_provName').value = JBE_GETFLD('provDesc',ref_prov,'provCode',aryDB['provCode']);
  document.getElementById('tx_regName').value = JBE_GETFLD('regCode',ref_prov,'provCode',aryDB['provCode']);
  
  document.getElementById('lu_brgyCode').disabled=true;
  document.getElementById('lu_brgyCode').style.opacity='0.5';
  document.getElementById('lu_clusterno').disabled=false;
  document.getElementById('lu_clusterno').style.opacity='1';  

  if(!f_main_disp){
    document.getElementById('lu_brgyCode').disabled=false;
    document.getElementById('lu_brgyCode').style.opacity='1';
    document.getElementById('lu_clusterno').disabled=true;
    document.getElementById('lu_clusterno').style.opacity='0.5';  
  }
}

//################################################################################################################

function do_fm_watcher(){    
  FM_TABLE=DB_USER;
  FM_AXIOS_PHP=JBE_API+"z_user.php";
  FM_FIELDS=[ //display on screen
    { div:"tx_usercode", fld:"usercode", disp:1, save:true  },
    { div:"tx_username", fld:"username", disp:1, save:true  },
    { div:"tx_userid", fld:"userid", disp:1, save:true },
    { div:"tx_pword", fld:"pword", disp:1, save:true },
    { div:"tx_clusterno_watcher", fld:"clusterno", disp:2, save:true },
        { div:"tx_clustername_watcher", fld:"clustername", disp:2, save:false },    

        { div:"tx_brgyName", fld:"", disp:2, save:false },
        { div:"tx_cityName", fld:"", disp:2, save:false },
        { div:"tx_provName", fld:"", disp:2, save:false },
        { div:"tx_regName", fld:"", disp:2, save:false }
  ];
  FM_LK_OB[0]=[
    { div:"tx_usercode", fld:"usercode" },
    { div:"tx_username", fld:"username" },
    { div:"tx_userid", fld:"userid" },
    { div:"tx_pword", fld:"pword" },
    { div:"tx_clusterno_watcher", fld:"clusterno" }
  ];
  FM_LK_OB[1]=[
    { div:"tx_clusterno_watcher", fld:"clusterno" },
    { div:"tx_clustername_watcher", fld:"clustername" }
  ];
  
  var fm_ob = {
    title:"WATCHER File Maintenance",
    top:"", left:"", bottom:"20%", right:"5%",
    width:"600px",height:"500px"
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="300px"; 
    fm_ob.height="400px";
    fm_ob.right="5px";  
    fm_ob.top="30px"; 
  }

  var fm_layout=
    '<div style="width:100%;height:100%;text-align:left;padding:5px;background:white;">'+      
            
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:25%;height:100%;padding:5px;">User Code:</div>'+
        '<input id="lu_usercode" type="image" src="gfx/jsearch.png" onclick="FM_OPEN_LOOKUP(0,tx_username,&quot;usercode&quot;,DB_USER,FM_LK_OB[0])" style="float:left;width:auto;height:100%;padding:2px;margin-right:0.5%;border:1px solid gray;"/>'+
        '<input id="tx_usercode" type="text" data-caption="User Code" onchange="FM_CHK_REC(this.value,&quot;do_disp_watcher&quot;)" style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_username.id).focus()" />'+
      '</div>'+     
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">Username:</div>'+
        '<input id="tx_username" type="text" data-caption="Username" style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_userid.id).focus()" />'+
      '</div>'+
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">User ID:</div>'+
        '<input id="tx_userid" type="text" data-caption="Username" style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_pword.id).focus()" />'+
      '</div>'+
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">Password:</div>'+
        '<input id="tx_pword" type="text" data-caption="Password" style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_pword.id).focus()" />'+
      '</div>'+

      '<div style="margin-top:20px;width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:25%;height:100%;padding:5px;">Cluster No.:</div>'+
        '<input id="lu_clusterno_watcher" type="image" src="gfx/jsearch.png" onclick="FM_OPEN_LOOKUP(1,tx_clusterno_watcher,&quot;clusterno&quot;,DB_CLUSTER,FM_LK_OB[1])" style="float:left;width:auto;height:100%;padding:2px;margin-right:0.5%;border:1px solid gray;"/>'+
        '<input id="tx_clusterno_watcher" type="text" onchange="alert(this.value)" data-caption="Cluster" style="float:left;width:70%;height:100%;" value="" />'+
      '</div>'+
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">Cluster Name:</div>'+
        '<input id="tx_clustername_watcher" type="text" data-caption="Cluster" style="float:left;width:70%;height:100%;" value="" />'+
      '</div>'+

      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">Barangay:</div>'+
        '<input id="tx_brgyName" type="text" data-caption="" style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_pword.id).focus()" />'+
      '</div>'+
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">Municipal/City:</div>'+
        '<input id="tx_cityName" type="text" data-caption="" style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_pword.id).focus()" />'+
      '</div>'+
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">Province:</div>'+
        '<input id="tx_provName" type="text" data-caption="" style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_pword.id).focus()" />'+
      '</div>'+
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">Region:</div>'+
        '<input id="tx_regName" type="text" data-caption="" style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_pword.id).focus()" />'+
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
    save:"do_save_watcher"
  }
  FM_MAIN(fm_ob,fm_layout);
}

//
function do_lu_watcher(p){  
  //alert(p);
  if(p==0){    
    var xdb=DB_USER;
    FM_LU_DB[0]=[];
    for(var i=0;i<xdb.length;i++){
      FM_LU_DB[0][i]=xdb[i]['username']+', '+xdb[i]['userid']+', '+xdb[i]['usercode'];
    }
  }
  if(p==1){    
    var xdb=DB_CLUSTER;
    FM_LU_DB[1]=[];
    for(var i=0;i<xdb.length;i++){
      FM_LU_DB[1][i]=xdb[i]['clustername']+', '+xdb[i]['clusterno'];
    }
  }
  return FM_LU_DB[p];
}
//
function do_init_watcher(){  
  document.getElementById('lu_clusterno_watcher').disabled=true;
  document.getElementById('lu_clusterno_watcher').style.opacity='0.5';

  document.getElementById('tx_userid').value='';
  document.getElementById('lu_usercode').disabled=false;
  document.getElementById('lu_usercode').style.opacity='1';
}
//
function do_add_watcher(){
  var vDate=new Date();  
  var vTime = vDate.toLocaleTimeString('it-IT'); 
  vDate = new Date(vDate.getTime() - (vDate.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];  
  var usercode='U_'+vDate+'_'+vTime;
  usercode = usercode.replace(/-/g, "").replace(/:/g, "").replace("T", "-");   

  document.getElementById('lu_clusterno_watcher').disabled=false;
  document.getElementById('lu_clusterno_watcher').style.opacity='1';

  document.getElementById('tx_usercode').value=usercode;
  document.getElementById('tx_usercode').disabled=true;
  document.getElementById('lu_usercode').disabled=true;
  document.getElementById('lu_usercode').style.opacity='0.5';  
  document.getElementById('tx_username').focus();
}
//edit
function do_edit_watcher(){
  document.getElementById('lu_clusterno_watcher').disabled=false;
  document.getElementById('lu_clusterno_watcher').style.opacity='1';

  document.getElementById('lu_usercode').disabled=true;
  document.getElementById('lu_usercode').style.opacity='0.5';
  document.getElementById('tx_username').focus();
}
//look
function do_look_watcher(){
  //do_disp_watcher();
  //document.getElementById('lu_brgyCode').disabled=false;
  //document.getElementById('lu_brgyCode').style.opacity='1';
  return;
}
//del
function do_del_watcher(r){
  DB_USER=r;  
}
//save
function do_save_watcher(r){
  DB_USER=r;  
}
//disp
function do_disp_watcher(recno,f_main_disp){ 
  //display details from cluster  
  var vclusterno=document.getElementById('tx_clusterno_watcher').value;   
  var aryDB=JBE_GETARRY(DB_CLUSTER,'clusterno',vclusterno);
  
  document.getElementById('tx_clustername_watcher').value = JBE_GETFLD('clustername',DB_CLUSTER,'clusterno',vclusterno);
  document.getElementById('tx_brgyName').value = JBE_GETFLD('brgyDesc',ref_brgy,'brgyCode',aryDB['brgyCode']);
  document.getElementById('tx_cityName').value = JBE_GETFLD('citymunDesc',ref_city,'citymunCode',aryDB['citymunCode']);
  document.getElementById('tx_provName').value = JBE_GETFLD('provDesc',ref_prov,'provCode',aryDB['provCode']);
  document.getElementById('tx_regName').value = JBE_GETFLD('regCode',ref_prov,'provCode',aryDB['provCode']);
  
  document.getElementById('lu_clusterno_watcher').disabled=true; 
  document.getElementById('lu_clusterno_watcher').style.opacity='0.5';
  document.getElementById('lu_usercode').disabled=false;
  document.getElementById('lu_usercode').style.opacity='1';  
  if(!f_main_disp){
    document.getElementById('lu_clusterno_watcher').disabled=false; 
    document.getElementById('lu_clusterno_watcher').style.opacity='1';
    document.getElementById('lu_usercode').disabled=true;
    document.getElementById('lu_usercode').style.opacity='0.5';  
  }
}


//################################################################################################################
var FM_DIS_DB=[];
function do_fm_district(){    
  FM_TABLE=DB_DISTRICT;
  var rref_city=ref_city;
  rref_city.sort(sortByMultipleKey(['citymunDesc']));  

  FM_AXIOS_PHP=JBE_API+"z_district.php";
  FM_FIELDS=[ //display on screen
    { div:"tx_disCode", fld:"disCode", disp:1, save:true  },
    { div:"tx_disDesc", fld:"disDesc", disp:1, save:true  }
  ];
  FM_LK_OB[0]=[];
  FM_LK_OB[1]=[];

  
  var vcode='';
  if(DB_DISTRICT.length > 0){ vcode=DB_DISTRICT[0]['disCode']; }
  
  var fm_ob = {
    title:"District File Maintenance",
    top:"", left:"", bottom:"20%", right:"5%",
    width:"500px",height:"500px"
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="300px"; 
    fm_ob.height="400px";
    fm_ob.right="5px";  
    fm_ob.top="30px"; 
  }

  
  
  var fm_layout=
    '<div style="width:100%;height:100%;text-align:left;padding:5px;background:white;">'+      
            
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">District Code:</div>'+        
        '<input id="tx_disCode" type="text" data-caption="District Code" onchange="FM_CHK_REC(this.value,&quot;do_disp_district&quot;)" style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_disname.id).focus()" />'+
      '</div>'+     
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">District Name:</div>'+
        '<input id="tx_disDesc" type="text" data-caption="District Name" style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_userid.id).focus()" />'+
      '</div>'+

      '<div id="dv_dis_dtl" data-disCode="'+vcode+'" style="width:100%;height:300px;margin-top:5px;padding:2px;border:0px solid lightgray;">'+        

        '<div style="width:100%;height:30px;padding:2px;border:1px solid lightgray;">'+  
          '<select id="sel_citymun" name="sel_citymun" value="" onchange="chg_addDistrict(this)" style="float:right;width:60%;height:100%;font-size:11px;padding:0px;">';
            var sel_dtl='<option value=""> - Click here to Add - </option>';
            for(var i=0;i<rref_city.length;i++){
              var pos_provCode=rref_city[i]["provCode"];
              var pos_code=rref_city[i]["citymunCode"];
              var pos_descrp=rref_city[i]["citymunDesc"].trim()+', '+JBE_GETFLD('provDesc',ref_prov,'provCode',pos_provCode);
              
              sel_dtl+='<option value="'+pos_code+'">'+pos_descrp+'</option>';
            }
            fm_layout+=sel_dtl+
          '</select>'+
        '</div>'+
        '<div style="width:100%;height:200px;padding:2px;border:1px solid lightgray;">'+        
          '<div id="dtl_dis" style="float:left;width:100%;height:100%;padding:2px;border:0px solid lightgray;overflow:auto;">'+ 
          //dtl       
          '</div>'+          
        '</div>'+

      '</div>'+
      
    '</div>';

  FM_FUNC={
    lu:"do_lu_district",
    look:"do_look_district",
    init:"do_init_district",
    add:"do_add_district",
    edit:"do_edit_district",
    del:"do_del_district",
    disp:"do_disp_district",
    save:"do_save_district",
    cancel:"do_cancel_district"
  }
  FM_MAIN(fm_ob,fm_layout);
  init_db_dis();
}

function init_db_dis(){
  FM_DIS_DB=[];
  var disCode=document.getElementById('tx_disCode').value;
  var ctr=0;
  for(var i=0;i<ref_city.length;i++){
    if(ref_city[i]['disCode'] != disCode){ continue; }

    let ob={       
      "disCode":disCode,
      "citymunCode":ref_city[i]['citymunCode'],
      "citymunDesc":ref_city[i]['citymunDesc'], 
      "provCode":ref_city[i]['provCode'],
      "regCode":ref_city[i]['regCode']
    };

    FM_DIS_DB[ctr]=ob;    
    ctr++;
  }
  disp_dis_dtl();
}


function chk_dis_item(citymunCode){
  var rval = -1;
  for(var i=0;i<FM_DIS_DB.length;i++){
    if(FM_DIS_DB[i]['citymunCode']==citymunCode){
      rval=i;
      break;
    }
  }
  return rval;
}
function chg_addDistrict(sel){  
  var disCode=document.getElementById('tx_disCode').value;
  if(document.getElementById('tx_disCode').value.trim().length==0){ 
    document.getElementById('sel_citymun').value='';
    document.getElementById('tx_disCode').focus();     
    return;
  }
  var code=sel.value;
  var desc=sel.options[sel.selectedIndex].text;  
  document.getElementById('sel_citymun').value='';
  //f_exist=JSON.stringify(FM_DIS_DB).includes(code); 
  var x = chk_dis_item(code);
  if(x != -1){ 
    if(FM_DIS_DB[x]['disCode']==''){
      //alert('ok kalbo');
      FM_DIS_DB[x]['disCode']=disCode;
      //alert('ok na: '+FM_DIS_DB[x]['disCode']);
      disp_dis_dtl();
      return;    
    }else{
      //alert(FM_DIS_DB[x]['disCode']);
      snackBar('ERROR: Item Already Exist...');
      return;
    }
  }
  let ob={       
    "disCode":disCode,
    "citymunCode":code,
    "citymunDesc":desc
  };
  FM_DIS_DB.push(ob);  
  disp_dis_dtl();
}
//
function disp_dis_dtl(){  
  var aryDB=FM_DIS_DB;
  //alert(FM_DIS_DB.length);
  aryDB.sort(sortByMultipleKey(['citymunDesc']));  
  var dtl='';
  for(var i=0;i<FM_DIS_DB.length;i++){
    if(!FM_DIS_DB[i]['disCode']){ continue; }
    var citymunCode=FM_DIS_DB[i]['citymunCode'];
    var citymunDesc=FM_DIS_DB[i]['citymunDesc'];
    var provCode=FM_DIS_DB[i]['provCode'];
    var provDesc=JBE_GETFLD('provDesc',ref_prov,'provCode',provCode);
    dtl+=
    '<div id="dis_add'+i+'" data-recno="'+citymunCode+'" style="width:100%;height:30px;border:1px solid gray;padding:2px;margin-bottom:2px;">'+
      '<div style="float:left;width:80%;height:100%;padding:5px;">'+FM_DIS_DB[i]['citymunDesc']+', '+provDesc+'</div>'+
      '<input type="button" value="X" onclick="del_dis_dtl('+i+',&quot;'+citymunCode+'&quot;,&quot;'+citymunDesc+'&quot;)" style="float:right;height:100%;" />'+
    '</div>';
  }
  document.getElementById('dtl_dis').innerHTML=dtl;
}
//
function del_dis_dtl(i){
  MSG_SHOW(vbYesNo,"CONFIRM:","Are you sure to DELETE this Item?", function(){

    FM_DIS_DB[i]['disCode']='';
    disp_dis_dtl();

    },function(){}
  );    
}
//
function do_lu_district(p){  
  return;
}
//
function do_init_district(){  
  var disCode='';
  document.getElementById('FM_ADD_BTN').style.pointerEvents='auto';
  document.getElementById('FM_ADD_BTN').style.opacity='1';  

  document.getElementById('dv_dis_dtl').style.pointerEvents='none';
  
  if(DB_DISTRICT.length != 0){
    disCode=DB_DISTRICT[0]['disCode'];  
    FM_DISP_REC(disCode);
    document.getElementById('FM_ADD_BTN').style.pointerEvents='none';
    document.getElementById('FM_ADD_BTN').style.opacity='0.5';  
    //document.getElementById('FM_BTNS').setAttribute('data-mode',1);
  }
}
//
function do_add_district(){    
  document.getElementById('dv_dis_dtl').style.pointerEvents='auto';
  document.getElementById('tx_disCode').focus();
}
//edit
function do_edit_district(){
  document.getElementById('dv_dis_dtl').style.pointerEvents='auto';
  document.getElementById('tx_disDesc').focus();
}
//look
function do_look_district(){
  //do_disp_district();
  //document.getElementById('lu_brgyCode').disabled=false;
  //document.getElementById('lu_brgyCode').style.opacity='1';
  return;
}
//del
function do_del_district(r){  
  DB_DISTRICT=r;  
  init_db_dis();
}
//save
function do_save_district(r){
  DB_DISTRICT=r;  

  axios.post(JBE_API+'z_district.php', { clientno:CURR_CLIENT,request: 23,    
    aryItems:JSON.stringify(FM_DIS_DB)
  },JBE_HEADER)
  .then(function (response) {    
    showProgress(false); 
    ref_city=response.data;
    init_db_dis();
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}
//disp
function do_disp_district(recno,f_main_disp){ 
  document.getElementById('FM_ADD_BTN').style.pointerEvents='none';
  document.getElementById('FM_ADD_BTN').style.opacity='0.5';  
  
  document.getElementById('tx_disCode').value = DB_DISTRICT[0]['disCode'];
  document.getElementById('tx_disDesc').value = DB_DISTRICT[0]['disDesc'];
  document.getElementById('FM_CANCEL_BTN').style.display='none';
  document.getElementById('FM_CLOSE_BTN').style.display='block';

  document.getElementById('dv_dis_dtl').style.pointerEvents='none';
  //disp_db_dtl();
  disp_dis_dtl();
}
function do_cancel_district(r){
  init_db_dis();
}