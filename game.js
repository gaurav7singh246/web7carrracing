// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const splashScreen = document.getElementById("splashScreen");
        if (splashScreen) splashScreen.style.display = "none";
    }, 1000);

    initGame();
});

function initGame() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas"), antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    
    const world = new CANNON.World();
    world.gravity.set(0, -9.8, 0);

    const trackGeometry = new THREE.PlaneGeometry(100, 100);
    const trackMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const track = new THREE.Mesh(trackGeometry, trackMaterial);
    track.rotation.x = -Math.PI / 2;
    scene.add(track);

    const carLoader = new THREE.GLTFLoader();
    let car;
    carLoader.load('assets/models/car.glb', (gltf) => {
        car = gltf.scene;
        car.scale.set(0.5, 0.5, 0.5);
        car.position.set(0, 0.5, 0);
        scene.add(car);
    });

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}