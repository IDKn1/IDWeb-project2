const totalFrames = 36; // frames in sprite
const frameDelay = 50; // frame hold in relation to blinkanimation functions
const debug = false;

function blinkAnimation(gridItem) {
	let frame = 1; // start from frame 1 instead of 0

	function updateFrame() {
		if (frame > 1) {
			// don't try to remove class for frame 0
			spriteClassSwap(`sprite-${frame - 1}`, gridItem);
		} else {
			gridItem.classList.add("sprite-1");
		}
		gridItem.classList.add(`sprite-${frame}`);
		console.log(`Added class sprite-${frame} to`, gridItem);
		frame++;
		if (frame <= totalFrames) {
			// include the last frame
			setTimeout(updateFrame, frameDelay);
		}
	}

	updateFrame();
}

function blinkAnimationWithFrameHold(gridItem, holdFrame) {
	let frame = 1; // start from frame 1 instead of 0

	function updateFrame() {
		if (frame > 1) {
			// don't try to remove class for frame 0
			spriteClassSwap(`sprite-${frame - 1}`, gridItem);
		} else {
			gridItem.classList.add("sprite-1");
		}
		gridItem.classList.add(`sprite-${frame}`);
		console.log(`Added class sprite-${frame} to`, gridItem);
		frame++;
		if (frame <= holdFrame) {
			// adjust condition to include the last frame and hold when holdFrame equals frame number
			setTimeout(updateFrame, frameDelay);
		} else {
			console.log(`Hold frame reached for`, gridItem);
		}
	}

	updateFrame();
}

// function to remove sprite classes
function spriteClassSwap(className, target) {
	if (className.startsWith("sprite-")) {
		// check to make sure only removing sprite classes
		target.classList.remove(className);
		console.log(`Removed class ${className} from`, target);
	}
}

// function to clear all sprite classes from all grid items
function clearAllSpriteClasses(item) {
	for (let i = 1; i <= totalFrames; i++) {
		item.classList.remove(`sprite-${i}`);
		item.classList.add("sprite-1");
	}
}
// setting global variables for grid size and center
const gridSize = 5;
const center = 2;

const gridItems = Array.from(document.querySelectorAll(".grid-item"));
// saving the original order of grid items
const standardOrderGridItems = Array.from(gridItems);

// function to calculate distance from center
function getDistance(index) {
	const row = Math.floor(index / gridSize); // find position in row
	const col = index % gridSize; // find position in column
	const centerRow = center;
	const centerCol = center;
	return Math.abs(row - centerRow) + Math.abs(col - centerCol);
}
// sort grid items by distance from center
const sortedGridItems = gridItems.sort((a, b) => {
	const indexA = gridItems.indexOf(a);
	const indexB = gridItems.indexOf(b);
	const distanceA = getDistance(indexA);
	const distanceB = getDistance(indexB);
	return distanceA - distanceB;
});

// animation of grid items in wave pattern
function triggerWaveAnimation(gridItems, callback) {
	let completedAnimations = 0;
	const totalItems = gridItems.length;

	// checks if any animations are still running
	function checkCompletion() {
		completedAnimations++;
		if (completedAnimations === totalItems && callback) {
			// clear sprite classes at the end of the animation step
			setTimeout(() => {
				// clear all sprite classes at the end of the animation step
				gridItems.forEach((gridItem) => clearAllSpriteClasses(gridItem));
				callback();
			}, totalFrames * frameDelay + 800); // make sure all animations are completed before callback
		}
	}

	gridItems.forEach((gridItem, index) => {
		setTimeout(() => {
			blinkAnimation(gridItem);
			checkCompletion();
		}, index * (debug ? 50 : 500)); // wave speed
	});
}

// animation of grid items in reading order (left to right, top to bottom)
function triggerReadingOrderAnimation(gridItems, callback) {
	let completedAnimations = 0;
	const totalItems = gridItems.length;

	// checks if any animations are still running
	function checkCompletion() {
		completedAnimations++;
		if (completedAnimations === totalItems && callback) {
			// clear sprite classes at the end of the animation step
			setTimeout(() => {
				// Clear all sprite classes at the end of the animation step
				gridItems.forEach((gridItem) => clearAllSpriteClasses(gridItem));
				callback();
			}, totalFrames * frameDelay + 800); // make sure all animations are completed before callback
		}
	}

	gridItems.forEach((gridItem, index) => {
		setTimeout(() => {
			blinkAnimation(gridItem);
			checkCompletion();
		}, index * (debug ? 50 : 500)); // wave speed
	});
}

// animation of grid items in reading order (left to right, top to bottom)
function triggerReadingOrderAnimationFrameHold(gridItems, callback) {
	let completedAnimations = 0;
	const totalItems = gridItems.length;

	// checks if any animations are still running
	function checkCompletion() {
		completedAnimations++;
		if (completedAnimations === totalItems && callback) {
			// clear sprite classes at the end of the animation step
			setTimeout(() => {
				// clear all sprite classes at the end of the animation step
				gridItems.forEach((gridItem) => clearAllSpriteClasses(gridItem));
				callback();
			}, totalFrames * frameDelay + 1800); // make sure all animations are completed before callback
		}
	}

	gridItems.forEach((gridItem, index) => {
		setTimeout(() => {
			blinkAnimationWithFrameHold(gridItem, index + 1); // Pass index + 1 as holdFrame
			checkCompletion();
		}, index * (debug ? 50 : 500)); // wave speed
	});
}

document.addEventListener("DOMContentLoaded", () => {
	let animationStep = 0;

	function runNextAnimation() {
		// clear all sprite classes at the start of each animation step
		gridItems.forEach((gridItem) => clearAllSpriteClasses(gridItem));

		switch (animationStep) {
			case 0:
				console.log("Starting wave animation");
				triggerWaveAnimation(sortedGridItems, runNextAnimation);
				break;
			case 1:
				console.log("Wave animation completed");
				console.log("Starting reverse wave animation");
				triggerWaveAnimation(sortedGridItems.reverse(), runNextAnimation);
				break;
			case 2:
				console.log("Wave reverse animation completed");
				console.log("Starting reading order animation");
				triggerReadingOrderAnimation(standardOrderGridItems, runNextAnimation);
				break;
			case 3:
				console.log("Reading order animation completed");
				triggerReadingOrderAnimationFrameHold(
					standardOrderGridItems,
					runNextAnimation
				);
				break;
			case 4:
				console.log("Reading order animation with frame hold completed");
				break;
		}
		animationStep++;
	}

	runNextAnimation();
});
