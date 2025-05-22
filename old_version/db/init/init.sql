-- Создание перечислений
CREATE TYPE user_role AS ENUM ('guest', 'client', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'preparing', 'delivering', 'completed', 'cancelled');

-- Рестораны
CREATE TABLE IF NOT EXISTS restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    cuisine_type VARCHAR(100)
);

-- Типы блюд
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

-- Связь ресторанов и блюд
CREATE TABLE IF NOT EXISTS restaurant_dishes (
    restaurant_id INT REFERENCES restaurants(id),
    dish_id INT REFERENCES dishes(id),
    name VARCHAR(255),
    PRIMARY KEY (restaurant_id, dish_id)
);

-- Пользователи
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role user_role DEFAULT 'client',
    created_at TIMESTAMP DEFAULT now()
);

-- Клиенты
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- Заказы
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    client_id INT REFERENCES clients(id) ON DELETE SET NULL,
    items JSONB NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    status order_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Позиции заказа
CREATE TABLE IF NOT EXISTS order_items (
    order_id INT REFERENCES orders(id),
    dish_id INT REFERENCES dishes(id),
    quantity INT,
    PRIMARY KEY (order_id, dish_id)
);

-- Индексы для ускорения поиска
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

-- Представление для детальной информации о заказах
CREATE OR REPLACE VIEW order_details AS
SELECT 
    o.id AS order_id,
    o.created_at,
    o.total_price,
    o.status,
    c.id AS client_id,
    u.email,
    c.first_name,
    c.last_name,
    jsonb_agg(
        jsonb_build_object(
            'dish_id', oi.dish_id,
            'quantity', oi.quantity,
            'dish_name', d.name
        )
    ) AS items
FROM orders o
JOIN clients c ON o.client_id = c.id
JOIN users u ON c.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
JOIN dishes d ON oi.dish_id = d.id
GROUP BY o.id, c.id, u.email, c.first_name, c.last_name;

-- Функция для добавления ингредиента
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

-- Функция для добавления продукта
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

-- Функция для добавления блюда
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

-- Функция для добавления ресторана
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

-- Функция для регистрации пользователя
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

-- Функция для регистрации клиента
CREATE OR REPLACE FUNCTION register_client(
    in_email TEXT,
    in_password TEXT,
    in_first_name VARCHAR(100),
    in_last_name VARCHAR(100),
    in_phone VARCHAR(20),
    in_address TEXT,
    in_role user_role DEFAULT 'client'
)
RETURNS INTEGER AS $$
DECLARE
    new_user_id INTEGER;
    new_client_id INTEGER;
BEGIN
    -- Регистрируем пользователя
    INSERT INTO users (email, password, role)
    VALUES (in_email, in_password, in_role)
    RETURNING id INTO new_user_id;

    -- Создаем клиента, связанного с пользователем
    INSERT INTO clients (user_id, first_name, last_name, phone, address)
    VALUES (new_user_id, in_first_name, in_last_name, in_phone, in_address)
    RETURNING id INTO new_client_id;
    RETURN new_client_id;
END;
$$ LANGUAGE plpgsql;

-- Функция для создания заказа
CREATE OR REPLACE FUNCTION create_order(
    in_client_id INT,
    in_items JSONB,
    in_total_price NUMERIC(10,2),
    in_status order_status DEFAULT 'pending'
)
RETURNS INTEGER AS $$
DECLARE
    new_order_id INTEGER;
BEGIN
    INSERT INTO orders (client_id, items, total_price, status)
    VALUES (in_client_id, in_items, in_total_price, in_status)
    RETURNING id INTO new_order_id;
    RETURN new_order_id;
END;
$$ LANGUAGE plpgsql;