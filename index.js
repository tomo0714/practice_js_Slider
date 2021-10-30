// DOM
const ul = document.querySelector('#slider ul');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Constant
const interval = 3000;
const duration = 700;

// Variable
let dis = -1000;
let dir = -1;
let intervalId;
let element;

// Default Style
ul.prepend(document.querySelector('#slider li:last-child'));
ul.style.left = -1000 + 'px';


// Function
const animation = () => {
    ul.style.transition = `left ${duration}ms`;
    ul.style.left = dis + 'px';
    setTimeout(() => {
        ul.style.removeProperty('transition');
    }, duration);
};

const lockEvent = () => {
    prevBtn.removeEventListener('click', prev);
    nextBtn.removeEventListener('click', next);
    setTimeout(() => {
        prevBtn.addEventListener('click', prev);
        nextBtn.addEventListener('click', next);
    }, duration);
};

const posFix = () => {
    ul.style.left = -1000 + 'px';
    dis = -1000;
};

const slideTimer = () => {
    if(dir === -1){
        dis -= 1000;
        setTimeout(() => {
            const firstChild = document.querySelector('#slider li:first-child');
            ul.append(firstChild);
            posFix();
        }, duration);
    } else {
        dis += 1000;
        setTimeout(() => {
            const lastChild = document.querySelector('#slider li:last-child');
            ul.prepend(lastChild);
            posFix();
        }, duration);
        dir = -1;
    } 
    animation();
    lockEvent();
};

const resetFunc = () => {
    clearInterval(intervalId);
    intervalId = setInterval(slideTimer, interval);
};

const prev = () => {
    dir = 1;
    resetFunc();
    slideTimer();
};

const next = () => {
    dir = -1;
    resetFunc();
    slideTimer();
};

// Event
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

// Run
intervalId = setInterval(slideTimer, interval);
