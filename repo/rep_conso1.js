function repo_conso1(){ 
  //alert(222);
  if(CURR_AXTYPE <4){
    snackBar('ACCESS DENIED...');
    return;
  }

  do_print_conso1();
  
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
      '<input id="btnGO" type="button" onclick="do_print_conso1(tx_repo_clusterno.value)" value="GO" style="width:100px;height:100%;color:white;background:'+JBE_CLOR+'"/>'+
    '</div>'+
    
  '</div>';
  var w='600px';
  if(JBE_MOBILE){ w= '90%'; }
  JBE_POPUP(w,dtl);
}

function put_cluster(fld,val){
  var aryDB=JBE_GETARRY(DB_CLUSTER,fld,val);  
  document.getElementById('tx_repo_clusterno').value = val;
  document.getElementById('tx_repo_clustername').value = aryDB['clustername'];
  document.getElementById('tx_repo_precincts').value = aryDB['precincts'];
  document.getElementById('tx_repo_brgyName').value = JBE_GETFLD('brgyDesc',tmp_ref_brgy,'brgyCode',aryDB['brgyCode']);
  document.getElementById('tx_repo_cityName').value = JBE_GETFLD('citymunDesc',ref_city,'citymunCode',aryDB['citymunCode']);
}

function do_print_conso1(){    
  JBE_POPUP_CLOSE();

  init_report('Partial and Unofficial Report - Consolidated');
  //document.getElementById('prn_div').innerHTML=' end of report '; 

  var clusterno='';
  var cluster_votes=0;

  var aryTranVotes=DB_TRAN_VOTES;
  aryTranVotes.sort(sortByMultipleKey(['candi_no','brgyCode']));
  var ctr=0;

  var aryOb=[];
  var i=0;
  
  while(i<aryTranVotes.length){  
    //if(aryTranVotes[i]['pos'] != pos){ i++; continue; }
    
    var sv_candi_no=aryTranVotes[i]['candi_no'];
    var pos=aryTranVotes[i]['pos'];
    //alert(sv_candi_no);    
    var sv_brgyCode='';
    while(aryTranVotes[i]['candi_no'] == sv_candi_no){
      sv_brgyCode=aryTranVotes[i]['brgyCode'];    
      var brgy_votes=0;
      while(sv_brgyCode==aryTranVotes[i]['brgyCode'] && aryTranVotes[i]['candi_no'] == sv_candi_no){
        brgy_votes+=parseInt(aryTranVotes[i]['brgyCode']);
        i++;
        if(i >= aryTranVotes.length){ break; }
      }
      let ob={
        "candi_no":sv_candi_no,
        "pos":pos,
        "brgyCode":sv_brgyCode,
        "brgyVotes":brgy_votes
      };
      aryOb[ctr]=ob;      
      ctr++;
      if(i >= aryTranVotes.length){ break; }
    }
    if(i >= aryTranVotes.length){ break; }
  }

  //alert('aryOb.length: '+aryOb.length);
  document.getElementById('prn_div').style.width='6700px';
  document.getElementById('prn_div').style.fontSize='12px';

  var aryBrgy=ref_brgy;
  var dtl='';
  var perc='x';
  for(var i=0;i<aryOb.length;i++){   
    var candi_no=aryOb[i]['candi_no'];
    var candi_name=JBE_GETFLD('name',DB_CANDIDATE,'code',candi_no).toUpperCase();
    var partyno=JBE_GETFLD('partyno',DB_CANDIDATE,'code',candi_no).toUpperCase();
    var partyname=JBE_GETFLD('partyname',DB_PARTY,'partyno',partyno).toUpperCase();
    //alert(candi_name);
    dtl+=
    '<div style="height:35px;width:100%;border:1px solid red;background:none;">'+
      '<div style="float:left;height:100%;width:40px;text-align:center;">'+(i+1)+'. '+'</div>'+
      '<div style="float:left;height:100%;width:200px;text-align:left;">'+candi_name+'</div>'+
      '<div style="float:left;height:100%;width:200px;text-align:left;">'+partyname+'</div>'+
      '<div style="float:left;height:100%;width:50px;text-align:center;">'+perc+'</div>';
      
      var dtl2='';
      for(var ji=0;ji<aryBrgy.length;ji++){
        if(aryBrgy[ji]['citymunCode'] != CURR_CITYMUNCODE){ continue; }
        dtl2+='<div style="float:left;height:100%;width:100px;border:1px solid blue;background:none;">'+aryBrgy[ji]['brgyDesc']+'</div>';
      }
      dtl+=dtl2+
      

      //'<div style="float:left;height:100%;width:12%;text-align:right;">'+jformatNumber(aryOb[i]['brgy_votes'])+'</div>'+
    '</div>'+
    '<div style="height:10px;width:100%;"></div>';
  }

  document.getElementById('prn_div').innerHTML=dtl; 
}


