import {Dictionary} from "src/util/Collections";
import {QuestionData} from "src/model/data/QuestionData";
import {EventData} from "src/model/data/EventData";

export abstract class Question {

	private readonly questionStartTime = Date.now();

	private data: QuestionData = null;
	private dataBuilder = new QuestionData.Builder();

	protected constructor(type: string, details: Dictionary<string>) {
		this.dataBuilder.setType(type);
		for (const key in details) this.dataBuilder.setDetail(key, details[key]);
	}

	protected event(type: string, message: string) {
		if (this.dataBuilder) {
			const time = Date.now() - this.questionStartTime;
			const event = new EventData(time, type, message);
			this.dataBuilder.addEvent(event);
		} else {
			throw Error("The question has been finished");
		}
	}

	finish() {
		if (this.dataBuilder) {
			const details = this.onFinish();
			for (const key in details) this.dataBuilder.setDetail(key, details[key]);
			this.data = this.dataBuilder.build();
			this.dataBuilder = null;
		} else {
			throw Error("The question has been finished");
		}
	}

	getData(): QuestionData {
		if (this.data) {
			return this.data;
		} else {
			throw Error("The question hasn't been finished");
		}
	}

	protected abstract onFinish(): Dictionary<string>;
}
