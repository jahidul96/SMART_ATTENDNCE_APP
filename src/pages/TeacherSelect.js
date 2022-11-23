import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ButtonComp, TextTitle } from "../components/Reuse";
import { selectStyle } from "../components/similarstyles/SimillarStyles";
import { COLORS } from "../styles/Colors";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import {
  getDoc,
  doc,
  onSnapshot,
  query,
  where,
  collection,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Course } from "../components/CourseComp";

const bgColor = {
  backgroundColor: COLORS.brown,
  width: "50%",
  height: 40,
  borderRadius: 10,
  marginTop: 10,
};

const btnTextStyle = {
  color: COLORS.white,
  fontSize: 16,
  fontFamily: "Helvetica-Bold",
};

const TeacherSelect = ({ navigation }) => {
  const [mycourses, setMyCourses] = useState([]);
  const [courseId, setCourseId] = useState("0");
  const validuser = auth?.currentUser?.email;

  const seeAttendence = async (title, id) => {
    setCourseId(id);
    const ref = doc(db, "courses", id);
    const docSnap = await getDoc(ref);
    let students;
    if (docSnap.exists()) {
      students = docSnap.data();
      navigation.navigate("seeallStudent", {
        courseId: id,
        selectedCourse: title,
      });
    } else {
      console.log("No such document!");
    }
  };

  const logOut = async () => {
    await signOut(auth);
    setTimeout(() => {
      navigation.navigate("entry");
    }, 1000);
  };

  useEffect(() => {
    const q = query(
      collection(db, "courses"),
      where("teacheremail", "==", validuser)
    );
    onSnapshot(q, (querySnapshot) => {
      let tCourse = [];
      querySnapshot.forEach((doc) => {
        tCourse.push({ value: doc.data(), id: doc.id });
      });
      setMyCourses(tCourse);
    });
  }, []);

  return (
    <ScrollView>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.brown} />
      <View style={styles.root}>
        <TextTitle />
      </View>
      <View style={styles.wrapper}>
        <View style={selectStyle}>
          <Text style={styles.text}>See Attendence</Text>
        </View>

        {mycourses.length ? (
          mycourses.map((data) => (
            <Course
              key={data.id}
              data={data}
              // select={selectCourse}
              someStyle={data.id == courseId ? styles.bgRed : ""}
              onPress={seeAttendence}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No courses available</Text>
        )}

        {/* <ButtonComp
          text="See Attendence"
          bgColor={bgColor}
          btnTextStyle={btnTextStyle}
          click={seeAttendence}
        /> */}

        <ButtonComp
          text="Logout"
          bgColor={bgColor}
          btnTextStyle={btnTextStyle}
          click={logOut}
        />
      </View>
    </ScrollView>
  );
};

export default TeacherSelect;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 100,
  },
  wrapper: {
    alignItems: "center",
  },
  extraStyle: {
    backgroundColor: COLORS.grayColor,
    marginTop: -1,
    marginBottom: 30,
  },
  text: {
    fontFamily: "Helvetica-Bold",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Helvetica-Bold",
  },
  bgRed: {
    backgroundColor: "red",
  },
});
