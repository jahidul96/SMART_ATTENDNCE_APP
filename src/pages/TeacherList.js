import { View, ScrollView, Text, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import { bgColor, btnWrapperStyle } from "./StudentList";
import {
  ButtonComp,
  Input,
  SelectPositionComp,
  TopBar,
} from "../components/Reuse";
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
  const [inputVal, setInputVal] = useState("");

  const addTeacher = () => {
    navigation.navigate("addteacher");
  };

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

    return () => {};
  }, []);

  return (
    <View style={root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.lightBlue} />
      <View style={topStyle}>
        <TopBar navigation={navigation} text="Teacher List" />
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
        <Input placeholder={"Search by name!"} setValue={setInputVal} />
      </View>
      <ScrollView
        contentContainerStyle={wrapper}
        showsVerticalScrollIndicator={false}
      >
        {allteacher.length == 0 ? (
          <Text style={loadText}>No data</Text>
        ) : (
          allteacher
            .filter((data) => {
              if (inputVal == "") {
                return data;
              } else if (
                data.value.name.toLowerCase().includes(inputVal.toLowerCase())
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
        <ButtonComp text="Add Teacher" click={addTeacher} bgColor={bgColor} />
      </View>
    </View>
  );
};

export default TeacherList;
