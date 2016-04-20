'use strict';

// Converts from degrees to radians.
Math.radians = function(degrees) {
    return degrees * Math.PI/180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
    return radians * 180/Math.PI;
};

function selectText(element) {
    var doc = document,
        text = element,
        range,
        selection;
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function serializeObject(el) {

    var o = {},
        a = el.serializeArray();

    $.each(a, function() {

        if (o[this.name] !== undefined) {

            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }

            o[this.name].push(this.value || '');
        } else {

            o[this.name] = this.value || '';
        }
    });

    return o;
};

function getParentElement(el, className) {

    if (!el) {
        return;
    }

    if (el.classList.contains(className)) {
        return el;
    } else if (el.nodeName === 'BODY' || el.nodeName === 'HTML') {
        return false;
    } else {
        return getParentElement(el.parentNode, className);
    }
}

function getParentElements(el, className) {
    var array = [],
        foundEl = getParentElement(el, className);

    while (foundEl) {
        array.push(foundEl);
        foundEl = getParentElement(foundEl.parentNode, className);
    }

    return array;
}

function getChildren(n, skipMe) {
    var r = [];
    for (; n; n = n.nextSibling)
        if (n.nodeType == 1 && n != skipMe) {
            r.push(n);
        }

    return r;
}

function getSiblings(n) {
    return getChildren(n.parentNode.firstChild, n);
}

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

function dontScrollParent(el, turnOff) {

    function catchScroll(ev) {
        var scrollTop    = this.scrollTop,
            scrollHeight = this.scrollHeight,
            height       = this.offsetHeight,
            delta        = ev.wheelDelta,
            up           = delta > 0;

        function prevent() {
            ev.stopPropagation();
            ev.preventDefault();
            ev.returnValue = false;
            return false;
        }

        if (!up && -delta > scrollHeight - height - scrollTop) {
            this.scrollTop = scrollHeight;
            return prevent();
        } else if (up && delta > scrollTop) {
            this.scrollTop = 0;
            return prevent();
        }
    }

    el.removeEventListener('DOMMouseScroll', catchScroll, false);
    el.removeEventListener('mousewheel', catchScroll, false);

    if (!turnOff) {
        el.addEventListener('DOMMouseScroll', catchScroll, false);
        el.addEventListener('mousewheel', catchScroll, false);
    }
}

