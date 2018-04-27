'use strict';
document.addEventListener('DOMContentLoaded', function() {
   var page = new Page(document.getElementById('main-block'));
});

class Page {
    constructor(field) {
        this.field = field;
        this.initialize = this.initialize.bind(this);
        this.disable = this.disable.bind(this);
        this.initializeBtn = this.field.querySelector('button.left-btn');
        this.disableBtn = this.field.querySelector('button.right-btn');

        this.initializeBtn.addEventListener('click', this.initialize);
        this.disableBtn.addEventListener("click", this.disable);
    }
    initialize() {
        Array.prototype.slice.call(document.querySelectorAll('#main-block .title')).forEach(function(elem) {
            var newElement = null, countOfPixels = 0;
            window.addEventListener('scroll', Ascroll, false);
            function Ascroll() {
                if (newElement == null) {
                    var getStyle = getComputedStyle(elem, ''), newStyle = '';
                    for (var i = 0; i < getStyle.length; i++) {
                        if (getStyle[i].indexOf('overflow') == 0 || getStyle[i].indexOf('padding') == 0 || getStyle[i].indexOf('border') == 0 || getStyle[i].indexOf('outline') == 0 || getStyle[i].indexOf('box-shadow') == 0 || getStyle[i].indexOf('background') == 0) {
                            newStyle += getStyle[i] + ': ' +getStyle.getPropertyValue(getStyle[i]) + '; '
                        }
                    }
                    newElement = document.createElement('div');
                    newElement.style.cssText = newStyle + ' box-sizing: border-box; width: ' + elem.offsetWidth + 'px;';
                    elem.insertBefore(newElement, elem.firstChild);
                    var lenghtOfChildren = elem.childNodes.length;
                    for (var i = 1; i < lenghtOfChildren; i++) {
                        newElement.appendChild(elem.childNodes[1]);
                    }
                    elem.style.height = newElement.getBoundingClientRect().height + 'px';
                }
                var element = elem.getBoundingClientRect(),
                    count = Math.round(element.top + newElement.getBoundingClientRect().height - elem.parentNode.getBoundingClientRect().bottom + parseFloat(getComputedStyle(elem.parentNode, '').paddingBottom.slice(0, -2)));
                if ((element.top - countOfPixels) <= 0) {
                    if ((element.top - countOfPixels) <= count) {
                        newElement.className = 'stop';
                        newElement.style.top = - count +'px';
                    } else {
                        newElement.className = 'sticky';
                        newElement.style.top = countOfPixels + 'px';
                    }
                } else {
                    newElement.className = '';
                    newElement.style.top = '';
                }
                window.addEventListener('resize', function() {
                    elem.children[0].style.width = getComputedStyle(elem, '').width
                }, false);
            }
        });
    }
    disable() {
        window.addEventListener('scroll', deleteBlock, false);
        deleteBlock();
        function deleteBlock() {
            var element = document.querySelectorAll('.title div');
            for (var i=0; i<element.length; i++) {
                element[i].classList.remove('sticky');
                element[i].classList.remove('stop');
            }
        }
    }
}
