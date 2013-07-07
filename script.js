//first Javascript project -- fun times

//hide answer box before the game starts
var hideAnswerBox = function () {
	document.getElementById("answerbox").style.display = "none";
}

//question Objects
var questionNo //question number variable

var question1 = {
	question: "What was the name of the sled in \"Citizen Kane\"?",
	answer: "ROSEBUD",
	questionNo: 1
}

var question2 = {
	question: "What was the name of the band in \"Almost Famous\"?",
	answer: "STILLWATER",
	questionNo: 2
}

var question3 = {
	question: "Gweneth Paltrow played this Tenenbaum in \"The Royal Tenenbaums.\"",
	answer: "MARGOT",
	questionNo: 3
}

var question4 = {
	question: "Excellent film \"Super Troopers\" is set in this U.S. State:",
	answer: "VERMONT",
	questionNo: 4
}

var question5 = {
	question: "Zach Braff plays this character in \"Garden State.\" (first name):",
	answer: "ANDREW",
	questionNo: 5
}

var question6 = {
	question: "Odd film \"Napoleon Dynamite\" is set in this state",
	answer: "IDAHO",
	questionNo: 6
}

var question7 = {
	question: "This character is the most logical of the \"Star Trek\" characters",
	answer: "SPOCK",
	questionNo: 7
}

var question8 = {
	question: "Anakin Skywalker's daughter's name:",
	answer: "LEIA",
	questionNo: 8
}

var question9 = {
	question: "Harry Potter has a lot of fun playing this game at Hogwart's:",
	answer: "QUIDDITCH",
	questionNo: 9
}

var question10 = {
	question: "Robin Williams plays a bearded shrink to a math genius in this film:",
	answer: "GOOD WILL HUNTING",
	questionNo: 10
}

//sets the question number for initial question
var questionNumber; //variable for question text
var setQuestionNumber = function () {
	random = Math.random() * 10;
	random = Math.ceil(random);
	switch(random){
		case 1:
			questionNumber = question1;
			break;
		case 2:
			questionNumber = question2;
			break;
		case 3:
			questionNumber = question3;
			break;
		case 4:
			questionNumber = question4;
			break;
		case 5:
			questionNumber = question5;
			break;
		case 6:
			questionNumber = question6;
			break;
		case 7:
			questionNumber = question7;
			break;
		case 8:
			questionNumber = question8;
			break;
		case 9:
			questionNumber = question9;
			break;
		case 10:
			questionNumber = question10;
			break;
		default:
			questionNumber = question1;
			break;
	}

}

//ready the event handler functions
var timeRemaining;
var preventRepeat = new Array();
var prepareEventHandlers = function (){
	//puts up first question
	var readyButton = document.getElementById("readybutton");
	readyButton.onclick = function(){
	document.getElementById("readybutton").style.display = "none";
	document.getElementById("answerbox").style.display = "block";
	document.getElementById("welcometext").innerHTML = "Question no. 1:"
	setQuestionNumber();
	preventRepeat[0] = questionNumber.questionNo;
	console.log(preventRepeat);
	document.getElementById("questionbox").innerHTML = "<h2>" + questionNumber.question + "</h2>";
	//call timer
	timeRemaining = setInterval(countdown, 1000);
	}
}

//call initial functions
window.onload = function() {
	prepareEventHandlers();
	hideAnswerBox();
}




var rightAnswers = 0;
var wrongAnswers = 0;
var timeLeft = 31;
var userAnswer;

//timer
var countdown = function(){
	if (timeLeft > 0){
		timeLeft--;
		document.getElementById("timer").innerHTML = timeLeft;
		if (timeLeft < 10) {
			document.getElementById("timer").style.color = "red";
		} else {}
	} else {
			document.getElementById("answerbox").style.display = "none";
			document.getElementById("answersubmit").style.display = "none";
			document.getElementById("welcometext").innerHTML = "Sorry, you ran out of time.";
			document.getElementById("questionbox").innerHTML = "<h2>Just a little too slow.</h2>";
		}
	}

	//check the submitted answer, tally rights and wrongs, display next question
	var answerSubmit = document.getElementById("answersubmit");
	var repeatCheck;
	answerSubmit.onclick = function(){
			userAnswer = document.getElementById("answerarea").value;
			userAnswer = userAnswer.toUpperCase();
				if (userAnswer == questionNumber.answer) {
				rightAnswers++;
				document.getElementById("correctanswers").innerHTML = rightAnswers;
				document.getElementById("welcometext").innerHTML = "Question no. " + (rightAnswers + wrongAnswers + 1);
			} else {
				wrongAnswers++;
				document.getElementById("livesleft").innerHTML = "0";
				document.getElementById("livesleft").style.color="red";
				document.getElementById("welcometext").innerHTML = "Question no. " + (rightAnswers + wrongAnswers + 1);
			}
			
			//get rid of previous user answer
			document.getElementById("answerarea").value = "";

			if (rightAnswers == 3 || wrongAnswers == 2) {
				endGame();
			} else {
				setQuestionNumber();
				//checks to see if question has already been asked, runs setQuestionNumber until it's different
				repeatCheck = preventRepeat.indexOf(questionNumber.questionNo);
				while (repeatCheck > 0) {
					setQuestionNumber();
					repeatCheck = preventRepeat.indexOf(questionNumber.questionNo);
				}
				console.log(preventRepeat);
				preventRepeat[preventRepeat.length] = questionNumber.questionNo;
				document.getElementById("questionbox").innerHTML = "<h2>" + questionNumber.question + "</h2>";
			}

		}

//end of the game messages
var endGame = function(){
	if (rightAnswers == 3) {
		document.getElementById("answerbox").style.display = "none";
		document.getElementById("answersubmit").style.display = "none";
		document.getElementById("correct").style.color = "green";
		document.getElementById("welcometext").innerHTML = "Congrats!";
		document.getElementById("questionbox").innerHTML = "<h2>You won. You know your movies.</h2>";
		clearInterval(timeRemaining);

	} else {
		document.getElementById("answerbox").style.display = "none";
		document.getElementById("answersubmit").style.display = "none";
		document.getElementById("welcometext").innerHTML = "Sorry, you lost.";
		document.getElementById("questionbox").innerHTML = "<h2>Try watching more movies.</h2>";
		clearInterval(timeRemaining);
	}

}



