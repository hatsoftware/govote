function do_fm_cluster(){     
  FM_TABLE=DB_CLUSTER;    
  FM_AXIOS_PHP=JBE_API+"z_cluster.php";
  FM_FIELDS=[ //display on screen
    { div:"tx_clusterno", fld:"clusterno", disp:-1, save:true },
    { div:"tx_clustername", fld:"clustername", disp:1, save:true  },
    { div:"tx_regVoters", fld:"regVoters", disp:1, save:true  },
    { div:"tx_prec_len", fld:"prec_len", disp:1, save:true  },
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

  var fm_ob = {
    title:"CLUSTER MASTER FILE",
    top:"10%", left:"", bottom:"", right:"10%",
    width:"600px",height:"420px"
  };  
 
  if(JBE_MOBILE){
    fm_ob.width="95%";
    fm_ob.height="315px";
    fm_ob.right="5px";
    fm_ob.top="100px";
  }
    
  var fm_layout=
    '<div style="width:100%;height:100%;text-align:left;padding:5px;background:white;">'+

      '<input id="tx_clusterno" type="text" style="display:none;" />'+

      '<div class="cls_fm_dtl">'+        
        '<div>Cluster Name:'+
          '<input id="lu_clusterno" type="image" src="gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;do_lu_cluster&quot;,&quot;CLUSTER LOOKUP&quot;,DB_CLUSTER,&quot;clusterno&quot;,&quot;clustername&quot;)" />'+
        '</div>'+
        '<input id="tx_clustername" type="text" data-caption="Cluster Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_precincts.id).focus()" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div>Registered Voters:</div>'+
        '<input id="tx_regVoters" type="number" value="" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div>No. of Precincts:</div>'+
        '<input id="tx_prec_len" type="number" value="" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div>Precincts:</div>'+
        '<input id="tx_precincts" type="text" data-caption="Precincts" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_precincts.id).focus()" />'+
      '</div>'+
   
      '<div class="cls_fm_dtl">'+        
        '<div>Barangay:'+          
          '<input id="lu_brgyCode" type="image" src="gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;do_lu_cluster&quot;,&quot;BARANGAY LOOKUP&quot;,ref_brgy,&quot;brgyCode&quot;,&quot;brgyDesc&quot;,ref_city,&quot;citymunCode&quot;,&quot;citymunDesc&quot;)" />'+
          '<input id="tx_brgyCode" type="text" data-caption="Barangay Code" style="display:none;" value="" />'+
        '</div>'+
        '<input id="tx_brgyName" type="text" />'+
      '</div>'+
      
      '<div class="cls_fm_dtl">'+
        '<div>Municipal/City:</div>'+
        '<input id="tx_citymunCode" type="text" value="" />'+
        '<input id="tx_cityName" disabled type="text" value="" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div>Province:</div>'+
        '<input id="tx_provCode" type="text" value="" />'+
        '<input id="tx_provName" disabled type="text" value="" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+
        '<div>Region:</div>'+
        '<input id="tx_regCode" type="text" value="" />'+
        '<input id="tx_regName" disabled type="text" value="" />'+
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
function do_add_cluster(){
  document.getElementById('lu_brgyCode').disabled=false;
  document.getElementById('lu_brgyCode').style.opacity='1';
  document.getElementById('tx_clustername').focus();
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

function do_del_cluster(stat,r){  
  if(stat==2){
    DB_CLUSTER=r;  
  }
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