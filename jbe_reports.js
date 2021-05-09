function dispReports(){    
  if(CURR_AXTYPE <4){
    snackBar('ACCESS DENIED...');
    return;
  }
    
  var dtl=
  '<div style="width:100%;height:100%;padding:0px;color:white;overflow:auto;background:lightgray;">'+

      '<div id="sys_menu1" class="cls_ds_main">'+
        '<p style="background:'+JBE_CLOR+';">REPORTS</p>'+        
        '<button onclick="proc_consolidated()">Consolidated Report</button>'+
        '<button onclick="proc_precinct_level()">Precinct Level Report</button>'+
        '<button onclick="proc_conso_precinct()">Consolidated Precinct Status Group by Barangay Report</button>'+
        '<button onclick="proc_brgy_level()">Barangay Level Report</button>'+
        '<br>'+
        //'<button onclick="proc_precinct_level2()">Precinct Level Report</button>'+
        //'<button onclick="proc_sample()">Sample Report</button>'+
        //'<button onclick="repo_precinct_level()">Partial/Final and Unofficial Report - Precinct Level</button>'+        
        //'<button onclick="not_yet()">Precinct Status Group by Barangay Report</button>'+
        //'<button onclick="repo_conso_precinct()">Consolidated Precinct Status Group by Barangay Report</button>'+
        '<input type="button" onclick="close_setting()" style="background:'+JBE_CLOR+';" value="Exit" />'+   
      '</div>'+

      '<div id="sys_menu2" style="display:none;"></div>'+      
    
  '</div>';

  JBE_OPEN_VIEW(dtl,'Reports','close_reports');    
  modal_ON(true);
}
function not_yet(){
  snackBar('Under construction...');
}


function close_reports(){
  showMainPage();
}

function prn_repo(rep_title,rep_php,param){
  //alert(document.getElementById("i_fcode").value.trim());
  var link = document.createElement('prn');
  //var link = document.getElementById('repOpt');  
  var dtl='<div>'+
            '<a href="" target="">'+
              '<input type="button" style="width:100px;height:100%;text-align:center;color:white;background-color:<?php echo $clor_head;?>;" value="View Report" />'+
            '</a>'+
          '</div>';

  link.innerHTML=dtl;
  var newrep=JBE_API+'reps/'+rep_php+param;
  link.setAttribute('href', newrep);
  link.setAttribute('target', rep_title);  
  window.open(newrep,rep_title);
  //window.history.pushState("object or string", "Title", "/new-url");
  history.pushState(null, null, '/en/step2');
}

function put_cluster(fld,val){
  var aryDB=JBE_GETARRY(DB_CLUSTER,fld,val);  
  document.getElementById('tx_repo_clusterno').value = val;
  document.getElementById('tx_repo_clustername').value = aryDB['clustername'];
  document.getElementById('tx_repo_precincts').value = aryDB['precincts'];
  document.getElementById('tx_repo_brgyName').value = JBE_GETFLD('brgyDesc',tmp_ref_brgy,'brgyCode',aryDB['brgyCode']);
  document.getElementById('tx_repo_cityName').value = JBE_GETFLD('citymunDesc',ref_city,'citymunCode',aryDB['citymunCode']);
}

function put_brgy(fld,val){
  var aryDB=JBE_GETARRY(tmp_ref_brgy,fld,val);    
  document.getElementById('tx_repo_brgyCode').value = val;
  document.getElementById('tx_repo_brgyName').value = JBE_GETFLD('brgyDesc',tmp_ref_brgy,'brgyCode',aryDB['brgyCode']);  
}

//========================================================================
function init_report(tilt,vsize){
  var w=vsize[0];
  var h=vsize[1];
  var o=vsize[2]; // 0=portrait 1=landscape
  var orient='portrait';
  if(o==1){ orient='landscape'; }
  var dtl=
  '<div id="repo_main" style="position:relative;width:100%;height:100%;font-family: "Lato","Arial", sans-serif;padding:0px;color:white;padding:5px;border:0px solid red;">'+
    '<div class="cls_repo" style="width:100%;height:'+(H_BODY-30)+'px;padding:0px;overflow:auto;color:black;background:lightgray;">'+      
            
      '<div id="prn_div" style="position:relative;width:100%;height:100%;padding:0px;color:black;background:none;">'+  
      '</div>'+ //printable

    '</div>'+
    
    '<div style="width:100%;height:40px;padding:5px;text-align:center;color:white;background:dimgray;">'+
      //'<input type="button" onclick="do_print_repo()" style="width:100px;height:100%;color:white;cursor:pointer;border-radius:8px;border:1px solid white;background:black;" value="Print" />'+
      //'<input type="button" onclick="printJS(&quot;prn_div&quot;,&quot;html&quot;)" style="width:100px;height:100%;color:white;cursor:pointer;border-radius:8px;border:1px solid white;background:black;" value="Print JS" />'+      
      //'<input type="button" onclick="generatePDF('+w+','+h+',&quot;'+orient+'&quot;)" style="width:100px;height:100%;color:white;cursor:pointer;border-radius:8px;border:1px solid white;background:black;" value="PDF" />'+

      '<input type="button" onclick="generatePDF('+w+','+h+',&quot;'+orient+'&quot;)" style="width:100px;height:100%;color:white;cursor:pointer;border-radius:8px;border:1px solid white;background:black;" value="Print" />'+
    '</div>'+
    
  '</div>';          
  JBE_OPEN_VIEW(dtl,tilt,'');  
  modal_ON(true);
}

