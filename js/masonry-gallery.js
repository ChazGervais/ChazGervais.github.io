if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready) //checks if the page has properly loaded, before functions are executed
} else {
    ready();
};

async function ready() {
    var gallery = document.querySelector('#gallery');
    /*var body = document.querySelector('.body')*/
    var getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
    var getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };
    var resizeAll = function () {
        var altura = getVal(gallery, 'grid-auto-rows');
        var gap = getVal(gallery, 'grid-row-gap');
        gallery.querySelectorAll('.gallery-item').forEach(function (item) {
            var el = item;
            el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
        });
    };

    var counterDispl = 0;
    var counterAll = 0;
    gallery.querySelectorAll('img').forEach(function (item) {
        item.classList.add('byebye');

        if (item.complete) {           
            item.addEventListener('load', function () {                  
                var altura = getVal(gallery, 'grid-auto-rows');
                var gap = getVal(gallery, 'grid-row-gap');
                var gitem = item.parentElement.parentElement;
                gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
                item.classList.remove('byebye');
                counterDispl = counterDispl+1; 
                console.log('Img displayed: ' + counterDispl + item.className);
            } )
        } else {
            console.log(item);
            counterAll = counterAll+1;

        };
        var notDispl = counterAll-counterDispl;
                console.log('Not displayed: ' + notDispl)
        
        /*if (item.complete) {
            console.log(item); 
        }
        else {
            item.addEventListener('load', function () {
                var altura = getVal(gallery, 'grid-auto-rows');
                var gap = getVal(gallery, 'grid-row-gap');
                var gitem = item.parentElement.parentElement;
                gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
                item.classList.remove('byebye');
            });
        };*/

    });
    window.addEventListener('resize', resizeAll);
    gallery.querySelectorAll('.gallery-item').forEach(function (item) {
        item.addEventListener('click', function () {        
            item.classList.toggle('full');        
        });
    });
    
};



