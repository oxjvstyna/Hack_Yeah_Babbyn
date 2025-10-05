-- ========== TEST DATA ==========

-- ===== USERS =====
INSERT INTO users (id) VALUES
                           (DEFAULT), -- User 1
                           (DEFAULT), -- User 2
                           (DEFAULT); -- User 3

-- ===== COUNTRIES =====
INSERT INTO countries (iso3, name) VALUES
                                       ('USA', 'United States'),
                                       ('FRA', 'France'),
                                       ('JPN', 'Japan');

-- ===== PLACES =====
-- User 1 visited USA and France
INSERT INTO places (country_id, name, width, length, description, rating, date) VALUES
                                                                                    ((SELECT id FROM countries WHERE iso3='USA'), 'Grand Canyon', 29.0, -112.0, 'Famous canyon in Arizona', 5, '2022-05-10'),
                                                                                    ((SELECT id FROM countries WHERE iso3='FRA'), 'Eiffel Tower', 48.8584, 2.2945, 'Iconic tower in Paris', 4, '2023-08-12');

-- User 2 visited Japan
INSERT INTO places (country_id, name, width, length, description, rating, date) VALUES
    ((SELECT id FROM countries WHERE iso3='JPN'), 'Mount Fuji', 35.3606, 138.7274, 'Famous mountain', 5, '2021-11-20');

-- User 3 visited USA
INSERT INTO places (country_id, name, width, length, description, rating, date) VALUES
    ((SELECT id FROM countries WHERE iso3='USA'), 'Statue of Liberty', 40.6892, -74.0445, 'Famous statue in New York', 4, '2020-07-04');

-- ===== PLACE PHOTOS =====
INSERT INTO place_photos (place_id, url, position) VALUES
                                                       ((SELECT id FROM places WHERE name='Grand Canyon'), 'https://images.unsplash.com/photo-1615551043360-33de8b5f410c?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 0),
                                                       ((SELECT id FROM places WHERE name='Eiffel Tower'), 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', 0),
                                                       ((SELECT id FROM places WHERE name='Mount Fuji'), 'https://images.unsplash.com/photo-1579525108311-0c5730b5799d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 0),
                                                       ((SELECT id FROM places WHERE name='Statue of Liberty'), 'https://plus.unsplash.com/premium_photo-1694475364942-b755ad751a40?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 0);

-- ===== COUNTRY RATINGS =====
-- User 1 ratings
INSERT INTO country_ratings (user_id, country_id, fun_rating, security_rating) VALUES
                                                                                   (1, (SELECT id FROM countries WHERE iso3='USA'), 5, 4),
                                                                                   (1, (SELECT id FROM countries WHERE iso3='FRA'), 4, 5);

-- User 2 ratings
INSERT INTO country_ratings (user_id, country_id, fun_rating, security_rating) VALUES
    (2, (SELECT id FROM countries WHERE iso3='JPN'), 5, 5);

-- User 3 ratings
INSERT INTO country_ratings (user_id, country_id, fun_rating, security_rating) VALUES
    (3, (SELECT id FROM countries WHERE iso3='USA'), 4, 4);

-- ===== USER FRIENDS =====
INSERT INTO user_friends (user_id, friend_user_id) VALUES
                                                       (1, 2),
                                                       (2, 1),
                                                       (1, 3),
                                                       (3, 1),
                                                       (2, 3),
                                                       (3, 2);

-- ===== USER PLACES =====
-- Users visited places
INSERT INTO user_places (user_id, place_id) VALUES
                                                (1, (SELECT id FROM places WHERE name='Grand Canyon')),
                                                (1, (SELECT id FROM places WHERE name='Eiffel Tower')),
                                                (2, (SELECT id FROM places WHERE name='Mount Fuji')),
                                                (3, (SELECT id FROM places WHERE name='Statue of Liberty'));

-- ===== PLACE TRAVEL BUDDIES =====
INSERT INTO place_travel_buddies (place_id, user_id) VALUES
                                                         ((SELECT id FROM places WHERE name='Grand Canyon'), 2),
                                                         ((SELECT id FROM places WHERE name='Mount Fuji'), 1),
                                                         ((SELECT id FROM places WHERE name='Statue of Liberty'), 2);
