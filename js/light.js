'use strict'
var THREE = require('./three.js');

function light(scene) {


	var ambient = new THREE.AmbientLight( 0x444444 );
				scene.add( ambient );

	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 0, 0, 1 ).normalize();
	scene.add( directionalLight );
}
module.exports = light;

