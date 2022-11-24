import { View, ScrollView, Text, StatusBar, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ButtonComp, Input, TopBar } from "../components/Reuse";
import { COLORS } from "../styles/Colors";

import { loadText } from "./CourseList";
import {
  extrapadding,
  root,
  topStyle,
  T_List,
  wrapper,
} from "../components/T_List";
import { getALLData } from "../firebase/FbFirestore";

export const btnWrapperStyle = {
  paddingVertical: 20,
};

export const slistContainer = {
  borderWidth: 2,
  borderColor: COLORS.lightBlue,
  borderRadius: 5,
  padding: 8,
  marginVertical: 8,
};
export const bgColor = {
  borderWidth: 2,
  borderColor: COLORS.brown,
  width: "100%",
  borderRadius: 10,
};

const StudentList = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [inputVal, setInputVal] = useState("");

  const addStudent = () => {
    navigation.navigate("addstudent");
  };

  const getSinglelist = (data, docId) => {
    navigation.navigate("details", {
      data,
      from: "student",
      docId,
    });
  };

  useEffect(() => {
    getALLData(setStudents, "students");

    return () => {};
  }, []);
  return (
    <View style={root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.lightBlue} />
      <View style={topStyle}>
        <TopBar navigation={navigation} text="Student List" />
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
        <Input placeholder={"Search"} setValue={setInputVal} />
      </View>
      <ScrollView
        contentContainerStyle={wrapper}
        showsVerticalScrollIndicator={false}
      >
        {students.length == 0 ? (
          <Text style={loadText}>No data</Text>
        ) : (
          students
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
        <ButtonComp text="Add Student" click={addStudent} bgColor={bgColor} />
      </View>
    </View>
  );
};

export default StudentList;

const styles = StyleSheet.create({});
