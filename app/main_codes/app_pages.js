var live_id;
function show_candidates(){  
  //JBE_STORE_CANDIDATE[1]["display"]="none";
  var dtl=
  '<div style="width:100%;height:100%;margin-top:0px;padding:0px;overflow:auto;background:none;">';
  for(var i=0;i<JBE_STORE_CANDIDATE.length;i++){
    var vdisp=JBE_STORE_CANDIDATE[i]["display"];
    var vpos=JBE_STORE_CANDIDATE[i]["pos"];
    dtl+=
      '<div id="candi_'+vpos+'" onclick="view_box_candidate('+vpos+')" style="display:'+vdisp+';width:100%;height:auto;margin-top:0px;padding:5px;overflow:auto;background:none;">'+
        '<div class="cls_pos_head">'+JBE_STORE_CANDIDATE[i]["posname"]+'</div>'+
        '<div id="candi_dtl_'+vpos+'" class="cls_pos_body">'+

        '</div>'+
      '</div>';
  }
  dtl+='</div>';

  document.getElementById("user_main").innerHTML=dtl; 
  show_dtl_candidates();
}


function show_dtl_candidates(){
  var dtl=[];
  dtl[0]='';
  var aryCandidate=DB_CANDIDATE;
  aryCandidate.sort(sortByMultipleKey(['pos','lname','fname']));  
  //alert('DB_TRAN_VOTES '+DB_TRAN_VOTES.length);
  var vdtl='';
  var sv_pos=0;
  var ctr=1;
  
  for (var i=0;i<aryCandidate.length;i++){
    var vpos=parseInt(aryCandidate[i]['pos']-1);
    var v_candi_no=aryCandidate[i]['code'];

    var v_votes=JBE_GETFLD2('votes',DB_TRAN_VOTES,
      [
        {"fld":"clientno","val":CURR_CLIENT},
        {"fld":"watcherno","val":CURR_USER},
        {"fld":"candi_no","val":v_candi_no}
      ]
    );

    if(v_votes){ v_votes=parseInt(v_votes); }
    //alert('votes: '+v_votes);
    //alert(vpos+' - '+aryCandidate[i]['lname']+' - '+aryCandidate[i]['fname']+' - '+aryCandidate[i]['pos']);
    if(vpos != sv_pos){ ctr=1; }
    vdtl=
      '<div class="cls_shadow_dispboard" style="position:relative;width:100%;">'+
        '<div style="width:100%;height:100%;margin-top:0px;background:white;opacity:0.2;border:0px solid orange;border-radius:5px;"></div>'+
        '<div style="position:absolute;width:100%;height:100%;top:0px;left:0px;margin-top:0px;border:0px solid blue;color:white;background:none;">'+

          '<div class="cls_dispboard">'+
            '<div style="float:left;width:60%;height:100%;text-align:left;">'+ctr+'. '+aryCandidate[i]['lname']+', '+aryCandidate[i]['fname']+'</div>'+
            '<div style="float:left;width:40%;height:100%;text-align:right;">'+JBE_FORMAT_INT_TO_STR(v_votes)+'</div>'+
          '</div>'+
          
        '</div>'+
      '</div>';  
    
    if(vpos==sv_pos){      
      dtl[vpos]+=vdtl;      
    }else{      
      sv_pos=vpos;
      dtl[vpos]=vdtl;
    }
    ctr++;
  }
/*
  for (var i=0;i<dtl.length;i++){
    if(dtl[i]){ 
      document.getElementById('candi_dtl_'+JBE_STORE_CANDIDATE[i]["pos"]).innerHTML=dtl[i]; 
    }else{
      document.getElementById('candi_'+vvpos).style.display='none';
    }
  }
*/
  for (var i=0;i<dtl.length;i++){
    var vvpos=JBE_STORE_CANDIDATE[i]["pos"];  
    
    if(dtl[i]){ 
      document.getElementById('candi_dtl_'+vvpos).innerHTML=dtl[i]; 
    }else{
      document.getElementById('candi_'+vvpos).style.display='none';
    }
  }

}

function mnu_vbc(){
  var jmenu=
    '<div style="width:100%;height:100%;color:'+JBE_TXCLOR1+';">'+
      '<div onclick="send_votes()" style="float:left;width:25%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jsend.png"  style="height:100%;" alt="back image" />'+
        '</div>'+
        '<span class="footer_fonts">Send</span>'+
      '</div>'+
      
      '<div onclick="JBE_CLOSE_VIEW()" style="float:right;width:25%;height:100%;color:'+JBE_TXCLOR1+';background: none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jcancel.png"  style="height:100%;" alt="back image" />'+
        '</div>'+
        '<span class="footer_fonts">Cancel</span>'+
      '</div>'+      
    '</div>';
  dispMenu(false,jmenu);  
}

