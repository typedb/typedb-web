![](https://academy.datastax.com/sites/default/files/tinkerpop-modern.png
)

    
    

``` sql 

insert person isa entity-type;
insert software isa entity-type;

insert programming isa relation-type;
insert programmer isa role-type;
insert programmed isa role-type;
insert programming has-role programmer, has-role programmed;
insert person plays-role programmer;
insert software plays-role programmed;

insert friendship isa relation-type;
insert friend isa role-type;
insert friendship has-role friend, has-role friend;
insert person plays-role friend;


insert age isa resource-type, datatype long;
insert person has-resource age;

insert lang isa resource-type, datatype string;
insert software has-resource lang;


insert "marko" isa person;
insert "vadas" isa person;
insert "josh" isa person;
insert "peter" isa person;

insert "lop" isa software;
insert "ripple" isa software;

insert (programmer "marko", programmed "lop") isa programming;
insert (programmer "peter", programmed "lop") isa programming;
insert (programmer "josh", programmed "lop") isa programming;
insert (programmer "josh", programmed "ripple") isa programming;


insert (friend "marko", friend "josh") isa friendship;
insert (friend "marko", friend "vadas") isa friendship;

insert "marko" has age "29";
insert "josh" has age "32";
insert "vadas" has age "27";
insert "peter" has age "35";

insert "lop" has lang "java";
insert "ripple" has lang "java";
```   




### Assumptions 
We have used the person/software name as their id, rather than ascribe them numbers and used a resource-type for their name

We have not used "weight"

We have a symmetrical "friend" relationship in friendship
