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
        '<div class="cls_pos_head">'+JBE_STORE_CANDIDATE[i]["posname"]+'</div>'+
        '<div id="candi_dtl_'+vpos+'" class="cls_pos_body">'+
        
        '</div>'+  
      '</div>';
  }      
  

  showMainPage();
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
      '<div class="cls_shadow_dispboard" onclick="dispVotesGraph(&quot;'+aryCandidate[i]['code']+'&quot;)" style="position:relative;width:100%;border:0px solid black;cursor:pointer;">'+
        '<div style="width:100%;height:100%;margin-top:0px;background:white;opacity:0.2;border:0px solid orange;border-radius:8px;"></div>'+
        '<div style="position:absolute;width:100%;height:100%;top:0px;left:0px;margin-top:0px;border:0px solid blue;color:white;background:none;">'+
          
          '<div class="cls_dispboard">'+
            '<div class="cls_dispboard_ctr">'+
              (ctr+0)+'.'+
            '</div>'+
            '<div class="cls_dispboard_img">'+
              '<img src="'+JBE_API+'upload/photo/'+vcode+'.jpg" style="height:100%;border:1px solid gray;border-radius:8px;background:white;"/>'+              
            '</div>'+
            '<div class="cls_dispboard_candi">'+
            
              '<div class="cls_dispboard_candi_1">'+
                aryCandidate[i]['lname']+', '+aryCandidate[i]['fname']+
              '</div>'+
              '<div class="cls_dispboard_candi_2">'+
                'NPC - National People\'s Coalition'+
              '</div>'+
            
            '</div>'+
            '<div class="cls_dispboard_votes">'+
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

