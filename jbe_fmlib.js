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
        '<span style="float:left;">'+fm_ob.title+'</span>'+
        '<span style="float:right;">FM Library version 1.1</span>'+
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
      //alert(vval);
      document.getElementById(vdiv).value=vval;    
      document.getElementById(vdiv).disabled=true; 
    }                   
  }   
  
  var fn = window[FM_FUNC.disp];
  if (typeof fn === "function"){ if(fn(recno,true)==false){ return; }}  
  //if (typeof fn === "function") fn(recno);   
}


function FM_SAVE_REC(){  
  //check for duplication
  //if(JBE_SEEK_ARRAY(FM_TABLE,'usercode',usercode));  
  var req=parseInt(document.getElementById('FM_BTNS').getAttribute('data-mode'));
  var recno=document.getElementById('FM_HEAD').getAttribute('data-recno');
  
  FM_AXIOS_PARA1=[];
  var ctr=0;
  for(var i=0;i<FM_FIELDS.length;i++){    
    if(!FM_FIELDS[i]['save']){ continue; }

    var div=FM_FIELDS[i]['div'];
    var fld=FM_FIELDS[i]['fld'];
    var val=document.getElementById(div).value;
    if(!val){
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
    
  //alert(FM_AXIOS_PARA1);
  showProgress(true);   
  //alert('req '+req+' ctr: '+ctr);
  axios.post(FM_AXIOS_PHP, { clientno:CURR_CLIENT,request: req, 
    aryItems:JSON.stringify(FM_AXIOS_PARA1)
  },JBE_HEADER)
  .then(function (response) {    
    showProgress(false); 
    //alert(response.data); 
    console.log(response.data); 
    FM_TABLE=response.data;

    var fn = window[FM_FUNC.save];
    if (typeof fn === "function") fn(response.data);   
    FM_DISP_REC(recno);
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}
//
function FM_ADD_REC(){
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

  var fn = window[FM_FUNC.add];
  if (typeof fn === "function"){
    if(fn()==false){ return; }
  }
}
//
function FM_EDIT_REC(){
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

  var fn = window[FM_FUNC.edit];
  if (typeof fn === "function"){
    if(fn()==false){ return; }
  }
}
//
function FM_DEL_REC(){
  var recno=document.getElementById(FM_FIELDS[0]['div']).value;
  //alert(FM_FIELDS[0]['fld']);
  //return;                 
  MSG_SHOW(vbYesNo,'CONFIRM: ','Delete this Record? ['+recno+']',function(){  
    
    showProgress(true);       
    axios.post(FM_AXIOS_PHP, { clientno:CURR_CLIENT,request:4, 
      recno:recno
    },JBE_HEADER)
    .then(function (response) {    
      showProgress(false); 
      console.log(response.data); 
      FM_TABLE=response.data;     

      var fn = window[FM_FUNC.del];
      if (typeof fn === "function") fn(response.data);   
      FM_INIT_REC();
    })    
    .catch(function (error) { console.log(error); showProgress(false); });
    
  },function(){});                  
}
//
function FM_CANCEL(){  
  var m=document.getElementById('FM_BTNS').getAttribute('data-mode');
  var recno=document.getElementById(FM_FIELDS[0]['div']).value;    
  //alert('mode: '+m);
  if(m==3){
    FM_DISP_REC(recno);
  }else{
    FM_INIT_REC();
  }
  var fn = window[FM_FUNC.cancel];
  if (typeof fn === "function"){ if(fn(recno,true)==false){ return; }}  
}
//
function FM_CLOSE(){
  document.getElementById('div_sap').style.display='none';  
}

function FM_INIT_REC(){
  FM_MAIN_BOX(0);
  FM_ADD_FLAG=false;
  for(var i=0;i<FM_FIELDS.length;i++){
    var div=FM_FIELDS[i]['div'];    
    var disp=FM_FIELDS[i]['disp'];    
    if(disp == 0){ continue; }    
    /*
    var xnodeName=document.getElementById(div).nodeName;    
    //alert(div+' = '+xnodeName);        
    if(xnodeName=='SELECT'){
      document.getElementById(div).style.pointerEvents='none';
      document.getElementById(div).value='';
    }else{
      */
    document.getElementById(div).disabled=true;
    document.getElementById(div).value='';    
  }

  var fn = window[FM_FUNC.init];
  if (typeof fn === "function"){
    if(fn()==false){ return; }
  }  
}

// =================================================================================

function FM_OPEN_LOOKUP(nn,div,fld,tbl,ob) {   
  var db;
  var fn = window[FM_FUNC.lu];
  if (typeof fn === "function") db=fn(nn);  

  //alert(' tbl len: '+tbl.length+'  dblen: '+db.length);

  //alert('div is: '+div.id+' value: '+div.value+' tbl len:'+tbl.length+' ob len:'+ob.length);
  document.getElementById('lookup').style.display='block';
  document.getElementById('myInput').value=div.value;
 
  FM_FILL_LOOKUP(fld,tbl,document.getElementById("myInput"), db, ob);
}

function FM_FILL_LOOKUP(fld,tbl,inp,arr,ob){   
  //var tbl=[];
  //tbl=xtbl; 
  //alert(tbl.length);
  var currentFocus = -1;
  /*execute a function when someone writes in the text field:*/
  //alert(inp.value.trim().length);
  closeAllLists();       
  //dispGrid(inp.value);
  inp.addEventListener("input", function(e) {    
    closeAllLists();       
    
    /*create a DIV element that will contain the items (values):*/
    var a = document.createElement("DIV");
    a.setAttribute("class", "autocom-items"); //.style.left
      
    document.getElementById("myInput2").appendChild(a);      
    var b;
    var val = this.value.trim();
    
    for (var i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      //alert('i '+tbl[i]['clusterno']);

      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        //alert('i '+tbl[i]['clusterno']);
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {    
          /*insert the value for the autocom text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          var words = inp.value.split(',');

          //alert(this.getElementsByTagName("input")[0].value);
          var rkey=words[(words.length-1)];

          if(ob){                         
            FM_SHOW_LOOKUP(fld,tbl,rkey,ob); 
          }
          /*close the list of autocomd values,
          (or any other open lists of autocomd values:*/
          closeAllLists();
          FM_CLOSE_LOOKUP();
        });
        a.appendChild(b);
      }
      
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {  
    //alert('autocom keydown');  
    //alert(e.keyCode);

    var x = document.getElementById(this.id + "autocom-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      
      e.preventDefault();
      
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
      
    }
  });
 
  function addActive(x) {        
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocom-active":*/
    x[currentFocus].classList.add("autocom-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocom items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocom-active");
    }
  }
  function closeAllLists(elmnt) {    
    /*close all autocom lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocom-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  
  document.addEventListener("click", function (e) {    
      closeAllLists(e.target);
  });
}

function FM_CLOSE_LOOKUP(){
  document.getElementById('lookup').style.display='none';
}

function FM_LOOK_REC(f_display,recno){
  document.getElementById('FM_HEAD').setAttribute('data-recno',recno);
  var proc=FM_FUNC.disp;
  if(f_display){ 
    FM_MAIN_BOX(1); 
    proc=FM_FUNC.disp;
  }
  var fn = window[proc];
  if (typeof fn === "function"){
    if(fn(recno,f_display)==false){ return; }
  }   
}

function FM_SHOW_LOOKUP(fld,tbl,recno,ob){       
  var f_display=false;
  if(fld.trim() == FM_FIELDS[0]['fld'].trim()){ f_display=true; }
  for(var i=0;i<tbl.length;i++){
    var tbl_fld=tbl[i][fld].trim();
    if( tbl_fld != recno.trim()){ continue; }

    //display em
    for(var ii=0;ii < ob.length;ii++){       
      var vdiv=ob[ii]['div'];
      var vfld=ob[ii]['fld'];
      var vval=tbl[i][vfld];  
      //alert(vdiv+' = '+vval);
      document.getElementById(vdiv).value=vval;     
    }               
    FM_LOOK_REC(f_display,recno);
  }   
}