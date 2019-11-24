import {EventData} from "src/model/EventData";

export class GottschalkData {

	timerLength: number;
	maxLength: number;

	startTime: number;
	events: EventData<string>[];
	input: string;
}