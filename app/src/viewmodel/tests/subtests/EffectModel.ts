import {ViewModel} from "src/viewmodel/ViewModel";
import {EventData} from "src/model/EventData";
import {AssociationData} from "src/model/AssociationData";
import {EffectData} from "src/model/EffectData";

export class EffectModel extends ViewModel {

	// internal
	private readonly data: EffectData;
	private readonly finishCallback: () => void;
	private internalInput: string = "";

	constructor(
		data: EffectData,
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
		this.data.input = this.internalInput;
		this.finishCallback();
	}

	get effectTitle() { return this.strings["effect_title"] }
	get showFinish() { return this.input.length > 0 }

	get input() {
		return this.internalInput;
	}

	set input(input) {
		this.data.events.push(new EventData<string>(Date.now() - this.data.startTime, input));
		this.internalInput = input;
	}
}
