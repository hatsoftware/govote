function FM_MAIN(fm_ob,db,fm_layout){  
  /*
  document.getElementById('div_sap_dtl').innerHTML='jeffrey enad';
  document.getElementById('div_sap').style.display='block';
  alert(document.getElementById('div_sap_dtl').innerHTML);
  return;
  */
 alert(db.length);
  var h=parseInt(fm_ob.height)-16;  
  var h_head=25;
  var h_foot=50;
  var h_body=h-(h_head+h_foot)+14;

  var fm_menu=
    '<div style="float:left;width:100%;height:100%;color:white;padding:2px;background:'+JBE_CLOR+';">'+

      '<div id="FM_ADD_BTN" class="fm_class_box" onclick="FM_ADD_REC('+db+')" style="margin-left:0%;">'+
        '<div class="fm_class_footer">'+
          '<img src="gfx/jadd.png" alt="call image" />'+
          '<span>Add</span>'+
        '</div>'+
      '</div>'+       
      '<div id="FM_EDIT_BTN" class="fm_class_box" onclick="FM_EDIT_REC()" style="">'+
        '<div class="fm_class_footer">'+
          '<img src="gfx/jedit.png"  alt="home image" />'+
          '<span>Edit</span>'+
        '</div>'+
      '</div>'+    
      '<div id="FM_DEL_BTN" class="fm_class_box" onclick="FM_DEL_REC()" style="float:left;width:20%;height:100%;margin-left:0.5%;background:none;">'+
        '<div class="fm_class_footer">'+
          '<img src="gfx/jdele.png"  alt="home image" />'+
          '<span>Del</span>'+
        '</div>'+
      '</div>'+    
      '<div id="FM_CLOSE_BTN" class="fm_class_box" onclick="FM_CLOSE()" style="float:right;width:20%;height:100%;background:none;">'+
        '<div class="fm_class_footer">'+
          '<img src="gfx/jcancel.png"  alt="home image" />'+
          '<span>Close</span>'+
        '</div>'+
      '</div>'+    

    '</div>';

  var dtl=
    '<div style="width:100%;height:100%;font-size:12px;border:1px solid black;background:white;">'+
      '<div id="FM_HEAD" style="width:100%;height:'+h_head+'px;padding:5px;color:white;background:'+JBE_CLOR+';">'+
        '<span style="float:left;">'+fm_ob.title+'</span>'+
        '<span style="float:right;">FM Library version 1.1</span>'+
        '</div>'+    
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
  FM_INIT();
}

function FM_ADD_REC(db){
  alert('add : '+db.length);
  showProgress(true);   
  axios.post('zz_fndr.php', { request: req,  
    fcode:document.getElementById('txFcode').value,
    fname:document.getElementById('txFname').value
  },JBE_HEADER)
  .then(function (response) {    
    showProgress(false); 
    //alert(response.data); 
    console.log(response.data); 
    JBE_FNDR=response.data;      
  })    
  .catch(function (error) { console.log(error); showProgress(false); });
}
function FM_EDIT_REC(){
  alert('edit');
}
function FM_DEL_REC(){
  alert('del');
}
function FM_CLOSE(){
  document.getElementById('div_sap').style.display='none';  
}

function FM_INIT(){
  document.querySelectorAll('.fm_class_box').forEach(function(el) {
    el.style.pointerEvents='none';
    el.style.opacity=0.5;
  });
  document.getElementById('FM_ADD_BTN').style.pointerEvents='auto';
  document.getElementById('FM_ADD_BTN').style.opacity=1;
  document.getElementById('FM_CLOSE_BTN').style.pointerEvents='auto';
  document.getElementById('FM_CLOSE_BTN').style.opacity=1;
}