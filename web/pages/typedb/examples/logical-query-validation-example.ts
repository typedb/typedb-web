import { TypeDBVisualiserData } from "../../../common/typedb-visualiser";

export const logicalQueryValidationExampleCode = `
match

$alice isa person, has name "Alice";
$bob isa person, has name "Bob";
($alice, $bob) isa marriage;
$dataCo isa company, has name "DataCo";
($bob, $dataCo) isa marriage; # invalid relation

answers>>

ERROR: unsatisfiable query detected during type resolution
`;

export const logicalQueryValidationExampleGraph: TypeDBVisualiserData.Graph = {
    "vertices": [{
        "id": 1,
        "encoding": "entityType",
        "label": "person: Alice",
        "x": 20,
        "y": 20,
        "width": 130,
        "height": 32,
    }, {
        "id": 2,
        "label": "marriage",
        "encoding": "relationType",
        "x": 55,
        "y": 20,
        "width": 105,
        "height": 66,
    }, {
        "id": 3,
        "encoding": "entityType",
        "label": "person: Bob",
        "x": 80,
        "y": 50,
        "width": 130,
        "height": 32,
    }, {
        "id": 4,
        "label": "marriage",
        "encoding": "relationType",
        "x": 55,
        "y": 80,
        "width": 105,
        "height": 66,
    }, {
        "id": 5,
        "encoding": "entityType",
        "label": "company: DataCo",
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
        "label": "?",
        "highlight": "error",
    }, {
        "source": 4,
        "target": 5,
        "label": "?",
        "highlight": "error",
    }]
};
