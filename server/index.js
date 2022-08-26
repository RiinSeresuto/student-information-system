const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const bycrypt = require("bcrypt");

const saltRounds = 10;
const app = express();
const port = 3030;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student_information_system",
});

connection.connect();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World"));

app.get("/set-default", (req, res) => {
    var password = "password";

    bycrypt.hash(password, saltRounds, (error, hash) => {
        if (error) {
            console.log("Erro on hash: " + error);
        }

        connection.query(
            "INSERT INTO administrator (email, password) VALUES ('office-admin@school.com', ?)",
            hash,
            (error, result) => console.log(result)
        );
    });

    res.send("Edited");
});

app.post("/login", (req, res) => {
    var query;
    const email = req.body.email;
    const password = req.body.password;
    const table = req.body.role;

    if (table === "administrator") {
        query =
            "SELECT administrator.email, information.id, administrator.adminID as codeID, administrator.password, information.roles, information.last_name, information.first_name FROM administrator LEFT JOIN information ON administrator.id = information.administratorID WHERE administrator.email = ?";
    } else if (table === "students") {
        query =
            "SELECT students.id as dataID, students.email, information.id, students.studentID as codeID, students.password, information.roles, information.last_name, information.first_name FROM students LEFT JOIN information ON students.id = information.studentID WHERE students.email = ?";
    } else if (table === "teachers") {
        query =
            "SELECT teachers.id as dataID, teachers.email, information.id, teachers.teacherID as codeID, teachers.password, information.roles, information.last_name, information.first_name FROM teachers LEFT JOIN information ON teachers.id = information.teacherID WHERE teachers.email = ?";
    }

    connection.query(query, email, (error, result) => {
        if (error) {
            res.send(error);
        }

        if (result.length > 0) {
            bycrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                    res.send(result);
                } else {
                    res.send(false);
                }
            });
        } else {
            res.send(false);
        }
    });
});

app.get("/get/informations/:id", (req, res) => {
    const id = req.params.id;
    const query = `SELECT id, studentID, last_name, first_name, middle_name, student_status, DATE_FORMAT(birthdate, "%M %d, %Y") as birthdate, birthplace, address, sex, phone FROM information WHERE id = ${id}`;

    connection.query(query, (error, result) => {
        res.send(result);
    });
});

app.post("/edit/information/:id", (req, res) => {
    var checkPasswordQuery;
    var changePasswordQuery;

    const id = req.params.id;
    const role = req.body.role;
    const idCode = req.body.codeID;

    const firstName = req.body.fistName;
    const middleName = req.body.middleName;
    const lastName = req.body.lastName;
    const birthplace = req.body.birthplace;
    const birthdate = req.body.birthdate;
    const address = req.body.address;
    const phone = req.body.phone;
    const sex = req.body.sex;
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;

    if (role == "Admin") {
        checkPasswordQuery = "SELECT * FROM administrator WHERE adminID = ?";
        changePasswordQuery = "UPDATE administrator SET password = ? ";
    } else if (role == "Teacher") {
        checkPasswordQuery = "SELECT * FROM teachers WHERE teacherID = ?";
        changePasswordQuery = "UPDATE teachers SET password = ? ";
    } else if (role == "Student") {
        checkPasswordQuery = "SELECT * FROM students WHERE studentID = ?";
        changePasswordQuery = "UPDATE students SET password = ? ";
    }

    connection.query(checkPasswordQuery, idCode, (error, result) => {
        bycrypt.compare(oldPassword, result[0].password, (error, response) => {
            if (response) {
                var changeQuery =
                    "UPDATE information SET last_name = ?, first_name = ?, middle_name = ?, birthdate = ?, birthplace = ?, address = ?, sex = ?, phone = ? WHERE id = ?";

                connection.query(
                    changeQuery,
                    [
                        lastName,
                        firstName,
                        middleName,
                        birthdate,
                        birthplace,
                        address,
                        sex,
                        phone,
                        id,
                    ],
                    (err, result) => {
                        if (result) {
                            bycrypt.hash(newPassword, saltRounds, (e, hash) => {
                                connection.query(changePasswordQuery, hash, (errors, success) => {
                                    if (success) {
                                        res.send(true);
                                    }
                                });
                            });
                        } else {
                            res.send(false);
                        }
                    }
                );
            } else {
                res.send(false);
            }
        });
    });
});

