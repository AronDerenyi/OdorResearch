import {ViewModel} from "src/viewmodel/ViewModel";
import Vue from "vue";
import {QuestionsData} from "src/model/QuestionsData";

export class Questions1Model extends ViewModel {

	readonly group: number;

	gender: number = null;
	birthYear: number = null;
	birthMonth: number = null;
	residence: number = null;

	bookshelves: number = null;
	foreignLanguages: number = null;
	education: number = null;
	educationMother: number = null;
	educationFather: number = null;

	hoursSlept: number = null;
	consumedCoffee: number = null;
	consumedCigarette: number = null;
	smoking: number = null;

	// internal
	private static readonly MIN_BIRTH_YEARS = 1930;
	private static readonly MAX_BIRTH_YEARS = 2001;

	private static readonly MAX_BOOKSHELVES = 10;
	private static readonly MAX_FOREIGN_LANGUAGES = 5;

	private static readonly MAX_SLEEPING_HOURS = 12;
	private static readonly SMOKING_MONTHS = [1, 3, 6];
	private static readonly SMOKING_YEARS = [1, 3, 5];

	private readonly data: QuestionsData;
	private readonly finishCallback: () => void;

	constructor(
		data: QuestionsData,
		finishCallback: () => void
	) {
		super();

		this.data = data;
		this.finishCallback = finishCallback;

		Vue.set(this, "group", 0);
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
				this.data.gender = Object.values(QuestionsData.Gender)[this.gender];
				this.data.birthYear = Questions1Model.MAX_BIRTH_YEARS - this.birthYear;
				this.data.birthMonth = Object.values(QuestionsData.Month)[this.birthMonth];
				this.data.residence = Object.values(QuestionsData.Residence)[this.residence];

				Vue.set(this, "group", 1);
				break;
			case 1:
				this.data.bookshelves = this.bookshelves;
				this.data.foreignLanguages = this.foreignLanguages;
				this.data.education = Object.values(QuestionsData.Education)[this.education];
				this.data.educationMother = Object.values(QuestionsData.Education)[this.educationMother];
				this.data.educationFather = Object.values(QuestionsData.Education)[this.educationFather];

				Vue.set(this, "group", 2);
				break;
			case 2:
				this.data.hoursSlept = this.hoursSlept;
				this.data.consumedCoffee = this.consumedCoffee != 0;
				this.data.consumedCigarette = this.consumedCigarette != 0;

				const smokingMonths = Questions1Model.SMOKING_MONTHS;
				const smokingYears = Questions1Model.SMOKING_YEARS;
				if (this.smoking < 1) {
					this.data.smoking = 0;
				} else if (this.smoking - 1 < smokingMonths.length) {
					this.data.smoking = smokingMonths[this.smoking - 1];
				} else if (this.smoking - 1 - smokingMonths.length < smokingYears.length) {
					this.data.smoking = smokingYears[this.smoking - 1 - smokingMonths.length] * 12;
				} else {
					this.data.smoking = smokingYears[smokingYears.length - 1] * 12 + 1;
				}

				this.finishCallback();
				break;
		}
	}

	// First group
	get genderTitle() { return this.strings["gender_title"] }
	get genderOptions(): ReadonlyArray<string> {
		return Object.values(QuestionsData.Gender).map(val => this.strings["gender_" + val]);
	}

	get birthTitle() { return this.strings["birth_title"] }
	get birthYearOptions(): ReadonlyArray<string> {
		const years: string[] = [];

		for (let i = Questions1Model.MAX_BIRTH_YEARS; i >= Questions1Model.MIN_BIRTH_YEARS; i--) {
			years.push(i.toString());
		}

		return years;
	}
	get birthMonthOptions(): ReadonlyArray<string> {
		return Object.values(QuestionsData.Month).map(val => this.strings["month_" + val]);
	}

	get residenceTitle() { return this.strings["residence_title"] }
	get residenceOptions(): ReadonlyArray<string> {
		return Object.values(QuestionsData.Residence).map(val => this.strings["residence_" + val]);
	}

	// Second group
	get bookshelvesTitle() { return this.strings["bookshelves_title"] }
	get bookshelvesOptions(): ReadonlyArray<string> {
		const bookshelves: string[] = [];

		for (let i = 0; i <= Questions1Model.MAX_BOOKSHELVES; i++) {
			bookshelves.push(i.toString());
		}

		bookshelves.push(
			this.strings["bookshelves_more_than"]
				.replace("$0", Questions1Model.MAX_BOOKSHELVES.toString())
		);

		return bookshelves;
	}

	get foreignLanguagesTitle() { return this.strings["foreign_languages_title"] }
	get foreignLanguagesOptions(): ReadonlyArray<string> {
		const foreignLanguages: string[] = [];

		for (let i = 0; i <= Questions1Model.MAX_FOREIGN_LANGUAGES; i++) {
			foreignLanguages.push(i.toString());
		}

		foreignLanguages.push(
			this.strings["foreign_languages_more_than"]
				.replace("$0", Questions1Model.MAX_FOREIGN_LANGUAGES.toString())
		);

		return foreignLanguages;
	}

	get educationTitle() { return this.strings["education_title"] }
	get educationMotherTitle() { return this.strings["education_mother_title"] }
	get educationFatherTitle() { return this.strings["education_father_title"] }
	get educationOptions(): ReadonlyArray<string> {
		return Object.values(QuestionsData.Education).map(val => this.strings["education_" + val]);
	}

	// Third group
	get hoursSleptTitle() { return this.strings["hours_slept_title"] }
	get hoursSleptOptions(): ReadonlyArray<string> {
		const sleepingHours: string[] = [];

		for (let i = 0; i <= Questions1Model.MAX_SLEEPING_HOURS; i++) {
			sleepingHours.push(i.toString());
		}

		sleepingHours.push(
			this.strings["hours_slept_more_than"]
				.replace("$0", Questions1Model.MAX_SLEEPING_HOURS.toString())
		);

		return sleepingHours;
	}

	get consumedCoffeeTitle() { return this.strings["consumed_coffee_title"] }
	get consumedCoffeeOptions(): ReadonlyArray<string> {
		return [this.strings["no"], this.strings["yes"]];
	}

	get consumedCigaretteTitle() { return this.strings["consumed_cigarette_title"] }
	get consumedCigaretteOptions(): ReadonlyArray<string> {
		return [this.strings["no"], this.strings["yes"]];
	}

	get smokingTitle() { return this.strings["smoking_title"] }
	get smokingOptions(): ReadonlyArray<string> {
		const smoking: string[] = [];

		smoking.push(this.strings["smoking_not_smoking"]);

		Questions1Model.SMOKING_MONTHS.forEach(
			(i) => smoking.push(this.strings["smoking_months"].replace("$0", i.toString()))
		);

		Questions1Model.SMOKING_YEARS.forEach(
			(i) => smoking.push(this.strings["smoking_years"].replace("$0", i.toString()))
		);

		smoking.push(
			this.strings["smoking_years_more_than"]
				.replace("$0", Questions1Model.SMOKING_YEARS[Questions1Model.SMOKING_YEARS.length - 1].toString())
		);

		return smoking;
	}
}
