$(function() {

	var status;
	var hours;
	var minutes;
	
	function createNotification(){
		
		chrome.runtime.sendMessage({event: "createNotification"}, function(response) {
   			console.log("Response: ", response);
		});
		
	}
	
	function fetchStatus(){ 

		chrome.storage.sync.get("request", function (response) {
			if(response.request == true){
				$.getJSON("https://kaffe.abakus.no/api/status", function (data) {
					status = data["coffee"]["status"];
					hours = data["coffee"]["time_since"]["hours"];
					minutes = data["coffee"]["time_since"]["minutes"];
					if(hours == 0 && minutes >= 8 && minutes <= 14){
						createNotification(); 
						chrome.storage.sync.set({"request": false});
					} 
				});
			}
		});

	} 
	
	setInterval(fetchStatus, 20000);
	fetchStatus();
	  
});

