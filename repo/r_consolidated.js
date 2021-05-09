function proc_consolidated(){ 
  //alert(222);
  if(CURR_AXTYPE <4){
    snackBar('ACCESS DENIED...');
    return;
  }
  print_proc_consolidated();  
}

function print_proc_consolidated(){    
  //JBE_POPUP_CLOSE();

  init_report('Partial and Unofficial Report - Consolidated',[101.15,8.5,1]);
  var vdate = JBE_DATE_FORMAT(new Date());
  var vtime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  var pg_width=9700;
  var pg_height=850-60;
  
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
  //var cluster_regvotes=JBE_GETFLD('regVoters',DB_CLUSTER,'clusterno',clusterno);
  
  
  var dtl=
  '<div id="main_repo_consolidated" class="cls_preview_repo" style="width:'+(pg_width-0)+'px;height:auto;font-size:12px;font-weight:bold;margin-bottom:0px;padding:10px;color:black;border:0px solid red;background:none;">'+     
  '</div>';  
  document.getElementById('prn_div').innerHTML=dtl; 
  
  var pg=0;
  var lctr=0;
  var dtl2='';

  do_header_consolidated();
  
  var aryPosition=DB_POSITION;
  //alert(aryPosition.length);
  
  for(var i=0;i<aryPosition.length;i++){
    //alert(pos);
    var pos=aryPosition[i]['pos'];	
    var posname=aryPosition[i]['descrp'];	
    if(parseInt(aryPosition[i]['hide']) == 1) { continue; }  // hide dont display
    
    do_subheader_consolidated();
    lctr=lctr+2;
    
    //var xdtl_line='<div style="height:25px;width:100%;text-align:left;background:none;">jbe line:'+i+'</div>';
    //document.getElementById('repo_consolidated_body_'+pg).innerHTML+=xdtl_line;
    
    var aryDATUM=getData_conso(pos);
    var aryDATA=aryDATUM[0];
    var aryDATAbrgy=aryDATUM[1];
    //alert('pos:'+posname+' array len:'+aryDATA.length);
    dtl_line='';
    
    for(var ii=0;ii<aryDATA.length;ii++){    
      var candi_no=aryDATA[ii]['candi_no'];
      //alert('lk: '+i+' = '+candi_no);
      var candi_name=JBE_GETFLD('name',DB_CANDIDATE,'code',candi_no).toUpperCase();
      var partyno=JBE_GETFLD('partyno',DB_CANDIDATE,'code',candi_no).toUpperCase();
      var partyname=JBE_GETFLD('partyname',DB_PARTY,'partyno',partyno).toUpperCase();
      var perc=aryDATA[ii]['perc'];
      perc=the_perc(perc);
      var candi_votes=aryDATA[ii]['candi_votes'];
      
      dtl_line=
      '<div style="height:25px;width:100%;background:none;">'+
        '<div style="float:left;height:100%;width:0.7%;border:1px solid black;padding:3px;text-align:center;">'+(ii+1)+'. '+'</div>'+
        '<div style="float:left;height:100%;width:2.5%;border:1px solid black;padding:3px;text-align:left;">'+candi_name+'</div>'+
        '<div style="float:left;height:100%;width:2.4%;border:1px solid black;padding:3px;text-align:left;">'+partyname+'</div>'+
        '<div id="the_perc" style="float:left;height:100%;width:1.4%;border:1px solid black;padding:3px;text-align:center;">'+perc+'</div>';
        
        var dtl2='';
        
        for(var ji=0;ji<aryDATAbrgy.length;ji++){      
          if(aryDATAbrgy[ji]['candi_no'] != candi_no){ continue; }
          var votes=aryDATAbrgy[ji]['brgyVotes'];          
          dtl2+='<div style="float:left;height:100%;width:1.5%;text-align:center;padding:5px;border:1px solid black;background:none;">'+iif(votes==0,'',jformatNumber(votes))+'</div>';
        }             
        dtl_line+=dtl2+
        
        '<div style="float:left;height:100%;width:1.5%;text-align:center;padding:5px;border:1px solid black;background:none;">'+jformatNumber(candi_votes)+'</div>'+
      '</div>';

      /*
      dtl_line=
      '<div style="height:25px;width:100%;text-align:left;background:none;">'+
        '<div style="float:left;height:100%;width:2.2%;border:1px solid black;padding:3px;text-align:left;">jbe line:'+ii+' lctr:'+lctr+'</div>'+        
      '</div>';
      */

      //dtl_line=dtl+dtl_line;
      //alert('pg:'+pg);
      //document.getElementById('repo_consolidated_body'+pg).innerHTML+=dtl_line;        
      lctr++;    
      if(lctr > 31){
        //alert('kitakits: '+posname);  
        do_header_consolidated();
      }
      document.getElementById('repo_consolidated_body'+pg).innerHTML+=dtl_line;        
    }    
    
  }

  document.getElementById('prn_div').style.width=pg_width+'px';  
  document.getElementById('prn_div').style.fontSize='11px';
  //document.getElementById('prn_div').style.border='1px solid red';

  function do_header_consolidated(){
    pg++;
    //alert('pg:'+pg+' lctr:'+lctr);
    var dtl=
    '<div id="pg_repo_consolidated'+pg+'" style="width:100%;height:'+pg_height+'px;page-break-after:always;position:relative;font-size:12px;font-weight:bold;padding:10px;margin:0 auto;margin-top:0px;margin-bottom:10px;color:black;border:0px solid violet;background:white;">'+    
      '<div style="width:100%;height:80px;font-size:14px;border:0px solid red;background:none;">'+
        '<div style="width:100%;height:20px;text-align:left;font-weight:bold;">PARTIAL AND UNOFFICIAL RESULTS -  CONSOLIDATED</div>'+
        '<div style="width:100%;height:20px;text-align:left;">As of: '+vtime+', '+vdate+'</div>'+        
        '<div style="width:100%;height:20px;text-align:left;">'+jformatNumber(tot_votes)+' of '+jformatNumber(tot_regVoters)+' Registered Voters</div>'+    
      '</div>'+   
      '<div id="repo_consolidated_body'+pg+'" style="width:100%;height:'+(pg_height-100)+'px;margin-top:0px;font-size:14px;border:0px solid white;"></div>'+
    '</div>';
    document.getElementById('main_repo_consolidated').innerHTML+=dtl;    
    lctr=6;
    //alert(lctr);
  }

  function do_subheader_consolidated(){
    //alert('sub pg:'+pg+' lctr:'+lctr);
    var vdtl=
    '<div id="sub_pg_repo_consolidated_'+pg+'" style="width:100%;height:50px;border:0px solid coral;margin-top:10px;padding:0px;">'+    
      '<div class="cls_line_pos" style="height:50%;width:100%;text-align:left;padding:3px;border:1px solid black;background:lightgray;">FOR '+posname.toUpperCase()+'</div>'+
      '<div style="height:50%;width:100%;border:0px solid blue;background:gray;">'+      
        '<div style="float:left;height:100%;width:0.7%;padding:3px;border:1px solid black;text-align:center;">RANK</div>'+
        '<div style="float:left;height:100%;width:2.5%;padding:3px;border:1px solid black;text-align:left;">CANDIDATE</div>'+
        '<div style="float:left;height:100%;width:2.4%;padding:3px;border:1px solid black;text-align:left;">POLITICAL PARTY</div>'+
        '<div style="float:left;height:100%;width:1.4%;padding:3px;border:1px solid black;text-align:center;">PERCENTAGE</div>';
        var vdtl3='';
        for(var ji=0;ji<tmp_ref_brgy.length;ji++){
          vdtl3+='<div style="float:left;height:100%;width:1.5%;text-align:center;padding:3px 0 0 0;border:1px solid black;background:none;">'+tmp_ref_brgy[ji]['brgyDesc']+'</div>';
        }
        vdtl+=vdtl3+
        '<div style="float:left;height:100%;width:1.5%;padding:3px;border:1px solid black;text-align:center;">TOTAL VOTES</div>'+
      '</div>'+
    '</div>';
    document.getElementById('repo_consolidated_body'+pg).innerHTML+=vdtl;        
  }
}



