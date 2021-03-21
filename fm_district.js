var aryDTL=[];
function do_fm_district(){    
  FM_TABLE=DB_DISTRICT;
  var rref_city=ref_city;
  rref_city.sort(sortByMultipleKey(['citymunDesc']));  

  FM_AXIOS_PHP=JBE_API+"z_district.php";
  FM_FIELDS=[ //display on screen
    { div:"tx_disCode", fld:"disCode", disp:1, save:true  },
    { div:"tx_disDesc", fld:"disDesc", disp:1, save:true  },
    { div:"tx_provCode", fld:"provCode", disp:0, save:true  },
    { div:"tx_provDesc", fld:"provDesc", disp:2, save:false  }
  ];
    
  var vcode='';
  if(DB_DISTRICT.length > 0){ vcode=DB_DISTRICT[0]['disCode']; }
  
  var fm_ob = {
    title:"District File Maintenance",
    top:"", left:"", bottom:"20%", right:"5%",
    width:"500px",height:"435px"
  };  

  if(JBE_MOBILE){ 
    fm_ob.width="300px"; 
    fm_ob.height="435px";
    fm_ob.right="5px";  
    fm_ob.top="30px"; 
  }
  
  var fm_layout=
    '<div style="width:100%;height:100%;text-align:left;padding:5px;background:white;">'+      
            
      
        
      '<div class="cls_fm_dtl">'+        
        '<div>District Name:'+          
          '<input id="tx_disCode" type="text" style="display:none;" />'+
          '<input id="lu_disCode" type="image" src="gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;do_lu_district&quot;,&quot;DISTRICT LOOKUP&quot;,DB_DISTRICT,&quot;disCode&quot;,&quot;disDesc&quot;)" />'+
          
        '</div>'+
        '<input id="tx_disDesc" type="text" data-caption="Party Name" value="" />'+
      '</div>'+

      '<div class="cls_fm_dtl">'+        
        '<div>Province Name:'+          
          '<input id="lu_provCode" type="image" src="gfx/jsearch.png" onclick="JBE_LOOKUP(true,&quot;do_lu_district&quot;,&quot;PROVINCE LOOKUP&quot;,ref_prov,&quot;provCode&quot;,&quot;provDesc&quot;)" />'+
          '<input id="tx_provCode" type="text" data-caption="Province Code" style="display:none;" value="" />'+
        '</div>'+
        '<input id="tx_provDesc" type="text" data-caption="Province Name" value="" />'+
      '</div>'+

      '<div id="dv_dis_dtl" data-disCode="'+vcode+'" style="width:100%;height:300px;margin-top:5px;padding:2px;border:0px solid lightgray;">'+        

        '<div style="width:100%;height:30px;padding:2px;border:1px solid lightgray;">'+  
          '<select id="sel_citymun" name="sel_citymun" value="" onchange="chg_addDistrict(this)" style="float:left;width:60%;height:100%;font-size:11px;padding:0px;">'+            
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
}
//
function do_lu_district(fld,val){    
  if(fld=='disCode'){ 
    refresh_data2(val);
    FM_DISP_REC(val); 
  }else{ 
    var rref_city=ref_city;
    rref_city.sort(sortByMultipleKey(['citymunDesc']));  
    document.getElementById('tx_provCode').value = val; 
    var sel_dtl='<option value=""> - Click here to Add - </option>';
    for(var i=0;i<rref_city.length;i++){      
      var pos_provCode=rref_city[i]["provCode"];
      if(pos_provCode != val){ continue; }

      var pos_code=rref_city[i]["citymunCode"];
      var pos_descrp=rref_city[i]["citymunDesc"].trim()+', '+JBE_GETFLD('provDesc',ref_prov,'provCode',pos_provCode);      
      sel_dtl+='<option value="'+pos_code+'">'+pos_descrp+'</option>';      
    } 
    document.getElementById('sel_citymun').innerHTML=sel_dtl;         
  }
  do_look_district(fld);
}



function refresh_data2(val){  
  aryDTL=[];
  //load district2 to array
  var ctr=0;
  for(var i=0;i<DB_DISTRICT2.length;i++){
    if(DB_DISTRICT2[i]['disCode'] != val){ continue; }

    let ob={
      disCode:DB_DISTRICT2[i]['disCode'],      
      citymunCode:DB_DISTRICT2[i]['citymunCode'],
      citymunDesc:DB_DISTRICT2[i]['citymunDesc']
    }
    aryDTL[ctr]=ob;    
    ctr++;
  }
}


