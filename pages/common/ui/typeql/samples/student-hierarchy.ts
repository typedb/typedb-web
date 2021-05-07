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
    vertices: [
        {
            id: 0,
            type: 'meta',
            text: 'relation-type',
            r: 10,
            cx: 80,
            cy: 20
        },
        {
            id: 1,
            type: 'relation-type',
            text: 'directorship',
            r: 10,
            cx: 50,
            cy: 15
        },
        {
            id: 2,
            type: 'relation',
            text: '',
            r: 2.5,
            cx: 30,
            cy: 25
        },
        {
            id: 3,
            type: 'relation',
            text: '',
            r: 2.5,
            cx: 70,
            cy: 25
        },
        {
            id: 4,
            type: 'instance',
            text: '$x: Titanic',
            r: 10,
            cx: 10,
            cy: 50
        },
        {
            id: 5,
            type: 'instance',
            text: '$y: James Cameron',
            r: 10,
            cx: 50,
            cy: 50
        },
        {
            id: 6,
            type: 'instance',
            text: '$z: Avatar',
            r: 10,
            cx: 90,
            cy: 50
        },
        {
            id: 7,
            type: 'entity-type',
            text: 'person',
            r: 10,
            cx: 15,
            cy: 75
        },
        {
            id: 8,
            type: 'entity-type',
            text: 'movie',
            r: 10,
            cx: 85,
            cy: 75
        },
        {
            id: 9,
            type: 'meta',
            text: 'entity-type',
            r: 10,
            cx: 50,
            cy: 85
        }
    ],
        edges: [
    {source: 1, target: 0, text: 'isa'},
    {source: 2, target: 1, text: 'isa'},
    {source: 3, target: 1, text: 'isa'},
    {source: 3, target: 5, text: 'director', type: 'relation'},
    {source: 3, target: 6, text: 'movie-directed', type: 'relation'},
    {source: 2, target: 4, text: 'movie-directed', type: 'relation'},
    {source: 2, target: 5, text: 'director', type: 'relation'},
    {source: 4, target: 8, text: 'isa'},
    {source: 6, target: 8, text: 'isa'},
    {source: 5, target: 7, text: 'isa'},
    {source: 7, target: 9, text: 'isa'},
    {source: 8, target: 9, text: 'isa'}
]
}

// export const studentHierarchyGraph = {
//     "vertices": [{
//         "id": 1,
//         "name": "person",
//         "encoding": "entity",
//         "fy": 72,
//     }, {
//         "id": 2,
//         "name": "student",
//         "encoding": "entity",
//         "fy": 172,
//     }, {
//         "id": 3,
//         "name": "teacher",
//         "encoding": "entity",
//         "fy": 172,
//     }, {
//         "id": 4,
//         "name": "undergrad",
//         "encoding": "entity",
//         "fy": 272,
//     }, {
//         "id": 5,
//         "name": "postgrad",
//         "encoding": "entity",
//         "fy": 272,
//     }, {
//         "id": 6,
//         "name": "supervisor",
//         "encoding": "entity",
//         "fy": 272,
//     }, {
//         "id": 7,
//         "name": "professor",
//         "encoding": "entity",
//         "fy": 272,
//     }],
//     "edges": [{
//         "source": 2,
//         "target": 1
//     }, {
//         "source": 3,
//         "target": 1
//     }, {
//         "source": 4,
//         "target": 2
//     }, {
//         "source": 5,
//         "target": 2
//     }, {
//         "source": 6,
//         "target": 3
//     }, {
//         "source": 7,
//         "target": 3
//     }]
// };
