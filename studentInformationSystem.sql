-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 26, 2022 at 09:42 AM
-- Server version: 5.7.33
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_information_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrator`
--

CREATE TABLE `administrator` (
  `id` int(11) NOT NULL,
  `adminID` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `administrator`
--

INSERT INTO `administrator` (`id`, `adminID`, `email`, `password`) VALUES
(1, '1232-ADMIN', 'admin@school.com', '$2b$10$67JTXTZOssCCe31XhMhLcunjiSDFETdw14XlLfyUaW.gkGdPgad6u'),
(2, '6945-ADMIN', 'office-admin@school.com', '$2b$10$67JTXTZOssCCe31XhMhLcunjiSDFETdw14XlLfyUaW.gkGdPgad6u'),
(3, '739146', 'megusta@student.school.com', '$2b$10$uQaHqcAEGY1DNAkJ1Xz8Ku/cidUl0oV9X1xq7EcMqeD9MTZzYdijy'),
(4, '568923', 'simba@student.com', '$2b$10$iCf.EOP9Il7b36yd1me9O.CKbo5JRzcCm1dxlHoe7rbNc0xfMx0Xy'),
(5, '255887', 'usamu@school.com', '$2b$10$WsqTK1s6CxNWXj6yZXmFiebI4PPrM/R21wOfgS6OCGa2VB74GHkou');

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` int(11) NOT NULL,
  `subjectID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `computedGrade` float DEFAULT NULL,
  `gradingPeriod` varchar(255) NOT NULL,
  `yearLevel` int(11) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `teacherID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id`, `subjectID`, `studentID`, `computedGrade`, `gradingPeriod`, `yearLevel`, `remark`, `teacherID`) VALUES
(1, 4, 1, 87, '1', 1, 'passed', 2),
(2, 3, 2, 86, '1', 1, 'passed', 2),
(3, 1, 1, 85, '1', 1, 'passed', 1),
(4, 2, 1, 87, '1', 1, 'passed', 20);

-- --------------------------------------------------------

--
-- Table structure for table `grading_schema`
--

CREATE TABLE `grading_schema` (
  `id` int(11) NOT NULL,
  `descriptor` varchar(255) NOT NULL,
  `min_grade` int(11) NOT NULL,
  `max_grade` int(11) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `rating` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `grading_schema`
--

INSERT INTO `grading_schema` (`id`, `descriptor`, `min_grade`, `max_grade`, `remarks`, `rating`) VALUES
(1, 'Outstanding', 90, 100, 'Passed', 'A'),
(2, 'Very Satisfactory', 85, 89, 'Passed', 'B'),
(3, 'Satisfactory', 80, 84, 'Passed', 'C'),
(4, 'Fairly Satisfactory', 75, 79, 'Passed', 'D'),
(5, 'Did Not Meet Expectations', 0, 74, 'Failed', 'E');

-- --------------------------------------------------------

--
-- Table structure for table `information`
--

CREATE TABLE `information` (
  `id` int(11) NOT NULL,
  `studentID` int(11) DEFAULT NULL,
  `administratorID` int(11) DEFAULT NULL,
  `teacherID` int(11) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `roles` varchar(255) DEFAULT NULL,
  `student_status` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `birthplace` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `information`
--

INSERT INTO `information` (`id`, `studentID`, `administratorID`, `teacherID`, `last_name`, `first_name`, `middle_name`, `roles`, `student_status`, `birthdate`, `birthplace`, `address`, `sex`, `phone`) VALUES
(1, NULL, 1, NULL, 'Baribaru', 'Riin', 'Seresuto', 'Admin', NULL, '2001-01-11', 'Tondol', 'Nibaliw Narvarte', 'Male', '09390096279'),
(2, 1, NULL, NULL, 'Lambino', 'Jamie', 'Santos', 'Student', 'Enrolled', '2008-08-13', 'Brgy. Floating, Dumadagupan City, Japangasinan', 'Brgy. Floating, Dumadagupan City, Japangasinan', 'Male', '09162635451'),
(3, NULL, NULL, 1, 'Consumision', 'Maria Juana Alejandra Leticia Margarita Leticia', NULL, 'Teacher', NULL, '1992-02-29', 'Mexico, Pampanga', 'Sabangan, Mangaldan City, Panuluan', 'Female', '150623-TEACHER'),
(4, NULL, 2, NULL, 'Santo', 'Devi', 'Lambino', 'Admin', NULL, '2000-04-18', 'St. Pinalakan', 'Ginintuan City', 'Male', '09696921463'),
(5, NULL, NULL, 2, 'Evans', 'Samantha', 'Sanchez', 'Teacher', NULL, '1984-11-30', 'City of Frowns', 'Scandrial', 'Female', '31649785256'),
(6, 2, NULL, NULL, 'Gustav', 'Rikindorf', NULL, 'Student', NULL, '2000-08-31', 'Onion Dome', 'Mangaldan City', 'Male', '09315856364'),
(7, 9, NULL, NULL, 'Magbunga', 'Perla', 'Sudon', 'Student', NULL, '2002-11-11', 'Kawayanan', 'Kawayanan', 'Female', '09164356798'),
(8, 3, NULL, NULL, 'Celeste', 'Luningning', 'Partas', 'Student', NULL, '2000-02-29', 'Alaska', 'Tondo', 'Female', '639741562648'),
(9, 5, NULL, NULL, 'Sambrano', 'Locke', NULL, 'Student', NULL, '2012-06-11', 'Lerya', 'Lagun', 'Male', '786263538468'),
(10, 8, NULL, NULL, 'Ko', 'Shiichi', NULL, 'Students', NULL, '2022-04-12', 'Japan', 'Kyoto', 'Male', '1346798293715'),
(11, NULL, NULL, 20, 'Philips', 'Luzviminda', 'Sanchez', 'Teacher', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `yearID` int(11) NOT NULL,
  `section_name` varchar(255) DEFAULT NULL,
  `section_placement` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `yearID`, `section_name`, `section_placement`) VALUES
(1, 1, 'Apple', 1),
(2, 1, 'Apricot', 2),
(3, 1, 'Banana', 3),
(4, 1, 'Caimito', 4),
(5, 1, 'Durian', 5),
(6, 1, 'Elderbery', 6),
(7, 1, 'Entawak', 7),
(8, 1, 'Feijoa', 8),
(9, 1, 'Grapefruit', 9),
(10, 1, 'Hazelnut', 10);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `studentID` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sectionID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `studentID`, `password`, `email`, `sectionID`) VALUES
(1, '101915', '$2b$10$Aeb97XnlEiK7YMjQMgviS.g314EDD75RPjFjFNb7yNxDEdJGkhH/m', 'jamie@student.school.com', 2),
(2, '718293', '$2b$10$Aeb97XnlEiK7YMjQMgviS.g314EDD75RPjFjFNb7yNxDEdJGkhH/m', 'gustav@student.school.com', 8),
(3, '467913', '$2b$10$Aeb97XnlEiK7YMjQMgviS.g314EDD75RPjFjFNb7yNxDEdJGkhH/m', 'kawan@school.com', 3),
(5, '568923', '$2b$10$Aeb97XnlEiK7YMjQMgviS.g314EDD75RPjFjFNb7yNxDEdJGkhH/m', 'simba@student.com', 1),
(8, '255887', '$2b$10$Aeb97XnlEiK7YMjQMgviS.g314EDD75RPjFjFNb7yNxDEdJGkhH/m', 'lionid@student.com', 9),
(9, '515759', '$2b$10$Aeb97XnlEiK7YMjQMgviS.g314EDD75RPjFjFNb7yNxDEdJGkhH/m', 'perla@student.school.com', 3);

-- --------------------------------------------------------

--
-- Table structure for table `student_subject`
--

CREATE TABLE `student_subject` (
  `id` int(11) NOT NULL,
  `studentID` int(11) DEFAULT NULL,
  `subjectID` int(11) DEFAULT NULL,
  `teacherID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_subject`
--

INSERT INTO `student_subject` (`id`, `studentID`, `subjectID`, `teacherID`) VALUES
(4, 1, 4, 2),
(6, 1, 2, 20),
(7, 2, 3, 2),
(8, 1, 1, 1),
(9, 1, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `subjectName` varchar(255) DEFAULT NULL,
  `subjectCode` varchar(255) DEFAULT NULL,
  `subjectInformation` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `subjectName`, `subjectCode`, `subjectInformation`) VALUES
(1, 'English', 'ENG007', 'English subject for beginers'),
(2, 'Mathematics', 'MAT007', 'Introduction to secondary level mathematics'),
(3, 'Filipino', 'FIL007', 'Pag-susuri para sa malalimang wika'),
(4, 'Science', 'SCI007', 'Science high school for beginers');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `teacherID` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `teacherID`, `password`, `email`) VALUES
(1, '060012', '$2b$10$R798crf9Sr607iiztHxlNe2pFk5VBImu7DH4ByKF.hkL851ubbOyC', 'teach@email.com'),
(2, '325498', '$2b$10$R798crf9Sr607iiztHxlNe2pFk5VBImu7DH4ByKF.hkL851ubbOyC', 'madam@email.com'),
(20, '32145-TEACHER', '$2b$10$R798crf9Sr607iiztHxlNe2pFk5VBImu7DH4ByKF.hkL851ubbOyC', 'sanchez@email.com');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_student`
--

