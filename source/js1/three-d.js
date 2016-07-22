'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.threeD = {

    data: {},

    init: function() {

        var _this = this,
            container = document.getElementsByClassName('splash')[0],
            SCREEN_WIDTH = f_clientWidth(),
            SCREEN_HEIGHT = f_clientHeight() * 0.8, // 80% of window height
            INIT_SCREEN_HEIGHT = f_clientHeight(),

            renderer = new THREE.WebGLRenderer({antialias: true, alpha: true}),
            scene = new THREE.Scene(),
            //camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH/SCREEN_HEIGHT, 1, 1200),
            camera = new THREE.OrthographicCamera(SCREEN_WIDTH/-2, SCREEN_WIDTH/2, SCREEN_HEIGHT/2, SCREEN_HEIGHT/-2, 1, 1200),
            cameraZ = 600,

            zDepth = 100,

            sky = null,

            graphGroup = new THREE.Object3D(),
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

        _this.data.threeDRunning = false;

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

                    var dx = particlePositions[i*3] - particlePositions[j*3],
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

            _this.data.windowWidth = f_clientWidth();
            _this.data.windowHeight = f_clientHeight();
            window.MNDMPS.App.processScroll(f_scrollTop(), f_scrollLeft());

            SCREEN_WIDTH = _this.data.windowWidth;
            SCREEN_HEIGHT = _this.data.windowHeight * 0.8; // 80% of window height

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

            logoGroup.rotation.set(Math.radians((_this.data.mouseY - SCREEN_HEIGHT/4) * 0.04), Math.radians((_this.data.mouseX - SCREEN_WIDTH/2) * 0.03), 0);
        }

        function refreshScale() {
            logoGroup.scale.set(logoScale, logoScale, logoScale);
        }

        function refreshPosition() {
            logoGroup.position.setY(SCREEN_HEIGHT * 0.13);
        }

        _this.data.mouseX = SCREEN_WIDTH/2;
        _this.data.mouseY = SCREEN_HEIGHT/2;

        //camera.aspect = SCREEN_WIDTH/SCREEN_HEIGHT;
        camera.updateProjectionMatrix();
        camera.position.z = cameraZ;
        camera.lookAt(scene.position);
        camera.zoom = 2; // For the Orthographic Camera
        scene.add(camera);

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

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
            if (_this.data.threeDRunning) {
                redrawNodeLines();
                processRandomFaces();
                refreshCamera();
                refreshPosition();
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
            if (!_this.data.threeDRunning) {
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
                window.MNDMPS.App.processScroll(f_scrollTop(), f_scrollLeft());
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

            setTimeout(function() {
                var offsetX = 0;

                if (_this.data.windowWidth < 1000) {
                    offsetX = (_this.data.windowWidth - _this.data.googleMap.getDiv().parentNode.getElementsByClassName('info')[0].offsetWidth)/2 - (_this.data.windowWidth/2 - _this.data.googleMap.getDiv().parentNode.getElementsByClassName('info')[0].offsetWidth);
                }

                window.MNDMPS.map.center(
                    window.MNDMPS.map.data.googleMap,
                    window.MNDMPS.map.data.googleMapLatLng,
                    offsetX,
                    0);
            }, 0);
        }, false);

        document.addEventListener('visibilitychange', changeStateThreeD, false);

        resize();
        animate();
    }
}