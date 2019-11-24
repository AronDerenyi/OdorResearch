import Vue from "vue";
import {StringProvider} from "src/providers/StringProvider";
import {ViewModel, Event} from "src/viewmodel/ViewModel";
import {HomeModalModel} from "src/viewmodel/home/HomeModalModel";

export class HomeModel extends ViewModel {

	readonly showModal: boolean;
	readonly modalModel: HomeModalModel;

	readonly huSelected: boolean = StringProvider.getLanguage() == StringProvider.HU;
	readonly enSelected: boolean = StringProvider.getLanguage() == StringProvider.EN;

	readonly navigateToCreativityTest: Event<string> = null;
	readonly navigateToMemoryTest: Event<string> = null;
	readonly navigateToMoodTest: Event<string> = null;

	// internal
	private selectedTest: ("creativity" | "memory" | "mood") = null;

	constructor() {
		super();

		this.addDisposable(StringProvider.watchLanguage((language) => {
			Vue.set(this, "huSelected", language == StringProvider.HU);
			Vue.set(this, "enSelected", language == StringProvider.EN);
		}));
	}

	get creativityTestTitle() {return this.strings["creativity_test"]}
	get memoryTestTitle() { return this.strings["memory_test"] }
	get moodTestTitle() { return this.strings["mood_test"] }
	get select() { return this.strings["select"] }

	dispose() {
		if (this.modalModel != null) this.modalModel.dispose();
		super.dispose();
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
		StringProvider.setLanguage(StringProvider.HU);
	}

	setLanguageEN() {
		StringProvider.setLanguage(StringProvider.EN);
	}

	private accept(groupCode: string) {
		switch (this.selectedTest) {
			case "creativity":
				Vue.set(this, "navigateToCreativityTest", new Event(groupCode));
				break;
			case "memory":
				Vue.set(this, "navigateToMemoryTest", new Event(groupCode));
				break;
			case "mood":
				Vue.set(this, "navigateToMoodTest", new Event(groupCode));
				break;
		}
	}
}
