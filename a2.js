const collegeData = require('./collegeData');

collegeData.initialize()
  .then(() => {
    console.log('Data initialization successful.');

    collegeData.getAllStudents()
      .then(students => {
        console.log(`Successfully retrieved ${students.length} students`);
      })
      .catch(error => {
        console.log(`Error retrieving students: ${error}`);
      });

    collegeData.getCourses()
      .then(courses => {
        console.log(`Successfully retrieved ${courses.length} courses`);
      })
      .catch(error => {
        console.log(`Error retrieving courses: ${error}`);
      });

    collegeData.getTAs()
      .then(tas => {
        console.log(`Successfully retrieved ${tas.length} TAs`);
      })
      .catch(error => {
        console.log(`Error retrieving TAs: ${error}`);
      });
  })
  .catch(error => {
    console.log(`Data initialization failed: ${error}`);
  });

