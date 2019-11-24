import {ViewModel} from "src/viewmodel/ViewModel";
import Vue from "vue";
import {EventData} from "src/model/EventData";
import {TellegenData} from "src/model/TellegenData";
import {StringProvider} from "src/providers/StringProvider";
import {PanasData} from "src/model/PanasData";

export class PanasModel extends ViewModel {

	// internal
	private static readonly QUESTION_COUNT = 20;
	private static readonly MIN_VALUE = 1;
	private static readonly MAX_VALUE = 5;

	private readonly data: PanasData;
	private readonly finishCallback: () => void;
	private values: number[] = [];

	constructor(
		data: PanasData,
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

	get questionCount() { return PanasModel.QUESTION_COUNT }

	get showFinish() {
		for (let index = 0; index < PanasModel.QUESTION_COUNT; index++) {
			if (this.values[index] == null) return false;
		}
		return true;
	}

	title(index: number) {
		return this.strings["panas_" + index];
	}

	get min() { return PanasModel.MIN_VALUE }
	get max() { return PanasModel.MAX_VALUE }

	selected(index: number) {
		return this.values[index];
	}

	select(index: number, selected: number) {
		this.data.events.push(new EventData(Date.now() - this.data.startTime, {index, value: selected}));
		Vue.set(this.values, index, selected);
	}
}
