const fs = require('fs');

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let dataCollection = null;

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, dataFromFile) => {
      if (err) {
        reject(err);
        return;
      }
      
      const parsedData = JSON.parse(dataFromFile);
      resolve(parsedData);
    });
  });
}

function initialize() {
  return new Promise((resolve, reject) => {
    readFile('../data/students.json')
      .then(studentDataFromFile => {
        return readFile('../data/courses.json')
          .then(courseDataFromFile => {
            dataCollection = new Data(studentDataFromFile, courseDataFromFile);
            resolve();
          })
          .catch(error => reject(`Unable to read courses.json: ${error}`));
      })
      .catch(error => reject(`Unable to read students.json: ${error}`));
  });
}

function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students && dataCollection.students.length > 0) {
      resolve(dataCollection.students);
    } else {
      reject('No results returned');
    }
  });
}

function getTAs() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students && dataCollection.students.length > 0) {
      const tas = dataCollection.students.filter(student => student.TA);
      if (tas.length > 0) {
        resolve(tas);
      } else {
        reject('No results returned');
      }
    } else {
      reject('No results returned');
    }
  });
}

function getCourses() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.courses && dataCollection.courses.length > 0) {
      resolve(dataCollection.courses);
    } else {
      reject('No results returned');
    }
  });
}

module.exports = {
  initialize,
  getAllStudents,
  getTAs,
  getCourses
};

