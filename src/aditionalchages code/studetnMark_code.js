const markAttendence = async (title, id) => {
  if (!title) {
    return Alert.alert("Select a Course");
  }

  let res = mycourses.filter((course) => course.id == id);
  let sts;
  res.forEach((d) => {
    sts = d.value.students;
  });

  let value = sts?.filter(
    (studentVal) =>
      studentVal.studentMail == validuser &&
      studentVal.presentDate.toDate().toLocaleDateString() ==
        d.toLocaleDateString()
  );

  if (value.length >= 1) {
    navigation.navigate("studentattendence", {
      selectedCourse: title,
      courseId: id,
      alreadyPresentToday: true,
    });
    Alert.alert("already present done today");
  }

  if (value.length == 0) {
    let data = [
      ...sts,
      {
        studentMail: validuser,
        present: "request",
        presentDate: Timestamp.fromDate(new Date()),
      },
    ];
    updateStudentStatus(data, id)
      .then((value) => {
        navigation.navigate("studentattendence", {
          selectedCourse: title,
          courseId: id,
          alreadyPresentToday: false,
        });
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  }
};
