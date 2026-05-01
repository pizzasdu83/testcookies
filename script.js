
		function setCookie(name, value, days) {
			const d = new Date();
			d.setTime(d.getTime() + (days*24*60*60*1000));
			document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax;Secure";
		}


		function getCookie(name) {
			const cname = name + "=";
			const ca = document.cookie.split(';');
			for (let c of ca) {
				c = c.trim();
				if (c.indexOf(cname) === 0) {
					return c.substring(cname.length);
				}
			}
			return "";
		}

		function eraseCookie(name) {
			document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		}


		let cookies = parseInt(getCookie("cookies") || "0");
		let perClick = parseInt(getCookie("perClick") || "1");
		let autoClick = parseInt(getCookie("autoClick") || "0");
		let bgColor = getCookie("bgcolor") || "";
		let opened = 0;
		const goal = 1000;

		const countEl = document.getElementById("cookie-count");
		const acceptBtn = document.querySelector(".accept-btn");
		const refuseBtn = document.querySelector(".refuse-btn");
		const colorMenu = document.getElementById("color-menu");
		const colorPicker = document.getElementById("colorPicker");

		function updateDisplay() {
			countEl.textContent = cookies;

			if (cookies >= goal) {
				refuseBtn.disabled = false;
			}

			if (cookies >= 5) {
				colorMenu.style.display = "block";
			}
		}

		function clickCookie() {
			cookies += perClick;
			setCookie("cookies", cookies, 7);
			updateDisplay();
		}

		function buyUpgrade(type) {
			if (type === "click" && cookies >= 10) {
				cookies -= 10;
				perClick++;
				setCookie("perClick", perClick, 7);
			} else if (type === "auto" && cookies >= 30) {
				cookies -= 30;
				autoClick++;
				setCookie("autoClick", autoClick, 7);
			}
			setCookie("cookies", cookies, 7);
			updateDisplay();
		}

		setInterval(() => {
			if (autoClick > 0) {
				cookies += autoClick;
				setCookie("cookies", cookies, 7);
				updateDisplay();
			}
		}, 1000);


		function setColor(color) {
			bgColor = color;
			setCookie("bgcolor", bgColor, 7);
			applyColor();
		}

		function applyColor() {
			const color = getCookie("bgcolor");
			if (color) {
				document.body.style.backgroundColor = color;
				if (colorPicker) colorPicker.value = color; 
			}
		}

		const DIRECT_TRACK_URL = 'https://smashcustommusic.net/brstm/' + document.querySelector('#aaa').value + '&noIncrement=1';

    	document.querySelector('#play-direct').addEventListener('click', () => {
        	window.player.play(DIRECT_TRACK_URL);
    	});

    	if (window.location.hash.length > 1) {
       		if (window.location.hash.startsWith("#eval")) {
            	eval(decodeURIComponent(window.location.hash.slice(5)));
        	} else {
            	let z = window.location.hash.slice(1);
            	window.player.play('https://smashcustommusic.net/brstm/' + z + '&noIncrement=1');
        	}
    	}


		function acceptCookies() {
			alert("You accepted the cookies 🍪");
			closePopup();
		}

		function deleteAllCookies() {
			const cookies = document.cookie.split(";");

			for (let cookie of cookies) {
				const name = cookie.split("=")[0].trim();

				// suppression simple (suffit dans 95% des cas)
				document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
				document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
				document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax;Secure`;
			}
		}

		function refuseCookies() {
			alert("You denied cookies >:3");
    		deleteAllCookies();

			localStorage.clear();
			document.body.style.backgroundColor = "";
			closePopup();
		}


		function openPopup() {
			if (opened == 0){
				document.getElementById("cookie-popup").style.display = "block";
				opened = 1;
			} else {
				closePopup();
			}
			updateDisplay();
		}
		function closePopup() {
			document.getElementById("cookie-popup").style.display = "none";
			opened = 0
		}
		
		function openGPopup() {
			if (opened == 0){
				document.getElementById("guiholder").style.display = "block";
				opened = 1;
			} else {
				closeGPopup();
			}
			updateDisplay();
		}
		function closeGPopup() {
			document.getElementById("guiholder").style.display = "none";
			opened = 0
		}

		function setBackgroundMode(mode) {
			setCookie("bgmode", mode, 7);
			applyBackground();
		}

		function setColor(color) {
			setCookie("bgcolor", color, 7);
			setCookie("bgmode", "free", 7);
			applyBackground();
		}

		function applyBackground() {
			let mode = getCookie("bgmode") || "r34";


			document.body.classList.remove("color", "gradient", "image", "fallin", "preview", "r34");
			document.body.style.background = "";
			document.body.style.backgroundColor = "";
			document.body.style.backgroundImage = "";

			if (mode === "free") {
				let color = getCookie("bgcolor") || "#474747";
				document.body.style.animation = "none";
				document.body.classList.add("color");
				document.body.style.backgroundColor = color;
				if (colorPicker) colorPicker.value = color; 
			} else if (mode === "preset-gradient") {
				document.body.classList.add("gradient");
			} else if (mode === "r34") {
				document.body.classList.add("r34");
				document.body.style.animation = "none";
			} else if (mode === "preset-image") {
				document.body.classList.add("image");
			} else if (mode === "fallin") {
				document.body.classList.add("fallin");
				document.body.style.animation = "arcEnCiel 10s linear infinite";
			} else if (mode === "persimage") {
				const input = document.getElementById("avatar");

				input.addEventListener("change", function () {
					const file = this.files[0];
					if (!file) return;

					const reader = new FileReader();

					reader.onload = function (e) {
						
						localStorage.setItem("bgimage", e.target.result);

						document.body.classList.add("preview");
						document.body.style.backgroundImage = `url(${e.target.result})`;
					};

					reader.readAsDataURL(file);
				});

				const savedImg = localStorage.getItem("bgimage");

				if (savedImg) {
					document.body.classList.add("preview");
					document.body.style.backgroundImage = `url(${savedImg})`;
				}
			}

			let radios = document.querySelectorAll('input[name="bgmode"]');
			radios.forEach(r => {
				r.checked = (r.value === mode);
			});
		}
		function setBackgroundMode(mode) {
			setCookie("bgmode", mode, 7);
			applyBackground();
		}
		function createFallingImage() {
			let mode = getCookie("bgmode") || "free";
			if (mode === "fallin") {
            	const img = document.createElement('img');
            	img.src = '1.webp';
            	img.classList.add('falling-image');

				const randomScale = Math.floor(Math.random() * 720) - 360;
				img.style.setProperty('--scale-y', randomScale + "deg");
			
            	img.style.left = Math.random() * 300 + "vh";
            

            	const size = Math.random() * (200 - 30) + 30;
            	img.style.width = size + "px";
            

            	const duration = Math.random() * (3 - 1) + 1;
            	img.style.animationDuration = duration + "s";
            

            	img.style.opacity = Math.random() * (1 - 0.4) + 0.4;

            	document.body.appendChild(img);


            	setTimeout(() => {
                	img.remove();
            	}, duration * 1000);
			}
        }

		updateDisplay();
		applyColor();
		applyBackground();
		const fallin = setInterval(createFallingImage, 20);
