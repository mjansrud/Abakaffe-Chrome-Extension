$(function() {
	
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
	
});
