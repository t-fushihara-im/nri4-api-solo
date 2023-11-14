function displayImage() {
  fetch(
    "https://static.wikia.nocookie.net/disney/images/9/99/Mickey_Mouse_Disney_3.jpeg"
  )
    .then((response) => {
      // fetchが成功した場合、画像を取得
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      document.getElementById("myImage").src = imageUrl;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function displayAllCharacters() {
  fetch("http://localhost:3000/characters")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const div = document.getElementById("charList");
      for (let char of res) {
        putImage(char.imageUrl).then(() => {
          let p = document.createElement("p");
          p.innerText = char.name;
          div.appendChild(p);
        });
      }
    })
    .catch(console.error);
}

async function putImage(imageUrl) {
  fetch(imageUrl)
    .then((response) => {
      // fetchが成功した場合、画像を取得
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      let img = document.createElement("img");
      const div = document.getElementById("charList");
      const imageUrl = URL.createObjectURL(blob);
      img.src = imageUrl;
      div.appendChild(img);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}
