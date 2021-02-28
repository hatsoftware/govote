var dragItem;
var container;

var curr_item=1;
var curr_Y=0;
var curr_X=0;
var active = false;
var currentX=0;
var currentY=0;
var initialX=0;
var initialY=0;
var xOffset = [];
var yOffset = [];

function dragStart(e) {
  if (e.target === dragItem) {
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX - xOffset[curr_item];
      initialY = e.touches[0].clientY - yOffset[curr_item];
    } else {
      initialX = e.clientX - xOffset[curr_item];
      initialY = e.clientY - yOffset[curr_item];
    }       
    active = true;
  }  
}

function dragEnd(e) {
  if(active){
    initialX = currentX;
    initialY = currentY;
    curr_X=parseInt(document.getElementById('el_left').innerHTML);
    curr_Y=parseInt(document.getElementById('el_top').innerHTML);

    initialX = curr_X;
    initialY = curr_Y;
    
    //if(initialX && initialY){
      dragItem.setAttribute('data-top',initialY);
      dragItem.setAttribute('data-left',initialX);
      document.getElementById('el_top').innerHTML=initialY;
      document.getElementById('el_left').innerHTML=initialX;
    //}
    
    active = false;
  }  
}

function drag(e) {
  if (active) {
  
    e.preventDefault();
  
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset[curr_item] = currentX;
    yOffset[curr_item] = currentY;

    curr_X=parseInt(dragItem.style.left)+parseInt(currentX)-margin_left;
    curr_Y=parseInt(dragItem.style.top)+parseInt(currentY)-margin_top;

    document.getElementById('el_top').innerHTML=curr_Y;
    document.getElementById('el_left').innerHTML=curr_X;  
    setTranslate(currentX, currentY, dragItem);     
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

