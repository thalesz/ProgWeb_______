var container = document.getElementById("container");
		var dots = [];
		var dotIndex = 0;

		container.addEventListener("mousemove", function(event) {
			if (dotIndex === 8) {
				dotIndex = 0;
			}

			var dot = dots[dotIndex];
			if (!dot) {
				dot = document.createElement("div");
				dot.className = "dot";
				container.appendChild(dot);
				dots.push(dot);
			}

			dot.style.left = (event.clientX - 10) + "px";
			dot.style.top = (event.clientY - 10) + "px";
			dotIndex++;
		});