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
        "x": 50,
        "y": 20,
    }, {
        "id": 2,
        "name": "student",
        "encoding": "entity",
        "x": 28,
        "y": 50,
    }, {
        "id": 3,
        "name": "teacher",
        "encoding": "entity",
        "x": 72,
        "y": 50,
    }, {
        "id": 4,
        "name": "undergrad",
        "encoding": "entity",
        "x": 17,
        "y": 80,
    }, {
        "id": 5,
        "name": "postgrad",
        "encoding": "entity",
        "x": 39,
        "y": 80,
    }, {
        "id": 6,
        "name": "supervisor",
        "encoding": "entity",
        "x": 61,
        "y": 80,
    }, {
        "id": 7,
        "name": "professor",
        "encoding": "entity",
        "x": 83,
        "y": 80,
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