app.post("/post/new-person", (req, res) => {
    var setNewQuery;

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const middleName = req.body.middleName;
    const password = req.body.password;
    const email = req.body.email;
    const schoolID = req.body.schoolID;
    const role = req.body.role;

    if (role == "Admin") {
        setNewQuery = "INSERT INTO administrator (adminID, email, password) VALUES (?,?,?)";
    } else if (role == "Teacher") {
        setNewQuery = "INSERT INTO teachers (teacherID, email, password) VALUES (?,?,?)";
    } else if (role == "Student") {
        setNewQuery =
            "INSERT INTO students (studentID, email, password, sectionID) VALUES (?,?,?, 1)";
    }

    bycrypt.hash(password, saltRounds, (err, hash) => {
        connection.query(setNewQuery, [schoolID, email, hash], (error, result) => {
            if (result) {
                res.send(true);
            } else {
                res.send(false);
            }
        });
    });
});

app.post("/post/information/:id", (req, res) => {
    var query;
    const id = req.params.id;

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const middleName = req.body.middleName;
    const password = req.body.password;
    const email = req.body.email;
    const schoolID = req.body.schoolID;
    const role = req.body.role;

    console.log(id);

    if (role == "Admin") {
        query =
            "INSERT INTO information (administratorID, last_name, first_name, middle_name, roles) VALUES (?,?,?,?,?)";
    } else if (role == "Teacher") {
        query =
            "INSERT INTO information (teacherID, last_name, first_name, middle_name, roles) VALUES (?,?,?,?,?)";
    } else if (role == "Student") {
        query =
            "INSERT INTO information (studentID, last_name, first_name, middle_name, roles) VALUES (?,?,?,?,?)";
    }

    connection.query(query, [id, lastName, firstName, middleName, role], (error, result) => {
        if (result) {
            res.send(true);
        } else {
            res.send(error);
        }
    });
});

app.get("/get/user/:role/:schoolid", (req, res) => {
    var query;
    const role = req.params.role;
    const id = req.params.schoolid;

    if (role == "Admin") {
        query = "SELECT id FROM administrator WHERE adminID = ?";
    } else if (role == "Teacher") {
        query = "SELECT id FROM teachers WHERE teacherID = ?";
    } else if (role == "Student") {
        query = "SELECT id FROM students WHERE studentID = ?";
    }

    connection.query(query, id, (error, result) => {
        if (result) {
            res.send(result);
        } else {
            res.send(false);
        }
    });
});

app.get("/get/students", (rez, res) => {
    const query =
        "SELECT students.id, students.studentID, information.first_name, information.last_name, sections.section_name FROM students LEFT JOIN sections ON students.sectionID = sections.id LEFT JOIN information ON information.studentID = students.id";

    connection.query(query, (error, result) => {
        if (result) {
            res.send(result);
        } else {
            res.send(error);
        }
    });
});

app.get("/get/student/:id", (req, res) => {
    const id = req.params.id;

    const query =
        "SELECT students.id, information.last_name, information.first_name, students.sectionID, sections.section_name FROM students LEFT JOIN information ON information.studentID = students.id LEFT JOIN sections ON students.sectionID = sections.id WHERE students.id = ?";

    connection.query(query, id, (error, result) => {
        res.send(result);
    });
});

app.get("/get/sections", (req, res) => {
    const id = req.params.id;

    const query = "SELECT * FROM sections";

    connection.query(query, id, (error, result) => {
        res.send(result);
    });
});

app.get("/get/subjects", (req, res) => {
    const query = "SELECT id, subjectName FROM subjects";

    connection.query(query, (error, result) => {
        res.send(result);
    });
});

app.get("/get/subject/:id", (req, res) => {
    const id = req.params.id;

    const query = "SELECT subjectName FROM subjects WHERE id = ?";

    connection.query(query, id, (error, result) => {
        res.send(result);
    });
});

app.get("/get/teachers", (req, res) => {
    const query =
        "SELECT teachers.id, teachers.teacherID, information.first_name, information.last_name FROM teachers LEFT JOIN information ON information.teacherID = teachers.id";

    connection.query(query, (error, result) => {
        res.send(result);
    });
});

