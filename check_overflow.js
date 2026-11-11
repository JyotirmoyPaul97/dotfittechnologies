const doc = document.documentElement;
const win = window.innerWidth;
const issues = [];
document.querySelectorAll('*').forEach(el => {
  const r = el.getBoundingClientRect();
  if (r.right > win + 1) {
    issues.push(el.tagName + '.' + (el.className || '').toString().slice(0,40) + ' [right=' + Math.round(r.right) + ']');
  }
});
console.log('WIN_WIDTH:' + win + ', DOC_SCROLL_WIDTH:' + doc.scrollWidth);
console.log('ISSUES:' + issues.slice(0, 8).join(' | '));
