import {EventData} from "src/model/EventData";

export class STMCapacityData {

	numbers: number[];
	learningTimerLength: number;
	repeatingTimerLength: number;

	startTime: number;
	events: EventData<number>[];
	input: number[];
}