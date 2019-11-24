import {EventData} from "src/model/EventData";

export class STMCapacityData {

	startTime: number;
	numbers: number[];
	events: EventData<number>[];
	input: number[];
}