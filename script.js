const users = {
    "Harini": {
        password: "wide sotta",
        message: `💖 Happy Friendship Day! 💖

You were just another girl in my class 🌸 until the day we started talking. From that moment, I was like, "Wow! 🤩 She gets every meme reference 😂, loves movies 🎬, and enjoys music 🎶 just as much as I do."

As time went on, I realized something beautiful. ❤️ The person I used to talk to every day on my walks home during my early UG days... my own thoughts... slowly became you. 🚶✨

Without even realizing it, you healed parts of me that I never knew needed healing. 🫂💝 You listened, laughed, understood, and made even the simplest conversations feel special. 🌼

There are so many things I owe you, things that words can never fully express. 🥹 Thank you for being such an amazing part of my life. 🌷

Here's to countless more laughs 😂, endless movie discussions 🎥, random meme exchanges 🤪, and beautiful memories together. 🌈✨

Happy Friendship Day to my own self. 💖🌸🫶

Forever grateful. ❤️`,

        certificateMessage: `🏆 Friendship Certificate 🏆

💖 Yes, I'm forever grateful to have both of you in my life. 🫂✨

To be honest, I regretted joining PG when I first came here. 😅 But somewhere along the journey, the two of you completely changed that perspective. 🌸❤️

You made this place feel like home. 🏡💕

More importantly, you showed me that female friendships can be genuine, supportive, comforting, and completely free from toxicity. 🌷🤍

Thank you for every laugh 😂, every random conversation ☕, every memory 📸, every bit of support 🤗, and for simply being yourselves. 💖

Here's to many more years of friendship, chaos, inside jokes, reels 📱😂, and beautiful memories together. 🌈✨

Love you both always. 🫶💝`
    },

    "Jerlin Roshini": {
        password: "Rosaaaa",
        message: `💖 Hi Roshini! 💖

As usual, you're my never-ending source of trouble 😤😂 and the hottest tea ☕✨, and honestly... I wouldn't trade it for anything.

I'll never forget the moments we've shared. 🫶 Not because they were always wholesome 🌸, but because they were absolutely chaotic 🤣, random 🤦‍♂️, and unforgettable. Those are the memories that make me smile the most. 💛

You made me feel like I was worthy. 🥹❤️ Sometimes a person changes your life without even realizing it, and you've done exactly that.

People might complain that you're flooding them with reels 😂📱, but here's a little secret... I actually watch every single one of them. 😌💖 Some make me laugh so hard 🤣, while some hit me right in the heart and leave me emotional. 🥹✨

Thank you for being unapologetically yourself, for all the laughs, the chaos, the conversations, and for making life so much brighter. 🌈🌸

Happy Friendship Day! 💝🫂✨`,

        certificateMessage: `🏆 Friendship Certificate 🏆

💖 Yes, I'm forever grateful to have both of you in my life. 🫂✨

To be honest, I regretted joining PG when I first came here. 😅 But somewhere along the journey, the two of you completely changed that perspective. 🌸❤️

You made this place feel like home. 🏡💕

More importantly, you showed me that female friendships can be genuine, supportive, comforting, and completely free from toxicity. 🌷🤍

Thank you for every laugh 😂, every random conversation ☕, every memory 📸, every bit of support 🤗, and for simply being yourselves. 💖

Here's to many more years of friendship, chaos, inside jokes, reels 📱😂, and beautiful memories together. 🌈✨

Love you both always. 🫶💝`
    }

};

// Application flow
const sections = {
    intro: document.getElementById('intro'),
    login: document.getElementById('login'),
    welcome: document.getElementById('welcome'),
    premium: document.getElementById('premium'),
    message: document.getElementById('message'),
    certificate: document.getElementById('certificate'),
    ending: document.getElementById('ending')
};

const modal = document.getElementById('modal');
const modalOk = document.getElementById('modalOk');

let currentUser = null;

function showSection(id){
    Object.values(sections).forEach(s=>{ if(s) s.classList.add('hidden'); });
    if(sections[id]) sections[id].classList.remove('hidden');
}

function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

async function typeText(el, text, speed=24){
    el.textContent = '';
    for(let i=0;i<text.length;i++){
        el.textContent += text[i];
        await sleep(speed);
    }
}

// Initial flow: show intro then login
window.addEventListener('load', async ()=>{
    showSection('intro');
    await sleep(2000);
    showSection('login');
});

// Login handlers (defensive)
const loginBtn = document.getElementById('loginBtn');
const forgotBtn = document.getElementById('forgotBtn');

