function handleFileSelect(event) {
	const file = event.target.files[0];
	const maxSize = 1000 * 1024;

	if (file && (file.size <= maxSize) & file.type.startsWith("image/")) {
		displayAvatar(file);
	}
}

function handleDrop(event) {
	event.preventDefault();

	const file = event.dataTransfer.files[0];
	if (file && file.type.startsWith("image/")) displayAvatar(file);
}

function allowDrop(event) {
	event.preventDefault();
}

function displayAvatar(file) {
	const uploadedPhotoTag = document.getElementById("uploaded-photo");

	const reader = new FileReader();
	reader.onload = (data) => {
		uploadedPhotoTag.src = data.target.result;
		localStorage.setItem("avatar", data.target.result);
	};

	reader.readAsDataURL(file);
}

const ticketForm = document.getElementById("ticket-form");
ticketForm.addEventListener("submit", () => {
	const nameBtn = document.getElementById("full-name");
	const emailBtn = document.getElementById("email-btn");
	const emailSection = document.querySelector("section.email");
	const githubBtn = document.getElementById("github-username");
	const githubUsernameTag = document.getElementById("github-user");
	const userNameTag = document.getElementById("user-name");
	const userAvatarTag = document.getElementById("user-avatar");
	const userEmailTag = document.getElementById("user-email");
	const userFullnameTag = document.getElementById("user-fullname");
	const formPage = document.getElementById("form-page");
	const ticketPage = document.getElementById("ticket-page");

	if (!emailBtn.value.includes("@") || !emailBtn.value.includes(".")) {
		emailSection.classList.add("error");
		return;
	}

	// Switch pages
	emailSection.classList.remove("error");
	formPage.style.display = "none";
	ticketPage.style.display = "unset";

	// set ticket data
	const names = nameBtn.value.split(" ");
	userFullnameTag.innerHTML = "";

	names.forEach((name) => {
		userFullnameTag.innerHTML += `&nbsp;<span class="user-name">${name}</span>`;
	});
	userFullnameTag.innerHTML += "!";

	userEmailTag.innerText = emailBtn.value;
	userNameTag.innerText = nameBtn.value;
	githubUsernameTag.innerText = githubBtn.value;

	if (localStorage.getItem("avatar"))
		userAvatarTag.src = localStorage.getItem("avatar");
	localStorage.removeItem("avatar");
});
