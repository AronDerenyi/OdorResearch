import {Dictionary} from "src/util/Collections";
import {SessionData} from "src/model/data/SessionData";
import {Question} from "src/model/test/Question";

export abstract class Session<Q extends Question> {

	private data: SessionData = null;
	private dataBuilder = new SessionData.Builder();

	private question: Q = null;
	private index = 0;

	protected constructor(userId: string, groupId: string, details: Dictionary<string>) {
		this.dataBuilder.setUserId(userId);
		this.dataBuilder.setGroupId(groupId);
		for (const key in details) this.dataBuilder.setDetail(key, details[key]);
	}

	next(): Q {
		if (this.dataBuilder) {
			if (this.question) {
				const data = this.question.getData();
				this.dataBuilder.addQuestion(data);
			}

			this.question = this.onNext(this.index);
			if (this.question) this.index++;
			return this.question;
		} else {
			throw Error("The session has been finished");
		}
	}

	finish() {
		if (this.dataBuilder) {
			const details = this.onFinish();
			for (const key in details) this.dataBuilder.setDetail(key, details[key]);
			this.data = this.dataBuilder.build();
			this.dataBuilder = null;
		} else {
			throw Error("The session has been finished");
		}
	}

	getData(): SessionData {
		if (this.data) {
			return this.data;
		} else {
			throw Error("The session hasn't been finished");
		}
	}

	protected abstract onNext(index: number): Q;
	protected abstract onFinish(): Dictionary<string>;
}