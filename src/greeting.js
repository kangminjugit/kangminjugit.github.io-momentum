const nameInputForm = document.querySelector('.js-inputForm');
const nameInput = nameInputForm.querySelector('input');
const greeting = document.querySelector('.js-greeting');

const USER_LS = 'currentUser';
const SHOWING_CN = 'showing';

function handleSubmitName(event){
    event.preventDefault();

    const currentValue = nameInput.value;
    saveName(currentValue);
    paintGreeting(currentValue);
}
function saveName(name){
    localStorage.setItem(USER_LS, name);
}
function askForName(){
    nameInputForm.classList.add(SHOWING_CN);
    nameInputForm.addEventListener('submit', handleSubmitName);
}
function paintGreeting(name){
    nameInputForm.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Hello ${name}`;
}
function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    console.log(currentUser);
    if(currentUser === null){
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}
function init(){
    loadName();
}
init();