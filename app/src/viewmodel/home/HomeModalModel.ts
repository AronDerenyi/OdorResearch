import Vue from "vue";
import {Locale} from "src/locale/Locale";
import {ViewModel} from "src/viewmodel/ViewModel";

export class HomeModalModel extends ViewModel {

	readonly title: string;

	readonly groupCodeHint: string;
	readonly groupCodePlaceholder: string;
	groupCode: string = "";

	readonly showTerms: boolean;
	readonly terms: string;
	readonly acceptTerms: string;

	// internal
	private readonly selectedTest: string;
	private readonly acceptCallback: (code: string) => void;

	constructor(selectedTest: string, acceptCallback: (code: string) => void) {
		super();

		this.selectedTest = selectedTest;
		this.acceptCallback = acceptCallback;

		this.localeChanged(Locale.getLocale());
		this.addDisposable(Locale.watchLocale((locale) => this.localeChanged(locale)));
	}

	get showNext(): boolean {
		return this.groupCode == "test";
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

	private localeChanged(locale: string) {
		Vue.set(this, "huSelected", locale == Locale.HU_LOCALE);
		Vue.set(this, "enSelected", locale == Locale.EN_LOCALE);

		Vue.set(this, "groupCodeHint", Locale.getString("enter_group_code"));
		Vue.set(this, "groupCodePlaceholder", Locale.getString("group_code"));
		Vue.set(this, "acceptTerms", Locale.getString("accept_terms"));

		switch (this.selectedTest) {
			case "creativity":
				Vue.set(this, "title", Locale.getString("creativity_test"));
				Vue.set(this, "terms", Locale.getString("creativity_test_terms"));
				break;
			case "memory":
				Vue.set(this, "title", Locale.getString("memory_test"));
				Vue.set(this, "terms", Locale.getString("memory_test_terms"));
				break;
			case "mood":
				Vue.set(this, "title", Locale.getString("mood_test"));
				Vue.set(this, "terms", Locale.getString("mood_test_terms"));
				break;
		}
	}
}
