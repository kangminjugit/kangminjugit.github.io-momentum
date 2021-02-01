const body = document.querySelector('body');
const IMAGE_NUM_WINTER = 4;
const IMAGE_NUM_SPRING = 2;
const IMAGE_NUM_SUMMER = 2;
const IMAGE_NUM_FALL = 3;

const BACKGROUND_IMG = 'backgroundImg';

function getSeason(){
    const date = new Date();
    const month = date.getMonth()+1;
    let season;
    switch (month) {
        case 12: case 1: case 2: 
            season= 'winter';
            break;
        case 3: case 4: case 5:
            season= 'spring';
            break;
        case 6: case 7: case 8:
            season='summer';
            break;
        case 9: case 10: case 11:
            season='fall';
            break;
        default:
            break;
    }
    return season;
}
function handleImgLoad(event){
    console.log('finish');
}
function paintBackground(imgNum, season){
    body.style.backgroundImage = `url(./images/${season}/${imgNum}.jpg)`
}
function getRandom(season){
    let num;
    if(season==='spring')
        num = IMAGE_NUM_SPRING;
    else if(season==='summer')
        num = IMAGE_NUM_SUMMER;
    else if(season==='fall')
        num = IMAGE_NUM_FALL;
    else if(season==='winter')
        num=IMAGE_NUM_WINTER;

    return Math.floor(Math.random()*num);
}
function init(){
    const season = getSeason();
    const randomNumber = getRandom(season);
    paintBackground(randomNumber, season);
}
init();