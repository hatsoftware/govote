function do_fm_position(){
  var aryPos=DB_POSITION;
  aryPos.sort(sortByMultipleKey(['pos']));   
  FM_TABLE=aryPos;
  FM_AXIOS_PHP=JBE_API+"z_position.php";
  FM_FIELDS=[ //display on screen
    { div:"tx_idx", fld:"idx", disp:-1, save:true  },
    { div:"tx_descrp", fld:"descrp", disp:1, save:true  },
    { div:"tx_pos", fld:"pos", disp:1, save:true  }    
  ];
    
  var fm_ob = {
    title:"ELECTIVE POSITION MASTER FILE",
    top:"", left:"", bottom:"10%", right:"5%",
    width:"700px",height:"200px"
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="290px";
    fm_ob.right="5px";  
    fm_ob.top="100px"; 
  }
  
  var fm_layout=
    '<div style="width:100%;height:100%;margin-top:0px;text-align:left;padding:5px;background:white;">'+

      '<input id="tx_idx" type="text" style="display:none;" />'+
      
      '<div class="cls_fm_dtl">'+        
        '<div>Description:'+          
          '<input id="lu_idx" type="image" src="../../gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;do_lu_position&quot;,&quot;LOOKUP&quot;,FM_TABLE,&quot;idx&quot;,&quot;descrp&quot;)" />'+
        '</div>'+
        '<input id="tx_descrp" type="text" data-caption="Description" value="" />'+
      '</div>'+
      
      '<div class="cls_fm_dtl">'+
        '<div>Position:</div>'+          
        '<input id="tx_pos" type="number" data-caption="Position" onchange="chg_pos(this)" value="" />'+
      '</div>'+ 
      
    '</div>';
  
  FM_FUNC={
    lu:"do_lu_position",
    look:"do_look_position",
    init:"do_init_position",
    add:"do_add_position",
    edit:"do_edit_position",
    del:"do_del_position",
    disp:"do_disp_position",
    save:"do_save_position"
  }
  FM_MAIN(fm_ob,fm_layout);
}
//
function chg_pos(v){  
  if(parseInt(v.value) < 10){
    v.value='0'+parseInt(v.value);
  }else{
    v.value=parseInt(v.value);
  }
}
//
function do_lu_position(fld,val){	
	if(fld=='idx'){ FM_DISP_REC(val); }  
  do_look_position(fld);
}
//
function do_init_position(){  
  document.getElementById('tx_idx').value='';
  document.getElementById('lu_idx').disabled=false;
  document.getElementById('lu_idx').style.opacity='1';
}
//
function do_add_position(){  
  document.getElementById('lu_idx').disabled=true;
  document.getElementById('lu_idx').style.opacity='0.5';
  document.getElementById('tx_descrp').focus();
}
//edit
function do_edit_position(){
  document.getElementById('lu_idx').disabled=true;
  document.getElementById('lu_idx').style.opacity='0.5';

  document.getElementById('tx_descrp').focus();
}
//look
function do_look_position(fld){
  //alert(fld);
  if(fld=='idx'){ 
    do_disp_position(0);
	}  
}
//del
function do_del_position(stat,r){
  if(stat==2){ FM_TABLE=r; } 
}
//save
function do_save_position(stat,r){    
  if(stat==2){    
    FM_TABLE=r; 
  }
}
//disp
function do_disp_position(disp_mode){     
  if(disp_mode==0){
    document.getElementById('lu_idx').disabled=false;
    document.getElementById('lu_idx').style.opacity='1';  
  }
}

