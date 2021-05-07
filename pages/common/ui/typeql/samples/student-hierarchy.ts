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

export const studentHierarchyGraph = {
    "vertices": [{
        "id": 1,
        "name": "person",
        "encoding": "entity",
        "fy": 72,
    }, {
        "id": 2,
        "name": "student",
        "encoding": "entity",
        "fy": 172,
    }, {
        "id": 3,
        "name": "teacher",
        "encoding": "entity",
        "fy": 172,
    }, {
        "id": 4,
        "name": "undergrad",
        "encoding": "entity",
        "fy": 272,
    }, {
        "id": 5,
        "name": "postgrad",
        "encoding": "entity",
        "fy": 272,
    }, {
        "id": 6,
        "name": "supervisor",
        "encoding": "entity",
        "fy": 272,
    }, {
        "id": 7,
        "name": "professor",
        "encoding": "entity",
        "fy": 272,
    }],
    "edges": [{
        "source": 2,
        "target": 1
    }, {
        "source": 3,
        "target": 1
    }, {
        "source": 4,
        "target": 2
    }, {
        "source": 5,
        "target": 2
    }, {
        "source": 6,
        "target": 3
    }, {
        "source": 7,
        "target": 3
    }]
};
