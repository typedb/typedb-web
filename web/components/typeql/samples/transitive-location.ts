import { TypeQLGraph } from "../typeql-data";

export const transitiveLocationCode = `
define

rule transitive-location: when {
  (located: $x, locating: $y) isa location;
  (located: $y, locating: $z) isa location;
} then {
  (located: $x, locating: $z) isa location;
};`;

export const transitiveLocationGraph: TypeQLGraph = {
    "vertices": [{
        "id": 1,
        "text": "ward: King's Cross",
        "encoding": "entity",
        "x": 20,
        "y": 50,
        "width": 156,
        "height": 32,
    }, {
        "id": 2,
        "text": "city: London",
        "encoding": "entity",
        "x": 50,
        "y": 50,
        "width": 156,
        "height": 32,
    }, {
        "id": 3,
        "text": "country: UK",
        "encoding": "entity",
        "x": 80,
        "y": 50,
        "width": 156,
        "height": 32,
    }, {
        "id": 4,
        "text": "location",
        "encoding": "relation",
        "x": 50,
        "y": 20,
        "width": 105,
        "height": 66,
    }, {
        "id": 5,
        "text": "location",
        "encoding": "relation",
        "x": 35,
        "y": 80,
        "width": 105,
        "height": 66,
    }, {
        "id": 6,
        "text": "location",
        "encoding": "relation",
        "x": 65,
        "y": 80,
        "width": 105,
        "height": 66,
    }],
    "edges": [{
        "source": 4,
        "target": 1,
        "label": "located",
    }, {
        "source": 4,
        "target": 3,
        "label": "locating",
    }, {
        "source": 5,
        "target": 1,
        "label": "located",
    }, {
        "source": 5,
        "target": 2,
        "label": "locating",
    }, {
        "source": 6,
        "target": 2,
        "label": "located",
    }, {
        "source": 6,
        "target": 3,
        "label": "locating",
    }]
};
