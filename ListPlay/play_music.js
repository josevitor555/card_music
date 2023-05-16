document.addEventListener("DOMContentLoaded", function() {
  var musicas = [
    {
      nome: "Bate forte e dança (Slowed)",
      artista: "Oto8, Dj ritmo 55",
      arquivo: "music-artist/Bate Forte e Dança slowed and reverb.mp3"
    },
    {
      nome: "DEUS DA GUERRA",
      artista: "$pidxrs?808, LEGIXN, FXRCE",
      arquivo: "music-artist/DEUS DA GUERRA BRAZILIAN PHONK.mp3"
    },
    {
      nome: "Take It Off",
      artista: "Slowboy, lucaf., Crazy Mano",
      arquivo: "music-artist/Take It Off.mp3"
    }
  ];

  var currentSongIndex = 0;
  var audio = document.getElementById("player-audio");
  var songName = document.getElementById("song-name");
  var artistName = document.getElementById("name-artist");
  var playButton = document.getElementById("play-pause");
  var backwardButton = document.querySelector(".fa-backward");
  var forwardButton = document.querySelector(".fa-forward");
  var currentTimeSpan = document.querySelector(".current-time");
  var durationSpan = document.querySelector(".duration");
  var seekSlider = document.getElementById("seek-slider");
  var repeatIcon = document.querySelector('.fa-repeat');

  function formatTime(timeInSeconds) {
    var minutes = Math.floor(timeInSeconds / 60);
    var seconds = Math.floor(timeInSeconds % 60);
    var formattedTime =
      (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    return formattedTime;
  }
  
  function updateSeekBar() {
    seekSlider.value = audio.currentTime;
  }
  
  function onSeekBarChange() {
    audio.currentTime = seekSlider.value;
  }

  function updateCurrentTime() {
    currentTimeSpan.textContent = formatTime(audio.currentTime);
  }

  function updateDuration() {
    durationSpan.textContent = formatTime(audio.duration);
    seekSlider.max = audio.duration;
  }

  var isPlaying = false;

  function updatePlayPauseIcon() {
    if (isPlaying) {
      playButton.classList.remove("fa-play");
      playButton.classList.add("fa-pause");
    } else {
      playButton.classList.remove("fa-pause");
      playButton.classList.add("fa-play");
    }
  }
  function playPause() {
    if (audio.paused) {
      audio.play();
      isPlaying = true;
    } else {
      audio.pause();
      isPlaying = false;
    }
    updatePlayPauseIcon();
  }

  function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % musicas.length;
    loadSong(currentSongIndex);
    audio.play();
    isPlaying = true;
    updatePlayPauseIcon();
  }

  function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + musicas.length) % musicas.length;
    loadSong(currentSongIndex);
    audio.play();
    isPlaying = true;
    updatePlayPauseIcon();
  }

  function toggleRepeat() {
    repeatIcon.classList.toggle("active");
  }
  
  function playNextOrFirstSong() {
    if (repeatIcon.classList.contains('active')) {
      audio.currentTime = 0;
    } else {
      if (currentSongIndex === musicas.length - 1) {
        currentSongIndex = 0;
      } else {
        currentSongIndex++;
      }
    }
    loadSong(currentSongIndex);
    audio.play();
    isPlaying = true;
    updatePlayPauseIcon();
  }

  function loadSong(index) {
    var musica = musicas[index];
    songName.textContent = musica.nome;
    artistName.textContent = musica.artista;
    audio.src = musica.arquivo;
    audio.load();
  }
  
  audio.addEventListener("timeupdate", updateCurrentTime);
  audio.addEventListener("timeupdate", updateSeekBar);
  seekSlider.addEventListener("input", onSeekBarChange);
  audio.addEventListener("durationchange", updateDuration);
  audio.addEventListener("ended", playNextOrFirstSong);
  playButton.addEventListener("click", playPause);
  forwardButton.addEventListener("click", playNextSong);
  backwardButton.addEventListener("click", playPreviousSong);
  repeatIcon.addEventListener("click", toggleRepeat)
  
  loadSong(currentSongIndex);
});
