const score=document.querySelector('.score');
const startScreen=document.querySelector('.startScreen');
const gameArea=document.querySelector('.gameArea');

var audio=document.createElement("audio");  //yaha double codes ke andar ham tag ka name likhate hai jo tag ham create karna chahte hai.
audio.setAttribute('src','insane_Car_Sounds.mp3')     //isake through ham audio tag ke andar attribute set set karte hai.
audio.loop=true;
var audioClash=document.createElement("audio");  
audioClash.setAttribute('src','Car_Crash.mp3')     
// audioClash.loop=true;

document.addEventListener('keydown',KeyDown);
document.addEventListener('keyup',KeyUp);
startScreen.addEventListener('click',start);
let keys={ArrowUp : false,ArrowDown : false,ArrowLeft : false,ArrowRight : false};


let player={speed : 8,score:0};


function KeyDown(e)
{
    e.preventDefault();
    keys[e.key]=true;
   // console.log(e.key);
   // console.log(keys);
}
function KeyUp(e)
{
    e.preventDefault();
    keys[e.key]=false;
   // console.log(e.key);
   // console.log(keys);
}
function moveLines()
{
  let lines=document.querySelectorAll('.lines');
  lines.forEach(function(item){

      if(item.y>=700)
      {
          item.y-=760;
      }
      item.y+=player.speed;
      //console.log('e'+item.y);
      item.style.top=(item.y)+"px";

  })
}
function gameOver()
{
    player.start=false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML="Game Over<br> your final score is "+player.score+"<br>press here to restart";
    audio.pause();
    audioClash.play();
}
function iscollision(a,b)
{
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return (!((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right)));
    //in charo me se koi ek bhi true ho gaya yo collision nahi hoga. 
    
}
function moveEnemy(car)
{
  let enemy=document.querySelectorAll('.enemy');

  enemy.forEach(function(item){

      if(iscollision(car,item))
      {
       //console.log("collision ho gaya");
       gameOver();
      }
    
      if(item.y>=750)
      {
          item.y=-300;
          item.style.left=Math.floor(Math.random()*350)+"px";
          item.style.backgroundColor=randomColor();
      }
      item.y+=player.speed;
      //console.log(item.y);
      item.style.top=(item.y)+"px";
     
  })
}
function C()
{   
   let hex=Math.floor(Math.random()*256).toString(16);
    //console.log(("0"+String(hex)).substring(-2));
    return ("0"+String(hex)).substr(-2);
}
function randomColor()
{   
    return ("#"+C()+C()+C());
}
function start()
{   
    audioClash.pause();
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML="";  // ye likhane ki wajah se pahale ka pura items hat jayega.
    player.start = true;
    player.score=0;

    
    for( i=0;i<5;i++)
    {
        let roadLine=document.createElement('div');
        roadLine.setAttribute('class','lines');
        roadLine.y=150*i;
       // console.log(roadLine.y);
        roadLine.style.top=(roadLine.y)+"px";
        gameArea.appendChild(roadLine);
    }
    

    let car=document.createElement('div');
    car.setAttribute('class','car');
   // car.innerText="hey i an your car";
    gameArea.appendChild(car);

    player.y=car.offsetTop;
    player.x=car.offsetLeft;
    // console.log(player.y);
    // console.log(player.x);
    // console.log(player);


    for( i=0;i<3;i++)
        {
            let enemyCar=document.createElement('div');
            enemyCar.setAttribute('class','enemy');
            enemyCar.y=((1+i)*350)*-1;
            enemyCar.style.top=(enemyCar.y)+"px";
            enemyCar.style.left=Math.floor(Math.random()*350)+"px";
            enemyCar.style.backgroundColor=randomColor();
            gameArea.appendChild(enemyCar);
        }
        // window.requestAnimationFrame(gamePlay); ham simple gameplay() function ko call bhi kar lenge tab bhi same kaam hoga
        gamePlay();
   
}
function gamePlay()
{   
    //console.log("hey i am clicked");
    let car=document.querySelector('.car');
    let road= gameArea.getBoundingClientRect();
    //console.log(road);
    if(player.start)
    {   audio.play();
        moveLines();
        moveEnemy(car);
        score.innerHTML="score: "+(player.score++);

        if(keys.ArrowUp &&  player.y >road.top+70 ){ player.y-=player.speed};
        if(keys.ArrowDown &&  player.y <road.bottom-70){ player.y+=player.speed};
        if(keys.ArrowLeft && player.x >0){ player.x-=player.speed};
        if(keys.ArrowRight && player.x<road.width-60){ player.x+=player.speed};

        car.style.top=player.y+"px"; // yaha ham apane car ki position har baar set kar rahe hai
        car.style.left=player.x+"px";

        window.requestAnimationFrame(gamePlay);
        // gamePlay(); yaha hame upar wala hi function use karna hoga isase kam n ho raha hai. qki recursion ki wajah se jaldi jaldi 
        //call ho jayega jisase 1 second ke andar hi game khatm ho jayega . itana jaldi game khatam n ho dheere dheere gameplay()
        // function call ho isake liye hame window.requestAnimationFrame(gamePlay); ye hi likhana hoga.
    }
    
}