function do_fm_party(){         
  FM_TABLE=DB_PARTYMAST;
  FM_AXIOS_PHP=JBE_API+"z_party.php";
  FM_FIELDS=[ //display on screen
    { div:"tx_party_no", fld:"partyno", disp:-1, save:true  },
    { div:"tx_party_name", fld:"partyname", disp:1, save:true  },
    { div:"tx_party_photo", fld:"photo", disp:0, save:true  }    
  ];
    
  var fm_ob = {
    title:"POLITICAL PARTY MASTER FILE",
    top:"", left:"", bottom:"10%", right:"5%",
    width:"500px",height:"300px"
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="95%"; 
    fm_ob.height="290px";
    fm_ob.right="5px";  
    fm_ob.top="100px"; 
  }
  
  var fm_layout=
    '<div style="width:100%;height:100%;margin-top:0px;text-align:left;padding:5px;background:white;">'+

      '<input id="tx_party_no" type="text" style="display:none;" />'+
      
      '<div class="cls_fm_dtl">'+        
        '<div>Party Name:'+          
          '<input id="lu_party_no" type="image" src="../../gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;do_lu_party&quot;,&quot;PARTY LOOKUP&quot;,FM_TABLE,&quot;partyno&quot;,&quot;partyname&quot;)" />'+
        '</div>'+
        '<input id="tx_party_name" type="text" data-caption="Party Name" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_party_name.id).focus()" />'+
      '</div>'+
        
      '<input type="file" id="inpfile_party" data-orig="" data-sel=0 name="inpfile_party" value="" hidden="hidden" />'+
      '<input id="tx_party_photo" type="text" data-caption="Photo" style="display:none;" value="" />'+    
      '<div class="cls_fm_dtl" style="height:100px;">'+                  
        '<div style="height:25px;">Photo:'+
          '<input id="lu_party_photo" type="image" style="background:dimgray;" src="../../gfx/jcam.png" onclick="JBE_PICK_IMAGE(0,inpfile_party.id,img_party.id,&quot;putImg_party&quot;)" />'+
        '</div>'+  
        '<p>'+
          '<img id="img_party" data-img="" name="img_party" src="../../gfx/avatar.png" style="height:100%;width:auto;border:1px solid gray;"/>'+          
        '</p>'+   
      '</div>'+ 
      
    '</div>';
  
  FM_FUNC={
    lu:"do_lu_party",
    look:"do_look_party",
    init:"do_init_party",
    add:"do_add_party",
    edit:"do_edit_party",
    del:"do_del_party",
    disp:"do_disp_party",
    save:"do_save_party"
  }
  FM_MAIN(fm_ob,fm_layout);
}

function putImg_party(){
  var vimg=document.getElementById('img_party').getAttribute('data-img');  
  document.getElementById('tx_party_photo').value=vimg;
}
//

function do_lu_party(fld,val){	
	if(fld=='partyno'){ FM_DISP_REC(val); }  
  do_look_party(fld);
}
//
function do_init_party(){  
  document.getElementById('tx_party_no').value='';
  document.getElementById('lu_party_no').disabled=false;
  document.getElementById('lu_party_no').style.opacity='1';
  document.getElementById('lu_party_photo').style.pointerEvents='none';
  document.getElementById('lu_party_photo').style.opacity='0.5';
  document.getElementById('img_party').src='../../gfx/avatar.png';  
}
//
function do_add_party(){
  document.getElementById('img_party').src='../../gfx/avatar.png';
  document.getElementById('lu_party_no').disabled=true;
  document.getElementById('lu_party_no').style.opacity='0.5';

  document.getElementById('lu_party_photo').style.pointerEvents='auto';
  document.getElementById('lu_party_photo').style.opacity='1';

  document.getElementById('tx_party_name').focus();
}
//edit
function do_edit_party(){
  document.getElementById('lu_party_no').disabled=true;
  document.getElementById('lu_party_no').style.opacity='0.5';

  document.getElementById('lu_party_photo').style.pointerEvents='auto';
  document.getElementById('lu_party_photo').style.opacity='1';

  document.getElementById('tx_party_name').focus();
}
//look
function do_look_party(fld){
  if(fld=='partyno'){ 
    do_disp_party(0);
    do_disp_party(1);
	}  
}
//del
function do_del_party(stat,r){
  if(stat==2){ FM_TABLE=r; } 
}
//save
function do_save_party(stat,r){  
  var recno=document.getElementById('tx_party_no').value;  
  if(stat==2){
    var targetDIR=JBE_API+'upload/photo/';
    var newName = 'party_'+recno.trim() + '.jpg';
    if(THISFILE[0]){     
      let ob = [
        { "div":"img_party" }
      ];    
      uploadNOW(THISFILE[0],newName,targetDIR,ob,false,false); 
    }  
    FM_TABLE=r; 
  }
}
//disp
function do_disp_party(disp_mode){   
  var n = new Date().toLocaleTimeString('it-IT');  
  if(disp_mode==0){
    document.getElementById('lu_party_no').disabled=false;
    document.getElementById('lu_party_no').style.opacity='1';  
    
    document.getElementById('lu_party_photo').style.pointerEvents='none';
    document.getElementById('lu_party_photo').style.opacity='0.5';
  }else if(disp_mode==1){
    recno=document.getElementById('tx_party_no').value;
    var vimg=JBE_API+'upload/photo/party_'+recno.trim()+'.jpg';
    document.getElementById('img_party').setAttribute('data-img',vimg);
    document.getElementById('img_party').src=vimg+'?'+n;
  }  
}

