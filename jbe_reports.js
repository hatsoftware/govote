function dispReports(){    
  if(CURR_AXTYPE <4){
    snackBar('ACCESS DENIED...');
    return;
  }
    
  var dtl=
  '<div style="width:100%;height:100%;padding:0px;color:white;overflow:auto;background:lightgray;">'+

      '<div id="sys_menu1" class="cls_ds_main">'+ 
        '<p style="background:'+JBE_CLOR+';">REPORTS</p>'+   
        '<button onclick="repo_result(&quot;07&quot;)">Election Result by Congressional</button>'+           
        '<button onclick="dispByPrecincts()">Status Report by City</button>'+           
        '<button onclick="dispByPrecincts()">Status Report by Barangay</button>'+           
        '<input type="button" onclick="close_setting()" style="background:'+JBE_CLOR+';" value="Exit" />'+   
      '</div>'+

      '<div id="sys_menu2" style="display:none;"></div>'+      
    
  '</div>';

  JBE_OPEN_VIEW(dtl,'Reports','close_reports');    
  modal_ON(true);
}

function close_reports(){
  showMainPage();
}

//========================================================================

function repo_result(pos){ 
  if(CURR_AXTYPE <4){
    snackBar('ACCESS DENIED...');
    return;
  }
  //f_RESIZE=false;  
  var vdate = JBE_DATE_FORMAT(new Date());
  var vtime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  
  var tot_votes=0;

  var aryCandi=DB_CANDIDATE;
  aryCandi.sort(sortByMultipleKey(['*votes','name']));

  for(var k=0;k<DB_TRAN_VOTES.length;k++){      
    //if(DB_TRAN_VOTES[k][code] != vcode){ continue; }    
    if(DB_TRAN_VOTES[k]['pos'] != pos){ continue; }

    tot_votes+=parseInt(DB_TRAN_VOTES[k]['votes']);      
  }
  
  var dtl=
  '<div id="main_prn_precincts" style="position:relative;width:100%;height:100%;padding:0px;color:white;padding:5px;background:lightblue;">'+

    '<div class="cls_repo" style="width:100%;height:'+(H_BODY-40)+'px;padding:10px;color:black;background:green;">'+      

      '<div id="prn_div" style="width:912px;height:100%;padding:10px;overflow:auto;margin:0 auto;color:black;background:white;">'+

        '<div id="repo_main_header" style="position:relative;width:100%;height:60px;font-size:12px;border:1px solid black;color:black;background:lightgray;">'+ //head
        
          '<div style="position:relative;width:100%;height:100%;border:0px solid black;">'+ //head

            '<div class="cls_header" style="float:left;width:33%;height:60px;text-align:left;padding:5px;background:green;">'+
              '<div> xxxElection Results</div>'+
              '<span id="subtilt_"></span>'+
            '</div>'+

            '<div style="float:left;width:33%;height:100%;text-align:center;padding:2px;background:blue;">'+
              '<div style="width:100%;height:55%;padding:0px;font-size:25px;background:none;">'+
                'xxxxxxxxxxxxxx'+
              '</div>'+
              '<div style="width:100%;height:45%;padding:0px;font-size:20px;background:none;">'+
                'gggggggggggg'+
              '</div>'+
            '</div>'+

            '<div style="float:right;width:33%;height:60px;text-align:right;padding:2px;background:red;">'+
              /*
                '<div style="width:100%;height:34%;">Total Registered Voters : </div>'+
                    '<span style="width:100%;height:34%;" id="headTotRegVoters_">0</span>'+
                '<div style="width:100%;height:33%;">Total Precincts : </div>'+
                    '<span style="width:100%;height:33%;" id="headTotPrecincts_">0</span>'+
                '<div style="width:100%;height:33%;">Total Votes Counted : </div>'+
                    '<span style="width:100%;height:33%;" id="headTotVotes_">0</span>'+
              */
            '</div>'+
            
          '</div>'+

        '</div>'+

        '<div style="margin-top:30px;width:100%;height:20px;border:1px solid red;background:none;">'+
          '<div style="float:left;width:40%;height:20px;max-height:100%;text-align:left;background:none;">'+
            'CANDIDATE NAME'+
          '</div>'+
          '<div style="float:left;width:20%;height:20px;max-height:100%;background:none;">'+
            'TOTAL VOTES'+
          '</div>'+
          '<div style="float:left;width:20%;height:20px;max-height:100%;background:none;">'+
            'RANKING'+
          '</div>'+
          '<div style="float:left;width:20%;height:20px;max-height:100%;background:none;">'+
            'PERCENTAGE'+
          '</div>'+
        '</div>'+  
        
        '<div style="margin-top:30px;width:100%;height:auto;overflow:auto;background:none;">';
          var dtl2='';
          var ctr=0;
          var votes=0;
          for(var i=0;i<aryCandi.length;i++){
            if(aryCandi[i]['pos'] != pos){ continue; }

            votes=parseInt(aryCandi[i]['votes']);
            ctr++;

            dtl2+=
            '<div style="float:left;width:40%;height:20px;max-height:40px;text-align:left;background:none;">'+
              aryCandi[i]['name']+
            '</div>'+
            '<div style="float:left;width:20%;height:20px;max-height:40px;text-align:center;background:none;">'+
              votes+            
            '</div>'+
            '<div style="float:left;width:20%;height:20px;max-height:40px;text-align:center;background:none;">'+
              'Rank '+ctr+
            '</div>'+
            '<div style="float:left;width:20%;height:20px;max-height:40px;text-align:center;background:none;">'+
              round(((votes/tot_votes)*100),0)+'%'+
            '</div>';
            
          }

          dtl+=dtl2+
          
        '</div>'+  
      '</div>'+ 

    '</div>'+
    
    '<div style="width:100%;height:40px;padding:5px;text-align:center;color:white;background:red;">'+
      '<input type="button" onclick="do_print_repo()" style="width:100px;height:100%;color:'+JBE_TXCLOR1+';border-radius:8px;background:none;" value="Print" />'+              
    '</div>'+
    
  '</div>';          

  JBE_OPEN_VIEW(dtl,'Report By Precincts','close_dispByPrecincts');
  //update_rephead_total('1repo','brgy',CURR_CITYMUNCODE,tot_votes);
  modal_ON(true);
}

