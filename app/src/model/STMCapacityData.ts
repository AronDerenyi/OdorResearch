import {EventData} from "src/model/EventData";

export class GottschalkData {

	nonWord: string;
	learningTimerLength: number;
	repeatingTimerLength: number;

	startTime: number;
	events: EventData<string>[];
	input: string;
}