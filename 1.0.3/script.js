$(function() {

	var html;
	var status;
	var start;
	var hours;
	var minutes;
    var hours_text;
    var minutes_text;
    var elapsed;

	console.log("loaded");

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
				$("#content").html('Du mottar et varsel når kaffen er klar! <button id="abort" type="button" class="btn btn-warning">Avbryt</button>');
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
		$.getJSON("https://kaffe.abakus.no/api/status", function (data) {
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
            if(hours == 1){
                hours_text = 'time';
            }else{
                hours_text = 'timer';
            }
            if(minutes == 1){
                minutes_text = 'minutt';
            }else{
                minutes_text = 'minutter';
            }
			$("#status").html(html + "</br> Den ble sist skrudd på for <div id='hours'>" + hours + "</div> " + hours_text + " og <div id='hours'>" + minutes + "</div> " + minutes_text + " siden.");
            $("#loading").slideUp("fast");
            $("#status").slideDown("fast");
        }); 
	}

    setTimeout(fetchStatus, 500);
	
});
