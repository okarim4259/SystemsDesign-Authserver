select * from user_account
select * from address
select * from role;
select * from permission;

CREATE EXTENSION "pgcrypto";

insert into user_account (id, userId, userName, firstName, lastName, email, password, accountType) 
	values (5, gen_random_uuid(), 'okarimDMI', 'Omar', 'Karim', 'okarim@dminc.com', '$2a$10$tVLPz1pHPDEMSyYaL27xgeKE1tS.QpCIP8mo9kZ2ZO9gT6qnUOKRC', 'local')

INSERT into ROLE (NAME) VALUES ('role_admin'), ('role_user');
INSERT into PERMISSION (NAME) VALUES
	('can_create_user'),
    ('can_update_user'),
    ('can_read_user'),
    ('can_delete_user');

select * from permission_role;


--DROP TABLE IF EXISTS U, address, role, permission, permission_role, u_roles_role CASCADE 

select * from user_account;
select * from address;
select * from role;
select * from permission;
select * from permission_role;
select * from user_account_roles_role;
select * from role_permissions_permission

INSERT into ROLE (NAME) VALUES 
    ('role_admin'), 
    ('role_user');
    ('role_super_admin')  

INSERT into PERMISSION (NAME) VALUES
	('can_post');
	('can_buy'),
    ('can_sell'),
    ('can_create'),
    ('can_read'),
	('can_update'),
	('can_delete');
    ('can_create_role');


INSERT INTO public.role_permissions_permission(
	"roleId", "permissionId")
	VALUES (1, 3), (1, 4), (1, 5), (1, 6), (2, 1), (2, 2), (2,7);