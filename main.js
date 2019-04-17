document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
       var title = document.getElementById('title');
       title.innerHTML = 'Hey, Come back! 🤗';
    } else {
       var title = document.getElementById('title');
       title.innerHTML = 'Medically';
    }
 });
 