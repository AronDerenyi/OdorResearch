import {ViewModel} from "src/viewmodel/ViewModel";
import {QuestionsData} from "src/model/QuestionsData";

export class EndingModel extends ViewModel {

	response: string = "";

	// internal
	private readonly submitCallback: (response: string) => void;

	constructor(
		data: QuestionsData,
		submitCallback: () => void
	) {
		super();

		this.submitCallback = submitCallback;
	}

	submit() {
		this.submitCallback(this.response);
	}

	get thankYou() { return this.strings["thank_you"] }
	get responseTitle() { return this.strings["response_title"] }
	get submitString() { return this.strings["submit"] }
}
