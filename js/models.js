'use strict'
require('script!./three.js');
require('script!./OBJLoader.js');
require('script!./OBJMTLLoader.js');
require('script!./MTLLoader.js');
//require('script!./threex.spaceships.js');

function models(scene) {

	// instantiate a loader 
	var loader = new THREE.OBJMTLLoader(); 

	loadObjMtl(scene, loader, 'models/SpaceFighter02/SpaceFighter02');
	
}
module.exports = models;




function loadObjMtl(scene, loader, resource){
	// load an obj / mtl resource pair 
	loader.load( 
	// OBJ resource URL 
	resource + '.obj', 
	// MTL resource UR
	resource + '.mtl',
	// Function when both resources are loaded 
	function ( object ) { 
		object.traverse(function(object3d){
			if( object.material ){
				object.material.emissive.set('white')
			}
		})
		scene.add( object ); 
	}, 
	// Function called when downloads progress 
	function ( xhr ) { console.log( (xhr.loaded / xhr.total * 100) + '% loaded' ); }, 
	// Function called when downloads error 
	function ( xhr ) { console.log( 'An error happened' ); } );

}

function loadSpaceFighther02(scene){
THREEx.SpaceShips.loadSpaceFighter02(function(object3d){
    scene.add(object3d);
	});
}

function loadSpaceFighther03(scene){
THREEx.SpaceShips.loadSpaceFighter03(function(object3d){
    scene.add(object3d);
	});
}

function loadShuttle01(scene){
THREEx.SpaceShips.loadShuttle01(function(object3d){
    scene.add(object3d);
	});
}

function loadShuttle02(scene){
THREEx.SpaceShips.loadShuttle02(function(object3d){
    scene.add(object3d);
	});
}
