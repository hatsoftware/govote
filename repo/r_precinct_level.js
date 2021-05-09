function proc_precinct_level(pos){ 
  if(CURR_AXTYPE <4){
    snackBar('ACCESS DENIED...');
    return;
  }
  
  var dtl=
  '<div style="width:100%;height:100%;text-align:left;padding:5px;background:white;">'+

    '<input id="tx_repo_clusterno" type="text" value="" style="display:none;" />'+

    '<div class="cls_fm_dtl">'+        
      '<div>Cluster Name:'+
        '<input id="lu_repo_clusterno" type="image" src="../../gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;put_cluster&quot;,&quot;CLUSTER LOOKUP&quot;,DB_CLUSTER,&quot;clusterno&quot;,&quot;clustername&quot;)" />'+
      '</div>'+
      '<input id="tx_repo_clustername" type="text" style="pointer-events:none;"/>'+
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
      '<input id="btnGO" type="button" onclick="print_proc_precinct_level(tx_repo_clusterno.value)" value="GO" style="width:100px;height:100%;color:white;background:'+JBE_CLOR+'"/>'+
    '</div>'+
    
  '</div>';
  var w='600px';
  if(JBE_MOBILE){ w= '90%'; }
  JBE_POPUP(w,dtl,'Precinct Level Report');
}

function print_proc_precinct_level(vclusterno){    
  JBE_POPUP_CLOSE();
  //alert('vclusterno '+vclusterno+' len:'+DB_CLUSTER.length);


  init_report('Precinct Level Report',[8.5,11,0]);
  var vdate = JBE_DATE_FORMAT(new Date());
  var vtime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  var main_dtl='';
  
  var aryCluster=DB_CLUSTER;
  aryCluster.sort(sortByMultipleKey(['clusterno']));
  for(var i=0;i<aryCluster.length;i++){   
    //alert('cluster: '+i);
    if(vclusterno){ //single
      if(aryCluster[i]['clusterno'] != vclusterno){ continue; }
    }

    clusterno=aryCluster[i]['clusterno'];
    brgyCode=aryCluster[i]['brgyCode'];
    //alert(clusterno);

    var cluster_regvotes=JBE_GETFLD('regVoters',aryCluster,'clusterno',clusterno);
    var cluster_votes=0;

    for(var k=0;k<DB_TRAN_VOTES.length;k++){      
      //if(DB_TRAN_VOTES[k][code] != vcode){ continue; }    
      if(DB_TRAN_VOTES[k]['clusterno'] != clusterno){ continue; }

      cluster_votes+=parseInt(DB_TRAN_VOTES[k]['votes']);      
    }

    //var aryDB=JBE_GETARRY(aryCluster,'clusterno',clusterno);  
    var brgyDesc=JBE_GETFLD('brgyDesc',tmp_ref_brgy,'brgyCode',brgyCode);

    
   

    var dtl=    
    '<div class="cls_preview_repo" style="width:780px;height:auto;page-break-after:always;position:relative;font-size:12px;font-weight:bold;padding:10px;margin:0 auto;margin-top:10px;margin-bottom:10px;color:black;border:0px solid gray;background:white;">'+

      '<div style="width:100%;height:110px;font-size:14px;border:0px solid blue;">'+
        '<div style="width:100%;height:20px;text-align:left;font-weight:bold;">PARTIAL AND UNOFFICIAL RESULTS -  PRECINCT LEVEL</div>'+
        '<div style="width:100%;height:20px;text-align:left;">As of: '+vtime+', '+vdate+'</div>'+
        '<div style="width:100%;height:20px;text-align:left;font-weight:bold;">BARANGAY NAME:'+brgyDesc+'</div>'+
        '<div style="width:100%;height:20px;text-align:left;font-weight:bold;">CLUSTER PRECINCT:'+clusterno+' '+aryCluster[i]['clustername']+'</div>'+
        '<div style="width:100%;height:20px;text-align:left;">'+jformatNumber(cluster_votes)+' of '+jformatNumber(cluster_regvotes)+' Registered Voters</div>'+
      '</div>'+

      '<div style="width:100%;height:auto;font-size:14px;">';

        var aryPosition=DB_POSITION;
        //alert(aryPosition.length);
        for(var ii=0;ii<aryPosition.length;ii++){
          //alert(pos);
          var pos=aryPosition[ii]['pos'];
          var posname=aryPosition[ii]['descrp'];
          if(aryPosition[ii]['hide'] == 1) { continue; }  // hide dont display
          
          dtl+=
          '<div style="width:100%;height:20px;margin-top:20px;text-align:left;padding:3px 0 0 0;background:lightgray;">'+
            'FOR '+posname.toUpperCase()+
          '</div>'+
          '<div style="height:20px;width:100%;text-align:center;padding:3px 0 0 0;background:gray;">'+
            '<div style="float:left;height:100%;width:8%;text-align:center;padding:0 0 0 0px;background:none;">RANK</div>'+
            '<div style="float:left;height:100%;width:30%;text-align:left;padding:0px;background:none;">CANDIDATE</div>'+
            '<div style="float:left;height:100%;width:30%;text-align:left;padding:0px;background:none;">POLITICAL PARTY</div>'+
            '<div style="float:left;height:100%;width:16%;padding:0px;background:none;">PERCENTAGE</div>'+
            '<div style="float:left;height:100%;width:16%;padding:0px;background:none;">VOTES</div>'+
          '</div>'+
          
          //'<div style="height:10px;width:100%;"></div>'+
          '<div style="height:auto;width:100%;margin-top:5px;border:0px solid green;">'+getData_precinct(pos,clusterno,cluster_votes)+'</div>';    
        }
        dtl+=
      '</div>'+
    '</div>';
    main_dtl+=dtl;
  }

  document.getElementById('prn_div').innerHTML=main_dtl;  
}

