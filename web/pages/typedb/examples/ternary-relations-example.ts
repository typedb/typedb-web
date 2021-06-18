import {TypeQLGraph} from "../../../common/typeql/typeql-data";

export const ternaryRelationsExampleCode = `
match
 
$person isa person, has name "Leonardo";
$character isa character, has name "Jack";
$movie isa movie;
(actor: $person, character: $character, movie: $movie) isa cast;
get $movie;
 
answers>>
 
$movie isa movie, has name "Titanic";
`;

export const ternaryRelationsExampleGraph: TypeQLGraph = {
    "vertices": [{
        "id": 1,
        "encoding": "entity",
        "label": "person: Leonardo",
        "x": 50,
        "y": 20,
        "width": 140,
        "height": 32,
    }, {
        "id": 2,
        "encoding": "relation",
        "label": "cast",
        "x": 50,
        "y": 50,
        "width": 105,
        "height": 66,
    }, {
        "id": 3,
        "encoding": "entity",
        "label": "movie: Titanic",
        "x": 20,
        "y": 70,
        "width": 140,
        "height": 32,
    }, {
        "id": 4,
        "encoding": "entity",
        "label": "character: Jack",
        "x": 80,
        "y": 70,
        "width": 140,
        "height": 32,
    }, {
        "id": 5,
        "encoding": "attribute",
        "label": "billing: 1",
        "x": 50,
        "y": 80,
        "width": 120,
        "height": 32,
    }],
    "edges": [{
        "source": 2,
        "target": 1,
        "label": "actor"
    }, {
        "source": 2,
        "target": 3,
        "label": "movie"
    }, {
        "source": 2,
        "target": 4,
        "label": "character"
    }, {
        "source": 2,
        "target": 5,
        "label": "has"
    }]
};
