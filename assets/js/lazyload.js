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
});