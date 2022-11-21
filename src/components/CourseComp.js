import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../styles/Colors";

export const Course = ({ data, select, student, someStyle, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.courseContainer}
      onPress={() => {
        student
          ? select(data.value.courseName, data.id)
          : onPress(data.value.courseName, data.id);
      }}
    >
      <Text style={styles.courseTitle}>{data.value.courseName}</Text>
      <View style={[styles.rightView, someStyle]}></View>
    </TouchableOpacity>
  );
};

// {
//     select(data.value.courseName, data.id);
//     onPress();
//   }

const styles = StyleSheet.create({
  // Course comp styles

  courseContainer: {
    backgroundColor: COLORS.grayColor,
    width: "80%",
    minHeight: 35,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 8,
    padding: 5,
  },
  courseTitle: {
    maxWidth: "80%",
    fontFamily: "Helvetica-Bold",
  },
  rightView: {
    backgroundColor: "#fff",
    width: 20,
    height: 20,
    borderRadius: 100 / 2,
  },

  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Helvetica-Bold",
  },

  extraStyle: {
    backgroundColor: "red",
  },
});
