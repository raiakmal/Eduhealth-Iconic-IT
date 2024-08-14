
// Mobile Navbar
const mobileNav = document.querySelector('.mnav');
const closeBtn = document.querySelector('.mnav__close-btn');
const closeBtnIcn = document.querySelector('.mnav__close-btn-icon');

const navOpenedClass = 'left-0';
const navClosedClass = '-left-[300px]';
const arrowLeftClass = 'ri-arrow-left-s-line';
const arrowRightClass = 'ri-arrow-right-s-line';

document.addEventListener('DOMContentLoaded', () => {
    const mobileNav = document.querySelector('.mnav');
    const closeBtn = document.querySelector('.mnav__close-btn');
    const closeBtnIcn = document.querySelector('.mnav__close-btn-icon');

    const navOpenedClass = 'left-0';
    const navClosedClass = '-left-[300px]';
    const arrowLeftClass = 'ri-arrow-left-s-line';
    const arrowRightClass = 'ri-arrow-right-s-line';

    closeBtn.addEventListener('click', () => {
        if (mobileNav.classList.contains(navClosedClass)) {
            mobileNav.classList.remove(navClosedClass);
            mobileNav.classList.add(navOpenedClass);
        } else {
            mobileNav.classList.remove(navOpenedClass);
            mobileNav.classList.add(navClosedClass);
        }

        // Toggle icon panah
        closeBtnIcn.classList.toggle(arrowLeftClass);
        closeBtnIcn.classList.toggle(arrowRightClass);
    });
});

function updateTime() {
    const timeDisplay = document.getElementById("time");
    const ampmDisplay = document.getElementById("ampm").querySelector('sup');
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



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new THREE.GLTFLoader();
loader.load('./assets/blend/organmanusia.glb', function (gltf) {
    scene.add(gltf.scene);
    camera.position.z = 5;

    const originalRotation = {
        x: gltf.scene.rotation.x,
        y: gltf.scene.rotation.y,
        z: gltf.scene.rotation.z
    };

    let resetTimeout;

    const resetRotation = () => {
        gltf.scene.rotation.x = originalRotation.x;
        gltf.scene.rotation.y = originalRotation.y;
        gltf.scene.rotation.z = originalRotation.z;
    };

    const animate = function () {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();

    const onUserInteraction = () => {
        clearTimeout(resetTimeout);
        resetTimeout = setTimeout(resetRotation, 2000); // Reset after 2 seconds of inactivity
    };

    window.addEventListener('mousedown', onUserInteraction);
    window.addEventListener('touchstart', onUserInteraction);

    // Adding rotation to show some interaction effect
    window.addEventListener('mousemove', (event) => {
        if (event.buttons > 0) {  // Check if mouse button is pressed
            gltf.scene.rotation.y += 0.005 * event.movementX;
            onUserInteraction();
        }
    });

    window.addEventListener('touchmove', (event) => {
        if (event.touches.length === 1) {  // Check if single touch
            gltf.scene.rotation.y += 0.005;
            onUserInteraction();
        }
    });
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
