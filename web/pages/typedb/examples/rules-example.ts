import { TypeQLGraph } from "typedb-visualiser";

export const rulesExampleCode = `
define

rule transitive-location:
when {
  (located: $x, locating: $y);
  (located: $y, locating: $z);
} then {
  (located: $x, locating: $z);
};
`;

export const rulesExampleGraph: TypeQLGraph = {
    "vertices": [{
        "id": 1,
        "encoding": "relation",
        "label": "location",
        "x": 50,
        "y": 20,
        "width": 105,
        "height": 66,
    }, {
        "id": 2,
        "encoding": "entity",
        "label": "borough: Camden",
        "x": 20,
        "y": 50,
        "width": 130,
        "height": 32,
    }, {
        "id": 3,
        "encoding": "entity",
        "label": "city: London",
        "x": 50,
        "y": 50,
        "width": 130,
        "height": 32,
    }, {
        "id": 4,
        "encoding": "entity",
        "label": "country: UK",
        "x": 80,
        "y": 50,
        "width": 130,
        "height": 32,
    }, {
        "id": 5,
        "encoding": "relation",
        "label": "location",
        "x": 35,
        "y": 80,
        "width": 105,
        "height": 66,
    }, {
        "id": 6,
        "encoding": "relation",
        "label": "location",
        "x": 65,
        "y": 80,
        "width": 105,
        "height": 66,
    }],
    "edges": [{
        "source": 1,
        "target": 2,
        "label": "located"
    }, {
        "source": 1,
        "target": 4,
        "label": "locating"
    }, {
        "source": 5,
        "target": 2,
        "label": "located"
    }, {
        "source": 5,
        "target": 3,
        "label": "locating"
    }, {
        "source": 6,
        "target": 3,
        "label": "located"
    }, {
        "source": 6,
        "target": 4,
        "label": "locating"
    }]
};
