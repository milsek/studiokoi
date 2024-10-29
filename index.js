import { works } from "./works.js";

const imagesFolder = '/assets/images/';
const numberOfImagesDesktop = 32;
const numberOfImagesPhone = 32;
const intervals = [750];

const isPhoneBrowser = () => /Mobi|Android/i.test(navigator.userAgent);

let preloadedImages = [];
const preloadImages = () => {
	const totalImages = isPhoneBrowser() ? numberOfImagesPhone : numberOfImagesDesktop;
	for (let i = 0; i < totalImages; i++) {
		const img = new Image();
		img.src = `${imagesFolder}${i}${isPhoneBrowser() ? 'm' : ''}.jpg`;
		preloadedImages.push(img);
	}
};

const rollBackgrounds = () => {
	let counter = 0;
	let lastTimestamp = performance.now();

	const cycleImages = (timestamp) => {
		const interval = intervals[counter % intervals.length];
		if (timestamp - lastTimestamp >= interval) {
			document.getElementById('bg-roller').style.backgroundImage = `url(${preloadedImages[counter % preloadedImages.length].src})`;
			lastTimestamp = timestamp;
			counter++;
		}
		requestAnimationFrame(cycleImages);
	}

	requestAnimationFrame(cycleImages);
};

const loadWorks = () => {
  const worksContainer = document.getElementById('works');
  worksContainer.innerHTML = '';

  works.forEach(work => {
    const workItem = document.createElement('div');
    workItem.innerHTML = `
      <a href="/works/${work.url}">
        <img src="${work.src + 'thumbnail.jpg'}" alt="${work.label}" class="w-full h-auto object-cover" />
        <div class="text-sm sm:text-lg font-medium mt-4 sm:mt-6 md:mt-8">${work.label}</div>
      </a>
    `;
    worksContainer.appendChild(workItem);
  });
};

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const workId = urlParams.get('id');

  if (!workId) {
    preloadImages();
    rollBackgrounds();
    loadWorks();
  }
};

