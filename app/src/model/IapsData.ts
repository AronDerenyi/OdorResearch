import {EventData} from "src/model/EventData";

export class PanasData {

	startTime: number;
	events: EventData<{index: number, value: number}>[];
	values: number[];
}