function getData_precinct(pos,clusterno,cluster_votes){  
  //alert('getData_precinct '+clusterno);
  var aryTranVotes=JBE_FILTER_ARRAY(DB_TRAN_VOTES,
    [
      { "fld":"pos","val":pos },
      { "fld":"clusterno","val":clusterno }
    ]
  );
  //alert('aryTranVotes.length '+aryTranVotes.length);

  if(aryTranVotes.length==0){ return ''; };
  var total_pos=0;
  aryTranVotes.sort(sortByMultipleKey(['*candi_no','brgyCode']));
  for(var ii=0;ii<aryTranVotes.length;ii++){    
    if(aryTranVotes[ii]['clusterno'] != clusterno){ continue; }
    //console.log(aryTranVotes[ii]['candi_no']);
    total_pos+=parseInt(aryTranVotes[ii]['votes']);
  }
  //alert(aryTranVotes.length);

  var ctr_candi=0;  
  var aryData=[];

  // main loop ============================================================================
  var i=0;
  var ctr_array=0;
  while(true){    
    //if(aryTranVotes[i]['clusterno'] != clusterno){ i++; continue; }

    var sv_candi_no=aryTranVotes[i]['candi_no'];
    var candi_votes=0;    
    
    while(aryTranVotes[i]['candi_no']==sv_candi_no){
      var sv_brgyCode=aryTranVotes[i]['brgyCode'];
      var brgy_votes=0;
      candi_votes+=parseInt(aryTranVotes[i]['votes']);
            
      while(aryTranVotes[i]['brgyCode']==sv_brgyCode && aryTranVotes[i]['candi_no']==sv_candi_no){
        brgy_votes+=parseInt(aryTranVotes[i]['votes']);
        i++;
        if(i == aryTranVotes.length){ break; }    
      }
      
      if(i == aryTranVotes.length){ break; }    
    }
 
    let ob_candi={
      "candi_no":sv_candi_no,
      "candi_name":JBE_GETFLD('name',DB_CANDIDATE,'code',sv_candi_no).toUpperCase(),
      "pos":pos,
      "perc":Math.round((candi_votes/cluster_votes) * 100),
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
    var candi_name=JBE_GETFLD('name',DB_CANDIDATE,'code',candi_no).toUpperCase();
    var partyno=JBE_GETFLD('partyno',DB_CANDIDATE,'code',candi_no).toUpperCase();
    var partyname=JBE_GETFLD('partyname',DB_PARTY,'partyno',partyno).toUpperCase();
    var perc=aryData[i]['perc'];
    perc=the_perc(perc);
    dtl+=
    '<div style="height:20px;width:100%;margin-top:5px;font-size:14px;padding:2px 0 0 0;background:none;">'+
      '<div style="float:left;height:100%;width:8%;text-align:center;background:none;">'+(i+1)+'. '+'</div>'+
      '<div style="float:left;height:100%;width:30%;text-align:left;">'+candi_name+'</div>'+
      '<div style="float:left;height:100%;width:30%;text-align:left;">'+partyname+'</div>'+
      '<div style="float:left;height:100%;width:16%;text-align:center;border:1px solid lightgray;">'+perc+'</div>'+
      '<div style="float:left;height:100%;width:16%;text-align:center;">'+jformatNumber(aryData[i]['candi_votes'])+'</div>'+
    '</div>';
  }
  return dtl;
}