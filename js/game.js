// scene object variables
var renderer, scene, camera;

var geometry, material, mesh;


// field variables
var fieldWidth = 400, fieldHeight = 200;


function setup()
{
	
	
	// set up all the 3D objects in the scene	
	createScene();
	
	// and let's get cracking!
	draw();
}

function createScene()
{
	// set the scene size
	var WIDTH = 640,
	  HEIGHT = 360;

	// set some camera attributes
	var VIEW_ANGLE = 75,
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 1,
	  FAR = 1000;

	var c = document.getElementById("gameCanvas");

	// create a WebGL renderer, camera
	// and a scene
	renderer = new THREE.WebGLRenderer();
	camera =
	  new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);
	camera.position.z = 500;
	
	scene = new THREE.Scene();

	scene.add(camera);
	geometry = new THREE.IcosahedronGeometry(200,1);
	material = new THREE.MeshBasicMaterial({color:0x88BB77,
		wireframe: true, wireframeLinewidth: 2	} );

	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	
	
	
	renderer.setSize(WIDTH, HEIGHT);

	
	c.appendChild(renderer.domElement);

	
}

function draw()
{	
	requestAnimationFrame(draw);

	mesh.rotation.x = Date.now() * 0.00005;
	mesh.rotation.y = Date.now() * 0.0001;	

	renderer.render(scene, camera);
	
	
	

}

