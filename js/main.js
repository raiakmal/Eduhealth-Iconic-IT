// Search
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');
  const searchIcon = document.getElementById('searchIcon');
  const searchNavigation = document.getElementById('searchNavigation');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');

  let currentIndex = -1;
  let matches = [];

  function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === '') {
      clearHighlights();
      return;
    }

    clearHighlights();
    highlightMatches(searchTerm);
    updateNavigation();
  }

  function clearHighlights() {
    document.body.normalize();
    document.querySelectorAll('.highlight, .current-highlight').forEach(highlight => {
      const parent = highlight.parentNode;
      parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
      parent.normalize();
    });
    matches = [];
    currentIndex = -1;
  }

  function highlightMatches(searchTerm) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    const regex = new RegExp(searchTerm, 'gi');

    while (node = walker.nextNode()) {
      const parent = node.parentNode;
      if (parent.nodeName !== 'SCRIPT' && parent.nodeName !== 'STYLE') {
        let content = node.textContent;
        let match;
        while (match = regex.exec(content)) {
          const range = document.createRange();
          range.setStart(node, match.index);
          range.setEnd(node, match.index + searchTerm.length);
          const highlight = document.createElement('span');
          highlight.className = 'highlight';
          range.surroundContents(highlight);
          matches.push(highlight);
          walker.currentNode = highlight.nextSibling;
        }
      }
    }
  }

  function updateNavigation() {
    if (matches.length > 0) {
      searchNavigation.classList.remove('hidden');
      navigateToClosestMatch();
    } else {
      searchNavigation.classList.add('hidden');
    }
  }

  function navigateToClosestMatch() {
    const viewportTop = window.pageYOffset;
    const viewportBottom = viewportTop + window.innerHeight;
    let closestMatch = null;
    let closestDistance = Infinity;

    matches.forEach((match, index) => {
      const rect = match.getBoundingClientRect();
      const matchMiddle = rect.top + window.pageYOffset + rect.height / 2;
      const distance = Math.abs(matchMiddle - (viewportTop + window.innerHeight / 2));

      if (distance < closestDistance) {
        closestMatch = match;
        closestDistance = distance;
        currentIndex = index;
      }
    });

    if (closestMatch) {
      if (currentIndex !== -1) {
        matches[currentIndex].classList.remove('current-highlight');
        matches[currentIndex].classList.add('highlight');
      }
      closestMatch.classList.remove('highlight');
      closestMatch.classList.add('current-highlight');
      closestMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function navigateToMatch(index) {
    if (currentIndex !== -1) {
      matches[currentIndex].classList.remove('current-highlight');
      matches[currentIndex].classList.add('highlight');
    }
    currentIndex = index;
    const current = matches[currentIndex];
    current.classList.remove('highlight');
    current.classList.add('current-highlight');
    current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  searchIcon.addEventListener('click', performSearch);

  clearSearch.addEventListener('click', () => {
    searchInput.value = '';
    clearSearch.style.display = 'none';
    clearHighlights();
    searchNavigation.classList.add('hidden');
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      navigateToMatch(currentIndex - 1);
    } else {
      navigateToMatch(matches.length - 1);
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < matches.length - 1) {
      navigateToMatch(currentIndex + 1);
    } else {
      navigateToMatch(0);
    }
  });

  searchInput.addEventListener('input', () => {
    clearSearch.style.display = searchInput.value ? 'block' : 'none';
  });
});

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

  // Fungsi Cek Lebar Layar
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

// Definisi Organ
// Fungsi Untuk Memanggil API Wikipedia
async function fetchOrganDescription(organName) {
  const url = `https://id.wikipedia.org/api/rest_v1/page/summary/${organName}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.extract) {
      return data.extract;
    } else {
      return 'Deskripsi organ tidak ditemukan.';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Terjadi kesalahan saat mengambil deskripsi organ.';
  }
}

// Event Listener Untuk Tombol "Cari Sekarang"
document.getElementById('cari-sekarang').addEventListener('click', async function () {
  const selectedOrgan = document.getElementById('nama-organ').value;

  if (selectedOrgan) {
    const description = await fetchOrganDescription(selectedOrgan);
    document.getElementById('deskripsi-penjelasan').textContent = description;

    const imageElement = document.getElementById('gambar-penunjang');
    const imageUrl = `assets/img/definisi/organ/${selectedOrgan}.png`;

    imageElement.src = imageUrl;
    imageElement.classList.remove('hidden');
  } else {
    document.getElementById('deskripsi-penjelasan').textContent = 'Pilih organ untuk melihat penjelasan.';
    const imageElement = document.getElementById('gambar-penunjang');
    imageElement.src = '';
    imageElement.classList.add('hidden');
  }
});

// Menampilak Sistem Organ
document.getElementById('sistem-organ').addEventListener('change', function () {
  const selectedSystem = this.value;
  const organOptions = document.getElementById('nama-organ').options;

  for (let i = 0; i < organOptions.length; i++) {
    const option = organOptions[i];
    if (option.value) {
      if (option.classList.contains(selectedSystem)) {
        option.classList.remove('hidden');
      } else {
        option.classList.add('hidden');
      }
    }
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

// Tambah Lights
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



