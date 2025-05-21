-- db/init/init.sql
CREATE TYPE user_role AS ENUM ('guest', 'client', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'preparing', 'delivering', 'completed', 'cancelled');

-- Рестораны
CREATE TABLE IF NOT EXISTS restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    cuisine_type VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS dish_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Блюда
CREATE TABLE IF NOT EXISTS dishes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image TEXT,
    portion_size TEXT,
    technology TEXT,
    preparation_time INT,
    dish_type_id INT REFERENCES dish_types(id),
    created_at TIMESTAMP DEFAULT now()
);

-- Продукты
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    weight INT,
    calories INT,
    quantity INT
);

-- Ингредиенты (связь блюдо - продукт)
CREATE TABLE IF NOT EXISTS ingredients (
    dish_id INT REFERENCES dishes(id),
    product_id INT REFERENCES products(id),
    amount INT,
    PRIMARY KEY (dish_id, product_id)
);

CREATE TABLE IF NOT EXISTS restaurant_dishes (
    restaurant_id INT REFERENCES restaurants(id),
    dish_id INT REFERENCES dishes(id),
    name VARCHAR(255),
    PRIMARY KEY (restaurant_id, dish_id)
);

CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE
);

-- Пользователи
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role user_role DEFAULT 'client',
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    items JSONB NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL  DEFAULT 'pending',
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    client_id INT REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS order_items (
    order_id INT REFERENCES orders(id),
    dish_id INT REFERENCES dishes(id),
    quantity INT,
    PRIMARY KEY (order_id, dish_id)
);

--Индексы для ускорения поиска
CREATE INDEX idx_dishes_name ON dishes(name);
CREATE INDEX idx_orders_client_id ON orders(client_id);
CREATE INDEX idx_menu_category_price ON dishes(dish_type_id, preparation_time);

-- Частота заказов по блюдам
CREATE OR REPLACE VIEW dish_popularity AS
SELECT
    dish_id,
    COUNT(*) AS order_count
FROM order_items
GROUP BY dish_id
ORDER BY order_count DESC;

CREATE OR REPLACE FUNCTION add_ingredient(
    in_dish_id INT,
    in_product_id INT,
    in_amount INT
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO ingredients (dish_id, product_id, amount)
    VALUES (in_dish_id, in_product_id, in_amount)
    ON CONFLICT (dish_id, product_id) DO UPDATE
    SET amount = EXCLUDED.amount;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_product(
    in_name TEXT,
    in_weight INT,
    in_calories INT,
    in_quantity INT
)
RETURNS INTEGER AS $$
DECLARE
    new_id INTEGER;
BEGIN
    INSERT INTO products (name, weight, calories, quantity)
    VALUES (in_name, in_weight, in_calories, in_quantity)
    RETURNING id INTO new_id;

    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_dish(
    in_name TEXT,
    in_image TEXT,
    in_portion TEXT,
    in_tech TEXT,
    in_time INT,
    in_dish_type_id INT
)
RETURNS INTEGER AS $$
DECLARE
    new_id INTEGER;
BEGIN
    INSERT INTO dishes (name, image, portion_size, technology, preparation_time, dish_type_id)
    VALUES (in_name, in_image, in_portion, in_tech, in_time, in_dish_type_id)
    RETURNING id INTO new_id;

    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_restaurant(
    in_name TEXT,
    in_address TEXT,
    in_cuisine TEXT
)
RETURNS INTEGER AS $$
DECLARE
    new_id INTEGER;
BEGIN
    INSERT INTO restaurants (name, address, cuisine_type)
    VALUES (in_name, in_address, in_cuisine)
    RETURNING id INTO new_id;

    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION register_user(
    in_email TEXT,
    in_password TEXT,
    in_role user_role DEFAULT 'client'
)
RETURNS INTEGER AS $$
DECLARE
    new_user_id INTEGER;
BEGIN
    INSERT INTO users (email, password, role)
    VALUES (in_email, in_password, in_role)
    RETURNING id INTO new_user_id;

    RETURN new_user_id;
END;
$$ LANGUAGE plpgsql;
