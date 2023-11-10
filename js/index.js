const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let sVolume = parseInt(localStorage.getItem('Sound'))/100
let mVolume = parseInt(localStorage.getItem('Music'))/100
let ld = localStorage.getItem('difficulty')
console.log(sVolume)

musicSound.volume=sVolume;
moveSound.volume=mVolume;

//elements
let board = document.getElementById('board')
let scoreboard = document.getElementById('scoreBox')
let highscoreboard = document.getElementById('hiscoreBox')
let pasuedDispaly =document.getElementById('paused')

// Game vars
let inputDir = {x: 0, y: 0}; 
let lastPaintTime = 0;
let speed = 10+3*ld;
let paused = false


let snakeArr = [{x:13,y:15}] 
let foodl = { x:10,y:10}   
let score = 0;
function isCollide(snakeArr){
    if(snakeArr[0].x===0||snakeArr[0].x===19||snakeArr[0].y===0||snakeArr[0].y===19){
        return true;
    }
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x==snakeArr[0].x && snakeArr[i].y == snakeArr[0].y)
        return true;
    }
    return false;

}


function main(ctime){
        window.requestAnimationFrame(main);
        

if((ctime-lastPaintTime)/1000<1/speed){
    return 
}


//500-0/1000=1/2<1/2
//501-500/1000=1/1000<1/2
else{
    lastPaintTime= ctime;
    if(!paused){
    gameEngine(ctime);   
    }
    else if(paused){
        pause()
    }
}

}

function gameEngine(ct){
    pasuedDispaly.style.display = "none";
   

    if(isCollide(snakeArr)){
        gameOverSound.play()

        musicSound.pause()
        inputDir ={x:0,y:0}
        snakeArr = [{x:13,y:15}] 
        alert("fefd")

        score = 0
    }

    let foodElement = document.createElement('div')
    foodElement.classList.add('food')
    foodElement.style.gridRowStart =foodl.y;
    foodElement.style.gridColumnStart=foodl.x;

    let hscore = localStorage.getItem('highScore');
    if(hscore == null){
        let hiscore= 0
        localStorage.setItem('highScore',JSON.stringify(hiscore))
        let hscore = localStorage.getItem('highScore');

    }

    

    
    if(snakeArr[0].x===foodl.x&&snakeArr[0].y===foodl.y){
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,  y:snakeArr[0].y+inputDir.y})
        foodSound.play()
        score+=1;
        let a =2;
        let b =16;
        foodl = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
        scoreboard.innerHTML="Score: "+score;
    }

    if(score>hscore){
        let hiscore=score;
        localStorage.setItem('highScore',JSON.stringify(hiscore))
    }
    scoreboard.innerHTML="Score: "+score;   
    highscoreboard.innerHTML ="HiScore: " + hscore;

   
    for(i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]}
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    // snake moving logic
    

    // updating snake
    board.innerHTML="";
    snakeArr.forEach((e,i) => {
       let snakeElement = document.createElement('div')
       snakeElement.style.gridRowStart =snakeArr[i].y;
       snakeElement.style.gridColumnStart=snakeArr[i].x;
       
       if(i===0){
       snakeElement.classList.add('head')
      
       }
       else {
        
       snakeElement.classList.add('snake')
       
       }
       board.appendChild(snakeElement);
        
    });
    board.appendChild(foodElement);
   


    


}

    
    requestAnimationFrame(main);
    
    //main logic


window.addEventListener('keydown',(e)=>{
    musicSound.play()
    moveSound.play()
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;

            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break; 
        case "Escape":
            paused=!paused
            break;
        case " ":
            document.querySelector('body').classList.toggle('cursor')
            break;

    }
})

function pause(){
    pasuedDispaly.style.display = "flex"
    musicSound.pause()
    cancelAnimationFrame(1)

}
function resume(){
    paused=false;
    moveSound.play()
    musicSound.play()
}
function restart(){
    inputDir = {x: 0, y: 0}; 
    snakeArr = [{x:13,y:15}] 
    foodl = { x:10,y:10}   
    score = 0;
    moveSound.play()
    musicSound.play()
    paused = false
    cancelAnimationFrame(1)
}
function menu(){
    window.location='index.html';
}