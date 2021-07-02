var sections = document.querySelectorAll("section");

var masonryContainer = document.getElementById("items");
var totalHeight = 0;
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".masonry > img").forEach((i) => {
        console.log(i.height)
      totalHeight += i.height;
      console.log(totalHeight)
    });
});

console.log(totalHeight);


var elem = document.querySelector('.masonry');
var msnry = new Masonry( elem, {
  // options
  itemSelector: '.grid-item',
  columnWidth: 200
});



document.addEventListener("scroll", (e) => {
    var scrollPos = document.documentElement.scrollTop;
    window.scrollTo(0, scrollPos);
    console.log(scrollPos)

    var offset = document.querySelector("section").offsetTop;
    if (document.documentElement.scrollTop > (offset - 16)) {
        sections.forEach((s) => {
            document.getElementById("content").classList.add("stick");
            s.style.overflowY = "scroll";
        });
    } else if (document.documentElement.scrollTop < 100) {
        sections.forEach((s) => {
            document.getElementById("content").classList.remove("stick");
            s.style.overflow = "hidden";
        })
    }

})

var lastOrder;
var lastOrdered;

function fireResize() {
    var evt = document.createEvent('UIEvents');
    evt.initUIEvent('resize', true, false,window,0);
    window.dispatchEvent(evt);
}


window.addEventListener("click", (e) => {
    var t = e.target;
    if (t.classList.contains("item-image")) {
        if (t.parentElement.parentElement.classList.contains("full")) {
            t.parentElement.parentElement.classList.remove("full");
            resetOrder();
            lastOrder = t.style.order;
            lastOrdered = t;
            t.style.order = Math.floor(parseInt(lastOrder, 10) / 3) - 1;
            fireResize();
        } else {
            resetOrder();
            lastOrder = t.style.order;
            t.style.order = lastOrder;
            t.parentElement.parentElement.classList.add("full");
            fireResize();
        }
    }
})

fireResize();

function resetOrder() {
    if(lastOrdered && lastOrder){
        lastOrdered.style.order = lastOrder;
    }
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}
/*
var wheelOpt = { passive: true };
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, true); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, true);
}
*/




function preventScrollWheel(event) {
    if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        // The event can be canceled, so we do so.
        event.preventDefault();
    } else {
        // The event cannot be canceled, so it is not safe
        // to call preventDefault() on it.
        console.warn(`The following event couldn't be canceled:`);
        console.dir(event);
    }
}

document.addEventListener('wheel', preventScrollWheel);
