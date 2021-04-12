function repo_consolidated(){ 
  if(CURR_AXTYPE <4){
    snackBar('ACCESS DENIED...');
    return;
  }  
  do_repo_consolidated();
}

function do_repo_consolidated(){  
  var aryBrgy=[];
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

  var rep_title='Partial/Final and Unofficial Report - Consolidated';
  var rep_php='repo_consolidated.php';
  //var param='?tilt='+rep_title+'&aryBrgy='+JSON.stringify(aryBrgy);  
  var param='?tilt='+rep_title+'&clientno='+CURR_CLIENT+'&aryBrgy='+JSON.stringify(aryBrgy);  
  prn_repo(rep_title,rep_php,param);
}

