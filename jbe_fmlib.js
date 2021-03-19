var lu_ob = []; 
var lu_db = [];

var FM_LK_OB=[];

var FM_LU_DB=[];
var FM_LU_OB=[];

var FM_TABLE=[];
var FM_FIELDS=[];

var FM_AXIOS_PHP=[];
var FM_AXIOS_PARA1=[];
var FM_AXIOS_PARA2=[];

var FM_ADD_FLAG=false;

var FM_FUNC=[];


function FM_MAIN(fm_ob,fm_layout){  
  //alert('FM_FIELDS '+FM_FIELDS.length);
  var h=parseInt(fm_ob.height);  
  var h_head=40;
  var h_foot=60;
  var h_body=h-(h_head+h_foot+27);

  var fm_menu=
    '<div id="FM_BTNS" data-mode=0 style="width:100%;height:100%;color:white;padding:2px;background:none;">'+

      '<div id="FM_ADD_BTN" class="fm_class_box" onclick="FM_ADD_REC()" style="margin-left:0%;">'+
        '<div class="fm_class_footer">'+
          '<img src="gfx/jadd.png" alt="call image" />'+
          '<span>Add</span>'+
        '</div>'+
      '</div>'+       
      '<div id="FM_SAVE_BTN" class="fm_class_box" onclick="FM_SAVE_REC()" style="display:none;margin-left:0%;">'+
        '<div class="fm_class_footer">'+
          '<img src="gfx/jsave.png" alt="call image" />'+
          '<span>Save</span>'+
        '</div>'+
      '</div>'+ 
      '<div id="FM_EDIT_BTN" class="fm_class_box" onclick="FM_EDIT_REC()">'+
        '<div class="fm_class_footer">'+
          '<img src="gfx/jedit.png"  alt="home image" />'+
          '<span>Edit</span>'+
        '</div>'+
      '</div>'+    
      '<div id="FM_DEL_BTN" class="fm_class_box" onclick="FM_DEL_REC()">'+
        '<div class="fm_class_footer">'+
          '<img src="gfx/jdele.png"  alt="home image" />'+
          '<span>Del</span>'+
        '</div>'+
      '</div>'+    
      '<div id="FM_CANCEL_BTN" class="fm_class_box" onclick="FM_CANCEL()" style="display:none;float:right;">'+
        '<div class="fm_class_footer">'+
          '<img id="img_FM_CANCEL_EXIT" src="gfx/jcancel.png"  alt="home image" />'+
          '<span id="txt_FM_CANCEL_EXIT">Cancel</span>'+
        '</div>'+
      '</div>'+  
      '<div id="FM_CLOSE_BTN" class="fm_class_box" onclick="FM_CLOSE()" style="float:right;">'+
        '<div class="fm_class_footer">'+
          '<img src="gfx/jclose.png"  alt="home image" />'+
          '<span>Quit</span>'+
        '</div>'+
      '</div>'+   

    '</div>';

  var dtl=
    '<div id="DIV_FM_MAIN" style="position:absolute;z-index:9;box-shadow: 0px 0px 8px;width:100%;height:100%;font-size:12px;border:1px solid black;background:white;">'+      
      '<div id="FM_HEAD" data-recno="" style="cursor:move;z-index:10;font-size:14px;width:100%;height:'+h_head+'px;padding:10px;color:white;background:'+JBE_CLOR+';">'+
        '<span style="float:left;width:100%;">'+fm_ob.title+'</span>'+
        //'<span style="float:right;">FM Library version 1.1</span>'+
      '</div>'+    
      '<div id="FM_MODE" style="width:100%;height:25px;text-align:center;padding:5px 15px 5px 5px;text-align:right;background:lightgray;"></div>'+
      '<div id="FM_BODY" style="width:100%;height:'+h_body+'px;background:white;">BODY</div>'+
      '<div id="FM_FOOT" style="width:100%;height:'+h_foot+'px;padding:2px;background:'+JBE_CLOR+';">FOOT</div>'+
    '</div>';

  if(fm_ob.width){ document.getElementById('div_sap_dtl').style.width=fm_ob.width; }
  if(fm_ob.height){ document.getElementById('div_sap_dtl').style.height=fm_ob.height; }
  if(fm_ob.top){ document.getElementById('div_sap_dtl').style.top=fm_ob.top; }
  if(fm_ob.left){ document.getElementById('div_sap_dtl').style.left=fm_ob.left; }
  if(fm_ob.bottom){ document.getElementById('div_sap_dtl').style.bottom=fm_ob.bottom; }
  if(fm_ob.right){ document.getElementById('div_sap_dtl').style.right=fm_ob.right; }
  document.getElementById('div_sap_dtl').innerHTML=dtl;

  document.getElementById('FM_BODY').innerHTML=fm_layout;
  document.getElementById('FM_FOOT').innerHTML=fm_menu;
  document.getElementById('div_sap').style.display='block';  
  // Make the DIV element draggable:
  dragElement(document.getElementById("DIV_FM_MAIN"));

  FM_INIT_REC();
  //FM_MAIN_BOX(0);
}

