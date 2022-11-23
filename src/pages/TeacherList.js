import { View, ScrollView, Text, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import { bgColor, btnWrapperStyle } from "./StudentList";
import { ButtonComp, SelectPositionComp, TopBar } from "../components/Reuse";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { loadText } from "./CourseList";
import {
  extrapadding,
  root,
  topStyle,
  T_List,
  wrapper,
} from "../components/T_List";
import { COLORS } from "../styles/Colors";
import { getALLData } from "../firebase/FbFirestore";

const TeacherList = ({ navigation }) => {
  const [allteacher, setAllTeacher] = useState([]);

  const addTeacher = () => {
    navigation.navigate("addteacher");
  };

  // const getallTeachers = () => {
  //   const cRef = collection(db, "teachers");
  //   const q = query(cRef, orderBy("createAt", "desc"));

  //   onSnapshot(q, (querySnapshot) => {
  //     let trs = [];
  //     querySnapshot.forEach((doc) => {
  //       trs.push(doc.data());
  //     });
  //     setAllTeacher(trs);
  //   });
  // };

  const getSinglelist = (data, docId) => {
    // console.log("teacher list", data);
    navigation.navigate("details", {
      data,
      from: "teacher",
      docId,
    });
  };

  useEffect(() => {
    getALLData(setAllTeacher, "teachers");
    // getallTeachers();
    return () => {};
  }, []);

  return (
    <View style={root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.lightBlue} />
      <View style={topStyle}>
        <TopBar navigation={navigation} text="Teacher List" />
      </View>
      <ScrollView
        contentContainerStyle={wrapper}
        showsVerticalScrollIndicator={false}
      >
        {allteacher.length == 0 ? (
          <Text style={loadText}>No data</Text>
        ) : (
          allteacher.map((data, i) => (
            <T_List
              key={i}
              value={data.value}
              id={data.id}
              getSinglelist={getSinglelist}
            />
          ))
        )}
      </ScrollView>

      <View style={[btnWrapperStyle, extrapadding]}>
        <ButtonComp text="Add Teacher" click={addTeacher} bgColor={bgColor} />
      </View>
    </View>
  );
};

export default TeacherList;
