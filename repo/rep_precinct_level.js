function repo_precinct_level(){ 
  //alert(222);
  if(CURR_AXTYPE <4){
    snackBar('ACCESS DENIED...');
    return;
  }
  
  var dtl=
  '<div style="width:100%;height:100%;text-align:left;padding:5px;background:white;">'+

    '<input id="tx_repo_clusterno" type="text" value="" style="display:none;" />'+

    '<div class="cls_fm_dtl">'+        
      '<div>Cluster Precinct:'+
        '<input id="lu_repo_clusterno" type="image" src="../../gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;put_cluster&quot;,&quot;CLUSTER LOOKUP&quot;,DB_CLUSTER,&quot;clusterno&quot;,&quot;clustername&quot;)" />'+
      '</div>'+
      '<input id="tx_repo_clustername" type="text" value="ALL" style="pointer-events:none;"/>'+
    '</div>'+

    '<div class="cls_fm_dtl">'+
      '<div>Precincts:</div>'+
      '<input id="tx_repo_precincts" type="text" style="pointer-events:none;"/>'+
    '</div>'+
  
    '<div class="cls_fm_dtl">'+        
      '<div>Barangay:</div>'+
      '<input id="tx_repo_brgyName" type="text" style="pointer-events:none;"/>'+
    '</div>'+
    
    '<div class="cls_fm_dtl">'+
      '<div>Municipal/City:</div>'+        
      '<input id="tx_repo_cityName" type="text" style="pointer-events:none;"/>'+
    '</div>'+

    '<div style="width:100%;height:30px;margin-top:10px;text-align:center;">'+      
      '<input id="btnGO" type="button" onclick="do_precinct_level(tx_repo_clusterno.value)" value="GO" style="width:100px;height:100%;color:white;background:'+JBE_CLOR+'"/>'+
    '</div>'+
    
  '</div>';
  var w='650px';
  if(JBE_MOBILE){ w= '90%'; }
  JBE_POPUP(w,dtl,'Partial/Final and Unofficial Report - Precinct Level');
}


function do_precinct_level(clusterno){        
  JBE_POPUP_CLOSE();

  var aryBrgy=[];
  //ref_brgy.sort(sortByMultipleKey(['brgyCode']));   
  var ctr=0;
  for(var i=0;i<ref_brgy.length;i++){
    if(ref_brgy[i]['citymunCode'] != CURR_CITYMUNCODE){ continue; }
    let ob={
      "brgyCode":ref_brgy[i]['brgyCode'],
      "brgyDesc":ref_brgy[i]['brgyDesc']
    }
    aryBrgy[ctr]=ob;
    ctr++;
  }
  aryBrgy=aryBrgy.sort(sortByMultipleKey(['brgyCode']));  
  //alert(aryBrgy.length);

  var rep_title=document.getElementById('popup-title').innerHTML;
  var rep_php='repo_precinct_level.php';
  var param='?tilt='+rep_title+'&clientno='+CURR_CLIENT+'&clusterno='+clusterno+'&aryBrgy='+JSON.stringify(aryBrgy);  
  prn_repo(rep_title,rep_php,param);
}

