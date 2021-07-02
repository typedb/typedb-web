import {TypeQLGraph} from "../../../common/typeql/typeql-data";

export const typeHierarchyExampleCode = `
define

person sub entity,
  owns first-name,
  owns last-name;

student sub person;
undergrad sub student;
postgrad sub student;

teacher sub person;
supervisor sub teacher;
professor sub teacher;
`;

export const typeHierarchyExampleGraph: TypeQLGraph = {
    "vertices": [{
        "id": 1,
        "label": "person",
        "encoding": "entity",
        "x": 50,
        "y": 20,
        "width": 100,
        "height": 32,
    }, {
        "id": 2,
        "label": "student",
        "encoding": "entity",
        "x": 28,
        "y": 50,
        "width": 100,
        "height": 32,
    }, {
        "id": 3,
        "label": "teacher",
        "encoding": "entity",
        "x": 72,
        "y": 50,
        "width": 100,
        "height": 32,
    }, {
        "id": 4,
        "label": "undergrad",
        "encoding": "entity",
        "x": 17,
        "y": 80,
        "width": 100,
        "height": 32,
    }, {
        "id": 5,
        "label": "postgrad",
        "encoding": "entity",
        "x": 39,
        "y": 80,
        "width": 100,
        "height": 32,
    }, {
        "id": 6,
        "label": "supervisor",
        "encoding": "entity",
        "x": 61,
        "y": 80,
        "width": 100,
        "height": 32,
    }, {
        "id": 7,
        "label": "professor",
        "encoding": "entity",
        "x": 83,
        "y": 80,
        "width": 100,
        "height": 32,
    }],
    "edges": [{
        "source": 2,
        "target": 1,
        "label": "sub",
    }, {
        "source": 3,
        "target": 1,
        "label": "sub",
    }, {
        "source": 4,
        "target": 2,
        "label": "sub",
    }, {
        "source": 5,
        "target": 2,
        "label": "sub",
    }, {
        "source": 6,
        "target": 3,
        "label": "sub",
    }, {
        "source": 7,
        "target": 3,
        "label": "sub",
    }]
};
