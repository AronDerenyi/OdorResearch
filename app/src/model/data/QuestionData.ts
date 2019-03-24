import {Dictionary, ReadonlyDictionary} from "src/util/Collections";
import {EventData} from "src/model/data/EventData";

export class QuestionData {

	readonly type: string;
	readonly details: ReadonlyDictionary<string>;
	readonly events: ReadonlyArray<EventData> = [];

	constructor(type: string, details: Dictionary<string>, events: Array<EventData>) {
		this.type = type;

		const detailsClone: Dictionary<string> = {};
		for (const key in details) detailsClone[key] = details[key];
		this.details = detailsClone;

		const eventsClone: Array<EventData> = [];
		events.forEach((question) => eventsClone.push(question));
		this.events = eventsClone;
	}
}

export module QuestionData {

	export class Builder {

		private type: string;
		private readonly details: Dictionary<string> = {};
		private readonly events: Array<EventData> = [];

		setType(type: string): Builder {
			this.type = type;
			return this;
		}

		setDetail(key: string, detail: string): Builder {
			this.details[key] = detail;
			return this;
		}

		addEvent(event: EventData): Builder {
			this.events.push(event);
			return this;
		}

		build(): QuestionData {
			return new QuestionData(this.type, this.details, this.events);
		}
	}
}