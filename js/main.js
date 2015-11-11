'use strict';

// Converts from degrees to radians.
Math.radians = function(degrees) {
    return degrees * Math.PI/180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
    return radians * 180/Math.PI;
};

function f_filterResults(n_win, n_docel, n_body) {
    var n_result = n_win ? n_win : 0;
    
    if (n_docel && (!n_result || (n_result > n_docel))) {
        n_result = n_docel;
    }
    
    return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function f_clientWidth() {
    return f_filterResults (
        window.innerWidth ? window.innerWidth : 0,
        document.documentElement ? document.documentElement.clientWidth : 0,
        document.body ? document.body.clientWidth : 0
    );
}

function f_clientHeight() {
    return f_filterResults (
        window.innerHeight ? window.innerHeight : 0,
        document.documentElement ? document.documentElement.clientHeight : 0,
        document.body ? document.body.clientHeight : 0
    );
}

function f_scrollLeft() {
    return f_filterResults (
        window.pageXOffset ? window.pageXOffset : 0,
        document.documentElement ? document.documentElement.scrollLeft : 0,
        document.body ? document.body.scrollLeft : 0
    );
}

function f_scrollTop() {
    return f_filterResults (
        window.pageYOffset ? window.pageYOffset : 0,
        document.documentElement ? document.documentElement.scrollTop : 0,
        document.body ? document.body.scrollTop : 0
    );
}

window.MNDMPS = {

    data: {},

    threeD: function() {

        var _this = this,
            container = document.getElementsByClassName('splash')[0],
            SCREEN_WIDTH = window.innerWidth,
            SCREEN_HEIGHT = window.innerHeight,
            INIT_SCREEN_HEIGHT = window.innerHeight,

            renderer = new THREE.WebGLRenderer({antialias: true, alpha: true}),
            scene = new THREE.Scene(),
            //camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH/SCREEN_HEIGHT, 1, 1200),
            camera = new THREE.OrthographicCamera(SCREEN_WIDTH/-2, SCREEN_WIDTH/2, SCREEN_HEIGHT/2, SCREEN_HEIGHT/-2, 1, 1200),
            cameraZ = 600,

            zDepth = 100,
            
            graphGroup = new THREE.Object3D(),
            nodesCloud = null,
            nodeLinesMesh = null,
            nodesData = [],
            nodesCount = 20,
            maxNodesCount = 40,
            nodeVelocityFactor = 0.1,
            nodeLineSegments = Math.pow(maxNodesCount, 2),
            nodePositions = new Float32Array(nodeLineSegments * 3),
            nodesMaterial = new THREE.PointsMaterial(),
            nodes = new THREE.BufferGeometry(),
            particlePositions = new Float32Array(maxNodesCount * 3),
            effectController = {
                minDistance: Math.sqrt(SCREEN_WIDTH * SCREEN_WIDTH + SCREEN_HEIGHT * SCREEN_HEIGHT)/3,
                limitConnections: true,
                maxConnections: 3
            },

            logoGroup = new THREE.Object3D(),
            logoFaceNumber = 10,
            logoFaces = [],
            logoMaxOpacity = 0.075,
            logoUnit = (SCREEN_HEIGHT/100) * 5,
            baseHypotenuse = Math.sqrt(Math.pow(logoUnit, 2) + Math.pow(logoUnit, 2)),
            graphLineMaterial = new THREE.LineBasicMaterial({
                color: 0xffffff,
                linewidth: 0.8,
                transparent: true,
                opacity: 0.2
            }),
            logoMLineMaterial = new THREE.LineBasicMaterial({
                color: 0xffffff,
                linewidth: 1.6,
                transparent: true,
                opacity: 0.8
            }),

            logoGraphVectors = [
                [0, 0, -logoUnit*2],
                
                [0, -logoUnit, -logoUnit],
                [-logoUnit, 0, -logoUnit], [0, 0, -logoUnit], [logoUnit, 0, -logoUnit],
                [0, logoUnit, -logoUnit],

                [0, -logoUnit*2, 0], [logoUnit*2, 0, 0], [0, logoUnit*2, 0], [-logoUnit*2, 0, 0],
                [-logoUnit, -logoUnit, 0], [0, -logoUnit, 0], [logoUnit, -logoUnit, 0],
                [-logoUnit, 0, 0], [0, 0, 0], [logoUnit, 0, 0],
                [-logoUnit, logoUnit, 0], [0, logoUnit, 0], [logoUnit, logoUnit, 0]
            ],
            logoMVectors = [
                [-logoUnit, -logoUnit, 0], [-logoUnit, 0, 0], [-logoUnit, logoUnit, 0], [0, 0, 0], [logoUnit, logoUnit, 0], [logoUnit, 0, 0], [logoUnit, -logoUnit, 0]
            ],

            smallNodeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.4}),
            bigNodeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.8}),
            logoScale = 1;

        window.MNDMPS.data.threeDRunning = false;

        function generateNodes() {
            var nodeLinesGeometry = new THREE.BufferGeometry();
            
            for (var h = 0; h < maxNodesCount; h++) {

                var x = Math.random() * SCREEN_WIDTH * 1 - SCREEN_WIDTH * 0.5,
                    y = Math.random() * SCREEN_HEIGHT * 1 - SCREEN_HEIGHT * 0.5,
                    z = Math.random() * zDepth * 2 - zDepth * 1;

                particlePositions[h*3 + 0] = x;
                particlePositions[h*3 + 1] = y;
                particlePositions[h*3 + 2] = z;

                nodesData.push({
                    velocity: new THREE.Vector3(-nodeVelocityFactor + Math.random() * nodeVelocityFactor*2, -nodeVelocityFactor + Math.random() * nodeVelocityFactor*2,  -nodeVelocityFactor + Math.random() * nodeVelocityFactor*2),
                    numConnections: 0
                });
            }

            nodes.setDrawRange(0, 0);
            nodes.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setDynamic(true));

            nodesCloud = new THREE.Points(nodes, nodesMaterial);
            graphGroup.add(nodesCloud);

            nodeLinesGeometry.addAttribute('position', new THREE.BufferAttribute(nodePositions, 3).setDynamic(true));
            nodeLinesGeometry.computeBoundingSphere();
            nodeLinesGeometry.setDrawRange(0, 0);

            nodeLinesMesh = new THREE.LineSegments(nodeLinesGeometry, graphLineMaterial);
            graphGroup.add(nodeLinesMesh);
        }

        function redrawNodeLines() {
            var vertexpos = 0,
                numConnected = 0,
                particleData = null,
                particleDataB = null;

            for (var i = 0; i < nodesCount; i++) {
                nodesData[i].numConnections = 0;
            }

            for (i = 0; i < nodesCount; i++){

                particleData = nodesData[i];

                particlePositions[i*3] += particleData.velocity.x;
                particlePositions[i*3 + 1] += particleData.velocity.y;
                particlePositions[i*3 + 2] += particleData.velocity.z;

                if (particlePositions[i*3 + 1] < -SCREEN_HEIGHT/2 || particlePositions[i*3 + 1] > SCREEN_HEIGHT/2) {
                    particleData.velocity.y = -particleData.velocity.y;
                }

                if (particlePositions[i*3] < -SCREEN_WIDTH/2 || particlePositions[i*3] > SCREEN_WIDTH/2) {
                    particleData.velocity.x = -particleData.velocity.x;
                }

                if (particlePositions[i*3 + 2] < -zDepth || particlePositions[i*3 + 2] > zDepth * 2) {
                    particleData.velocity.z = -particleData.velocity.z;
                }

                if (effectController.limitConnections && particleData.numConnections >= effectController.maxConnections) {
                    continue;
                }

                // Check collision
                for (var j = i + 1; j < nodesCount; j++) {

                    particleDataB = nodesData[j];
                    
                    if (effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections) {
                        continue;
                    }

                    var dx = particlePositions[i*3 + 0] - particlePositions[j*3],
                        dy = particlePositions[i*3 + 1] - particlePositions[j*3 + 1],
                        dz = particlePositions[i*3 + 2] - particlePositions[j*3 + 2],
                        dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2));

                    if (dist < effectController.minDistance) {

                        particleData.numConnections++;
                        particleDataB.numConnections++;

                        nodePositions[vertexpos++] = particlePositions[i*3];
                        nodePositions[vertexpos++] = particlePositions[i*3 + 1];
                        nodePositions[vertexpos++] = particlePositions[i*3 + 2];

                        nodePositions[vertexpos++] = particlePositions[j*3];
                        nodePositions[vertexpos++] = particlePositions[j*3 + 1];
                        nodePositions[vertexpos++] = particlePositions[j*3 + 2];

                        numConnected++;
                    }
                }
            }

            nodeLinesMesh.geometry.setDrawRange(0, numConnected*2);
            nodeLinesMesh.geometry.attributes.position.needsUpdate = true;

            nodesCloud.geometry.attributes.position.needsUpdate = true;
        }

        function edgesAreEqual(set1, set2) {
            if (
                (
                    (set1[0][0] === set2[0][0] &&
                    set1[0][1] === set2[0][1] &&
                    set1[0][2] === set2[0][2]) &&

                    (set1[1][0] === set2[1][0] &&
                    set1[1][1] === set2[1][1] &&
                    set1[1][2] === set2[1][2])
                ) ||
                (
                    (set1[1][0] === set2[0][0] &&
                    set1[1][1] === set2[0][1] &&
                    set1[1][2] === set2[0][2]) &&

                    (set1[0][0] === set2[1][0] &&
                    set1[0][1] === set2[1][1] &&
                    set1[0][2] === set2[1][2])
                )
            ) {
                return true;
            }

            return false;
        }

        function vectorsAreEqual(vector1, vector2) {
            if (
                vector1[0] === vector2[0] &&
                vector1[1] === vector2[1] &&
                vector1[2] === vector2[2]
            ) {
                return true;
            }

            return false;
        }

        function getDistance(vector1, vector2) {
            return Math.sqrt(Math.pow(vector2[0] - vector1[0], 2) + Math.pow(vector2[1] - vector1[1], 2) + Math.pow(vector2[2] - vector1[2], 2));
        }

        function generateLogo() {
            var logoGraphGeometry = new THREE.BufferGeometry(),
                logoMGeometry = new THREE.BufferGeometry(),

                logoGraphVertices = new Float32Array(Math.pow(logoGraphVectors.length, 2) * 3),
                logoMVertices = new Float32Array(Math.pow(logoMVectors.length, 2) * 3),
                
                tempPairsArray = [],
                pairsArray = [],
                logoGraphArray = [],

                pairsMArray = [],
                logoMArray = [],

                littleSpheresArray = [],
                bigSpheresArray = [],
                
                distance = null,
                found = false;

// Creating an array for logo M with all existing edges
            for (var i = 0; i < logoMVectors.length; i++) {
                if (logoMVectors[i+1]) {
                    pairsMArray.push([logoMVectors[i], logoMVectors[i+1]]);
                }
            }

// Creating an array for logo graph with all existing edges
            for (i = 0; i < logoGraphVectors.length; i++) {
                for (var j = 0; j < logoGraphVectors.length; j++) {
                    if (i === j) {
                        continue;
                    }

                    tempPairsArray.push([logoGraphVectors[i], logoGraphVectors[j]]);
                }
            }

            for (i = 0; i < tempPairsArray.length; i++) {
                found = false;

// Removing doubles from the logo graph array
                for (j = 0; j < pairsArray.length; j++) {
                    if (edgesAreEqual(tempPairsArray[i], pairsArray[j])) {
                        found = true;
                        break;
                    }
                }

// Removing M vectors from the logo graph array
                for (j = 0; j < pairsMArray.length; j++) {
                    if (edgesAreEqual(tempPairsArray[i], pairsMArray[j])) {
                        found = true;
                        break;
                    }
                }

// Removing overlapping vectors from the logo graph array
                distance = getDistance(tempPairsArray[i][0], tempPairsArray[i][1]);
                if ((distance > logoUnit && distance%logoUnit === 0) || (distance > baseHypotenuse && distance%baseHypotenuse === 0)) {
                    found = true;
                }
                
                if (!found) {
                    pairsArray.push([tempPairsArray[i][0], tempPairsArray[i][1]]);
                }
            }

            for (i = 0; i < pairsArray.length; i++) {
                logoGraphArray.push(pairsArray[i][0], pairsArray[i][1]);
            }

            for (i = 0; i < logoGraphArray.length; i++) {
                logoGraphVertices[i*3 + 0] = logoGraphArray[i][0];
                logoGraphVertices[i*3 + 1] = logoGraphArray[i][1];
                logoGraphVertices[i*3 + 2] = logoGraphArray[i][2];
            }

            for (i = 0; i < pairsMArray.length; i++) {
                logoMArray.push(pairsMArray[i][0], pairsMArray[i][1]);
            }

            for (i = 0; i < logoMArray.length; i++) {
                logoMVertices[i*3 + 0] = logoMArray[i][0];
                logoMVertices[i*3 + 1] = logoMArray[i][1];
                logoMVertices[i*3 + 2] = logoMArray[i][2];
            }
// Generating positions for little spheres
            var smallNodeGeometry = null,
                smallNodeGeometries = new THREE.Geometry(),
                matrix = new THREE.Matrix4();
            
            for (i = 0; i < logoGraphVectors.length; i++) {
                found = false;

                for (j = 0; j < logoMVectors.length; j++) {
                    if (vectorsAreEqual(logoGraphVectors[i], logoMVectors[j])) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    smallNodeGeometry = new THREE.SphereGeometry(logoUnit/25, 8, 6); // 1.2 - ortho, 1.4 - perspective
                    smallNodeGeometry.applyMatrix(matrix.makeTranslation(logoGraphVectors[i][0], logoGraphVectors[i][1], logoGraphVectors[i][2]));
                    smallNodeGeometries.merge(smallNodeGeometry);
                }
            }

// Generating positions for big spheres
            var bigNodeGeometry = null,
                bigNodeGeometries = new THREE.Geometry();
            
            for (i = 0; i < logoMVectors.length; i++) {
                found = false;

                bigNodeGeometry = new THREE.SphereGeometry(logoUnit/20, 8, 6); // 1.6 - ortho, 1.8 - perspective
                bigNodeGeometry.applyMatrix(matrix.makeTranslation(logoMVectors[i][0], logoMVectors[i][1], logoMVectors[i][2]));
                bigNodeGeometries.merge(bigNodeGeometry);
            }

            logoGraphGeometry.addAttribute('position', new THREE.BufferAttribute(logoGraphVertices, 3));
            logoMGeometry.addAttribute('position', new THREE.BufferAttribute(logoMVertices, 3));
// Need to find a way to merge BufferGeometry without having to convert it from Geometry
            smallNodeGeometries = new THREE.BufferGeometry().fromGeometry(smallNodeGeometries);
            bigNodeGeometries = new THREE.BufferGeometry().fromGeometry(bigNodeGeometries);
            
            var logoGraphMesh = new THREE.LineSegments(logoGraphGeometry, graphLineMaterial),
                logoMMesh = new THREE.LineSegments(logoMGeometry, logoMLineMaterial),
                smallNodeSpheres = new THREE.Mesh(smallNodeGeometries, smallNodeMaterial),
                bigNodeSpheres = new THREE.Mesh(bigNodeGeometries, bigNodeMaterial);

            logoGraphMesh.geometry.setDrawRange(0, Math.pow(logoGraphVectors.length, 2));
            logoMMesh.geometry.setDrawRange(0, Math.pow(logoMVectors.length, 2));
            smallNodeSpheres.geometry.setDrawRange(0, smallNodeGeometries.attributes.position.array.length);
            bigNodeSpheres.geometry.setDrawRange(0, bigNodeGeometries.attributes.position.array.length);
            
            logoGroup.add(logoGraphMesh);
            logoGroup.add(logoMMesh);
            logoGroup.add(smallNodeSpheres);
            logoGroup.add(bigNodeSpheres);
        }

        function resize() {

            window.MNDMPS.data.windowHeight = f_clientHeight();
            window.MNDMPS.data.windowWidth = f_clientWidth();
            window.MNDMPS.data.barHeight = window.MNDMPS.data.menuBar.offsetHeight;
            window.MNDMPS.processScroll(f_scrollTop(), f_scrollLeft());
            
            SCREEN_WIDTH = window.innerWidth;
            SCREEN_HEIGHT = window.innerHeight;

            logoScale = SCREEN_HEIGHT/INIT_SCREEN_HEIGHT;

            //camera.aspect = SCREEN_WIDTH/SCREEN_HEIGHT;
            
            camera.left = SCREEN_WIDTH/-2;    // For
            camera.right = SCREEN_WIDTH/2;    // the
            camera.top = SCREEN_HEIGHT/2;     // Orthographic
            camera.bottom = SCREEN_HEIGHT/-2; // Camera
            
            camera.updateProjectionMatrix();
            renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        }

        function generateRandomFaces() {
            var colourMesh = null,
                colour = null,
                fadeSpeed = null,
                tempArray = [],
                tempGeometry = null,
                tempMaterial = null,
                tempEl = null;

            for (var i = 0; i < logoFaceNumber; i++) {
                colour = new THREE.Color(Math.random(), Math.random(), Math.random());
                fadeSpeed = Math.random()/500;
                tempGeometry = new THREE.Geometry();
                tempArray = [];

                while (tempArray.length < 3) {
                    tempEl = Math.floor(Math.random() * logoGraphVectors.length);
                    
                    if (tempArray.indexOf(tempEl) < 0) {
                        tempArray.push(tempEl);
                        tempGeometry.vertices.push(new THREE.Vector3(logoGraphVectors[tempEl][0], logoGraphVectors[tempEl][1], logoGraphVectors[tempEl][2]));
                    }
                }

                tempGeometry.faces.push(new THREE.Face3(0, 1, 2));
                tempGeometry.faces[0].color = colour;
                tempGeometry = new THREE.BufferGeometry().fromGeometry(tempGeometry);
                tempMaterial = generateFaceMaterial();

                colourMesh = new THREE.Mesh(tempGeometry, tempMaterial);
                colourMesh.material.side = THREE.DoubleSide;
                colourMesh.fadeInSpeed = fadeSpeed;
                colourMesh.fadeOutSpeed = -fadeSpeed;
                colourMesh.fadingOut = false;

                logoFaces.push(colourMesh);

                logoGroup.add(colourMesh);
            }
        }

        function generateFaceMaterial() {
            return new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0,
                blending: THREE.AdditiveBlending,
                vertexColors: THREE.VertexColors
            });
        }

        function changeFaceGeometry(mesh) {
            var tempArray = [],
                tempEl = null,
                posArray = mesh.geometry.attributes.position.array;

            for (var i = 0; i < logoFaceNumber; i++) {
                while (tempArray.length < 3) {
                    tempEl = Math.floor(Math.random() * logoGraphVectors.length);

                    if (tempArray.indexOf(tempEl) < 0) {
                        tempArray.push(logoGraphVectors[tempEl]);
                    }
                }
            }

            for (i = 0; i < tempArray.length; i++) {
                posArray[i*3 + 0] = tempArray[i][0];
                posArray[i*3 + 1] = tempArray[i][1];
                posArray[i*3 + 2] = tempArray[i][2];
            }
            
            mesh.geometry.attributes.position.needsUpdate = true;
        }

        function processRandomFaces() {

            for (var i = logoFaces.length - 1; i >= 0; i--) {
                if (logoFaces[i].fadingOut) {
                    logoFaces[i].material.opacity += logoFaces[i].fadeOutSpeed;

                    if (logoFaces[i].material.opacity <= 0) {
                        changeFaceGeometry(logoFaces[i]);
                        logoFaces[i].fadingOut = false;
                    }
                } else {
                    logoFaces[i].material.opacity += logoFaces[i].fadeInSpeed;

                    if (logoFaces[i].material.opacity >= logoMaxOpacity) {
                        logoFaces[i].fadingOut = true;
                    }
                }
            }
        }

        function refreshCamera() {
            camera.position.x = -(_this.data.mouseX - SCREEN_WIDTH/2) * 0.01;
            camera.position.y = (_this.data.mouseY - SCREEN_HEIGHT/2) * 0.01;
            camera.position.z = cameraZ;
            camera.lookAt(scene.position);

            logoGroup.rotation.set(Math.radians((_this.data.mouseY - SCREEN_HEIGHT/2) * 0.04), Math.radians((_this.data.mouseX - SCREEN_WIDTH/2) * 0.03), 0);
        }

        function refreshScale() {
            logoGroup.scale.set(logoScale, logoScale, logoScale);
        }

        _this.data.mouseX = SCREEN_WIDTH/2;
        _this.data.mouseY = SCREEN_HEIGHT/2;

        camera.aspect = SCREEN_WIDTH/SCREEN_HEIGHT;
        camera.updateProjectionMatrix();
        camera.position.z = cameraZ;
        camera.lookAt(scene.position);
        camera.zoom = 2; // For the Orthographic Camera
        scene.add(camera);
        
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        renderer.setPixelRatio(window.devicePixelRatio);

        container.appendChild(renderer.domElement);

        generateNodes();
        graphGroup.position.set(0, 0, -200);
        scene.add(graphGroup);

        generateLogo();
        generateRandomFaces();
        scene.add(logoGroup);

        function render() { 
            renderer.render(scene, camera);
        }

        function animate() {
            if (window.MNDMPS.data.threeDRunning) {
                redrawNodeLines();
                processRandomFaces();
                refreshCamera();
                refreshScale();
                render();
            }

            window.requestAnimationFrame(animate);
        }

        function onMouseMove(event) {
            refreshCursorPosition({
                x: event.pageX,
                y: event.pageY
            });
        }

        function onTouchStart(event) {
            refreshCursorPosition({
                x: event.touches[0].pageX,
                y: event.touches[0].pageY
            });
            
            document.addEventListener('touchmove', onTouchMove, false);
        }

        function onTouchEnd(event) {
            document.removeEventListener('touchmove', onTouchMove, false);

            refreshCursorPosition({
                x: event.changedTouches[0].pageX,
                y: event.changedTouches[0].pageY
            });
        }

        function onTouchMove(event) {
            refreshCursorPosition({
                x: event.touches[0].pageX,
                y: event.touches[0].pageY
            });
        }

        function refreshCursorPosition(coordinates) {
            if (!window.MNDMPS.data.threeDRunning) {
                return;
            }
            
            _this.data.mouseX = coordinates.x;
            _this.data.mouseY = coordinates.y;

            _this.data.mouseX = _this.data.mouseX > _this.data.windowWidth ? _this.data.windowWidth : _this.data.mouseX;
            _this.data.mouseY = _this.data.mouseY > _this.data.windowHeight ? _this.data.windowHeight : _this.data.mouseY;
        }

        function changeStateThreeD() {
            if (document.hidden) {
                _this.data.threeDRunning = false;
            } else {
                _this.data.threeDRunning = true;
            }
        }

        if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
            document.addEventListener('touchstart', onTouchStart, false);
            document.addEventListener('touchend', onTouchEnd, false);
        } else {
            document.addEventListener('mousemove', onMouseMove, false);
        }
        
        window.addEventListener('resize', function() {
            resize();

            /*setTimeout(function() {
                var offsetX = 0;

                if (_this.data.windowWidth < 1000) {
                    offsetX = (_this.data.windowWidth - _this.data.googleMap.getDiv().parentNode.getElementsByClassName('info')[0].offsetWidth)/2 - (_this.data.windowWidth/2 - _this.data.googleMap.getDiv().parentNode.getElementsByClassName('info')[0].offsetWidth);
                }

                _this.centerGoogleMap(
                    _this.data.googleMap,
                    _this.data.googleMapLatLng,
                    offsetX,
                    0);
            }, 0);*/
        }, false);
        
        document.addEventListener('visibilitychange', changeStateThreeD, false);

        resize();
        animate();
    },

    processScroll: function(scrolledY, scrolledX) {

        if (this.data.threeDRunning) {
            this.refreshMousePositionOnScroll(scrolledY, scrolledX);
        }

        if (scrolledY > this.data.windowHeight - this.data.barHeight) {
            this.data.menuBar.classList.add('scrolled');
            this.data.threeDRunning = false;
        } else {
            this.data.menuBar.classList.remove('scrolled');
            this.data.threeDRunning = true;
        }
    },

    refreshMousePositionOnScroll: function(scrolledY, scrolledX) {
        this.data.lastScrolledLeft = this.data.lastScrolledLeft || 0;
        this.data.lastScrolledTop = this.data.lastScrolledTop || 0;

        if (this.data.lastScrolledLeft !== scrolledX) {
            this.data.mouseX -= this.data.lastScrolledLeft;
            this.data.lastScrolledLeft = scrolledX;
            this.data.mouseX += this.data.lastScrolledLeft;
        }

        if (this.data.lastScrolledTop != scrolledY) {
            this.data.mouseY -= this.data.lastScrolledTop;
            this.data.lastScrolledTop = scrolledY;
            this.data.mouseY += this.data.lastScrolledTop;
        }

        this.data.mouseX = this.data.mouseX > this.data.windowWidth ? this.data.windowWidth : this.data.mouseX;
        this.data.mouseY = this.data.mouseY > this.data.windowHeight ? this.data.windowHeight : this.data.mouseY;
    },

    watchScroll: function() {
        document.addEventListener('scroll', function(event) {
            window.MNDMPS.processScroll(f_scrollTop(), f_scrollLeft());
        }, false);
    },

    centerGoogleMap: function(map, latlng, offsetx, offsety) {
        // latlng is the apparent centre-point
        // offsetx is the distance you want that point to move to the right, in pixels
        // offsety is the distance you want that point to move upwards, in pixels
        // offset can be negative
        // offsetx and offsety are both optional

        var scale = Math.pow(2, map.getZoom()),
            nw = new google.maps.LatLng(
                map.getBounds().getNorthEast().lat(),
                map.getBounds().getSouthWest().lng()
            ),
            worldCoordinateCenter = map.getProjection().fromLatLngToPoint(latlng),
            pixelOffset = new google.maps.Point((offsetx/scale) || 0, (offsety/scale) ||0),
            worldCoordinateNewCenter = new google.maps.Point(
                worldCoordinateCenter.x - pixelOffset.x,
                worldCoordinateCenter.y + pixelOffset.y
            ),
            newCenter = map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);

        map.setCenter(newCenter);
    },

    loadGoogleMap: function() {
        
        var _this = window.MNDMPS,
            mapStyles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
            markerIcon = {
                path: 'M15.2,5.2v9.5L20,10L15.2,5.2z M10,0L5.2,4.8L10,9.7l4.8-4.8L10,0z M0,10l4.8,4.7V5.2L0,10z M14.8,15.3l-4.4,4.4l3.4,3.4l-0.4,0.3l-8.2-8.2V5.6l4.8,4.8l4.7-4.8V15.3z',
                fillColor: '#5bc2e7',
                fillOpacity: 1,
                anchor: new google.maps.Point(12, 23),
                strokeWeight: 0,
                scale: 2
            },
            myLatlng = new google.maps.LatLng(51.551157, -0.114799),
            mapOptions = {
                zoom: window.MNDMPS.data.windowWidth < 560 ? 13 : 15,
                center: myLatlng,
                scrollwheel: false,
                disableDefaultUI: true,
                styles: mapStyles,
                draggable: false
            },
            map = new google.maps.Map(document.getElementsByClassName('google-map')[0], mapOptions),
            marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                icon: markerIcon,
                url: '//google.com/maps/?q=loc:51.551157,-0.114799'
            });

        _this.data.googleMapLatLng = myLatlng;
        _this.data.googleMap = map;

        google.maps.event.addListener(marker, 'click', function() {
            window.open(marker.url, '_blank').focus();
        });

        google.maps.event.addListener(map, 'idle', function() {
            if (_this.data.windowWidth < 1000) {
                _this.centerGoogleMap(
                    map,
                    myLatlng,
                    (_this.data.windowWidth - map.getDiv().parentNode.getElementsByClassName('info')[0].offsetWidth)/2 - (_this.data.windowWidth/2 - map.getDiv().parentNode.getElementsByClassName('info')[0].offsetWidth),
                    0);
            }
        });
    },

    webGLAvailable: function() {
        var canvas = document.createElement('canvas'),
            gl, experimental;
        
        try {
            gl = canvas.getContext('webgl');
        } catch (error) {
            gl = null;
        }

        if (gl === null) {
            try {
                gl = canvas.getContext('experimental-webgl');
                experimental = true;
            } catch (error) {
                gl = null;
            }
        }

        if (gl === null) {
            return false;
        }

        return true;
    },

    appendSVGSplash: function() {
        var container = document.getElementsByClassName('splash')[0],
            svgSplash = document.createElement('div'),
            svgContainer = document.createElement('div'),

            svg = '<svg viewBox="0 0 130 130"><style type="text/css">.st0{fill: #ffffff; stroke-width: 0;}.st1{fill: none; stroke: #ffffff; stroke-width: 0.1;}.st2{fill: none; stroke: #ffffff; stroke-width: 0.5;}</style><g class="polygons"><polygon points="77,89 43.6,77.9 75,35"/><polygon points="85,45 65,35 35,55"/><polygon points="55,55 35,35 65,5"/><polygon points="77.9,43.6 65,5 95,35"/><polygon points="53,41 65,5 90.7,47.9"/><polygon points="78.3,61.7 95,35 125,65"/><polygon points="55,75 35,35 83,59"/><polygon points="53,41 5,65 35,35"/><polygon points="47.9,39.3 5,65 47,71"/><polygon points="50,50 65,65 95,35"/><polygon points="80,80 35,65 95,50"/><polygon points="85,85 35,95 47,59"/><polygon points="65,125 47,71 83,89"/><polygon points="86.4,69.3 125,65 95,80"/><polygon points="89,47 125,65 95,95"/><polygon points="95,50 95,95 72.5,42.5"/><polygon points="95,95 85,45 65,93.5"/><polygon points="35,95 72.3,76.3 65,125"/><polygon points="35,75 45,45 5,65"/><polygon points="65,125 95,95 45,85"/><polygon points="35,95 5,65 55,55"/></g><g><line class="st1" x1="5" y1="65" x2="35" y2="35"/><line class="st1" x1="35" y1="35" x2="65" y2="5"/><line class="st1" x1="65" y1="5" x2="95" y2="35"/><line class="st1" x1="95" y1="35" x2="125" y2="65"/><line class="st1" x1="125" y1="65" x2="95" y2="95"/><line class="st1" x1="95" y1="95" x2="65" y2="125"/><line class="st1" x1="65" y1="125" x2="35" y2="95"/><line class="st1" x1="35" y1="95" x2="5" y2="65"/><line class="st1" x1="5" y1="65" x2="35" y2="65"/><line class="st1" x1="35" y1="65" x2="65" y2="65"/><line class="st1" x1="65" y1="65" x2="95" y2="65"/><line class="st1" x1="95" y1="65" x2="125" y2="65"/><line class="st1" x1="95" y1="65" x2="65" y2="95"/><line class="st1" x1="65" y1="95" x2="95" y2="95"/><line class="st1" x1="65" y1="95" x2="65" y2="125"/><line class="st1" x1="65" y1="95" x2="35" y2="95"/><line class="st1" x1="35" y1="65" x2="65" y2="95"/><line class="st1" x1="35" y1="95" x2="65" y2="65"/><line class="st1" x1="65" y1="65" x2="95" y2="95"/><line class="st1" x1="35" y1="65" x2="65" y2="35"/><line class="st1" x1="65" y1="35" x2="95" y2="65"/><line class="st1" x1="65" y1="35" x2="35" y2="35"/><line class="st1" x1="65" y1="35" x2="65" y2="5"/><line class="st1" x1="65" y1="35" x2="95" y2="35"/><line class="st1" x1="95" y1="65" x2="65" y2="5"/><line class="st1" x1="65" y1="5" x2="35" y2="65"/><line class="st1" x1="35" y1="65" x2="65" y2="125"/><line class="st1" x1="65" y1="125" x2="95" y2="65"/><line class="st1" x1="65" y1="95" x2="125" y2="65"/><line class="st1" x1="125" y1="65" x2="65" y2="35"/><line class="st1" x1="65" y1="35" x2="5" y2="65"/><line class="st1" x1="5" y1="65" x2="65" y2="95"/><line class="st1" x1="65" y1="35" x2="35" y2="95"/><line class="st1" x1="65" y1="35" x2="95" y2="95"/><line class="st1" x1="65" y1="95" x2="35" y2="35"/><line class="st1" x1="95" y1="35" x2="65" y2="95"/><line class="st1" x1="65" y1="65" x2="65" y2="35"/><line class="st1" x1="65" y1="65" x2="65" y2="95"/><line class="st1" x1="35" y1="65" x2="95" y2="35"/><line class="st1" x1="35" y1="65" x2="95" y2="95"/><line class="st1" x1="5" y1="65" x2="95" y2="35"/><line class="st1" x1="5" y1="65" x2="95" y2="95"/><line class="st1" x1="65" y1="125" x2="35" y2="35"/><line class="st1" x1="95" y1="35" x2="65" y2="125"/><line class="st1" x1="125" y1="65" x2="35" y2="35"/><line class="st1" x1="125" y1="65" x2="35" y2="95"/><line class="st1" x1="65" y1="5" x2="35" y2="95"/><line class="st1" x1="65" y1="5" x2="95" y2="95"/><line class="st1" x1="95" y1="65" x2="35" y2="35"/><line class="st1" x1="95" y1="65" x2="35" y2="95"/><circle class="st0" cx="65" cy="35" r="1"/><circle class="st0" cx="65" cy="5" r="1"/><circle class="st0" cx="65" cy="95" r="1"/><circle class="st0" cx="65" cy="125" r="1"/><circle class="st0" cx="125" cy="65" r="1"/><circle class="st0" cx="5" cy="65" r="1"/></g><g><line class="st2" x1="35" y1="95" x2="35" y2="65"/><line class="st2" x1="35" y1="65" x2="35" y2="35"/><line class="st2" x1="35" y1="35" x2="65" y2="65"/><line class="st2" x1="65" y1="65" x2="95" y2="35"/><line class="st2" x1="95" y1="35" x2="95" y2="65"/><line class="st2" x1="95" y1="65" x2="95" y2="95"/><circle class="st0" cx="65" cy="65" r="1.5"/><circle class="st0" cx="35" cy="35" r="1.5"/><circle class="st0" cx="35" cy="65" r="1.5"/><circle class="st0" cx="35" cy="95" r="1.5"/><circle class="st0" cx="95" cy="35" r="1.5"/><circle class="st0" cx="95" cy="65" r="1.5"/><circle class="st0" cx="95" cy="95" r="1.5"/></g></svg>';

        svgContainer.classList.add('svg-logo');
        svgContainer.innerHTML = svg;
        
        svgSplash.appendChild(svgContainer);
        svgSplash.classList.add('svg-splash');

        container.appendChild(svgSplash);
    },

    init: function() {

        this.data.windowHeight = f_clientHeight();
        this.data.windowWidth = f_clientWidth();
        this.data.menuBar = document.getElementsByClassName('nav')[0];
        this.data.barHeight = this.data.menuBar.offsetHeight;

        if (this.webGLAvailable()) {
            this.threeD();
        } else {
            this.appendSVGSplash();
        }
            
        vanillaSmoothScroller.bind({
            selector: '.scrollTrigger',
            offset: function () {
                return window.MNDMPS.data.barHeight;
            }
        });
        
        this.watchScroll();

        /*if (document.getElementsByClassName('google-map')[0]) {
            google.maps.event.addDomListener(window, 'load', this.loadGoogleMap);
        }*/

        atvImg();
    }
};

window.MNDMPS.init();