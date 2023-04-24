const navegador = (function () {
    const agente = navigator.userAgent.toLowerCase();
    if (agente.indexOf('firefox') !== -1) {
        return 'firefox';
    } else if (agente.indexOf('edge') !== -1 || agente.indexOf('edg') !== -1) {
        return 'edge';
    } else if (agente.indexOf('opr') !== -1 || agente.indexOf('opera') !== -1) {
        return 'opera';
    } else if (agente.indexOf('chrome') !== -1) {
        return 'chrome';
    } else if (agente.indexOf('safari') !== -1) {
        return 'safari';
    } else {
        return 'desconocido';
    }
})();

const typeNavegador = 'safari'
if (navegador == typeNavegador.toLowerCase().trim()) {
    var item;
    function convers(e) {
        e.forEach(element => {
            item = String(element.dataset.src)
            if (item.includes('.webp')) {
                item = item.replace('.webp', '.jpg');
                element.dataset.src = item;
            }
        });
    }
    convers(document.querySelectorAll('img'));
    convers(document.querySelectorAll('.bg-lazyload'));
}