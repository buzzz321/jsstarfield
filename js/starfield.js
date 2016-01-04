/*jslint browser: true*/
/*global THREE, requestAnimationFrame*/

// Returns a random integer between min (included) and max (excluded)
// // Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function create_stars() {
    var geometry = new THREE.Geometry();
    var material = new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } );
    var x, y, z, n = 0;

    for(n = 0; n<1000; n +=1 ) {
        x = getRandomInt(0, window.innerWidth / 2.0);
        y = getRandomInt(0, window.innerHeight / 2.0);
        z = getRandom(0.1, 500);

        geometry.vertices.push(new THREE.Vector3( x, y, z ));
    }

    geometry.computeBoundingSphere();
    return new THREE.Points( geometry, material );
}


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var points = create_stars();
points.dynamic = true;
scene.add( points );
scene.updateMatrixWorld(true);

var stars = points.geometry.vertices;
var starNo = stars.length;

camera.position.x = window.innerWidth / 4;
camera.position.y = window.innerHeight / 4;
camera.position.z = 500;

var render = function () {
    var index = 0;
    requestAnimationFrame( render );

    for(index = 0; index < starNo; index += 1){
            stars[index].z += 2; 
            //points.geometry.vertices[index].z += 2; 

            if (stars[index].z > camera.position.z) {
                points.geometry.vertices[index].z = 0;
            }
    }

    points.geometry.verticesNeedUpdate = true;
    renderer.render(scene, camera);
};

render();

