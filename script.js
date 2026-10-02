let playerName = "";

let questionScore = 0;


/* ==========================================
   SCREEN SWITCH
   ========================================== */

function showScreen(id) {

    let screens =
        document.querySelectorAll(".screen");

    screens.forEach(function(screen) {

        screen.classList.add("hidden");

    });

    document
        .getElementById(id)
        .classList.remove("hidden");
}


/* ==========================================
   ERROR SOUND
   ========================================== */

function playErrorSound() {

    try {

        let audio =
            new (window.AudioContext ||
            window.webkitAudioContext)();

        let oscillator =
            audio.createOscillator();

        let gain =
            audio.createGain();

        oscillator.type = "square";

        oscillator.frequency.setValueAtTime(
            180,
            audio.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            60,
            audio.currentTime + 0.3
        );

        gain.gain.setValueAtTime(
            0.08,
            audio.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audio.currentTime + 0.3
        );

        oscillator.connect(gain);

        gain.connect(audio.destination);

        oscillator.start();

        oscillator.stop(
            audio.currentTime + 0.3
        );

    } catch (error) {

        console.log("Sound unavailable.");

    }
}


/* ==========================================
   LONG FINAL BEEP
   ========================================== */

function playLongBeep() {

    try {

        let audio =
            new (window.AudioContext ||
            window.webkitAudioContext)();

        let oscillator =
            audio.createOscillator();

        let gain =
            audio.createGain();

        oscillator.type = "sine";

        oscillator.frequency.value = 420;

        gain.gain.setValueAtTime(
            0.001,
            audio.currentTime
        );

        gain.gain.linearRampToValueAtTime(
            0.18,
            audio.currentTime + 0.15
        );

        gain.gain.setValueAtTime(
            0.18,
            audio.currentTime + 1.8
        );

        gain.gain.linearRampToValueAtTime(
            0.001,
            audio.currentTime + 2.3
        );

        oscillator.connect(gain);

        gain.connect(audio.destination);

        oscillator.start();

        oscillator.stop(
            audio.currentTime + 2.3
        );

    } catch (error) {

        console.log("Sound unavailable.");

    }
}


/* ==========================================
   SUCCESS SOUND
   ========================================== */

function playSuccessSound() {

    try {

        let audio =
            new (window.AudioContext ||
            window.webkitAudioContext)();

        let oscillator =
            audio.createOscillator();

        let gain =
            audio.createGain();

        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
            500,
            audio.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            900,
            audio.currentTime + 0.2
        );

        gain.gain.value = 0.08;

        oscillator.connect(gain);

        gain.connect(audio.destination);

        oscillator.start();

        oscillator.stop(
            audio.currentTime + 0.25
        );

    } catch (error) {

        console.log("Sound unavailable.");

    }
}


/* ==========================================
   SHAKE
   ========================================== */

function shakeScreen() {

    let screen =
        document.querySelector(
            ".screen:not(.hidden)"
        );

    if (!screen) return;

    screen.classList.add("shake");

    setTimeout(function() {

        screen.classList.remove("shake");

    }, 500);
}


/* ==========================================
   NAME
   ========================================== */

function saveName() {

    let name =
        document
        .getElementById("nameInput")
        .value
        .trim();

    if (name === "") {

        document
            .getElementById("nameMessage")
            .innerText =
            "⚠️ NAME REQUIRED.";

        playErrorSound();

        shakeScreen();

        return;
    }

    playerName = name;

    document
        .getElementById("bugName")
        .innerText =
        playerName;

    document
        .getElementById("welcomeText")
        .innerText =
        "Hello, " + playerName + " 👀";

    playErrorSound();

    shakeScreen();

    showScreen("bugScreen");
}


function continueAfterBug() {

    showScreen("welcomeScreen");

}


/* ==========================================
   QUESTIONS
   ========================================== */

function startQuestions() {

    showScreen("questionsScreen");

}


function submitQuestions() {

    let birthday =
        document
        .getElementById("birthdayInput")
        .value
        .trim();

    let colour =
        document
        .getElementById("colourInput")
        .value
        .toLowerCase()
        .trim();

    let nickname =
        document
        .getElementById("nicknameInput")
        .value
        .toLowerCase()
        .trim();

    let stress =
        document
        .getElementById("stressInput")
        .value
        .toLowerCase()
        .trim();


    questionScore = 0;


    if (birthday === "2005-01-31") {

        questionScore++;

    }


    if (colour === "purple") {

        questionScore++;

    }


    if (nickname === "chooty") {

        questionScore++;

    }


    if (
        stress === "epa wenawa" ||
        stress === "epa wenawa." ||
        stress === "epaa wenawa"
    ) {

        questionScore++;

    }


    showScreen("questionBugScreen");

    let title =
        document
        .getElementById("questionBugTitle");

    let text =
        document
        .getElementById("questionBugText");


    title.innerText =
        "ANALYZING...";

    text.innerText =
        "Checking your answers.";


    setTimeout(function() {

        if (questionScore === 4) {

            title.innerText =
                "⚠️ TOO GOOD.";

            text.innerText =
                "You somehow know too much.";

            playSuccessSound();

        }

        else if (questionScore === 3) {

            title.innerText =
                "SYSTEM CONFUSED.";

            text.innerText =
                "3/4 answers correct. Suspicious.";

            playErrorSound();

        }

        else {

            title.innerText =
                "CRITICAL ERROR.";

            text.innerText =
                "The Chooty database is disappointed.";

            playErrorSound();

        }

    }, 900);


    setTimeout(function() {

        showScreen("memoryScreen");

    }, 2400);

}


