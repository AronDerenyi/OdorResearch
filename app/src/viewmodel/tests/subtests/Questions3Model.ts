import {ViewModel} from "src/viewmodel/ViewModel";
import Vue from "vue";
import {QuestionsData} from "src/model/QuestionsData";

export class ThirdQuestionsModel extends ViewModel {

	readonly group: number;

	hypnosis: number = null;
	meditation: number = null;
	mindfulness: number = null;

	inLove: number = null;
	smellRefinement: number = null;
	smellSensitivity: number = null;

	useDeodorant: number = null;
	usePerfume: number = null;
	useOils: number = null;

	// internal
	private static readonly MIN_METHOD = 0;
	private static readonly MAX_METHOD = 5;
	private static readonly MIN_IN_LOVE = 1;
	private static readonly MAX_IN_LOVE = 5;
	private static readonly MIN_REFINEMENT = 1;
	private static readonly MAX_REFINEMENT = 5;
	private static readonly MIN_SENSITIVITY = 1;
	private static readonly MAX_SENSITIVITY = 5;

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
				return this.hypnosis != null &&
					this.meditation != null &&
					this.mindfulness != null;
			case 1:
				return this.inLove != null &&
					this.smellRefinement != null &&
					this.smellSensitivity != null;
			case 2:
				return this.useDeodorant != null &&
					this.usePerfume != null &&
					this.useOils != null;
			default:
				return false;
		}
	}

	next() {
		switch (this.group) {
			case 0:
				this.data.hypnosis = this.hypnosis;
				this.data.meditation = this.meditation;
				this.data.mindfulness = this.mindfulness;

				Vue.set(this, "group", 1);
				break;
			case 1:
				this.data.inLove = this.inLove;
				this.data.smellRefinement = this.smellRefinement;
				this.data.smellSensitivity = this.smellSensitivity;

				Vue.set(this, "group", 2);
				break;
			case 2:
				this.data.useDeodorant = this.useDeodorant != 0;
				this.data.usePerfume = this.usePerfume != 0;
				this.data.useOils = this.useOils != 0;

				this.finishCallback();
				break;
		}
	}

	// First group
	get methodsTitle() { return this.strings["methods_title"] }
	get methodsHelp() {
		return this.strings["methods_help"]
			.replace("$0", ThirdQuestionsModel.MIN_METHOD.toString())
			.replace("$1", (ThirdQuestionsModel.MIN_METHOD + 1).toString())
			.replace("$2", ThirdQuestionsModel.MAX_METHOD.toString())
	}
	get hypnosisTitle() { return this.strings["hypnosis_title"] }
	get meditationTitle() { return this.strings["meditation_title"] }
	get mindfulnessTitle() { return this.strings["mindfulness_title"] }
	get minMethod() { return ThirdQuestionsModel.MIN_METHOD }
	get maxMethod() { return ThirdQuestionsModel.MAX_METHOD }

	// Second group
	get inLoveTitle() { return this.strings["in_love_title"] }
	get inLoveHelp() {
		return this.strings["in_love_help"]
			.replace("$0", ThirdQuestionsModel.MIN_IN_LOVE.toString())
			.replace("$1", ThirdQuestionsModel.MAX_IN_LOVE.toString())
	}
	get minInLove() { return ThirdQuestionsModel.MIN_IN_LOVE }
	get maxInLove() { return ThirdQuestionsModel.MAX_IN_LOVE }

	get smellRefinementTitle() { return this.strings["smell_refinement_title"] }
	get smellRefinementHelp() {
		return this.strings["smell_refinement_help"]
			.replace("$0", ThirdQuestionsModel.MIN_REFINEMENT.toString())
			.replace("$1", ThirdQuestionsModel.MAX_REFINEMENT.toString())
	}
	get minSmellRefinement() { return ThirdQuestionsModel.MIN_REFINEMENT }
	get maxSmellRefinement() { return ThirdQuestionsModel.MAX_REFINEMENT }

	get smellSensitivityTitle() { return this.strings["smell_sensitivity_title"] }
	get smellSensitivityHelp() {
		return this.strings["smell_sensitivity_help"]
			.replace("$0", ThirdQuestionsModel.MIN_SENSITIVITY.toString())
			.replace("$1", ThirdQuestionsModel.MAX_SENSITIVITY.toString())
	}
	get minSmellSensitivity() { return ThirdQuestionsModel.MIN_SENSITIVITY }
	get maxSmellSensitivity() { return ThirdQuestionsModel.MAX_SENSITIVITY }

	// Third group
	get useTitle() { return this.strings["use_title"] }
	get useDeodorantTitle() { return this.strings["use_deodorant_title"] }
	get useDeodorantOptions() {
		return [this.strings["option_no"], this.strings["option_yes"]];
	}
	get usePerfumeTitle() { return this.strings["use_perfume_title"] }
	get usePerfumeOptions() {
		return [this.strings["option_no"], this.strings["option_yes"]];
	}
	get useOilsTitle() { return this.strings["use_oils_title"] }
	get useOilsOptions() {
		return [this.strings["option_no"], this.strings["option_yes"]];
	}
}
