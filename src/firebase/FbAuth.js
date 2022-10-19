import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import {Alert} from "react-native";
import {auth} from "./firebase";

export const signinWithFb = (email, password) => {
	return new Promise(async (resolve, reject) => {
		await signInWithEmailAndPassword(auth, email, password)
			.then((user) => {
				resolve(user);
				Alert.alert("Sign in succesfull");
			})
			.catch((err) => {
				reject(err);
				Alert.alert(err.message);
			});
	});
};

export const createUserWithFb = (email, password) => {
	return new Promise(async (resolve, reject) => {
		await createUserWithEmailAndPassword(auth, email, password)
			.then((user) => {
				resolve(user);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
