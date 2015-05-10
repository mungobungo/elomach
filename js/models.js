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
  	
  			scene.add(x);
  		},
  		function (e) { console.log('onError: %s', e); },
  		function () { console.log('onCompleted'); }
  	);
	
	
}
module.exports = models;




function loadObjMtl(scene, loader, resource){
	

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
