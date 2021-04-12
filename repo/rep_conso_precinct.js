function repo_conso_precinct(){ 
  if(CURR_AXTYPE <4){
    snackBar('ACCESS DENIED...');
    return;
  }  
  do_repo_conso_precinct();
}

function do_repo_conso_precinct(){  
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
  
  var rep_title='Precints Status Group by Barangay - Consolidated';
  var rep_php='repo_conso_precinct.php';
  var param='?tilt='+rep_title+'&clientno='+CURR_CLIENT+'&aryBrgy='+JSON.stringify(aryBrgy);  
  prn_repo(rep_title,rep_php,param);
}

