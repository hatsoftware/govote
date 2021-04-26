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

  init_report('Partial and Unofficial Report - Consolidated',[84.5,8.5,1]);
  var vdate = JBE_DATE_FORMAT(new Date());
  var vtime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  var paper_width=8050;
  
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
  '<div id="preview_repo" class="cls_preview_repo" style="width:'+(paper_width-0)+'px;height:auto;font-size:12px;font-weight:bold;margin-bottom:10px;padding:10px;color:black;border:0px solid red;background:white;">'+
  '</div>';
  
  document.getElementById('prn_div').innerHTML=dtl;


  dtl=
  //'<div class="cls_preview_repo" style="width:'+(paper_width-0)+'px;height:auto;position:relative;font-size:12px;font-weight:bold;margin-bottom:10px;padding:10px;color:black;border:0px solid gray;background:white;">'+
    '<div style="width:100%;height:80px;border:0px solid violet;padding:0px;">'+    
      '<div style="width:100%;height:20px;text-align:left;font-weight:bold;">PARTIAL AND UNOFFICIAL RESULTS -  CONSOLIDATED</div>'+
      '<div style="width:100%;height:20px;text-align:left;">As of: '+vtime+', '+vdate+'</div>'+        
      '<div style="width:100%;height:20px;text-align:left;">'+jformatNumber(tot_votes)+' of '+jformatNumber(tot_regVoters)+' Registered Voters</div>'+    
    '</div>';
  
  
  var aryPosition=DB_POSITION;
  //alert(aryPosition.length);
  for(var i=0;i<aryPosition.length;i++){
    //alert(pos);
    var pos=aryPosition[i]['pos'];	
    var posname=aryPosition[i]['descrp'];	
    if(aryPosition[i]['hide'] == 1) { continue; }  // hide dont display
    //if(parseInt(pos) != 10) { continue; }    
    //alert(pos);
    dtl+=
    '<div class="cls_line_pos" style="page-break-inside: avoid; height:25px;width:'+(paper_width-20)+'px;text-align:left;margin-top:20px;padding:4px;border:1px solid black;background:none;">FOR '+posname.toUpperCase()+'</div>'+
    '<div style="height:25px;width:100%;border:0px solid blue;background:none;">'+      
      '<div style="float:left;height:100%;width:60px;padding:4px;border:1px solid black;text-align:center;">RANK</div>'+
      '<div style="float:left;height:100%;width:210px;padding:4px;border:1px solid black;text-align:left;">CANDIDATE</div>'+
      '<div style="float:left;height:100%;width:200px;padding:4px;border:1px solid black;text-align:left;">POLITICAL PARTY</div>'+
      '<div style="float:left;height:100%;width:120px;padding:4px;border:1px solid black;text-align:center;">PERCENTAGE</div>';
      var dtl2='';
      for(var ji=0;ji<tmp_ref_brgy.length;ji++){
        dtl2+='<div style="float:left;height:100%;width:120px;text-align:center;padding:4px 0 0 0;border:1px solid black;background:none;">'+tmp_ref_brgy[ji]['brgyDesc']+'</div>';
      }
      dtl+=dtl2+

      '<div style="float:left;height:100%;width:120px;padding:4px;border:1px solid black;text-align:center;">TOTAL VOTES</div>'+
    '</div>'+
    '<div style="height:auto;width:100%;border:0px solid green;">'+getData_conso(pos)+'</div>';    

  }
  //dtl+='</div>';  
  document.getElementById('preview_repo').innerHTML=dtl; 

  document.getElementById('prn_div').style.width=paper_width+'px';  
  document.getElementById('prn_div').style.fontSize='12px';
  //document.getElementById('prn_div').style.border='1px solid red';
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
      var candi_no=aryBrgy[ii]['candi_no'];
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
  
  var dtl='';  
  aryData.sort(sortByMultipleKey(['*candi_votes']));
  
  for(var i=0;i<aryData.length;i++){   
    var candi_no=aryData[i]['candi_no'];
    //alert('lk: '+i+' = '+candi_no);
    var candi_name=JBE_GETFLD('name',DB_CANDIDATE,'code',candi_no).toUpperCase();
    var partyno=JBE_GETFLD('partyno',DB_CANDIDATE,'code',candi_no).toUpperCase();
    var partyname=JBE_GETFLD('partyname',DB_PARTY,'partyno',partyno).toUpperCase();
    var perc=aryData[i]['perc']+'%';
    var candi_votes=aryData[i]['candi_votes'];
    //alert(candi_name);
    dtl+=
    '<div style="height:25px;width:100%;background:none;">'+
      '<div style="float:left;height:100%;width:60px;border:1px solid black;padding:4px;text-align:center;">'+(i+1)+'. '+'</div>'+
      '<div style="float:left;height:100%;width:210px;border:1px solid black;padding:4px;text-align:left;">'+candi_name+'</div>'+
      '<div style="float:left;height:100%;width:200px;border:1px solid black;padding:4px;text-align:left;">'+partyname+'</div>'+
      '<div style="float:left;height:100%;width:120px;border:1px solid black;padding:4px;text-align:center;">'+perc+'</div>';
      
      var dtl2='';
      
      for(var ji=0;ji<aryDataBrgy.length;ji++){      
        if(aryDataBrgy[ji]['candi_no'] != candi_no){ continue; }
        var votes=aryDataBrgy[ji]['brgyVotes'];          
        dtl2+='<div style="float:left;height:100%;width:120px;text-align:center;padding:5px;border:1px solid black;background:none;">'+iif(votes==0,'',jformatNumber(votes))+'</div>';
      }             
      dtl+=dtl2+
      
      '<div style="float:left;height:100%;width:120px;text-align:center;padding:5px;border:1px solid black;background:none;">'+jformatNumber(aryData[i]['candi_votes'])+'</div>'+
    '</div>';
  }
  return dtl;

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