CREATE TABLE `teacher_student` (
  `id` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  `teacherID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `year_level`
--

CREATE TABLE `year_level` (
  `id` int(11) NOT NULL,
  `yearLevel` int(11) DEFAULT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `year_level`
--

INSERT INTO `year_level` (`id`, `yearLevel`, `category`) VALUES
(1, 7, 'Junior'),
(2, 8, 'Junior'),
(3, 9, 'Junior'),
(4, 10, 'Junior'),
(5, 11, 'Senior'),
(6, 12, 'Senior');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subjectID` (`subjectID`),
  ADD KEY `studentID` (`studentID`),
  ADD KEY `teacherID` (`teacherID`);

--
-- Indexes for table `grading_schema`
--
ALTER TABLE `grading_schema`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `min_grade` (`min_grade`),
  ADD UNIQUE KEY `max_grade` (`max_grade`),
  ADD UNIQUE KEY `rating` (`rating`);

--
-- Indexes for table `information`
--
ALTER TABLE `information`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentID` (`studentID`),
  ADD KEY `administratorID` (`administratorID`),
  ADD KEY `teacherID` (`teacherID`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `yearID` (`yearID`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `sectionID` (`sectionID`);

--
-- Indexes for table `student_subject`
--
ALTER TABLE `student_subject`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentID` (`studentID`),
  ADD KEY `subjectID` (`subjectID`),
  ADD KEY `teacherID` (`teacherID`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `teacher_student`
--
ALTER TABLE `teacher_student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentID` (`studentID`),
  ADD KEY `teacherID` (`teacherID`);

--
-- Indexes for table `year_level`
--
ALTER TABLE `year_level`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrator`
--
ALTER TABLE `administrator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `grading_schema`
--
ALTER TABLE `grading_schema`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `information`
--
ALTER TABLE `information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `student_subject`
--
ALTER TABLE `student_subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `teacher_student`
--
ALTER TABLE `teacher_student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `year_level`
--
ALTER TABLE `year_level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`subjectID`) REFERENCES `subjects` (`id`),
  ADD CONSTRAINT `grades_ibfk_2` FOREIGN KEY (`studentID`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `grades_ibfk_3` FOREIGN KEY (`teacherID`) REFERENCES `teachers` (`id`);

--
-- Constraints for table `information`
--
ALTER TABLE `information`
  ADD CONSTRAINT `information_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `information_ibfk_2` FOREIGN KEY (`administratorID`) REFERENCES `administrator` (`id`),
  ADD CONSTRAINT `information_ibfk_3` FOREIGN KEY (`teacherID`) REFERENCES `teachers` (`id`);

--
-- Constraints for table `sections`
--
ALTER TABLE `sections`
  ADD CONSTRAINT `sections_ibfk_1` FOREIGN KEY (`yearID`) REFERENCES `year_level` (`id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`sectionID`) REFERENCES `sections` (`id`);

--
-- Constraints for table `student_subject`
--
ALTER TABLE `student_subject`
  ADD CONSTRAINT `student_subject_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `student_subject_ibfk_2` FOREIGN KEY (`subjectID`) REFERENCES `subjects` (`id`),
  ADD CONSTRAINT `student_subject_ibfk_3` FOREIGN KEY (`teacherID`) REFERENCES `teachers` (`id`);

--
-- Constraints for table `teacher_student`
--
ALTER TABLE `teacher_student`
  ADD CONSTRAINT `teacher_student_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `teacher_student_ibfk_2` FOREIGN KEY (`teacherID`) REFERENCES `teachers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
