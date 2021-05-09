function proc_brgy_level(){ 
  if(CURR_AXTYPE <4){
    snackBar('ACCESS DENIED...');
    return;
  }

  var dtl=
  '<div style="width:100%;height:100%;text-align:left;padding:5px;background:white;">'+

    '<div class="cls_fm_dtl">'+        
      '<div>Barangay:'+                  
        '<input id="lu_repo_brgyCode" type="image" src="../../gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;put_brgy&quot;,&quot;BARANGAY LOOKUP&quot;,tmp_ref_brgy,&quot;brgyCode&quot;,&quot;brgyDesc&quot;)" />'+
        '<input id="tx_repo_brgyCode" type="text" data-caption="Barangay Code" style="display:none;" value="" />'+
      '</div>'+
      '<input id="tx_repo_brgyName" type="text" />'+
    '</div>'+

    '<div style="width:100%;height:30px;margin-top:10px;text-align:center;">'+      
      '<input id="btnGO" type="button" onclick="print_proc_brgy_level(tx_repo_brgyCode.value)" value="GO" style="width:100px;height:100%;color:white;background:'+JBE_CLOR+'"/>'+
    '</div>'+
    
  '</div>';
  var w='600px';
  if(JBE_MOBILE){ w= '90%'; }
  JBE_POPUP(w,dtl,'Barangay Level Report');
}

function getMaxColumn(){
  vmax=0;
  for(var i=0;i<tmp_ref_brgy.length;i++){
    var sv_brgyCode=tmp_ref_brgy[i]['brgyCode'];
    var ctr_cluster=0;
    for(var k=0;k<DB_CLUSTER.length;k++){
      if(DB_CLUSTER[k]['brgyCode'] != sv_brgyCode){ continue; }
      ctr_cluster++;
    }
    if(ctr_cluster > vmax){ vmax=ctr_cluster; }
  }
  alert('vmax '+vmax);
}

