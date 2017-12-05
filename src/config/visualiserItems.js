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

employment sub relationship,
	relates employee,
	relates employer;

name sub attribute,
	datatype string;

commit `},
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

commit ` },
Ternary: { code: `
# Ternary Relationships

insert

$x isa person, has name "Leonardo";
$y isa movie, has title "Titanic";
$z isa figure, has name "Jack";
($x, $y, $z) isa cast,
	has billing-number 1;

commit `},
Nested: { code:`
# Nested Relationships

insert

$a isa person, has name "Alice";
$b isa person, has name "Bob";
$m (wife: $a, husband: $b);

$c isa city, has name "London";
(located: $m, locating: $c) isa location;

commit`},
Rules: { code:`
# Schema Rules

define

transitive-location sub rule,
when {
	(located: $x, locating: $y);
	(located: $y, locating: $z);
}
then {
	(located: $x, locating: $z);
}

commit `},
Inference: { code: `
# Reasoning OLTP

match

$a isa person;
$b isa country, has name "UK";
($a, $b) isa location;

get $a;

results>>

$a isa teacher, has name "Alice";
$a isa postgrad, has name "Bob";` },
Analytics: { code:`
# Analytics OLAP

compute cluster in movie, cast, person; member;

results>>

"Titanic": {"Titanic", "Kate", "Leonardo"}
"Al Pacino": {"Al Pacino", "Godfather", "Scarface"}`}
}