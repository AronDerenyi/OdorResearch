import {ViewModel} from "src/viewmodel/ViewModel";
import {QuestionsData} from "src/model/QuestionsData";
import {GottschalkData} from "src/model/GottschalkData";
import {EventData} from "src/model/EventData";

export class AssociationModel extends ViewModel {

	// internal
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

	finish() {
		this.data.input = this.internalInput;
		this.finishCallback();
	}

	start() {
		this.data.startTime = Date.now();
		this.data.events = [];
	}

	get associationTitle() { return this.strings["association_title"] }
	get showFinish() { return this.association.length > 0 }

	get association() {
		return this.internalInput;
	}

	set association(input) {
		this.data.events.push(new EventData<string>(Date.now() - this.data.startTime, input));
		this.internalInput = input;
	}
}
