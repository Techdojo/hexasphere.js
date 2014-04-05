$(function(){

    var hexsphere = new Hexsphere(10, 3);

    var renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( 600, 500);

    var cameraDistance = 60;
    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x000000, cameraDistance, cameraDistance * 1.2);


    var lineMaterial = new THREE.LineBasicMaterial({
        // color: opts.lineColor,
        // linewidth: opts.lineWidth
    });


    var geometry = new THREE.Geometry();
    geometry.dynamic = true;
    var faces = hexsphere.faces;
    var geometryIndex = 0;

    var vp = [];
    for(var i = 0; i< 1000; i++){
        geometry.vertices.push(new THREE.Vector3(0,0,-500));
    }

    // var c = 0;
    // for(var p in hexsphere.points){
    //     var vertex = hexsphere.points[p];
    //     geometry.vertices.push(vertex);
    //     c++;
    // }
    for(var i = 0; i< faces.length; i++){
        var vertex1 = new THREE.Vector3(faces[i].point1.x, faces[i].point1.y, faces[i].point1.z);
        var vertex2 = new THREE.Vector3(faces[i].point2.x, faces[i].point2.y, faces[i].point2.z);
        var vertex3 = new THREE.Vector3(faces[i].point3.x, faces[i].point3.y, faces[i].point3.z);

        // geometry.vertices.push(vertex1);
        // geometry.vertices.push(vertex2);
        // geometry.vertices.push(vertex3);

        var lineGeometry = new THREE.Geometry();

        lineGeometry.vertices.push(vertex1);
        lineGeometry.vertices.push(vertex2);
        lineGeometry.vertices.push(vertex1);
        lineGeometry.vertices.push(vertex3);
        lineGeometry.vertices.push(vertex2);
        lineGeometry.vertices.push(vertex3);

        var line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
    }

    // for(var i = 0; i < hexsphere.tiles.length; i++){
    //     var t = hexsphere.tiles[i];
    //     geometry.vertices.push(new THREE.Vector3(t.centerPoint.x, t.centerPoint.y, t.centerPoint.z));


    //     geometryIndex++;
    // }

    setInterval(function(){
        if(geometryIndex < hexsphere.tiles.length){
            var t = hexsphere.tiles[geometryIndex];
            geometry.vertices[geometryIndex].set(t.centerPoint.x, t.centerPoint.y, t.centerPoint.z);
            geometry.verticesNeedUpdate = true;
        }
        geometryIndex++;
    }, 50);

    var material = new THREE.ParticleSystemMaterial({size: 1});
    var particles = new THREE.ParticleSystem(geometry, material);



    $("#container").append(renderer.domElement);

    var camera = new THREE.PerspectiveCamera( 50, 600 / 500, 1, 200);
    camera.position.z = -cameraDistance;
    scene.add(particles); 




    var startTime = Date.now();
    var lastTime = Date.now();
    var cameraAngle = 0;

    var tick = function(){


        var dt = Date.now() - lastTime;

        var rotateCameraBy = (2 * Math.PI)/(100000/dt);
        cameraAngle += rotateCameraBy;

        lastTime = Date.now();

        camera.position.x = cameraDistance * Math.cos(cameraAngle);
        camera.position.y = Math.sin(cameraAngle)* 10;
        camera.position.z = cameraDistance * Math.sin(cameraAngle);
        camera.lookAt( scene.position );

        renderer.render( scene, camera );

        requestAnimationFrame(tick);


    }

    requestAnimationFrame(tick);

    window.hexsphere = hexsphere;



});
