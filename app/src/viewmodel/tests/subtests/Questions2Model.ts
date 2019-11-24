import {ViewModel} from "src/viewmodel/ViewModel";
import Vue from "vue";
import {QuestionsData} from "src/model/QuestionsData";

export class Questions2Model extends ViewModel {

	readonly group: number;

	// First group
	ecoFamily: number = null;
	ecoSelf: number = null;

	// Second group
	allergyPollen: boolean = false;
	allergyFur: boolean = false;
	allergyDust: boolean = false;
	allergyDrug: boolean = false;
	allergyFood: boolean = false;
	allergyOther: boolean = false;
	maturedAge: number = null;
	menstruating: number = null;
	contraceptive: number = null;

	// Third group
	mood: number = null;
	stressGeneral: number = null;
	stressToday: number = null;

	// internal
	private static readonly MIN_ECONOMIC_STATUS = -5;
	private static readonly MAX_ECONOMIC_STATUS = 5;
	private static readonly MIN_MOOD = 1;
	private static readonly MAX_MOOD = 5;
	private static readonly MIN_STRESS = 1;
	private static readonly MAX_STRESS = 5;
	private static readonly MIN_MATURE_AGE = 5;
	private static readonly MAX_MATURE_AGE = 25;

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
				return this.ecoFamily != null &&
					this.ecoSelf != null;
			case 1:
				return this.maturedAge != null &&
					this.menstruating != null &&
					this.contraceptive != null;
			case 2:
				return this.mood != null &&
					this.stressGeneral != null &&
					this.stressToday != null;
			default:
				return false;
		}
	}

	next() {
		switch (this.group) {
			case 0:
				this.data.ecoFamily = this.ecoFamily;
				this.data.ecoSelf = this.ecoSelf;

				Vue.set(this, "group", 1);
				break;
			case 1:
				this.data.allergyPollen = this.allergyPollen;
				this.data.allergyFur = this.allergyFur;
				this.data.allergyDust = this.allergyDust;
				this.data.allergyDrug = this.allergyDrug;
				this.data.allergyFood = this.allergyFood;
				this.data.allergyOther = this.allergyOther;
				this.data.maturedAge = Questions2Model.MIN_MATURE_AGE - 1 + this.maturedAge;
				this.data.menstruating = this.menstruating > 0;
				this.data.contraceptive = this.contraceptive > 0;

				Vue.set(this, "group", 2);
				break;
			case 2:
				this.data.mood = this.mood;
				this.data.stressGeneral = this.stressGeneral;
				this.data.stressToday = this.stressToday;

				this.finishCallback();
				break;
		}
	}

	// First group
	get ecoFamilyTitle() { return this.strings["eco_family_title"] }
	get ecoSelfTitle() { return this.strings["eco_self_title"] }
	get ecoHelp() { return this.strings["eco_help"] }
	get minEco() { return Questions2Model.MIN_ECONOMIC_STATUS }
	get maxEco() { return Questions2Model.MAX_ECONOMIC_STATUS }

	// Second group
	get allergyTitle() { return this.strings["allergy_title"] }
	get allergyPollenLabel() { return this.strings["allergy_pollen"] }
	get allergyFurLabel() { return this.strings["allergy_fur"] }
	get allergyDustLabel() { return this.strings["allergy_dust"] }
	get allergyDrugLabel() { return this.strings["allergy_drug"] }
	get allergyFoodLabel() { return this.strings["allergy_food"] }
	get allergyOtherLabel() { return this.strings["allergy_other"] }

	get maturedAgeTitle() { return this.strings["matured_age_title"] }
	get maturedAgeOptions() {
		const maturedAgeOptions: string[] = [];

		maturedAgeOptions.push(
			this.strings["matured_age_younger_than"]
				.replace("$0", Questions2Model.MIN_MATURE_AGE.toString())
		);

		for (let i = Questions2Model.MIN_MATURE_AGE; i <= Questions2Model.MAX_MATURE_AGE; i++) {
			maturedAgeOptions.push(i.toString());
		}

		maturedAgeOptions.push(
			this.strings["matured_age_older_than"]
				.replace("$0", Questions2Model.MAX_MATURE_AGE.toString())
		);

		return maturedAgeOptions;
	}

	get menstruatingTitle() { return this.strings["menstruating_title"] }
	get menstruatingOptions(): ReadonlyArray<string> {
		return [this.strings["no"], this.strings["yes"]];
	}

	get contraceptiveTitle() { return this.strings["contraceptive_title"] }
	get contraceptiveOptions(): ReadonlyArray<string> {
		return [this.strings["no"], this.strings["yes"]];
	}

	// Third group

	get moodTitle() { return this.strings["mood_title"] }
	get moodHelp() {
		return this.strings["mood_help"]
			.replace("$0", Questions2Model.MIN_MOOD.toString())
			.replace("$1", Questions2Model.MAX_MOOD.toString())
	}
	get minMood() { return Questions2Model.MIN_MOOD }
	get maxMood() { return Questions2Model.MAX_MOOD }

	get stressGeneralTitle() { return this.strings["stress_general_title"] }
	get stressTodayTitle() { return this.strings["stress_today_title"] }
	get stressHelp() {
		return this.strings["stress_help"]
			.replace("$0", Questions2Model.MIN_STRESS.toString())
			.replace("$1", Questions2Model.MAX_STRESS.toString())
	}
	get minStress() { return Questions2Model.MIN_STRESS }
	get maxStress() { return Questions2Model.MAX_STRESS }
}