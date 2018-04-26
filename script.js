document.querySelector('.left-btn').addEventListener('click', initialize);
document.querySelector('.right-btn').addEventListener("click", disable);
function initialize() {
    Array.prototype.slice.call(document.querySelectorAll('#main-block .title')).forEach(function(a) {
        var b = null, P = 0;
        window.addEventListener('scroll', Ascroll, false);
        function Ascroll() {
            if (b == null) {
                var getStyle = getComputedStyle(a, ''), s = '';
                for (var i = 0; i < getStyle.length; i++) {
                    if (getStyle[i].indexOf('overflow') == 0 || getStyle[i].indexOf('padding') == 0 || getStyle[i].indexOf('border') == 0 || getStyle[i].indexOf('outline') == 0 || getStyle[i].indexOf('box-shadow') == 0 || getStyle[i].indexOf('background') == 0) {
                        s += getStyle[i] + ': ' +getStyle.getPropertyValue(getStyle[i]) + '; '
                    }
                }
                b = document.createElement('div');
                b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
                a.insertBefore(b, a.firstChild);
                var l = a.childNodes.length;
                for (var i = 1; i < l; i++) {
                    b.appendChild(a.childNodes[1]);
                }
                a.style.height = b.getBoundingClientRect().height + 'px';
            }
            var element = a.getBoundingClientRect(),
                count = Math.round(element.top + b.getBoundingClientRect().height - a.parentNode.getBoundingClientRect().bottom + parseFloat(getComputedStyle(a.parentNode, '').paddingBottom.slice(0, -2)));
            if ((element.top - P) <= 0) {
                if ((element.top - P) <= count) {
                    b.className = 'stop';
                    b.style.top = - count +'px';
                } else {
                    b.className = 'sticky';
                    b.style.top = P + 'px';
                }
            } else {
                b.className = '';
                b.style.top = '';
            }
            window.addEventListener('resize', function() {
                a.children[0].style.width = getComputedStyle(a, '').width
            }, false);
        }
    });
}
function disable() {
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