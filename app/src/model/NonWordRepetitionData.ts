import {EventData} from "src/model/EventData";

export class NonWordRepetitionData {

	startTime: number;
	nonWord: string;
	events: EventData<string>[];
	input: string;
}