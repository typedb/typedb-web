'use strict';

window.MNDMPS = window.MNDMPS || {};

window.MNDMPS.Graph._data.homepageGraphs = [
    {
        nodes: [
            {
                type: 'meta',
                text: 'relation-type',
                r: 10,
                cx: 80,
                cy: 20
            },
            {
                type: 'relation-type',
                text: 'directorship',
                r: 10,
                cx: 50,
                cy: 15
            },
            {
                type: 'relation',
                text: '',
                r: 2.5,
                cx: 30,
                cy: 25
            },
            {
                type: 'relation',
                text: '',
                r: 2.5,
                cx: 70,
                cy: 25
            },
            {
                type: 'instance',
                text: '$x: Titanic',
                r: 10,
                cx: 10,
                cy: 50
            },
            {
                type: 'instance',
                text: '$y: James Cameron',
                r: 10,
                cx: 50,
                cy: 50
            },
            {
                type: 'instance',
                text: '$z: Avatar',
                r: 10,
                cx: 90,
                cy: 50
            },
            {
                type: 'concept-type',
                text: 'person',
                r: 10,
                cx: 15,
                cy: 75
            },
            {
                type: 'concept-type',
                text: 'movie',
                r: 10,
                cx: 85,
                cy: 75
            },
            {
                type: 'meta',
                text: 'concept-type',
                r: 10,
                cx: 50,
                cy: 85
            }
        ],
        edges: [
            {source: 1, target: 0, text: 'isa'},
            {source: 2, target: 1, text: 'isa'},
            {source: 3, target: 1, text: 'isa'},
            {source: 3, target: 5, text: 'director', type: 'relation'},
            {source: 3, target: 6, text: 'movie-directed', type: 'relation'},
            {source: 2, target: 4, text: 'movie-directed', type: 'relation'},
            {source: 2, target: 5, text: 'director', type: 'relation'},
            {source: 4, target: 8, text: 'isa'},
            {source: 6, target: 8, text: 'isa'},
            {source: 5, target: 7, text: 'isa'},
            {source: 7, target: 9, text: 'isa'},
            {source: 8, target: 9, text: 'isa'}
        ]
    },
    {
        nodes: [
            {
                type: 'meta',
                text: 'concept-type',
                r: 10,
                cx: 15,
                cy: 15
            },
            {
                type: 'concept-type',
                text: 'movie',
                r: 10,
                cx: 10,
                cy: 50
            },
            {
                type: 'instance',
                text: '$x: id1234',
                r: 10,
                cx: 20,
                cy: 85
            },
            {
                type: 'relation',
                text: 'has',
                r: 8,
                cx: 30,
                cy: 15
            },
            {
                type: 'relation',
                text: 'has',
                r: 8,
                cx: 35,
                cy: 50
            },
            {
                type: 'relation',
                text: 'has',
                r: 8,
                cx: 40,
                cy: 85
            },
            {
                type: 'resource',
                text: '8.3',
                r: 10,
                cx: 55,
                cy: 15
            },
            {
                type: 'resource',
                text: 'The Martian',
                r: 10,
                cx: 52.5,
                cy: 50
            },
            {
                type: 'resource',
                text: '30 Sep 2015',
                r: 10,
                cx: 60,
                cy: 85
            },
            {
                type: 'resource-type',
                text: 'rating',
                r: 10,
                cx: 80,
                cy: 15
            },
            {
                type: 'resource-type',
                text: 'title',
                r: 10,
                cx: 70,
                cy: 50
            },
            {
                type: 'resource-type',
                text: 'release-date',
                r: 10,
                cx: 80,
                cy: 85
            },
            {
                type: 'meta',
                text: 'resource-type',
                r: 10,
                cx: 90,
                cy: 50
            }
        ],
        edges: [
            {source: 1, target: 0, text: 'isa'},
            {source: 2, target: 1, text: 'isa', type: 'relation'},
            {source: 3, target: 2, text: 'owner'},
            {source: 4, target: 2, text: 'owner', type: 'relation'},
            {source: 5, target: 2, text: 'owner'},
            {source: 3, target: 6, text: 'value'},
            {source: 4, target: 7, text: 'value', type: 'relation'},
            {source: 5, target: 8, text: 'value'},
            {source: 6, target: 9, text: 'isa'},
            {source: 7, target: 10, text: 'isa', type: 'relation'},
            {source: 8, target: 11, text: 'isa'},
            {source: 9, target: 12, text: 'isa'},
            {source: 10, target: 12, text: 'isa'},
            {source: 11, target: 12, text: 'isa'}
        ]
    },
    {
        nodes: [
            {
                type: 'meta',
                text: 'relation-type',
                r: 10,
                cx: 50,
                cy: 15
            },
            {
                type: 'relation-type',
                text: 'directorship',
                r: 10,
                cx: 20,
                cy: 20
            },
            {
                type: 'relation-type',
                text: 'casting',
                r: 10,
                cx: 80,
                cy: 20
            },
            {
                type: 'relation',
                text: '',
                r: 2.5,
                cx: 30,
                cy: 35
            },
            {
                type: 'relation',
                text: '',
                r: 2.5,
                cx: 70,
                cy: 35
            },
            {
                type: 'instance',
                text: '$z: Ang Lee',
                r: 10,
                cx: 10,
                cy: 55
            },
            {
                type: 'instance',
                text: '$y: Life of Pi',
                r: 10,
                cx: 50,
                cy: 55
            },
            {
                type: 'instance',
                text: '$y: Irrfan Khan',
                r: 10,
                cx: 90,
                cy: 55
            },
            {
                type: 'concept-type',
                text: 'person',
                r: 10,
                cx: 20,
                cy: 80
            },
            {
                type: 'concept-type',
                text: 'movie',
                r: 10,
                cx: 80,
                cy: 80
            },
            {
                type: 'meta',
                text: 'concept-type',
                r: 10,
                cx: 50,
                cy: 85
            }
        ],
        edges: [
            {source: 1, target: 0, text: 'isa'},
            {source: 2, target: 0, text: 'isa'},
            {source: 3, target: 1, text: 'isa'},
            {source: 3, target: 5, text: 'director', type: 'relation'},
            {source: 3, target: 6, text: 'movie-directed', type: 'relation'},
            {source: 4, target: 2, text: 'isa'},
            {source: 4, target: 6, text: 'movie-cast', type: 'relation'},
            {source: 4, target: 7, text: 'actor', type: 'relation'},
            {source: 7, target: 8, text: 'isa'},
            {source: 6, target: 9, text: 'isa'},
            {source: 5, target: 8, text: 'isa'},
            {source: 9, target: 10, text: 'isa'},
            {source: 8, target: 10, text: 'isa'}
        ]
    },
    {
        nodes: [
            {
                type: 'meta',
                text: 'concept-type',
                r: 10,
                cx: 20,
                cy: 15
            },
            {
                type: 'concept-type',
                text: 'movie',
                r: 10,
                cx: 10,
                cy: 50
            },
            {
                type: 'instance',
                text: '$x',
                r: 10,
                cx: 20,
                cy: 85
            },

            {
                type: 'relation',
                text: 'has',
                r: 8,
                cx: 35,
                cy: 15
            },
            {
                type: 'relation',
                text: 'has',
                r: 8,
                cx: 37.5,
                cy: 50
            },
            {
                type: 'relation',
                text: 'has',
                r: 8,
                cx: 40,
                cy: 85
            },
            {
                type: 'resource',
                text: 'Friday the 13th',
                r: 10,
                cx: 55,
                cy: 15
            },
            {
                type: 'resource',
                text: 'Slasher',
                r: 10,
                cx: 65,
                cy: 50
            },
            {
                type: 'resource',
                text: 'Horror',
                r: 10,
                cx: 60,
                cy: 85
            },
            {
                type: 'resource-type',
                text: 'title',
                r: 10,
                cx: 80,
                cy: 15
            },
            {
                type: 'meta',
                text: 'resource-type',
                r: 10,
                cx: 90,
                cy: 50
            },
            {
                type: 'resource-type',
                text: 'genre',
                r: 10,
                cx: 80,
                cy: 85
            }
        ],
        edges: [
            {source: 1, target: 0, text: 'isa'},
            {source: 2, target: 1, text: 'isa'},
            {source: 3, target: 2, text: 'owner'},
            {source: 4, target: 2, text: 'owner'},
            {source: 5, target: 2, text: 'owner', type: 'relation'},
            {source: 3, target: 6, text: 'value'},
            {source: 4, target: 7, text: 'value'},
            {source: 5, target: 8, text: 'value', type: 'relation'},
            {source: 6, target: 9, text: 'isa'},
            {source: 7, target: 11, text: 'isa'},
            {source: 8, target: 11, text: 'isa', type: 'relation'},
            {source: 9, target: 10, text: 'isa'},
            {source: 11, target: 10, text: 'isa'}
        ]
    },
    {
        nodes: [
            {
                type: 'meta',
                text: 'concept-type',
                r: 10,
                cx: 20,
                cy: 25
            },
            {
                type: 'meta',
                text: 'relation-type',
                r: 10,
                cx: 50,
                cy: 15
            },
            {
                type: 'relation-type',
                text: 'directorship',
                r: 10,
                cx: 80,
                cy: 25
            },
            {
                type: 'concept-type',
                text: 'movie',
                r: 10,
                cx: 10,
                cy: 50
            },
            {
                type: 'relation',
                text: '$z',
                r: 10,
                cx: 50,
                cy: 50
            },
            {
                type: 'concept-type',
                text: 'person',
                r: 10,
                cx: 90,
                cy: 50
            },
            {
                type: 'instance',
                text: '$x: Big Fish',
                r: 10,
                cx: 30,
                cy: 85
            },
            {
                type: 'instance',
                text: '$y: Tim Burton',
                r: 10,
                cx: 70,
                cy: 85
            }
        ],
        edges: [
            {source: 2, target: 1, text: 'isa'},
            {source: 3, target: 0, text: 'isa'},
            {source: 4, target: 2, text: 'isa'},
            {source: 4, target: 6, text: 'movie-directed', type: 'relation'},
            {source: 4, target: 7, text: 'director', type: 'relation'},
            {source: 5, target: 0, text: 'isa'},
            {source: 6, target: 3, text: 'isa', type: 'relation'},
            {source: 7, target: 5, text: 'isa', type: 'relation'}
        ]
    }
];

/*window.MNDMPS.Graph._data.platformGraphs = [
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
];*/