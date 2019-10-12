import Vue from "vue";
import {Locale} from "src/locale/Locale";
import {ViewModel, Event} from "src/viewmodel/ViewModel";

export default class HomeModel extends ViewModel {

	readonly creativityTestTitle: string;
	readonly creativityTestDescription: string;

	readonly memoryTestTitle: string;
	readonly memoryTestDescription: string;

	readonly moodTestTitle: string;
	readonly moodTestDescription: string;

	readonly showTerms: boolean;
	readonly termsTitle: string;
	readonly termsContent: string;
	readonly acceptAndStart: string;

	readonly huSelected: boolean;
	readonly enSelected: boolean;

	readonly navigateToCreativityTest: Event = null;
	readonly navigateToMemoryTest: Event = null;
	readonly navigateToMoodTest: Event = null;

	private selectedTest: ("creativity" | "memory" | "mood") = null;

	constructor() {
		super();

		this.localeChanged(Locale.getLocale());
		this.addDisposable(Locale.watchLocale((locale) => this.localeChanged(locale)));
	}

	unselectTest() {
		this.selectedTest = null;
		Vue.set(this, "showTerms", false);
		this.updateTerms();
	}

	selectCreativityTest() {
		this.selectedTest = "creativity";
		Vue.set(this, "showTerms", true);
		this.updateTerms();
	}

	selectMemoryTest() {
		this.selectedTest = "memory";
		Vue.set(this, "showTerms", true);
		this.updateTerms();
	}

	selectMoodTest() {
		this.selectedTest = "mood";
		Vue.set(this, "showTerms", true);
		this.updateTerms();
	}

	setLanguageHU() {
		Locale.setLocale(Locale.HU_LOCALE);
	}

	setLanguageEN() {
		Locale.setLocale(Locale.EN_LOCALE);
	}

	startTest() {
		switch (this.selectedTest) {
			case "creativity":
				Vue.set(this, "navigateToCreativityTest", new Event());
				break;
			case "memory":
				Vue.set(this, "navigateToMemoryTest", new Event());
				break;
			case "mood":
				Vue.set(this, "navigateToMoodTest", new Event());
				break;
		}}

	private localeChanged(locale: string) {
		Vue.set(this, "huSelected", locale == Locale.HU_LOCALE);
		Vue.set(this, "enSelected", locale == Locale.EN_LOCALE);

		this.updateStrings();
		this.updateTerms();
	}

	private updateStrings() {
		Vue.set(this, "creativityTestTitle", Locale.getString("creativity_test"));
		Vue.set(this, "creativityTestDescription", Locale.getString("creativity_test_description"));

		Vue.set(this, "memoryTestTitle", Locale.getString("memory_test"));
		Vue.set(this, "memoryTestDescription", Locale.getString("memory_test_description"));

		Vue.set(this, "moodTestTitle", Locale.getString("mood_test"));
		Vue.set(this, "moodTestDescription", Locale.getString("mood_test_description"));

		Vue.set(this, "acceptAndStart", Locale.getString("accept_and_start_test"));
	}

	private updateTerms() {
		switch (this.selectedTest) {
			case "creativity":
				Vue.set(this, "termsTitle", Locale.getString("creativity_test"));
				Vue.set(this, "termsContent", Locale.getString("creativity_test_terms"));
				break;
			case "memory":
				Vue.set(this, "termsTitle", Locale.getString("memory_test"));
				Vue.set(this, "termsContent", Locale.getString("memory_test_terms"));
				break;
			case "mood":
				Vue.set(this, "termsTitle", Locale.getString("mood_test"));
				Vue.set(this, "termsContent", Locale.getString("mood_test_terms"));
				break;
		}
	}
}
