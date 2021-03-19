function dispReports(){    
  if(CURR_AXTYPE <4){
    snackBar('ACCESS DENIED...');
    return;
  }
    
  var dtl=

  '<div style="margin:0 auto;width:1025px;height:100%;padding:10px;border:1px solid red;">'+
    '<div class="cls_rep" id="div_rep1" style="margin-left:0px;">'+
      '<div>Election Returns Report</div>'+
      '<img src="gfx/jorg.png"/>'+
      '<h1 id="tech_ctr"></h1>'+
      '<select id="sel_repo" data-type=0 name="sel_repo" onchange="" style="width:100%;height:25px;font-size:12px;padding:0px;">'+
        '<option value=0>National Level</option>'+
        '<option value=1>Provincial Level</option>'+
        '<option value=2>District Level</option>'+
        '<option selected value=3>City/Municipal Level</option>'+
        '<option value=4>Barangay Level</option>'+
      '</select>'+  
      '<h1 id="tech_ctr_tot"></h1>'+
      '<button onclick="dispByPrecincts()" style="color:white;background:'+JBE_CLOR+'">Print Report</button>'+
    '</div>'+
    '<div class="cls_rep" id="div_rep2">'+
      '<div>xxx</div>'+
      '<img src="gfx/jorg.png"/>'+
      '<h1 id="org_ctr"></h1>'+
      '<h2>xxx</h2>'+
      '<h1 id="org_ctr_tot"></h1>'+
      '<button onclick="" class="head_color">Print Report</button>'+
    '</div>'+
    '<div class="cls_rep" id="div_rep3">'+
      '<div>xxx</div>'+
      '<img src="gfx/jorg.png"/>'+
      '<h1 id="water_ctr"></h1>'+
      '<h2>xxxx</h2>'+
      '<h1 id="water_ctr_tot"></h1>'+
      '<button onclick="" class="head_color">Print Report</button>'+
    '</div>'+
  '</div>';

  JBE_OPEN_VIEW(dtl,'Reports','close_reports');    
  modal_ON(true);
}

function close_reports(){
  showMainPage();
}


function dummy(){
  var dtl=
  '<div style="width:100%;height:100%;padding:0px;color:white;overflow:auto;background:none;">'+

      '<div id="sys_menu1" class="cls_ds_main">'+ 
        '<p>Reports</p>'+   
        '<button onclick="dispByPrecincts()">Votes by Precincts</button>'+           
        '<input type="button" onclick="showMainPage()" style="background:'+JBE_CLOR+';" value="Exit" />'+   
      '</div>'+
    
  '</div>';          
  document.getElementById('page_dummy').innerHTML=dtl;
  openPage('page_dummy');
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

function do_print_pvc(){  
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

    '<div style="width:100%;height:90%;padding:10px;color:black;background:green;">'+      

      '<div id="prn_div" style="width:612px;height:100%;padding:10px;overflow:auto;margin:0 auto;color:black;background:white;">'+
        
        '<div style="width:100%;height:auto;overflow:auto;background:violet;">';
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
    
    '<div style="width:100%;height:10%;padding:5px;text-align:center;color:white;background:red;">'+
      '<input type="button" onclick="do_print_pvc()" style="width:100px;height:100%;color:'+JBE_TXCLOR1+';border-radius:8px;background:none;" value="Print" />'+              
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