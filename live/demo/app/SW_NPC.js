const cacheName = 'NPC_0101102';
const staticAssets = [
  './',
  './index.html', 
  './gfx/icon-192x192.png',  './gfx/icon-512x512.png',  
  '../../../main_gfx/jadmin.jpg',

  '../../../main_jslib/leaflet.js',              '../../../main_jslib/leaflet.css',
  '../../../main_jslib/images/jRedMarker.png',   '../../../main_jslib/images/jblueMarker.png',
  '../../../main_jslib/images/layers.png',       

  '../../../../js/axios.min.js',
  '../../../../js/coke.js',   
  '../../../../js/je_msg.js',
  '../../../../js/enadlib.js',  
  
  '../../../main_codes/app_admin.js',  
  '../../../main_codes/app_chat.js',
  '../../../main_codes/app_db.js',   
  '../../../main_codes/app_map.js',      
  '../../../main_codes/app_notif.js',  
  '../../../main_codes/app_pages.js',  
  '../../../main_codes/app_sys.js',    
  '../../../main_codes/main_app.js',   

  '../../../main_codes/main_styles.css',   '../../../main_codes/mobile.css',

  
  '../../../main_gfx/proc_logo.gif',  

  '../../../main_gfx/avatar.png',    '../../../main_gfx/dots.png',    
  '../../../main_gfx/jadd.png',      '../../../main_gfx/jback.png',  
  '../../../main_gfx/jbell.png',     '../../../main_gfx/jcall.png',
  '../../../main_gfx/jcam.png',      '../../../main_gfx/jcancel.png', 
  
  '../../../main_gfx/jchat.png',     '../../../main_gfx/jdele.png',  
  '../../../main_gfx/jedit.png',     '../../../main_gfx/jham.png',   
  '../../../main_gfx/jhome.png',     '../../../main_gfx/jimage.png', 
  '../../../main_gfx/jnotif.png',    '../../../main_gfx/jproduct.png', 
  
  '../../../main_gfx/jrefresh.png',  '../../../main_gfx/jsave.png',
  '../../../main_gfx/jsearch.png',   '../../../main_gfx/jsend.png',
  '../../../main_gfx/jsite.png',     '../../../main_gfx/jsms.png', 
  '../../../main_gfx/landmark.png',  
  
  './manifest.webmanifest'
];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(async function() {
    try{
      var res = await fetch(event.request);
      var cache = await caches.open('cache');
      cache.put(event.request.url, res.clone());
      return res;
    }
    catch(error){
      return caches.match(event.request);
    }
  }());
});
