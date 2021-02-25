function openLookup(div,fld,tbl,db,ob) {     
  alert('div is: '+div.id+' value: '+div.value+' tbl len:'+tbl.length+' ob len:'+ob.length);
  document.getElementById('lookup').style.display='block';
  document.getElementById('myInput').value=div.value;
 
  fillLookup(fld,tbl,document.getElementById("myInput"), db, ob);
}

function fillLookup(fld,tbl,inp,arr,ob){
  //alert('fillLookup '+div.id);
  var currentFocus = -1;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    closeAllLists();
    
    /*create a DIV element that will contain the items (values):*/
    var a = document.createElement("DIV");
    a.setAttribute("class", "autocom-items"); //.style.left
      
    document.getElementById("myInput2").appendChild(a);  
    var b, val = this.value;
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
            //alert(rkey);
            /*
            document.getElementById("txBrgy").value=words[0];
            document.getElementById("txMunicipal").value=words[1];
            document.getElementById("txProvince").value=words[2];
            document.getElementById("txRegion").value=words[3];
            */

          
          //words=arr[i];
          //alert(div+' = '+arr[i]['tx_clusterno']);
          //alert('i '+tbl[i]['clusterno']);

          if(ob){                         
            dispLookupVal(fld,tbl,rkey,ob); 
          }
            /*close the list of autocomd values,
            (or any other open lists of autocomd values:*/
            closeAllLists();
            closeLookup();
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

/*
if(ob){                         
  dispLookupVal(div.id,words[0]); 
}
*/

function closeLookup(){
  document.getElementById('lookup').style.display='none';
  //$('#lookup').hide();    
  //$('#div_add_proj').css('pointer-events','auto'); 
  //$('#div_btns').css('pointer-events','auto'); 
}

function dispLookupVal(fld,tbl,recno,ob){     
  alert('dispLookupval fld:'+fld+' recno:'+recno+' len:'+tbl.length+' ob len:'+ob.length);    
  for(var i=0;i<tbl.length;i++){
    if(tbl[i][fld].trim() == recno.trim()){             
      //display em
      for(var ii=0;ii < ob.length;ii++){       
        var vdiv=ob[ii]['div'];
        var vfld=ob[ii]['fld'];
        var vval=tbl[i][vfld];
        if(vval){
          document.getElementById(vdiv).value=vval;
        }
      } 
      FM_LOOK_REC();
      break;
    }    
  }   
}

function autocom(inp, arr, ob) {
  //alert('autocom '+Object.keys(ob).length);
  /*the autocom function takes two arguments,
  the text field element and an array of possible autocomd values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    //alert('autocom input');
      var a, b, i, val = this.value;
      /*close any already open lists of autocomd values*/
      closeAllLists();
      
      if(val.trim().length==0) {
        fillLookup(inp,arr,ob);
        return false;
        //return;
      }
      
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      //alert(this.id);
      //a.setAttribute("id", this.id + "autocom-list");
      //a.setAttribute("id", "myInput2" + "autocom-list");
      a.setAttribute("class", "autocom-items"); //.style.left
      
      //this.parentNode.appendChild(a);
      document.getElementById("myInput2").appendChild(a);
      //document.getElementById("myInput2").parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
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
              /*
              document.getElementById("txBrgy").value=words[0];
              document.getElementById("txMunicipal").value=words[1];
              document.getElementById("txProvince").value=words[2];
              document.getElementById("txRegion").value=words[3];
              */

              if(ob){                 
                //alert('ob good len:'+ob.length);
                dispLookupVal(ob,words); 
              }else{
                //alert('ob is null');
              }

              /*close the list of autocomd values,
              (or any other open lists of autocomd values:*/
              closeAllLists();
              closeLookup();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {  
    //alert('autocom keydown');  
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