function print_proc_brgy_level(vbrgyCode){   
  //alert('JBE: '+vbrgyCode); 
  JBE_POPUP_CLOSE();

  init_report('Partial and Unofficial Report - Barangay Level',[8.5,11,0]);
  var vdate = JBE_DATE_FORMAT(new Date());
  var vtime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  var pg_width=9700;
  var pg_height=850-60;
  
  
  //var cluster_regvotes=JBE_GETFLD('regVoters',DB_CLUSTER,'clusterno',clusterno);
  
  
  var dtl=
  '<div id="main_repo_brgy_level" class="cls_preview_repo" style="width:'+(pg_width-0)+'px;height:auto;font-size:12px;font-weight:bold;margin-bottom:0px;padding:10px;color:black;border:0px solid red;background:none;">'+     
  '</div>';  
  document.getElementById('prn_div').innerHTML=dtl; 
  
  var pg=0;
  var lctr=0;
  var dtl2='';

  var max_len=getMaxColumn();
  
  var aryBrgy=tmp_ref_brgy;
  var aryPosition=DB_POSITION;
  
  for(var i=0;i<aryBrgy.length;i++){
    if(vbrgyCode){ //single
      if(aryBrgy[i]['brgyCode'] != vbrgyCode){ continue; }
    }    
    var brgyCode=aryBrgy[i]['brgyCode'];	
    var brgyDesc=aryBrgy[i]['brgyDesc'];	

    var tot_votes=0;
    for(var k=0;k<DB_TRAN_VOTES.length;k++){
      if(DB_TRAN_VOTES[k]['brgyCode'] != brgyCode){ continue; }
      tot_votes+=parseInt(DB_TRAN_VOTES[k]['votes']);      
    }

    var tot_regVoters=0;
    for(var k=0;k<DB_CLUSTER.length;k++){
      if(DB_CLUSTER[k]['brgyCode'] != brgyCode){ continue; }
      tot_regVoters+=parseInt(DB_CLUSTER[k]['regVoters']);      
    }
    do_header_brgy_level();
    
    for(var ij=0;ij<aryPosition.length;ij++){
      var pos=aryPosition[ij]['pos'];	
      var posname=aryPosition[ij]['descrp'];	
      if(parseInt(aryPosition[ij]['hide']) == 1) { continue; }  // hide dont display
      
      do_subheader_brgy_level();
      lctr=lctr+2;
      
      var aryDATUM=getData_brgy_level(pos,brgyCode);

      var aryDATA=aryDATUM[0];
      var aryDATAcluster=aryDATUM[1];
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
          
          for(var ji=0;ji<aryDATAcluster.length;ji++){      
            if(aryDATAcluster[ji]['candi_no'] != candi_no){ continue; }
            var votes=aryDATAcluster[ji]['clusterVotes'];
            dtl2+='<div style="float:left;height:100%;width:2%;text-align:center;padding:5px;border:1px solid black;background:none;">'+iif(votes==0,'',jformatNumber(votes))+'</div>';
          }             
          dtl_line+=dtl2+
          
          '<div style="float:left;height:100%;width:1.5%;text-align:center;padding:5px;border:1px solid black;background:none;">'+jformatNumber(candi_votes)+'</div>'+
        '</div>';

        lctr++;    
        if(lctr > 31){
          do_header_brgy_level();
        }
        document.getElementById('repo_brgy_level_body'+pg).innerHTML+=dtl_line;        
      }   

    }
    
  }

  document.getElementById('prn_div').style.width=pg_width+'px';  
  document.getElementById('prn_div').style.fontSize='11px';
  //document.getElementById('prn_div').style.border='1px solid red';

  function do_header_brgy_level(){
    pg++;
    //alert('pg:'+pg+' lctr:'+lctr);
    var dtl=
    '<div id="pg_repo_brgy_level'+pg+'" style="width:100%;height:'+pg_height+'px;page-break-after:always;position:relative;font-size:12px;font-weight:bold;padding:10px;margin:0 auto;margin-top:0px;margin-bottom:10px;color:black;border:0px solid violet;background:white;">'+    
      '<div style="width:100%;height:80px;font-size:14px;border:0px solid red;background:none;">'+
        '<div style="width:100%;height:20px;text-align:left;font-weight:bold;">PARTIAL AND UNOFFICIAL RESULTS -  BARANGAY LEVEL</div>'+
        '<div style="width:100%;height:20px;text-align:left;">As of: '+vtime+', '+vdate+'</div>'+        
        '<div style="width:100%;height:20px;text-align:left;font-weight:bold;">BARANGAY NAME:'+brgyDesc+'</div>'+
        '<div style="width:100%;height:20px;text-align:left;">'+jformatNumber(tot_votes)+' of '+jformatNumber(tot_regVoters)+' Registered Voters</div>'+    
      '</div>'+   
      '<div id="repo_brgy_level_body'+pg+'" style="width:100%;height:'+(pg_height-100)+'px;margin-top:0px;font-size:14px;border:0px solid white;"></div>'+
    '</div>';
    document.getElementById('main_repo_brgy_level').innerHTML+=dtl;    
    lctr=6;
    //alert(lctr);
  }

  function do_subheader_brgy_level(){
    //alert('sub pg:'+pg+' lctr:'+lctr);
    var vdtl=
    '<div id="sub_pg_brgy_level_'+pg+'" style="width:100%;height:50px;border:0px solid coral;margin-top:10px;padding:0px;">'+    
      '<div class="cls_line_pos" style="height:50%;width:100%;text-align:left;padding:3px;border:1px solid black;background:lightgray;">FOR '+posname.toUpperCase()+'</div>'+
      '<div style="height:50%;width:100%;border:0px solid blue;background:gray;">'+      
        '<div style="float:left;height:100%;width:0.7%;padding:3px;border:1px solid black;text-align:center;">xRANK</div>'+
        '<div style="float:left;height:100%;width:2.5%;padding:3px;border:1px solid black;text-align:left;">CANDIDATE</div>'+
        '<div style="float:left;height:100%;width:2.4%;padding:3px;border:1px solid black;text-align:left;">POLITICAL PARTY</div>'+
        '<div style="float:left;height:100%;width:1.4%;padding:3px;border:1px solid black;text-align:center;">PERCENTAGE</div>';
          var vdtl3='';          
          for(var ji=0;ji<DB_CLUSTER.length;ji++){
            //alert(ji+'. '+DB_CLUSTER[ji]['brgyCode']+' vs '+brgyCode);
            var vname='';
            if(DB_CLUSTER[ji]['brgyCode'] == brgyCode){ vname=DB_CLUSTER[ji]['clustername']; }
              
            
            vdtl3+='<div style="float:left;height:100%;width:2%;text-align:center;padding:3px 0 0 0;border:1px solid red;background:none;">'+vname+'</div>';
          }
          vdtl+=vdtl3+
          '<div style="float:left;height:100%;width:1.5%;padding:3px;border:1px solid black;text-align:center;">TOTAL VOTES</div>'+
      '</div>'+
    '</div>';
    document.getElementById('repo_brgy_level_body'+pg).innerHTML+=vdtl;
  }
}

