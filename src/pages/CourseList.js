import { View, ScrollView, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { bgColor, btnWrapperStyle } from "./StudentList";
import {
  ButtonComp,
  Input,
  SelectPositionComp,
  TopBar,
} from "../components/Reuse";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  detailsmodelStyle,
  extrapadding,
  root,
  topStyle,
  T_List,
  wrapper,
} from "../components/T_List";
import { COLORS } from "../styles/Colors";
import { getALLData } from "../firebase/FbFirestore";

export const loadText = {
  textAlign: "center",
  marginTop: 20,
};

const CourseList = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [inputVal, setInputVal] = useState("");

  const addCourse = () => {
    navigation.navigate("addcourse");
  };

  const getSinglelist = (data, docId) => {
    navigation.navigate("details", {
      data,
      from: "course",
      docId,
    });
  };

  useEffect(() => {
    getALLData(setCourses, "courses");

    return () => {};
  }, []);

  return (
    <View style={root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.lightBlue} />
      <View style={topStyle}>
        <TopBar navigation={navigation} text="Course List" />
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          height: 65,
          borderBottomColor: COLORS.grayColor,
          borderBottomWidth: 1,
          justifyContent: "center",
        }}
      >
        <Input placeholder={"Search by course name"} setValue={setInputVal} />
      </View>
      <ScrollView
        contentContainerStyle={wrapper}
        showsVerticalScrollIndicator={false}
      >
        {courses.length == 0 ? (
          <Text style={loadText}>No data</Text>
        ) : (
          courses
            .filter((data) => {
              if (inputVal == "") {
                return data;
              } else if (
                data.value.courseName
                  .toLowerCase()
                  .includes(inputVal.toLowerCase())
              ) {
                return data;
              }
            })
            .map((data, i) => (
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
        <ButtonComp text="Add Course" bgColor={bgColor} click={addCourse} />
      </View>
    </View>
  );
};

export default CourseList;
