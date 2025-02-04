const audio = document.getElementById("audio") as HTMLAudioElement;

const buttonContainer = document.getElementById(
	"buttonContainer"
) as HTMLElement;
const yesButton = document.getElementById("yesButton") as HTMLElement;
const landing = document.getElementById("landing") as HTMLElement;
const piplup = document.getElementById("piplup") as HTMLImageElement;
const piplupSubText = document.getElementById("piplupSubText") as HTMLElement;
const secondLanding = document.getElementById("secondLanding") as HTMLElement;
const gifSection = document.getElementById("gifSection") as HTMLElement;
const dateSection = document.getElementById("dateSection") as HTMLInputElement;
const datePicker = document.getElementById("datepicker") as HTMLInputElement;
const dateSelected = document.getElementById(
	"dateSelected"
) as HTMLButtonElement;
const foodOption = document.getElementById("foodOption") as HTMLElement;
const h2Elements = document.querySelectorAll(".clickable");
const activityOption = document.getElementById("activityOption") as HTMLElement;
const h2ElementsActivity = document.querySelectorAll(".clickableActivity");
const ending = document.getElementById("ending") as HTMLElement;

secondLanding.style.display = "none";
gifSection.style.display = "none";
dateSection.style.display = "none";

yesButton.addEventListener("click", () => {
	console.log("Yes clicked!");
	buttonContainer.classList.add("fadeOut");
	landing.classList.add("fadeOut");
	piplup.classList.add("fadeOut");
	piplupSubText.classList.add("fadeOut");

	setTimeout(() => {
		buttonContainer.style.display = "none";
		landing.style.display = "none";
		piplup.style.display = "none";
		piplupSubText.style.display = "none";
		gifSection.style.display = "block";
		secondLanding.style.display = "block";
	}, 900);

	gifSection.classList.add("fadeIn");
	secondLanding.classList.add("fadeIn");

	setTimeout(() => {
		gifSection.click();
	}, 6000);
});

piplup.addEventListener("click", () => {
	audio.play().catch((error) => {
		console.error("Audio error", error);
	});
});

function jump() {
	piplup.style.transform = "translateY(-0.5rem)";
	setTimeout(() => {
		piplup.style.transform = "translateY(0)";
	}, 200);
}

setInterval(jump, 500);

gifSection.addEventListener("click", () => {
	gifSection.classList.remove("fadeIn");
	secondLanding.classList.remove("fadeIn");

	gifSection.classList.add("fadeOut");
	secondLanding.classList.add("fadeOut");

	setTimeout(() => {
		gifSection.style.display = "none";
		secondLanding.style.display = "none";
		dateSection.style.display = "block";
	}, 900);

	dateSection.classList.add("fadeIn");
});

dateSelected.addEventListener("click", () => {
	console.log(datePicker.value);
	if (datePicker.value === "") {
	} else {
		localStorage.setItem("date", datePicker.value);
		dateSection.classList.remove("fadeIn");
		dateSection.classList.add("fadeOut");

		setTimeout(() => {
			dateSection.style.display = "none";
			foodOption.style.display = "block";
		}, 900);

		foodOption.classList.add("fadeIn");
	}
});

h2Elements.forEach((h2) => {
	h2.addEventListener("click", () => {
		const foodClicked = h2.textContent || "";

		localStorage.setItem("food", foodClicked);

		console.log(`Saved "${foodClicked}" to local storage`);

		foodOption.classList.remove("fadeIn");
		foodOption.classList.add("fadeOut");

		setTimeout(() => {
			foodOption.style.display = "none";
			activityOption.style.display = "block";
		}, 900);

		activityOption.classList.add("fadeIn");
	});
});

h2ElementsActivity.forEach((h2) => {
	h2.addEventListener("click", () => {
		const activityClicked = h2.textContent || "";

		localStorage.setItem("activity", activityClicked);

		console.log(`Saved "${activityClicked}" to local storage`);

		activityOption.classList.remove("fadeIn");
		activityOption;

		setTimeout(() => {
			activityOption.style.display = "none";
			ending.style.display = "block";
		}, 900);

		ending.classList.add("fadeIn");

		const date = localStorage.getItem("date");
		const food = localStorage.getItem("food");
		const activity = localStorage.getItem("activity");

		fetch("https://api.brevo.com/v3/smtp/email", {
			method: "POST",
			headers: {
				"Content-Type": "applicatiofoodon",
				"api-key": "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",
			},
			body: JSON.stringify({
				sender: {
					name: "Your Name",
					email: "memedaddymikey@gmail.com",
				},
				to: [
					{
						email: "memedaddymikey@gmail.com",
						name: "Recipient",
					},
				],
				subject: "Hello from Brevo",
				textContent:
					"date" +
					date +
					"   food" +
					food +
					"    activity" +
					activity,
			}),
		})
			.then((response) => response.json())
			.then((data) => console.log("Email sent!", data))
			.catch((error) =>
				console.error("Error sending email", error)
			);
	});
});
