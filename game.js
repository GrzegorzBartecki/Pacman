
			
			var world = [ 
								[2,2,2,2,2,2,2,2,2,2,2,2,2], 
								[2,1,1,1,1,1,2,1,1,1,1,3,2], 
								[2,2,2,2,2,1,2,1,2,2,2,1,2], 
								[2,1,1,1,1,1,1,1,1,1,2,1,2], 
								[2,1,2,1,2,2,3,2,2,1,1,1,2], 
								[2,1,2,1,1,1,1,1,1,1,2,1,2], 
								[2,1,2,2,1,1,2,1,1,2,2,1,2], 
								[2,1,1,1,1,1,2,1,1,1,1,3,2], 
								[2,2,2,2,2,2,2,2,2,2,2,2,2]
								]
			
			
			function displayWorld(){ // funkcja budujaca mape
				var output = ''; // kasowanie nieaktualnej mapy
				for (var i=0; i<world.length; i++) { // 
				output += "\n<div class='row'>"; // tworzenie rzedu
					for (var j = 0; j<world[i].length; j++) { // tworzenie elementow rzedu
						if (world[i][j] == 2) // wstawianie sciany
							output +=  "<div class='brick'></div>";
						else if(world[i][j] == 1) // wstawianie monet
							output += "<div class='coin'></div>";						
						else if(world[i][j] == 3) // wstawianie wisienki
							output += "<div class='cherry'></div>"; 						
					}
					output += "\n</div>"; // przypisanie divow do zmiennej
				}				
				document.getElementById('world').innerHTML = output; // aktualizacja wygladu mapy
			} 

		displayWorld(); 
		

		
