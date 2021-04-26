function proc_conso_precinct(){ 
  alert(999);
  if(CURR_AXTYPE <4){
    snackBar('ACCESS DENIED...');
    return;
  }
  print_proc_conso_precinct();
}

function print_proc_conso_precinct(){    
  JBE_POPUP_CLOSE();

  init_report('Consolidated Precinct Status Group by Barangay Report',[8.5,11,0]);
  var vdate = JBE_DATE_FORMAT(new Date());
  var vtime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  
  var tot_votes=0;
  for(var k=0;k<DB_TRAN_VOTES.length;k++){
    if(DB_TRAN_VOTES[k]['citymunCode'] != CURR_CITYMUNCODE){ continue; }
    tot_votes+=parseInt(DB_TRAN_VOTES[k]['votes']);      
  }

  var tot_regVoters=0;
  for(var k=0;k<DB_CLUSTER.length;k++){
    if(DB_CLUSTER[k]['citymunCode'] != CURR_CITYMUNCODE){ continue; }
    tot_regVoters+=parseInt(DB_CLUSTER[k]['regVoters']);      
  }
  
  /*
  var dtl=
  '<div id="pg_conso_precinct" data-lctr=0;">'+    
  '</div>';
  document.getElementById('prn_div').innerHTML=dtl;
  */

  var dtl=
  '<div id="main_repo_conso_precinct" class="cls_preview_repo" style="margin:0 auto;width:780px;height:auto;height:auto;font-size:12px;font-weight:bold;margin-bottom:10px;padding:10px;color:black;border:0px solid red;background:white;">'+
  '</div>';
  
  document.getElementById('prn_div').innerHTML=dtl;

  do_page();
  var lctr=10;
  
  var aryBrgy=tmp_ref_brgy;
  var dtl2='';
  for(var i=0;i<aryBrgy.length;i++){    
    var brgyCode=aryBrgy[i]['brgyCode'];	
    var brgyDesc=aryBrgy[i]['brgyDesc'];	    
    //alert(brgyDesc);
    dtl2+=    
    '<div style="height:25px;width:100%;border:0px solid blue;background:none;">'+      
      '<div style="float:left;height:100%;width:30%;padding:4px;border:1px solid black;text-align:center;">'+brgyDesc+'</div>'+      
    '</div>';
    //'<div style="height:auto;width:100%;border:0px solid green;">'+getData_conso(pos)+'</div>';  
    document.getElementById('conso_precinct_body').innerHTML+=dtl2;  
    lctr++;
    if(lctr > 40){
      alert('kitakits: '+brgyDesc);
      do_page();
      lctr=10;
    }
  }
    
  function do_page(){
    var dtl=
    '<div style="width:850px;height:1100px;page-break-after:always;position:relative;font-size:12px;font-weight:bold;padding:10px;margin:0 auto;margin-top:10px;margin-bottom:10px;color:black;border:1px solid gray;background:white;">'+    
      '<div style="width:100%;height:80px;font-size:14px;border:1px solid red;">'+
        '<div style="width:100%;height:20px;text-align:left;font-weight:bold;">PRECINCTS STATUS GROUP BY BARANGAY - CONSOLIDATED</div>'+
        '<div style="width:100%;height:20px;text-align:left;">As of: '+vtime+', '+vdate+'</div>'+        
        '<div style="width:100%;height:20px;text-align:left;">'+jformatNumber(tot_votes)+' of '+jformatNumber(tot_regVoters)+' Registered Voters</div>'+
      '</div>'+
    
      '<div style="width:100%;height:50px;margin-top:0px;font-size:14px;border:1px solid green;">'+
        '<div style="float:left;height:100%;width:30%;padding:4px;border:1px solid black;text-align:center;">BARANGAY NAME</div>'+
        '<div style="float:left;height:100%;width:30%;padding:4px;border:1px solid black;text-align:left;">TOTALS</div>'+
        '<div style="float:left;height:100%;width:10%;padding:4px;border:1px solid black;text-align:left;">POLITICAL</div>'+
        '<div style="float:left;height:100%;width:30%;padding:4px;border:1px solid black;text-align:center;">PERCENTAGE</div>'+
      '<div>'+

      '<div id="conso_precinct_body" style="width:100%;height:935px;margin-top:60px;font-size:14px;border:1px solid pink;"></div>'+
    '<div>';
    document.getElementById('main_repo_conso_precinct').innerHTML=dtl;
  }

  function xxdo_header(){
    var dtl=
    '<div style="width:100%;height:80px;font-size:14px;border:1px solid red;">'+
      '<div style="width:100%;height:20px;text-align:left;font-weight:bold;">PRECINCTS STATUS GROUP BY BARANGAY - CONSOLIDATED</div>'+
      '<div style="width:100%;height:20px;text-align:left;">As of: '+vtime+', '+vdate+'</div>'+        
      '<div style="width:100%;height:20px;text-align:left;">'+jformatNumber(tot_votes)+' of '+jformatNumber(tot_regVoters)+' Registered Voters</div>'+
    '</div>'+
  
    '<div style="width:100%;height:50px;margin-top:0px;font-size:14px;border:1px solid green;">'+
      '<div style="float:left;height:100%;width:30%;padding:4px;border:1px solid black;text-align:center;">BARANGAY NAME</div>'+
      '<div style="float:left;height:100%;width:30%;padding:4px;border:1px solid black;text-align:left;">TOTALS</div>'+
      '<div style="float:left;height:100%;width:10%;padding:4px;border:1px solid black;text-align:left;">POLITICAL</div>'+
      '<div style="float:left;height:100%;width:30%;padding:4px;border:1px solid black;text-align:center;">PERCENTAGE</div>'+
    '<div>'+

    '<div style="width:100%;height:700px;margin-top:60px;font-size:14px;border:1px solid coral;">';
    document.getElementById('conso_precinct_head').innerHTML+=dtl;
  }

}

