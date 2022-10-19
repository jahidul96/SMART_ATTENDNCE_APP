import {Text, View, TextInput, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import CloseIcon from "react-native-vector-icons/AntDesign";
import {labelText, modelStyle} from "./similarstyles/SimillarStyles";

import {styles} from "./ReuseStyle";

export const TextTitle = () => (
	<View style={styles.textTitleContainer}>
		<Text style={styles.titleText}>Smart</Text>
		<Text style={styles.subText}>Attendence System</Text>
	</View>
);

export const Input = ({placeholder, extrastyle, setValue, secureTextEntry}) => (
	<TextInput
		placeholder={placeholder}
		style={[styles.input, extrastyle]}
		onChangeText={(text) => setValue(text)}
		secureTextEntry={secureTextEntry}
	/>
);

export const ButtonComp = ({
	bgColor,
	btnTextStyle,
	extrastyle,
	text,
	click,
}) => (
	<TouchableOpacity
		activeOpacity={0.6}
		style={[styles.btnContainer, bgColor, extrastyle]}
		onPress={click}
	>
		<Text style={btnTextStyle}>{text}</Text>
	</TouchableOpacity>
);

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const today = new Date();
const date = ` ${today.getDate()}-${
	monthNames[today.getMonth()]
}-${today.getFullYear()}`;

export const DateComp = () => (
	<View style={styles.dateContainer}>
		<Text style={styles.timeText}>Date : {date}</Text>
	</View>
);

export const SubjectComp = ({label, text, subjectStyle}) => (
	<View style={subjectStyle}>
		<Text style={styles.label}>{label} :</Text>
		<View style={styles.textWrapper}>
			<Text style={styles.label}>{text}</Text>
		</View>
	</View>
);

export const AdNotification = ({data}) => (
	<View style={styles.adNotification}>
		<Text>Subject : </Text>
		<Text
			style={{
				fontFamily: "Helvetica-Bold",
				marginTop: -2,
				marginLeft: 3,
			}}
		>
			{data}{" "}
		</Text>
	</View>
);

export const TopBar = ({text, navigation}) => (
	<View style={styles.headerStyle}>
		<Icon
			name="arrowleft"
			size={22}
			color="#fff"
			onPress={() => {
				navigation.goBack();
			}}
		/>
		<Text style={styles.headText}>{text}</Text>
	</View>
);

export const SelectPositionComp = ({
	setShowModel,
	data,
	text,
	extrastyle,
	selectValue,
	singleData,
	setShowDetails,
}) => (
	<View style={[modelStyle, extrastyle]}>
		<Text style={[labelText, styles.selectTitle]}>{text}</Text>
		{data &&
			data.map((d, i) => (
				<TouchableOpacity
					key={i}
					style={styles.dataBtn}
					onPress={() => {
						selectValue(d);
						setShowModel(false);
					}}
				>
					<Text style={labelText}>{d}</Text>
				</TouchableOpacity>
			))}

		{singleData && (
			<View style={styles.singleDetailsWrapper}>
				{singleData.name && (
					<Text style={labelText}>name : {singleData.name}</Text>
				)}
				{singleData.email && (
					<Text style={labelText}>
						email :{" "}
						{singleData.email.length > 28
							? singleData.email.slice(0, 27) + "..."
							: singleData.email}
					</Text>
				)}

				{singleData.course && singleData.batch ? (
					<Text style={labelText}>course : {singleData.course}</Text>
				) : null}

				{singleData.teacher && (
					<Text style={labelText}>
						teacher : {singleData.teacher}
					</Text>
				)}
			</View>
		)}

		<View style={styles.closeIcon}>
			<CloseIcon
				onPress={() => {
					setShowModel(false);
				}}
				name="close"
				color="red"
				size={30}
			/>
		</View>
	</View>
);
