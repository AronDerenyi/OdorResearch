import Vue from "vue";
import {ViewModel, Event} from "src/viewmodel/ViewModel";
import {DescriptionModel} from "src/viewmodel/tests/subtests/DescriptionModel";
import {Questions1Model} from "src/viewmodel/tests/subtests/Questions1Model";
import {QuestionsData} from "src/model/QuestionsData";
import {Questions2Model} from "src/viewmodel/tests/subtests/Questions2Model";
import {Questions3Model} from "src/viewmodel/tests/subtests/Questions3Model";
import {AssociationModel} from "src/viewmodel/tests/subtests/AssociationModel";
import {EndingModel} from "src/viewmodel/tests/subtests/EndingModel";
import {CodeGeneratorModel} from "src/viewmodel/tests/subtests/CodeGeneratorModel";
import {AssociationData} from "src/model/AssociationData";
import {StorageInteractor} from "src/interactors/StorageInteractor";
import {CreativityTestSession} from "src/model/CreativityTestSession";
import {TellegenData} from "src/model/TellegenData";
import {UnusualUseData} from "src/model/UnusualUseData";
import {TellegenModel} from "src/viewmodel/tests/subtests/TellegenModel";
import {UnusualUseModel} from "src/viewmodel/tests/subtests/UnusualUseModel";
import {GroupCode} from "src/code/GroupCode";
import {ValenceModel} from "src/viewmodel/tests/subtests/ValenceModel";
import {ValenceData} from "src/model/ValenceData";

export class CreativityTestModel extends ViewModel {

	readonly subTest: ViewModel;

	readonly navigateToHome: Event;

	// internal
	private static readonly FRAGRANCE_PASSCODE = /^odor$/; // TODO: proper passcode

	private readonly session: CreativityTestSession;

	constructor(groupCode: string) {
		super();

		if (!groupCode) {
			Vue.set(this, "navigateToHome", new Event());
			return;
		}

		this.session = new CreativityTestSession();
		this.session.questions = new QuestionsData();
		this.session.tellegen = new TellegenData();
		this.session.unusualUseBrick = new UnusualUseData();
		this.session.unusualUseToothbrush = new UnusualUseData();
		this.session.valence = new ValenceData();
		this.session.association = new AssociationData();

		this.session.groupCode = groupCode;
	}

	start() {
		if (!this.session) return;

		this.session.startTime = Date.now();

		this.startCodeGenerator();
	}

	private startCodeGenerator() {
		const codeGenerator = new CodeGeneratorModel(this.session, () => {
			codeGenerator.dispose();
			this.startQuestions1();
		});

		Vue.set(this, "subTest", codeGenerator);
	}

	private startQuestions1() {
		const questions1 = new Questions1Model(this.session.questions, () => {
			questions1.dispose();
			this.startTellegen();
		});

		Vue.set(this, "subTest", questions1);
	}

	private startTellegen() {
		const tellegen = new TellegenModel(this.session.tellegen, () => {
			tellegen.dispose();
			this.startQuestions2();
		});

		const tellegenDescription = new DescriptionModel("tellegen_description", null, () => {
			tellegenDescription.dispose();
			Vue.set(this, "subTest", tellegen);
		});

		Vue.set(this, "subTest", tellegenDescription);
	}

	private startQuestions2() {
		const questions2 = new Questions2Model(this.session.questions, () => {
			questions2.dispose();
			this.startUnusualUseBrick();
		});

		Vue.set(this, "subTest", questions2);
	}

	private startUnusualUseBrick() {
		const unusualUseBrick = new UnusualUseModel("unusual_use_brick_title", this.session.unusualUseBrick, () => {
			unusualUseBrick.dispose();
			if (GroupCode.isControl(this.session.groupCode)) {
				this.startQuestions3();
			} else {
				this.startFragrance();
			}
		});

		const unusualUseBrickDescription = new DescriptionModel("unusual_use_description", null, () => {
			unusualUseBrickDescription.dispose();
			Vue.set(this, "subTest", unusualUseBrick);
		});

		Vue.set(this, "subTest", unusualUseBrickDescription);
	}

	private startFragrance() {
		const fragrance = new DescriptionModel("fragrance_description", CreativityTestModel.FRAGRANCE_PASSCODE, () => {
			fragrance.dispose();
			this.startQuestions3();
		});

		Vue.set(this, "subTest", fragrance);
	}

	private startQuestions3() {
		const questions3 = new Questions3Model(this.session.questions, () => {
			questions3.dispose();
			if (GroupCode.isControl(this.session.groupCode)) {
				this.startUnusualUseToothbrush();
			} else {
				this.startValence();
			}
		});

		Vue.set(this, "subTest", questions3);
	}

	private startValence() {
		const valence = new ValenceModel(this.session.valence, () => {
			valence.dispose();
			this.startUnusualUseToothbrush();
		});

		Vue.set(this, "subTest", valence);
	}

	private startUnusualUseToothbrush() {
		const unusualUseToothbrush = new UnusualUseModel("unusual_use_toothbrush_title", this.session.unusualUseToothbrush, () => {
			unusualUseToothbrush.dispose();
			if (GroupCode.isControl(this.session.groupCode)) {
				this.startEnding();
			} else {
				this.startAssociation();
			}
		});

		const unusualUseToothbrushDescription = new DescriptionModel("unusual_use_description_short", null, () => {
			unusualUseToothbrushDescription.dispose();
			Vue.set(this, "subTest", unusualUseToothbrush);
		});

		Vue.set(this, "subTest", unusualUseToothbrushDescription);
	}

	private startAssociation() {
		const association = new AssociationModel(this.session.association, () => {
			association.dispose();
			this.startEnding();
		});

		Vue.set(this, "subTest", association);
	}

	private startEnding() {
		const ending = new EndingModel(this.session, () => {
			ending.dispose();
			this.finish();
		});

		Vue.set(this, "subTest", ending);
	}

	private finish() {
		StorageInteractor.storeSession(this.session);
		Vue.set(this, "navigateToHome", new Event());
	}
}
