import { TypeDBVisualiserData } from "typedb-visualiser";

export const nestedRelationsExampleCode = `
match
 
$alice isa person, has name "Alice";
$bob isa person, has name "Bob";
$mar ($alice, $bob) isa marriage;
$city isa city;
($mar, $city) isa located;
 
answers>>
 
$city isa city, has name "London";
`;

export const nestedRelationsExampleGraph: TypeDBVisualiserData.Graph = {
    "vertices": [{
        "id": 1,
        "encoding": "entityType",
        "label": "person: Alice",
        "x": 20,
        "y": 20,
        "width": 120,
        "height": 32,
    }, {
        "id": 2,
        "encoding": "entityType",
        "label": "person: Bob",
        "x": 80,
        "y": 20,
        "width": 120,
        "height": 32,
    }, {
        "id": 3,
        "encoding": "relationType",
        "label": "marriage",
        "x": 50,
        "y": 45,
        "width": 105,
        "height": 66,
    }, {
        "id": 4,
        "encoding": "relationType",
        "label": "location",
        "x": 30,
        "y": 80,
        "width": 105,
        "height": 66,
    }, {
        "id": 5,
        "encoding": "entityType",
        "label": "city: London",
        "x": 75,
        "y": 80,
        "width": 120,
        "height": 32,
    }],
    "edges": [{
        "source": 3,
        "target": 1,
        "label": "wife"
    }, {
        "source": 3,
        "target": 2,
        "label": "husband"
    }, {
        "source": 4,
        "target": 3,
        "label": "located"
    }, {
        "source": 4,
        "target": 5,
        "label": "locating"
    }]
};
