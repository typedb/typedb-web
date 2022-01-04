import { TypeDBVisualiserData } from "../../../common/typedb-visualiser/data";

export const inferenceExampleCode = `
match

$person isa person;
$uk isa country, has name "UK";
($person, $uk) isa location;
get $person;

answers>>

$person isa teacher, has name "Alice";
$person isa postgrad, has name "Bob";`;

export const inferenceExampleGraph: TypeDBVisualiserData.Graph = {
    "vertices": [{
        "id": 1,
        "label": "teacher: Alice",
        "encoding": "entityType",
        "x": 20,
        "y": 10,
        "width": 156,
        "height": 32,
    }, {
        "id": 2,
        "label": "location",
        "encoding": "relationType",
        "x": 50,
        "y": 30,
        "width": 105,
        "height": 66,
    }, {
        "id": 3,
        "label": "country: UK",
        "encoding": "entityType",
        "x": 80,
        "y": 10,
        "width": 156,
        "height": 32,
    }, {
        "id": 4,
        "label": "location",
        "encoding": "relationType",
        "x": 70,
        "y": 50,
        "width": 105,
        "height": 66,
    }, {
        "id": 5,
        "label": "city: London",
        "encoding": "entityType",
        "x": 80,
        "y": 90,
        "width": 156,
        "height": 32,
    }, {
        "id": 6,
        "label": "location",
        "encoding": "relationType",
        "x": 50,
        "y": 70,
        "width": 105,
        "height": 66,
    }, {
        "id": 7,
        "label": "postgrad: Bob",
        "encoding": "entityType",
        "x": 20,
        "y": 90,
        "width": 156,
        "height": 32,
    }],
    "edges": [{
        "source": 2,
        "target": 1,
        "label": "located",
    }, {
        "source": 2,
        "target": 3,
        "label": "locating",
    }, {
        "source": 4,
        "target": 3,
        "label": "located",
        "highlight": "inferred",
    }, {
        "source": 4,
        "target": 5,
        "label": "locating",
        "highlight": "inferred",
    }, {
        "source": 6,
        "target": 5,
        "label": "located",
        "highlight": "inferred",
    }, {
        "source": 6,
        "target": 7,
        "label": "locating",
        "highlight": "inferred",
    }]
};
