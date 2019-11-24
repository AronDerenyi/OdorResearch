import {ViewModel} from "src/viewmodel/ViewModel";
import {QuestionsData} from "src/model/QuestionsData";
import {UserCode} from "src/code/UserCode";
import {TestSession} from "src/model/TestSession";

export class CodeGeneratorModel extends ViewModel {

	fullName: string = null;
	birthdayMonth: number = null;
	birthdayDay: number = null;

	// internal
	private static readonly MIN_BIRTH_DAYS = 1;
	private static readonly MAX_BIRTH_DAYS = 31;

	private readonly session: TestSession;
	private readonly startCallback: () => void;

	constructor(
		session: TestSession,
		startCallback: () => void
	) {
		super();

		this.session = session;
		this.startCallback = startCallback;
	}

	get showStart(): boolean {
		return this.fullName != null &&
			this.birthdayMonth != null &&
			this.birthdayDay != null;
	}

	start() {
		this.session.userCode = this.code;
		this.startCallback();
	}

	get fullNameTitle() { return this.strings["full_name_title"] }
	get fullNameHint() { return this.strings["full_name_hint"] }

	get birthdayTitle() { return this.strings["birthday_title"] }
	get birthdayMonthHint() { return this.strings["birthday_month_hint"] }
	get birthdayDayHint() { return this.strings["birthday_day_hint"] }
	get birthdayMonthOptions(): ReadonlyArray<string> {
		return Object.values(QuestionsData.Month).map(val => this.strings["month_" + val]);
	}
	get birthdayDayOptions(): ReadonlyArray<string> {
		const years: string[] = [];

		for (let i = CodeGeneratorModel.MIN_BIRTH_DAYS; i <= CodeGeneratorModel.MAX_BIRTH_DAYS; i++) {
			years.push(i.toString());
		}

		return years;
	}

	get codeDescription() { return this.strings["code_description"] }
	get code() {
		return UserCode.generate(this.fullName, this.birthdayMonth, this.birthdayDay);
	}
}
