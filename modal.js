const modal = document.getElementById("modal");
const openButton = document.getElementById("openButton");
const closeButton = document.getElementById("closeButton");

openButton.onclick = function () {
	modal.style.display = "block";
	openButton.style.display = "none";
};

// Close the modal if the user clicks outside of the modal content
window.onclick = function (event) {
	if (event.target === modal) {
		modal.style.display = "none";
		openButton.style.display = "block";
	}
};

// Close the modal when the close button is clicked make button visable again
closeButton.onclick = function () {
	modal.style.display = "none";
	openButton.style.display = "block";
};
