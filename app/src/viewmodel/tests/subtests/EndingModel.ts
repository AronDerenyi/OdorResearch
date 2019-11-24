import {ViewModel} from "src/viewmodel/ViewModel";
import {TestSession} from "src/model/TestSession";

export class EndingModel extends ViewModel {

	response: string = "";

	// internal
	private readonly session: TestSession;
	private readonly submitCallback: () => void;

	constructor(
		session: TestSession,
		submitCallback: () => void
	) {
		super();

		this.session = session;
		this.submitCallback = submitCallback;
	}

	submit() {
		this.session.response = this.response;
		this.submitCallback();
	}

	get thankYou() { return this.strings["thank_you"] }
	get responseHint() { return this.strings["response_hint"] }
	get submitString() { return this.strings["submit"] }
}