window.MNDMPS = {

    data: {},

    threeD: function() {

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
            _this.processScroll(f_scrollTop(), f_scrollLeft());

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
                _this.processScroll(f_scrollTop(), f_scrollLeft());
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

                _this.centerGoogleMap(
                    _this.data.googleMap,
                    _this.data.googleMapLatLng,
                    offsetX,
                    0);
            }, 0);
        }, false);

        document.addEventListener('visibilitychange', changeStateThreeD, false);

        resize();
        animate();
    },

    processScroll: function(scrolledY, scrolledX) {

        if (this.data.threeDRunning) {
            this.refreshMousePositionOnScroll(scrolledY, scrolledX);
        }

        if (scrolledY > this.data.windowHeight * 0.50 - this.data.menuBar.offsetHeight) {
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

        if (!map.getBounds()) {
            return;
        }

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
                url: '//google.co.uk/maps/place/Mindmaps+Research+Ltd/@51.5512213,-0.1169207,17z/data=!3m1!4b1!4m2!3m1!1s0x48761b7382210035:0x9ca7d8a98838539f'
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

    dontScrollParent: function(el, turnOff) {

        function catchScroll(ev) {
            var scrollTop    = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height       = this.offsetHeight,
                delta        = ev.wheelDelta,
                up           = delta > 0;

            function prevent() {
                ev.stopPropagation();
                ev.preventDefault();
                ev.returnValue = false;
                return false;
            }

            if (!up && -delta > scrollHeight - height - scrollTop) {
                this.scrollTop = scrollHeight;
                return prevent();
            } else if (up && delta > scrollTop) {
                this.scrollTop = 0;
                return prevent();
            }
        }

        el.removeEventListener('DOMMouseScroll', catchScroll, false);
        el.removeEventListener('mousewheel', catchScroll, false);

        if (!turnOff) {
            el.addEventListener('DOMMouseScroll', catchScroll, false);
            el.addEventListener('mousewheel', catchScroll, false);
        }
    },

    initSlick: function() {
        $('.slider-container').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            cssEase: 'ease-in-out',
            infinite: false,
            draggable: false,
            dots: true,
            easing: 'easeInOutQuart',
            mobileFirst: true,
            lazyLoad: 'progressive',
            speed: 200,
            zIndex: 1,
            arrows: false,
            responsive: [
                {
                    breakpoint: 559,
                    settings: {
                        arrows: true
                    }
                }
            ]
        });
    },

    initGraph: function(obj) {
        buildGraph(obj)
    },

    initPlatformGraphs: function() {
        var graphs = [
            {
                "id": 1,
                "width": 562,
                "height": 400,
                "nodes":[
                    {
                        "id":0,
                        "type":"concept-type",
                        "text":"person",
                        "x":0.5,
                        "y":0.1
                    },
                    {
                        "id":1,
                        "type":"instance",
                        "text":"Alice",
                        "x":0.1,
                        "y":0.9
                    },
                    {
                        "id":2,
                        "type":"instance",
                        "text":"Bob",
                        "x":0.9,
                        "y":0.9
                    }
                ],
                "edges":[
                    {
                        "source":1,
                        "target":0,
                        "text":"isa"
                    },
                    {
                        "source":2,
                        "target":0,
                        "text":"isa"
                    }
                ]
            },
            {
                "id": 2,
                "width": 562,
                "height": 400,
                "nodes":[
                    {
                        "id":0,
                        "type":"concept-type",
                        "text":"person",
                        "x":0.1,
                        "y":0.1
                    },
                    {
                        "id":1,
                        "type":"instance",
                        "text":"Alice",
                        "x":0.1,
                        "y":0.9
                    },
                    {
                        "id":2,
                        "type":"instance",
                        "text":"Honesty Inc.",
                        "x":0.9,
                        "y":0.9
                    },
                    {
                        "id":3,
                        "type":"relation",
                        "text":"•",
                        "x":0.5,
                        "y":0.5
                    },
                    {
                        "id":4,
                        "type":"concept-type",
                        "text":"company",
                        "x":0.9,
                        "y":0.1
                    },
                    {
                        "id":5,
                        "type":"relation-type",
                        "text":"director-ship",
                        "x":0.5,
                        "y":0.1
                    }
                ],
                "edges":[
                    {
                        "source":1,
                        "target":0,
                        "text":"isa"
                    },
                    {
                        "source":2,
                        "target":4,
                        "text":"isa"
                    },
                    {
                        "source":3,
                        "target":2,
                        "text":"directed"
                    },
                    {
                        "source":3,
                        "target":1,
                        "text":"director"
                    },
                    {
                        "source":3,
                        "target":5,
                        "text":"isa"
                    }
                ]
            },
            {
                "id": 3,
                "width": 562,
                "height": 400,
                "nodes":[
                    {
                        "id":0,
                        "type":"relation-type",
                        "text":"marriage",
                        "x":0.5,
                        "y":0.1
                    },
                    {
                        "id":1,
                        "type":"role-type",
                        "text":"wife",
                        "x":0.1,
                        "y":0.3
                    },
                    {
                        "id":2,
                        "type":"role-type",
                        "text":"husband",
                        "x":0.9,
                        "y":0.3
                    },
                    {
                        "id":3,
                        "type":"instance",
                        "text":"Alice",
                        "x":0.1,
                        "y":0.7
                    },
                    {
                        "id":4,
                        "type":"relation",
                        "text":"•",
                        "x":0.5,
                        "y":0.5
                    },
                    {
                        "id":5,
                        "type":"instance",
                        "text":"Bob",
                        "x":0.9,
                        "y":0.7
                    },
                    {
                        "id":6,
                        "type":"concept-type",
                        "text":"person",
                        "x":0.5,
                        "y":0.9
                    }
                ],
                "edges":[
                    {
                        "source":0,
                        "target":1,
                        "text":"has role"
                    },
                    {
                        "source":0,
                        "target":2,
                        "text":"has role"
                    },
                    {
                        "source":4,
                        "target":0,
                        "text":"isa"
                    },
                    {
                        "source":4,
                        "target":3,
                        "text":"wife"
                    },
                    {
                        "source":4,
                        "target":5,
                        "text":"husband"
                    },
                    {
                        "source":3,
                        "target":6,
                        "text":"isa"
                    },
                    {
                        "source":5,
                        "target":6,
                        "text":"isa"
                    }
                ]
            },
            {
                "id": 4,
                "width": 562,
                "height": 400,
                "nodes":[
                    {
                        "id":0,
                        "type":"relation-type",
                        "text":"director-ship",
                        "x":0.5,
                        "y":0.1
                    },
                    {
                        "id":1,
                        "type":"role-type",
                        "text":"director",
                        "x":0.1,
                        "y":0.1
                    },
                    {
                        "id":2,
                        "type":"role-type",
                        "text":"directed",
                        "x":0.9,
                        "y":0.1
                    },
                    {
                        "id":3,
                        "type":"instance",
                        "text":"Alice",
                        "x":0.3,
                        "y":0.9
                    },
                    {
                        "id":4,
                        "type":"relation",
                        "text":"•",
                        "x":0.5,
                        "y":0.5
                    },
                    {
                        "id":5,
                        "type":"instance",
                        "text":"Honesty Inc.",
                        "x":0.7,
                        "y":0.9
                    },
                    {
                        "id":6,
                        "type":"concept-type",
                        "text":"person",
                        "x":0.1,
                        "y":0.55
                    },
                    {
                        "id":7,
                        "type":"concept-type",
                        "text":"company",
                        "x":0.9,
                        "y":0.55
                    }
                ],
                "edges":[
                    {
                        "source":0,
                        "target":1,
                        "text":"has role"
                    },
                    {
                        "source":0,
                        "target":2,
                        "text":"has role"
                    },
                    {
                        "source":4,
                        "target":0,
                        "text":"isa"
                    },
                    {
                        "source":4,
                        "target":3,
                        "text":"director"
                    },
                    {
                        "source":4,
                        "target":5,
                        "text":"directed"
                    },
                    {
                        "source":3,
                        "target":6,
                        "text":"isa"
                    },
                    {
                        "source":5,
                        "target":7,
                        "text":"isa"
                    },
                    {
                        "source":6,
                        "target":1,
                        "text":"plays role"
                    },
                    {
                        "source":7,
                        "target":2,
                        "text":"plays role"
                    }
                ]
            },
            {
                "id": 5,
                "width": 562,
                "height": 400,
                "nodes":[
                    {
                        "id":0,
                        "type":"relation-type",
                        "text":"director-ship",
                        "x":0.5,
                        "y":0.1
                    },
                    {
                        "id":1,
                        "type":"role-type",
                        "text":"director",
                        "x":0.1,
                        "y":0.5
                    },
                    {
                        "id":2,
                        "type":"role-type",
                        "text":"directed",
                        "x":0.9,
                        "y":0.5
                    },
                    {
                        "id":3,
                        "type":"concept-type",
                        "text":"person",
                        "x":0.1,
                        "y":0.9
                    },
                    {
                        "id":4,
                        "type":"concept-type",
                        "text":"company",
                        "x":0.9,
                        "y":0.9
                    },
                    {
                        "id":5,
                        "type":"meta",
                        "text":"relation-type",
                        "x":0.9,
                        "y":0.1
                    },
                    {
                        "id":6,
                        "type":"meta",
                        "text":"role-type",
                        "x":0.5,
                        "y":0.5
                    },
                    {
                        "id":7,
                        "type":"meta",
                        "text":"concept-type",
                        "x":0.5,
                        "y":0.9
                    }
                ],
                "edges":[
                    {
                        "source":0,
                        "target":1,
                        "text":"has role"
                    },
                    {
                        "source":0,
                        "target":2,
                        "text":"has role"
                    },
                    {
                        "source":3,
                        "target":1,
                        "text":"plays role"
                    },
                    {
                        "source":4,
                        "target":2,
                        "text":"plays role"
                    },
                    {
                        "source":0,
                        "target":5,
                        "text":"isa"
                    },
                    {
                        "source":1,
                        "target":6,
                        "text":"isa"
                    },
                    {
                        "source":2,
                        "target":6,
                        "text":"isa"
                    },
                    {
                        "source":3,
                        "target":7,
                        "text":"isa"
                    },
                    {
                        "source":4,
                        "target":7,
                        "text":"isa"
                    }
                ]
            },
            {
                "id": 6,
                "width": 562,
                "height": 400,
                "nodes":[
                    {
                        "id":0,
                        "type":"relation-type",
                        "text":"director-ship",
                        "x":0.5,
                        "y":0.1
                    },
                    {
                        "id":1,
                        "type":"role-type",
                        "text":"director",
                        "x":0.1,
                        "y":0.1
                    },
                    {
                        "id":2,
                        "type":"role-type",
                        "text":"directed",
                        "x":0.9,
                        "y":0.1
                    },
                    {
                        "id":3,
                        "type":"relation-type",
                        "text":"marriage",
                        "x":0.5,
                        "y":0.9
                    },
                    {
                        "id":4,
                        "type":"role-type",
                        "text":"husband",
                        "x":0.1,
                        "y":0.9
                    },
                    {
                        "id":5,
                        "type":"role-type",
                        "text":"wife",
                        "x":0.9,
                        "y":0.9
                    },
                    {
                        "id":6,
                        "type":"concept-type",
                        "text":"person",
                        "x":0.3,
                        "y":0.5
                    },
                    {
                        "id":7,
                        "type":"concept-type",
                        "text":"company",
                        "x":0.7,
                        "y":0.5
                    }
                ],
                "edges":[
                    {
                        "source":0,
                        "target":1,
                        "text":"has role"
                    },
                    {
                        "source":0,
                        "target":2,
                        "text":"has role"
                    },
                    {
                        "source":3,
                        "target":4,
                        "text":"has role"
                    },
                    {
                        "source":3,
                        "target":5,
                        "text":"has role"
                    },
                    {
                        "source":6,
                        "target":1,
                        "text":"plays role"
                    },
                    {
                        "source":7,
                        "target":2,
                        "text":"plays role"
                    },
                    {
                        "source":6,
                        "target":4,
                        "text":"plays role"
                    },
                    {
                        "source":6,
                        "target":5,
                        "text":"plays role"
                    }
                ]
            },
            {
                "id": 7,
                "width": 562,
                "height": 400,
                "nodes":[
                    {
                        "id":0,
                        "type":"relation-type",
                        "text":"marriage",
                        "x":0.3,
                        "y":0.1
                    },
                    {
                        "id":1,
                        "type":"instance",
                        "text":"Bob",
                        "x":0.1,
                        "y":0.633
                    },
                    {
                        "id":2,
                        "type":"relation",
                        "text":"•",
                        "x":0.3,
                        "y":0.367
                    },
                    {
                        "id":3,
                        "type":"instance",
                        "text":"Alice",
                        "x":0.5,
                        "y":0.633
                    },
                    {
                        "id":4,
                        "type":"concept-type",
                        "text":"person",
                        "x":0.3,
                        "y":0.9
                    },
                    {
                        "id":5,
                        "type":"relation",
                        "text":"•",
                        "x":0.7,
                        "y":0.367
                    },
                    {
                        "id":6,
                        "type":"instance",
                        "text":"Honesty Inc.",
                        "x":0.9,
                        "y":0.633
                    },
                    {
                        "id":7,
                        "type":"relation-type",
                        "text":"director-ship",
                        "x":0.7,
                        "y":0.1
                    },
                    {
                        "id":8,
                        "type":"concept-type",
                        "text":"company",
                        "x":0.7,
                        "y":0.9
                    }
                ],
                "edges":[
                    {
                        "source":2,
                        "target":0,
                        "text":"isa"
                    },
                    {
                        "source":2,
                        "target":1,
                        "text":"husband"
                    },
                    {
                        "source":2,
                        "target":3,
                        "text":"wife"
                    },
                    {
                        "source":1,
                        "target":4,
                        "text":"isa"
                    },
                    {
                        "source":3,
                        "target":4,
                        "text":"isa"
                    },
                    {
                        "source":5,
                        "target":3,
                        "text":"director"
                    },
                    {
                        "source":5,
                        "target":6,
                        "text":"directed"
                    },
                    {
                        "source":6,
                        "target":8,
                        "text":"isa"
                    },
                    {
                        "source":5,
                        "target":7,
                        "text":"isa"
                    }
                ]
            },
            {
                "id": 8,
                "width": 562,
                "height": 400,
                "nodes":[
                    {
                        "id":0,
                        "type":"relation-type",
                        "text":"marriage",
                        "x":0.3,
                        "y":0.1
                    },
                    {
                        "id":1,
                        "type":"instance",
                        "text":"Bob",
                        "x":0.1,
                        "y":0.633
                    },
                    {
                        "id":2,
                        "type":"relation",
                        "text":"•",
                        "x":0.3,
                        "y":0.367
                    },
                    {
                        "id":3,
                        "type":"instance",
                        "text":"Alice",
                        "x":0.5,
                        "y":0.633
                    },
                    {
                        "id":4,
                        "type":"concept-type",
                        "text":"person",
                        "x":0.3,
                        "y":0.9
                    },
                    {
                        "id":5,
                        "type":"relation",
                        "text":"•",
                        "x":0.7,
                        "y":0.367
                    },
                    {
                        "id":6,
                        "type":"instance",
                        "text":"Honesty Inc.",
                        "x":0.9,
                        "y":0.633
                    },
                    {
                        "id":7,
                        "type":"relation-type",
                        "text":"director-ship",
                        "x":0.7,
                        "y":0.1
                    },
                    {
                        "id":8,
                        "type":"concept-type",
                        "text":"company",
                        "x":0.7,
                        "y":0.9
                    }
                ],
                "edges":[
                    {
                        "source":2,
                        "target":0,
                        "text":"isa"
                    },
                    {
                        "source":2,
                        "target":1,
                        "text":"husband",
                        "type":"active"
                    },
                    {
                        "source":2,
                        "target":3,
                        "text":"wife",
                        "type":"active"
                    },
                    {
                        "source":1,
                        "target":4,
                        "text":"isa"
                    },
                    {
                        "source":3,
                        "target":4,
                        "text":"isa"
                    },
                    {
                        "source":5,
                        "target":3,
                        "text":"director",
                        "type":"active"
                    },
                    {
                        "source":5,
                        "target":6,
                        "text":"directed",
                        "type":"active"
                    },
                    {
                        "source":6,
                        "target":8,
                        "text":"isa"
                    },
                    {
                        "source":5,
                        "target":7,
                        "text":"isa"
                    }
                ]
            },
            {
                "id": 10,
                "width": 562,
                "height": 400,
                "nodes":[
                    {
                        "id":0,
                        "type":"relation-type",
                        "text":"marriage",
                        "x":0.5,
                        "y":0.1
                    },
                    {
                        "id":1,
                        "type":"role-type",
                        "text":"husband",
                        "x":0.1,
                        "y":0.5
                    },
                    {
                        "id":2,
                        "type":"role-type",
                        "text":"wife",
                        "x":0.9,
                        "y":0.5
                    },
                    {
                        "id":3,
                        "type":"concept-type",
                        "text":"person",
                        "x":0.5,
                        "y":0.9
                    }
                ],
                "edges":[
                    {
                        "source":0,
                        "target":1,
                        "text":"has role"
                    },
                    {
                        "source":0,
                        "target":2,
                        "text":"has role"
                    },
                    {
                        "source":3,
                        "target":1,
                        "text":"plays role"
                    },
                    {
                        "source":3,
                        "target":2,
                        "text":"plays role"
                    }
                ]
            },
            {
                "id": 11,
                "width": 562,
                "height": 400,
                "nodes":[
                    {
                        "id":0,
                        "type":"relation",
                        "text":"•",
                        "x":0.5,
                        "y":0.1
                    },
                    {
                        "id":1,
                        "type":"relation",
                        "text":"•",
                        "x":0.5,
                        "y":0.9
                    },
                    {
                        "id":2,
                        "type":"instance",
                        "text":"Honesty Inc.",
                        "x":0.3,
                        "y":0.3
                    },
                    {
                        "id":3,
                        "type":"instance",
                        "text":"Evilcorp",
                        "x":0.3,
                        "y":0.7
                    },
                    {
                        "id":4,
                        "type":"instance",
                        "text":"TrustMe.co",
                        "x":0.1,
                        "y":0.9
                    },
                    {
                        "id":5,
                        "type":"concept-type",
                        "text":"company",
                        "x":0.1,
                        "y":0.5
                    },
                    {
                        "id":6,
                        "type":"instance",
                        "text":"Alice",
                        "x":0.7,
                        "y":0.3
                    },
                    {
                        "id":7,
                        "type":"instance",
                        "text":"Bob",
                        "x":0.7,
                        "y":0.7
                    },
                    {
                        "id":8,
                        "type":"concept-type",
                        "text":"person",
                        "x":0.9,
                        "y":0.5
                    },
                    {
                        "id":9,
                        "type":"relation-type",
                        "text":"director-ship",
                        "x":0.5,
                        "y":0.5
                    }
                ],
                "edges":[
                    {
                        "source":0,
                        "target":9,
                        "text":"isa"
                    },
                    {
                        "source":1,
                        "target":9,
                        "text":"isa"
                    },
                    {
                        "source":2,
                        "target":5,
                        "text":"isa",
                        "type":"active"
                    },
                    {
                        "source":3,
                        "target":5,
                        "text":"isa",
                        "type":"active"
                    },
                    {
                        "source":4,
                        "target":5,
                        "text":"isa",
                        "type":"alert"
                    },
                    {
                        "source":0,
                        "target":2,
                        "text":"directed",
                        "type":"active"
                    },
                    {
                        "source":1,
                        "target":3,
                        "text":"directed",
                        "type":"active"
                    },
                    {
                        "source":0,
                        "target":6,
                        "text":"director",
                        "type":"active"
                    },
                    {
                        "source":1,
                        "target":7,
                        "text":"director",
                        "type":"active"
                    },
                    {
                        "source":6,
                        "target":8,
                        "text":"isa",
                        "type":"active"
                    },
                    {
                        "source":7,
                        "target":8,
                        "text":"isa",
                        "type":"active"
                    }
                ]
            },
            {
                "id": 12,
                "width": 562,
                "height": 400,
                "nodes":[
                    {
                        "id":0,
                        "type":"relation-type",
                        "text":"marriage",
                        "x":0.5,
                        "y":0.1
                    },
                    {
                        "id":1,
                        "type":"instance",
                        "text":"Alice",
                        "x":0.1,
                        "y":0.1
                    },
                    {
                        "id":2,
                        "type":"relation",
                        "text":"•",
                        "x":0.5,
                        "y":0.35
                    },
                    {
                        "id":3,
                        "type":"instance",
                        "text":"Bob",
                        "x":0.9,
                        "y":0.1
                    },
                    {
                        "id":4,
                        "type":"relation",
                        "text":"•",
                        "x":0.35,
                        "y":0.4
                    },
                    {
                        "id":5,
                        "type":"relation-type",
                        "text":"director-ship",
                        "x":0.7,
                        "y":0.7
                    },
                    {
                        "id":6,
                        "type":"relation",
                        "text":"•",
                        "x":0.65,
                        "y":0.4
                    },
                    {
                        "id":7,
                        "type":"instance",
                        "text":"Honesty Inc.",
                        "x":0.1,
                        "y":0.5
                    },
                    {
                        "id":8,
                        "type":"relation-type",
                        "text":"address",
                        "x":0.3,
                        "y":0.7
                    },
                    {
                        "id":9,
                        "type":"instance",
                        "text":"Evilcorp",
                        "x":0.9,
                        "y":0.5
                    },
                    {
                        "id":10,
                        "type":"relation",
                        "text":"•",
                        "x":0.1,
                        "y":0.9
                    },
                    {
                        "id":11,
                        "type":"relation",
                        "text":"•",
                        "x":0.9,
                        "y":0.9
                    },
                    {
                        "id":12,
                        "type":"instance",
                        "text":"Easy Street",
                        "x":0.5,
                        "y":0.9
                    }
                ],
                "edges":[
                    {
                        "source":2,
                        "target":0,
                        "text":"isa"
                    },
                    {
                        "source":2,
                        "target":1,
                        "text":"wife",
                        "type":"active"
                    },
                    {
                        "source":2,
                        "target":3,
                        "text":"husband",
                        "type":"active"
                    },
                    {
                        "source":4,
                        "target":5,
                        "text":"isa"
                    },
                    {
                        "source":6,
                        "target":5,
                        "text":"isa"
                    },
                    {
                        "source":10,
                        "target":8,
                        "text":"isa"
                    },
                    {
                        "source":11,
                        "target":8,
                        "text":"isa"
                    },
                    {
                        "source":4,
                        "target":1,
                        "text":"director",
                        "type":"active"
                    },
                    {
                        "source":6,
                        "target":3,
                        "text":"director",
                        "type":"active"
                    },
                    {
                        "source":4,
                        "target":7,
                        "text":"directed",
                        "type":"active"
                    },
                    {
                        "source":6,
                        "target":9,
                        "text":"directed",
                        "type":"active"
                    },
                    {
                        "source":10,
                        "target":7,
                        "text":"houses",
                        "type":"active"
                    },
                    {
                        "source":11,
                        "target":9,
                        "text":"houses",
                        "type":"active"
                    },
                    {
                        "source":10,
                        "target":12,
                        "text":"location",
                        "type":"active"
                    },
                    {
                        "source":11,
                        "target":12,
                        "text":"location",
                        "type":"active"
                    }
                ]
            }
        ],
            nodes = document.getElementsByClassName('graph'),
            node = nodes[0],
            size = {
                width: node.offsetWidth,
                height: node.offsetHeight
            };

        for (var i = 0; i < graphs.length; i++) {
            this.initGraph({
                node: nodes[i],
                graph: graphs[i],
                size: size
            });
        }
    },

    initHomepageGraphs: function() {
        var graphs = [
            {
                "id":1,
                "width": 562,
                "height": 400,
                "nodes":[
                    {
                        "id":0,
                        "type":"meta",
                        "text":"relation-type",
                        "x":0.8,
                        "y":0.15
                    },
                    {
                        "id":1,
                        "type":"relation-type",
                        "text":"director-ship",
                        "x":0.5,
                        "y":0.1
                    },
                    {
                        "id":2,
                        "type":"relation",
                        "text":"•",
                        "x":0.3,
                        "y":0.267
                    },
                    {
                        "id":3,
                        "type":"relation",
                        "text":"•",
                        "x":0.7,
                        "y":0.267
                    },
                    {
                        "id":4,
                        "type":"instance",
                        "text":"$x: Titanic",
                        "x":0.1,
                        "y":0.533
                    },
                    {
                        "id":5,
                        "type":"instance",
                        "text":"$y: James Cameron",
                        "x":0.5,
                        "y":0.533
                    },
                    {
                        "id":6,
                        "type":"instance",
                        "text":"$z: Avatar",
                        "x":0.9,
                        "y":0.533
                    },
                    {
                        "id":7,
                        "type":"concept-type",
                        "text":"person",
                        "x":0.15,
                        "y":0.8
                    },
                    {
                        "id":8,
                        "type":"concept-type",
                        "text":"movie",
                        "x":0.85,
                        "y":0.8
                    },
                    {
                        "id":9,
                        "type":"meta",
                        "text":"concept-type",
                        "x":0.5,
                        "y":0.9
                    }
                ],
                "edges":[
                    {
                        "source":1,
                        "target":0,
                        "text":"isa"
                    },
                    {
                        "source":2,
                        "target":1,
                        "text":"isa"
                    },
                    {
                        "source":3,
                        "target":1,
                        "text":"isa"
                    },
                    {
                        "source":3,
                        "target":5,
                        "text":"director",
                        "type":"active"
                    },
                    {
                        "source":3,
                        "target":6,
                        "text":"movie-directed",
                        "type":"active"
                    },
                    {
                        "source":2,
                        "target":4,
                        "text":"movie-directed",
                        "type":"active"
                    },
                    {
                        "source":2,
                        "target":5,
                        "text":"director",
                        "type":"active"
                    },
                    {
                        "source":4,
                        "target":8,
                        "text":"isa"
                    },
                    {
                        "source":6,
                        "target":8,
                        "text":"isa"
                    },
                    {
                        "source":5,
                        "target":7,
                        "text":"isa"
                    },
                    {
                        "source":7,
                        "target":9,
                        "text":"isa"
                    },
                    {
                        "source":8,
                        "target":9,
                        "text":"isa"
                    }
                ]
            },
            {
                "id":2,
                "width": 562,
                "height": 400,
                "nodes":[
                    {
                        "id":0,
                        "type":"meta",
                        "text":"concept-type",
                        "x":0.2,
                        "y":0.15
                    },
                    {
                        "id":1,
                        "type":"concept-type",
                        "text":"movie",
                        "x":0.1,
                        "y":0.5
                    },
                    {
                        "id":2,
                        "type":"instance",
                        "text":"$x: id1234",
                        "x":0.2,
                        "y":0.85
                    },
                    {
                        "id":3,
                        "type":"relation",
                        "text":"has",
                        "x":0.37,
                        "y":0.1
                    },
                    {
                        "id":4,
                        "type":"relation",
                        "text":"has",
                        "x":0.32,
                        "y":0.5
                    },
                    {
                        "id":5,
                        "type":"relation",
                        "text":"has",
                        "x":0.37,
                        "y":0.9
                    },
                    {
                        "id":6,
                        "type":"resource",
                        "text":"8.3",
                        "x":0.57,
                        "y":0.1
                    },
                    {
                        "id":7,
                        "type":"resource",
                        "text":"The Martian",
                        "x":0.5,
                        "y":0.5
                    },
                    {
                        "id":8,
                        "type":"resource",
                        "text":"30 Sep 2015",
                        "x":0.57,
                        "y":0.9
                    },
                    {
                        "id":9,
                        "type":"resource-type",
                        "text":"rating",
                        "x":0.8,
                        "y":0.15
                    },
                    {
                        "id":10,
                        "type":"resource-type",
                        "text":"title",
                        "x":0.7,
                        "y":0.5
                    },
                    {
                        "id":11,
                        "type":"resource-type",
                        "text":"release-date",
                        "x":0.8,
                        "y":0.85
                    },
                    {
                        "id":12,
                        "type":"meta",
                        "text":"resource-type",
                        "x":0.9,
                        "y":0.5
                    }
                ],
                "edges":[
                    {
                        "source":1,
                        "target":0,
                        "text":"isa"
                    },
                    {
                        "source":2,
                        "target":1,
                        "text":"isa",
                        "type":"active"
                    },
                    {
                        "source":3,
                        "target":2,
                        "text":"owner"
                    },
                    {
                        "source":4,
                        "target":2,
                        "text":"owner",
                        "type":"active"
                    },
                    {
                        "source":5,
                        "target":2,
                        "text":"owner"
                    },
                    {
                        "source":3,
                        "target":6,
                        "text":"value"
                    },
                    {
                        "source":4,
                        "target":7,
                        "text":"value",
                        "type":"active"
                    },
                    {
                        "source":5,
                        "target":8,
                        "text":"value"
                    },
                    {
                        "source":6,
                        "target":9,
                        "text":"isa"
                    },
                    {
                        "source":7,
                        "target":10,
                        "text":"isa",
                        "type":"active"
                    },
                    {
                        "source":8,
                        "target":11,
                        "text":"isa"
                    },
                    {
                        "source":9,
                        "target":12,
                        "text":"isa"
                    },
                    {
                        "source":10,
                        "target":12,
                        "text":"isa"
                    },
                    {
                        "source":11,
                        "target":12,
                        "text":"isa"
                    }
                ]
            },
            {
                "id":3,
                "width": 562,
                "height": 400,
                "nodes":[
                    {
                        "id":0,
                        "type":"meta",
                        "text":"relation-type",
                        "x":0.5,
                        "y":0.1
                    },
                    {
                        "id":1,
                        "type":"relation-type",
                        "text":"director-ship",
                        "x":0.2,
                        "y":0.2
                    },
                    {
                        "id":2,
                        "type":"relation-type",
                        "text":"casting",
                        "x":0.8,
                        "y":0.2
                    },
                    {
                        "id":3,
                        "type":"relation",
                        "text":"•",
                        "x":0.3,
                        "y":0.36
                    },
                    {
                        "id":4,
                        "type":"relation",
                        "text":"•",
                        "x":0.7,
                        "y":0.36
                    },
                    {
                        "id":5,
                        "type":"instance",
                        "text":"$z: Ang Lee",
                        "x":0.1,
                        "y":0.56
                    },
                    {
                        "id":6,
                        "type":"instance",
                        "text":"$y: Life of Pi",
                        "x":0.5,
                        "y":0.56
                    },
                    {
                        "id":7,
                        "type":"instance",
                        "text":"$y: Irrfan Khan",
                        "x":0.9,
                        "y":0.56
                    },
                    {
                        "id":8,
                        "type":"concept-type",
                        "text":"person",
                        "x":0.2,
                        "y":0.8
                    },
                    {
                        "id":9,
                        "type":"concept-type",
                        "text":"movie",
                        "x":0.8,
                        "y":0.8
                    },
                    {
                        "id":10,
                        "type":"meta",
                        "text":"concept-type",
                        "x":0.5,
                        "y":0.9
                    }
                ],
                "edges":[
                    {
                        "source":1,
                        "target":0,
                        "text":"isa"
                    },
                    {
                        "source":2,
                        "target":0,
                        "text":"isa"
                    },
                    {
                        "source":3,
                        "target":1,
                        "text":"isa"
                    },
                    {
                        "source":3,
                        "target":5,
                        "text":"director",
                        "type":"active"
                    },
                    {
                        "source":3,
                        "target":6,
                        "text":"movie-directed",
                        "type":"active"
                    },
                    {
                        "source":4,
                        "target":2,
                        "text":"isa"
                    },
                    {
                        "source":4,
                        "target":6,
                        "text":"movie-cast",
                        "type":"active"
                    },
                    {
                        "source":4,
                        "target":7,
                        "text":"actor",
                        "type":"active"
                    },
                    {
                        "source":7,
                        "target":8,
                        "text":"isa"
                    },
                    {
                        "source":6,
                        "target":9,
                        "text":"isa"
                    },
                    {
                        "source":5,
                        "target":8,
                        "text":"isa"
                    },
                    {
                        "source":9,
                        "target":10,
                        "text":"isa"
                    },
                    {
                        "source":8,
                        "target":10,
                        "text":"isa"
                    }
                ]
            },
            {
                "id":4,
                "width": 562,
                "height": 400,
                "nodes":[
                    {
                        "id":0,
                        "type":"meta",
                        "text":"concept-type",
                        "x":0.2,
                        "y":0.15
                    },
                    {
                        "id":1,
                        "type":"concept-type",
                        "text":"movie",
                        "x":0.1,
                        "y":0.5
                    },
                    {
                        "id":2,
                        "type":"instance",
                        "text":"$x",
                        "x":0.2,
                        "y":0.85
                    },

                    {
                        "id":3,
                        "type":"relation",
                        "text":"has",
                        "x":0.4,
                        "y":0.1
                    },
                    {
                        "id":4,
                        "type":"relation",
                        "text":"has",
                        "x":0.367,
                        "y":0.5
                    },
                    {
                        "id":5,
                        "type":"relation",
                        "text":"has",
                        "x":0.4,
                        "y":0.9
                    },
                    {
                        "id":6,
                        "type":"resource",
                        "text":"Friday the 13th",
                        "x":0.6,
                        "y":0.1
                    },
                    {
                        "id":7,
                        "type":"resource",
                        "text":"Slasher",
                        "x":0.633,
                        "y":0.5
                    },
                    {
                        "id":8,
                        "type":"resource",
                        "text":"Horror",
                        "x":0.6,
                        "y":0.9
                    },
                    {
                        "id":9,
                        "type":"resource-type",
                        "text":"title",
                        "x":0.8,
                        "y":0.15
                    },
                    {
                        "id":10,
                        "type":"meta",
                        "text":"resource-type",
                        "x":0.9,
                        "y":0.5
                    },
                    {
                        "id":11,
                        "type":"resource-type",
                        "text":"genre",
                        "x":0.8,
                        "y":0.85
                    }
                ],
                "edges":[
                    {
                        "source":1,
                        "target":0,
                        "text":"isa"
                    },
                    {
                        "source":2,
                        "target":1,
                        "text":"isa"
                    },
                    {
                        "source":3,
                        "target":2,
                        "text":"owner"
                    },
                    {
                        "source":4,
                        "target":2,
                        "text":"owner"
                    },
                    {
                        "source":5,
                        "target":2,
                        "text":"owner",
                        "type":"active"
                    },
                    {
                        "source":3,
                        "target":6,
                        "text":"value"
                    },
                    {
                        "source":4,
                        "target":7,
                        "text":"value"
                    },
                    {
                        "source":5,
                        "target":8,
                        "text":"value",
                        "type":"active"
                    },
                    {
                        "source":6,
                        "target":9,
                        "text":"isa"
                    },
                    {
                        "source":7,
                        "target":11,
                        "text":"isa"
                    },
                    {
                        "source":8,
                        "target":11,
                        "text":"isa",
                        "type":"active"
                    },
                    {
                        "source":9,
                        "target":10,
                        "text":"isa"
                    },
                    {
                        "source":11,
                        "target":10,
                        "text":"isa"
                    }
                ]
            },
            {
                "id":5,
                "width": 562,
                "height": 400,
                "nodes":[
                    {
                        "id":0,
                        "type":"meta",
                        "text":"concept-type",
                        "x":0.18,
                        "y":0.2
                    },
                    {
                        "id":1,
                        "type":"meta",
                        "text":"relation-type",
                        "x":0.5,
                        "y":0.1
                    },
                    {
                        "id":2,
                        "type":"relation-type",
                        "text":"director-ship",
                        "x":0.82,
                        "y":0.2
                    },
                    {
                        "id":3,
                        "type":"concept-type",
                        "text":"movie",
                        "x":0.1,
                        "y":0.6
                    },
                    {
                        "id":4,
                        "type":"relation",
                        "text":"$z",
                        "x":0.5,
                        "y":0.6
                    },
                    {
                        "id":5,
                        "type":"concept-type",
                        "text":"person",
                        "x":0.9,
                        "y":0.6
                    },
                    {
                        "id":6,
                        "type":"instance",
                        "text":"$x: Big Fish",
                        "x":0.3,
                        "y":0.9
                    },
                    {
                        "id":7,
                        "type":"instance",
                        "text":"$y: Tim Burton",
                        "x":0.7,
                        "y":0.9
                    }
                ],
                "edges":[
                    {
                        "source":2,
                        "target":1,
                        "text":"isa"
                    },
                    {
                        "source":3,
                        "target":0,
                        "text":"isa"
                    },
                    {
                        "source":4,
                        "target":2,
                        "text":"isa"
                    },
                    {
                        "source":4,
                        "target":6,
                        "text":"movie-directed",
                        "type":"active"
                    },
                    {
                        "source":4,
                        "target":7,
                        "text":"director",
                        "type":"active"
                    },
                    {
                        "source":5,
                        "target":0,
                        "text":"isa"
                    },
                    {
                        "source":6,
                        "target":3,
                        "text":"isa",
                        "type":"active"
                    },
                    {
                        "source":7,
                        "target":5,
                        "text":"isa",
                        "type":"active"
                    }
                ]
            }
        ],
        nodes = document.getElementsByClassName('graph'),
        node = nodes[0],
        size = {
            width: node.children[0].offsetWidth,
            height: node.children[0].offsetHeight
        };

        for (var i = 0; i < graphs.length; i++) {
            this.initGraph({
                node: nodes[i].children[0],
                graph: graphs[i],
                size: size
            });
        }
    },

    initPrism: function() {

        var textareas = document.getElementsByClassName('code-input');

        function renderOutput(input) {
            var value = input.value;

            value = value
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;") + "\n";

            $(input).next().children(0)[0].innerHTML = value;

            Prism.highlightAll();
        }

        function listenForInput(input) {

            function replicate(event) {

                var selStartPos = this.selectionStart,
                    inputVal = this.value;

                inputVal = inputVal.replace(/\t/g, '    ');
                this.value = inputVal;

                if (event.keyCode === 9) {
                    this.value = inputVal.substring(0, selStartPos) + '    ' + inputVal.substring(selStartPos, this.value.length);
                    this.selectionStart = selStartPos + 4;
                    this.selectionEnd = selStartPos + 4;
                    event.preventDefault();
                }

                renderOutput(this);
            }

            input.addEventListener('input', replicate, false);
            input.addEventListener('keydown', replicate, false);

            Prism.highlightAll();
        }

        function listenerForScroll(input) {
            input.addEventListener('scroll', function(event) {
                $(this).next()[0].scrollTop = this.scrollTop;
            }, false);
        }

        for (var i = 0; i < textareas.length; i++) {
            renderOutput(textareas[i]);
            listenerForScroll(textareas[i]);
            //listenForInput(textareas[i]);
            //this.dontScrollParent(textareas[i]);
        }
    },

    initStack: function() {

        var data = this.data;

        function displayDescription(name) {
            var blocks = data.techDescription.children;

            for (var i = 0; i < blocks.length; i++) {
                if (blocks[i].getAttribute('data-name') !== name) {
                    blocks[i].classList.remove('active');
                } else {
                    blocks[i].classList.add('active');
                    data.techDescription.style.height = blocks[i].offsetHeight + 'px';
                }
            }
        }

        function toggleStack(event) {
            var el = getParentElement(event.target, 'tab');

            if (!el) {
                return;
            }

            var target = el.getAttribute('data-target');

            for (var i = 0; i < data.techTabs.length; i++) {
                data.techTabs[i].classList.remove('active');
            }

            el.classList.add('active');

            displayDescription(target);
        }

        data.techStack = document.getElementsByClassName('tech-stack')[0];
        data.techDescription = data.techStack.getElementsByClassName('description')[0];
        data.techTabs = data.techStack.getElementsByClassName('tab');
        data.techStack.addEventListener('click', toggleStack, false);

        displayDescription('graph');
    },

    modal: {

        _data: {},

        open: function() {

            var _this = window.MNDMPS.modal,
                data = _this._data;

            if (data.underlay.classList.contains('display')) {
                return;
            }

            if (data.sent) {
                data.sent = false;
                _this.resetForm(data.form);
            }

            clearTimeout(data.closeTimeout);

            data.underlay.classList.add('display');

            setTimeout(function() {
                data.underlay.classList.add('active');
            }, 25);
        },

        close: function() {

            var _this = window.MNDMPS.modal,
                data = _this._data;

            if (!data.underlay.classList.contains('active')) {
                return;
            }

            data.underlay.classList.remove('active');

            setTimeout(function() {
                data.underlay.classList.remove('display');
            }, 200);
        },

        closeByKey: function(event) {

            var _this = window.MNDMPS.modal;

            if (event.which === 27) {
                _this.close();
            }
        },

        resetForm: function(form) {

            var data = window.MNDMPS.modal._data,
                inputs = [].slice.call(form.getElementsByTagName('input'), 0);

            inputs.push(form.getElementsByTagName('textarea')[0]);

            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].type !== 'submit') {
                    inputs[i].value = '';
                }
            }

            data.sendButton.classList.remove('disabled');
            data.sendButton.classList.remove('done');
        },

        init: function() {

            var _this = this,
                data = this._data;

            data.underlay = document.getElementsByClassName('modal-underlay')[0];
            data.modal = data.underlay.children[0];
            data.form = data.modal.getElementsByTagName('form')[0];
            data.sendButton = data.form.getElementsByClassName('sendButton')[0];

            data.sendButton.addEventListener('click', function(event) {
                event.preventDefault();

                if (this.classList.contains('disabled')) {
                    return;
                }

                this.classList.add('disabled');

                window.MNDMPS.ajax.sendSubscribe({
                    data: serializeObject($(data.form))
                }).then(
                    function(response) {
                        data.sent = true;
                        data.sendButton.classList.add('done');

                        data.closeTimeout = setTimeout(function() {
                            _this.close();
                        }, 1500);
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }, false);

            data.underlay.addEventListener('click', function(event) {
                if (!event.target.classList.contains('modal-underlay') && !event.target.classList.contains('modal-close')) {
                    return;
                }

                _this.close();
            }, false);

            document.addEventListener('keydown', this.closeByKey, false);

            dontScrollParent(data.underlay);
        }
    },

    ajax: {

        _data: {},

        call: function(obj) {

            var promise = new Promise(function(resolve, reject) {

                var client = new XMLHttpRequest();
                client.open(obj.method, obj.url, true);

                if (obj.contentType) {
                    client.setRequestHeader("Content-type", obj.contentType);
                }

                client.send(obj.data);

                client.onload = function() {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(this.response);
                    } else {
                        reject(this.statusText);
                    }
                };

                client.onerror = function() {
                    reject(this.statusText);
                };
            });

            return promise;
        },

        getAngelJobs: function() {

            return this.call({
                method: 'GET',
                url: '/angel_jobs.php'
            });
        },

        sendSubscribe: function(obj) {

            return this.call({
                method: 'POST',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify(obj.data),
                url: '/mail/'
            });
        }
    },

    initJobs: function() {

        var data = this.data,
            domParser = new DOMParser(),
            loading = document.getElementsByClassName('loading')[0];

        data.jobsBlock = document.getElementById('section-jobs').children[0];

        function kFormatter(num) {
            num = parseInt(num, 10);
            var newNum = num > 999 ? Math.floor(num/1000) : num;

            return newNum + 'K';
        }

        function timeFormatter(date) {
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            var date = new Date(date),
                day = date.getDate(),
                monthIndex = date.getMonth(),
                year = date.getFullYear();

            return newDate = day + ' ' + monthNames[monthIndex] + ' ' + year;
        }

        function generateJob(obj) {
            var jobBlock = document.createElement('div');
            jobBlock.classList.add('job');

            jobBlock.innerHTML = '<h3>' + obj.title + '</h3>\
                <div class="text-block columns">\
                    <p>' + obj.description.replace(/[0-9]+\.[^.]*\.(?!\s*[0-9])/g, "$&<br>").replace(/[0-9]+\./g, "<br>$&").replace(/\*/g, '<br>') + '</p>\
                </div>\
                <ul>\
                    <li>Updated on: ' + timeFormatter(obj.updated_at) + '</li>\
                    <li>Remote: ' + (obj.remote_ok ? 'Yes' : 'No') + '</li>\
                    <li>Type: <span class="capitalise">' + obj.job_type + '</span></li>\
                    <li>Compensation: &pound;' + kFormatter(obj.salary_min) + ' — &pound;' + kFormatter(obj.salary_max) + '</li>\
                    <li>Equity: ' + obj.equity_min + '% — ' + obj.equity_max + '%</li>\
                </ul>\
                <div class="bottomLinks">\
                    <a href="mailto:recruitment@mindmaps.io">Apply</a> or <a target="_blank" rel="nofollow" href="' + obj.angellist_url + '">Check on AngelList</a>\
                </div>';

            return jobBlock;
        }

        window.MNDMPS.ajax.getAngelJobs().then(

            function(response) {
                response = JSON.parse(response);

                data.jobsBlock.removeChild(loading);

                for (var i = 0; i < response.jobs.length; i++) {
                    data.jobsBlock.appendChild(generateJob(response.jobs[i]));
                }
            },

            function(error) {
                console.log(error);
            }
        );
    },

    initPlatform: function() {

        var examples = document.getElementsByClassName('example'),
            codes = null;

        function switchView(event) {

            var target = event.target.getAttribute('data-target');

            if (!target) {
                return;
            }

            var content = this.nextElementSibling,
                tabs = this.children,
                blocks = content.children;

            for (var i = 0; i < blocks.length; i++) {
                blocks[i].classList.remove('active');

                if (blocks[i].getAttribute('data-type') === target) {
                    blocks[i].classList.add('active');
                }
            }

            for (var i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove('active');

                if (tabs[i].getAttribute('data-target') === target) {
                    tabs[i].classList.add('active');
                }
            }
        }

        function redraw(event) {
            var el = this;

            el.style.transform = 'translateZ(0)';

            setTimeout(function() {
                el.style.transform = 'scale(1)';
            }, 0);
        }

        for (var i = 0; i < examples.length; i++) {
            examples[i].children[0].addEventListener('click', switchView, false);

            examples[i].children[0].children[0].classList.add('active');
            examples[i].children[1].children[0].classList.add('active');

            codes = examples[i].children[1].getElementsByClassName('code-output');
            for (var k = 0; k < codes.length; k++) {
                codes[k].addEventListener('scroll', redraw, false);
            }
        }
    },

    init: function() {

        this.data.windowHeight = f_clientHeight();
        this.data.windowWidth = f_clientWidth();
        this.data.menuBar = document.getElementsByClassName('nav')[0];

        if (document.getElementsByClassName('splash').length) {
            if (this.webGLAvailable()) {
                this.threeD();
            } else {
                this.appendSVGSplash();
            }
        }

        vanillaSmoothScroller.bind({
            selector: '.scrollTrigger',
            offset: function () {
                return window.MNDMPS.data.menuBar.offsetHeight;
            }
        });

        if (document.getElementById('graql-slider')) {
            this.initSlick();
            this.initHomepageGraphs();
            this.initPrism();
        }

        if (document.getElementById('section-jobs')) {
            this.initJobs();
        }

        if (document.getElementById('section-platform')) {
            this.initStack();
        }

        if (document.getElementsByClassName('splash').length) {
            this.watchScroll();
        } else {
            this.data.menuBar.classList.add('white');
        }

        if (document.getElementById('section-team')) {
            atvImg();
        }

        if (document.getElementsByClassName('modal-underlay').length) {
            this.modal.init();
        }

        if (document.getElementsByClassName('google-map')[0]) {
            google.maps.event.addDomListener(window, 'load', this.loadGoogleMap);
        }

        if (document.getElementById('section-platform-full')) {
            this.initPlatform();
            this.initPrism();
            this.initPlatformGraphs();
        }

        var getMindmapsButton = document.getElementsByClassName('getMindmaps');

        if (getMindmapsButton.length) {
            for (var i = 0; i < getMindmapsButton.length; i++) {
                getMindmapsButton[i].addEventListener('click', this.modal.open, false);
            }
        }
    }
};

window.MNDMPS.init();
