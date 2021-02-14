function dispBoard(){  
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
  var h_candi=window.innerHeight-(50+85);
  var dtl=
  '<div style="width:100%;height:100%;padding:0px;color:white;background:none;">'+
    '<div style="width:100%;height:50px;border:1px solid gray;">'+
      '<div style="float:right;width:auto;height:100%;padding:5px 0 0 0;background:none;">'+
        '<div style="float:left;width:auto;padding:10px;">Filter:</div><img src="gfx/filter.png" style="float:left;height:100%;"/>'+
      '</div>'+
    '</div>'+
    '<div style="width:100%;height:'+h_candi+'px;overflow:auto;padding:0px;background:none;">'+    
      '<div id="user_main" style="height:100%;margin-top:0px;padding:0px;background:none;">'+
        '<div id="user_main_left" style="width:100%;height:auto;margin-top:0px;border:0px solid red;padding:0px;background:none;">';

        var dtl2='';
          
        for(var i=0;i<JBE_STORE_CANDIDATE.length;i++){
          var vdisp=JBE_STORE_CANDIDATE[i]["display"];
          var vpos=JBE_STORE_CANDIDATE[i]["pos"];
          dtl2+=
            '<div id="candi_'+vpos+'" onclick="dispChart(&quot;'+vpos+'&quot;)" style="display:'+vdisp+';width:auto;max-width:100%;height:auto;margin-top:0px;padding:20px 0 10px 0;background:none;">'+
              '<div class="cls_pos_head">'+JBE_STORE_CANDIDATE[i]["posname"]+'</div>'+
              '<div id="candi_dtl_'+vpos+'" class="cls_pos_body">'+
              
              '</div>'+  
            '</div>';
        }      

        dtl+=dtl2;
        dtl+=
        '</div>'+
      
      '</div>'+
    '</div>'+
  '</div>';

  document.getElementById("div_main_right").innerHTML=dtl; 

  
  dispBoardDtl();
  //dispChart('01');
}

function dispChart(vpos){
  var aryCandidate=DB_CANDIDATE;
  var aryName=[];
  var aryVotes=[];
  var aryBG=[];
  var ctr=0;
  for (var i=0;i<aryCandidate.length;i++){
    if(aryCandidate[i]['pos'] != vpos){ continue; }
    
    aryName[ctr]=aryCandidate[i]['lname'];
    aryVotes[ctr]=aryCandidate[i]['votes'];
    aryBG[ctr]=aryCandidate[i]['bg'];
    ctr++;
  }
  /*
  new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
      //labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      labels: aryName,
      datasets: [{
        label: "Election Chart",
        //backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        backgroundColor: aryBG,
        //data: [2478,5267,734,784,433]
        data: aryVotes
      }]
    },
    options: {
      title: {
        display: true,
        //text: 'Predicted world population (millions) in 2050'
        text:JBE_STORE_CANDIDATE[parseInt(vpos)-1]["posname"]
      }
    }
  });
  */
}
  

function dispBoardDtl(){
  var dtl=[];
  dtl[0]='';
  var aryCandidate=DB_CANDIDATE;
  aryCandidate.sort((a, b) => a.pos.localeCompare(b.pos) || b.votes - a.votes);

  //alert(aryCandidate.length);
  var vdtl='';
  var sv_pos=0;
  var ctr=1;
  for (var i=0;i<aryCandidate.length;i++){
    var vpos=parseInt(aryCandidate[i]['pos']-1);
   
    if(vpos != sv_pos){ ctr=1; }
   
    vdtl=          
      '<div class="cls_shadow_dispboard" style="position:relative;width:100%;border:1px solid black;">'+
        '<div style="width:100%;height:100%;margin-top:0px;background:white;opacity:0.2;border:0px solid orange;border-radius:8px;"></div>'+
        '<div style="position:absolute;width:100%;height:100%;top:0px;left:0px;margin-top:0px;border:0px solid blue;color:white;background:none;">'+
          
          '<div class="cls_dispboard">'+
            '<div class="cls_dispboard_ctr">'+
              (ctr+10)+'.'+
            '</div>'+
            '<div class="cls_dispboard_img">'+
              '<img src="gfx/jorg.png" style="height:100%;border:1px solid gray;border-radius:8px;background:white;"/>'+
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


      //'<div style="width:100%;height:65px;margin-top:10px;background:green;opacity:.5;"></div>'+
      //'<div style="position:absolute;width:100%;height:100%;top:0px;left:0px;margin-top:10px;border:1px solid blue;background:none;color:white;">'+
      //  aryCandidate[i]['lname']+' sadsa'+
      //'</div>';
    
    if(vpos==sv_pos){      
      dtl[vpos]+=vdtl;      
    }else{      
      sv_pos=vpos;
      dtl[vpos]=vdtl;
    }
    ctr++;
  }

  //if(ctr > 10){
  //  document.getElementById('candi_'+vpos).style.display='none';
  //}else{

  for (var i=0;i<dtl.length;i++){
    var vvpos=JBE_STORE_CANDIDATE[i]["pos"];  
    
    if(dtl[i]){ 
      document.getElementById('candi_dtl_'+vvpos).innerHTML=dtl[i]; 
    }else{
      document.getElementById('candi_'+vvpos).style.display='none';
    }
  }
}

