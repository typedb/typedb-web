import {TypeQLGraph} from "../../../common/typeql/typeql-data";

export const safetyExampleCode = `
match

$a isa person, has name "Alice";
$b isa person, has name "Bob";
($a, $b) isa marriage;
$d isa company, has name "DataCo";
($b, $d) isa marriage; # invalid relation

answers>>

ERROR: unsatisfiable query detected during type resolution
`;

export const safetyExampleGraph: TypeQLGraph = {
    "vertices": [{
        "id": 1,
        "encoding": "entity",
        "text": "person: Alice",
        "x": 20,
        "y": 20,
        "width": 130,
        "height": 32,
    }, {
        "id": 2,
        "text": "marriage",
        "encoding": "relation",
        "x": 55,
        "y": 20,
        "width": 105,
        "height": 66,
    }, {
        "id": 3,
        "encoding": "entity",
        "text": "person: Bob",
        "x": 80,
        "y": 50,
        "width": 130,
        "height": 32,
    }, {
        "id": 4,
        "text": "marriage",
        "encoding": "relation",
        "x": 55,
        "y": 80,
        "width": 105,
        "height": 66,
    }, {
        "id": 5,
        "encoding": "entity",
        "text": "company: DataCo",
        "x": 20,
        "y": 80,
        "width": 130,
        "height": 32,
    }],
    "edges": [{
        "source": 2,
        "target": 1,
        "label": "wife",
    }, {
        "source": 2,
        "target": 3,
        "label": "husband",
    }, {
        "source": 4,
        "target": 3,
        "label": "wife",
        "highlight": "error",
    }, {
        "source": 4,
        "target": 5,
        "label": "husband",
        "highlight": "error",
    }]
};
