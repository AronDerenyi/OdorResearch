import {AssetApi} from "src/model/assets/AssetApi";
import {IapsAsset} from "src/model/assets/IapsAsset";
import {MoodTestSession} from "src/model/moodtest/MoodTestSession";

export class MoodTest {

	static startTest(userId: string, groupId: string, age: number, gender: string, residency: string, education: string,
	                 sessionCallback: (session: MoodTestSession) => void,
	                 errorCallback: (error: Error) => void) {

		let failed: boolean = false;
		let iapsAssets: Array<IapsAsset> = null;

		const callbackSuccess = () => {
			if (!failed && iapsAssets) {
				sessionCallback(new MoodTestSession(
					userId, groupId,
					age, gender, residency, education,
					iapsAssets
				));
			}
		};

		const callbackError = (error: Error) => {
			if (!failed) {
				failed = true;
				errorCallback(error);
			}
		};

		AssetApi.getIapsAssets((assets: Array<IapsAsset>) => {
			iapsAssets = assets;
			callbackSuccess();
		}, callbackError);
	}

	static endTest(session: MoodTestSession,
	               successCallback: () => void,
	               errorCallback: (error: Error) => void) {

		// TODO: Save data
		/*
		const data: any = {};

		const sessionData = session.getData();
		data.userId = sessionData.userId;
		data.groupId = sessionData.groupId;

		data.details = {};
		for (const detail in sessionData.details) data.details[detail] = sessionData.details[detail];

		data.questions = [];
		sessionData.questions.forEach(questionData => {
			const question: any = {};
			question.type = questionData.type;

			question.details = {};
			for (const detail in questionData.details) question.details[detail] = questionData.details[detail];

			question.events = [];
			questionData.events.forEach(eventData => {
				const event: any = {};
				event.time = eventData.time;
				event.type = eventData.type;
				event.message = eventData.message;
				question.events.push(event);
			});

			data.questions.push(question);
		});

		console.log(data);
		*/

		console.log(JSON.stringify(session.getData(), null, 2));

		successCallback();
	}
}