function update_rephead_total(div,place_type,place_no,tot_counted){    
  var fld;
  //alert('div:'+div);
  if(place_type=='citymun'){
    fld='provCode';
  }else if(place_type=='brgy'){
    fld='citymunCode';
  }else if(place_type=='cluster'){
    fld='brgyCode';
  }
  
  var tot_reg=500;
  var tot_precinct=0;
  for(var i=0;i<DB_CLUSTER.length;i++){
    //alert(DB_CLUSTER[i][fld]+' vs '+place_no);
    if(DB_CLUSTER[i][fld] != place_no){ continue; }
    tot_reg+=parseInt(DB_CLUSTER[i]['regVoters']);
    tot_precinct+=parseInt(DB_CLUSTER[i]['prec_len']);
  }
  
  document.getElementById('headTotRegVoters_'+div).innerHTML=jformatNumber(tot_reg);
  document.getElementById('headTotPrecincts_'+div).innerHTML=jformatNumber(tot_precinct);
  document.getElementById('headTotVotes_'+div).innerHTML=jformatNumber(tot_counted);
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
  '<div id="main_prn_precincts" style="position:relative;width:100%;height:100%;padding:0px;color:white;padding:5px;background:yellow;">'+

    '<div class="cls_repo" style="width:100%;height:'+(H_BODY-40)+'px;padding:10px;color:black;background:green;">'+      

      '<div id="prn_div" style="width:612px;height:100%;padding:10px;overflow:auto;margin:0 auto;color:black;background:white;">'+
        
        '<div style="width:100%;height:auto;overflow:auto;background:cyan;">';
          var dtl2='';
          for(var i=0;i<DB_CLUSTER.length;i++){
            dtl2+=
            '<div class="box" style="float:left;width:47%;height:300px;margin:5px;text-align:center;font-size:14px;padding:5px;border:1px solid red;">'+
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