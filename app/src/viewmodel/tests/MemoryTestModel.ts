import Vue from "vue";
import {ViewModel, Event} from "src/viewmodel/ViewModel";
import {DescriptionModel} from "src/viewmodel/tests/subtests/DescriptionModel";
import {Questions1Model} from "src/viewmodel/tests/subtests/Questions1Model";
import {STMCapacityModel} from "src/viewmodel/tests/subtests/STMCapacityModel";
import {NonWordRepetitionModel} from "src/viewmodel/tests/subtests/NonWordRepetitionModel";
import {GottschalkModel} from "src/viewmodel/tests/subtests/GottschalkModel";

import {NonWordProvider} from "src/providers/NonWordProvider";
import {NumbersProvider} from "src/providers/NumbersProvider";
import {QuestionsData} from "src/model/QuestionsData";
import {MemoryTestSession} from "src/model/MemoryTestSession";
import {GottschalkData} from "src/model/GottschalkData";
import {Questions2Model} from "src/viewmodel/tests/subtests/Questions2Model";
import {Questions3Model} from "src/viewmodel/tests/subtests/Questions3Model";
import {AssociationModel} from "src/viewmodel/tests/subtests/AssociationModel";
import {EndingModel} from "src/viewmodel/tests/subtests/EndingModel";
import {CodeGeneratorModel} from "src/viewmodel/tests/subtests/CodeGeneratorModel";
import {AssociationData} from "src/model/AssociationData";
import {GroupCode} from "src/code/GroupCode";
import {MemoryReturningTestSession} from "src/model/MemoryReturningTestSession";
import {NonWordRecallingModel} from "src/viewmodel/tests/subtests/NonWordRecallingModel";
import {StorageInteractor} from "src/interactors/StorageInteractor";

export class MemoryTestModel extends ViewModel {

	readonly subTest: ViewModel;

	readonly navigateToHome: Event;

	// internal
	private readonly session: MemoryTestSession | MemoryReturningTestSession;

	constructor(groupCode: string) {
		super();

		if (!groupCode) {
			Vue.set(this, "navigateToHome", new Event());
			return;
		}

		if (GroupCode.isReturning(groupCode)) {
			this.session = new MemoryReturningTestSession();
			this.session.nonWordRecalling = [];
			this.session.association = new AssociationData();
		} else {
			this.session = new MemoryTestSession();
			this.session.questions = new QuestionsData();
			this.session.stmCapacity = [];
			this.session.nonWordRepetition = [];
			this.session.gottschalk = new GottschalkData();
			this.session.association = new AssociationData();
		}

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
			if (GroupCode.isReturning(this.session.groupCode)) {
				this.startNonWordRecalling();
			} else {
				this.startQuestions1();
			}
		});

		Vue.set(this, "subTest", codeGenerator);
	}

	private startQuestions1() {
		if (!(this.session instanceof MemoryTestSession)) return;

		const questions1 = new Questions1Model(this.session.questions, () => {
			questions1.dispose();
			this.startSTMCapacity();
		});

		Vue.set(this, "subTest", questions1);
	}

	private startSTMCapacity() {
		if (!(this.session instanceof MemoryTestSession)) return;

		const numbers = NumbersProvider.getMemory();

		const stmCapacity = new STMCapacityModel(numbers, this.session.stmCapacity, () => {
			stmCapacity.dispose();
			this.startQuestions2();
		});

		const stmCapacityDescription = new DescriptionModel("stm_capacity_description", null, () => {
			stmCapacityDescription.dispose();
			Vue.set(this, "subTest", stmCapacity);
		});

		Vue.set(this, "subTest", stmCapacityDescription);
	}

	private startQuestions2() {
		if (!(this.session instanceof MemoryTestSession)) return;

		const questions2 = new Questions2Model(this.session.questions, () => {
			questions2.dispose();
			this.startNonWordRepetition();
		});

		Vue.set(this, "subTest", questions2);
	}

	private startNonWordRepetition() {
		if (!(this.session instanceof MemoryTestSession)) return;

		const nonWords = NonWordProvider.getMemory();

		const nonWordRepetition = new NonWordRepetitionModel(nonWords, this.session.nonWordRepetition, () => {
			nonWordRepetition.dispose();
			this.startQuestions3();
		});

		const nonWordRepetitionDescription = new DescriptionModel("non_word_repetition_description", null, () => {
			nonWordRepetitionDescription.dispose();
			Vue.set(this, "subTest", nonWordRepetition);
		});

		Vue.set(this, "subTest", nonWordRepetitionDescription);
	}

	private startNonWordRecalling() {
		if (!(this.session instanceof MemoryReturningTestSession)) return;

		const nonWords = NonWordProvider.getMemory();

		const nonWordRecalling = new NonWordRecallingModel(nonWords, this.session.nonWordRecalling, () => {
			nonWordRecalling.dispose();
			this.startAssociation();
		});

		const nonWordRecallingDescription = new DescriptionModel("non_word_recalling_description", null, () => {
			nonWordRecallingDescription.dispose();
			Vue.set(this, "subTest", nonWordRecalling);
		});

		Vue.set(this, "subTest", nonWordRecallingDescription);
	}

	private startQuestions3() {
		if (!(this.session instanceof MemoryTestSession)) return;

		const questions3 = new Questions3Model(this.session.questions, () => {
			questions3.dispose();
			this.startGottschalk();
		});

		Vue.set(this, "subTest", questions3);
	}

	private startGottschalk() {
		if (!(this.session instanceof MemoryTestSession)) return;

		const gottschalk = new GottschalkModel(this.session.gottschalk, () => {
			gottschalk.dispose();
			if (GroupCode.isControl(this.session.groupCode)) {
				this.startEnding();
			} else {
				this.startAssociation();
			}
		});

		const gottschalkDescription = new DescriptionModel("gottschalk_description", null, () => {
			gottschalkDescription.dispose();
			Vue.set(this, "subTest", gottschalk);
		});

		Vue.set(this, "subTest", gottschalkDescription);
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
