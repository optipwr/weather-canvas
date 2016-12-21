$(document).ready(function(){


	$('#weather-form').submit(function(){
		event.preventDefault();
		var location = $('#location').val();
		var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=" +location+ ",us&appid=" + apiKey;
		$.getJSON(weatherUrl, function(weatherData){
			// this will console log the main API call so that we can sort through what we want to extract. It's our vision to the data
			console.log(weatherData);
			var currTemp = weatherData.main.temp;
			var name = weatherData.name;
			var icon = weatherData.weather[0].icon + '.png';
			var desc = weatherData.weather[0].description;
			$('#currTemp').html("<img src='http://openweathermap.org/img/w/"+ icon +"'>Current temperature in " + name + " is " + currTemp + "&deg;");
			$('.weather-description').html(desc);
			var canvas = $('#weather-canvas');
			var context = canvas[0].getContext('2d');

			// Set up the outer circle
			var currPercent = 0;
			// $('.degrees').html(currTemp + "&deg;");
			function animate(current){
				// Draw inner circle
				context.fillStyle = "#ccc";
				context.beginPath();
				context.arc(155,75,65,Math.PI*0,Math.PI*2);
				context.closePath();
				context.fill();
				$('.degrees').html(Math.floor(currPercent/5) + "&deg;");

				if(currPercent < 50){
					context.strokeStyle = '#e3f2fd';
				}
				else if(currPercent < 100){
					context.strokeStyle = "#bbdefb";
				}
				else if(currPercent < 150){
					context.strokeStyle = "#90caf9";
				}
				else if(currPercent < 200){
					context.strokeStyle = "#64b5f6";
				}
				else if(currPercent < 250){
					context.strokeStyle = "#42a5f5";
				}
				else if(currPercent < 300){
					context.strokeStyle = "#4db6ac";
				}
				else if(currPercent < 350){
					context.strokeStyle = "#26a69a";
				}
				else if(currPercent < 400){
					context.strokeStyle = "#009688";
				}
				else if(currPercent < 450){
					context.strokeStyle = "#00897b";
				}
				else if(currPercent < 500){
					context.strokeStyle = "#00796b";
				}

				// Draw the outer line
				context.lineWidth = 10; //make a thick outer line
				// context.strokeStyle = "blue";
				context.beginPath();
				context.arc(155,75,70,Math.PI*1.5, (Math.PI * 2 * current) + Math.PI*1.5);
				context.stroke(); //stroke not fill..we want a line
				currPercent++; //incrament currPercent
				var currPercent2 = currPercent / 5
				if(currPercent2 < currTemp){
					requestAnimationFrame(function(){
						animate(currPercent / 500);
					});
				}
			}
			animate();
		});

		var weatherFiveDay = "http://api.openweathermap.org/data/2.5/forecast/daily?units=imperial&q=Zip=" +location+ ",us&mode=json&appid=" + apiKey;
		$.getJSON(weatherFiveDay, function(weatherDataFive){
			console.log(weatherDataFive);
			console.log(weatherDataFive.list[1].temp.min);
			console.log(weatherDataFive.list[1].temp.max);
			var weekHTML = "";

			for(let i = 1; i < 6; i++){
				var weatherDate = new Date(weatherDataFive.list[i].dt * 1000);
				var date = weatherDate.getDate();
				var days = weatherDate.getDay();
				var dayOfWeek;
				if(days === 0){
					dayOfWeek = "Sun: "
				}
				else if(days === 1){
					dayOfWeek = "Mon: "
				}
				else if(days === 2){
					dayOfWeek = "Tue: "
				}
				else if(days === 3){
					dayOfWeek = "Wed: "
				}
				else if(days === 4){
					dayOfWeek = "Thu: "
				}
				else if(days === 5){
					dayOfWeek = "Fri: "
				}
				else if(days === 6){
					dayOfWeek = "Sat: "
				}
				var min = weatherDataFive.list[i].temp.min;
				var max = weatherDataFive.list[i].temp.max;
				weekHTML += '<div>' + dayOfWeek + Math.floor(date) + '<br>Low: ' + Math.floor(min) + '<br>High: ' + Math.floor(max) + '</div>';
			}
			$('.weather-week').html(weekHTML);
		});
	});
});