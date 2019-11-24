import {EventData} from "src/model/EventData";

export class UnusualUseData {

	startTime: number;
	events: EventData<string>[];
	input: string;
}