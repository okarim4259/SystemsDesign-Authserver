DROP TABLE TABLE_NAME IF EXISTS  CASCADE 

TRUNCATE user_account, user_account_roles_role;

INSERT into ROLE (NAME) VALUES 
    ('role_admin'), --1
    ('role_user'), --2
    ('role_super'); --3

INSERT into PERMISSION (NAME) VALUES 
    ('can_create'), --1
    ('can_read'), --2
	('can_update'), --3
	('can_delete'), --4
    ('can_override'), --5
	('can_alter_perms'), --6
	('can_all'); --7


INSERT INTO public.role_permissions_permission(
	"roleId", "permissionId")
	VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
		   (2, 1), (2, 2), (2, 3), (2, 4), 
		   (3, 7);