function JBE_LOOKUP(mode,func,tilt,db,code,desc,db2,code2,desc2) {  
  document.getElementById('lookup-title').innerHTML=tilt;
  if(!mode)	{
    document.getElementById('lookup').style.display='none';    
    return;
  }    

  //showProgress(true);
  document.getElementById('lookup').style.display='block';  
  document.getElementById('lookup').setAttribute('data-targdiv',code);
    createTable(db,code,desc,db2,code2,desc2,func);
  //showProgress(false);  
  document.getElementById('lookup-inp').value='';
  document.getElementById('lookup-inp').focus();
}

function createTable(db,code,desc,db2,code2,desc2,func){
  var dtl='';  
  var bg='white';
  for(i=0;i<db.length;i++){
    var vcode=db[i][code];
    var dtlDesc=db[i][desc];
    if(db2){
      var vcode2=db[i][code2];        
      var vdesc2=JBE_GETFLD(desc2,db2,code2,vcode2);
      dtlDesc=db[i][desc]+', '+vdesc2;
    }
    
    dtl+=
    '<tr onclick="getLU_code(&quot;'+vcode+'&quot;,'+func+',&quot;'+code+'&quot;)" class="cls_tbl">'+
      '<td style="width:70%;border:0px;padding:0px;">'+dtlDesc+'</td>'+
      '<td style="width:30%;border:0px;padding:0px;text-align:right;">'+db[i][code]+'</td>'+
    '</tr>';
    if(bg=='white'){ bg='lightgray'; }
    else{ bg='white'; }
  }

  var dtl0=
  '<tr class="header">'+
    '<th style="width:60%;">Name</th>'+
    '<th style="width:40%;">Country</th>'+
  '</tr>';
  dtl0=dtl;
  document.getElementById("lookup-table").innerHTML=dtl0;
}	

function getLU_code(v,func,code){  
  document.getElementById('lookup').setAttribute('data-recno',v);
  //document.getElementById(targdiv).value=v;
  document.getElementById('lookup').style.display='none';  
  if(func){ func(code,v); }
}


function JBE_LOOKUP_FUNC() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("lookup-inp");
  filter = input.value.toUpperCase();
  table = document.getElementById("lookup-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

