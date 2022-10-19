import {StyleSheet} from "react-native";
import {COLORS} from "../styles/Colors";
export const styles = StyleSheet.create({
	// textTitle comp styles
	textTitleContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	titleText: {
		fontSize: 35,
		fontFamily: "Helvetica-Bold",
	},
	subText: {
		fontSize: 25,
		marginTop: -10,
		fontFamily: "Helvetica-Regular",
	},

	// Input styles

	input: {
		height: 45,
		fontSize: 17,
		borderRadius: 5,
		marginVertical: 6,
		paddingHorizontal: 15,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: COLORS.lightBlue,
		backgroundColor: COLORS.white,
	},

	// btnCompstyles

	btnContainer: {
		width: "40%",
		alignItems: "center",
		justifyContent: "center",
		height: 45,
		borderRadius: 30,
	},

	// DateComp styles

	dateContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 5,
	},

	timeText: {
		fontSize: 16,
		fontFamily: "Helvetica-Regular",
	},

	// Subject Comp Style

	textWrapper: {
		backgroundColor: COLORS.grayColor,
		minHeight: 35,
		justifyContent: "center",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,
		marginTop: 5,
		marginBottom: 10,
	},
	label: {
		fontSize: 16,
		fontFamily: "Helvetica-Regular",
		marginBottom: -2,
		marginLeft: 5,
	},

	// adNotification styles
	adNotification: {
		backgroundColor: COLORS.grayColor,
		minHeight: 50,
		marginVertical: 5,
		padding: 20,
		borderRadius: 10,
		flexDirection: "row",
	},

	// Topbar styles

	headerStyle: {
		flexDirection: "row",
		alignItems: "center",
	},
	headText: {
		marginLeft: 30,
		fontSize: 18,
		color: COLORS.white,
		fontFamily: "Helvetica-Bold",
	},

	// selectpositioncomp style

	selectTitle: {
		fontFamily: "Helvetica-Bold",
		marginBottom: 10,
	},
	dataBtn: {
		marginVertical: 5,
		backgroundColor: COLORS.lightGary,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		height: 35,
	},

	closeIcon: {
		position: "absolute",
		top: 5,
		right: 5,
	},

	//singleDetailsWrapper style
	singleDetailsWrapper: {
		justifyContent: "center",
		alignItems: "center",
	},
});
