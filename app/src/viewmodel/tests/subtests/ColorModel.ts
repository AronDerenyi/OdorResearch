import {ViewModel} from "src/viewmodel/ViewModel";
import {EventData} from "src/model/EventData";
import {ColorData} from "src/model/ColorData";

export class ColorModel extends ViewModel {

	// internal
	private readonly data: ColorData;
	private readonly finishCallback: () => void;
	private internalValue: string = null;

	constructor(
		data: ColorData,
		finishCallback: () => void
	) {
		super();

		this.data = data;
		this.finishCallback = finishCallback;
	}

	start() {
		this.data.startTime = Date.now();
		this.data.events = [];
	}

	get showFinish() {
		return this.value != null
	}

	finish() {
		this.data.value = this.value;
		this.finishCallback();
		console.log(this.data);
	}

	get title() { return this.strings["color_title"] }
	get value() {
		return this.internalValue;
	}
	set value(value) {
		this.data.events.push(new EventData(Date.now() - this.data.startTime, value));
		this.internalValue = value;
	}
}
