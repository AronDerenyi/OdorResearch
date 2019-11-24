import {EventData} from "src/model/EventData";

export class IapsData {

	startTime: number;
	image: string;
	selectEvent: EventData<boolean>;
	rateEvent: EventData<number>;
	rating: number;
}