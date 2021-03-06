function do_fm_district(){    
  FM_TABLE=DB_DISTRICT;
  var rref_city=ref_city;
  rref_city.sort(sortByMultipleKey(['citymunDesc']));  

  FM_AXIOS_PHP=JBE_API+"z_district.php";
  FM_FIELDS=[ //display on screen
    { div:"tx_disCode", fld:"disCode", disp:1, save:true  },
    { div:"tx_disDesc", fld:"disDesc", disp:1, save:true  }
  ];
    
  var vcode='';
  if(DB_DISTRICT.length > 0){ vcode=DB_DISTRICT[0]['disCode']; }
  
  var fm_ob = {
    title:"District File Maintenance",
    top:"", left:"", bottom:"20%", right:"5%",
    width:"500px",height:"500px"
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="300px"; 
    fm_ob.height="400px";
    fm_ob.right="5px";  
    fm_ob.top="30px"; 
  }
  
  var fm_layout=
    '<div style="width:100%;height:100%;text-align:left;padding:5px;background:white;">'+      
            
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">District Code:</div>'+        
        '<input id="tx_disCode" type="text" data-caption="District Code" onchange="FM_CHK_REC(this.value,&quot;do_disp_district&quot;)" style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_disname.id).focus()" />'+
      '</div>'+     
      '<div style="width:100%;height:30px;padding:2px;border:0px solid green;">'+        
        '<div style="float:left;width:30%;height:100%;padding:5px;">District Name:</div>'+
        '<input id="tx_disDesc" type="text" data-caption="District Name" style="float:left;width:70%;height:100%;" value="" onkeydown="javascript:if(event.keyCode==13) document.getElementById(tx_userid.id).focus()" />'+
      '</div>'+

      '<div id="dv_dis_dtl" data-disCode="'+vcode+'" style="width:100%;height:300px;margin-top:5px;padding:2px;border:0px solid lightgray;">'+        

        '<div style="width:100%;height:30px;padding:2px;border:1px solid lightgray;">'+  
          '<select id="sel_citymun" name="sel_citymun" value="" onchange="chg_addDistrict(this)" style="float:right;width:60%;height:100%;font-size:11px;padding:0px;">';
            var sel_dtl='<option value=""> - Click here to Add - </option>';
            for(var i=0;i<rref_city.length;i++){
              var pos_provCode=rref_city[i]["provCode"];
              var pos_code=rref_city[i]["citymunCode"];
              var pos_descrp=rref_city[i]["citymunDesc"].trim()+', '+JBE_GETFLD('provDesc',ref_prov,'provCode',pos_provCode);
              
              sel_dtl+='<option value="'+pos_code+'">'+pos_descrp+'</option>';
            }
            fm_layout+=sel_dtl+
          '</select>'+
        '</div>'+
        '<div style="width:100%;height:200px;padding:2px;border:1px solid lightgray;">'+        
          '<div id="dtl_dis" style="float:left;width:100%;height:100%;padding:2px;border:0px solid lightgray;overflow:auto;">'+ 
          //dtl       
          '</div>'+          
        '</div>'+

      '</div>'+
      
    '</div>';

  FM_FUNC={
    lu:"do_lu_district",
    look:"do_look_district",
    init:"do_init_district",
    add:"do_add_district",
    edit:"do_edit_district",
    del:"do_del_district",
    disp:"do_disp_district",
    save:"do_save_district",
    cancel:"do_cancel_district"
  }
  FM_MAIN(fm_ob,fm_layout);
  init_db_dis();
}
//
function do_lu_district(fld,val){
  
}

function init_db_dis(){
  DB_DISTRICT2=[];
  var disCode=document.getElementById('tx_disCode').value;
  var ctr=0;
  for(var i=0;i<ref_city.length;i++){
    if(ref_city[i]['disCode'] != disCode){ continue; }

    let ob={       
      "disCode":disCode,
      "citymunCode":ref_city[i]['citymunCode'],
      "citymunDesc":ref_city[i]['citymunDesc'], 
      "provCode":ref_city[i]['provCode'],
      "regCode":ref_city[i]['regCode']
    };

    DB_DISTRICT2[ctr]=ob;    
    ctr++;
  }
  disp_dis_dtl();
}


