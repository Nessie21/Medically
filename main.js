document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
       var title = document.getElementById('title');
       title.innerHTML = 'Come back';
    } else {
       var title = document.getElementById('title');
       title.innerHTML = 'Medically';
    }
 });
 