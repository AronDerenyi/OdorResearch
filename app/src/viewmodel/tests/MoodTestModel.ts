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
import {GroupCode} from "src/code/GroupCode";
import {ValenceModel} from "src/viewmodel/tests/subtests/ValenceModel";
import {ValenceData} from "src/model/ValenceData";
import {MoodTestSession} from "src/model/MoodTestSession";
import {FaceScaleData} from "src/model/FaceScaleData";
import {PanasData} from "src/model/PanasData";
import {OsgoodData} from "src/model/OsgoodData";
import {EffectData} from "src/model/EffectData";
import {FaceScaleModel} from "src/viewmodel/tests/subtests/FaceScaleModel";
import {PanasModel} from "src/viewmodel/tests/subtests/PanasModel";
import {OsgoodModel} from "src/viewmodel/tests/subtests/OsgoodModel";
import {IapsModel} from "src/viewmodel/tests/subtests/IapsModel";
import {ImageProvider} from "src/providers/ImageProvider";
import {EffectModel} from "src/viewmodel/tests/subtests/EffectModel";
import {ColorModel} from "src/viewmodel/tests/subtests/ColorModel";
import {ColorData} from "src/model/ColorData";

export class MoodTestModel extends ViewModel {

	readonly subTest: ViewModel;

	readonly navigateToHome: Event;

	// internal
	private static readonly FRAGRANCE_PASSCODE = /^odor$/;

	private readonly session: MoodTestSession;

	constructor(groupCode: string) {
		super();

		if (!groupCode) {
			Vue.set(this, "navigateToHome", new Event());
			return;
		}

		this.session = new MoodTestSession();
		this.session.questions = new QuestionsData();
		this.session.faceScale1 = new FaceScaleData();
		this.session.faceScale2 = new FaceScaleData();
		this.session.panas1 = new PanasData();
		this.session.panas2 = new PanasData();
		this.session.iaps1 = [];
		this.session.iaps2 = [];
		this.session.osgood = new OsgoodData();
		this.session.valence = new ValenceData();
		this.session.effect = new EffectData();
		this.session.color = new ColorData();
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
			this.startFaceScale1();
		});

		Vue.set(this, "subTest", codeGenerator);
	}

	private startFaceScale1() {
		const faceScale = new FaceScaleModel(this.session.faceScale1, () => {
			faceScale.dispose();
			this.startQuestions1();
		});

		Vue.set(this, "subTest", faceScale);
	}

	private startQuestions1() {
		const questions1 = new Questions1Model(this.session.questions, () => {
			questions1.dispose();
			this.startPanas1();
		});

		Vue.set(this, "subTest", questions1);
	}

	private startPanas1() {
		const panas = new PanasModel(this.session.panas1, () => {
			panas.dispose();
			this.startIaps1();
		});

		const panasDescription = new DescriptionModel("panas_description", null, () => {
			panasDescription.dispose();
			Vue.set(this, "subTest", panas);
		});

		Vue.set(this, "subTest", panasDescription);
	}

	private startIaps1() {
		const images = ImageProvider.getMood1();

		const iaps = new IapsModel(images, this.session.iaps1, () => {
			iaps.dispose();
			if (GroupCode.isControl(this.session.groupCode)) {
				this.startQuestions2();
			} else {
				this.startFragrance();
			}
		});

		const iapsDescription = new DescriptionModel("iaps_description", null, () => {
			iapsDescription.dispose();
			Vue.set(this, "subTest", iaps);
		});

		Vue.set(this, "subTest", iapsDescription);
	}

	private startFragrance() {
		const fragrance = new DescriptionModel("fragrance_description", MoodTestModel.FRAGRANCE_PASSCODE, () => {
			fragrance.dispose();
			this.startQuestions2();
		});

		Vue.set(this, "subTest", fragrance);
	}

	private startQuestions2() {
		const questions2 = new Questions2Model(this.session.questions, () => {
			questions2.dispose();
			this.startFaceScale2();
		});

		Vue.set(this, "subTest", questions2);
	}

	private startFaceScale2() {
		const faceScale = new FaceScaleModel(this.session.faceScale2, () => {
			faceScale.dispose();
			if (GroupCode.isControl(this.session.groupCode)) {
				this.startPanas2();
			} else {
				this.startValence();
			}
		});

		Vue.set(this, "subTest", faceScale);
	}

	private startValence() {
		const valence = new ValenceModel(this.session.valence, () => {
			valence.dispose();
			this.startPanas2();
		});

		Vue.set(this, "subTest", valence);
	}

	private startPanas2() {
		const panas = new PanasModel(this.session.panas2, () => {
			panas.dispose();
			if (GroupCode.isControl(this.session.groupCode)) {
				this.startIaps2();
			} else {
				this.startOsgood();
			}
		});

		const panasDescription = new DescriptionModel("panas_description", null, () => {
			panasDescription.dispose();
			Vue.set(this, "subTest", panas);
		});

		Vue.set(this, "subTest", panasDescription);
	}

	private startOsgood() {
		const osgood = new OsgoodModel(this.session.osgood, () => {
			osgood.dispose();
			this.startIaps2();
		});

		const osgoodDescription = new DescriptionModel("osgood_description", null, () => {
			osgoodDescription.dispose();
			Vue.set(this, "subTest", osgood);
		});

		Vue.set(this, "subTest", osgoodDescription);
	}

	private startIaps2() {
		const images = ImageProvider.getMood2();

		const iaps = new IapsModel(images, this.session.iaps2, () => {
			iaps.dispose();
			this.startQuestions3();
		});

		const iapsDescription = new DescriptionModel("iaps_description", null, () => {
			iapsDescription.dispose();
			Vue.set(this, "subTest", iaps);
		});

		Vue.set(this, "subTest", iapsDescription);
	}

	private startQuestions3() {
		const questions3 = new Questions3Model(this.session.questions, () => {
			questions3.dispose();
			if (GroupCode.isControl(this.session.groupCode)) {
				this.startEnding();
			} else {
				this.startEffect();
			}
		});

		Vue.set(this, "subTest", questions3);
	}

	private startEffect() {
		const effect = new EffectModel(this.session.effect, () => {
			effect.dispose();
			this.startColor();
		});

		Vue.set(this, "subTest", effect);
	}

	private startColor() {
		const color = new ColorModel(this.session.color, () => {
			color.dispose();
			this.startAssociation();
		});

		Vue.set(this, "subTest", color);
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
