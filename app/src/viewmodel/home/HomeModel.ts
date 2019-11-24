import Vue from "vue";
import {Locale} from "src/locale/Locale";
import {ViewModel, Event} from "src/viewmodel/ViewModel";
import {HomeModalModel} from "src/viewmodel/HomeModalModel";

export class HomeModel extends ViewModel {

	readonly creativityTestTitle: string;
	readonly memoryTestTitle: string;
	readonly moodTestTitle: string;
	readonly select: string;

	readonly showModal: boolean;
	readonly modalModel: HomeModalModel;

	readonly huSelected: boolean;
	readonly enSelected: boolean;

	readonly navigateToCreativityTest: Event = null;
	readonly navigateToMemoryTest: Event = null;
	readonly navigateToMoodTest: Event = null;

	// internal
	private selectedTest: ("creativity" | "memory" | "mood") = null;

	constructor() {
		super();

		this.localeChanged(Locale.getLocale());
		this.addDisposable(Locale.watchLocale((locale) => this.localeChanged(locale)));
	}

	dispose() {
		super.dispose();
		if (this.modalModel != null) this.modalModel.dispose();
	}

	back() {
		if (this.showModal) {
			if (this.modalModel.showTerms) {
				this.modalModel.back();
			} else {
				this.modalModel.dispose();
				Vue.set(this, "showModal", false);
				Vue.set(this, "modalModel", null);
			}
		}
	}

	selectCreativityTest() {
		this.selectedTest = "creativity";
		Vue.set(this, "showModal", true);
		Vue.set(this, "modalModel", new HomeModalModel(this.selectedTest, (code) => this.accept(code)));
	}

	selectMemoryTest() {
		this.selectedTest = "memory";
		Vue.set(this, "showModal", true);
		Vue.set(this, "modalModel", new HomeModalModel(this.selectedTest, (code) => this.accept(code)));
	}

	selectMoodTest() {
		this.selectedTest = "mood";
		Vue.set(this, "showModal", true);
		Vue.set(this, "modalModel", new HomeModalModel(this.selectedTest, (code) => this.accept(code)));
	}

	setLanguageHU() {
		Locale.setLocale(Locale.HU_LOCALE);
	}

	setLanguageEN() {
		Locale.setLocale(Locale.EN_LOCALE);
	}

	private accept(groupCode: string) {
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
		}
	}

	private localeChanged(locale: string) {
		Vue.set(this, "huSelected", locale == Locale.HU_LOCALE);
		Vue.set(this, "enSelected", locale == Locale.EN_LOCALE);

		Vue.set(this, "creativityTestTitle", Locale.getString("creativity_test"));
		Vue.set(this, "memoryTestTitle", Locale.getString("memory_test"));
		Vue.set(this, "moodTestTitle", Locale.getString("mood_test"));
		Vue.set(this, "select", Locale.getString("select"));

		Vue.set(this, "modalSubTitle", Locale.getString("enter_group_code"));
		Vue.set(this, "modalGroupCode", Locale.getString("group_code"));
	}
}
