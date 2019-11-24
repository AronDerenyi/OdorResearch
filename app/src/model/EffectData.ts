import {EventData} from "src/model/EventData";

export class EffectData {

	startTime: number;
	events: EventData<string>[];
	input: string;
}