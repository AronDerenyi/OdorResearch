import Vue from "vue";
import {ViewModelProvider} from "src/util/ViewModelProvider";
import {PreferencesInteractor} from "src/model/interactors/PreferencesInteractor";

export class PreferencesViewModel {

	private static provider = new ViewModelProvider<PreferencesViewModel>(() => new PreferencesViewModel());

	public static requireInstance(): PreferencesViewModel {
		return this.provider.requireInstance();
	}

	public static releaseInstance() {
		return this.provider.releaseInstance();
	}

	static readonly PREFERENCES_LOCALE = "locale";
	static readonly DEFAULT_LOCALE = "hu";

	readonly locale: string;

	constructor() {
		this.setLocale(PreferencesInteractor.get(
			PreferencesViewModel.PREFERENCES_LOCALE,
			PreferencesViewModel.DEFAULT_LOCALE
		));
	}

	setLocale(locale: string) {
		Vue.set(this, "locale", locale);
		PreferencesInteractor.set(PreferencesViewModel.PREFERENCES_LOCALE, locale);
	};
}
