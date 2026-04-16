/**
 * AccuMark Services — Theme Toggle System
 */
(function () {
  'use strict';

  // 1. Apply saved theme before first paint (also done inline, this is a fallback)
  var saved = localStorage.getItem('accumark-theme') || 'light';
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  document.addEventListener('DOMContentLoaded', function () {
    requestAnimationFrame(function () {
      document.documentElement.classList.add('theme-loaded');
      injectStars();
      wireButtons();
    });
  });

  // Wire ALL toggle buttons on the page
  function wireButtons() {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
          document.documentElement.removeAttribute('data-theme');
          localStorage.setItem('accumark-theme', 'light');
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('accumark-theme', 'dark');
        }
        playRipple(btn);
      });
    });
  }

  function playRipple(btn) {
    var rect = btn.getBoundingClientRect();
    var ripple = document.createElement('div');
    ripple.className = 'theme-ripple';
    ripple.style.left = (rect.left + rect.width / 2) + 'px';
    ripple.style.top  = (rect.top  + rect.height / 2) + 'px';
    document.body.appendChild(ripple);
    setTimeout(function () { ripple.remove(); }, 1000);
  }

  function injectStars() {
    if (document.querySelector('.stars-container')) return;
    var container = document.createElement('div');
    container.className = 'stars-container';
    for (var i = 0; i < 60; i++) {
      var star = document.createElement('div');
      star.className = 'star';
      var size = Math.random() * 2.5 + 0.5;
      star.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + (Math.random()*100) + 'vw;top:' + (Math.random()*100) + 'vh;animation-duration:' + (Math.random()*20+15) + 's;animation-delay:' + (Math.random()*15) + 's;';
      container.appendChild(star);
    }
    document.body.prepend(container);
  }
})();
