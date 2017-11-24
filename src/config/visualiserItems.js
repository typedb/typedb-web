module.exports = {
Movies: `# get movies directed by the director of the movie Avatar
graql>>
match
$x isa movie;
$y isa person;
$z isa movie, has title "Avatar";
($x, $y) isa directorship;
($y, $z) isa directorship;
select $x;

results>>
$x isa movie, has title "Titanic";
$x isa movie, has title "Aliens";
$x isa movie, has title "Terminator 2: Judgement Day";`,
Titles: `# get the id and title of highly-rated movies released in 2015 or later

graql>>
match
$x isa movie, has title $t;
$x has rating > 8.0;
$x has release-date >= 2015-01-01;
select $t;

results>>
$t isa title, val "Star Wars: Episode VII";
$t isa title, val "Zootopia";
$t isa title, val "The Martian";`,
Casts: `# get the people in the cast of movies directed by Ang Lee

graql>>
match
$x isa person;
$y isa movie;
$z isa person has name "Ang Lee";
($x, $y) isa has-cast;
($y, $z) isa directorship;
select $x;

results>>
$x isa person, has name "Suraj Sharma";
$x isa person, has name "Irrfan Khan";
$x isa person, has name "Ayush Tandon";`,
Horror: `# associate all slasher movies with the genre horror

graql>>
insert
$horror isa inference-rule
when {
    $x isa movie has genre "Slasher";
} then {
    $x has genre "Horror";
};`,
Directorship: `# add the movie Big Fish with director Tim Burton

graql>>
insert
$x isa movie, has title "Big Fish";
$y isa person, has name "Tim Burton";
(movie-being-directed $x, director $y) isa directorship;

results>>
$x isa movie, has title "Big Fish"; $y isa movie, has name "Tim Burton";`
}