import {EventData} from "src/model/EventData";

export class FaceScaleData {

	startTime: number;
	events: EventData<number>[];
	value: number;
}