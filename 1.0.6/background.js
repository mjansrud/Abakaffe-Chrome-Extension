var id = 0;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.event == "createNotification"){
		var funnyArray = [
			'Run forest, run!',
			'I.. need.. cooffee!',
			'Aint nailing those exams without my JUICE!',
			'Laget av Morten Jansrud!', 
		];
		var random = Math.floor(Math.random()*funnyArray.length);
		var funny = funnyArray[random];
		var date = new Date(); 
		var time = date.toLocaleTimeString();
		var now = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

    	chrome.notifications.create(
			'notification'+(id++),{   
				 type: "basic",
  				 title: now + " - Nytraktet kaffe!",
  				 message: "Det er rykende fersk kaffe på kontoret. \n" + funny,
  				 iconUrl: "images/icon128.png",
				 requireInteraction: true
			},
			function() {
   				console.log("Notification created!");
			} 
		);
   		sendResponse("Creating notification!");
	}
   
});