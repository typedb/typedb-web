import {TypeQLGraph} from "../../../common/typeql/typeql-data";

export const inferenceExampleCode = `
match
$a isa person;
$b isa country, has name "UK";
($a, $b) isa location;
get $a;


# results >>

$a isa teacher, has name "Alice";
$a isa postgrad, has name "Bob";`;

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
        "text": "city: Cambridge",
        "encoding": "entity",
        "x": 50,
        "y": 10,
        "width": 156,
        "height": 32,
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
        "text": "postgrad: Bob",
        "encoding": "entity",
        "x": 20,
        "y": 90,
        "width": 156,
        "height": 32,
    }, {
        "id": 5,
        "text": "ward: King's Cross",
        "encoding": "entity",
        "x": 50,
        "y": 90,
        "width": 156,
        "height": 32,
    }, {
        "id": 6,
        "text": "city: London",
        "encoding": "entity",
        "x": 80,
        "y": 90,
        "width": 156,
        "height": 32,
    }, {
        "id": 7,
        "text": "location",
        "encoding": "relation",
        "x": 35,
        "y": 37,
        "width": 105,
        "height": 66,
    }, {
        "id": 8,
        "text": "location",
        "encoding": "relation",
        "x": 65,
        "y": 37,
        "width": 105,
        "height": 66,
    }, {
        "id": 9,
        "text": "location",
        "encoding": "relation",
        "x": 78,
        "y": 50,
        "width": 105,
        "height": 66,
    }, {
        "id": 10,
        "text": "location",
        "encoding": "relation",
        "x": 35,
        "y": 63,
        "width": 105,
        "height": 66,
    }, {
        "id": 11,
        "text": "location",
        "encoding": "relation",
        "x": 65,
        "y": 63,
        "width": 105,
        "height": 66,
    }],
    "edges": [{
        "source": 7,
        "target": 1,
        "label": "located",
    }, {
        "source": 7,
        "target": 2,
        "label": "locating",
    }, {
        "source": 8,
        "target": 2,
        "label": "located",
    }, {
        "source": 8,
        "target": 3,
        "label": "locating",
    }, {
        "source": 9,
        "target": 6,
        "label": "located",
    }, {
        "source": 9,
        "target": 3,
        "label": "locating",
    }, {
        "source": 10,
        "target": 4,
        "label": "located",
    }, {
        "source": 10,
        "target": 5,
        "label": "locating",
    }, {
        "source": 11,
        "target": 5,
        "label": "located",
    }, {
        "source": 11,
        "target": 6,
        "label": "locating",
    }]
};
