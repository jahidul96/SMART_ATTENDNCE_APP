import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../styles/Colors";
import { AntDesign } from "@expo/vector-icons";
const CourseDetailsComp = ({ data }) => {
  const [show, setShow] = useState(false);

  const NotMulipleShowStudents = [
    ...new Map(
      data.students.map((v) => [JSON.stringify(v.studentMail), v])
    ).values(),
  ];
  //   console.log(data);
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.name}</Text>
      <View style={styles.flexStyle}>
        <Text style={styles.name}>Couse :</Text>
        <Text style={styles.name}> {data.course}</Text>
      </View>
      <View style={styles.flexStyle}>
        <Text style={styles.name}>CourseName :</Text>
        <Text style={styles.name}> {data.courseName}</Text>
      </View>

      <View style={styles.flexStyle}>
        <Text style={styles.name}>Teacher Name :</Text>
        <Text style={styles.name}> {data.teacher}</Text>
      </View>
      <View style={styles.flexStyle}>
        <Text style={styles.name}>Teacher Email :</Text>
        <Text style={styles.name}> {data.teacheremail}</Text>
      </View>
      <View style={styles.flexStyle}>
        <Text style={styles.name}>Created Date :</Text>
        <Text style={styles.name}>
          {" "}
          {data?.createAt?.toDate().toLocaleDateString()}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.flexStyle, { marginBottom: 15, marginTop: 10 }]}
        onPress={() => setShow(!show)}
      >
        <Text style={styles.studentMail}> Course Student </Text>
        <AntDesign
          name={show ? "up" : "down"}
          size={20}
          color="black"
          style={{ marginTop: 2 }}
        />
      </TouchableOpacity>

      {show &&
        (NotMulipleShowStudents.length > 0 ? (
          NotMulipleShowStudents.map((student, i) => (
            <View style={styles.flexStyle} key={i}>
              <Text style={styles.studentMailPlaceHolder}>Student Email :</Text>
              <Text style={styles.studentMail}> {student.studentMail}</Text>
            </View>
          ))
        ) : (
          <Text>No Students</Text>
        ))}
    </View>
  );
};

export default CourseDetailsComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profilContainer: {
    width: 65,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.grayColor,
    borderRadius: 100,
    marginBottom: 5,
  },
  AvatorName: {
    fontSize: 19,
    fontFamily: "Helvetica-Bold",
  },
  name: {
    fontSize: 17,
    fontFamily: "Helvetica-Regular",
    marginBottom: 3,
  },
  flexStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  studentMailPlaceHolder: {
    fontSize: 15,
    fontFamily: "Helvetica-Regular",
  },
  studentMail: {
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
  },
});
