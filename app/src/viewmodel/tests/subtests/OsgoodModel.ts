import {ViewModel} from "src/viewmodel/ViewModel";
import Vue from "vue";
import {EventData} from "src/model/EventData";
import {TellegenData} from "src/model/TellegenData";
import {StringProvider} from "src/providers/StringProvider";
import {PanasData} from "src/model/PanasData";
import {OsgoodData} from "src/model/OsgoodData";

export class OsgoodModel extends ViewModel {

	// internal
	private static readonly QUESTION_COUNT = 18;
	private static readonly OPTION_COUNT = 5;

	private readonly data: OsgoodData;
	private readonly finishCallback: () => void;
	private values: number[] = [];

	constructor(
		data: OsgoodData,
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

	finish() {
		this.data.values = this.values;
		this.finishCallback();
	}

	get questionCount() { return OsgoodModel.QUESTION_COUNT }

	get showFinish() {
		for (let index = 0; index < OsgoodModel.QUESTION_COUNT; index++) {
			if (this.values[index] == null) return false;
		}
		return true;
	}

	left(index: number) {
		return this.strings["osgood_" + index + "_left"];
	}

	right(index: number) {
		return this.strings["osgood_" + index + "_right"];
	}

	get optionCount() { return OsgoodModel.OPTION_COUNT }

	selected(index: number) {
		return this.values[index];
	}

	select(index: number, selected: number) {
		this.data.events.push(new EventData(Date.now() - this.data.startTime, {index, value: selected}));
		Vue.set(this.values, index, selected);
	}
}
