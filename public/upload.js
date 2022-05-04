var uploadBtn = document.getElementById("upload");
var imageInput = document.getElementById("imageInput");

uploadBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var fileName = imageInput.value;
    var fName = fileName.replace(/^.*[\\\/]/, '')
    console.log(fName);

    fetch(`/api/score/upload/1`, {
        method: 'PUT',
        body: JSON.stringify({
          scoreImage: fName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

    //window.location.href = "/upload";
})