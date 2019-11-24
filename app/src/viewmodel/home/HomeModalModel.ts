import Vue from "vue";
import {ViewModel} from "src/viewmodel/ViewModel";
import {GroupCode} from "src/code/GroupCode";

export class HomeModalModel extends ViewModel {

	groupCode: string = "";

	readonly showTerms: boolean;

	// internal
	private readonly selectedTest: string;
	private readonly acceptCallback: (code: string) => void;

	constructor(selectedTest: string, acceptCallback: (code: string) => void) {
		super();

		this.selectedTest = selectedTest;
		this.acceptCallback = acceptCallback;
	}

	get title() {
		switch (this.selectedTest) {
			case "creativity":
				return this.strings["creativity_test"];
			case "memory":
				return this.strings["memory_test"];
			case "mood":
				return this.strings["mood_test"];
			default:
				return "";
		}
	}

	get terms() {
		switch (this.selectedTest) {
			case "creativity":
				return GroupCode.isControl(this.groupCode) ?
					this.strings["creativity_test_control_terms"] :
					this.strings["creativity_test_terms"];
			case "memory":
				return GroupCode.isReturning(this.groupCode) ?
					(GroupCode.isControl(this.groupCode) ?
						this.strings["memory_returning_test_control_terms"] :
						this.strings["memory_returning_test_terms"]) :
					(GroupCode.isControl(this.groupCode) ?
						this.strings["memory_test_control_terms"] :
						this.strings["memory_test_terms"]);
			case "mood":
				return GroupCode.isControl(this.groupCode) ?
					this.strings["mood_test_control_terms"] :
					this.strings["mood_test_terms"];
			default:
				return "";
		}
	}

	get groupCodeHelp() { return this.strings["enter_group_code"] }
	get groupCodeHint() { return this.strings["group_code_hint"] }
	get acceptTerms() { return this.strings["accept_terms"] }

	get showNext() {
		return GroupCode.verify(this.groupCode) && (
			GroupCode.getTest(this.groupCode) == this.selectedTest ||
			GroupCode.isDebug(this.groupCode)
		);
	}

	back() {
		Vue.set(this, "showTerms", false);
	}

	next() {
		Vue.set(this, "showTerms", true);
	}

	accept() {
		this.acceptCallback(this.groupCode);
	}
}
