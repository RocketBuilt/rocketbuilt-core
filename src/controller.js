addCss('/iframe.css', document.head);

function addCss(src, target) {
  var s = document.createElement('link');
  s.setAttribute('href', src);
  s.setAttribute('rel', 'stylesheet');
  s.setAttribute('type', 'text/css');
  target.appendChild(s);
}

document.addEventListener('click', function(e) {
  var selected = !!e.target.getAttribute('data-rbid');

  if (selected) {
    e.target.removeAttribute('data-rbid');
  } else {
    e.target.setAttribute('data-rbid', 123);
  }

  window.top.RB.handle({
    action: !selected ? 'ADD_EL' : 'REMOVE_EL',
    el: e.target
  });
});