function dispVotesGraph(candi_no){
  var aryDB=JBE_GETARRY(DB_CANDIDATE,'code',candi_no);
  var candi_name=aryDB['lname']+', '+aryDB['fname'];
  var candi_votes=aryDB['votes'];
  //alert('candi_votes '+candi_votes);
  
  var dtl=
    '<div class="cls_dtl_shadow_dispboard" style="position:relative;width:100%;height:100%;padding:10px;border:0px solid black;background:none;">'+
      '<div style="width:100%;height:70px;background:white;opacity:0.5;border:1px solid black;border-radius:8px;margin-top:0px;"></div>'+
      '<div style="position:absolute;width:96%;height:70px;top:10px;border:0px solid white;border-radius:8px;color:white;background:none;">'+
    
        '<div style="width:100%;height:100%;text-align:left;">'+ 

          '<div class="cls_dtl_dispboard">'+
            '<div class="cls_dtl_dispboard_img">'+
              '<img src="gfx/jorg.png" style="height:100%;border:1px solid gray;border-radius:8px;background:white;"/>'+
            '</div>'+
            '<div class="cls_dtl_dispboard_candi">'+
            
              '<div class="cls_dtl_dispboard_candi_1">'+
                candi_name+
              '</div>'+
              '<div class="cls_dtl_dispboard_candi_2">'+
                'NPC - National People\'s Coalition'+
              '</div>'+
            
            '</div>'+
            '<div class="cls_dtl_dispboard_votes">'+
              jformatNumber(candi_votes)+
            '</div>'+
          '</div>'+

        '</div>'+
 
      '</div>'+

      '<div style="width:100%;height:30px;margin-top:10px;text-align:left;border:1px solid white;padding:2px;color:white;background:dimgray;">'+        
        '<div style="float:left;width:50px;padding:3px;"> TAB: </div>'+
        '<div id="id_tot" data-rec="" data-votes="" style="display:none;float:left;width:50px;padding:3px;"></div>'+
        '<input id="id_reg" data-rec="" data-votes="" type="button" onclick="menu_folder(1)" class="cls_id_places" value="Region" />'+
        '<input id="id_prov" data-rec="" data-votes="" type="button" onclick="menu_folder(2)" class="cls_id_places" value="Province" />'+
        '<input id="id_citymun" data-rec="" data-votes="" type="button" onclick="menu_folder(3)" class="cls_id_places" value="City/Municipality" />'+
        '<input id="id_brgy" data-rec="" data-votes="" type="button" onclick="menu_folder(4)" class="cls_id_places" value="Barangay" />'+
      '</div>'+        

      '<div style="width:100%;height:685px;padding:10px 40px 10px 40px;background:none;">'+    

        '<div style="width:100%;height:100%;padding:10px;border:1px solid white;">'+   

          '<div id="dv_summary" style="width:100%;height:100%;background:none;">'+

            '<div id="summ1" style="display:block;width:100%;height:100%;">'+
              '<div id="sumbox1" style="float:left;width:40%;height:100%;overflow:auto;padding:0 10px 0 0;background:none;"></div>'+
              '<div style="float:left;width:60%;height:100%;color:white;background:white;">'+
                '<canvas id="pie-chart1" width="800" height="450" style="padding:10px;"></canvas>'+
              '</div>'+
            '</div>'+

            '<div id="summ2" style="display:none;width:100%;height:100%;">'+
              '<div id="sumbox2" style="float:left;width:40%;height:100%;overflow:auto;padding:0 10px 0 0;background:none;"></div>'+
              '<div style="float:left;width:60%;height:100%;color:white;background:white;">'+
                '<canvas id="pie-chart2" width="800" height="450" style="padding:10px;"></canvas>'+
              '</div>'+
            '</div>'+

            '<div id="summ3" style="display:none;width:100%;height:100%;">'+
              '<div id="sumbox3" style="float:left;width:40%;height:100%;overflow:auto;padding:0 10px 0 0;background:none;"></div>'+
              '<div style="float:left;width:60%;height:100%;color:white;background:white;">'+
                '<canvas id="pie-chart3" width="800" height="450" style="padding:10px;"></canvas>'+
              '</div>'+
            '</div>'+

            '<div id="summ4" style="display:none;width:100%;height:100%;">'+
              '<div id="sumbox4" style="float:left;width:40%;height:100%;overflow:auto;padding:0 10px 0 0;background:none;"></div>'+
              '<div style="float:left;width:60%;height:100%;color:white;background:white;">'+
                '<canvas id="pie-chart4" width="800" height="450" style="padding:10px;"></canvas>'+
              '</div>'+
            '</div>'+
            
          '</div>'+

        '</div>'+

      '</div>'+  

    '</div>'+  

  '</div>';

  //document.getElementById("View2").innerHTML=dtl;
  JBE_OPEN_VIEW(dtl,'','close_graph');
  modal_ON(true);
  //disp_reg_votes(candi_no);
  //disp_place_votes(candi_no,'reg','');  
  //disp_place_votes(candi_no,'prov','07');
  show_region(candi_no,'');
}
function close_graph(){
  modal_ON(false);
  showMainPage();
}
//
function show_folder(v,vCode,votes){  
  //alert(v+' = '+vCode+' votes:'+votes);  
  var vvotes=jformatNumber(votes);
  var ary_id=['reg','prov','citymun','brgy'];
  var tilt,otilt,oldrec,ovotes;

  if(v==0){
    tilt='[ Region: ('+vvotes+') ]'; 
    document.getElementById('id_'+ary_id[v]).setAttribute('data-votes',vvotes);
    document.getElementById('id_'+ary_id[v]).value=tilt;
    document.getElementById('id_'+ary_id[v]).style.display='block';

    document.getElementById('id_tot').setAttribute('data-votes',vvotes);
    document.getElementById('id_tot').innerHTML=vvotes;
    return;
  } 

  ovotes=document.getElementById('id_'+ary_id[v-1]).getAttribute('data-votes');    
  oldrec=document.getElementById('id_'+ary_id[v-1]).getAttribute('data-rec');    

  if(v==1){         
    otilt='Region:[ '+JBE_GETFLD('regDesc',ref_reg,'regCode',vCode)+' ('+vvotes+') ] ';
    tilt='[ Province ('+vvotes+') ]'; 
  }
  if(v==2){     
    otilt='Province[ '+JBE_GETFLD('provDesc',ref_prov,'provCode',vCode)+' ('+vvotes+') ] ';
    tilt='[ City/Municipal ('+vvotes+') ]'; 
  }
  if(v==3){     
    otilt='City/Municipal:[ '+JBE_GETFLD('citymunDesc',ref_city,'citymunCode',vCode)+' ('+vvotes+') ] ';
    tilt='[ Barangay ('+vvotes+') ]'; 
  }
  
  //alert('oldrec:'+oldrec+'  vcode:'+vCode);
  if(vCode!=oldrec){
    //alert('not equal: '+v);
    for(var i=v;i<4;i++){
      document.getElementById('id_'+ary_id[i]).style.display='none'; 
    }
  }
  document.getElementById('id_'+ary_id[v-1]).setAttribute('data-rec',vCode);
  document.getElementById('id_'+ary_id[v]).setAttribute('data-votes',ovotes);
  
  document.getElementById('id_'+ary_id[v-1]).value=otilt;
  //document.getElementById('id_'+ary_id[v-1]).value=ovotes;
  document.getElementById('id_'+ary_id[v]).value=tilt;
  document.getElementById('id_'+ary_id[v]).setAttribute('data-votes',vvotes);
  document.getElementById('id_'+ary_id[v]).style.display='block';
}  

