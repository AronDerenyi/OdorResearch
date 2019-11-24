import {ViewModel} from "src/viewmodel/ViewModel";
import {QuestionsData} from "src/model/QuestionsData";
import {GottschalkData} from "src/model/GottschalkData";
import {EventData} from "src/model/EventData";
import {ValenceData} from "src/model/ValenceData";
import {FaceScaleData} from "src/model/FaceScaleData";

export class FaceScaleModel extends ViewModel {

	// internal
	private readonly data: FaceScaleData;
	private readonly finishCallback: () => void;
	private internalValue: number = null;

	constructor(
		data: FaceScaleData,
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
	}

	get title() { return this.strings["face_scale_title"] }
	get value() {
		return this.internalValue;
	}
	set value(input) {
		this.data.events.push(new EventData(Date.now() - this.data.startTime, input));
		this.internalValue = input;
	}
}
