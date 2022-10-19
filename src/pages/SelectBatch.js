import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  btnWrapper,
  middleContentStyle,
} from "../components/similarstyles/SimillarStyles";
import { COLORS } from "../styles/Colors";
import DownIcon from "react-native-vector-icons/AntDesign";
import { ButtonComp, SelectPositionComp } from "../components/Reuse";
import { batchData, courseData } from "../data/alldata";
import { getSingleStudent } from "../firebase/FbFirestore";

const batchWrapper = {
  marginTop: 15,
};

const batchmodelstyle = {
  top: "50%",
  width: "100%",
  left: 20,
};

const bgColor = {
  width: "100%",
  backgroundColor: COLORS.brown,
  height: 50,
  borderRadius: 5,
};
const btnTextStyle = {
  color: COLORS.white,
  fontFamily: "Helvetica-Bold",
  fontSize: 16,
};

const SelectBatch = ({ route, navigation }) => {
  const { email } = route.params;
  const [showbatchModel, setShowBatchModel] = useState(false);
  const [showCourseModel, setShowCourseModel] = useState(false);
  const [studentBatch, setStudentBatch] = useState("");
  const [studentcourse, setStudentCourse] = useState("");
  const [student, setStudent] = useState({});

  useEffect(() => {
    getSingleStudent(setStudent, email.toLowerCase());
  }, []);

  const selectBatch = (t) => {
    setStudentBatch(t);
  };
  const selectCourse = (t) => {
    setStudentCourse(t);
  };

  const _present = () => {
    if (!studentBatch && !studentcourse) {
      return Alert.alert("GIVE ALL INFO CORRECTLY");
    } else if (
      student?.batch !== studentBatch ||
      student?.course !== studentcourse
    ) {
      return Alert.alert("BATCH OR COURSE INFO WRONG!");
    } else {
      navigation.navigate("studentpresent", {
        studentBatch,
        studentcourse,
      });
    }
  };

  //   console.log("studentbatch page", student);
  return (
    <View style={middleContentStyle}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.brown} />
      <View style={batchWrapper}>
        <DepartmentComp
          setShowModel={setShowBatchModel}
          text="select batch"
          value={studentBatch}
        />
      </View>
      <View style={batchWrapper}>
        <DepartmentComp
          setShowModel={setShowCourseModel}
          text="select course"
          value={studentcourse}
        />
      </View>
      <View style={btnWrapper}>
        <ButtonComp
          text="SEEYOURCOURSE"
          bgColor={bgColor}
          btnTextStyle={btnTextStyle}
          click={_present}
        />
      </View>

      {showbatchModel && (
        <SelectPositionComp
          setShowModel={setShowBatchModel}
          text="Select Batch"
          data={batchData}
          selectValue={selectBatch}
          extrastyle={batchmodelstyle}
        />
      )}
      {showCourseModel && (
        <SelectPositionComp
          setShowModel={setShowCourseModel}
          text="Select Course"
          data={courseData}
          selectValue={selectCourse}
          extrastyle={batchmodelstyle}
        />
      )}
    </View>
  );
};

export default SelectBatch;

export const DepartmentComp = ({ text, setShowModel, value }) => (
  <TouchableOpacity
    style={styles.selectContainer}
    onPress={() => setShowModel(true)}
  >
    {value?.length < 1 ? (
      <Text style={styles.text}>{text}</Text>
    ) : (
      <Text style={styles.text}>{value}</Text>
    )}

    <DownIcon size={16} name="caretdown" color={COLORS.ligthBlack} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.lightGary,
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.lightBlue,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
  },
});
