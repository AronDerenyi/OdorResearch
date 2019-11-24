import {ViewModel} from "src/viewmodel/ViewModel";
import {QuestionsData} from "src/model/QuestionsData";
import {QuestionsTempData} from "src/model/QuestionsTempData";

export class QuestionsTempModel extends ViewModel {

	gender: number = null;
	birthYear: number = null;
	birthMonth: number = null;
	residence: number = null;

	// internal
	private static readonly MIN_BIRTH_YEARS = 1930;
	private static readonly MAX_BIRTH_YEARS = 2001;

	private readonly data: QuestionsTempData;
	private readonly finishCallback: () => void;

	constructor(
		data: QuestionsTempData,
		finishCallback: () => void
	) {
		super();

		this.data = data;
		this.finishCallback = finishCallback;
	}

	get showNext(): boolean {
		return this.gender != null &&
			this.birthYear != null &&
			this.birthMonth != null &&
			this.residence != null;
	}

	next() {
		this.data.gender = Object.values(QuestionsData.Gender)[this.gender];
		this.data.birthYear = QuestionsTempModel.MAX_BIRTH_YEARS - this.birthYear;
		this.data.birthMonth = Object.values(QuestionsData.Month)[this.birthMonth];
		this.data.residence = Object.values(QuestionsData.Residence)[this.residence];
		this.finishCallback();
	}

	get genderTitle() { return this.strings["gender_title"] }
	get genderOptions(): ReadonlyArray<string> {
		return Object.values(QuestionsData.Gender).map(val => this.strings["gender_" + val]);
	}

	get birthTitle() { return this.strings["birth_title"] }
	get birthYearOptions(): ReadonlyArray<string> {
		const years: string[] = [];

		for (let i = QuestionsTempModel.MAX_BIRTH_YEARS; i >= QuestionsTempModel.MIN_BIRTH_YEARS; i--) {
			years.push(i.toString());
		}

		return years;
	}
	get birthMonthOptions(): ReadonlyArray<string> {
		return Object.values(QuestionsData.Month).map(val => this.strings["birth_month_" + val]);
	}

	get residenceTitle() { return this.strings["residence_title"] }
	get residenceOptions(): ReadonlyArray<string> {
		return Object.values(QuestionsData.Residence).map(val => this.strings["residence_" + val]);
	}
}
