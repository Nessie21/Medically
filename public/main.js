//jshint esversion:6
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    let title = document.getElementById('title');
    title.innerHTML = 'Wracaj! 🤗';
  } else {
    let title = document.getElementById('title');
    title.innerHTML = 'Medically and more...';
  }
});

window.onload = function () {
  currentDate = new Date();
  let year = currentDate.getFullYear();
  if (document.getElementById('footerYear')) {
    document.getElementById('footerYear').textContent = '© Copyright ' + year + ' Agnieszka Niemiec';
  }
}



document.body.addEventListener('wheel', function () {
  hideArrow();
});




// Add smooth scrolling to all links
$("a").on('click', function (event) {

  console.log('loaded');
  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {
    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function () {

      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  } // End if
});



function hand() {
  document.getElementById('hand').style.display = '';
}

function getAllPosts() {
  return firebase.database().ref('posts').once('value');
}

function saveAllPosts(posts) {
  firebase.database().ref('posts').set(posts);
}


//Button scroll up on main page
var btn = $('#button');

$('body').scroll(function () {
  if ($('body').scrollTop() > 200) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function (e) {
  e.preventDefault();
  console.log('click')
  $('html, body').animate({
    scrollTop: 0
  }, '300');
});

//Btn scroll up on interesting links page
var btn = $('#button');

$('.contentLinks').scroll(function () {
  if ($('.contentLinks').scrollTop() > 200) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function (e) {
  e.preventDefault();
  console.log('click');
  $('html, .contentLinks').animate({
    scrollTop: 0
  }, '300');
});

//Displaying the last post
$(document).ready(() => {
  getAllPosts().then(snapshot => {
    displayLastPost(snapshot.val());
  });
});

function displayLastPost(allPosts) {
  const last = $('.lastPost')[0];

  if (!!last) {
    const post = allPosts[allPosts.length - 1];
    const paraTitle = document.createElement('p');
    paraTitle.classList.add('paraTitle');
    paraTitle.innerText = post.title;
    const paraContent = document.createElement('p');
    paraContent.classList.add('paraContent');
    paraContent.innerText = post.content;
    const fullText = post.content;

    const dateObj = new Date(post.creationDate);
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newdate = year + "/" + month + "/" + day;
    const date = document.createElement('p');
    date.classList.add('dateHome');
    date.innerHTML=newdate;
    last.appendChild(date);

    if (fullText.length > 100) {
      const shortText = fullText.substring(0, 100);
      const showMoreButton = document.createElement('button');
      $(showMoreButton).addClass('showMoreButton');
      $(showMoreButton).addClass('showMoreButtonHome');
      $(showMoreButton).addClass('expand');
      showMoreButton.innerText = 'Pokaż więcej';
      last.appendChild(showMoreButton);
      paraContent.innerText = shortText;
      showMoreButton.addEventListener('click', event => {
        const button = event.target || event.srcElement;
        const shouldExpand = $(button).hasClass('expand');
        if (shouldExpand) {
          paraContent.innerText = fullText;
          button.innerText = 'Pokaż mniej';
          $(button).removeClass('expand').addClass('contract');
        } else {
          paraContent.innerText = shortText;
          showMoreButton.innerText = 'Pokaż więcej';
          $(button).removeClass('contract').addClass('expand');
        }
      });
    }

    last.appendChild(paraTitle);
    last.appendChild(paraContent);

  }

}