function getData_brgy_level(pos,brgyCode){      
  //var aryTranVotes=JBE_FILTER_ARRAY(DB_TRAN_VOTES,'pos',pos);
  var aryTranVotes=JBE_FILTER_ARRAY(DB_TRAN_VOTES,
    [
      { "fld":"pos","val":pos },
      { "fld":"brgyCode","val":brgyCode }
    ]
  );
  /*
  alert(
    'aryTranVotes.length '+aryTranVotes.length+
    '\nPos  '+pos+
    '\nbrgyCode  '+brgyCode
  );
  */

  if(aryTranVotes.length==0){ return ''; }
  var total_pos=0;
  aryTranVotes.sort(sortByMultipleKey(['*candi_no','clusterno']));
  for(var ii=0;ii<aryTranVotes.length;ii++){
    //console.log(aryTranVotes[ii]['candi_no']);
    total_pos+=parseInt(aryTranVotes[ii]['votes']);
  }
  //alert(aryTranVotes.length);
  var ctr=0;  
  var ctr_candi=0;
  
  var aryData=[];
  var aryDATAcluster=[];
  
  var aryCluster=DB_CLUSTER;

  // main loop ============================================================================
  var i=0;
  var ctr_array=0;
  while(true){
    var sv_candi_no=aryTranVotes[i]['candi_no'];
    var candi_votes=0;    
    //total_pos+=parseInt(aryTranVotes[i]['votes']);
    for(var ii=0;ii<aryCluster.length;ii++){
      var clusterno=aryCluster[ii]['clusterno'];
      var clusterVotes=aryCluster[ii]['clusterVotes'];

      let ob_cluster={
        "candi_no":sv_candi_no,
        "clusterno":clusterno,
        "clusterVotes":clusterVotes
      }

      aryDATAcluster[ctr_array]=ob_cluster;
      ctr_array++;
    }  

    while(aryTranVotes[i]['candi_no']==sv_candi_no){
      var sv_clusterno=aryTranVotes[i]['clusterno'];
      var cluster_votes=0;
      candi_votes+=parseInt(aryTranVotes[i]['votes']);
            
      while(aryTranVotes[i]['clusterno']==sv_clusterno && aryTranVotes[i]['candi_no']==sv_candi_no){
        cluster_votes+=parseInt(aryTranVotes[i]['votes']);
        i++;
        if(i == aryTranVotes.length){ break; }    
      }
      //aryDATAcluster[0]['brgyVotes']=555;
      update_cluster(sv_candi_no,sv_clusterno,cluster_votes);
      
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

  var retArray=[];
  /*
  alert(
    'brgyCode '+brgyCode+
    '\naryData.length  '+aryData.length+
    '\naryDATAcluster.length  '+aryDATAcluster.length
  );
  */

  retArray[0]=aryData;
  retArray[1]=aryDATAcluster;
  
  return retArray;

  function update_cluster(candi_no,clusterno,cluster_votes){
    //brgyVotes=8888;
    for(var i=0;i<aryDATAcluster.length;i++){   
      if(aryDATAcluster[i]['candi_no']==candi_no && aryDATAcluster[i]['clusterno']==clusterno){
        aryDATAcluster[i]['cluster_votes']=cluster_votes;
        break;
      }
    }
  }

}