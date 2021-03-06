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
/*
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
  */
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
        '<input id="lu_clusterno" type="image" src="gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;do_lu_cluster&quot;,&quot;CLUSTER LOOKUP&quot;,DB_CLUSTER,&quot;clusterno&quot;,&quot;clustername&quot;)" style="float:left;width:auto;height:100%;padding:2px;margin-right:0.5%;border:1px solid gray;"/>'+
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
        '<input id="lu_brgyCode" type="image" src="gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;do_lu_cluster&quot;,&quot;BARANGAY LOOKUP&quot;,ref_brgy,&quot;brgyCode&quot;,&quot;brgyDesc&quot;,ref_city,&quot;citymunCode&quot;,&quot;citymunDesc&quot;)" style="float:left;height:100%;padding:2px;margin-right:0.5%;opacity:0.5;border:1px solid gray;"/>'+          
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

function do_lu_cluster(fld,val){
  if(fld=='clusterno'){ FM_DISP_REC(val); }
  else{ document.getElementById('tx_brgyCode').value = val; }
  do_look_cluster(fld);
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
function do_add_cluster(stat){
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
  return true;
}
//look
function do_look_cluster(fld){
  if(fld=='clusterno'){ 
    do_disp_cluster(0);
    do_disp_cluster(1);
  }else if(fld=='brgyCode'){ 
    do_disp_cluster(1);
  }
}
//del
function do_del_cluster(r){
  DB_CLUSTER=r;  
}
//save
function do_save_cluster(stat,r){
  if(stat==1){ 
    return true;
  }
  if(stat==2){ 
    DB_CLUSTER=r; 
  } 
}
//disp
function do_disp_cluster(disp_mode){    
  if(disp_mode==0){
    document.getElementById('lu_brgyCode').disabled=true;
    document.getElementById('lu_brgyCode').style.opacity='0.5';
    document.getElementById('lu_clusterno').disabled=false;
    document.getElementById('lu_clusterno').style.opacity='1';  
  }else if(disp_mode==1){
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