//
function menu_folder(v){
  var ary_id=['reg','prov','citymun','brgy'];
  for(var i=1;i<=4;i++){ document.getElementById('summ'+i).style.display='none';  }
  document.getElementById('summ'+v).style.display='block';
  var x=document.getElementById('id_'+ary_id[v-1]).getAttribute('data-rec');
  var y=document.getElementById('id_tot').getAttribute('data-votes');
  if(v==1){ 
    var tilt='[ Region ('+y+') ]'; 
    document.getElementById('id_'+ary_id[0]).value=tilt;
  }
}
//
function show_region(candi_no,vCode){   
  disp_place_votes(candi_no,'reg',vCode);
}

function show_province(candi_no,vCode){  
  //alert('show_province vCode '+vCode);
  disp_place_votes(candi_no,'prov',vCode);
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
  }else if(place_type=='citymun'){
    vcode='citymunCode';
  }else if(place_type=='brgy'){
    vcode='brgyCode';
  }

  //alert('candi_no: '+candi_no+'\n vcode: '+vcode+'\n place_no: '+place_no);

  var rvotes=0;
  var ctr=0;
  for(var i=0;i<DB_TRAN_VOTES.length;i++){
    if(DB_TRAN_VOTES[i]['candi_no'] != candi_no){ continue; }
    if(DB_TRAN_VOTES[i][vcode] != place_no){ continue; }    

    rvotes+=parseInt(DB_TRAN_VOTES[i]['votes']);
    ctr++;
  }
  return rvotes;
}

function dummy(){
  var dtl='<div style="width:100%;height:100%;color:white;background:none;">sdfa dsf dsaf asdf dsf</div>';
  JBE_OPEN_VIEW(dtl,'DUMMY','close_dummy');    
  modal_ON(true);
}

function close_dummy(){
  showMainPage();
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
  }else if(place_type=='citymun'){
    vtitle='Municicapl/City';
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
  while (COLORS.length < 100) {
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
      if(aryPlace[i][vplace_no] != place_no){ continue; }            
    }
          
    var vvcode=aryPlace[i][vcode];    
    var votes=getPlaceVotes(candi_no,place_type,vvcode);

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
    '<div style="width:100%;height:35px;margin-top:5px;padding:2px;background:dimgray;">'+    
      '<input type="button" onclick="'+vfunc+'(&quot;'+candi_no+'&quot;,&quot;'+xcode+'&quot;)" style="float:left;width:60%;height:100%;cursor:pointer;border-radius:8px;" value="'+xname+'" />'+
      '<span id="dv_votes_'+i+'" style="float:left;width:40%;height:100%;padding:2px 12px 2px 2px;text-align:right;font-size:22px;text-shadow: 1px 1px 2px black, 0 0px 10px black, 0 0 5px black;color:white;background:none;">'+        
        jformatNumber(xvotes)+
      '</div>'+
    '</div>';
    aryName[i]=xname;
    aryVotes[i]=xvotes;
    tot_votes+=xvotes;
  }    
  document.getElementById("sumbox"+grap_no).innerHTML=dtl;
  
  //alert('grap_no:'+grap_no+' s_votes: '+tot_votes);
  show_folder((grap_no-1),place_no,tot_votes);

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

}