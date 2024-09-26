let btn = document.querySelector("button");
let box = document.querySelector(".box");

const speakAiFunction = (input) => {
    let speakInput = new SpeechSynthesisUtterance(input);

    speakInput.rate = 1;
    speakInput.pitch = 1;
    speakInput.volume = 1;
    speakInput.lang = "hin-IN";
    window.speechSynthesis.speak(speakInput);
}

const greetingAiFunction = () => {
    let date = new Date();
    let hour = date.getHours();

    if (hour >= 0 && hour < 12) {
        speakAiFunction("Good morning, how can i help you?");
    } else if ((hour >= 12 && hour < 16)) {
        speakAiFunction("Good afternoon, how can i help you?");
    } else {
        speakAiFunction("Good evening, how can i help you?");
    }
}

const handleCommand = (command) => {
    if (command.includes("hello") || command.includes("hey") || command.includes("hii")) {
        speakAiFunction("How can i help you?");
    } else if (command.includes("open instagram") || command.includes("instagram") || command.includes("my instagram")) {
        speakAiFunction("Opening instagram..., ");
        window.open("https://www.instagram.com/ahad_ansari_03/");
    } else {
        window.open(`https://www.google.com/search?q=${command}`);
        speakAiFunction(`Your result about...${command}`);
    }

}

const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
        let recognition = new webkitSpeechRecognition();

        recognition.lang = 'en-US';
        recognition.onresult = (e) => {
            let spokenText = e.results[0][0].transcript;

            handleCommand(spokenText.toLowerCase());

            box.classList.remove("btn-box");
            btn.innerHTML = `<i class="fa-solid fa-microphone-lines-slash"></i>`;
        }
        recognition.start();
    } else {
        alert("Your browser does not support voice input");
    }
}

btn.onclick = () => {
    box.classList.add("btn-box");
    btn.innerHTML = `<i class="fa-solid fa-microphone-lines"></i>`;
    startVoiceInput();
}

window.onload = () => {
    greetingAiFunction();
}