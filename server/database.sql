CREATE DATABASE crm_app;

-- Employee table
-- version 1.0.0 It maight be modified my to separate tables like
-- 'employee' and 'employee_info' with one-to-one relationship 
CREATE TABLE IF NOT EXISTS employees (
    employee_id SERIAL PRIMARY KEY,
    employee_key VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(25),
    gender CHAR(6),
    dOB DATE, --date of bith
    doh DATE, --date of hire
    job_title VARCHAR(100),       -- (Future) modify job_title: crete separete table for them!
    address TEXT,
    phone_number VARCHAR(20),
    alternate_phone_number VARCHAR(20),
    country VARCHAR(50),
    salary DECIMAL(10, 2),
    status VARCHAR(10) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- Department table 
CREATE TABLE IF NOT EXISTS departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- Employee Deaprtment bridge table
CREATE TABLE IF NOT EXISTS employees_departments (
    employees_departments SERIAL PRIMARY KEY,
    employee_id INT,
    department_id INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_employees_departments_department FOREIGN KEY (department_id)
        REFERENCES departments (department_id) ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT fk_employees_departments_employee FOREIGN KEY (employee_id)
        REFERENCES employees (employee_id) ON UPDATE NO ACTION ON DELETE CASCADE
);


-- ON HOLD-- (may be We will use different strategy for roles)
-- Employees Roles bridge table 
CREATE TABLE IF NOT EXISTS employees_roles (
    employees_roles_id SERIAL PRIMARY KEY,
    employee_id INT,
    role_id INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_employees_roles_role FOREIGN KEY (role_id)
        REFERENCES roles (role_id) ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT fk_employees_roles_employee FOREIGN KEY (employee_id)
        REFERENCES employees (employee_id) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Roles table 
CREATE TABLE IF NOT EXISTS roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(25) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);




-- We decide to use another technogies for user roles and permissions
-- Roles Permissions bridge table
CREATE TABLE IF NOT EXISTS roles_permissions (
    roles_permissions_id SERIAL PRIMARY KEY,
    role_id INT,
    permission_id INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_roles_permissions_permission FOREIGN KEY (permission_id)
        REFERENCES permissions (permission_id) ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT fk_roles_permissions_role FOREIGN KEY (role_id)
        REFERENCES roles (role_id) ON UPDATE NO ACTION ON DELETE CASCADE
);


-- Permissions table 
CREATE TABLE IF NOT EXISTS permissions (
    permission_id SERIAL PRIMARY KEY,
    slug VARCHAR(60) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
);