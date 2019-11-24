import {EventData} from "src/model/EventData";

export class ValenceData {

	startTime: number;

	pleasantnessEvents: EventData<number>[];
	impactEvents: EventData<number>[];
	expectationEvents: EventData<string>[];

	pleasantness: number;
	impact: number;
	expectation: string;
}