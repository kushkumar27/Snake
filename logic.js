// game variables
let snake_dir = {x:0,y:0}
let food_sound= new Audio('music/food.mp3');
let game_over = new Audio('music/gameover.mp3');
let move_sound = new Audio('music/move.mp3');
const game_sound= new Audio('music/music.mp3');
let score=0;
let speed=5;
let lastpainTime=0;
let snakeArr=[
    {
        x:13,y:15
    }
]
let food={x:4,y:12}

//game functions
function main(ctime){
    
    window.requestAnimationFrame(main);
     // repeating continously for rendering the screen
    
    if((ctime -lastpainTime)/1000 < 1/speed)
    {
        return;
    }
    lastpainTime=ctime;
    gameEngine()

    function isCollide(snakeArr){
        for(var i=1;i<snakeArr.length;i++){
            if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y ){
                return true;
            }

        }
        if(snakeArr[0].x >18 || snakeArr[0].x<0 ||snakeArr[0].y >18 || snakeArr[0].y<0){
                return  true;
            }  
         
    }

    function gameEngine(){
        //1. updating snake variable

        //game over case
        if(isCollide(snakeArr)){
            game_sound.pause();
            game_over.play();
            snake_dir={x:0,y:0};
            snakeArr=[{x:13,y:15}];

            // alert("game is over")
            swal({
                title: "Game is Finished ",
                text: "Do you wants to play again",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  swal(" Get Ready For the Next Round", {
                    icon: "success",  
                  },
                  game_sound.play()
                  );
                } else {
                  swal("Well played Try again later");
                  game_sound.pause();
                }
              });

              
              score=0;  
        }

        // if you have eaten the food and regenerate the food
        if(snakeArr[0].x==food.x && snakeArr[0].y==food.y){
            food_sound.play();
            score+=1;
            scoreBox.innerHTML="Score :"+score;
            speed+=0.2;
            snakeArr.unshift({x:snakeArr[0].x + snake_dir.x , y:snakeArr[0].y + snake_dir.y});

            //regenerate food between a and b ->random
            let a=2;
            let b= 16;
            food={x:Math.round(a + (b-a)* Math.random()), y:Math.round(a + (b-a)* Math.random())}

        }
        // moving snake
        for( var i= snakeArr.length -2 ; i>=0; i--){
            snakeArr[i+1]={...snakeArr[i]};
        }
        snakeArr[0].x +=snake_dir.x;
        snakeArr[0].y +=snake_dir.y; 
    
    














        //2. render the snake and food

        //displaying the snake
        board.innerHTML="";
        snakeArr.forEach((e,index)=>{
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart=e.y;
            snakeElement.style.gridColumnStart=e.x;
            if (index==0){
                snakeElement.classList.add('head');
            }
            else{
                snakeElement.classList.add('snake');
            }
           
            
            board.appendChild(snakeElement);

        })
        // display the food
         foodElement = document.createElement('div');
            foodElement.style.gridRowStart=food.y;
            foodElement.style.gridColumnStart=food.x;
            foodElement.classList.add('food');
            
            board.appendChild(foodElement);

    }
}










// main logic
 window.requestAnimationFrame(main); 
 window.addEventListener('keydown',e =>{
        snake_dir={x:0,y:1}
        switch (e.key) {
            case"ArrowUp":
             console.log("Arrowup is pressed");
             
             move_sound.play();
             snake_dir.x=0;
             snake_dir.y=-1;
             break;

             case"w":
             console.log("Arrowup is pressed");
             move_sound.play();
             snake_dir.x=0;
             snake_dir.y=-1;
             break;

             case"ArrowDown":
             console.log("Arrowdown is pressed");
             move_sound.play();
             snake_dir.x=0;
             snake_dir.y=1;
                   break;

                   case"s":
                   console.log("Arrowdown is pressed");
                   move_sound.play();
                   snake_dir.x=0;
                   snake_dir.y=1;
                         break;
      

             case"ArrowLeft":
             console.log("Arrowleft is pressed");
             move_sound.play();
             snake_dir.x=-1;
             snake_dir.y=0;
                break;

                case"a":
                console.log("Arrowleft is pressed");
                move_sound.play();
                snake_dir.x=-1;
                snake_dir.y=0;
                   break;
   
            case"ArrowRight":
             console.log("ArrowRight is pressed");
             move_sound.play();
             snake_dir.x=1;
             snake_dir.y=0;
                break;

                case"d":
                console.log("ArrowRight is pressed");
                move_sound.play();
                snake_dir.x=1;
                snake_dir.y=0;
                   break;
            default:
                break;
        }
 })