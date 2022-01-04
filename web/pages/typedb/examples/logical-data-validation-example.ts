import { TypeDBVisualiserData } from "../../../common/typedb-visualiser";

export const logicalDataValidationExampleCode = `
insert

$charlie isa person, has name "Charlie";
$dataCo isa company, has name "DataCo";
(husband: $charlie, wife: $dataCo) isa marriage; # invalid relation

commit>>

ERROR: invalid data detected during type validation
`;

export const logicalDataValidationExampleGraph: TypeDBVisualiserData.Graph = {
    "vertices": [{
        "id": 1,
        "encoding": "entityType",
        "label": "person: Charlie",
        "x": 20,
        "y": 30,
        "width": 130,
        "height": 32,
    }, {
        "id": 2,
        "label": "marriage",
        "encoding": "relationType",
        "x": 50,
        "y": 70,
        "width": 105,
        "height": 66,
    }, {
        "id": 3,
        "encoding": "entityType",
        "label": "company: DataCo",
        "x": 80,
        "y": 30,
        "width": 130,
        "height": 32,
    }],
    "edges": [{
        "source": 2,
        "target": 1,
        "label": "?",
        "highlight": "error",
    }, {
        "source": 2,
        "target": 3,
        "label": "?",
        "highlight": "error",
    }]
};
