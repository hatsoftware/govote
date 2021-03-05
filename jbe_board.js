var map;
function dispBoard(){  
  //return;
  /* note:
    1 - President
    2 - Vice President
    3 - Senator

    4 - Governor
    5 - Vice Gov
    6 - Board Member

    7 - Congressman

    8 - Mayor
    9 - Vice Mayor
    10 - Councilors

    11 - Chairman
    12 - Brgy. Councilor

  */
  
  var vdtl='';
    
  for(var i=0;i<JBE_STORE_CANDIDATE.length;i++){
    var vdisp=JBE_STORE_CANDIDATE[i]["display"];
    var vpos=JBE_STORE_CANDIDATE[i]["pos"];
    vdtl+=
      '<div id="candi_'+vpos+'" style="display:'+vdisp+';width:100%;max-width:100%;height:auto;margin-top:0px;padding:20px 0 10px 0;background:none;">'+
        '<div class="cls_pos_head">'+JBE_STORE_CANDIDATE[i]["posname"].toUpperCase()+'</div>'+
        '<div id="candi_dtl_'+vpos+'" class="cls_pos_body">'+
        
        '</div>'+  
      '</div>';
  }      
    
  document.getElementById("user_main").innerHTML=vdtl; 


  var dtl=[];
  dtl[0]='';
  var aryCandidate=DB_CANDIDATE;
  aryCandidate.sort((a, b) => a.pos.localeCompare(b.pos) || b.votes - a.votes);

  var vdtl='';
  var sv_pos=0;
  var ctr=1;
  for (var i=0;i<aryCandidate.length;i++){
    var vpos=parseInt(aryCandidate[i]['pos']-1);
   
    if(vpos != sv_pos){ ctr=1; }

    var vcode=aryCandidate[i]['code'];
   
    vdtl=          
      '<div class="cls_shadow_dispboard" onclick="dispVotesGraph('+i+',&quot;'+aryCandidate[i]['code']+'&quot;)" style="position:relative;width:100%;border:0px solid black;cursor:pointer;">'+
        '<div class="cls_shadow_box1"></div>'+
        '<div class="cls_shadow_box2">'+
          
          '<div class="cls_dispboard">'+
            '<div id="candi_ctr_'+i+'" class="cls_dispboard_ctr">'+
              (ctr+0)+'.'+
            '</div>'+
            '<div class="cls_dispboard_img">'+
              '<img id="candi_img_'+i+'" src="'+JBE_API+'upload/photo/'+vcode+'.jpg" style="height:100%;width:55px;border:1px solid black;border-radius:8px;background:white;"/>'+              
            '</div>'+
            '<div class="cls_dispboard_candi">'+
            
              '<div id="candi_name_'+i+'" class="cls_dispboard_candi_1">'+
                aryCandidate[i]['lname']+', '+aryCandidate[i]['fname']+
              '</div>'+
              '<div id="candi_party_'+i+'" class="cls_dispboard_candi_2">'+
                //'NPC - National People\'s Coalition'+
                JBE_GETFLD('partyname',DB_PARTYMAST,'partyno',aryCandidate[i]['partyno'])+
              '</div>'+
              '<div id="candi_pos_'+i+'" class="cls_dispboard_candi_3">'+
                //'NPC - National People\'s Coalition'+
                //var ppos=aryCandidate[i]['pos']+
                JBE_STORE_CANDIDATE[vpos]['posname']+
              '</div>'+
            
            '</div>'+
            '<div id="candi_votes_'+i+'" class="cls_dispboard_votes">'+
              jformatNumber(aryCandidate[i]['votes'])+
            '</div>'+
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
  
  for (var i=0;i<dtl.length;i++){
    var vvpos=JBE_STORE_CANDIDATE[i]["pos"];  
    //alert(dtl[i]);
    if(dtl[i]){ 
      document.getElementById('candi_dtl_'+vvpos).innerHTML=dtl[i]; 
    }else{
      document.getElementById('candi_'+vvpos).style.display='none';
    }
  }
}

function dispVotesGraph(i,candi_no){
  if(CURR_SCOPE_TYPE > 0 && CURR_SCOPE_NO==''){
    snackBar('ERROR: System Scope Invalid...');
    return;
  }
  openPage('page_viewer');
  
  modal_ON(true);
  document.getElementById('dtv_img').src = document.getElementById('candi_img_'+i).src;
  document.getElementById('dtv_name').innerHTML = document.getElementById('candi_name_'+i).innerHTML;
  document.getElementById('dtv_party').innerHTML = document.getElementById('candi_party_'+i).innerHTML;
  document.getElementById('dtv_pos').innerHTML = document.getElementById('candi_pos_'+i).innerHTML;
  document.getElementById('dtv_votes').innerHTML = document.getElementById('candi_votes_'+i).innerHTML;
  
  //map.invalidateSize();
  //map.setView([11.8787, 121.7740],6);
  for(var i=1;i<=4;i++){ document.getElementById('id_tab'+i).style.display='none'; }
  
  if(CURR_SCOPE_TYPE==0){    
    show_region(candi_no,'');
  }else if(CURR_SCOPE_TYPE==1){    
    show_citymun(candi_no,CURR_SCOPE_NO);
  }else if(CURR_SCOPE_TYPE==2){
    show_district(candi_no,CURR_SCOPE_NO);  
  }else if(CURR_SCOPE_TYPE==3){
    show_brgy(candi_no,CURR_SCOPE_NO);    
  }
}

//
function show_folder(v,vCode,votes){  
  //alert(v+' = '+vCode+' votes:'+votes);  
  var vvotes=jformatNumber(votes);  
  var tilt='';
  var ary_scope=['National:','Province:','District:','City/Municipal:'];
  var ary_label=['Region:','Province:','District:','City/Municipal:','Barangay:'];

  if(CURR_SCOPE_TYPE==0){ 
    var ary_label=['','Region:','Province:','City/Municipal:','Barangay:'];
  }

  document.getElementById('id_label').innerHTML=ary_scope[CURR_SCOPE_TYPE];    
  tilt='[ '+ary_label[(v)]+' ('+vvotes+') ]';   
  document.getElementById('id_tab'+v).value=tilt;
  document.getElementById('id_tab'+v).style.display='block';
  document.getElementById('id_label').setAttribute('data-regCode',vCode);
  //display map
  if(v==1){
    document.getElementById('pmap').src='maps/main.jpg';
  }else if(v==2){
    document.getElementById('pmap').src='maps/reg_'+vCode+'.png';
  }
}  

//
function menu_folder(v){
  var ary_id=['reg','prov','citymun','brgy'];
  for(var i=1;i<=4;i++){ document.getElementById('summ'+i).style.display='none';  }
  document.getElementById('summ'+v).style.display='block';  

  for(var i=(v+1);i<=4;i++){ document.getElementById('id_tab'+i).style.display='none'; }
  if(v==1){
    document.getElementById('pmap').src='maps/main.jpg';
  }
}
//
function show_region(candi_no,vCode){   
  disp_place_votes(candi_no,'reg',vCode);  
}

function show_province(candi_no,vCode){      
  disp_place_votes(candi_no,'prov',vCode);  
  var aryDB=JBE_GETARRY(ref_reg,'regCode',vCode);    
  var lat=parseFloat(aryDB['lat']);
  var lng=parseFloat(aryDB['lng']);
  var zm=parseFloat(aryDB['zoom']);
  //map.setView([lat, lng], zm);
}
//
function show_district(candi_no,vCode){
  disp_place_votes(candi_no,'district',vCode);
}
//
function show_citymun(candi_no,vCode){
  disp_place_votes(candi_no,'citymun',vCode);
}
//
function show_brgy(candi_no,vCode){  
  disp_place_votes(candi_no,'brgy',vCode);
}
function show_none(candi_no,vCode){  
  return;
}

function getPlaceVotes(candi_no,place_type,place_no){  
  var vcode;    
  
  if(place_type=='reg'){
    vcode='regCode';
  }else if(place_type=='prov'){
    vcode='provCode';
  }else if(place_type=='district'){
    vcode='citymunCode'; 
  }else if(place_type=='citymun'){
    vcode='citymunCode';
  }else if(place_type=='brgy'){
    vcode='brgyCode';
  }

  //alert('candi_no: '+candi_no+'\n vcode: '+vcode+'\n place_no: '+place_no);

  var rvotes=0;

  for(var i=0;i<DB_TRAN_VOTES.length;i++){
    if(DB_TRAN_VOTES[i]['candi_no'] != candi_no){ continue; }
    if(DB_TRAN_VOTES[i][vcode] != place_no){ continue; }    

    rvotes+=parseInt(DB_TRAN_VOTES[i]['votes']);  
  }
  return rvotes;
}

//====================================================================
function disp_place_votes(candi_no,place_type,place_no){
  //alert('place_no '+place_no);
  
  var vtitle='';
  var vcode='';
  var vdesc='';
  var vplace_no='';
  var grap_no=0;
  var vfunc;
  var aryPlace=[];

  if(place_type=='reg'){
    vtitle='Region';
    vcode='regCode';
    vdesc='regDesc';    
    aryPlace=ref_reg;
    vplace_no='';
    grap_no=1;
    vfunc='show_province';
  }else if(place_type=='prov'){
    vtitle='Province';
    vcode='provCode';
    vdesc='provDesc';
    aryPlace=ref_prov;
    vplace_no='regCode';
    grap_no=2;
    vfunc='show_citymun';
  }else if(place_type=='district'){
    aryPlace=[];
    var ctr=0;
    for(var i=0;i<ref_city.length;i++){
      if(ref_city[i]['disCode'] != CURR_SCOPE_NO){ continue; }
      
      let ob={       
        "disCode":ref_city[i]['disCode'],
        "citymunCode":ref_city[i]['citymunCode'],
        "citymunDesc":ref_city[i]['citymunDesc'], 
        "provCode":ref_city[i]['provCode'],
        "regCode":ref_city[i]['regCode']
      };
      aryPlace[ctr]=ob;
      ctr++;
    }
    //alert(aryPlace.length);
    vtitle='District '+CURR_SCOPE_NO;
    vcode='citymunCode';
    vdesc='citymunDesc';
    //aryPlace=ref_district;
    vplace_no='disCode';
    grap_no=3;
    vfunc='show_brgy';
  }else if(place_type=='citymun'){
    vtitle='Municipal/City';
    vcode='citymunCode';
    vdesc='citymunDesc';
    aryPlace=ref_city;
    vplace_no='provCode';
    grap_no=3;
    vfunc='show_brgy';
  }else if(place_type=='brgy'){
    vtitle='Barangay';
    vcode='brgyCode';
    vdesc='brgyDesc';
    aryPlace=ref_brgy;
    vplace_no='citymunCode';
    grap_no=4;
    vfunc='show_none';  
  }

  for(var i=1;i<=4;i++){
    document.getElementById('summ'+i).style.display='none';
  }
  document.getElementById("summ"+grap_no).style.display='block';

  

  //alert('grap_no '+grap_no);

  var aryBG = [
      '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
    ];

  var COLORS = [];
  while (COLORS.length < 200) {
      COLORS.push(`rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`);
  }
  
  // random number generator
  function rand(frm, to) {
      return ~~(Math.random() * (to - frm)) + frm;
  }

  //alert('vcode: '+vcode);

  aryBG=COLORS;

  var dtl='';  
  var aryNewPlace=[];
  var ctr=0;

  for(var i=0;i<aryPlace.length;i++){
    //alert(place_type+' = '+i);
    if(place_type != 'reg'){            
      if(aryPlace[i][vplace_no].trim() != place_no.trim()){ continue; }            
    }
          
    var vvcode=aryPlace[i][vcode];    
    var votes=0;
    votes=getPlaceVotes(candi_no,place_type,vvcode);

    let ob={
      "code":aryPlace[i][vcode],
      "name":aryPlace[i][vdesc],
      "votes":votes
    }
    aryNewPlace[ctr]=ob;
    ctr++;
  }

//===============================================================
//===============================================================
  var tot_votes=0;
  var aryName=[];
  var aryVotes=[];
  var aryNew=aryNewPlace;
  aryNew.sort(sortByMultipleKey(['*votes',vdesc]));
  for(var i=0;i<aryNew.length;i++){
    //alert(aryNew[i]['name']+' : '+aryNew[i]['votes']);
    var xcode=aryNew[i]['code'];
    var xname=aryNew[i]['name'];
    var xvotes=aryNew[i]['votes'];
    dtl+=
    '<div class="cls_votes_dtl" onclick="'+vfunc+'(&quot;'+candi_no+'&quot;,&quot;'+xcode+'&quot;)">'+    
      //'<input type="button" onclick="'+vfunc+'(&quot;'+candi_no+'&quot;,&quot;'+xcode+'&quot;)" style="float:left;width:60%;height:100%;cursor:pointer;border-radius:8px;" value="'+xname+'" />'+
      '<div>'+xname+'</div>'+
      '<span id="dv_votes_'+i+'">'+        
        jformatNumber(xvotes)+
      '</div>'+
      
    '</div>';
    aryName[i]=xname;
    aryVotes[i]=xvotes;
    tot_votes+=xvotes;
  }    
  document.getElementById("sumbox"+grap_no).innerHTML=dtl;
  
  //alert('grap_no:'+grap_no+' s_votes: '+tot_votes);
  show_folder(grap_no,place_no,tot_votes);

  /*
  new Chart(document.getElementById("pie-chart"+grap_no), {
    type: 'doughnut',
    data: {
      //labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      labels: aryName,
      datasets: [{
        label: "Election Chart",
        //backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#3e95cd"],
        backgroundColor: aryBG,
        //data: [2478,5267,734,784,433]
        data: aryVotes
      }]
    },
    options: {
      title: {
        display: true,
        text: 'By '+vtitle
        //text:JBE_STORE_CANDIDATE[parseInt(vpos)-1]["posname"]
      }
    }
  });
  */

}