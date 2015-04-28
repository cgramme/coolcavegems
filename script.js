
var sec,totalPoints,timeString,timeNumber,interval=0,myCurrentLevel,gMedal,sMedal,bMedal,timeLimit,currentLevel,currentTries,gameArray,
	i,stillPlaying,timerOnOff,firstPick,gameon,outOfTime,levelTime;



function resize(){
	var cw = $('.game-content').width();
	var cwheader = $('.header-logo').width();
	$('.game-content').css({'height':cw+'px'});
	$('.message').css({'width':cw/1.2+'px'});
	$('.game-li').css({'width':cw/5.2+'px','height':cw/5.2+'px'});
	$('button').css({'margin-top':cw/2-25+'px'});
	$('.header').css({'height' :cwheader/6.3+'px','margin-bottom' :cwheader/50+'px'});
	$('.header-logo').css({'height' :cwheader/5+'px'});
	if(cwheader<400){
		$('.side-gems-li').css({'width':cwheader/10+'px','height':cwheader/10+'px'});
	}else{
		$('.side-gems-li').css({'width':'39px','height':'39px'});
	}
	$('.message-text').css({'width':cw/1.5+'px'});
}
function startTimer(){

	sec = Math.floor(levelTime);
	
	interval = setInterval(function(){
    sec=sec-1;
    
    var time = parseInt(sec,10)
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;

    if(seconds<10){
    	seconds=("0"+seconds);
    }

    $('.time').text(minutes+':'+seconds);
    timeString=$('.time').text();
    timeNumber=sec;

    if(sec<=0){
		$('.game-li').css('visibility','visible');
		$('.game-content ul').empty();
		gameArray = [];
		i=0;
		stillPlaying=0;
		currentTries=1;
		timerOnOff=0;
		firstPick = null;
		gameOn=0; 
		outOfTime=true;
		displayMessage();
		clearInterval(interval);
		$('.time').text('Time');

	}

	}, 1000);

	

}

