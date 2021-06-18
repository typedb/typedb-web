import {TypeQLGraph} from "../../../common/typeql/typeql-data";

export const expressivityExampleCode = `
define

person sub entity,
  owns name,
  plays employment:employee;
company sub entity,
  owns name,
  plays employment:employer;
employment sub relation,
  relates employee,
  relates employer;
name sub attribute,
  value string;
`;

export const expressivityExampleGraph: TypeQLGraph = {
    "vertices": [{
        "id": 1,
        "label": "employment",
        "encoding": "relation",
        "x": 50,
        "y": 20,
        "width": 105,
        "height": 66,
    }, {
        "id": 2,
        "encoding": "entity",
        "label": "person",
        "x": 20,
        "y": 50,
        "width": 100,
        "height": 32,
    }, {
        "id": 3,
        "encoding": "entity",
        "label": "company",
        "x": 80,
        "y": 50,
        "width": 100,
        "height": 32,
    }, {
        "id": 4,
        "encoding": "attribute",
        "label": "name",
        "x": 50,
        "y": 80,
        "width": 100,
        "height": 32,
    }],
    "edges": [{
        "source": 1,
        "target": 2,
        "label": "employee",
    }, {
        "source": 1,
        "target": 3,
        "label": "employer",
    }, {
        "source": 2,
        "target": 4,
        "label": "owns",
    }, {
        "source": 3,
        "target": 4,
        "label": "owns",
    }]
};
