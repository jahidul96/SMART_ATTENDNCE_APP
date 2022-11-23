import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Alert } from "react-native";
import { db } from "./firebase";

export const updateStudentStatus = (data, id) => {
  return new Promise(async (resolve, reject) => {
    await updateDoc(
      doc(db, "courses", id),
      {
        students: data,
      },
      { merge: true }
    )
      .then((val) => {
        resolve(val);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getAllTeacher = async (setAllTeacher) => {
  const querySnapshot = await getDocs(collection(db, "teachers"));
  let teachers = [];
  querySnapshot.forEach((doc) => {
    let data = doc.data().name;
    teachers.push(data);
  });
  setAllTeacher(teachers);
};

export const getSingleStudent = async (setStudent, email) => {
  const q = query(collection(db, "students"), where("email", "==", email));
  onSnapshot(q, (querySnapshot) => {
    let student = null;
    querySnapshot.forEach((doc) => {
      student = doc.data();
      // console.log("student", student);
      // student.push(data);
    });
    setStudent(student);
  });
};

export const addDataToFirestore = async (collectionName, info) => {
  await addDoc(collection(db, collectionName), info);
};

export const getMatchCourses = (studentBatch, studentcourse, setMyCourses) => {
  const q = query(
    collection(db, "courses"),
    where("batch", "==", studentBatch),
    where("course", "==", studentcourse)
  );

  onSnapshot(q, (querySnapshot) => {
    let stdCourse = [];
    querySnapshot.forEach((doc) => {
      stdCourse.push({ value: doc.data(), id: doc.id });
    });
    setMyCourses(stdCourse);
  });
};

export const getALLData = (setValue, dbName) => {
  const cRef = collection(db, dbName);
  const q = query(cRef, orderBy("createAt", "desc"));

  onSnapshot(q, (querySnapshot) => {
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ value: doc.data(), id: doc.id });
    });
    setValue(data);
  });
};
