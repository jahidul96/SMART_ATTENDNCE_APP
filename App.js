import StudentLogin from "./src/pages/StudentLogin";
import StudentAttendence from "./src/pages/StudentAttendence";
import StudentPresent from "./src/pages/StudentPresent";
import AttendenceNotification from "./src/pages/AttendenceNotification";
import MarkAt from "./src/pages/MarkAt";
import TeacherLogin from "./src/pages/TeacherLogin";
import StudentDatabase from "./src/pages/StudentDatabase";
import EntryPage from "./src/pages/EntryPage";
import AdminLogin from "./src/pages/AdminLogin";
import AdminDashboard from "./src/pages/AdminDashboard";
import StudentList from "./src/pages/StudentList";
import TeacherList from "./src/pages/TeacherList";
import CourseList from "./src/pages/CourseList";
import AddStudent from "./src/pages/AddStudent";
import AddTeacher from "./src/pages/AddTeacher";
import AddCourse from "./src/pages/AddCourse";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState, useCallback } from "react";
import TeacherSelect from "./src/pages/TeacherSelect";
import SelectBatch from "./src/pages/SelectBatch";

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Helvetica-Bold": require("./assets/fonts/Helvetica-Bold.ttf"),
          "Helvetica-Regular": require("./assets/fonts/Helvetica-Regular.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* admin pages */}
        <Stack.Screen name="entry" component={EntryPage} />
        <Stack.Screen name="adminlogin" component={AdminLogin} />
        <Stack.Screen name="admindashboard" component={AdminDashboard} />
        <Stack.Screen name="studentlist" component={StudentList} />
        <Stack.Screen name="teacherlist" component={TeacherList} />
        <Stack.Screen name="courselist" component={CourseList} />
        <Stack.Screen name="addstudent" component={AddStudent} />
        <Stack.Screen name="addteacher" component={AddTeacher} />
        <Stack.Screen name="addcourse" component={AddCourse} />

        {/* student pages */}
        <Stack.Screen name="studentlogin" component={StudentLogin} />
        <Stack.Screen name="SelectBatch" component={SelectBatch} />
        <Stack.Screen name="studentpresent" component={StudentPresent} />
        <Stack.Screen name="studentattendence" component={StudentAttendence} />
        <Stack.Screen
          name="studentattendencenotification"
          component={AttendenceNotification}
        />

        {/* teacher pages */}
        <Stack.Screen name="teacherlogin" component={TeacherLogin} />
        <Stack.Screen name="teacherselect" component={TeacherSelect} />
        <Stack.Screen name="teachermarkpresentpage" component={MarkAt} />
        <Stack.Screen name="seeallStudent" component={StudentDatabase} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
