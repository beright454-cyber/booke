const db = [
    ["My Pet Dog", "cute dog puppy", "#FF9F1C"], ["The Red Apple", "apple fruit", "#E71D36"], 
    ["Big Blue Bus", "school bus", "#2EC4B6"], ["Sunny Day", "sun sunshine", "#FFC300"], 
    ["My Cat Kitty", "cute cat kitten", "#FF9F1C"], ["Green Frog", "cute frog", "#2EC4B6"], 
    ["The Tall Tree", "tree forest", "#4CAF50"], ["Yummy Pizza", "pizza", "#FF5722"], 
    ["Fast Car", "race car", "#E71D36"], ["Little Fish", "fish aquarium", "#03A9F4"],
    ["The Moon", "moon stars", "#3F51B5"], ["My Teacher", "teacher school", "#9C27B0"], 
    ["Sweet Cake", "birthday cake", "#E91E63"], ["My House", "house home", "#795548"], 
    ["The Cow", "cow farm", "#8D6E63"], ["Play Ball", "soccer ball", "#212121"], 
    ["Rainy Day", "umbrella rain", "#607D8B"], ["The Lion", "lion zoo", "#FF9800"], 
    ["My Bike", "bicycle", "#F44336"], ["Happy Bird", "blue bird", "#00BCD4"],
    // ... (You can paste the rest of your 120 story array items here)
    ["Hot Air Balloon", "hot air balloon sky", "#03A9F4"]
];

let currentIndex = 0;

function render(index) {
    if(index < 0) index = db.length - 1;
    if(index >= db.length) index = 0;
    currentIndex = index;

    const [title, keyword, color] = db[index];
    const subject = title.replace(/The |My /g, "");

    document.documentElement.style.setProperty('--primary', color);
    document.getElementById('storyTitle').innerText = title;
    document.getElementById('pageBadge').innerText = `${index + 1} / ${db.length}`;
    document.getElementById('sheetNum').innerText = index + 1;

    const text = `This is a <b>${subject}</b>.<br>The ${subject} is very nice.<br>I like the ${subject}.<br>It is my favorite.`;
    document.getElementById('storyBody').innerHTML = text;

    const qContainer = document.getElementById('qContainer');
    qContainer.innerHTML = '';
    const questions = [`This is a {blank}.`, `The {blank} is very nice.`, `I like the {blank}.` ];

    questions.forEach((q, i) => {
        const div = document.createElement('div');
        div.className = 'q-item';
        const parts = q.split('{blank}');
        div.innerHTML = `${i+1}. ${parts[0]} <input class="blank-line"> ${parts[1]}`;
        qContainer.appendChild(div);
    });

    const img = document.getElementById('mainImg');
    const seed = Math.floor(Math.random() * 9999);
    const prompt = `anime style, vibrant animated illustration of ${keyword}, white background`;
    img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true&seed=${seed}`;
}

function backupImg() {
    const keyword = db[currentIndex][1];
    document.getElementById('mainImg').src = `https://loremflickr.com/400/300/${keyword},cartoon`;
}

function nav(dir) { render(currentIndex + dir); }

function speak() {
    const txt = document.getElementById('storyBody').innerText;
    const msg = new SpeechSynthesisUtterance(txt);
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);
}

render(0);