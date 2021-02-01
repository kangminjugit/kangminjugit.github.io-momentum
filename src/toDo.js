const form = document.querySelector(".js-toDo");
const toDoInput = form.querySelector("input");

const pendingForm = document.querySelector(".js-toDo__pending");
const pendingUl = pendingForm.querySelector("ul");

const finishedForm = document.querySelector(".js-toDo__finished");
const finishedUl = finishedForm.querySelector("ul");

const windowBody = document.querySelector('body');

const showFinishedBtn = document.querySelector('#showFinishedBtn');
const finishedBox = document.querySelector('.finished');
const SHOW_FINISHED = 'showFinished';

const PENDING = "pending",
  FINISHED = "finished";
const PENDING_CN = "pending";

const EXTEND_WINDOW_SIZE = 'extendWindowSize';

let pendingList = [],
  finishedList = [];

function handleShowFinishedBtn(event){
  if(finishedBox.classList.contains(SHOW_FINISHED)){
    showFinishedBtn.value = 'hide what you finished';
    finishedBox.classList.remove(SHOW_FINISHED);
  }else{
    showFinishedBtn.value = 'show what you finished';
    finishedBox.classList.add(SHOW_FINISHED);
  }
  
}
function saveAllLs() {
  localStorage.setItem(PENDING, JSON.stringify(pendingList));
  localStorage.setItem(FINISHED, JSON.stringify(finishedList));
}

function handleDelete(event) {
  event.preventDefault();

  const btn = event.target;
  const li = btn.parentNode;

  let i;
  if (li.classList.contains(PENDING_CN)) {
    pendingUl.removeChild(li);
    for (i = 0; i < pendingList.length; i++) {
      if (pendingList[i].id === li.id) {
        pendingList.splice(i, 1);
        break;
      }
    }
  } else {
    finishedUl.removeChild(li);
    for (i = 0; i < finishedList.length; i++) {
      if (finishedList[i].id === li.id) {
        finishedList.splice(i, 1);
        break;
      }
    }
  }
  saveAllLs();
  // deleteLs(li);
}
function handleCheck(event) {
  event.preventDefault();

  const btn = event.target;
  const li = btn.parentNode;
  const span = li.childNodes[0];

  let i;
  if (li.classList.contains(PENDING_CN)) {
    pendingUl.removeChild(li);
    for (i = 0; i < pendingList.length; i++) {
      if (pendingList[i].id === li.id) {
        pendingList.splice(i, 1);
        break;
      }
    }
    paintToDo(li.id, span.innerText, false);
    finishedList.push({ id: li.id, text: span.innerText });
  } else {
    finishedUl.removeChild(li);
    for (i = 0; i < finishedList.length; i++) {
      if (finishedList[i].id === li.id) {
        finishedList.splice(i, 1);
        break;
      }
    }
    paintToDo(li.id, span.innerText, true);
    pendingList.push({ id: li.id, text: span.innerText });
  }
  saveAllLs();
}

function paintToDo(id, text, paintPending) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const checkBtn = document.createElement("button");

  span.innerText = text;
  delBtn.innerText = "❌";
  if (paintPending === true) checkBtn.innerText = "✔️";
  else checkBtn.innerText = "☑️";

  delBtn.addEventListener("click", handleDelete);
  delBtn.classList.add('btn');
  checkBtn.addEventListener("click", handleCheck);
  checkBtn.classList.add('btn');

  li.id = id;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);

  if (paintPending === true) {
    li.classList.add(PENDING_CN);
    pendingUl.appendChild(li);
  } else {
    finishedUl.appendChild(li);
  }

  if(pendingUl.childNodes.length >= 10 || finishedUl.childNodes.length >= 10){
    windowBody.classList.add(EXTEND_WINDOW_SIZE);
  }
}

function makeId() {
  return String(Date.now());
}
function handleAddTask(event) {
  event.preventDefault();

  const id = makeId(),
    text = toDoInput.value;

  paintToDo(id, text, true);
  pendingList.push({ id: id, text: text });
  saveAllLs();
}

function loadLs() {
  let i;

  const pendingLs = localStorage.getItem(PENDING);
  if(pendingLs !== null){
    const parsedPending = JSON.parse(pendingLs);
    
    for(i=0; i<parsedPending.length; i++){
      pendingList.push({id : parsedPending[i].id, text : parsedPending[i].text});
    }
  }

  const finishedLs = localStorage.getItem(FINISHED);
  if(finishedLs != null){
    const parsedFinished = JSON.parse(finishedLs);
    for(i=0; i<parsedFinished.length; i++){
      finishedList.push({id : parsedFinished[i].id, text : parsedFinished[i].text});
    }
  }
}
function init() {
  form.addEventListener("submit", handleAddTask);

  loadLs();
  let i;
  for (i = 0; i < pendingList.length; i++)
    paintToDo(pendingList[i].id, pendingList[i].text, true);
  for (i = 0; i < finishedList.length; i++)
    paintToDo(finishedList[i].id, finishedList[i].text, false);

  showFinishedBtn.addEventListener('click', handleShowFinishedBtn);
}
init();
