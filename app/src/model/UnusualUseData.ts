import {EventData} from "src/model/EventData";

export class AssociationData {

	startTime: number;
	events: EventData<string>[];
	input: string;
}