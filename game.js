
			
			var map = [ 
								[2,2,2,2,2,2,2,2,2,2,2,2,2], 
								[2,1,1,1,1,1,2,1,1,1,1,3,2], 
								[2,2,2,2,2,1,2,1,2,2,2,1,2], 
								[2,1,1,1,1,1,1,1,1,1,2,1,2], 
								[2,1,2,1,2,2,3,2,2,1,1,1,2], 
								[2,1,2,1,1,1,1,1,1,1,2,1,2], 
								[2,1,2,2,1,2,2,1,2,2,2,1,2], 
								[2,1,1,1,1,1,2,1,1,1,1,1,2], 
								[2,2,2,2,2,2,2,2,2,2,2,2,2]
								]
			
			var pacman={x:1,y:1};// ustawienie pozycji pacmana
			var ghost1 = {x:11,y:6};			
			var punkty = 0;
			var a = null;
			
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
						/* if(map[i][j] == 4)			//wstawianie duszka
							output += "<div class='ghost1'></div>";	 */						
					}// przypisanie divow do zmiennej
					output += "\n</div>";
				}/* document.getElementById('world').innerHTML = output; // aktualizacja wygladu mapy */
				$('#world').html(output);
			} 
			
			function displayPacman()
			{ // creates our pacman function
				document.getElementById('pacman').style.top = pacman.y*50+"px";// ustawienie pacmana w pozycji w pionie (y)*wymiar diva				
				document.getElementById('pacman').style.left = pacman.x*50+"px"; // ustawienie pacmana w pozycji w poziomie (x)*wymiar diva
			}
			
			function turnPacman(a)
			{				
				document.getElementById('pacman').style.transform = a;
			}
			
			function koniecGry()
			{
				if ((pacman.y == ghost1.y) && (pacman.x == ghost1.x))
				{						
					punkty = 0;
					document.getElementById('pacman').style.display = "none";
					document.onkeydown = null;
					$('#gameover').fadeIn();
					/* alert('ODSWIEZ I ZAGRAJ PONOWNIE'); */
				}	
				if(punkty===600)
					{
					document.onkeydown = null;	
					clearInterval(intervalId);					
					$('#wingame').fadeIn();
					}
			}			
			
			function displayGhost()
			{
				document.getElementById('ghost1').style.top = ghost1.y*50+"px";
				document.getElementById('ghost1').style.left = ghost1.x*50+"px";				
			}
			
			function pokazWynik()
			{ 
				document.getElementById('wynik').innerHTML = punkty; // punktacja
			}			
			
			/* displayMap(); 
			displayPacman();
			displayGhost();
			pokazWynik(); */

			
			document.onkeydown = function(e)
			{ // sterowanie ruchem
				if(e.keyCode == 37 && map[pacman.y][pacman.x-1] != 2) //wykonaj jezeli wcisniecie lewej strzalki nie wskaze na sciane
					{ // when left arrow key is pressed
						pacman.x--; 																			// zmniejsz wspolrzedna x pacmana
						/* bez funkcji - > document.getElementById('pacman').style.transform = "rotate(-180deg)"; */ // zmiana stylu o obrot
						turnPacman("rotate(-180deg)");
					}
				else if(e.keyCode == 39 && map[pacman.y][pacman.x+1] != 2) //wykonaj jezeli wcisniecie prawejj strzalki nie wskaze na sciane
					{ 
						pacman.x++; 																					// zwieksz wspolrzedna x pacmana
						turnPacman("rotate(0deg)"); 
					}
				if(e.keyCode == 40 && map[pacman.y+1][pacman.x] != 2)
					{ 
						pacman.y++; 
						turnPacman("rotate(90deg)"); 
					} 
				else if(e.keyCode == 38 && map[pacman.y-1][pacman.x] != 2)
					{ 
						pacman.y--; 
						turnPacman("rotate(-90deg)"); 
					}
				
				if(map[pacman.y][pacman.x] == 1)  //jezeli wspolrzedna pacmana wskazuje na miejsce z moneta  to ustaw puste i dodaj punkty
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
						pokazWynik();
						displayMap();
						koniecGry();
					
				displayPacman();
			}
						
			function losujKierunek()
			{
				var random = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
				return random;
			}
			
			var obecnyKierunek = 1;
			
			function ghostMove()
			{
					var nowyKierunek = losujKierunek();	
											//Left Right New Direction
				if(												
					((obecnyKierunek == 1 || obecnyKierunek == 2) && //If it's going right or left	and up or down is available
					(map[ghost1.y+1][ghost1.x]!==2 || //dostepny kierunek w dol
					map[ghost1.y-1][ghost1.x]!==2 ||//dostepny kierunek w gora
					map[ghost1.y][ghost1.x-1]!==2 ||//dostepny kierunek w lewo - bo zacina sie po dojscia do konca
					map[ghost1.y][ghost1.x+1]!==2 ))//dostepny kierunek w prawo
					|| 																					
					((obecnyKierunek == 3 || obecnyKierunek == 4) && //Or if it's going up or down and left or right is available
					(map[ghost1.y][ghost1.x+1]!==2 || 		
					map[ghost1.y][ghost1.x-1]!==2 ))
				   )
				{					
					while(nowyKierunek == obecnyKierunek)		//Check to make sure it won't change direction to it's current direction
					{
						nowyKierunek = losujKierunek();
					}					
					obecnyKierunek = nowyKierunek;					//Change direction to a new direction
				}
		
				if(obecnyKierunek ==  1 && 
					(map[ghost1.y][ghost1.x-1]!==2))
					{
						ghost1.x --;													//        console.log("move left")
					}
				else if(obecnyKierunek == 2 && 
					(map[ghost1.y][ghost1.x+1]!==2))
					{			
						ghost1.x ++;													//        console.log("move right")
					}
				else if(obecnyKierunek == 3 && 
					(map[ghost1.y-1][ghost1.x]!==2))
					{			
						ghost1.y --;														//        console.log("move up")
					}
				else if(obecnyKierunek == 4 && 
					(map[ghost1.y+1][ghost1.x]!==2))
					{			
						ghost1.y ++;													//        console.log("move down")
					}
				displayGhost();
				koniecGry();
			}			
						
				var intervalId=setInterval(ghostMove, 250)
			
			$(document).ready(function(){displayMap();
															   displayPacman();
															   displayGhost();
															   pokazWynik();
															   koniecGry();
															   })	
		

		


		
