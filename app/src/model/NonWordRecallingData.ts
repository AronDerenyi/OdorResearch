import {EventData} from "src/model/EventData";

export class NonWordRecallingData {

	startTime: number;
	nonWord: string;
	meaning: string;
	events: EventData<string>[];
	input: string;
}