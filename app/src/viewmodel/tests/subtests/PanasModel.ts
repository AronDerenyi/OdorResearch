import {ViewModel} from "src/viewmodel/ViewModel";
import Vue from "vue";
import {EventData} from "src/model/EventData";
import {TellegenData} from "src/model/TellegenData";
import {StringProvider} from "src/providers/StringProvider";

export class TellegenModel extends ViewModel {

	// internal
	private static readonly QUESTION_COUNT = 34;

	private readonly data: TellegenData;
	private readonly finishCallback: () => void;
	private values: boolean[] = [];

	constructor(
		data: TellegenData,
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

	get questionCount() { return TellegenModel.QUESTION_COUNT }

	get showFinish() {
		for (let index = 0; index < TellegenModel.QUESTION_COUNT; index++) {
			if (this.values[index] == null) return false;
		}
		return true;
	}

	title(index: number) {
		return this.strings["tellegen_" + (index + 1)];
	}

	get options(): ReadonlyArray<string> {
		return [this.strings["yes"], this.strings["no"]];
	}

	selected(index: number) {
		const value = this.values[index];
		return value == null ? null : value ? 0 : 1;
	}

	select(index: number, selected: number) {
		const value = selected === 0;
		this.data.events.push(new EventData(Date.now() - this.data.startTime, {index, value}));
		Vue.set(this.values, index, value);
	}
}
