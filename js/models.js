'use strict'
require('script!./three.js');
require('script!./OBJLoader.js');

function models(scene) {

	loadSpaceFrigate(scene);
}
module.exports = models;

function loadSpaceFrigate(scene){

				var manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {
					console.log( item, loaded, total );
				};
				var texture = new THREE.Texture();
				var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round(percentComplete, 2) + '% downloaded' );
					}
				};
				var onError = function ( xhr ) {
				};
	var loader = new THREE.ImageLoader( manager );
				loader.load( 'models/space_frigate/space_frigate_6_color.png', function ( image ) {
					texture.image = image;
					texture.needsUpdate = true;
				} );

	var loader = new THREE.OBJLoader( manager );
				loader.load( 'models/space_frigate/space_frigate.obj', function ( object ) {
					object.traverse( function ( child ) {
						if ( child instanceof THREE.Mesh ) {
							child.material.map = texture;
						}
					} );
					object.position.y = 20;
					object.position.z = 0;
					scene.add( object );
				}, onProgress, onError);
}
