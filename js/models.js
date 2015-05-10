'use strict'
require('script!./three.js');
require('script!./OBJLoader.js');
require('script!./OBJMTLLoader.js');
require('script!./MTLLoader.js');
//var bacon = require('baconjs');
var rx = require('rx');

function models(scene) {

	// instantiate a loader 
	var loader = new THREE.OBJMTLLoader(); 

	var res1 = loadObjMtl(scene, loader, 'models/Shuttle01/Shuttle01');
	var res2 = loadObjMtl(scene, loader, 'models/Shuttle02/Shuttle02');
	
	var subscription = rx.Observable.merge(res1, res2).subscribe(
  		function (x) { 
  			console.log('onNext: %s', x); 
  	// 		x.traverse(function(x){
			// if( object3d.material ){
			// 	object3d.material.emissive.set('white')
			// }
		// })
  			scene.add(x);
  		},
  		function (e) { console.log('onError: %s', e); },
  		function () { console.log('onCompleted'); }
  	);
	// res.callback.onValue(function(val){ 
	//  	console.log(val);
	//  	
	//  });
		
	
}
module.exports = models;




function loadObjMtl(scene, loader, resource){
	

	//var exists = rx.Observable.fromCallback(callback);
	// Function called when downloads progress 
	var progress = function ( xhr ) { console.log( (xhr.loaded / xhr.total * 100) + '% loaded' ); };

	// Function called when downloads error 
	var error = function ( xhr ) { console.log( 'An error happened' ); }
	
	
	var subject = new Rx.AsyncSubject();
	// load an obj / mtl resource pair 
	loader.load( 
	// OBJ resource URL 
		resource + '.obj', 
		// MTL resource UR
		resource + '.mtl',
		function(result) {
            subject.onNext(result);
            subject.onCompleted();
    	}, 
		progress, 
		error 	
	 );

	

	return subject.asObservable();

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
