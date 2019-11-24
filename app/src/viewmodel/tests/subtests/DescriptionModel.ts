import Vue from "vue";
import {Locale} from "src/locale/Locale";
import {ViewModel} from "src/viewmodel/ViewModel";

export class GottschalkModel extends ViewModel {

	readonly showNext: boolean = true;

	readonly textLimit: number = 350;
	text: string = "";

	// internal
	private readonly finishCallback: () => void;

	constructor(finishCallback: () => void) {
		super();

		this.finishCallback = finishCallback;

		this.localeChanged(Locale.getLocale());
		this.addDisposable(Locale.watchLocale((locale) => this.localeChanged(locale)));
	}

	private localeChanged(locale: string) {

	}

	next() {
		this.finishCallback();
	}
}
