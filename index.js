const imagesFolder = '/assets/images/';
const numberOfImagesDesktop = 32;
const numberOfImagesPhone = 32;
const intervals = [750];

const works = [
  { src: '/assets/covers/1.jpg', label: 'Twenty&Twenty' },
  { src: '/assets/covers/2.jpg', label: 'Solvita' },
  { src: '/assets/covers/3.jpg', label: 'Picarius' },
  { src: '/assets/covers/4.jpg', label: 'Scherer Architekten' },
  { src: '/assets/covers/5.jpg', label: 'Delenty' },
  { src: '/assets/covers/6.jpg', label: 'Hummal' },
  { src: '/assets/covers/7.jpg', label: 'Ricardo Skinner Gallery' },
  { src: '/assets/covers/8.jpg', label: 'designdots' },
  { src: '/assets/covers/9.jpg', label: 'Idukki' },
  { src: '/assets/covers/10.jpg', label: 'Jennet' },
  { src: '/assets/covers/11.jpg', label: 'Daisen' },
  { src: '/assets/covers/12.jpg', label: 'Avacus' },
  { src: '/assets/covers/13.jpg', label: 'Monto' },
  { src: '/assets/covers/14.jpg', label: 'Daeidilan' },
  { src: '/assets/covers/15.jpg', label: 'Salvatierra' },
  { src: '/assets/covers/16.jpg', label: 'Society for artistic support' },
  // Add more works as needed
];

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
      <img src="${work.src}" alt="${work.label}" class="w-full h-auto object-cover" />
      <div class="text-sm sm:text-lg font-medium mt-4 sm:mt-6 md:mt-8">${work.label}</div>
    `;
    worksContainer.appendChild(workItem);
  });
};

window.onload = () => {
	preloadImages();
	rollBackgrounds();
	loadWorks();
};

