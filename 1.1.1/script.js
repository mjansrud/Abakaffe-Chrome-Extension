$(function() {

	var mac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
	var html;
	var status;
	var start;
	var hours;
	var minutes;
    var hours_text = '';
    var minutes_text = '';
    var elapsed;


	console.log("Script loaded");

	if(!mac){ 
		$("#settings").hide();
	}
 
	$("#expand").click(function () {
		if($("#help").is(":visible")){
			$("#help").slideUp("slow");
			$("#expand").html("Mottar du ikke varsler?");
		}else{
			$("#help").slideDown("slow");
			$("#expand").html("Lukk");
		}
	});

	$("#settings").click(function () {
		chrome.tabs.create({url: "chrome://flags/#enable-native-notifications"});
	});

	chrome.storage.sync.get("request", function (response) {
		
		if(response.request == true){
			$("#content").html('<div>Du har allerede forespurt varsling.</div><button id="abort" type="button" class="btn btn-warning">Avbryt</button>');
			$("#abort").on("click", function(){
				chrome.storage.sync.set({"request": false}, function() {
					$("#content").html('<div>Du vil ikke lenger motta et varsel.</div> ');
					_gaq.push(['_trackEvent', 'request', 'cancelled']);
				}); 
			});
		}
		if(response.request == null || response.request == false){
			chrome.storage.sync.set({"request": true}, function() {
				$("#content").html('Du vil motta et varsel når kaffen er klar! <button id="abort" type="button" class="btn btn-warning">Avbryt</button>');
				$("#abort").on("click", function(){
					chrome.storage.sync.set({"request": false}, function() {
						$("#content").html('<div>Du vil ikke lenger motta et varsel.</div> ');
						_gaq.push(['_trackEvent', 'request', 'cancelled']);
					}); 
				});
				_gaq.push(['_trackEvent', 'request', 'saved']);
			}); 
		}	
	
		
	});

	function fetchStatus(){
        console.log("Fetching Abacoffee status")
		$.getJSON("http://api.founder.no/abakus/coffee", function (data) {
            console.log("Success! Updating values.")
			html 	= "Kaffetrakteren er";
			status  = data["coffee"]["status"];
			start   = data["coffee"]["last_start"];
			hours   = data["coffee"]["time_since"]["hours"];
			minutes = data["coffee"]["time_since"]["minutes"];
			if(status){
				html += " på!";
			}else{
				html += " av!";
			}
			if(hours != 0){
				if(hours == 1){
					hours_text =  hours + " time og ";
				}else{
					hours_text =  hours + " timer og ";
				}
			}
            if(minutes == 1){
                minutes_text = minutes + " minutt";
            }else{
				minutes_text = minutes + " minutter";
            }
			$("#status").html(html + "</br> Skrudd på for " + hours_text + minutes_text + " siden.");
            $("#loading").slideUp("fast");
            $("#status").slideDown("fast");
        }); 
	}

    setTimeout(fetchStatus, 500);
	
});
