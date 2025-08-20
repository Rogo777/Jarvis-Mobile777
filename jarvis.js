const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('overlay');

let recognizing = false;
let recognition;
let synth = window.speechSynthesis;

startBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
  initJarvis();
});

function initJarvis() {
  if (!('webkitSpeechRecognition' in window)) {
    alert('Your browser does not support voice recognition.');
    return;
  }

  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = async (event) => {
    const transcript = event.results[event.results.length-1][0].transcript.trim();
    console.log('Heard:', transcript);
    
    if (transcript.toLowerCase().includes('hello jarvis')) {
      speak('Hello, I am online and ready.');
      startConversation();
    }
  };

  recognition.onend = () => {
    recognition.start(); // keep listening
  };

  recognition.start();
  recognizing = true;
}

async function startConversation() {
  recognition.onresult = async (event) => {
    const transcript = event.results[event.results.length-1][0].transcript.trim();
    console.log('User:', transcript);

    // Call ChatGPT-5 mini API
    const response = await getChatGPTResponse(transcript);
    speak(response);
  };
}

function speak(text) {
  if (!synth) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  synth.speak(utterance);
}

// Example: simple ChatGPT fetch (replace with your actual API key)
async function getChatGPTResponse(prompt) {
  const config=require('./config.json');
  console.log(config.API):
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        messages: [{role:'user', content: prompt}],
        max_tokens: 200
      })
    });
    const data = await res.json();
    return data.choices[0].message.content;
  } catch(e) {
    console.error(e);
    return "Sorry, I couldn't process that.";
  }
}