function FM_MAIN_BOX(mode){
  //mode=3;
  var aryMode=[];
  aryMode[0]={  //init
    'mode':0, 'title':'* Ready Mode *',
    'add':'block','save':'none','edit':'none','del':'none','cancel':'none','close':'block'
  }
  aryMode[1]={  //disp
    'mode':1, 'title':'* Display Mode *',
    'add':'block','save':'none','edit':'block','del':'block','cancel':'block','close':'none'
  }
  aryMode[2]={  //add
    'mode':2, 'title':'* Add Mode *',
    'add':'none','save':'block','edit':'none','del':'none','cancel':'block','close':'none'
  }
  aryMode[3]={  //edit
    'mode':3, 'title':'* Edit Mode *',
    'add':'none','save':'block','edit':'none','del':'none','cancel':'block','close':'none'
  }

  document.getElementById('FM_BTNS').setAttribute('data-mode',aryMode[mode]['mode']);
  document.getElementById('FM_MODE').innerHTML=aryMode[mode]['title'];
  
  document.querySelectorAll('.fm_class_box').forEach(function(el) {
    //el.style.pointerEvents='none';
    el.style.display='none';    
    //el.style.opacity=0.5;
  });
  document.getElementById('FM_ADD_BTN').style.display=aryMode[mode]['add'];
  document.getElementById('FM_SAVE_BTN').style.display=aryMode[mode]['save'];
  document.getElementById('FM_EDIT_BTN').style.display=aryMode[mode]['edit'];
  document.getElementById('FM_DEL_BTN').style.display=aryMode[mode]['del'];
  document.getElementById('FM_CANCEL_BTN').style.display=aryMode[mode]['cancel'];
  document.getElementById('FM_CLOSE_BTN').style.display=aryMode[mode]['close'];  

  document.getElementById('img_FM_CANCEL_EXIT').src='gfx/jcancel.png';
  document.getElementById('txt_FM_CANCEL_EXIT').innerHTML='Cancel';

  if(mode==1){
    document.getElementById('img_FM_CANCEL_EXIT').src='gfx/jcancel.png';
    document.getElementById('txt_FM_CANCEL_EXIT').innerHTML='Exit';
  }
}



