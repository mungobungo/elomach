'use strict'
var THREE = require('./three.js');

function light(scene) {


		var directed = new THREE.DirectionalLight(0xee44bb, 1);
		directed.castShadow = true;
		directed.shadowDarkness = 0.5;
		directed.shadowMapWidth = 2048;
		directed.shadowMapHeight = 2048;
		directed.position.set(500,1500,1000);
		directed.shadowCameraLeft = -2000;
		directed.shadowCameraRight = 2000;
		directed.shadowCameraTop = 2000;
		directed.shadowCameraBottom = -2000;
		scene.add(directed);	

		//var ambient = new THREE.AmbientLight( 0x101030 );
		//scene.add( ambient );
	}
module.exports = light;

