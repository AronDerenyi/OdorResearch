import {TimedViewModel} from "src/viewmodel/TimedViewModel";
import {UnusualUseData} from "src/model/UnusualUseData";
import {EventData} from "src/model/EventData";

export class UnusualUseModel extends TimedViewModel {

	// internal
	private static readonly TIMER_MILLIS = 120000;

	private readonly titleStringId: string;
	private readonly data: UnusualUseData;
	private readonly finishCallback: () => void;
	private internalInput: string = "";

	constructor(
		titleStringId: string,
		data: UnusualUseData,
		finishCallback: () => void
	) {
		super();

		this.titleStringId = titleStringId;
		this.data = data;
		this.finishCallback = finishCallback;
	}

	start() {
		this.data.startTime = Date.now();
		this.data.events = [];

		this.startTimer(UnusualUseModel.TIMER_MILLIS, () => {
			this.data.input = this.input;
			this.finishCallback();
		});
	}

	get title() {
		return this.strings[this.titleStringId];
	}

	get hint() {
		return this.strings["unusual_use_hint"];
	}

	get input() {
		return this.internalInput;
	}

	set input(input) {
		this.data.events.push(new EventData<string>(Date.now() - this.data.startTime, input));
		this.internalInput = input;
	}
}