if(loginBtn){
    loginBtn.addEventListener('click', ()=>{
        const uInput = document.getElementById('username');
        const pInput = document.getElementById('password');
        const u = uInput ? uInput.value.trim() : '';
        const p = pInput ? pInput.value : '';
        if(!u){ flashLogin('Please enter username'); return; }

        // tolerant username matching: exact, case-insensitive, or partial
        let matchedKey = null;
        if(users[u]) matchedKey = u;
        else {
            const low = u.toLowerCase();
            matchedKey = Object.keys(users).find(k=>k.toLowerCase() === low || k.toLowerCase().includes(low));
        }
        if(!matchedKey){ flashLogin('User not found'); return; }
        if(users[matchedKey].password !== p){ flashLogin('Wrong password'); return; }
        currentUser = matchedKey;
        goToWelcome();
    });
}

if(forgotBtn && modal){
    forgotBtn.addEventListener('click', ()=>{ modal.classList.remove('hidden'); if(modal.focus) modal.focus(); });
}
if(modalOk){ modalOk.addEventListener('click', ()=>{ modal.classList.add('hidden'); }); }

function flashLogin(msg){
    const card = document.querySelector('.login-card');
    const old = card.querySelector('.subtitle');
    old.textContent = msg;
    card.animate([{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}],{duration:400});
}

async function goToWelcome(){
    showSection('welcome');
    const w = document.getElementById('welcomeTyping');
    const sub = document.getElementById('welcomeSub');
    const name = currentUser.split(' ')[0];
    await typeText(w, `Hello ${name} ❤️\n\nHappy Friendship Day 🌸\n\nI'm so happy you're here.` , 30);
    await sleep(900);
    showSection('premium');
}

// Premium interactions
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const noMessages = document.getElementById('noMessages');
const messageContinue = document.getElementById('messageContinue');

let noClicks = 0;
const funnyReplies = [
    "Are you sure? 😅",
    "This seems like a mistake... 😂",
    "No takebacks! 😜",
    "Fine, I'll remove your choice... soon. 😤"
];

if(noBtn){
    noBtn.addEventListener('click', ()=>{
    noClicks++;
    // shrink and move behind YES
    noBtn.style.transform = `scale(${Math.max(0.3, 1 - 0.1*noClicks)})`;
    noBtn.style.zIndex = String(10 - noClicks);
    yesBtn.style.transform = `scale(${1 + 0.03*noClicks})`;
    if(noClicks <= funnyReplies.length){
        noMessages.textContent = funnyReplies[noClicks-1];
    }
    if(noClicks >= 6){
        noMessages.textContent = `😤\n\nI'm removing your choice.\n\n❤️ YES`;
        // force YES after short delay
        setTimeout(()=> yesBtn.click(), 800);
    }
    });
}

if(yesBtn){
    yesBtn.addEventListener('click', ()=>{
        // proceed to personalized message
        showSection('message');
        playMessageFlow();
    });
}

async function playMessageFlow(){
    const el = document.getElementById('messageTyping');
    const msg = users[currentUser].message || 'Happy Friendship Day!';
    // ensure continue button hidden during typing
    if(messageContinue) messageContinue.classList.add('hidden');
    await typeText(el, msg, 18);
    // confetti and animals bounce
    launchConfetti();
    bounceAnimals();
    // reveal Continue button so user controls when to proceed
    if(messageContinue){
        messageContinue.classList.remove('hidden');
    }
}

function bounceAnimals(){
    document.querySelectorAll('.animal').forEach((a,i)=>{
        a.animate([{transform:'translateY(0)'},{transform:'translateY(-30px)'},{transform:'translateY(0)'}],{duration:900,delay:i*120,iterations:3});
    });
}

function launchConfetti(){
    const container = document.getElementById('confetti');
    container.innerHTML = '';
    const colors = ['#ff5c8a','#ffd166','#4cc9f0','#8bd3c7','#c996ff'];
    for(let i=0;i<60;i++){
        const d = document.createElement('div');
        d.className = 'confetti-piece';
        d.style.background = colors[Math.floor(Math.random()*colors.length)];
        d.style.left = Math.random()*100 + '%';
        d.style.top = '-10%';
        d.style.transform = `rotate(${Math.random()*360}deg)`;
        container.appendChild(d);
        const endX = (Math.random()-0.5)*100;
        const duration = 2000 + Math.random()*1600;
        d.animate([{transform:`translateY(0) rotate(${Math.random()*360}deg)`},{transform:`translate(${endX}px,${window.innerHeight + 200}px) rotate(${Math.random()*720}deg)`}],{duration:duration, easing:'cubic-bezier(.2,.6,.2,1)'});
    }
}

async function showCertificate(){
    showSection('certificate');
    const nameEl = document.getElementById('certName');
    const msgEl = document.getElementById('certMessage');
    nameEl.textContent = (currentUser || '').toUpperCase();
    msgEl.textContent = users[currentUser].certificateMessage || '';
    await sleep(2500);
    showSection('ending');
}

// Continue button handler: only proceed to certificate when user clicks
if(messageContinue){
    messageContinue.addEventListener('click', ()=>{
        messageContinue.classList.add('hidden');
        showCertificate();
    });
}