function view_box_candidate(vpos){
  if(!CURR_USER){ MSG_SHOW(vbOk,"ERROR:","Please Log In.",function(){},function(){}); return; }
  var dtl=
    '<div style="width:100%;height:100%;margin-top:0px;padding:5px;overflow:auto;'+
        'background-image:url(../gfx/web_bg.jpg);'+
        'background-size:100% 100%;'+
        'background-repeat:no-repeat;">'+ 

      '<div class="cls_pos_head">'+JBE_STORE_CANDIDATE[parseInt(vpos)-1]["posname"]+'</div>'+
      '<div id="candi_dtl" data-ctr=0 style="width:100%;height:auto;padding:5px;border:1px solid white;background:none;"></div>'+
    '</div>';
  
  JBE_OPEN_VIEW(dtl,'Vote Entry','close_view_box_candidate');
  mnu_vbc();
  var aryCandidate=DB_CANDIDATE;  
  aryCandidate.sort(sortByMultipleKey(['pos','lname','fname']));
  var ctr=1;
  var vdtl='';

  for (var i=0;i<aryCandidate.length;i++){        
    if(aryCandidate[i]['pos'] != vpos){ continue; }
  
    var v_candi_no=aryCandidate[i]['code'];
    var v_votes=JBE_GETFLD2('votes',DB_TRAN_VOTES,
      [
        {"fld":"clientno","val":CURR_CLIENT},
        {"fld":"watcherno","val":CURR_USER},
        {"fld":"candi_no","val":aryCandidate[i]['code']}
      ]
    );
    //alert('orig v_votes '+v_votes);
    if(v_votes){ v_votes=parseInt(v_votes); } else { v_votes=0; }
    //alert(v_votes+' candino '+v_candi_no);
    
    vdtl+=
      '<div id="vbc_'+ctr+'" style="width:100%;height:25px;font-size:14px;margin-top:20px;margin-bottom:20px;padding:2px;background:lightgray;">'+
        '<div style="float:left;width:70%;height:100%;text-align:left;padding:2px;">'+ctr+'. '+aryCandidate[i]['lname']+', '+aryCandidate[i]['fname']+'</div>'+        
        '<input id="inpVote_'+ctr+'" data-votes='+v_votes+' data-code="'+v_candi_no+'" type="number" value="'+v_votes+'" style="float:left;text-align:right;width:30%;height:100%;" />'+
      '</div>';
    ctr++;
  } 
  document.getElementById('candi_dtl').innerHTML=vdtl;   
  document.getElementById('candi_dtl').setAttribute('data-ctr',(ctr-1));
}
function close_view_box_candidate(){ 
  showMainPage();
}

function send_votes(){
  var ctr=document.getElementById('candi_dtl').getAttribute('data-ctr');
  //alert('CTR: '+ctr);  

  var clusterno=JBE_GETFLD('clusterno',DB_USER,'usercode',CURR_USER);
  //alert('send votes: '+clusterno);
  var aryDB=JBE_GETARRY(DB_CLUSTER,'clusterno',clusterno);
  
  var brgyCode=aryDB['brgyCode'];
  var citymunCode=aryDB['citymunCode'];
  var provCode=aryDB['provCode'];
  var regCode=aryDB['regCode'];
/*
  alert(
    'b '+brgyCode+'\n'+
    'c '+citymunCode+'\n'+
    'p '+provCode+'\n'+
    'r '+regCode
  );

*/
  var aryItems=[];
  for(var i=0;i<ctr;i++){
    var v_code=document.getElementById('inpVote_'+(i+1)).getAttribute('data-code');
    //alert(i+' = '+v_code);
    var cur_votes=parseInt(JBE_GETFLD('votes',DB_CANDIDATE,'code',v_code));
    var old_votes=parseInt(document.getElementById('inpVote_'+(i+1)).getAttribute('data-votes'));
    var new_votes=parseInt(document.getElementById('inpVote_'+(i+1)).value);

    //var aryDB=JBE_GETARRY(DB_,'brgyCode',v_code);

    if(!new_votes){ new_votes=0; }

    var upd_votes=(cur_votes-old_votes)+new_votes;
    /*
    alert(
      'cur_votes = '+cur_votes+'\n'+
      'old_votes = '+old_votes+'\n'+
      'new_votes = '+new_votes+'\n'+
      'upd_votes = '+upd_votes
    );
    */
    
    let ob = {
      candi_no:v_code,
      cur_votes:cur_votes,
      old_votes:old_votes,
      new_votes:new_votes
    };
    aryItems[i]=ob;  
    //alert('ary '+aryItems[i]['votes']);
  }

  axios.post(JBE_API+'app/zz_votes.php', { clientno:CURR_CLIENT, request: 2,   
    watcherno:CURR_USER,   
    clusterno:clusterno,
    brgyCode:brgyCode,
    citymunCode:citymunCode,
    provCode:provCode,
    regCode:regCode,    
    aryItems:JSON.stringify(aryItems)
  },JBE_HEADER)
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);    
    //alert('response.data: '+response.data.length);    
    DB_TRAN_VOTES=response.data[0];
    DB_CANDIDATE=response.data[1];
    JBE_CLOSE_VIEW();
    snackBar('Votes Updated...');
    show_dtl_candidates();
  },JBE_HEADER)    
  .catch(function (error) { console.log(error); showProgress(false); }); 

}

function goLive(f_live) {
  
  if(f_live) {
    live_id = setInterval(function(){ refresh_votes(); }, 10000);		
    //$('#jtime').show();
    //$('#btnLive').val('STOP');
    //$('#btnLive').css('background-color','red');
  }else{
    clearInterval(live_id);
    //$('#jtime').hide();
    //$('#btnLive').val('LIVE');      
    //$('#btnLive').css('background-color','navy');
  }    
}

function refresh_votes(){	    
  var d = new Date();  
  var n = d.toLocaleTimeString();
  $('#jtime').text(n);
  
  reborn_PROJ();
  reborn_MSG();
  showMarkers(CURR_PROJID);  
  if(CURR_PAGE==4) { dispProjects(true,CURR_PROJID); }
  if(CURR_PAGE==2) { 
    dispCurRep(div_sel_currep.value);  
    dispCurMsg(div_sel_curmsg.value);
  }  
  if(CURR_PAGE==3) { dispMsg(div_sel_msg.value); }  
}
