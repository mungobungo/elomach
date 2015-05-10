'use strict'
require('script!./three.js');
require('script!./OBJLoader.js');
require('script!./OBJMTLLoader.js');
require('script!./MTLLoader.js');
//var bacon = require('baconjs');
var rx = require('rx');
var _ = require('lodash');

function models(scene) {

	
	
	var loader = new THREE.OBJMTLLoader(); 

	var res1 = loadObjMtl(scene, loader, 'models/Shuttle01/Shuttle01');
	var res2 = loadObjMtl(scene, loader, 'models/Shuttle02/Shuttle02');
	var res3 = loadObjMtl(scene, loader, 'models/SpaceFighter01/SpaceFighter01');
	var res4 = loadObjMtl(scene, loader, 'models/SpaceFighter02/SpaceFighter02');
	var res5 = loadObjMtl(scene, loader, 'models/SpaceFighter03/SpaceFighter03');

    var models_obs = rx.Observable.merge(res1, res2, res3, res4 ,res5);
    
    var spiral = rx.Observable.from(spiralGenerator(10,200));
    var coords = rx.Observable.zip(spiral, models_obs, 
    	function(coord, model){
    		return {'coord': coord, 'model': model}
    	});
	
	var subscription = coords.subscribe(
  		function (item) { 
  			console.log('onNext: %s', item.coord); 
  			console.log('onNext: %s', item.model); 
  	
  			item.model.position.add(item.coord);
  			scene.add(item.model);
  		},
  		function (e) { 
  			console.log('onError: %s', e); 
  		},
  		function () { console.log('onCompleted'); }
  	);

	
	
}
module.exports = models;


function spiralGenerator(length, scale){
	
	
	
	var array = _.times(length, function(t) {
  		
		var x = scale * t * Math.cos(6 * t);
		var y = scale * t * Math.sin(6* t);
		var z = scale * t;
		return new THREE.Vector3( x, y, z );
  		
	});
	return array;	

}

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
