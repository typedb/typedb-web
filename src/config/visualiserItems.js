module.exports = {
Inference: `
# Reasoning OLTP

match

$a isa person;
$b isa country, has name "UK";
($a, $b) isa lives-in;

get;`,
Analytics: `
# Analytics OLAP

compute path from "user123" to "user345";`,

ER: `
# Entity-Relationship

define

person sub entity,
	has name,
	plays employee;

company sub  entity,
	has name,
	plays employer;

employment sub relationship,
	relates employee,
	relates employer;

name sub attribute,
	datatype string;

commit `,
Ternary: `
# Ternary Relationships

insert

$x isa person;
$y isa movie, has title "Titanic";
$z isa figure;
($x, $y, $z) isa cast,
	has billing-number $b;

commit`,
Nested: `
# Nested Relationships

insert

$a isa person, has name "Alice";
$b isa person, has name "Bob";
$m (wife: $a, husband: $b);

$c isa city, has name "London";
($m, $c) isa located-in;

commit`,
Rules: `
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

commit `,
Types: `
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

commit`
}