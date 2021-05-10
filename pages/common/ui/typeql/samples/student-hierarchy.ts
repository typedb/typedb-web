import { TypeQLGraph } from "../typeql-data";

export const studentHierarchyCode = `
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
  value string;`;

export const studentHierarchyGraph: TypeQLGraph = {
    "vertices": [{
        "id": 1,
        "name": "person",
        "encoding": "entity",
        "cx": 50,
        "cy": 20,
    }, {
        "id": 2,
        "name": "student",
        "encoding": "entity",
        "cx": 28,
        "cy": 50,
    }, {
        "id": 3,
        "name": "teacher",
        "encoding": "entity",
        "cx": 72,
        "cy": 50,
    }, {
        "id": 4,
        "name": "undergrad",
        "encoding": "entity",
        "cx": 17,
        "cy": 80,
    }, {
        "id": 5,
        "name": "postgrad",
        "encoding": "entity",
        "cx": 39,
        "cy": 80,
    }, {
        "id": 6,
        "name": "supervisor",
        "encoding": "entity",
        "cx": 61,
        "cy": 80,
    }, {
        "id": 7,
        "name": "professor",
        "encoding": "entity",
        "cx": 83,
        "cy": 80,
    }],
    "edges": [{
        "source": 2,
        "target": 1,
        "encoding": "sub",
    }, {
        "source": 3,
        "target": 1,
        "encoding": "sub",
    }, {
        "source": 4,
        "target": 2,
        "encoding": "sub",
    }, {
        "source": 5,
        "target": 2,
        "encoding": "sub",
    }, {
        "source": 6,
        "target": 3,
        "encoding": "sub",
    }, {
        "source": 7,
        "target": 3,
        "encoding": "sub",
    }]
};
