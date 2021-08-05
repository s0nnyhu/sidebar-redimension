const SIDEBAR_WIDTH = 'sidebarWidth';

/**
 *Transform the element into a resizer handler
 * 
 * @param {HTMLElement} element
 * @param {function} cb callback called on resize with the offsets parameter
 * 
**/
function resizer(element, cb) {
    element.addEventListener('pointerdown', onPointerDown);

    /**
     * @param {PointerEvent} e
     **/
    function onPointerDown(e) {
        e.preventDefault();
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp, { once: true });
    }

    /**
     * @param {PointerEvent} e
     **/
    function onPointerUp(e) {
        document.removeEventListener('pointermove', onPointerMove);
    }

    /**
    * @param {PointerEvent} e
    **/
    function onPointerMove(e) {
        e.preventDefault();
        cb(e.pageX);
    }
}

resizer(document.querySelector('.resizer'), function (x) {
    const sidebarWidth = x + 'px';
    sessionStorage.setItem(SIDEBAR_WIDTH, sidebarWidth);
    document.body.style.setProperty('--sidebar', x + 'px');
});

const sidebarWidth = sessionStorage.getItem(SIDEBAR_WIDTH);
if (sidebarWidth !== null) {
    document.body.style.setProperty('--sidebar', sidebarWidth);
}
