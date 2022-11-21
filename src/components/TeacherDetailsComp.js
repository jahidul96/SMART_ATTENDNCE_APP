import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../styles/Colors";

const TeacherDetailsComp = ({ data }) => {
  //   console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.profilContainer}>
        <Text style={styles.AvatorName}>
          {data.name.length > 2 && data.name.slice(0, 1)}
        </Text>
      </View>

      <Text style={styles.name}>{data.name}</Text>
      <View style={styles.flexStyle}>
        <Text style={styles.name}>Email :</Text>
        <Text style={styles.name}> {data.email}</Text>
      </View>
      <View style={styles.flexStyle}>
        <Text style={styles.name}>Position :</Text>
        <Text style={styles.name}> {data.position}</Text>
      </View>

      <View style={styles.flexStyle}>
        <Text style={styles.name}>Subject :</Text>
        <Text style={styles.name}> {data.subject}</Text>
      </View>
      <View style={styles.flexStyle}>
        <Text style={styles.name}>Phone :</Text>
        <Text style={styles.name}> {data.phone}</Text>
      </View>
      <View style={styles.flexStyle}>
        <Text style={styles.name}>Address :</Text>
        <Text style={styles.name}> {data.addres}</Text>
      </View>

      <View style={styles.flexStyle}>
        <Text style={styles.name}>Joined Date :</Text>
        <Text style={styles.name}>
          {" "}
          {data?.createAt?.toDate().toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

export default TeacherDetailsComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
});
