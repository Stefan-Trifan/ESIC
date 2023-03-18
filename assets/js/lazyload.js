/** DETECTAR NAVEGADOR */
var navegador = (function () {
    var agente = navigator.userAgent.toLowerCase();
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

addEventListener("DOMContentLoaded", () => {
    let t = document.querySelectorAll(".bg-lazyload"),
        e = document.querySelectorAll("img");
    function a(t, e) {
        t.forEach(t => {
            t.isIntersecting && (t.target.classList.contains("bg-lazyload") ? t.target.dataset.gradient ? t.target.style.backgroundImage = "linear-gradient(" + t.target.dataset.gradient + "),url(" + t.target.dataset.src + ")" : t.target.style.backgroundImage = "url(" + t.target.dataset.src + ")" : t.target.src = t.target.dataset.src, e.unobserve(t.target))
        })
    }
    let r = {
        root: null,
        rootMargin: "0px",
        threshold: 0
    },
        g = new IntersectionObserver(a, r);
    t.forEach(t => {
        g.observe(t)
    }),
        e.forEach(t => {
            g.observe(t)
        })

    var typeNavegador = 'safari'
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
});

