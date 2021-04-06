var dbVersion = 1;
var dbReady = false;
var db;

var IDX_STORE = [  
  { "id":0, "flename":"Candidate", "numrec":0, "init":1 },
  { "id":1, "flename":"Posmast", "numrec":0, "init":1 },
  { "id":2, "flename":"TranVote", "numrec":0, "init":1 },
  { "id":3, "flename":"Cluster", "numrec":0, "init":1 },
  { "id":4, "flename":"User", "numrec":0, "init":1 },
  { "id":5, "flename":"Sysfile", "numrec":0, "init":1 }  
];

if (navigator.storage && navigator.storage.persist)
  navigator.storage.persist().then(granted => {
    if (granted){
      //alert("Storage will not be cleared except by explicit user action");
      PERSIST_GRANTED=true;
    }else{
      //alert("Storage may be cleared by the UA under storage pressure.");
      PERSIST_GRANTED=false;
    }
  }
);

function initDb() {
  console.log('initDb activated...'+JBE_ONLINE);
  var request = indexedDB.open(CURR_IDX_DB, dbVersion);
  
  request.onerror = function(e) {    
    console.error('Unable to open database.');
  }

  request.onsuccess = function(e) {
    db = e.target.result;
    console.log('db opened');  
  }
  
  request.onupgradeneeded = function(e) {
    db = e.target.result;    
    for(var i=0;i<IDX_STORE.length;i++){
      db.createObjectStore(IDX_STORE[i]['flename'], { keyPath:'id' });
    }
    dbReady = true;
  }
}

function clearStore(jstore){   
  console.log('clearStore:'+jstore);
  var request = indexedDB.open(CURR_IDX_DB, dbVersion);
  request.onerror = function(e) {    
    console.error('Unable to open database.');
  }
  request.onsuccess = function(e) {
    var db1 = e.target.result;  
    var trans = db1.transaction([jstore], 'readwrite');
    var req = trans.objectStore(jstore).clear();
  
    //alert(111);
    req.onerror = function(e) {
      console.log('error clearing storeobject');
      console.error(e);
      //alert('error');
    }

    req.onsuccess = function(e) {
      console.log('objectStore Cleared: '+jstore);
      //alert('success');
    }
  }
}

/****************************************/
function countRecordIDX(n){  
  var request = indexedDB.open(CURR_IDX_DB, dbVersion);
  request.onerror = function(e) {    
    console.error('Unable to open database.');
  }
  request.onsuccess = function(e) {
    var db1 = e.target.result;
    var flename=IDX_STORE[n]['flename'];   
    //alert('countRecordIDX: '+flename);
    var jstore = db1.transaction([flename]).objectStore(flename); 
    var count = jstore.count();
    count.onsuccess = function() {      
      IDX_STORE[n]['numrec']=count.result;
      console.log('countRecordIDX: '+IDX_STORE[n]['flename']+' '+count.result);
    }
  }
}

/****************************************/
/****************************************/
function getAllDataFromIDX(vmode) {   
  //alert('getAllDataFromIDX: '+IDX_STORE.length);
  //alert(CURR_IDX_DB);
  var request = indexedDB.open(CURR_IDX_DB, dbVersion);  
  request.onerror = function(e) {    
    console.error('Unable to open database.');
  }
  
  request.onsuccess = function(e) {
    var db2 = e.target.result;
    for(var i=0;i < IDX_STORE.length;i++){
      //if(i==4){
        getDataFromIDX(i,db2);  
      //}
    }
  }
  //alert('total: '+ctr);
}  

