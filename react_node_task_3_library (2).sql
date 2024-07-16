-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2024 at 08:55 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_node_task_3_library`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_book`
--

CREATE TABLE `tbl_book` (
  `id` bigint(21) NOT NULL,
  `owner_id` bigint(21) NOT NULL,
  `name` varchar(128) NOT NULL,
  `title` varchar(128) NOT NULL,
  `author` varchar(128) NOT NULL,
  `thumbnail` varchar(128) NOT NULL,
  `pdf` varchar(128) NOT NULL,
  `pageNo` int(11) NOT NULL,
  `price` double(10,2) NOT NULL,
  `tag` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_book`
--

INSERT INTO `tbl_book` (`id`, `owner_id`, `name`, `title`, `author`, `thumbnail`, `pdf`, `pageNo`, `price`, `tag`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'Network Security', 'Guide to Computer Network Security', 'Migga Kizza', '1716915588852-thumb-book1.PNG', '1716915588884-pdf-book1.pdf', 572, 1000.00, '#security, #learning', 1, '2024-05-28 16:59:49', '2024-05-28 16:59:49'),
(2, 1, 'Computer Programming', 'Computer Programming for beginners', 'dylan mach', '1716915903348-thumb-book2.PNG', '1716915903486-pdf-book2.pdf', 477, 980.00, '#Programming, #learning', 1, '2024-05-28 17:05:03', '2024-05-28 17:05:03'),
(3, 1, 'Data Mining For Fraud and Criminal', 'analytics and information Technologies', 'christopher westphal', '1716917477646-thumb-book3.PNG', '1716917477793-pdf-book3.pdf', 450, 899.00, '#security, #learning', 1, '2024-05-28 17:31:18', '2024-05-28 17:31:18'),
(5, 1, 'JavaScript and Jquery', 'Introduction to JavaScript and Jquery', 'Jon Duckett', '1716976081047-thumb-book4.PNG', '1716976081150-pdf-book4.pdf', 100, 55.00, '#security, #learning', 0, '2024-05-29 09:48:04', '2024-05-31 09:34:51'),
(8, 1, 'JavaScript and JQuery', 'JavaScript and JQuery', 'Dev', '1717148349935-thumb-book4.PNG', '1717148350161-pdf-book4.pdf', 544, 667.02, '#security, #learning', 1, '2024-05-31 09:39:20', '2024-05-31 09:39:20');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cart`
--

CREATE TABLE `tbl_cart` (
  `id` bigint(21) NOT NULL,
  `user_id` bigint(21) NOT NULL,
  `total_cart_item` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cart_details`
--

CREATE TABLE `tbl_cart_details` (
  `id` bigint(21) NOT NULL,
  `cart_id` bigint(21) NOT NULL,
  `book_id` bigint(21) NOT NULL,
  `qty` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `tbl_cart_details`
--
DELIMITER $$
CREATE TRIGGER `cart_item_count` AFTER INSERT ON `tbl_cart_details` FOR EACH ROW UPDATE tbl_cart c
SET c.total_cart_item = (
    SELECT COUNT(cd.id) 
    FROM tbl_cart_details cd 
    WHERE cd.cart_id = NEW.cart_id
)
WHERE c.id = NEW.cart_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `cart_item_count_delete` AFTER DELETE ON `tbl_cart_details` FOR EACH ROW UPDATE tbl_cart c
SET c.total_cart_item = (
    SELECT COUNT(cd.id) 
    FROM tbl_cart_details cd 
    WHERE cd.cart_id = OLD.cart_id
)
WHERE c.id = OLD.cart_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order`
--

CREATE TABLE `tbl_order` (
  `id` bigint(21) NOT NULL,
  `user_id` bigint(21) NOT NULL,
  `seller_id` bigint(21) NOT NULL,
  `order_number` varchar(128) NOT NULL,
  `order_date` date NOT NULL,
  `total_item` int(11) NOT NULL,
  `total_amount` double(10,2) NOT NULL,
  `status` enum('Accepted','Rejected','Pending') NOT NULL,
  `reject_reason` varchar(256) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_order`
--

INSERT INTO `tbl_order` (`id`, `user_id`, `seller_id`, `order_number`, `order_date`, `total_item`, `total_amount`, `status`, `reject_reason`, `created_at`, `updated_at`) VALUES
(10, 2, 1, 'S8dpZThVcE', '2024-05-31', 1, 2940.00, 'Rejected', 'Don\'t have stock.', '2024-05-31 11:58:57', '2024-06-04 09:12:32'),
(18, 4, 1, 'F0NXSR5BSQ', '2024-06-01', 2, 4697.00, 'Accepted', '', '2024-06-01 11:00:23', '2024-06-04 09:20:30'),
(19, 2, 1, '6YXGJ1IFB5', '2024-06-01', 3, 13618.00, 'Accepted', '', '2024-06-01 11:36:25', '2024-06-04 09:13:44'),
(20, 2, 1, 'YFNJ5XXQGM', '2024-06-04', 1, 2000.00, 'Accepted', '', '2024-06-04 09:39:56', '2024-06-04 09:42:56');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order_details`
--

CREATE TABLE `tbl_order_details` (
  `id` bigint(21) NOT NULL,
  `order_id` bigint(21) NOT NULL,
  `book_id` bigint(21) NOT NULL,
  `total_qty` int(11) NOT NULL,
  `total_price` double(10,2) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_order_details`
--

INSERT INTO `tbl_order_details` (`id`, `order_id`, `book_id`, `total_qty`, `total_price`, `is_active`, `created_at`, `updated_at`) VALUES
(7, 10, 2, 3, 2940.00, 1, '2024-05-31 11:58:57', '2024-05-31 11:58:57'),
(8, 18, 3, 3, 2697.00, 1, '2024-06-01 11:00:23', '2024-06-01 11:00:23'),
(9, 18, 1, 2, 2000.00, 1, '2024-06-01 11:00:23', '2024-06-01 11:00:23'),
(10, 19, 3, 2, 1798.00, 1, '2024-06-01 11:36:25', '2024-06-01 11:36:25'),
(11, 19, 1, 3, 3000.00, 1, '2024-06-01 11:36:25', '2024-06-01 11:36:25'),
(12, 19, 2, 9, 8820.00, 1, '2024-06-01 11:36:25', '2024-06-01 11:36:25'),
(13, 20, 1, 2, 2000.00, 1, '2024-06-04 09:39:56', '2024-06-04 09:39:56');

--
-- Triggers `tbl_order_details`
--
DELIMITER $$
CREATE TRIGGER `order_item_count` AFTER INSERT ON `tbl_order_details` FOR EACH ROW UPDATE tbl_order o
SET o.total_item = (
    SELECT COUNT(od.id) 
    FROM tbl_order_details od 
    WHERE od.order_id = NEW.order_id
)
WHERE o.id = NEW.order_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `order_item_count_delete` AFTER DELETE ON `tbl_order_details` FOR EACH ROW UPDATE tbl_order o
SET o.total_item = (
    SELECT COUNT(od.id) 
    FROM tbl_order_details od 
    WHERE od.order_id = OLD.order_id
)
WHERE o.id = OLD.order_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` bigint(21) NOT NULL,
  `first_name` varchar(64) NOT NULL,
  `last_name` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `mobile_number` varchar(16) NOT NULL,
  `role` enum('Admin','User') NOT NULL,
  `token` varchar(128) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `first_name`, `last_name`, `email`, `password`, `mobile_number`, `role`, `token`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Jaydeepsinh', 'Zala', 'jaydeep@gmail.com', '3c4e2cc3ad9ff9473a53ed4825ed5a90', '1234567890', 'Admin', 'GTvbzWNTm9', 1, '2024-05-28 06:12:16', '2024-06-04 09:41:33'),
(2, 'Vatsal', 'Patel', 'vatsal@gmail.com', 'fd5f6a349ebe4ae7cf7e16a4e02754f3', '+91 123456789', 'User', 'oMl1zc4Yr2', 1, '2024-05-29 07:47:27', '2024-06-04 09:39:02'),
(4, 'jaydeep', 'Zala', 'zala@gmail.com', '3c4e2cc3ad9ff9473a53ed4825ed5a90', '+91123456789', 'User', '', 1, '2024-05-31 09:18:39', '2024-06-01 11:24:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_book`
--
ALTER TABLE `tbl_book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_cart_details`
--
ALTER TABLE `tbl_cart_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `tbl_order`
--
ALTER TABLE `tbl_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `tbl_order_details`
--
ALTER TABLE `tbl_order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_book`
--
ALTER TABLE `tbl_book`
  MODIFY `id` bigint(21) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  MODIFY `id` bigint(21) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tbl_cart_details`
--
ALTER TABLE `tbl_cart_details`
  MODIFY `id` bigint(21) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `tbl_order`
--
ALTER TABLE `tbl_order`
  MODIFY `id` bigint(21) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tbl_order_details`
--
ALTER TABLE `tbl_order_details`
  MODIFY `id` bigint(21) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` bigint(21) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_book`
--
ALTER TABLE `tbl_book`
  ADD CONSTRAINT `tbl_book_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `tbl_user` (`id`);

--
-- Constraints for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  ADD CONSTRAINT `tbl_cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`);

--
-- Constraints for table `tbl_cart_details`
--
ALTER TABLE `tbl_cart_details`
  ADD CONSTRAINT `tbl_cart_details_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `tbl_cart` (`id`),
  ADD CONSTRAINT `tbl_cart_details_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `tbl_book` (`id`);

--
-- Constraints for table `tbl_order`
--
ALTER TABLE `tbl_order`
  ADD CONSTRAINT `tbl_order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`),
  ADD CONSTRAINT `tbl_order_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `tbl_user` (`id`);

--
-- Constraints for table `tbl_order_details`
--
ALTER TABLE `tbl_order_details`
  ADD CONSTRAINT `tbl_order_details_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `tbl_book` (`id`),
  ADD CONSTRAINT `tbl_order_details_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `tbl_order` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
