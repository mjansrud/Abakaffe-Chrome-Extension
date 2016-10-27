var id = 0;

chrome.storage.sync.get("initiated", function (response) {
    if(response.initiated == null){
        id++;
        chrome.notifications.create(
            'notification'+id,{
                type: "basic",
                title: "Velkommen til Abakaffe!",
                message: "Husk å klikk på ikonet for å få et varsel.\nProgrammert av Morten Jansrud.",
                iconUrl: "images/icon128.png",
                requireInteraction: true,
                priority: id
            },
            function() {
                console.log("Initiated notification " + id + " created!");
                chrome.storage.sync.set({"initiated": true});
            }
        );
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.event == "createNotification"){
        id++;
		var funnyArray = [
			'Run forest, run!',
			'I.. need.. cooffee!',
			'Aint nailing those exams without my JUICE!',
			'Laget av Morten Jansrud!'
		];
		var random = Math.floor(Math.random()*funnyArray.length);
		var funny = funnyArray[random];
		var date = new Date();
		var now = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        chrome.notifications.create(
            'notification'+id, {
                type: "basic",
                title: now + " - Nytraktet kaffe!",
                message: "Det er rykende fersk kaffe på kontoret. \n" + funny,
                iconUrl: "images/icon128.png",
                requireInteraction: true,
                priority: id
            },
            function () {
                console.log("Coffee notification " + id + " created!");
            }
        );
   		sendResponse("Creating coffee notification " + id + "!");
	}
});