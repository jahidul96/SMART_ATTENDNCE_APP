import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextTitle, TopBar } from "../components/Reuse";
import { COLORS } from "../styles/Colors";
import Icon from "react-native-vector-icons/AntDesign";
import {
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getSingleStudent, updateStudentStatus } from "../firebase/FbFirestore";

const myIcon = <Icon name="caretup" size={16} color={COLORS.grayColor} />;

const StudentDatabase = ({ route, navigation }) => {
  const { courseId, selectedCourse } = route.params;

  const [courseStudents, setCourseStudents] = useState([]);

  const NotMulipleShowStudents = [
    ...new Map(
      courseStudents.map((v) => [JSON.stringify(v.studentMail), v])
    ).values(),
  ];

  const markAttendence = async (text) => {
    if (text == "mark") {
      const data = courseStudents.map((item) => {
        item = { ...item, present: "present" };
        return item;
      });
      updateStudentStatus(data, courseId)
        .then((value) => {
          console.log("okay");
        })
        .catch((err) => {
          Alert.alert(err.message);
        });
    } else {
      const data = courseStudents.map((item) => {
        item = { ...item, present: "request" };
        return item;
      });
      updateStudentStatus(data, courseId)
        .then((value) => {
          console.log("okay");
        })
        .catch((err) => {
          Alert.alert(err.message);
        });
    }
  };

  const selectOneStudent = async (val, text) => {
    if (text == "mark") {
      const data = courseStudents.map((item) => {
        if (item.studentMail === val.studentMail) {
          item = { ...item, present: "present" };
        }
        return item;
      });

      updateStudentStatus(data, courseId)
        .then((value) => {
          console.log("okay");
        })
        .catch((err) => {
          Alert.alert(err.message);
        });
    } else {
      const data = courseStudents.map((item) => {
        if (item.studentMail === val.studentMail) {
          item = { ...item, present: "request" };
        }
        return item;
      });
      updateStudentStatus(data, courseId)
        .then((value) => {
          console.log("okay");
        })
        .catch((err) => {
          Alert.alert(err.message);
        });
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "courses", courseId), (doc) => {
      // console.log("just Students array ", doc.data().students);
      setCourseStudents(doc.data().students);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.lightBlue} />
      <View style={styles.headStyle}>
        <TopBar text="Present Student" navigation={navigation} />
      </View>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.topView}>
          <View style={styles.studentIdView}>
            <View style={styles.courseNameWrapper}>
              <Text style={styles.text}>
                {selectedCourse.length > 20
                  ? selectedCourse.slice(0, 19) + "..."
                  : selectedCourse}
              </Text>
              <Text style={[styles.text, { fontSize: 14 }]}>Students</Text>
            </View>
          </View>
          <View style={styles.updateAllBtnWrapper}>
            <TouchableOpacity
              style={[styles.studentIdView, styles.mark]}
              onPress={() => markAttendence("mark")}
            >
              <Text style={[styles.text, styles.whiteText]}>Mark All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.studentIdView,
                styles.mark,
                {
                  marginTop: 5,
                  backgroundColor: COLORS.grayColor,
                },
              ]}
              onPress={() => markAttendence("unmark")}
            >
              <Text style={[styles.text, styles.whiteText]}>Unmark All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          {NotMulipleShowStudents?.length > 0 ? (
            NotMulipleShowStudents?.map((data, i) => (
              <StudentInfo
                key={i}
                data={data}
                onPress={selectOneStudent}
                courseStudents={courseStudents}
              />
            ))
          ) : (
            <Text style={styles.nullText}>No students presents</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default StudentDatabase;

const StudentInfo = ({ data, onPress, courseStudents }) => {
  const [studentInfo, setStudentInfo] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [allMyPresent, setAllMyPresent] = useState([]);

  const seeInfo = (data) => {
    // console.log("student data", data);
    getSingleStudent(setStudentInfo, data.studentMail);

    let clickedStudent = courseStudents?.filter(
      (allStd) => allStd.studentMail == data.studentMail
    );

    setAllMyPresent(clickedStudent);
    setModalVisible(true);

    // console.log("courseStudents", courseStudents);
  };

  // console.log("studentInfo", studentInfo);

  // console.log(singleStudentPresent);

  return (
    <View style={styles.topView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <StdDetails studentInfo={studentInfo} allMyPresent={allMyPresent} />
      </Modal>
      <TouchableOpacity
        style={[
          styles.studentIdView,
          styles.studentIdViewStyle2,
          data?.present == "present"
            ? { backgroundColor: COLORS.lightBlue }
            : { backgroundColor: COLORS.grayColor },
        ]}
        onPress={() => seeInfo(data)}
      >
        <Text style={styles.text}>{data.studentMail}</Text>
      </TouchableOpacity>
      <View style={{ width: "30%" }}>
        {data.present == "present" ? (
          <TouchableOpacity
            onPress={() => onPress(data, "unmark")}
            style={[
              styles.studentIdView,
              styles.mark,
              data?.present == "present"
                ? { backgroundColor: COLORS.grayColor }
                : "",
            ]}
          >
            <Text
              style={[styles.text, styles.whiteText, { color: COLORS.red }]}
            >
              unmark
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => onPress(data, "mark")}
            style={[
              styles.studentIdView,
              styles.mark,
              data?.present == "present"
                ? { backgroundColor: COLORS.grayColor }
                : "",
            ]}
          >
            <Text style={[styles.text, styles.whiteText]}>mark</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const tabData = [
  {
    id: 1,
    name: "Student_Details",
  },
  {
    id: 2,
    name: "Present Date",
  },
];

const StdDetails = ({ studentInfo, allMyPresent }) => {
  const [tabname, setTabName] = useState(tabData[0].name);
  // console.log(allMyPresent);

  const isRequest = allMyPresent?.filter(
    (pdate) => pdate?.present == "present"
  );
  // console.log(isRequest.length);

  return (
    <View style={styles.modelContainer}>
      <View style={styles.popupModelStyle}>
        <ScrollView>
          <Text style={styles.titleText}>Attendence Details</Text>

          <View
            style={{
              paddingHorizontal: 20,
            }}
          >
            <View style={styles.nameContainer}>
              {tabData?.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => setTabName(tab.name)}
                  style={
                    tabname == tab.name ? styles.tabExtraStyle : styles.tabStyle
                  }
                >
                  <Text style={styles.popupNameStyle}>{tab.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={{
                marginTop: 20,
              }}
            >
              {tabname == "Student_Details" ? (
                <View>
                  <Info
                    label="Name"
                    text={
                      studentInfo?.name
                        ? studentInfo?.name
                        : "Username (deleted)"
                    }
                  />
                  <Info
                    label="Email"
                    text={
                      studentInfo?.email
                        ? studentInfo.email
                        : "user@email.com (deleted)"
                    }
                  />
                  <Info
                    label="Phone"
                    text={
                      studentInfo?.phone
                        ? studentInfo.phone
                        : "phonenumber (deleted)"
                    }
                  />
                  <Info
                    label="Id"
                    text={studentInfo?.id ? studentInfo.id : "id (deleted)"}
                  />
                  <Info
                    label="Joined Date "
                    text={
                      studentInfo?.createAt?.toDate().toLocaleDateString()
                        ? studentInfo?.createAt?.toDate().toLocaleDateString()
                        : "date (deleted)"
                    }
                  />
                </View>
              ) : (
                <View>
                  {allMyPresent?.map((pdate, i) => (
                    <View key={i}>
                      {pdate?.present == "request" ? null : (
                        <Text style={styles.infoText}>
                          {pdate?.presentDate?.toDate().toLocaleDateString()}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const Info = ({ text, label }) => (
  <View style={styles.infoWrapper}>
    <Text style={styles.infoText}>{label} :</Text>
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

// //presentDate
const styles = StyleSheet.create({
  headStyle: {
    height: "10%",
    justifyContent: "center",
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 10,
  },
  wrapper: {
    backgroundColor: COLORS.lightYellow,
    width: "100%",
    minHeight: 100,
    padding: 10,
    borderRadius: 5,
  },
  topView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  courseNameWrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  studentIdView: {
    width: "65%",
    backgroundColor: COLORS.brown,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 40,
    borderRadius: 5,
  },
  updateAllBtnWrapper: {
    width: "30%",
  },

  studentIdViewStyle2: {
    backgroundColor: COLORS.lightBlue,
  },
  mark: {
    width: "100%",
    backgroundColor: COLORS.red,
  },
  text: {
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    color: COLORS.white,
  },
  whiteText: {
    color: COLORS.white,
  },
  extraStyle: {
    justifyContent: "space-evenly",
  },
  btnText: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: COLORS.white,
  },
  nullText: {
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "Helvetica-Bold",
    fontSize: 16,
  },
  modelContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  popupModelStyle: {
    height: "80%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    elevation: 2,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabStyle: {
    height: 30,
    alignItems: "center",
  },
  tabExtraStyle: {
    height: 30,
    alignItems: "center",
    borderBottomColor: COLORS.lightBlue,
    borderBottomWidth: 2,
  },
  titleText: {
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 16,
    marginBottom: 20,
    borderBottomColor: COLORS.grayColor,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  popupNameStyle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 15,
  },
  infoWrapper: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  infoText: {
    fontFamily: "Helvetica-Bold",
    marginRight: 10,
    fontSize: 15,
  },
});