function getDataFromIDX(i,db2) {  
  var idx=0;
  var aryIDB=[]; 
  var flename=IDX_STORE[i]['flename'];
  
      
  var trans = db2.transaction([flename]);
  var object_store = trans.objectStore(flename);
  var request1 = object_store.openCursor();

  request1.onerror = function(event) {
    console.err("error fetching data");
    //alert("error fetching data");
  };
  
  request1.onsuccess = function(event) {        
    var cursor = event.target.result;    
    if (cursor) {
      var key = cursor.primaryKey;
      var ob;
      if(i==0){ //Candidate
        ob = {
          id:i,
          code:cursor.value.code,
          name:cursor.value.name,
          brgyCode:cursor.value.brgyCode,
          citymunCode:cursor.value.citymunCode,
          pos:cursor.value.pos,
          partyno:cursor.value.partyno,
          votes:cursor.value.votes,
          photo:cursor.value.photo          
        };  
      }else if(i==1){ //Posmast
        ob = {
          id:i,
          descrp:cursor.value.descrp,
          pos:cursor.value.pos,
          hide:cursor.value.hide
        };              
      }else if(i==2){ //tranvote
        ob = {
          id:i,
          clientno:cursor.value.clientno, 
          watcherno:cursor.value.watcherno, 
          clusterno:cursor.value.clusterno, 
          candi_no:cursor.value.candi_no,           
          pos:cursor.value.pos, 
          votes:cursor.value.votes
        };        
      }else if(i==3){ //cluster
        ob = {
          id:i,
          clusterno:cursor.value.clusterno, 
          clustername:cursor.value.clustername, 
          precincts:cursor.value.precincts
        };              
      }else if(i==4){ //user
        ob = {
          id:i,
          usercode:cursor.value.usercode, 
          userid:cursor.value.userid, 
          username:cursor.value.username, 
          pword:cursor.value.pword,
          clusterno:cursor.value.clusterno,
          photo:cursor.value.photo
        };        
      }else if(i==5){ //sysfile
        ob = {
          id:i,
          clientno:cursor.value.clientno, 
          telno:cursor.value.telno, 
          celno:cursor.value.celno, 
          scope_no:cursor.value.scope_no, 
          citymunCode:cursor.value.citymunCode
        };        
      }      

      aryIDB[idx]=ob;  
      //if(i==2) { alert(ob.slide1); }
      idx++;
      cursor.continue();
    }else{
      if(i==0){
        DB_CANDIDATE=[]; DB_CANDIDATE=aryIDB;              
        show_candidates();   
        //alert('show_candidates:'+DB_CANDIDATE.length);
      }else if(i==1){
        DB_POSITION=[]; DB_POSITION=aryIDB;
      }else if(i==2){          
        DB_TRAN_VOTES=[]; DB_TRAN_VOTES=aryIDB;
        //showSystem();     
      }else if(i==3){          
        DB_CLUSTER=[]; DB_CLUSTER=aryIDB;        
      }else if(i==4){          
        DB_USER=[]; DB_USER=aryIDB;        
        showProfile();
      }else if(i==5){          
        DB_SYS=[]; DB_SYS=aryIDB;
      }
      //alert(IDX_STORE[i]['flename']+' : '+aryIDB.length);
      IDX_STORE[i]['numrec']=aryIDB.length;
    }    
  }
}  

// ================================================================

function saveDataToIDX(aryDB,n) {  
  IDX_STORE[n]['numrec']=aryDB.length;
  for(var i=0;i<aryDB.length;i++){      
    if(aryDB[i]['clientno']!=CURR_CLIENT){ continue; }
    putDataToIDX(i,aryDB,n);
  }
}
async function putDataToIDX(i,aryDB,n){   
  var ob;
  if(n==0){    //candidate
    var photo=JBE_API+'upload/photo/'+aryDB[i]['photo'];  
    if(aryDB[i]['photo']){      
      await JBE_BLOB(n,photo).then(result => photo=result);
    }else{
      photo='';
    }
    ob = { 
      id:i,
      code:aryDB[i]['code'],
      name:aryDB[i]['name'],
      brgyCode:aryDB[i]['brgyCode'],
      citymunCode:aryDB[i]['citymunCode'],
      pos:aryDB[i]['pos'],
      partyno:aryDB[i]['partyno'],
      votes:aryDB[i]['votes'],
      photo:photo
    };
  }else if(n==1){    //posmast
    ob = { 
      id:i,
      descrp:aryDB[i]['descrp'],
      pos:aryDB[i]['pos'],
      hide:aryDB[i]['hide']
    };
  }else if(n==2){    //tranvotes
    ob = { 
      id:i,
      clientno:aryDB[i]['clientno'],
      watcherno:aryDB[i]['watcherno'],
      clusterno:aryDB[i]['clusterno'],
      candi_no:aryDB[i]['candi_no'],      
      pos:aryDB[i]['pos'],
      votes:aryDB[i]['votes']
    };
  }else if(n==3){    //cluster
    ob = { 
      id:i,
      clusterno:aryDB[i]['clusterno'],
      clustername:aryDB[i]['clustername'],
      precincts:aryDB[i]['precincts']
    };
  }else if(n==4){    //user
    var photo=JBE_API+'upload/users/'+aryDB[i]['photo'];  
    if(aryDB[i]['photo']){      
      await JBE_BLOB(n,photo).then(result => photo=result);
    }else{
      photo='';
    }    
    ob = { 
      id:i,
      usercode:aryDB[i]['usercode'],
      userid:aryDB[i]['userid'],
      username:aryDB[i]['username'],
      pword:aryDB[i]['pword'],
      clusterno:aryDB[i]['clusterno'],
      photo:photo
    };
  }else if(n==5){    //sysfile
    ob = { 
      id:i,
      clientno:aryDB[i]['clientno'],
      telno:aryDB[i]['telno'],
      celno:aryDB[i]['celno'],
      scope_no:aryDB[i]['scope_no'],
      citymunCode:aryDB[i]['citymunCode']
    };  
  }
  
  var trans = db.transaction([IDX_STORE[n]['flename']], 'readwrite');
  var addReq = trans.objectStore(IDX_STORE[n]['flename']).put(ob);
  addReq.onerror = function(e) {
    console.log('ERROR: putToIDX '+IDX_STORE[n]['flename']);
    console.error(e);
  }

  trans.oncomplete = function(e) {
    //console.log(n+': putToIDX '+IDX_STORE[n]['flename']+' with value '+IDX_STORE[n]['numrec']);      
  }
}
