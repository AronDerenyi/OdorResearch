import {EventData} from "src/model/EventData";

export class ColorData {

	startTime: number;
	events: EventData<string>[];
	value: string;
}