function chk_dis_item(citymunCode){
  var rval = -1;
  for(var i=0;i<aryDTL.length;i++){
    if(aryDTL[i]['citymunCode']==citymunCode){
      rval=i;
      break;
    }
  }
  return rval;
}
function chg_addDistrict(sel){
  var disCode=document.getElementById('tx_disCode').value;
  if(disCode.trim().length==0){ 
    document.getElementById('sel_citymun').value='';
    document.getElementById('tx_disDesc').focus();     
    return;
  }
  
  var code=sel.value;
  var desc=sel.options[sel.selectedIndex].text;  
  document.getElementById('sel_citymun').value='';
  //alert('sel:'+desc);
  //f_exist=JSON.stringify(aryDTL).includes(code); 
  var x = chk_dis_item(code);
  if(x != -1){ 
    if(aryDTL[x]['disCode']==''){
      //alert('ok kalbo');
      aryDTL[x]['disCode']=disCode;
      //alert('ok na: '+aryDTL[x]['disCode']);
      disp_dis_dtl();
      return;    
    }else{
      //alert(aryDTL[x]['disCode']);
      snackBar('ERROR: Item Already Exist...');
      return;
    }
  }
  let ob={       
    "disCode":disCode,
    "citymunCode":code,
    "citymunDesc":desc
    
  };
  aryDTL.push(ob);  
  disp_dis_dtl();
}
//
function disp_dis_dtl(){  
  var aryDB=aryDTL;
  //alert(aryDTL.length);
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
      '<div style="float:left;width:80%;height:100%;padding:5px;overflow:auto;">'+aryDB[i]['citymunDesc']+', '+provDesc+'</div>'+
      '<input type="button" value="X" onclick="del_dis_dtl('+i+',&quot;'+citymunCode+'&quot;,&quot;'+citymunDesc+'&quot;)" style="float:right;height:100%;" />'+
    '</div>';
  }
  document.getElementById('dtl_dis').innerHTML=dtl;
}
//
function del_dis_dtl(i){
  MSG_SHOW(vbYesNo,"CONFIRM:","Are you sure to DELETE this Item?", function(){

    aryDTL[i]['disCode']='';
    disp_dis_dtl();

    },function(){}
  );    
}
//
function do_init_district(){  
  document.getElementById('lu_provCode').disabled=true;
  document.getElementById('lu_provCode').style.opacity='0.5';

  document.getElementById('tx_disCode').value='';
  document.getElementById('dtl_dis').innerHTML='';
  document.getElementById('sel_citymun').disabled=true;
}
//
function do_add_district(){      
  var vDate=new Date();  
  var vTime = vDate.toLocaleTimeString('it-IT'); 
  vDate = new Date(vDate.getTime() - (vDate.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];  
  var disCode='D_'+vDate+'_'+vTime;
  disCode = disCode.replace(/-/g, "").replace(/:/g, "").replace("T", "-");

  //var disCode='';
  aryDTL=[];
  document.getElementById('lu_provCode').disabled=false;
  document.getElementById('lu_provCode').style.opacity='1';

  document.getElementById('dtl_dis').innerHTML='';
  document.getElementById('tx_disCode').value=disCode;
  document.getElementById('sel_citymun').disabled=false;
  document.getElementById('dv_dis_dtl').style.pointerEvents='auto';
  document.getElementById('tx_disDesc').focus();
}
//edit
function do_edit_district(){
  document.getElementById('lu_provCode').disabled=false;
  document.getElementById('lu_provCode').style.opacity='1';

  document.getElementById('sel_citymun').disabled=false;
  document.getElementById('dv_dis_dtl').style.pointerEvents='auto';
  document.getElementById('tx_disDesc').focus();
}
//look
function do_look_district(fld){
  if(fld=='disCode'){ 
    do_disp_district(0);
    do_disp_district(1);
  }else if(fld=='provCode'){ 
    do_disp_district(1);
  }
}
//del
function do_del_district(stat,r){  
  if(stat==2){
    DB_DISTRICT=r;  
  }  
}
//save
function do_save_district(stat,r){ 
  var disCode=document.getElementById('tx_disCode').value;  
  //alert('stat:'+stat+' === '+aryDTL.length+' disCode:'+disCode);
  if(stat==1){ FM_ADD_FLAG=false; }
  if(stat==2){
    axios.post(JBE_API+'z_district.php', { clientno:CURR_CLIENT,request: 23, 
      disCode,
      aryItems:JSON.stringify(aryDTL)
    },JBE_HEADER)
    .then(function (response) {    
      showProgress(false); 
      DB_DISTRICT2=response.data;
      DB_DISTRICT=r;  
    })    
    .catch(function (error) { console.log(error); showProgress(false); });
  }
}
//disp
function do_disp_district(disp_mode){ 
  if(disp_mode==0){
    //document.getElementById('tx_disCode').value = DB_DISTRICT[0]['disCode'];
    //document.getElementById('tx_disDesc').value = DB_DISTRICT[0]['disDesc'];
    document.getElementById('dv_dis_dtl').style.pointerEvents='none';
    document.getElementById('sel_citymun').disabled=true;
    disp_dis_dtl();
    document.getElementById('lu_provCode').disabled=true;
    document.getElementById('lu_provCode').style.opacity='0.5';
  }else if(disp_mode==1){
    var provCode=document.getElementById('tx_provCode').value;
    document.getElementById('tx_provDesc').value = JBE_GETFLD('provDesc',ref_prov,'provCode',provCode);    
  }
}
function do_cancel_district(r){
  var disCode=document.getElementById('tx_disCode').value; 
  refresh_data2(disCode);
  do_disp_district(0);
}