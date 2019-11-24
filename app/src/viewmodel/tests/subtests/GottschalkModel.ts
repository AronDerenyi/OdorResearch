import {TimedViewModel} from "src/viewmodel/TimedViewModel";
import {GottschalkData} from "src/model/GottschalkData";
import {EventData} from "src/model/EventData";

export class GottschalkModel extends TimedViewModel {

	// internal
	private static readonly MAX_LENGTH = 350;
	private static readonly TIMER_MILLIS = 150000;

	private readonly data: GottschalkData;
	private readonly finishCallback: () => void;
	private internalInput: string = "";

	constructor(
		data: GottschalkData,
		finishCallback: () => void
	) {
		super();

		this.data = data;
		this.finishCallback = finishCallback;
	}

	start() {
		this.data.startTime = Date.now();
		this.data.events = [];

		this.startTimer(GottschalkModel.TIMER_MILLIS, () => {
			this.data.input = this.input;
			this.finishCallback();
		});
	}

	get maxLength() { return GottschalkModel.MAX_LENGTH }

	get input() {
		return this.internalInput;
	}

	set input(input) {
		this.data.events.push(new EventData<string>(Date.now() - this.data.startTime, input));
		this.internalInput = input;
	}
}
