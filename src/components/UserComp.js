import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";

export const extraStyle = {
	paddingHorizontal: 20,
};

const UserComp = ({picture, admin, text, contentBgColor, navigation}) => {
	const navigateToSelectedPage = () => {
		if (text == "Admin") {
			navigation.navigate("adminlogin");
		} else if (text == "Student") {
			navigation.navigate("studentlogin");
		} else {
			navigation.navigate("teacherlogin");
		}
	};

	const seeDetails = () => {
		if (text == "Student-List") {
			navigation.navigate("studentlist");
		} else if (text == "Teacher-List") {
			navigation.navigate("teacherlist");
		} else {
			navigation.navigate("courselist");
		}
	};
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={[styles.singleUserStyle, contentBgColor]}
			onPress={admin ? seeDetails : navigateToSelectedPage}
		>
			<Image style={styles.imgStyle} source={picture} />
			<Text style={styles.userText}>{text}</Text>
		</TouchableOpacity>
	);
};

export default UserComp;

const styles = StyleSheet.create({
	// UserComp styles

	singleUserStyle: {
		alignItems: "center",
		justifyContent: "center",
		width: "48%",
		borderRadius: 20,
	},

	imgStyle: {
		width: 80,
		height: 80,
		borderRadius: 10,
		marginBottom: 5,
	},
	userText: {
		fontSize: 16,
		fontFamily: "Helvetica-Regular",
	},
});
