function repo_partial(pos){ 
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
      '<input id="btnGO" type="button" onclick="do_print_partial(tx_repo_clusterno.value)" value="GO" style="width:100px;height:100%;color:white;background:'+JBE_CLOR+'"/>'+
    '</div>'+
    
  '</div>';

  JBE_POPUP(dtl);
}
function put_cluster(fld,val){
  var aryDB=JBE_GETARRY(DB_CLUSTER,fld,val);  
  document.getElementById('tx_repo_clusterno').value = val;
  document.getElementById('tx_repo_clustername').value = aryDB['clustername'];
  document.getElementById('tx_repo_precincts').value = aryDB['precincts'];
  document.getElementById('tx_repo_brgyName').value = JBE_GETFLD('brgyDesc',tmp_ref_brgy,'brgyCode',aryDB['brgyCode']);
  document.getElementById('tx_repo_cityName').value = JBE_GETFLD('citymunDesc',ref_city,'citymunCode',aryDB['citymunCode']);
}

function do_print_partial(vclusterno){    
  JBE_POPUP_CLOSE();

  init_report('ambot');
  var vdate = JBE_DATE_FORMAT(new Date());
  var vtime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  var main_dtl='';

  for(var i=0;i<DB_CLUSTER.length;i++){   
    if(vclusterno){ //single
      if(DB_CLUSTER[i]['clusterno'] != vclusterno){ continue; }
    }

    clusterno=DB_CLUSTER[i]['clusterno'];
    //alert(clusterno);
    

    var cluster_regvotes=JBE_GETFLD('regVoters',DB_CLUSTER,'clusterno',clusterno);
    var cluster_votes=0;

    for(var k=0;k<DB_TRAN_VOTES.length;k++){      
      //if(DB_TRAN_VOTES[k][code] != vcode){ continue; }    
      if(DB_TRAN_VOTES[k]['clusterno'] != clusterno){ continue; }

      cluster_votes+=parseInt(DB_TRAN_VOTES[k]['votes']);      
    }

    var aryDB=JBE_GETARRY(DB_CLUSTER,'clusterno',clusterno);  
    var brgyDesc=JBE_GETFLD('brgyDesc',tmp_ref_brgy,'brgyCode',aryDB['brgyCode']);

    var dtl=
    '<div class="cls_preview_repo" style="page-break-after: always;position:relative;width:98%;height:1000px;padding:1%;margin:0 auto;margin-top:10px;color:black;border:1px solid gray;background:white;">'+    

      '<div style="width:100%;height:110px;font-size:14px;">'+
        '<div style="width:100%;height:20px;text-align:left;font-weight:bold;">PARTIAL AND UNOFFICIAL RESULTS -  PRECINCT LEVEL</div>'+
        '<div style="width:100%;height:20px;text-align:left;">As of: '+vtime+', '+vdate+'</div>'+
        '<div style="width:100%;height:20px;text-align:left;font-weight:bold;">BARANGAY NAME:'+brgyDesc+'</div>'+
        '<div style="width:100%;height:20px;text-align:left;font-weight:bold;">CLUSTER PRECINCT:'+clusterno+' '+DB_CLUSTER[i]['clustername']+'</div>'+
        '<div style="width:100%;height:20px;text-align:left;">'+jformatNumber(cluster_votes)+' of '+jformatNumber(cluster_regvotes)+' Registered Voters</div>'+
      '</div>'+
      '<div>';
    //document.getElementById('repo_main_header').innerHTML=dtl;
    
    dtl+=  
      ret_dtl_candi('07',clusterno,cluster_votes)+
      ret_dtl_candi('08',clusterno,cluster_votes)+
      ret_dtl_candi('09',clusterno,cluster_votes)+
      ret_dtl_candi('10',clusterno,cluster_votes)+
      '</div></div>';

    main_dtl+=dtl;
  }

  document.getElementById('prn_div').innerHTML=main_dtl;  
}

function ret_dtl_candi(pos,clusterno,cluster_votes){
  var aryVotes=DB_TRAN_VOTES;
  aryVotes.sort(sortByMultipleKey(['candi_no']));
  var ctr=0;

  var aryC=[];
  var i=0;
  
  while(i<aryVotes.length){  
    if(aryVotes[i]['pos'] != pos){ i++; continue; }
    if(aryVotes[i]['clusterno'] != clusterno){ i++; continue; }

    //if(aryVotes[i]['candi_no']==''){ i++; continue; }
    

    var sv_candi_no=aryVotes[i]['candi_no'];
    //alert(sv_candi_no);
    var votes=0;
    while(aryVotes[i]['candi_no'] == sv_candi_no){
      //alert('yes i='+i+' len:'+aryVotes.length);
      votes+=parseInt(aryVotes[i]['votes']);
      i++;
      if(i >= aryVotes.length){ break; }
    }
    let ob={
      code:sv_candi_no,
      name:JBE_GETFLD('name',DB_CANDIDATE,'code',sv_candi_no),
      votes:votes
    }
    aryC[ctr]=ob;
    ctr++;
  }
 
  var dtl=
  '<div style="width:100%;height:20px;text-align:left;font-size:14px;background:lightgray;">'+
    'FOR '+JBE_GETFLD('descrp',DB_POSITION,'pos',pos).toUpperCase()+
  '</div>'+
  '<div style="height:20px;width:100%;font-size:14px;text-align:center;padding:2px 0 0 0;background:gray;">'+
    '<div style="float:left;height:100%;width:6%;background:none;">RANK</div>'+
    '<div style="float:left;height:100%;width:35%;background:none;">CANDIDATE</div>'+
    '<div style="float:left;height:100%;width:34%;background:none;">POLITICAL PARTY</div>'+
    '<div style="float:left;height:100%;width:13%;background:none;">PERCENTAGE</div>'+
    '<div style="float:left;height:100%;width:12%;background:none;">VOTES</div>'+
  '</div>'+
  
  '<div style="height:10px;width:100%;"></div>';

  aryC.sort(sortByMultipleKey(['*votes','name']));
  for(var i=0;i<aryC.length;i++){
    var candi_no=aryC[i]['code'];
    var candi_name=JBE_GETFLD('name',DB_CANDIDATE,'code',candi_no).toUpperCase();
    var partyno=JBE_GETFLD('partyno',DB_CANDIDATE,'code',candi_no).toUpperCase();
    var partyname=JBE_GETFLD('partyname',DB_PARTY,'partyno',partyno).toUpperCase();
    var perc=round((parseInt(aryC[i]['votes'])/cluster_votes)*100,0);
    dtl+=
    '<div style="height:20px;width:100%;font-size:14px;">'+
      '<div style="float:left;height:100%;width:6%;text-align:center;">'+(i+1)+'. '+'</div>'+
      '<div style="float:left;height:100%;width:35%;text-align:left;">'+candi_name+'</div>'+
      '<div style="float:left;height:100%;width:34%;text-align:left;">'+partyname+'</div>'+
      '<div style="float:left;height:100%;width:13%;text-align:center;">'+perc+'% </div>'+
      '<div style="float:left;height:100%;width:12%;text-align:right;">'+jformatNumber(aryC[i]['votes'])+'</div>'+
    '</div>'+
    '<div style="height:10px;width:100%;"></div>';
  }
  //dtl+='</div>';

  return dtl;  
}