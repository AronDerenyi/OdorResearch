import Vue from "vue";
import {Locale} from "src/locale/Locale";
import {ViewModel, Event} from "src/viewmodel/ViewModel";

export class FirstQuestionsModel extends ViewModel {

	readonly group: number;

	// First group

	readonly genderTitle: string;
	readonly genderOptions: ReadonlyArray<string>;
	gender: number = null;

	readonly birthTitle: string;
	readonly birthYearOptions: ReadonlyArray<string>;
	readonly birthMonthOptions: ReadonlyArray<string>;
	birthYear: number = null;
	birthMonth: number = null;

	readonly residenceTitle: string;
	readonly residenceOptions: ReadonlyArray<string>;
	residence: number = null;

	// Second group

	readonly bookshelvesTitle: string;
	readonly bookshelvesOptions: ReadonlyArray<string>;
	bookshelves: number = null;

	readonly foreignLanguagesTitle: string;
	readonly foreignLanguagesOptions: ReadonlyArray<string>;
	foreignLanguages: number = null;

	readonly educationTitle: string;
	readonly educationMotherTitle: string;
	readonly educationFatherTitle: string;
	readonly educationOptions: ReadonlyArray<string>;
	education: number = null;
	educationMother: number = null;
	educationFather: number = null;

	// Third group

	readonly sleepingHoursTitle: string;
	readonly sleepingHoursOptions: ReadonlyArray<string>;
	hoursSlept: number = null;

	readonly coffeeConsumptionTitle: string;
	readonly coffeeConsumptionOptions: ReadonlyArray<string>;
	consumedCoffee: number = null;

	readonly cigaretteConsumptionTitle: string;
	readonly cigaretteConsumptionOptions: ReadonlyArray<string>;
	consumedCigarette: number = null;

	readonly smokingTitle: string;
	readonly smokingOptions: ReadonlyArray<string>;
	smoking: number = null;

	// internal
	private readonly finishCallback: () => void;

	constructor(finishCallback: () => void) {
		super();

		this.finishCallback = finishCallback;

		this.localeChanged(Locale.getLocale());
		this.addDisposable(Locale.watchLocale((locale) => this.localeChanged(locale)));

		Vue.set(this, "group", 0);
	}

	private localeChanged(locale: string) {

	}

	get showNext(): boolean {
		switch (this.group) {
			case 0:
				return this.gender != null &&
					this.birthYear != null &&
					this.birthMonth != null &&
					this.residence != null;
			case 1:
				return this.bookshelves != null &&
					this.foreignLanguages != null &&
					this.education != null &&
					this.educationMother != null &&
					this.educationFather != null;
			case 2:
				return this.hoursSlept != null &&
					this.consumedCoffee != null &&
					this.consumedCigarette != null &&
					this.smoking != null;
			default:
				return false;
		}
	}

	next() {
		switch (this.group) {
			case 0:
				Vue.set(this, "group", 1);
				break;
			case 1:
				Vue.set(this, "group", 2);
				break;
			case 2:
				this.finishCallback();
				break;
		}
	}
}
