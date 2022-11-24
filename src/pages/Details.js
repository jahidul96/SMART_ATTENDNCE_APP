import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../styles/Colors";
import { ButtonComp, TopBar } from "../components/Reuse";
import { topStyle } from "../components/T_List";
import StudentDetailsComp from "../components/StudentDetailsComp";
import TeacherDetailsComp from "../components/TeacherDetailsComp";
import CourseDetailsComp from "../components/CourseDetailsComp";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { getAuth, deleteUser } from "firebase/auth";

const Details = ({ route, navigation }) => {
  const { data, from, docId } = route.params;

  // console.log(from);
  console.log("data", data);
  // console.log("docId", docId;

  // delete data functionality
  const deleteData = async () => {
    if (data.email) {
      if (from == "student") {
        await deleteDoc(doc(db, "students", docId));
        deleteUser(auth.currentUser)
          .then(() => {
            console.log("user deleted");
          })
          .catch((error) => {
            console.log(error.message);
          });
        Alert.alert("Student deleted!!!");
        navigation.navigate("studentlist");
      } else {
        await deleteDoc(doc(db, "teachers", docId));
        deleteUser(auth.currentUser)
          .then(() => {
            console.log("user deleted");
          })
          .catch((error) => {
            console.log(error.message);
          });
        Alert.alert("Teacher deleted!!!");
        navigation.navigate("teacherlist");
      }
    } else {
      await deleteDoc(doc(db, "courses", docId));
      Alert.alert("document deleted!!!");
      navigation.navigate("courselist");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.lightBlue} />
      <View style={topStyle}>
        <TopBar
          navigation={navigation}
          text={`${from.toUpperCase()} DETAILS`}
        />
      </View>

      <View>
        <ButtonComp
          text={"Delete"}
          extrastyle={styles.editBtnWrapper}
          click={deleteData}
        />
      </View>
      <ScrollView style={styles.contentWrapper}>
        {from == "student" ? (
          <StudentDetailsComp data={data} />
        ) : from == "teacher" ? (
          <TeacherDetailsComp data={data} />
        ) : (
          <CourseDetailsComp data={data} />
        )}
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  editBtnWrapper: {
    // position: "absolute",
    // right: 20,
    // top: 50,

    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.red,
    marginTop: 20,
    alignSelf: "flex-end",
    marginRight: 20,
    borderRadius: 0,
  },
  editText: {
    color: "#fff",
  },
});
