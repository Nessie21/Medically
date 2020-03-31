//jshint esversion: 6
//Creating a post

function handleSubmit() {
  let title = document.getElementById('title-input');
  let content = document.getElementById('content');

  let post = {
    title: title.value,
    content: content.value,
    id: Math.floor(Math.random() * 1000),
    creationDate: new Date().toString()
  };

  if (!!title.value && !!content.value) {

    getAllPosts().then(snapshot => {
      const allPosts = snapshot.val() || [];
      allPosts.push(post);
  
      saveAllPosts(allPosts);
      title.value = '';
      content.value = '';
    });

  }
}

function download(content, fileName, contentType) {
  var a = document.createElement('a');
  var file = new Blob([content], {
    type: contentType
  });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}