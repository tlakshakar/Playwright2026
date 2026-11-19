create database rahulshettyacademy;
use rahulshettyacademy;
 
CREATE TABLE Customers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    city VARCHAR(100),
    age INT
);
 
-- Table: Orders
CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT, -- Added auto-increment for easier insertion
    customer_id INT,
    subject VARCHAR(100),
    company VARCHAR(100),
    order_date DATE, -- Added an order date for potential grouping/filtering
    FOREIGN KEY (customer_id) REFERENCES Customers(id)
);
 
INSERT INTO Customers (id, name, city, age) VALUES
(1, 'Alice Smith', 'New York', 30),
(2, 'Bob Johnson', 'Los Angeles', 25),
(3, 'Charlie Brown', 'Chicago', 35),
(4, 'David Lee', 'New York', 28),
(5, 'Eve Williams', 'Houston', 32),
(6, 'Frank Miller', 'Los Angeles', 40);
 
INSERT INTO Orders (customer_id, subject, company, order_date) VALUES
(1, 'Laptop', 'Tech Solutions Inc.', '2024-01-15'),
(1, 'Software License', 'Global Software Corp', '2024-02-20'),
(2, 'Marketing Services', 'Ad Agency Pro', '2024-03-10'),
(3, 'Consulting Services', 'Business Growth Ltd.', '2024-04-01'),
(3, 'Training Program', 'EduTech Systems', '2024-05-05'),
(4, 'Web Development', 'Creative Web Design', '2024-06-12'),
(5, 'Cloud Storage', 'Data Secure Cloud', '2024-07-25'),
(2, 'Graphic Design', 'Visual Arts Studio', '2024-08-18'),
(1, 'Technical Support', 'Tech Solutions Inc.', '2024-09-01'),
(6, 'Hardware Upgrade', 'Computer Parts Plus', '2024-10-10');
 
-- Get the names of customers who have placed at least one order
SELECT name
FROM Customers
WHERE id IN (SELECT DISTINCT customer_id FROM Orders);

-- Find companies that have placed more than 1 order
SELECT company, count(*) as total_orders
FROM Orders
group by company
having count(*) > 1;