/* ==========================================
   MEMORY
   ========================================== */

function startMemory() {

    document
        .getElementById("memoryStartButton")
        .style.display =
        "none";

    document
        .getElementById("memoryInstruction")
        .innerText =
        "MEMORIZE... 5 SECONDS.";

    setTimeout(function() {

        document
            .getElementById("memoryFacts")
            .classList.add("hidden");

        document
            .getElementById("memoryInstruction")
            .innerText =
            "MEMORY TEST ACTIVATED.";

        document
            .getElementById("memoryQuestion")
            .classList.remove("hidden");

    }, 5000);

}


function memoryAnswer(answer) {

    if (answer === 4) {

        playSuccessSound();

    } else {

        playErrorSound();

        shakeScreen();

    }


    setTimeout(function() {

        showScreen("redButtonScreen");

    }, 1200);

}


/* ==========================================
   RED BUTTON
   ========================================== */

function pressRedButton() {

    let message =
        document
        .getElementById("redMessage");


    message.innerText =
        "🚨 YOU ACTUALLY PRESSED IT.";

    playErrorSound();

    shakeScreen();


    setTimeout(function() {

        message.innerText =
            "WE LITERALLY TOLD YOU NOT TO. 😂";

    }, 900);


    setTimeout(function() {

        message.innerText =
            "This incident has been permanently documented.";

    }, 1800);


    setTimeout(function() {

        showScreen("lieScreen");

    }, 3000);

}


/* ==========================================
   LIE
   ========================================== */

function lieAnswer(answer) {

    let message =
        document
        .getElementById("lieMessage");


    if (answer === 3) {

        playSuccessSound();

    } else {

        playErrorSound();

        shakeScreen();

    }


    setTimeout(function() {

        showScreen("girlfriendScreen");

    }, 1200);

}


/* ==========================================
   GIRLFRIEND
   ========================================== */

function girlAnswer(answer) {

    if (answer === "yes") {

        showScreen("yesBugScreen");

        playErrorSound();

        shakeScreen();

    } else {

        showScreen("noBugScreen");

        playSuccessSound();

    }

}


function continueFromGirlBug() {

    showScreen("bossScreen");

}


/* ==========================================
   FINAL BOSS
   ========================================== */

function bossAnswer(answer) {

    playErrorSound();

    showScreen("loadingScreen");

    startLoading();

}


/* ==========================================
   FAKE LOADING
   ========================================== */

function startLoading() {

    let progress =
        document
        .getElementById("progress");

    let text =
        document
        .getElementById("loadingText");


    let number = 0;


    let loading =
        setInterval(function() {

            number++;

            progress.style.width =
                number + "%";


            if (number < 20) {

                text.innerText =
                    "Collecting evidence...";

            }

            else if (number < 40) {

                text.innerText =
                    "Checking memory...";

            }

            else if (number < 60) {

                text.innerText =
                    "Analyzing suspicious behaviour...";

            }

            else if (number < 80) {

                text.innerText =
                    "Reviewing previous answers...";

            }

            else if (number < 95) {

                text.innerText =
                    "Calculating final result...";

            }

            else {

                text.innerText =
                    "Finalizing classified report...";

            }


            if (number >= 100) {

                clearInterval(loading);

                startFinalDrama();

            }

        }, 35);

}


/* ==========================================
   FINAL DRAMA
   ========================================== */

function startFinalDrama() {

    document
        .getElementById("glitchName")
        .innerText =
        playerName;


    /*
       STEP 1:
       FULL GREEN SCREEN
    */

    showScreen("greenGlitchScreen");

    playLongBeep();


    /*
       STEP 2:
       AFTER GREEN GLITCH
    */

    setTimeout(function() {

        showScreen("accessScreen");

    }, 3200);


    /*
       STEP 3:
       ACCESS GRANTED
    */

    setTimeout(function() {

        document
            .getElementById("emotionalName")
            .innerText =
            playerName;

        showScreen("emotionalScreen");

    }, 5000);


    /*
       STEP 4:
       LET HIM READ THE MESSAGE
    */

    setTimeout(function() {

        showScreen("lastGlitchScreen");

        playLongBeep();

    }, 14000);


    /*
       STEP 5:
       ONE LAST MESSAGE
    */

    setTimeout(function() {

        showScreen("lastMessageScreen");

    }, 17500);


    /*
       STEP 6:
       FINAL SHUTDOWN
    */

    setTimeout(function() {

        document
            .getElementById("shutdownName")
            .innerText =
            playerName;

        showScreen("shutdownScreen");

    }, 22000);

}