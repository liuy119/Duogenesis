/* DUO GENESIS · 共享交互 */
(function () {
    'use strict';

    // 移动端菜单
    var burger = document.querySelector('.nav-burger');
    var menu = document.querySelector('.mobile-menu');
    if (burger && menu) {
        burger.addEventListener('click', function () {
            menu.classList.toggle('open');
        });
    }

    // 当前页导航高亮
    var path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[data-page]').forEach(function (a) {
        if (a.getAttribute('data-page') === path) a.classList.add('active');
    });

    // 滚动渐显
    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add('revealed');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 }) : null;
    document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('reveal-init');
        if (io) io.observe(el); else el.classList.add('revealed');
    });

    // 数字滚动
    function animateNum(el) {
        var target = parseFloat(el.getAttribute('data-target'));
        if (isNaN(target)) return;
        var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
        var dur = 1400, t0 = null;
        function step(ts) {
            if (!t0) t0 = ts;
            var p = Math.min((ts - t0) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = (target * eased).toFixed(dec);
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = target.toFixed(dec);
        }
        requestAnimationFrame(step);
    }
    var numIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) { animateNum(e.target); numIO.unobserve(e.target); }
        });
    }, { threshold: 0.4 }) : null;
    document.querySelectorAll('.num-anim').forEach(function (el) {
        if (numIO) numIO.observe(el); else animateNum(el);
    });

    // 回到顶部
    var totop = document.querySelector('.to-top');
    if (totop) {
        totop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }
})();