function generatePDF(w,h,orient) {
  showProgress(true);  
  const element = document.getElementById("prn_div");
  // Choose the element and save the PDF for our user.
  if(JBE_MOBILE){ //mobile
    html2pdf()
      .from(element)
      .save();
      showProgress(false);  
  }else{
    html2pdf()
    .set({ 
      html2canvas: { scale: 2 },
      filename: 'myPage.pdf',
      margin: 0.05,
      //pagebreak: { mode:'avoid-all', before:'#page2el' },
      //pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }, //It determines how HTML elements should be split.
      //image: {type: 'jpeg', quality: 0.9},
      //jsPDF: { unit:'in',format: [87,8.5], orientation:'landscape' } 
      jsPDF: { unit:'in',format:[w,h], orientation:orient } 
      //jsPDF: { format: [element.width,element.height], orientation:'landscape' } 
    })
    .from(element).toPdf().get('pdf').then(function (pdf) {
      window.open(pdf.output('bloburl'),'_blank');
      showProgress(false);  
    });  
    

  }
}

function the_perc(n){
  var tt=n+'%';
  var ww=n+'%';
  if(n <= 0){ 
    tt=''; 
    ww='0%';
  }
  var div=
  '<div style="width:'+ww+';height:100%;background:coral;">'+tt+'</div>';
  return div;
}

function JBE_POPUP(w,vdtl,tilt){  
  var dtl=
  '<div id="popup" data-div="" data-rep="" data-targ="" data-date="no" class="repOpt" style="width:'+w+';box-shadow: 0px 0px 8px;background:none;">'+
    '<div id="popup-box" style="display:block;z-index:1600;position:absolute;border:1px solid gray;width:100%;height:auto;'+
        'font-size:10px;padding:0px;'+
        'top: 50%;  left: 50%;  -webkit-transform: translate(-50%, -50%);  transform: translate(-50%, -50%);background:red;">'+

      '<div id="popup-head" class="head_color" style="position:relative;width:100%;height:40px;padding:5px;background:'+JBE_CLOR+';">'+
        '<div id="popup-title" style="float:left;width:100%;height:100%;font-size:20px;padding:2px;color:white;">'+tilt+'</div>'+   
        '<input type="button" onclick="JBE_POPUP_CLOSE()" style="position:absolute;top:5px;right:5px;width:30px;height:30px;border:1px solid gray;border-radius:5px;cursor:pointer;" value="X"/>'+
      '</div>'+ 
    
      '<div id="popup-body" data-recno="" style="width:100%;height:auto;font-size:14px;font-weight:normal;padding:5px;border:1px solid gray;background-color:#f1f1f1;">'+
        vdtl+
      '</div>'+
      
    '</div>'+
  '</div>';
  document.getElementById('div_popup').innerHTML=dtl;  
  document.getElementById('div_popup').style.display='block';  
}
function JBE_POPUP_CLOSE(){
  //document.getElementById('div_popup').innerHTML='';
  document.getElementById('div_popup').style.display='none';  
}


//========================================================================

function addDays(date, days) {
  return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + days,
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
  );
}

function dateRanger(mod,v){
  var xday=0;  
  var mm,dd,yyyy;
  var rval='';

  //var today = new Date('2020-12-11');  
  var today = new Date();  
  
  yyyy = today.getFullYear();  
  dd = 1;
  if(v==1){
    mm = today.getMonth();// + 1; //January is 0!
    if(mod=="C"){
      mm=mm+1;
    }else if(mod=="C1"){
      mm=1;      
    }
  }else{    
    mm = today.getMonth() + 2; //January is 0!
    if(mod=="C"){      
      //mm=mm+2;
      if(mm > 12) { 
        mm=mm-12; 
        yyyy=yyyy+1;
      }      
    }

    if (dd < 10) { dd = '0' + dd; } 
    if (mm < 10) { mm = '0' + mm; } 
    
    today = new Date(yyyy + '-' + mm + '-' + dd); 
    today=addDays(today,-1);
    mm = today.getMonth()+1;    
    dd = today.getDate();
    yyyy = today.getFullYear();   
    
  }
  if (dd < 10) { dd = '0' + dd; } 
  if (mm < 10) { mm = '0' + mm; }  
  rval = yyyy + '-' + mm + '-' + dd;
  return rval;
}

function showPass(){
  document.getElementById("div_pass").style.display="block";  
}

function chg_region(v){
  if(parseInt(v)<10){
    v='0'+parseInt(v);
  }
  document.getElementById("i_region").value=v;
}
function showFilter(t){
  //alert(t);
  var vdisp='block';
  var vdispMap='none';
  var vrepbody="none";
  
  document.getElementById("divFilter").style.display='block';
  
  //document.getElementById("mnu6_body").style.pointerEvents=vrepbody;
  //document.getElementById("div_mapbox").style.display=vdispMap;
  if(!t){ 
    document.getElementById("divFilter").style.display='none';      
  }  
}
  

