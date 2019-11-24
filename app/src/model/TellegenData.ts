import {EventData} from "src/model/EventData";

export class TellegenData {

	startTime: number;
	events: EventData<{index: number, value: boolean}>[];
	values: boolean[];
}