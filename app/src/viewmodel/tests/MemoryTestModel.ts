import Vue from "vue";
import {Locale} from "src/locale/Locale";
import {ViewModel} from "src/viewmodel/ViewModel";
import {FirstQuestionsModel} from "src/viewmodel/questions/FirstQuestionsModel";

export class MemoryTestModel extends ViewModel {

	readonly subTest: (FirstQuestionsModel);

	constructor() {
		super();

		this.localeChanged(Locale.getLocale());
		this.addDisposable(Locale.watchLocale((locale) => this.localeChanged(locale)));

		Vue.set(this, "subTest", new FirstQuestionsModel(() => {}))
	}

	private localeChanged(locale: string) {

	}
}