app.post("/post/section", (req, res) => {
    const id = req.body.id;
    const section = req.body.section;

    const query = "UPDATE students SET sectionID = ? WHERE id = ?";

    connection.query(query, [section, id], (error, result) => {
        if (result) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
});

app.post("/add/subject", (req, res) => {
    const studentID = req.body.studentID;
    const subjectID = req.body.subjectID;
    const teacherID = req.body.teacherID;

    const query = "INSERT INTO student_subject (studentID, subjectID, teacherID) VALUES (?, ?, ?)";

    connection.query(query, [studentID, subjectID, teacherID], (error, result) => {
        if (result) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
});

app.get("/get/assigned-subjects/:id", (req, res) => {
    const id = req.params.id;

    const query =
        "SELECT subjects.subjectCode, student_subject.id, subjects.subjectName, information.last_name, information.first_name FROM student_subject LEFT JOIN subjects ON student_subject.subjectID = subjects.id LEFT JOIN teachers ON student_subject.teacherID = teachers.id LEFT JOIN information ON information.teacherID = teachers.id WHERE student_subject.studentID = ?";

    connection.query(query, id, (error, result) => {
        if (result) {
            res.send(result);
        } else {
            res.send(error);
        }
    });
});

app.get("/delete/assigned-subject/:id", (req, res) => {
    const id = req.params.id;

    const query = "DELETE FROM student_subject WHERE id = ?";

    connection.query(query, id, (error, result) => {
        if (result) {
            res.send(result);
        } else {
            res.send(error);
        }
    });
});

app.get("/get/subject/students/:id", (req, res) => {
    const id = req.params.id;

    const query =
        "SELECT student_subject.studentID, information.id as informationID, students.sectionID, sections.section_name, information.last_name, information.first_name, subjects.id as subjectID, subjects.subjectName, year_level.yearLevel as grade_level FROM student_subject LEFT JOIN information ON information.studentID = student_subject.studentID LEFT JOIN subjects ON student_subject.subjectID = subjects.id RIGHT JOIN students ON information.studentID = students.sectionID LEFT JOIN sections ON sections.id = students.sectionID LEFT JOIN year_level ON sections.yearID = year_level.id WHERE student_subject.teacherID = ?";

    connection.query(query, id, (error, result) => {
        if (result) {
            res.send(result);
        } else {
            res.send(error);
        }
    });
});

app.post("/set/grade/:studentID", (req, res) => {
    const subjectID = req.body.subjectID;
    const studentId = req.params.studentID;
    const computedGrade = req.body.computedGrade;
    const gradingPeriod = req.body.gradingPeriod;
    const teacherID = req.body.teacherID;
    const remark = req.body.remarks;
    const yearLevel = req.body.yearLevel;

    var checkExistingDataquery = "SELECT * FROM grades WHERE subjectID = ? AND studentID = ?";

    connection.query(checkExistingDataquery, [subjectID, studentId], (error, result) => {
        if (result.length > 0) {
            let query =
                "UPDATE grades SET computedGrade = ?, remark =?  WHERE subjectID = ? AND studentID = ?";

            connection.query(
                query,
                [computedGrade, remark, subjectID, studentId],
                (err, response) => {
                    if (response) {
                        res.send(true);
                    }
                }
            );
        } else {
            let query =
                "INSERT INTO grades(subjectID, studentID, computedGrade, gradingPeriod, yearLevel, teacherID, remark) VALUE (?,?,?,?,?,?,?)";

            connection.query(
                query,
                [subjectID, studentId, computedGrade, gradingPeriod, yearLevel, teacherID, remark],
                (err, response) => {
                    if (response) {
                        res.send(true);
                    } else {
                        res.send(err);
                    }
                }
            );
        }
    });
});

app.get("/get/grade/:id", (req, res) => {
    const id = req.params.id;

    const query =
        "SELECT subjects.subjectName, subjects.subjectCode, grades.computedGrade FROM grades LEFT JOIN subjects ON grades.id = subjects.id WHERE grades.studentID = ?";

    connection.query(query, id, (error, result) => {
        if (result) {
            res.send(result);
        } else {
            res.send(error);
        }
    });
});

app.get("/get/computed-grades/:id/:year/:period", (req, res) => {
    const year = req.params.year;
    const period = req.params.period;
    const id = req.params.id;

    var query =
        "SELECT subjects.subjectName, subjects.subjectCode, grades.computedGrade, grades.remark FROM grades LEFT JOIN subjects ON grades.subjectID = subjects.id WHERE grades.gradingPeriod = ? AND grades.yearLevel = ? AND grades.studentID = ?";

    connection.query(query, [period, year, id], (error, result) => {
        if (result) {
            res.send(result);
        } else {
            res.send(error);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
