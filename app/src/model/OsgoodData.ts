import {EventData} from "src/model/EventData";

export class OsgoodData {

	startTime: number;
	events: EventData<{index: number, value: number}>[];
	values: number[];
}