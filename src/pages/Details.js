import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../styles/Colors";
import { TopBar } from "../components/Reuse";
import { topStyle } from "../components/T_List";
import StudentDetailsComp from "../components/StudentDetailsComp";
import TeacherDetailsComp from "../components/TeacherDetailsComp";
import CourseDetailsComp from "../components/CourseDetailsComp";

const Details = ({ route, navigation }) => {
  const { data, from } = route.params;

  //   console.log(from);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.lightBlue} />
      <View style={topStyle}>
        <TopBar
          navigation={navigation}
          text={`${from.toUpperCase()} DETAILS`}
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
});
