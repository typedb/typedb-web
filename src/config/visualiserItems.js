module.exports = {
ER:{ code: `
# Entity-Relationship

define

person sub entity,
  has name,
  plays employee;

company sub entity,
  has name,
  plays employer;

employment sub relation,
  relates employee,
  relates employer;

name sub attribute,
  datatype string;

commit `,
graph: {
	nodes: [
			{
					type: 'relationship-type',
					text: 'employment',
					r: 10,
					cx: 50,
					cy: 20
			},
			{
					type: 'entity-type',
					text: 'person',
					r: 10,
					cx: 20,
					cy: 50
			},
			{
					type: 'entity-type',
					text: 'company',
					r: 10,
					cx: 80,
					cy: 50
			},
			{
					type: 'attribute-type',
					text: 'name',
					r: 10,
					cx: 50,
					cy: 80
			}
	],
	edges: [
			{source: 0, target: 1, text: 'employee'},
			{source: 0, target: 2, text: 'employer'},
			{source: 1, target: 3, text: 'has'},
			{source: 2, target: 3, text: 'has'}
	]
}
},
Types: { code: `
# Type Hierarchies

define

person sub entity,
  has first-name,
  has last-name;

student sub person;
undergrad sub student;
postgrad sub student;

teacher sub person;
supervisor sub teacher;
professor sub teacher;

commit `,
graph: {
	nodes: [
			{
					type: 'entity-type',
					text: 'person',
					r: 10,
					cx: 50,
					cy: 20
			},
			{
					type: 'entity-type',
					text: 'student',
					r: 10,
					cx: 30,
					cy: 40
			},
			{
					type: 'entity-type',
					text: 'teacher',
					r: 10,
					cx: 70,
					cy: 40
			},
			{
					type: 'entity-type',
					text: 'undergrad',
					r: 10,
					cx: 20,
					cy: 80
			},
			{
					type: 'entity-type',
					text: 'postgrad',
					r: 10,
					cx: 40,
					cy: 80
			},
			{
					type: 'entity-type',
					text: 'supervisor',
					r: 10,
					cx: 60,
					cy: 80
			},
			{
					type: 'entity-type',
					text: 'professor',
					r: 10,
					cx: 80,
					cy: 80
			}
	],
	edges: [
			{source: 1, target: 0, text: 'sub'},
			{source: 2, target: 0, text: 'sub'},
			{source: 3, target: 1, text: 'sub'},
			{source: 4, target: 1, text: 'sub'},
			{source: 5, target: 2, text: 'sub'},
			{source: 6, target: 2, text: 'sub'}
	]
}
 },
Ternary: { code: `
# Ternary Relationships

insert

$x isa person, has name "Leonardo";
$y isa movie, has title "Titanic";
$z isa figure, has name "Jack";
($x, $y, $z) isa cast, has billing-number 1;

commit `,
graph: {
	nodes: [
			{
					type: 'entity',
					text: 'person: Leonardo',
					r: 10,
					cx: 50,
					cy: 20
			},
			{
					type: 'relationship',
					text: 'cast',
					r: 8,
					cx: 50,
					cy: 50
			},
			{
					type: 'entity',
					text: 'movie: Titanic',
					r: 10,
					cx: 20,
					cy: 70
			},
			{
					type: 'entity',
					text: 'figure: Jack',
					r: 10,
					cx: 80,
					cy: 70
			},
			{
					type: 'attribute',
					text: 'billing: 1',
					r: 8,
					cx: 50,
					cy: 80
			}
	],
	edges: [
			{source: 1, target: 0, text: 'actor'},
			{source: 1, target: 2, text: 'casted'},
			{source: 1, target: 3, text: 'character'},
			{source: 1, target: 4, text: 'has'}
	]
}
},
Nested: { code:`
# Nested Relationships

insert

$a isa person, has name "Alice";
$b isa person, has name "Bob";
$m (wife: $a, husband: $b);

$c isa city, has name "London";
(located: $m, locating: $c) isa location;

commit`,
graph: {
	nodes: [
			{
					type: 'entity',
					text: 'person: Alice',
					r: 10,
					cx: 20,
					cy: 20
			},
			{
					type: 'entity',
					text: 'person: Bob',
					r: 10,
					cx: 80,
					cy: 20
			},
			{
					type: 'relationship',
					text: 'marriage',
					r: 8,
					cx: 50,
					cy: 35
			},
			{
					type: 'relationship',
					text: 'location',
					r: 8,
					cx: 35,
					cy: 65
			},
			{
					type: 'entity',
					text: 'city: London',
					r: 10,
					cx: 65,
					cy: 80
			}
	],
	edges: [
			{source: 2, target: 0, text: 'wife'},
			{source: 2, target: 1, text: 'husband'},
			{source: 3, target: 2, text: 'located'},
			{source: 3, target: 4, text: 'locating'}
	]
}
},
Rules: { code:`
# Schema Rules

define

transitive-location sub rule,
when {
  (located: $x, locating: $y);
  (located: $y, locating: $z);
},
then {
  (located: $x, locating: $z);
}

commit `,
graph: {
	nodes: [
			{
					type: 'relationship',
					text: 'location',
					r: 8,
					cx: 50,
					cy: 20
			},
			{
					type: 'entity',
					text: 'ward: Kings Cross',
					r: 10,
					cx: 20,
					cy: 50
			},
			{
					type: 'entity',
					text: 'city: London',
					r: 10,
					cx: 50,
					cy: 50
			},
			{
					type: 'entity',
					text: 'country: UK',
					r: 10,
					cx: 80,
					cy: 50
			},
			{
					type: 'relationship',
					text: 'location',
					r: 8,
					cx: 35,
					cy: 80
			},
			{
					type: 'relationship',
					text: 'location',
					r: 8,
					cx: 65,
					cy: 80
			}
	],
	edges: [
			{source: 0, target: 1, text: 'located'},
			{source: 0, target: 3, text: 'locating'},
			{source: 4, target: 1, text: 'located'},
			{source: 4, target: 2, text: 'locating'},
			{source: 5, target: 2, text: 'located'},
			{source: 5, target: 3, text: 'locating'}
	]
}
},
Inference: { code: `
# Reasoning OLTP

match
$a isa person;
$b isa country, has name "UK";
($a, $b) isa location;
get $a;

## results>>

$a isa teacher, has name "Alice";
$a isa postgrad, has name "Bob";`,
graph: {
	nodes: [
			{
					type: 'entity',
					text: 'teacher: Alice',
					r: 10,
					cx: 20,
					cy: 20
			},
			{
					type: 'entity',
					text: 'city: Cambridge',
					r: 10,
					cx: 50,
					cy: 20
			},
			{
					type: 'entity',
					text: 'country: UK',
					r: 10,
					cx: 80,
					cy: 20
			},
			{
					type: 'relationship',
					text: 'location',
					r: 8,
					cx: 35,
					cy: 35
			},
			{
					type: 'relationship',
					text: 'location',
					r: 8,
					cx: 65,
					cy: 35
			},
			{
					type: 'relationship',
					text: 'location',
					r: 8,
					cx: 75,
					cy: 50
			},
			{
					type: 'relationship',
					text: 'location',
					r: 8,
					cx: 35,
					cy: 65
			},
			{
					type: 'relationship',
					text: 'location',
					r: 8,
					cx: 65,
					cy: 65
			},
			{
					type: 'entity',
					text: 'postgrad: Bob',
					r: 10,
					cx: 20,
					cy: 80
			},
			{
					type: 'entity',
					text: 'ward: Kings Cross',
					r: 10,
					cx: 50,
					cy: 80
			},
			{
					type: 'entity',
					text: 'city: London',
					r: 10,
					cx: 80,
					cy: 80
			}
	],
	edges: [
			{source: 3, target: 0, text: 'located'},
			{source: 3, target: 1, text: 'locating'},
			{source: 4, target: 1, text: 'located'},
			{source: 4, target: 2, text: 'locating'},
			{source: 6, target: 8, text: 'located'},
			{source: 6, target: 9, text: 'locating'},
			{source: 7, target: 9, text: 'located'},
			{source: 7, target: 10, text: 'locating'},
			{source: 5, target: 2, text: 'locating'},
			{source: 5, target: 10, text: 'located'}
	]
}
 },
Analytics: { code:`
# Analytics OLAP

compute cluster in movie, cast, person;

## results>>

"Titanic": {
  "Titanic",
  "Kate",
  "Leonardo"
}
"Al Pacino": {
  "Al Pacino",
  "Godfather",
  "Scarface"
}`,
graph: {
	nodes: [
			{
					type: 'entity',
					text: 'movie: Titanic',
					r: 10,
					cx: 20,
					cy: 20
			},
			{
					type: 'entity',
					text: 'person: Leonardo',
					r: 10,
					cx: 55,
					cy: 20
			},
			{
					type: 'entity',
					text: 'person: Al Pacino',
					r: 10,
					cx: 80,
					cy: 20
			},
			{
					type: 'relationship',
					text: 'cast',
					r: 8,
					cx: 37,
					cy: 35
			},
			{
					type: 'relationship',
					text: 'cast',
					r: 8,
					cx: 25,
					cy: 50
			},
			{
					type: 'relationship',
					text: 'cast',
					r: 8,
					cx: 55,
					cy: 50
			},
			{
					type: 'relationship',
					text: 'cast',
					r: 8,
					cx: 75,
					cy: 50
			},
			{
					type: 'entity',
					text: 'person: Kate',
					r: 10,
					cx: 20,
					cy: 80
			},
			{
					type: 'entity',
					text: 'movie: Scarface',
					r: 10,
					cx: 50,
					cy: 80
			},
			{
					type: 'entity',
					text: 'movie: The Godfather',
					r: 10,
					cx: 80,
					cy: 80
			}
	],
	edges: [
			{source: 3, target: 0, text: 'casted'},
			{source: 3, target: 1, text: 'actor'},
			{source: 4, target: 0, text: 'casted'},
			{source: 4, target: 7, text: 'actor'},
			{source: 5, target: 2, text: 'actor'},
			{source: 5, target: 8, text: 'casted'},
			{source: 6, target: 2, text: 'actor'},
			{source: 6, target: 9, text: 'casted'},
	]
}
}
}