function getData_conso(pos){      
  //var aryTranVotes=JBE_FILTER_ARRAY(DB_TRAN_VOTES,'pos',pos);
  var aryTranVotes=JBE_FILTER_ARRAY(DB_TRAN_VOTES,
    [
      { "fld":"pos","val":pos }
    ]
  );
  if(aryTranVotes.length==0){ return ''; }
  var total_pos=0;
  aryTranVotes.sort(sortByMultipleKey(['*candi_no','brgyCode']));
  for(var ii=0;ii<aryTranVotes.length;ii++){
    //console.log(aryTranVotes[ii]['candi_no']);
    total_pos+=parseInt(aryTranVotes[ii]['votes']);
  }
  //alert(aryTranVotes.length);
  var ctr=0;  
  var ctr_candi=0;
  
  var aryData=[];
  var aryDataBrgy=[];
  
  var aryBrgy=tmp_ref_brgy;

  // main loop ============================================================================
  var i=0;
  var ctr_array=0;
  while(true){
    var sv_candi_no=aryTranVotes[i]['candi_no'];
    var candi_votes=0;    
    //total_pos+=parseInt(aryTranVotes[i]['votes']);
    for(var ii=0;ii<aryBrgy.length;ii++){      
      var brgyCode=aryBrgy[ii]['brgyCode'];
      var brgyVotes=0;      

      let ob_brgy={
        "candi_no":sv_candi_no,
        "brgyCode":brgyCode,
        "brgyVotes":brgyVotes
      }

      aryDataBrgy[ctr_array]=ob_brgy;
      ctr_array++;
    }  

    while(aryTranVotes[i]['candi_no']==sv_candi_no){
      var sv_brgyCode=aryTranVotes[i]['brgyCode'];
      var brgy_votes=0;
      candi_votes+=parseInt(aryTranVotes[i]['votes']);
            
      while(aryTranVotes[i]['brgyCode']==sv_brgyCode && aryTranVotes[i]['candi_no']==sv_candi_no){
        brgy_votes+=parseInt(aryTranVotes[i]['votes']);
        i++;
        if(i == aryTranVotes.length){ break; }    
      }
      //aryDataBrgy[0]['brgyVotes']=555;
      update_brgy(sv_candi_no,sv_brgyCode,brgy_votes);
      
      if(i == aryTranVotes.length){ break; }    
    }
 
    let ob_candi={
      "candi_no":sv_candi_no,
      "candi_name":JBE_GETFLD('name',DB_CANDIDATE,'code',sv_candi_no).toUpperCase(),
      "pos":pos,
      "perc":Math.round((candi_votes/total_pos) * 100),
      "candi_votes":candi_votes
    };    
    
    aryData[ctr_candi] = ob_candi;
    ctr_candi++;  
    
    if(i == aryTranVotes.length){ break; }    
  }
  
  aryData.sort(sortByMultipleKey(['*candi_votes']));

  var retArray=[];
  retArray[0]=aryData;
  retArray[1]=aryDataBrgy;
  
  return retArray;

  function update_brgy(candi_no,brgyCode,brgyVotes){
    //brgyVotes=8888;
    for(var i=0;i<aryDataBrgy.length;i++){   
      if(aryDataBrgy[i]['candi_no']==candi_no && aryDataBrgy[i]['brgyCode']==brgyCode){
        aryDataBrgy[i]['brgyVotes']=brgyVotes;
        break;
      }
    }
  }

}