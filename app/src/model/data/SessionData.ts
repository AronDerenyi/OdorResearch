import {Dictionary, ReadonlyDictionary} from "src/util/Collections";
import {QuestionData} from "src/model/data/QuestionData";

export class SessionData {

	readonly userId: string;
	readonly groupId: string;
	readonly details: ReadonlyDictionary<string>;
	readonly questions: ReadonlyArray<QuestionData>;

	constructor(userId: string, groupId: string, details: Dictionary<string>, questions: Array<QuestionData>) {
		this.userId = userId;
		this.groupId = groupId;

		const detailsClone: Dictionary<string> = {};
		for (const key in details) detailsClone[key] = details[key];
		this.details = detailsClone;

		const questionsClone: Array<QuestionData> = [];
		questions.forEach((question) => questionsClone.push(question));
		this.questions = questionsClone;
	}
}

export module SessionData {

	export class Builder {

		private userId: string;
		private groupId: string;
		private readonly details: Dictionary<string> = {};
		private readonly questions: Array<QuestionData> = [];

		setUserId(userId: string): Builder {
			this.userId = userId;
			return this;
		}

		setGroupId(groupId: string): Builder {
			this.groupId = groupId;
			return this;
		}

		setDetail(key: string, detail: string): Builder {
			this.details[key] = detail;
			return this;
		}

		addQuestion(question: QuestionData) {
			this.questions.push(question);
			return this;
		}

		build(): SessionData {
			return new SessionData(this.userId, this.groupId, this.details, this.questions);
		}
	}
}
