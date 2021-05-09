function proc_conso_precinct(){ 
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

 var pg_width=875-75;
 var pg_height=1100-75;

  var dtl=
  '<div id="main_repo_conso_precinct" class="cls_preview_repo" style="margin:0 auto;width:'+pg_width+'px;height:auto;height:auto;font-size:12px;font-weight:bold;margin-bottom:10px;padding:10px;color:black;border:0px solid red;background:none;">'+
  '</div>';  
  document.getElementById('prn_div').innerHTML=dtl;

  var pg=1;
  var lctr=0;
  
  var aryBrgy=tmp_ref_brgy;
  var result=[];
  var dtl_line='';
  for(var i=0;i<aryBrgy.length;i++){    
    var brgyCode=aryBrgy[i]['brgyCode'];	
    var brgyDesc=aryBrgy[i]['brgyDesc'];	 
    result=getData_conso_precinct(brgyCode);

    var voters=result['voters'];
    var votes=result['votes'];
    var clusters=result['clusters'];

    var perc=0;
    if(votes > 0 && voters > 0){ perc=round(((votes/voters)*100),0); }
    var vopen=result['vopen'];
    var vclosed=result['vclosed'];
    var vstatus='OPEN';
    if(perc==100){ vstatus='CLOSED'; }
    perc=the_perc(perc);

    //alert(brgyDesc);
    dtl_line+=    
    '<div style="height:25px;width:100%;padding:0px;border:0px solid blue;background:none;">'+      
      '<div style="float:left;height:100%;width:30%;padding:4px;border:1px solid black;text-align:left;">'+brgyDesc+'</div>'+  
      
      '<div style="float:left;height:100%;width:30%;padding:0px;border:0px solid black;">'+
        '<div style="float:left;height:100%;width:33%;padding:4px;border:1px solid black;text-align:right;">'+iif(voters>0,jformatNumber(voters),'')+'</div>'+
        '<div style="float:left;height:100%;width:34%;padding:4px;border:1px solid black;text-align:right;">'+iif(votes>0,jformatNumber(votes),'')+'</div>'+
        '<div style="float:left;height:100%;width:33%;padding:4px;border:1px solid black;text-align:right;">'+iif(clusters>0,jformatNumber(clusters),'')+'</div>'+
      '</div>'+

      '<div style="float:left;height:100%;width:14%;padding:4px;border:1px solid black;text-align:center;">'+perc+'</div>'+ 

      '<div style="float:left;height:100%;width:26%;padding:0px;border:0px solid black;background:none;">'+
        '<div style="float:left;height:100%;width:30%;padding:4px;border:1px solid black;text-align:right;">'+iif(vopen>0,jformatNumber(vopen),'')+'</div>'+      
        '<div style="float:left;height:100%;width:34%;padding:4px;border:1px solid black;text-align:right;">'+iif(vclosed>0,jformatNumber(vclosed),'')+'</div>'+      
        '<div style="float:left;height:100%;width:36%;padding:4px;border:1px solid black;text-align:left;">'+vstatus+'</div>'+      
      '</div>'+
    '</div>';
    
    lctr++;
    if(lctr > 34){
      //alert('kitakits: '+brgyDesc);      
      do_header_conso_precinct();
      dtl_line='';
      pg++;
      lctr=9;
    }
    
  }  

  //document.getElementById('conso_precinct_body').innerHTML=dtl2;  
    // the quick html2pdf
  function do_header_conso_precinct(){
    //alert('pg:'+pg+' lctr:'+lctr);
    var dtl=
    '<div id="pg_repo_conso_precinct_'+pg+'" style="width:100%;height:'+pg_height+'px;page-break-after:always;position:relative;font-size:12px;font-weight:bold;padding:10px;margin:0 auto;margin-top:0px;margin-bottom:10px;color:black;border:0px solid violet;background:white;">'+    

      '<div style="width:100%;height:80px;font-size:14px;border:0px solid red;background:none;">'+
        '<div style="width:100%;height:20px;text-align:left;font-weight:bold;">PRECINCTS STATUS GROUP BY BARANGAY - CONSOLIDATED</div>'+
        '<div style="width:100%;height:20px;text-align:left;">As of: '+vtime+', '+vdate+'</div>'+        
        '<div style="width:100%;height:20px;text-align:left;">'+jformatNumber(tot_votes)+' of '+jformatNumber(tot_regVoters)+' Registered Voters</div>'+
      '</div>'+
    
      '<div style="width:100%;height:50px;margin-top:0px;font-size:14px;border:1px solid black;background:none;">'+

        '<div style="float:left;height:100%;width:30%;padding:14px 0 0 0;border:1px solid black;text-align:center;">BARANGAY NAME</div>'+

        '<div style="float:left;height:100%;width:30%;padding:0px;border:0px solid black;">'+
          '<div style="height:50%;width:100%;padding:3px 0 0 0;border:1px solid black;text-align:center;">T O T A L S</div>'+
          '<div style="height:50%;width:100%;padding:0px;border:0px solid black;text-align:center;">'+
            '<div style="float:left;height:100%;width:33%;padding:3px 0 0 0;border:1px solid black;text-align:center;">VOTERS</div>'+
            '<div style="float:left;height:100%;width:34%;padding:3px 0 0 0;border:1px solid black;text-align:center;">VOTES</div>'+
            '<div style="float:left;height:100%;width:33%;padding:3px 0 0 0;border:1px solid black;text-align:center;">CLUSTER</div>'+
          '</div>'+
        '</div>'+

        '<div style="float:left;height:100%;width:14%;padding:14px;border:1px solid black;text-align:center;">PERC</div>'+

        '<div style="float:left;height:100%;width:26%;padding:0px;border:0px solid black;">'+
          '<div style="height:50%;width:100%;padding:3px 0 0 0;border:1px solid black;text-align:center;">C L U S T E R</div>'+
          '<div style="height:50%;width:100%;padding:0px;border:0px solid black;text-align:center;">'+
            '<div style="float:left;height:100%;width:30%;padding:3px 0 0 0;border:1px solid black;text-align:center;">OPEN</div>'+
            '<div style="float:left;height:100%;width:34%;padding:3px 0 0 0;border:1px solid black;text-align:center;">CLOSED</div>'+
            '<div style="float:left;height:100%;width:36%;padding:3px 0 0 0;border:1px solid black;text-align:center;">STATUS</div>'+
          '</div>'+
        '</div>'+

      '</div>'+
      
      '<div style="width:100%;height:auto;margin-top:2px;font-size:14px;border:0px solid brown;">'+dtl_line+'</div>'+

    '<div>';
    document.getElementById('main_repo_conso_precinct').innerHTML+=dtl;    
  }

}

function getData_conso_precinct(brgyCode){  
  var voters=0;
  var clusters=0;
  var votes=0;
  var vopen=0;
  var vclosed=0;
  
  for(var i=0;i<DB_CLUSTER.length;i++){
    if(DB_CLUSTER[i]['brgyCode'] != brgyCode){ continue; }

    voters+=parseInt(DB_CLUSTER[i]['regVoters']);
    clusters+=parseInt(DB_CLUSTER[i]['prec_len']);

    vopen++;
    if(parseInt(DB_CLUSTER[i]['status'])==1){
      vclosed++;
    }
  }
  
  for(var i=0;i<DB_TRAN_VOTES.length;i++){
    if(DB_TRAN_VOTES[i]['brgyCode'] != brgyCode){ continue; }
    votes+=parseInt(DB_TRAN_VOTES[i]['votes']);
  }

  let ob={
    "voters":voters,
    "votes":votes,
    "clusters":clusters,
    "vopen":vopen,
    "vclosed":vclosed
  }
  
  return ob;
}

