
			
			var map = [ 
								[2,2,2,2,2,2,2,2,2,2,2,2,2], 
								[2,1,1,1,1,1,2,1,1,1,1,3,2], 
								[2,2,2,2,2,1,2,1,2,2,2,1,2], 
								[2,1,1,1,1,1,1,1,1,1,2,1,2], 
								[2,1,2,1,2,2,3,2,2,1,1,1,2], 
								[2,1,2,1,1,1,1,1,1,1,2,1,2], 
								[2,1,2,2,1,2,2,1,2,2,2,1,2], 
								[2,1,1,1,1,1,2,1,1,1,1,4,2], 
								[2,2,2,2,2,2,2,2,2,2,2,2,2]
								]
			
			var pacman = 
			{  // ustawienie pozycji pacmana
				x: 1,
				y: 1
			};
			
			var punkty = 0;
			
			function displayMap()
			{ // funkcja budujaca mape
				var output = ''; // kasowanie nieaktualnej mapy
				for (var i=0; i<map.length; i++) 
				{ // 
					output += "\n<div class='row'>"; // tworzenie rzedu
					for (var j = 0; j<map[i].length; j++) { // tworzenie elementow rzedu
						if (map[i][j] == 2) // wstawianie sciany
							output +=  "<div class='brick'></div>";
						else if(map[i][j] == 1) // wstawianie monet
							output += "<div class='coin'></div>";						
						else if(map[i][j] == 3) // wstawianie wisienki
							output += "<div class='cherry'></div>"; 	
						if (map[i][j] == 0) // wstawianie pustego pola
							output += "<div class='ground'></div>";	
						if(map[i][j] == 4)			//wstawianie duszka
							output += "<div class='ghost1'></div>";							
					}
					output += "\n</div>"; // przypisanie divow do zmiennej
				}				
				document.getElementById('world').innerHTML = output; // aktualizacja wygladu mapy
			} 
			
			function displayPacman()
			{ // creates our pacman function
				document.getElementById('pacman').style.top = pacman.y*50+"px"; // ustawienie pacmana w pozycji w pionie (y)*wymiar diva
				document.getElementById('pacman').style.left = pacman.x*50+"px"; // ustawienie pacmana w pozycji w poziomie (x)*wymiar diva
			}
			
			function pokazWynik()
			{ 
				document.getElementById('wynik').innerHTML = punkty; // punktacja
			}
			
			displayMap(); 
			displayPacman();
			pokazWynik();

			
			document.onkeydown = function(e)
			{ // sterowanie ruchem
				if(e.keyCode == 37 && map[pacman.y][pacman.x-1] != 2) //wykonaj jezeli wcisniecie lewej strzalki nie wskaze na sciane
					{ // when left arrow key is pressed
						pacman.x--; 																			// zmniejsz wspolrzedna x pacmana
						document.getElementById('pacman').style.transform = "rotate(-180deg)"; // zmiana stylu o obrot
					}
				else if(e.keyCode == 39 && map[pacman.y][pacman.x+1] != 2) //wykonaj jezeli wcisniecie prawejj strzalki nie wskaze na sciane
					{ 
						pacman.x++; 																					// zwieksz wspolrzedna x pacmana
						document.getElementById('pacman').style.transform = "rotate(0deg)"; 
					}
				if(e.keyCode == 40 && map[pacman.y+1][pacman.x] != 2)
					{ 
						pacman.y++; 
						document.getElementById('pacman').style.transform = "rotate(90deg)"; 
					} 
				else if(e.keyCode == 38 && map[pacman.y-1][pacman.x] != 2)
					{ 
						pacman.y--; 
						document.getElementById('pacman').style.transform = "rotate(-90deg)"; 
					}
				
				if(map[pacman.y][pacman.x] == 1)  //jezeli wspolrzedna pacmana wskazuje na miejsce z moneta  to ustaw puste
					{  
						map[pacman.y][pacman.x] = 0; 
						punkty += 10;
						pokazWynik();
						displayMap(); //odswierz mape			
					} 
				else if (map[pacman.y][pacman.x] == 3) 
					{
							map[pacman.y][pacman.x] = 0
							punkty += 50;
						pokazWynik();
						displayMap();						
						
					}
					displayPacman();
			}
			
		
		

		
