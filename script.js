// My current mood
let currentMoodLevel = 75; // 0-100 scale
let currentGPA = 4; // 0-4 scale

const personalFacts = [

];

const myPlaylist = [
    { title: "Swimming Pools", artist: "Kendrick Lamar" },

];

const myWatchlist = [
    { title: "You (Season 1)", star: 5 },
    { title: "You (Season 2)", star: 4 },
    { title: "You (Season 3)", star: 4 }
];

const personalQuiz = [
    {
        question: "How many countries have I visited?",
        options: ["3", "2", "1", "0"],
        correct: 2
    }
];

// Quiz state
let currentQuestionIndex = 0;
let userScore = 0;
let quizActive = false;

function displayWatchlist(){
    const moviesList = document.getElementById('movies-list');
    
    myWatchlist.forEach(movie => {
        // Create the movie item div
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';
        
        // Create stars string
        const stars = '★'.repeat(movie.star) + '☆'.repeat(5 - movie.star);
        
        // Set the HTML content
        movieItem.innerHTML = `
            <span>${movie.title}</span>
            <div class="rating">
                <span class="star">${stars}</span>
            </div>
        `;
        
        // Add to the movies list
        moviesList.appendChild(movieItem);
    });
}

function displayMyGPA(){
    const gpaNumber = document.getElementById('gpa-number');
    const progressFill = document.getElementById('progress-fill');
    const progressPct = currentGPA * 25;
    gpaNumber.textContent = currentGPA;
    progressFill.style.width = `${progressPct}%`
}

// Initialize mood display
function displayMyMood() {
    const indicator = document.getElementById('mood-indicator');
    const moodText = document.getElementById('mood-text');
    const progressFill = document.getElementById('progress-fill');
    const musicItem = document.getElementById('music-item');

    indicator.style.left = currentMoodLevel + '%';
    
    if (currentMoodLevel <= 20) {
        moodText.textContent = "I'm completely hollow today and feel like a broken vending machine that ate everyone's money but forgot how to give snacks";
        document.body.style.background = "red";
    } else if (currentMoodLevel <= 40) {
        moodText.textContent = "Still feel like I'm made of spare parts held together with duct tape and false hope, but at least nothing fell off today";
    } else if (currentMoodLevel <= 60) {
        moodText.textContent = "Starting to feel less like NPC - actually had a conversation without completely glitching out";
    } else if (currentMoodLevel <= 80) {
        moodText.textContent = "Having a surprisingly okay day and feel like I might actually be a real person instead of just cosplaying as one";
    } else if (currentMoodLevel <= 90) {
        moodText.textContent = "Feeling genuinely solid today and like I've remembered how to be the protagonist of my own weird little story";
    } else if (currentMoodLevel <= 99) {
        moodText.textContent = "I'm absolutely killing it today and feel like I could probably convince a mirror that I'm worth looking at!";
    } else {
        moodText.textContent = "BEST DAY EVER! 🌟✨";
        document.body.style.background = "linear-gradient(90deg, #ff8a80, #ff80ab, #ea80fc, #8c9eff, #80d8ff, #84ffff, #a7ffeb, #ccff90, #f4ff81, #ffcc02)";
        document.querySelectorAll('*:not(style):not(script):not(head):not(html)').forEach(el => el.children.length === 0 && el.textContent.trim() && (el.textContent = 'BEST DAY EVER! 🌟✨'));
        progressFill.style.width = '100%';
        document.querySelectorAll('button').forEach(button => {
            button.disabled = true;
        });
        musicItem.style.display = 'none';
    }
}

// Random fact functionality
function showRandomFact() {
    const randomFact = personalFacts[Math.floor(Math.random() * personalFacts.length)];
    const factDisplay = document.getElementById('fact-display');
    factDisplay.textContent = randomFact;
    factDisplay.style.animation = 'none';
    setTimeout(() => {
        factDisplay.style.animation = 'fadeInUp 0.6s ease';
    }, 10);
}

// Quiz functionality
function startQuiz() {
    quizActive = true;
    currentQuestionIndex = 0;
    userScore = 0;
    document.querySelector('button[onclick="startQuiz()"]').classList.add('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    showQuizQuestion();
}

function showQuizQuestion() {
    const question = personalQuiz[currentQuestionIndex];
    document.getElementById('quiz-question').innerHTML = `
        <h3>Question ${currentQuestionIndex + 1} of ${personalQuiz.length}</h3>
        <p>${question.question}</p>
    `;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectQuizAnswer(index);
        optionsContainer.appendChild(optionElement);
    });
}

function selectQuizAnswer(selectedIndex) {
    const question = personalQuiz[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.style.background = '#10b981';
            option.style.color = 'white';
            option.style.borderColor = '#10b981';
        } else if (index === selectedIndex && index !== question.correct) {
            option.style.background = '#ef4444';
            option.style.color = 'white';
            option.style.borderColor = '#ef4444';
        }
        option.onclick = null;
    });
    
    if (selectedIndex === question.correct) {
        userScore++;
    }
    
    document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById('next-btn').classList.add('hidden');
    
    if (currentQuestionIndex < personalQuiz.length) {
        showQuizQuestion();
    } else {
        displayQuizResults();
    }
}

function displayQuizResults() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('quiz-result').classList.remove('hidden');
    
    const percentage = Math.round((userScore / personalQuiz.length) * 100);
    let resultMessage = '';
    
    if (percentage === 100) {
        resultMessage = 'You know me incredibly well! 🏆';
    } else if (percentage >= 80) {
        resultMessage = 'You really know me well!';
    } else if (percentage >= 60) {
        resultMessage = 'You know me pretty well';
    } else if (percentage >= 40) {
        resultMessage = 'Not bad?';
    } else {
        resultMessage = 'You aint know shit!';
    }
    
    document.getElementById('score-display').innerHTML = `
        <p style="font-size: 1.2rem; margin-bottom: 10px;">You scored ${userScore}/${personalQuiz.length} (${percentage}%)</p>
        <p style="font-weight: 500; color: #667eea;">${resultMessage}</p>
    `;
}

function resetQuiz() {
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    document.querySelector('button[onclick="startQuiz()"]').classList.remove('hidden');
    document.getElementById('quiz-question').innerHTML = '';
    document.getElementById('quiz-options').innerHTML = '';
    quizActive = false;
}

// Music functionality
let currentSongIndex = 0;

function playRandomSong() {
    currentSongIndex = Math.floor(Math.random() * myPlaylist.length);
    displayCurrentSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % myPlaylist.length;
    displayCurrentSong();
}

function displayCurrentSong() {
    const song = myPlaylist[currentSongIndex];
    document.getElementById('song-display').textContent = `${song.title} - ${song.artist}`;
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    displayMyMood();
    playRandomSong();
    displayMyGPA();
    displayWatchlist();
});