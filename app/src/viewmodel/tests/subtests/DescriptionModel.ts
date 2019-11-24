import {ViewModel} from "src/viewmodel/ViewModel";

export class DescriptionModel extends ViewModel {

	passcode: string = null;

	// internal
	private readonly descriptionStringId: string;
	private readonly passcodeRegex: RegExp;
	private readonly startCallback: () => void;

	constructor(descriptionStringId: string, passcodeRegex: RegExp, startCallback: () => void) {
		super();

		this.descriptionStringId = descriptionStringId;
		this.passcodeRegex = passcodeRegex;
		this.startCallback = startCallback;
	}

	get description() { return this.strings[this.descriptionStringId] }
	get startString() { return this.strings["start"] }
	get passcodeHint() { return this.strings["passcode_hint"] }

	get passcodeRequired() {
		return this.passcodeRegex != null;
	}

	get showStart() {
		return this.passcodeRegex.test(this.passcode);
	}

	start() {
		if (!this.passcodeRequired || this.showStart) this.startCallback();
	}
}
