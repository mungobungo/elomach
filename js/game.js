// scene object variables
var renderer, scene, camera;

var geometry, mesh;


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
	var WIDTH = window.innerWidth,
	  HEIGHT = window.innerHeight;

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
	camera.position.z = 400;
	camera.position.y = 400;
	camera.position.x = -45 * Math.PI/180;
	
	scene = new THREE.Scene();

	scene.add(camera);
	geometry = new THREE.IcosahedronGeometry(200,1);

	var image = THREE.ImageUtils.loadTexture('textures/strange.jpg');
	//material = new THREE.MeshBasicMaterial({map:image} );

	//mesh = new THREE.Mesh(geometry, material);
	//scene.add(mesh);

	
	
	
	renderer.setSize(WIDTH, HEIGHT);

	
	c.appendChild(renderer.domElement);

	var geo = new THREE.BoxGeometry(1,1,1);
	geo.applyMatrix(new THREE.Matrix4().makeTranslation(0,0.5,0));
	var material = new THREE.MeshBasicMaterial({map:image});
	
	_.range(0,300).forEach(function(index){
		generateBuilding(index, geo, material, scene);
	});

}

function generateBuilding(index, geo, material, scene){
	var floor = Math.floor;
	var rnd = Math.random;
	var building = new THREE.Mesh(geo.clone(), material.clone());
	var pos = building.position;
	var scale = building.scale;
	
	pos.x = floor(rnd()*200 - 100) * 4;
	pos.y = floor(rnd()*200 - 100) * 4;
	scale.x = rnd()*50 +10;
	scale.y = rnd()*scale.x*8 + 8;
	scale.z = scale.x;
	scene.add(building);

}

function draw()
{	
	requestAnimationFrame(draw);

	

	renderer.render(scene, camera);
	
	
	

}