///////////////////////////////////////////////////////////////////////////////////////////

function chg_repdate(){
  //var odate2=document.getElementById('i_to').value;
  //alert(document.getElementById('i_from').getAttribute('data-from'));
  
  if(Date.parse(document.getElementById("i_from").value) > Date.parse(document.getElementById("i_to").value)){
    MSG_SHOW(vbOk,"ERROR: Date Range","The FROM Date field is Greater Than the TO Date field. Try again.",function(){
      document.getElementById("i_from").value=dateRanger('C',1);
      document.getElementById("i_to").value=dateRanger('C',2);
    },function(){});       
    return false;
  }else{
    return true;
  }
  
}

function do_print_repo(){  
  var originalContents = document.body.innerHTML;    
  document.querySelectorAll('.cls_preview_repo').forEach(function(el) {
    el.style.border='0px';
  });
  
  var printContents = document.getElementById('prn_div').innerHTML;//.cloneNode(true);
    
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
}


//========================================================================

function dispByPrecincts(){    
  if(CURR_AXTYPE <4){
    snackBar('ACCESS DENIED...');
    return;
  }
  //f_RESIZE=false;  
  var dtl=
  '<div id="main_prn_precincts" style="position:relative;width:100%;height:100%;padding:0px;color:white;padding:5px;background:green;">'+

    '<div class="cls_repo" style="width:100%;height:'+(H_BODY-40)+'px;padding:10px;color:black;background:green;">'+      

      '<div id="prn_div" style="width:612px;height:100%;padding:10px;overflow:auto;margin:0 auto;color:black;background:white;">'+
        
        '<div style="width:100%;height:auto;overflow:auto;background:cyan;">';
          var dtl2='';
          for(var i=0;i<DB_CLUSTER.length;i++){
            dtl2+=
            '<div class="box" style="float:left;width:47%;height:300px;margin:5px;text-align:center;font-size:14px;padding:5px;border:0px solid red;">'+
              '<div style="float:left;width:100%;height:20px;">Registered Voters: <span>999</span></div>'+
              '<div style="float:left;width:100%;height:20px;">Valid Ballots Counted: <span>888</span></div>'+
              '<div style="float:left;width:100%;height:20px;max-height:40px;background:red;">'+
                DB_CLUSTER[i]['clustername']+'  '+DB_CLUSTER[i]['precincts']+
              '</div>'+
              '<div id="rep_precincts_'+DB_CLUSTER[i]['clusterno']+'" style="float:left;width:100%;height:20px;max-height:50px;background:red;"></div>'+
                disp_result(DB_CLUSTER[i]['clusterno'],'08')+
            '</div>';
          }
          //'<p style="page-break-before:always;"></p>';
          '<div style="break-after:page"></div>';
          dtl+=dtl2+
          
        '</div>'+  
      '</div>'+ 

    '</div>'+
    
    '<div style="width:100%;height:40px;padding:5px;text-align:center;color:white;background:red;">'+
      '<input type="button" onclick="do_print_repo()" style="width:100px;height:100%;color:'+JBE_TXCLOR1+';border-radius:8px;background:none;" value="Print" />'+              
    '</div>'+
    
  '</div>';          

  JBE_OPEN_VIEW(dtl,'Report By Precincts','close_dispByPrecincts');    
  //show_dtl_returns('08');
  modal_ON(true);
}

function disp_result(clusterno,pos){ 
  //alert(clusterno+' pos:'+pos);
  var aryResult=[];
  var votes=0;
  var aryVotes=DB_TRAN_VOTES;
  aryVotes.sort(sortByMultipleKey(['clusterno','candi_no']));
  for(var i=0;i<DB_TRAN_VOTES.length;i++){
    if(DB_TRAN_VOTES[i]['clusterno'] != clusterno){ continue; }
    
    var candi_no=DB_TRAN_VOTES[i]['candi_no'];        
    var candi_pos=JBE_GETFLD('pos',DB_CANDIDATE,'code',candi_no);
    if(candi_pos != pos){ continue; }
    
    votes+=DB_TRAN_VOTES[i]['votes'];

    var ob={
      "name":JBE_GETFLD('name',DB_CANDIDATE,'code',candi_no), 
      "votes":votes
    }
    aryResult[i]=ob;
  }

  aryResult.sort((a, b) => a.votes.localeCompare(b.votes));
  //alert(aryResult.length);
  var dtl='xxx';
  if(aryResult.length==0){ return dtl; }

  for(var k=0;k<1;k++){      
    dtl+=
    '<div style="width:100%;height:20px;border:1px solid black;">'+
      '<div style="width:100%;height:20px;border:1px solid black;">'+aryResult[k]['name']+'</div>'+
      '<div style="width:100%;height:20px;border:1px solid black;">'+aryResult[k]['votes']+'</div>'+
    '</div>';
  }
  return dtl;
}

function close_dispByPrecincts(){
  //showMainPage();
}  

//========================================================================