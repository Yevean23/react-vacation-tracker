create table users (
    id integer primary key not null,
    username text not null,
    password text not null,
    role text not null
);
insert into users (username, password, role)
values ('admin', 'admin', 'admin'),
    ('entry', 'entry', 'entry');
create table employees (
    id integer primary key not null,
    last_name text not null,
    first_name text not null,
    active text not null
);
insert into employees (first_name, last_name, active)
values ('Spider', 'man', 'N'),
    ('Tony', 'Stark', 'N'),
    ('Jean', 'Grey', 'Y');
create table vacation_types(
    id integer primary key not null,
    name text not null,
    short_name text not null,
    color text not null
);
insert into vacation_types (name, short_name, color)
values ('Long-term Vacation', 'V', 'green'),
    ('Holiday', 'H', 'orange'),
    ('Sick Leave', 'S', 'red'),
    ('FMLA', 'F', 'blue'),
    ('Not Employeed', 'N', 'gray');
create table month_records(
    id integer primary key not null,
    employee int not null,
    month int not null,
    year int not null
);
insert into month_records (employee, year, month)
values (1, 2023, 1),
    (2, 2023, 1);
create table vacation_records(
    id integer primary key not null,
    employee int not null,
    year int not null,
    month int not null,
    day int not null,
    type int not null
);
insert into vacation_records (employee, year, month, day, type)
values (1, 2023, 1, 1, 3),
    (1, 2023, 1, 2, 3),
    (2, 2023, 1, 1, 4);