// Track whether the video was playing before the tab was hidden
let wasPlaying = false;

function handleVisibilityChange() {
  const video = document.querySelector("video");
  if (video) {
    if (document.hidden) {
      // If the tab becomes hidden and the video is playing, pause it and set `wasPlaying` to true
      if (!video.paused) {
        video.pause();
        wasPlaying = true;
      }
    } else if (wasPlaying) {
      // When tab becomes visible, temporarily mute the video, play it, and then unmute
      video.muted = true;
      video.play().then(() => {
        setTimeout(() => {
          video.muted = false;
          wasPlaying = false; // Reset the flag after resuming playback
        }, 100);
      }).catch((error) => {
        console.error("Error resuming video:", error);
      });
    }
  }
}

// Additional event listener for when the window gains focus
function handleFocus() {
  const video = document.querySelector("video");
  if (video && wasPlaying) {
    video.muted = true;
    video.play().then(() => {
      setTimeout(() => {
        video.muted = false;
        wasPlaying = false;
      }, 100);
    }).catch((error) => {
      console.error("Error resuming video on focus:", error);
    });
  }
}

// Listen for visibility change events on the document
document.addEventListener("visibilitychange", handleVisibilityChange);

// Listen for focus events on the window
window.addEventListener("focus", handleFocus);
