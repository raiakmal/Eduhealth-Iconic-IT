// Navbar
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navbarDefaultClass = 'navbar-default';
    const navbarFixedClass = 'navbar-fixed';
    const mobileNav = document.querySelector('.mnav');
    const closeBtn = document.querySelector('.mnav__close-btn');
    const closeBtnIcn = document.querySelector('.mnav__close-btn-icon');
    const navOpenedClass = 'left-0';
    const navClosedClass = '-left-[300px]';
    const arrowLeftClass = 'ri-arrow-left-s-line';
    const arrowRightClass = 'ri-arrow-right-s-line';

    // Fix Navbar
    window.addEventListener('scroll', () => {
        if (isDesktop()) {
            if (window.scrollY > 50) {
                navbar.classList.remove(navbarDefaultClass);
                navbar.classList.add(navbarFixedClass);
            } else {
                navbar.classList.remove(navbarFixedClass);
                navbar.classList.add(navbarDefaultClass);
            }
        } else {
            navbar.classList.remove(navbarFixedClass);
            navbar.classList.add(navbarDefaultClass);
        }
    });

    // Fungsi cek lebar layar
    function isDesktop() {
        return window.innerWidth > 767;
    }

  // Mobile Navbar
  closeBtn.addEventListener('click', () => {
    if (mobileNav.classList.contains(navClosedClass)) {
      mobileNav.classList.remove(navClosedClass);
      mobileNav.classList.add(navOpenedClass);
    } else {
      mobileNav.classList.remove(navOpenedClass);
      mobileNav.classList.add(navClosedClass);
    }

    closeBtnIcn.classList.toggle(arrowLeftClass);
    closeBtnIcn.classList.toggle(arrowRightClass);
  });
});


// Serach
let currentIndex = -1;
let searchResults = [];

function searchAndHighlight() {
    // Reset highlights
    resetHighlights();
    
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput.trim() === "") return;

  const content = document.querySelector('body');
  const regex = new RegExp(searchInput, 'gi');

  // Traverse all child nodes and highlight text nodes
  traverseAndHighlight(content, regex);

  searchResults = document.querySelectorAll('.highlight');
  currentIndex = -1;

    if (searchResults.length > 0) {
        navigateResults(1); // Automatically navigate to the first result
    }
}

function traverseAndHighlight(node, regex) {
  if (node.nodeType === 3) {
    // Text node
    const text = node.textContent;
    const newHTML = text.replace(regex, function (matched) {
      return `<span class="highlight">${matched}</span>`;
    });
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newHTML;
    while (tempDiv.firstChild) {
      node.parentNode.insertBefore(tempDiv.firstChild, node);
    }
    node.parentNode.removeChild(node);
  } else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
    // Element node
    for (let i = 0; i < node.childNodes.length; i++) {
      traverseAndHighlight(node.childNodes[i], regex);
    }
  }
}

function navigateResults(direction) {
  if (searchResults.length === 0) return;

  // Remove the current highlight class
  if (currentIndex !== -1) {
    searchResults[currentIndex].classList.remove('current-highlight');
  }

  // Update index based on direction
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = searchResults.length - 1;
  } else if (currentIndex >= searchResults.length) {
    currentIndex = 0;
  }

  // Scroll to the new current highlight and apply the current-highlight class
  const currentResult = searchResults[currentIndex];
  currentResult.classList.add('current-highlight');
  currentResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function resetHighlights() {
    const highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(element => {
        element.outerHTML = element.innerText; // Replace the highlighted span with just text
    });

    searchResults = [];
    currentIndex = -1;
}

// Jam
function updateTime() {
  const timeDisplay = document.getElementById('time');
  const ampmDisplay = document.getElementById('ampm').querySelector('sup');
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const isAm = hours < 12 || hours === 24;
  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const timeString = `${formattedHours}.${formattedMinutes}`;
  const ampmString = isAm ? 'AM' : 'PM';
  timeDisplay.textContent = timeString;
  ampmDisplay.textContent = ampmString;
}

setInterval(updateTime, 1000);
updateTime();

// Toggle Dark Mode
const themeToggleButton = document.getElementById('theme-toggle-button');
const themeMenu = document.getElementById('theme-menu');

themeToggleButton.addEventListener('click', () => {
  themeMenu.classList.toggle('hidden');
});

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    themeToggleButton.innerHTML = '<i class="ri-moon-line"></i>';
  } else if (theme === 'light') {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    themeToggleButton.innerHTML = '<i class="ri-sun-line"></i>';
  } else {
    localStorage.removeItem('theme');
    themeToggleButton.innerHTML = '<i class="ri-computer-line"></i>';
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

const userTheme = localStorage.getItem('theme');
if (userTheme) {
  setTheme(userTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setTheme('dark');
} else {
  setTheme('light');
}

document.getElementById('light-mode').addEventListener('click', () => {
  setTheme('light');
  themeMenu.classList.add('hidden');
});

document.getElementById('dark-mode').addEventListener('click', () => {
  setTheme('dark');
  themeMenu.classList.add('hidden');
});

document.getElementById('system-mode').addEventListener('click', () => {
  setTheme('system');
  themeMenu.classList.add('hidden');
});

document.addEventListener('click', (e) => {
  if (!themeToggleButton.contains(e.target) && !themeMenu.contains(e.target)) {
    themeMenu.classList.add('hidden');
  }
});

// 3D Model
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Tambah OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 5);

// Tambah lights
const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Memuat 3D Model
const loader = new THREE.GLTFLoader();
loader.load('./assets/blend/organmanusia.glb', function (gltf) {
  scene.add(gltf.scene);

  originalRotation = gltf.scene.rotation.clone();
  mixer = new THREE.AnimationMixer(gltf.scene);

  if (gltf.animations && gltf.animations.length) {
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();

    mixer.timeScale = 2;
  }

  const clock = new THREE.Clock();

  // Loop Animasi
  const animate = function () {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    renderer.render(scene, camera);
  };
  animate();
});

let resetTimeout;

// Reset Posisi Kamera
function resetRotationAndCamera() {
  if (resetTimeout) {
    clearTimeout(resetTimeout);
  }

  resetTimeout = setTimeout(() => {
    gsap.to(gltf.scene.rotation, {
      x: originalRotation.x,
      y: originalRotation.y,
      z: originalRotation.z,
      duration: 0.1,
      ease: 'power2.out',
    });

    gsap.to(camera.position, {
      x: 0,
      y: 0,
      z: 5,
      duration: 0.11,
      ease: 'power2.out',
      onUpdate: function () {
        camera.lookAt(scene.position);
      },
    });

    controls.update();
  }, 500);
}

controls.addEventListener('change', resetRotationAndCamera);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// Map
function initMap() {
  var location = { lat: -6.200000, lng: 106.816666 };
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: location
  });
  var marker = new google.maps.Marker({
      position: location,
      map: map
  });
}
