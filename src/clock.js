const clockContainer = document.querySelector('.js-clock');
const clockTitle = clockContainer.querySelector('h1');
const clockChangeBtn = document.querySelector('#clockChangeBtn');

const CLOCK_STATE_LS = 'twentyFour hour clock';
const CLOCK_TWENTYFOUR = 'twentyFour';

let interval;

function handleClockChangeBtn(event){
    if(clockTitle.classList.contains(CLOCK_TWENTYFOUR)){
        clockTitle.classList.remove(CLOCK_TWENTYFOUR);
        localStorage.setItem(CLOCK_STATE_LS, 'false');

        clearInterval(interval);
        interval = setInterval(getTimeTwelve, 1000);

        clockChangeBtn.value = '12-hour clock';
    }else{
        clockTitle.classList.add(CLOCK_TWENTYFOUR);
        localStorage.setItem(CLOCK_STATE_LS, 'true');

        clearInterval(interval);
        interval = setInterval(getTimeTwentyFour, 1000);

        clockChangeBtn.value = '24-hour clock';
    }
}
function loadClockState(){
    const clockState = localStorage.getItem(CLOCK_STATE_LS);
    if(clockState === null){
        localStorage.setItem(CLOCK_STATE_LS, 'true');
        clockTitle.classList.add(CLOCK_TWENTYFOUR);
        clockChangeBtn.value = '24-hour clock';
    }else if(clockState==='true'){
        clockTitle.classList.add(CLOCK_TWENTYFOUR);
        clockChangeBtn.value = '24-hour clock';
    }else{
        clockChangeBtn.value = '12-hour clock';
    }
}
function getTimeTwentyFour(){
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    clockTitle.innerText = `${hours < 10 ? "0"+hours : hours}:${minutes < 10 ? "0"+minutes : minutes}:${seconds < 10 ? "0"+seconds : seconds}`;
}
function getTimeTwelve(){
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    // clockTitle.innerText = '케케';
    clockTitle.innerText = `${hours >= 13 ? hours-12 : hours < 10? '0'+hours : hours}:${minutes < 10 ? "0"+minutes : minutes}:${seconds < 10 ? "0"+seconds : seconds}`;
}
function init(){
    loadClockState();

    if(clockTitle.classList.contains(CLOCK_TWENTYFOUR)){
        getTimeTwentyFour();
        interval = setInterval(getTimeTwentyFour, 1000);
        interval;
    }else{
        getTimeTwelve();
        interval = setInterval(getTimeTwelve, 1000);interval;
    }
    
    clockChangeBtn.addEventListener('click', handleClockChangeBtn);
}
init();