/*

  

  var vdate = JBE_DATE_FORMAT(new Date());
  var vtime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  var main_dtl='';

  var aryPos=DB_POSITION;
  //for(var i=0;i<aryPos.length;i++){   
    
    var vpos='';
    //alert(clusterno);

    //var cluster_regvotes=JBE_GETFLD('regVoters',aryPos,'clusterno',clusterno);
    //var cluster_votes=0;

    var dtl=
    '<div class="cls_preview_repo" style="page-break-after: always;position:relative;width:98%;height:1000px;padding:1%;margin:0 auto;margin-top:10px;color:black;border:1px solid gray;background:white;">'+    

      '<div style="width:100%;height:110px;font-size:14px;">'+
        '<div style="width:100%;height:20px;text-align:left;font-weight:bold;">PARTIAL AND UNOFFICIAL RESULTS -  PRECINCT LEVEL</div>'+
        '<div style="width:100%;height:20px;text-align:left;">As of: '+vtime+', '+vdate+'</div>'+        
        //'<div style="width:100%;height:20px;text-align:left;">'+jformatNumber(cluster_votes)+' of '+jformatNumber(cluster_regvotes)+' Registered Voters</div>'+
      '</div>'+
      '<div>';
    //document.getElementById('repo_main_header').innerHTML=dtl;
    
    dtl+=  
      //ret_dtl_conso1('07',clusterno,cluster_votes)+
      //ret_dtl_conso1('08',clusterno,cluster_votes)+
      //ret_dtl_conso1('09',clusterno,cluster_votes)+
      //ret_dtl_conso1('10',clusterno,cluster_votes)+
      '</div></div>';

    main_dtl+=dtl;

  //}
  //alert(main_dtl);

  document.getElementById('prn_div').innerHTML=main_dtl;  


function ret_dtl_conso1(pos,clusterno,cluster_votes){
  var aryTranVotes=DB_TRAN_VOTES;
  aryTranVotes.sort(sortByMultipleKey(['candi_no','brgyCode']));
  var ctr=0;

  var aryOb=[];
  var i=0;
  
  while(i<aryTranVotes.length){  
    if(aryTranVotes[i]['pos'] != pos){ i++; continue; }
    
    var sv_candi_no=aryTranVotes[i]['candi_no'];
    //alert(sv_candi_no);
    var votes=0;
    var aryOb=[];
    var sv_brgyCode='';
    while(aryTranVotes[i]['candi_no'] == sv_candi_no){
      sv_brgyCode=aryTranVotes[i]['brgyCode'];    
      var brgy_votes=0;
      while(sv_brgyCode=aryTranVotes[i]['brgyCode'] && aryTranVotes[i]['candi_no'] == sv_candi_no){
        brgy_votes+=parseInt(aryTranVotes[i]['brgyCode']);
        i++;
        if(i >= aryTranVotes.length){ break; }
      }
      let ob={
        "candi_no":sv_candi_no,
        "pos":pos,
        "brgyCode":sv_brgyCode,
        "brgyVotes":brgy_votes
      };
      aryOb[ctr]=ob;      
      ctr++;
      if(i >= aryTranVotes.length){ break; }
    }
    if(i >= aryTranVotes.length){ break; }
  }

  alert('aryOb:'+aryOb.length);
 
  var dtl=
  '<div style="width:100%;height:20px;text-align:left;font-size:14px;background:lightgray;">'+
    'FOR '+JBE_GETFLD('descrp',DB_POSITION,'pos',pos).toUpperCase()+
  '</div>'+
  '<div style="height:20px;width:100%;font-size:14px;text-align:center;padding:2px 0 0 0;background:gray;">'+
    '<div style="float:left;height:100%;width:6%;background:none;">RANK</div>'+
    '<div style="float:left;height:100%;width:35%;background:none;">CANDIDATE</div>'+
    '<div style="float:left;height:100%;width:34%;background:none;">POLITICAL PARTY</div>'+
    '<div style="float:left;height:100%;width:13%;background:none;">PERCENTAGE</div>'+
    '<div style="float:left;height:100%;width:12%;background:none;">VOTES</div>';
    var aryBrgy=ref_brgy;
    var dtl2='';
    for(var ji=0;ji<aryBrgy.length;ji++){
      if(aryBrgy[ji]['citymunCode'] != CURR_CITYMUNCODE){ continue; }
      dtl2+='<div style="float:left;height:100%;width:12%;background:none;">'+aryBrgy[ji]['brgyDesc']+'</div>';
    }
    dtl+=dtl2+
  '</div>'+
  
  '<div style="height:10px;width:100%;"></div>';

  aryOb.sort(sortByMultipleKey(['*brgyVotes','candi_no']));
  for(var i=0;i<aryOb.length;i++){
    var candi_no=aryOb[i]['candi_no'];
    var candi_name=JBE_GETFLD('name',DB_CANDIDATE,'code',candi_no).toUpperCase();
    var partyno=JBE_GETFLD('partyno',DB_CANDIDATE,'code',candi_no).toUpperCase();
    var partyname=JBE_GETFLD('partyname',DB_PARTY,'partyno',partyno).toUpperCase();
    var perc=round((parseInt(aryOb[i]['votes'])/cluster_votes)*100,0);
    dtl+=
    '<div style="height:20px;width:100%;font-size:14px;">'+
      '<div style="float:left;height:100%;width:6%;text-align:center;">'+(i+1)+'. '+'</div>'+
      '<div style="float:left;height:100%;width:35%;text-align:left;">'+candi_name+'</div>'+
      '<div style="float:left;height:100%;width:34%;text-align:left;">'+partyname+'</div>'+
      '<div style="float:left;height:100%;width:13%;text-align:center;">'+perc+'% </div>';

      var aryBrgy=ref_brgy;
      var dtl2='';
      for(var ji=0;ji<aryBrgy.length;ji++){
        if(aryBrgy[ji]['citymunCode'] != CURR_CITYMUNCODE){ continue; }
        dtl2+='<div style="float:left;height:100%;width:12%;background:none;">'+aryBrgy[ji]['brgyDesc']+'</div>';
      }
      dtl+=dtl2+

      //'<div style="float:left;height:100%;width:12%;text-align:right;">'+jformatNumber(aryOb[i]['brgy_votes'])+'</div>'+
    '</div>'+
    '<div style="height:10px;width:100%;"></div>';
  }
  //dtl+='</div>';

  return dtl;  
}
*/