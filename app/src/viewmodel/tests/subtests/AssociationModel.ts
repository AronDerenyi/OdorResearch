import {ViewModel} from "src/viewmodel/ViewModel";
import {EventData} from "src/model/EventData";
import {AssociationData} from "src/model/AssociationData";

export class AssociationModel extends ViewModel {

	// internal
	private readonly data: AssociationData;
	private readonly finishCallback: () => void;
	private internalInput: string = "";

	constructor(
		data: AssociationData,
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

	get associationTitle() { return this.strings["association_title"] }
	get showFinish() { return this.input.length > 0 }

	get input() {
		return this.internalInput;
	}

	set input(input) {
		this.data.events.push(new EventData<string>(Date.now() - this.data.startTime, input));
		this.internalInput = input;
	}
}