function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById("FM_HEAD")) {
    // if present, the header is where you move the DIV from:
    document.getElementById("FM_HEAD").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function FM_CHK_REC(recno){  
  //alert('FM_CHK_REC '+recno);
  var rval=false;
  //alert('FM_CHK_REC '+FM_TABLE.length);
  var fld=FM_FIELDS[0]['fld'];
  for(var i=0;i<FM_TABLE.length;i++){
    if(FM_TABLE[i][fld]==recno){
      rval=true;
      break;
    }
  }
  if(rval){    
    //alert(recno);
    FM_DISP_REC(recno);          
    FM_ADD_FLAG=false;
  }else{
    FM_ADD_FLAG=true;
  }
}



function FM_DISP_REC(recno){
  //alert('FM_DISP_REC:'+recno);
  FM_MAIN_BOX(1);
  document.getElementById('FM_HEAD').setAttribute('data-recno',recno);

  FM_ADD_FLAG=false;
  var fld=FM_FIELDS[0]['fld'];  

  for(var i=0;i<FM_TABLE.length;i++){
    var tbl_fld=FM_TABLE[i][fld].trim();
    if( tbl_fld != recno.trim()){ continue; }

    //display em
    for(var ii=0;ii < FM_FIELDS.length;ii++){       
      var vdiv=FM_FIELDS[ii]['div'];
      var vfld=FM_FIELDS[ii]['fld'];
      var vval=FM_TABLE[i][vfld];  
      
      //alert(vdiv+' vs '+vval);
      document.getElementById(vdiv).value=vval;    
      document.getElementById(vdiv).disabled=true; 
    }                   
  }   
    
  var fn = window[FM_FUNC.look];  
  if(typeof fn === "function") fn(fld);   
}

//
function FM_ADD_REC(){
  var fn = window[FM_FUNC.add];
  if (typeof fn === "function"){ if(fn(1)==false){ return; }}  
  FM_MAIN_BOX(2);
  FM_ADD_FLAG=true;
  for(var i=0;i<FM_FIELDS.length;i++){
    var div=FM_FIELDS[i]['div'];    
    var disp=FM_FIELDS[i]['disp'];    
    
    document.getElementById(div).value='';
    if(disp==1){     
      document.getElementById(div).disabled=false;
    }
  }

  if (typeof fn === "function") fn(2);  
}
//
function FM_EDIT_REC(){
  var fn = window[FM_FUNC.edit];
  if (typeof fn === "function"){ if(fn(1)==false){ return; }}  

  FM_MAIN_BOX(3);
  for(var i=1;i<FM_FIELDS.length;i++){
    var div=FM_FIELDS[i]['div'];   
    var disp=FM_FIELDS[i]['disp'];    
    if(disp == 1){ 
      document.getElementById(div).disabled=false;
    }else{
      document.getElementById(div).disabled=true;
    }
  }

  if (typeof fn === "function") fn(2); 
}
function FM_SAVE_REC(){  
  //check for duplication
  //if(JBE_SEEK_ARRAY(FM_TABLE,'usercode',usercode));  
  var fn = window[FM_FUNC.save];
  if (typeof fn === "function"){ if(fn(1,'')==false){ return; }}  

  var req=parseInt(document.getElementById('FM_BTNS').getAttribute('data-mode'));
  var recno=document.getElementById('FM_HEAD').getAttribute('data-recno');
  //alert('FM_SAVE_REC '+recno)
  var recno_fld='', recno_val='', recno_div='';
  
  FM_AXIOS_PARA1=[];
  var ctr=0;
  for(var i=0;i<FM_FIELDS.length;i++){    
    if(!FM_FIELDS[i]['save']){ continue; }

    var div=FM_FIELDS[i]['div'];
    var fld=FM_FIELDS[i]['fld'];
    var disp=parseInt(FM_FIELDS[i]['disp']);
    var val=document.getElementById(div).value;
        
    if(disp < 0){
      recno_fld=fld;
      recno_val=val;
      recno_div=div;
    }
        
    if(!val && disp > -1){
      snackBar('ERROR: Empty Field: '+document.getElementById(div).getAttribute('data-caption'));
      document.getElementById(div).focus();
      return;
    }

    let ob={
      "fld":fld,
      "val":val
    }    
    FM_AXIOS_PARA1[ctr]=ob;    
    ctr++;
  }

  showProgress(true);   
  axios.post(FM_AXIOS_PHP, { clientno:CURR_CLIENT,request: req, 
    aryItems:JSON.stringify(FM_AXIOS_PARA1)
  },JBE_HEADER)
  .then(function (response) {    
    showProgress(false); 
    FM_TABLE=response.data;
    
    if(FM_ADD_FLAG){
      recno=FM_TABLE[(FM_TABLE.length-1)][recno_fld];
      document.getElementById(recno_div).value=recno;
    }
    
    if (typeof fn === "function") fn(2,response.data);   
    
    FM_DISP_REC(recno);
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}
//
function FM_DEL_REC(){  
  var fn = window[FM_FUNC.del];
  if (typeof fn === "function"){ if(fn(1,'')==false){ return; }}  

  var recno=document.getElementById(FM_FIELDS[0]['div']).value;
  
  MSG_SHOW(vbYesNo,'CONFIRM: ','Delete this Record? ['+recno+']',function(){  
    
    showProgress(true);       
    axios.post(FM_AXIOS_PHP, { clientno:CURR_CLIENT,request:4, 
      recno:recno
    },JBE_HEADER)
    .then(function (response) {    
      showProgress(false); 
      console.log(response.data); 
      FM_TABLE=response.data;     
            
      if (typeof fn === "function") fn(2,response.data);   
      FM_INIT_REC();
    })    
    .catch(function (error) { console.log(error); showProgress(false); });
    
  },function(){});                  
}
//
function FM_CANCEL(){  
  var m=document.getElementById('FM_BTNS').getAttribute('data-mode');
  var recno=document.getElementById(FM_FIELDS[0]['div']).value;    
  //alert('cancel '+recno);
  //alert('mode: '+m);
  if(m==3){
    FM_DISP_REC(recno);
  }else{
    FM_INIT_REC();
  }
  var fn = window[FM_FUNC.cancel];  
  if (typeof fn === "function") fn(recno,true);   
}
//
function FM_CLOSE(){
  document.getElementById('div_sap').style.display='none';  
}

function FM_INIT_REC(){
  document.getElementById('FM_HEAD').setAttribute('data-recno','');
  FM_MAIN_BOX(0);
  FM_ADD_FLAG=false;
  for(var i=0;i<FM_FIELDS.length;i++){
    var div=FM_FIELDS[i]['div'];    
    var disp=parseInt(FM_FIELDS[i]['disp']);
    if(disp <= 0){
      document.getElementById(div).style.display='none';
      continue; 
    }    
    document.getElementById(div).disabled=true;
    document.getElementById(div).value='';
  }

  var fn = window[FM_FUNC.init];
  if (typeof fn === "function"){
    if(fn()==false){ return; }
  }  
}

