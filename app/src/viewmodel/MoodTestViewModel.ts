import Vue from "vue";
import {ViewModelProvider} from "src/util/ViewModelProvider";
import {Event} from "src/util/Event";
import {MoodTest} from "src/model/moodtest/MoodTest";
import {MoodTestSession} from "src/model/moodtest/MoodTestSession";
import {IapsQuestion} from "src/model/moodtest/questions/IapsQuestion";
import {FaceScaleQuestion} from "src/model/moodtest/questions/FaceScaleQuestion";

export class MoodTestViewModel {

	private static provider = new ViewModelProvider<MoodTestViewModel>(() => new MoodTestViewModel());

	public static requireInstance(): MoodTestViewModel {
		return this.provider.requireInstance();
	}

	public static releaseInstance() {
		return this.provider.releaseInstance();
	}

	readonly error: Event<Error> = null;
	readonly done: Event = null;

	readonly loading: boolean = false;
	readonly showInit: boolean = true;
	readonly question:
		MoodTestViewModel.FaceScaleQuestion |
		MoodTestViewModel.IapsQuestion = null;

	private session: MoodTestSession = null;

	private emitError(error: Error) {
		Vue.set(this, "error", new Event(error));
	}

	private emitDone() {
		Vue.set(this, "done", new Event());
	}

	private setLoading(loading: boolean) {
		Vue.set(this, "loading", loading);
	}

	private setShowInit(showInit: boolean) {
		Vue.set(this, "showInit", showInit);
	}

	private setQuestion(
		question:
			MoodTestViewModel.FaceScaleQuestion |
			MoodTestViewModel.IapsQuestion) {

		Vue.set(this, "question", question);
	}

	startTest(userId: string, groupId: string, age: number, gender: string, residency: string, education: string) {
		this.setLoading(true);
		MoodTest.startTest(userId, groupId, age, gender, residency, education,
			(session) => {
				this.session = session;
				this.nextQuestion();
				this.setLoading(false);
				this.setShowInit(false);
			},
			this.emitError
		);
	};

	private nextQuestion() {
		const question = this.session.next();
		const viewModel = this;

		if (question) {
			if (question instanceof FaceScaleQuestion) {
				const faceScaleQuestion = question;
				this.setQuestion(new class extends MoodTestViewModel.FaceScaleQuestion {

					selectFace(face: number): void {
						faceScaleQuestion.selectFace(face);
						faceScaleQuestion.finish();
						viewModel.nextQuestion();
					}
				});
			} else if (question instanceof IapsQuestion) {
				const iapsQuestion = question;
				this.setQuestion(new class extends MoodTestViewModel.IapsQuestion {

					readonly imageName = iapsQuestion.imageName;
					readonly imagePath = iapsQuestion.imagePath;

					selectPositiveMood() {
						iapsQuestion.selectNegativeMood();
					}

					selectNegativeMood() {
						iapsQuestion.selectNegativeMood();
					}

					rateMood(rating: number) {
						iapsQuestion.rateMood(rating);
						iapsQuestion.finish();
						viewModel.nextQuestion();
					}
				});
			}
		} else {
			this.emitDone();
		}
	}

	endTest() {
		this.setLoading(true);
		this.session.finish();
		MoodTest.endTest(this.session,
			() => {
				this.setLoading(false);
			},
			this.emitError
		);
	}
}

export module MoodTestViewModel {

	export abstract class FaceScaleQuestion {

		abstract selectFace(face: number): void;
	}

	export abstract class IapsQuestion {

		abstract readonly imageName: string;
		abstract readonly imagePath: string;

		abstract selectPositiveMood(): void;

		abstract selectNegativeMood(): void;

		abstract rateMood(rating: number): void;
	}
}
