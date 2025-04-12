// Music Player Functionality
const playButtons = document.querySelectorAll(".play-btn");
const mainPlayButton = document.querySelector(".main-play-btn");
const mainProgress = document.querySelector(".music-player .progress");
let isPlaying = false;
let currentTrack = null;
let mainPlayerPlaying = false;

// Main player controls
mainPlayButton.addEventListener("click", () => {
  mainPlayerPlaying = !mainPlayerPlaying;
  mainPlayButton.textContent = mainPlayerPlaying ? "⏸" : "▶";

  if (mainPlayerPlaying) {
    // Stop any playing track in the library
    if (currentTrack) {
      currentTrack.textContent = "▶";
      currentTrack = null;
      isPlaying = false;
    }
    simulateMainProgress();
  }
});

function simulateMainProgress() {
  if (!mainPlayerPlaying) {
    mainProgress.style.width = "30%";
    return;
  }

  let width = parseInt(mainProgress.style.width) || 30;
  if (width < 100) {
    width += 1;
    mainProgress.style.width = `${width}%`;
    setTimeout(simulateMainProgress, 1000);
  } else {
    mainProgress.style.width = "30%";
    mainPlayerPlaying = false;
    mainPlayButton.textContent = "▶";
  }
}

// Library track controls
playButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const wasPlaying = button === currentTrack;

    // Stop main player if it's playing
    if (mainPlayerPlaying) {
      mainPlayerPlaying = false;
      mainPlayButton.textContent = "▶";
      mainProgress.style.width = "30%";
    }

    // Reset all buttons
    playButtons.forEach((btn) => {
      btn.textContent = "▶";
    });

    // Stop current track if it was playing
    if (wasPlaying) {
      currentTrack = null;
      isPlaying = false;
      mainProgress.style.width = "30%";
      return;
    }

    // Play new track
    button.textContent = "⏸";
    currentTrack = button;
    isPlaying = true;

    // Simulate progress
    mainProgress.style.width = "30%";
    simulateProgress();
  });
});

function simulateProgress() {
  if (!isPlaying) return;

  let width = parseInt(mainProgress.style.width);
  if (width < 100) {
    width += 1;
    mainProgress.style.width = `${width}%`;
    setTimeout(simulateProgress, 1000);
  } else {
    mainProgress.style.width = "30%";
    if (currentTrack) {
      currentTrack.textContent = "▶";
    }
    isPlaying = false;
    currentTrack = null;
  }
}

// Activity Chart
const ctx = document.getElementById("activityChart").getContext("2d");
const activityChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps",
        data: [7500, 8200, 7800, 6500, 9200, 8500, 8000],
        borderColor: "#4A90E2",
        backgroundColor: "rgba(74, 144, 226, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Sleep",
        data: [7.5, 7.2, 6.8, 7.1, 7.8, 8.2, 7.9],
        borderColor: "#6FCF97",
        backgroundColor: "rgba(111, 207, 151, 0.1)",
        fill: true,
        tension: 0.4,
        yAxisID: "sleep",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10000,
        title: {
          display: true,
          text: "Steps",
        },
      },
      sleep: {
        position: "right",
        beginAtZero: true,
        max: 12,
        title: {
          display: true,
          text: "Sleep (hours)",
        },
      },
    },
  },
});

// Meditation Cards Interaction
const meditationCards = document.querySelectorAll(".meditation-card");

meditationCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Remove active class from all cards
    meditationCards.forEach((c) => c.classList.remove("active"));
    // Add active class to clicked card
    card.classList.add("active");
  });
});

// Chat Functionality
const chatInput = document.querySelector(".chat-input input");
const chatButton = document.querySelector(".chat-input button");
const chatBox = document.querySelector(".chat-box");

chatButton.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = chatInput.value.trim();
  if (message) {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const messageHTML = `
            <div class="message">
                <div class="time">${time}</div>
                <p>${message}</p>
            </div>
        `;
    chatBox.insertAdjacentHTML("beforeend", messageHTML);
    chatInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulate assistant response
    setTimeout(() => {
      const responseHTML = `
                <div class="message assistant">
                    <div class="time">${new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</div>
                    <p>I'll help you with that. What specific information would you like about your medications?</p>
                </div>
            `;
      chatBox.insertAdjacentHTML("beforeend", responseHTML);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
  }
}


