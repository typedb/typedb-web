import {TypeQLGraph} from "../../../../common/typeql/typeql-data";

export const inferenceExampleCode = `
match

$person isa person;
$uk isa country, has name "UK";
($person, $uk) isa location;
get $person;

answers>>

$person isa teacher, has name "Alice";
$person isa postgrad, has name "Bob";`;

export const inferenceExampleGraph: TypeQLGraph = {
    "vertices": [{
        "id": 1,
        "text": "teacher: Alice",
        "encoding": "entity",
        "x": 20,
        "y": 10,
        "width": 156,
        "height": 32,
    }, {
        "id": 2,
        "text": "location",
        "encoding": "relation",
        "x": 50,
        "y": 30,
        "width": 105,
        "height": 66,
    }, {
        "id": 3,
        "text": "country: UK",
        "encoding": "entity",
        "x": 80,
        "y": 10,
        "width": 156,
        "height": 32,
    }, {
        "id": 4,
        "text": "location",
        "encoding": "relation",
        "x": 70,
        "y": 50,
        "width": 105,
        "height": 66,
    }, {
        "id": 5,
        "text": "city: London",
        "encoding": "entity",
        "x": 80,
        "y": 90,
        "width": 156,
        "height": 32,
    }, {
        "id": 6,
        "text": "location",
        "encoding": "relation",
        "x": 50,
        "y": 70,
        "width": 105,
        "height": 66,
    }, {
        "id": 7,
        "text": "postgrad: Bob",
        "encoding": "entity",
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