$(document).ready(function(){
	levelTime=100;
	totalPoints=0;
	timeLimit=20;
	gMedal=15;
	sMedal=20;
	bMedal=30;
	sec=0;
	myCurrentLevel = 1;
	currentLevel = 8;
	currentTries = 1;


	
	
	gameArray = [];
	var cw = $('.game-content').width();
	
	
    i = 0;       
function startGame () {  
	$('.tries').text('Tries');
	$('.gems-align ul').empty();
	
   setTimeout(function () {   
                      
      //alert(i);  
      if (i < 16) {  
      $('.game-list').append('<li>'+i+'</li>').children(':last').addClass('game-li').hide().css('background-image', 'url(images/gem.png)');
      $('.game-li').css({'width':cw/5.2+'px','height':cw/5.2+'px'});
      gameArray.push([i]); 
      
      i++; 
             
         startGame();  
      }else{
      	
      	resize();
      	setImages();
      	$('.game-li').fadeIn(1500);
      	
      }                   
   }, 10)

}
function setImages (){
	
	var alreadySet = [];
	var onImageNum = 1;
	var twoSet = 2;
	var randNum;
	function numGen(){

		var k=0;
			randNum = Math.floor(Math.random()*16);
			while(k<1)
			if(jQuery.inArray(randNum, alreadySet)==-1){
				alreadySet.push(randNum);
				
				k++;
			}else{
				randNum = Math.floor(Math.random()*16);
			}
		return randNum;
	}
	for(var i=0;i<gameArray.length;i++){
		gameArray[numGen()].push(onImageNum);
		if(twoSet == 1){
			twoSet = 2;
			onImageNum++;

		}else{
			twoSet = 1;
		}
	};
}
$('div').on('click','.but', function(){
	
	$('.message').hide();
	
	startGame();

	
});
$('button').on('click', function(){
	$('button').remove();
	startGame();
});
firstPick = null;
gameOn = 0;
stillPlaying=0;
timerOnOff=0;
$('.game-list').on('click','.game-li', function(){
	
	
	if(timerOnOff<1){
		timerOnOff=1;
			startTimer();
		} 


	if(gameOn == "0"){
	$(this).css('background-image', 'url(images/'+gameArray[$(this).text()][1]+'.png)','pointer-events','none').css('pointer-events','none');
	var lastSelected=$(this);
	if(firstPick == null){
		firstPick = $(this);
	}else{
		if(gameArray[$(firstPick).text()][1] == gameArray[$(lastSelected).text()][1]){
			gameOn=1;
				setTimeout(function () { 
		    $('.tries').text(currentTries);
			$(lastSelected).css('visibility', 'hidden');
			$(firstPick).css('visibility', 'hidden');
			firstPick = null;
		    gameOn=0;  
		
		    stillPlaying++;
		
		    $('.side-gems-ul').append('<li></li>').children(':last').addClass('side-gems-li').hide().css('background-image', 'url(images/'+gameArray[lastSelected.text()][1]+'.png)').fadeIn();
		    $('.game-content').css('box-shadow', '0px 0px 7px 0px #0000ff, 0px 0px 50px 0px #66ffcc');
		    setTimeout(
                 function(){
                 		$('.game-content').css('box-shadow', '0px 0px 5px 0px #0000ff, 0px 0px 20px 0px #ffffff');
                 }, 700);



		    if(currentTries>30){
			$('.game-li').css('visibility','visible');
				$('.game-content ul').empty();
				gameArray = [];
				i=0;
				stillPlaying=0;
				currentTries=1;
				timerOnOff=0;
				displayMessage();
				clearInterval(interval);
				$('.time').text('Time');
		}
		    
		    currentTries++;
		    resize();
		    if(stillPlaying==currentLevel){

				$('.game-li').css('visibility','visible');
				$('.game-content ul').empty();
				gameArray = [];
				i=0;
				stillPlaying=0;
				currentTries=1;
				timerOnOff=0;
				displayMessage();
				clearInterval(interval);
				$('.time').text('Time');
				myCurrentLevel++;

			}
			}, 700)
		}else{
			gameOn=1;
		setTimeout(function () { 
		$(lastSelected).css('background-image','url(images/gem.png)').css('pointer-events','auto');

		$(firstPick).css('background-image', 'url(images/gem.png)').css('pointer-events','auto');
		
		firstPick = null;  
		$('.tries').text(currentTries); 
		gameOn=0;  

		if(currentTries>30){
			$('.game-li').css('visibility','visible');
				$('.game-content ul').empty();
				gameArray = [];
				i=0;
				stillPlaying=0;
				currentTries=1;
				timerOnOff=0;
				displayMessage();
				clearInterval(interval);
				$('.time').text('Time');
		}

		currentTries++;
		     
   }, 700)
		}
	}

}else{}


});
resize();
function loadImages(){
for(var ii=1;ii<9;ii++){
		
		$('.side-gems-ul').append('<li></li>').children(':last').addClass('side-gems-li').css('background-image', 'url(images/'+[ii]+'.png)');
			
	}
}
loadImages();

resize();
});
$( window ).resize(function() {
	resize();
});
function displayMessage(){

	var finalTries = +$('.tries').text();
	var addPoints=0;
	//finalTries=15;




	if(outOfTime){
    	$('.but').text('Try Again!');
		$('.message p').html("<b>You ran out of time...<br>-200 points<br>Try Again!");
	    $('.message').slideDown(); 
	    totalPoints-=200;
	    outOfTime=false;
	}else if(finalTries<=gMedal){
		levelTime=(levelTime*0.8);
		addPoints=+totalPoints+1000+timeNumber;
		
		
		$('.but').text('Next Level!');
		$('.message p').html("<b>You won the gold medal!<br>Level "+myCurrentLevel+" passed!</b><br><br>Time bonus: "+timeString+"<br>Tries: "+finalTries+"<br>Total points "+addPoints);
	    $('.message').slideDown();
	    totalPoints+=1000;
	}else if(finalTries<=sMedal){
		levelTime=levelTime*0.8;
		addPoints=+totalPoints+700+timeNumber;
		
		
		$('.but').text('Next Level!');
		$('.message p').html("<b>You won the silver medal!<br>Level "+myCurrentLevel+" passed!</b><br><br>Time bonus: "+timeString+"<br>Tries: "+finalTries+"<br>Total points "+addPoints);
	    $('.message').slideDown();
	    totalPoints+=700;
	}else if(finalTries<=bMedal){
		levelTime=levelTime*0.8;
		addPoints=+totalPoints+400+timeNumber;

		
		$('.but').text('Next Level!');
		$('.message p').html("<b>You won the bronze medal!<br>Level "+myCurrentLevel+" passed!</b><br><br>Time bonus: "+timeString+"<br>Tries: "+finalTries+"<br>Total points "+addPoints);
	    $('.message').slideDown();
	    totalPoints+=400;
    
	}else{
		$('.but').text('Try Again!');
		$('.message p').html("<b>Too many tries...You can do better than that.<br>-200 points<br>Try Again!</b>");
	    $('.message').slideDown();
	    totalPoints-=200;   
	}
}


