/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//Play & Pause functionality
      toggle.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          toggle.textContent = "❚❚";
        } else {
          video.pause();
          toggle.textContent = "►";
        }
      });

      //Synchronizing the Play/Pause button with the video.
      video.addEventListener("play", () => {
        toggle.textContent = "❚❚";
      });

      video.addEventListener("pause", () => {
        toggle.textContent = "►";
      });


      // Volume & Playback Speed functionality
      ranges.forEach((item) => {
          item.addEventListener('input', () => {
              let name = item.name;

              if (name === "volume") {
                  video.volume = item.value;
              }
              else if (name === "playbackRate") {
                  video.playbackRate = item.value;
              }
          });
      });


      // Skip and Rewind functionality.
      skipButtons.forEach((item) => {
        item.addEventListener('click', () => {
          video.currentTime += Number(item.dataset.skip); 
        });
      });

      
      // Update progress as the video plays
      video.addEventListener('timeupdate', () => {
        const percent = (video.currentTime / video.duration) * 100;

        progressBar.style.flexBasis = `${percent}%`;
      });


      //Clickable Progress Bar (Seek Functionality).
      progress.addEventListener('click', (e) => {
        const seekTime = (e.offsetX / progress.offsetWidth) * video.duration;

        video.currentTime = seekTime;
      });


      //Bonus Requirement: Video Error Handling.
      video.addEventListener('error', () => {
        let errorMessage = player.querySelector('.error-message');

        if (!errorMessage) {
          errorMessage = document.createElement('p');
          errorMessage.className = 'error-message';
          errorMessage.textContent = 'Error: Unable to load video. Please check the video source.';

          player.appendChild(errorMessage);
        }

        errorMessage.style.display = 'block';
      });
