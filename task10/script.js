const words = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "curabitur", "vel", "hendrerit", "libero", "eleifend", "pharetra", "felis", "evanesce", "serenity", "coding", "frontend", "internship"];

const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const resultArea = document.getElementById('result-area');

// 1. Helper to get random word
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

// 2. Build a sentence
const createSentence = () => {
    let sentence = [];
    const length = Math.floor(Math.random() * 6) + 5; // 5-10 words
    for(let i = 0; i < length; i++) sentence.push(getRandomWord());
    
    let str = sentence.join(" ");
    return str.charAt(0).toUpperCase() + str.slice(1) + ".";
}

// 3. Build a paragraph
const createParagraph = () => {
    let para = [];
    for(let i = 0; i < 4; i++) para.push(createSentence());
    return para.join(" ");
}

// Main Generation Logic
generateBtn.addEventListener('click', () => {
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('type').value;
    let finalOutput = [];

    for(let i = 0; i < amount; i++) {
        if(type === 'words') finalOutput.push(getRandomWord());
        if(type === 'sentences') finalOutput.push(createSentence());
        if(type === 'paragraphs') finalOutput.push(`<p>${createParagraph()}</p>`);
    }

    resultArea.innerHTML = type === 'paragraphs' ? finalOutput.join("") : finalOutput.join(" ");
});

// Clipboard Functionality
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(resultArea.innerText);
    alert("Text copied!");
});