import { View, TouchableOpacity, Text } from "react-native";
import { slistContainer } from "../pages/StudentList";
import { COLORS } from "../styles/Colors";

export const root = {
  flex: 1,
};
export const wrapper = {
  paddingHorizontal: 20,
};
export const topStyle = {
  backgroundColor: COLORS.lightBlue,
  width: "100%",
  height: "10%",
  justifyContent: "center",
  paddingHorizontal: 20,
};
export const extrapadding = {
  paddingHorizontal: 20,
};

export const detailsmodelStyle = {
  width: "89%",
  top: "50%",
};

const codeandCourse = {
  flexDirection: "row",
};
export const teachername = {
  marginVertical: 2,
};
const course = {
  marginLeft: 10,
};

export const text = {
  fontSize: 14,
  fontFamily: "Helvetica-Bold",
};

export const T_List = ({ value, getSinglelist }) => (
  <TouchableOpacity style={slistContainer} onPress={() => getSinglelist(value)}>
    {value.name && <Text style={text}>name : {value.name}</Text>}

    {value.course && value.batch && value.position ? (
      <Text style={text}>course : {value.course}</Text>
    ) : null}

    {value.teacher && (
      <Text style={[teachername, text]}>teacher : {value.teacher}</Text>
    )}

    {value.email && (
      <Text style={[teachername, text]}>email : {value.email}</Text>
    )}

    {value.position && <Text style={text}>position : {value.position}</Text>}
    {value.teacheremail && (
      <Text style={text}>teacherEmail : {value.teacheremail}</Text>
    )}

    {value.id || value.course || value.code ? (
      <View style={codeandCourse}>
        {value.course && <Text style={text}>course : {value.course}, </Text>}
        {value.id && <Text style={text}> courseId :{value.id}</Text>}
        {value.code && <Text style={text}> CourseCode :{value.code}</Text>}
        <Text style={[course, text]}>{value.coures}</Text>
      </View>
    ) : null}
  </TouchableOpacity>
);
