const cardContainer = document.querySelector(".container");
async function getData() {
  const response = await fetch(
    "https://services.brid.tv/services/get/latest/26456/0/1/25/0.json"
  );
  const data = await response.json();
  console.log(data);
  console.log(data.Video[0]);
  data.Video.forEach((item) => {
    const card = document.createElement("div");
    card.className = "item1";
    const title = document.createElement("h2");
    title.textContent = item.name;
    const image = document.createElement("img");
    image.src = item.snapshots.sd;
    card.appendChild(image);
    card.appendChild(title);
    cardContainer.appendChild(card);
    function pretvori(time) {
      let h = Math.trunc(time / 3600);
      let m = Math.trunc((time % 3600) / 60);
      let s = time - (h * 3600 + m * 60);
      if (m > 9 && s > 9) return `0${h}:${m}:${s}`;
      else if (m > 9 && s <= 9) return `0${h}:${m}:0${s}`;
      else if (m <= 9 && s > 9) return `0${h}:0${m}:${s}`;
      else return `0${h}:0${m}:0${s}`;
    }
    let duration = document.createElement("p");
    duration.textContent = pretvori(Number(item.duration));
    card.appendChild(duration);
    image.addEventListener("click", function () {
      player(item);
    });
    title.addEventListener("click", function () {
      player(item);
    });
    function player(item) {
      let videoPlayer = document.createElement("div");
      videoPlayer.className = "videoPlayer";
      let video = document.createElement("video");
      video.className = "video";
      video.src = item.source.hd;
      videoPlayer.controls;
      videoPlayer.appendChild(video);
      cardContainer.appendChild(videoPlayer);
      video.autoplay = true;
      let controls = document.createElement("div");
      controls.className = "controls";
      let playButton = document.createElement("button");
      playButton.textContent = "||";
      playButton.className = "playbutton";
      controls.appendChild(playButton);
      videoPlayer.appendChild(controls);
      playButton.addEventListener("click", playVid);
      function playVid(item) {
        if (video.paused) {
          video.play();
          playButton.textContent = "||";
        } else {
          video.pause();
          playButton.textContent = "▶";
        }
      }
      let closeButton = document.createElement("button");
      closeButton.innerHTML = "X";
      closeButton.className = "playbutton";
      closeButton.style.float = "right";
      videoPlayer.appendChild(controls);
      closeButton.addEventListener("click", function () {
        videoPlayer.remove();
      });
      const volumebtn = document.createElement("button");
      volumebtn.textContent = "🔊";
      volumebtn.className = "playbutton";
      volumebtn.addEventListener("click", mute);
      function mute() {
        video.muted = !video.muted;
        if (video.muted) {
          volumebtn.textContent = "🔈";
        } else volumebtn.textContent = "🔊";
      }
      controls.appendChild(volumebtn);
      const volumeSlider = document.createElement("div");
      volumeSlider.innerHTML =
        '<input type="range" min="0" max="100" value="50" step="10">';
      volumeSlider.addEventListener("input", function () {
        video.volume = volumeSlider.querySelector("input").value / 100;
        if (video.volume === 0) {
          volumebtn.textContent = "🔈";
        } else {
          volumebtn.textContent = "🔊";
        }
      });

      controls.appendChild(volumeSlider);
      controls.appendChild(closeButton);
    }
  });
}

getData();