function chk_dis_item(citymunCode){
  var rval = -1;
  for(var i=0;i<DB_DISTRICT2.length;i++){
    if(DB_DISTRICT2[i]['citymunCode']==citymunCode){
      rval=i;
      break;
    }
  }
  return rval;
}
function chg_addDistrict(sel){  
  var disCode=document.getElementById('tx_disCode').value;
  if(document.getElementById('tx_disCode').value.trim().length==0){ 
    document.getElementById('sel_citymun').value='';
    document.getElementById('tx_disCode').focus();     
    return;
  }
  var code=sel.value;
  var desc=sel.options[sel.selectedIndex].text;  
  document.getElementById('sel_citymun').value='';
  //f_exist=JSON.stringify(DB_DISTRICT2).includes(code); 
  var x = chk_dis_item(code);
  if(x != -1){ 
    if(DB_DISTRICT2[x]['disCode']==''){
      //alert('ok kalbo');
      DB_DISTRICT2[x]['disCode']=disCode;
      //alert('ok na: '+DB_DISTRICT2[x]['disCode']);
      disp_dis_dtl();
      return;    
    }else{
      //alert(DB_DISTRICT2[x]['disCode']);
      snackBar('ERROR: Item Already Exist...');
      return;
    }
  }
  let ob={       
    "disCode":disCode,
    "citymunCode":code,
    "citymunDesc":desc
  };
  DB_DISTRICT2.push(ob);  
  disp_dis_dtl();
}
//
function disp_dis_dtl(){  
  var aryDB=DB_DISTRICT2;
  //alert(DB_DISTRICT2.length);
  aryDB.sort(sortByMultipleKey(['citymunDesc']));  
  var dtl='';
  for(var i=0;i<aryDB.length;i++){
    if(!aryDB[i]['disCode']){ continue; }
    var citymunCode=aryDB[i]['citymunCode'];
    var citymunDesc=aryDB[i]['citymunDesc'];
    var provCode=aryDB[i]['provCode'];
    var provDesc=JBE_GETFLD('provDesc',ref_prov,'provCode',provCode);
    dtl+=
    '<div id="dis_add'+i+'" data-recno="'+citymunCode+'" style="width:100%;height:30px;border:1px solid gray;padding:2px;margin-bottom:2px;">'+
      '<div style="float:left;width:80%;height:100%;padding:5px;">'+aryDB[i]['citymunDesc']+', '+provDesc+'</div>'+
      '<input type="button" value="X" onclick="del_dis_dtl('+i+',&quot;'+citymunCode+'&quot;,&quot;'+citymunDesc+'&quot;)" style="float:right;height:100%;" />'+
    '</div>';
  }
  document.getElementById('dtl_dis').innerHTML=dtl;
}
//
function del_dis_dtl(i){
  MSG_SHOW(vbYesNo,"CONFIRM:","Are you sure to DELETE this Item?", function(){

    DB_DISTRICT2[i]['disCode']='';
    disp_dis_dtl();

    },function(){}
  );    
}
//


//
function do_init_district(){  
  var disCode='';
  document.getElementById('FM_ADD_BTN').style.pointerEvents='auto';
  document.getElementById('FM_ADD_BTN').style.opacity='1';  

  document.getElementById('dv_dis_dtl').style.pointerEvents='none';
  
  if(DB_DISTRICT.length != 0){
    disCode=DB_DISTRICT[0]['disCode'];  
    FM_DISP_REC(disCode);
    document.getElementById('FM_ADD_BTN').style.pointerEvents='none';
    document.getElementById('FM_ADD_BTN').style.opacity='0.5';  
    //document.getElementById('FM_BTNS').setAttribute('data-mode',1);
  }
}
//
function do_add_district(){    
  document.getElementById('dv_dis_dtl').style.pointerEvents='auto';
  document.getElementById('tx_disCode').focus();
}
//edit
function do_edit_district(){
  document.getElementById('dv_dis_dtl').style.pointerEvents='auto';
  document.getElementById('tx_disDesc').focus();
}
//look
function do_look_district(fld){
  if(fld=='disCode'){ 
    do_disp_district(0);
  }
}
//del
function do_del_district(stat,r){  
  if(stat==2){
    DB_DISTRICT=r;  
  }
  init_db_dis();
}
//save
function do_save_district(stat,r){  
  if(stat==2){
    axios.post(JBE_API+'z_district.php', { clientno:CURR_CLIENT,request: 23,    
      aryItems:JSON.stringify(DB_DISTRICT2)
    },JBE_HEADER)
    .then(function (response) {    
      showProgress(false); 
      ref_city=response.data;
      init_db_dis();
      DB_DISTRICT=r;  
    })    
    .catch(function (error) { console.log(error); showProgress(false); });
  }
}
//disp
function do_disp_district(disp_mode){ 
  if(disp_mode==0){
    document.getElementById('FM_ADD_BTN').style.pointerEvents='none';
    document.getElementById('FM_ADD_BTN').style.opacity='0.5';  
    
    document.getElementById('tx_disCode').value = DB_DISTRICT[0]['disCode'];
    document.getElementById('tx_disDesc').value = DB_DISTRICT[0]['disDesc'];
    document.getElementById('FM_CANCEL_BTN').style.display='none';
    document.getElementById('FM_CLOSE_BTN').style.display='block';

    document.getElementById('dv_dis_dtl').style.pointerEvents='none';
    //disp_db_dtl();
    disp_dis_dtl();
  }
}
function do_cancel_district(r){
  init_db_dis();
}