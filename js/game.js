'use strict';

var domready = require('domready');

require('script!./three.js');



require('script!./FirstPersonControls.js');

require('script!./skymap/threex.skymap.js');
require('script!./skymap/threex.texturecube.js');
require('script!./skymap/threex.cubetexturehcross.js');

var _ = require('underscore');

var light = require('./light.js');
var models = require('./models.js');
var winResize = require('./windowResize');

domready(function(){
	setup();
});

var renderer, scene, camera;

var controls, clock;


function setup()
{
	
	
	// set up all the 3D objects in the scene	
	createScene();
	clock = new THREE.Clock();
	controls = new THREE.FirstPersonControls(camera);
	controls.movementSpeed = 100;
	controls.lookSpeed = 0.01;
	
	draw();
}

function createScene()
{
	// set the scene size
	var WIDTH = window.innerWidth*0.98,
	  HEIGHT = window.innerHeight*0.98;

	// set some camera attributes
	var VIEW_ANGLE = 75,
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 1,
	  FAR = 10000;

	var c = document.getElementById('gameCanvas');

	// create a WebGL renderer, camera
	// and a scene
	renderer = new THREE.WebGLRenderer({antialias: true});
	camera =
	  new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);
	camera.position.z = 0;
	camera.position.y = 50;
	camera.position.x = -80;
	camera.rotation.x = -30 * Math.PI/180;
	
	var wr = new winResize(renderer, camera)
	
	scene = new THREE.Scene();

	scene.add(camera);
	

	// var strangeTexture = THREE.ImageUtils.loadTexture('textures/strange.jpg');
	// var strangeMaterial = new THREE.MeshBasicMaterial({map:strangeTexture});
	
	// var spotsTexture = THREE.ImageUtils.loadTexture('textures/spots.jpg');
	// var spotsMaterial = new THREE.MeshBasicMaterial({map:spotsTexture});

	// var blueTexture = THREE.ImageUtils.loadTexture('textures/blue.jpg');
	// var blueMaterial = new THREE.MeshBasicMaterial({map:blueTexture});

	// var watercolorTexture = THREE.ImageUtils.loadTexture('textures/watercolor.jpg');
	// var watercolorMaterial = new THREE.MeshBasicMaterial({map:watercolorTexture});
	// //material = new THREE.MeshBasicMaterial({map:image} );

	//mesh = new THREE.Mesh(geometry, material);
	//scene.add(mesh);

	
	
	
	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMapEnabled = true;
	
	c.appendChild(renderer.domElement);

	
	
//	var materials = [strangeMaterial, spotsMaterial, blueMaterial, watercolorMaterial];
	//var materials = [blueMaterial];
	// materials.forEach(function(material){
	// 	var city = generateCity(100, material);
	// 	city.castShadow = true;
	// 	city.receiveShadow = true;
	// 	//scene.add(city);	
	// });
	
	//generateFloor();



	// "bridge2", "escher", "park2", "park3med", "pisa", "skybox", "swedishroyalcastle", "mars"
	var mesh    = THREEx.createSkymap('skybox')
	scene.add( mesh )
	light(scene);
	models(scene);
	//scene.fog = new THREE.FogExp2(0x99bbbb, 0.0005);

}




function generateFloor(){
	var geo = new THREE.PlaneGeometry(200,200,20,20);
	var mat = new THREE.MeshBasicMaterial({color:0xbbcdd});
	var floor = new THREE.Mesh(geo, mat);
	floor.rotation.x = -90 * Math.PI / 180;
	floor.receiveShadow = true;
	scene.add(floor);
	

}
function generateCity(buildingCount, material){

	var geo = new THREE.BoxGeometry(1,1,1);
	geo.applyMatrix(new THREE.Matrix4().makeTranslation(0,0.5,0));
	var cityGeometry = new THREE.Geometry();
	
	_.range(0,buildingCount).forEach(function(index){
		
		var building = generateBuilding(geo);
		THREE.GeometryUtils.merge(cityGeometry, building);
	});
	
	return new THREE.Mesh(cityGeometry, material);
	
}

function generateBuilding(geo){
	
	var building = new THREE.Mesh(geo.clone());
	
	building.position.x = Math.floor((Math.random()*400 -200) * 4);
	//building.position.y = Math.floor((Math.random()*200 -100) * 4);
	building.position.z = Math.floor((Math.random()*400 -200) * 4);
	building.scale.x = Math.random()*50 +10;
	building.scale.y = Math.random()*building.scale.x*8 + 8;
	building.scale.z = building.scale.x;
	return building;

}

function draw()
{	

	renderer.render(scene, camera);
	controls.update(clock.getDelta());
	requestAnimationFrame(draw);
}

