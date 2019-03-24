import Vue from "vue";
import {ViewModelProvider} from "src/util/ViewModelProvider";
import {Event} from "src/util/Event";
import {MoodTest} from "src/model/moodtest/MoodTest";
import {MoodTestSession} from "src/model/moodtest/MoodTestSession";
import {IapsQuestion} from "src/model/moodtest/questions/IapsQuestion";

export class MoodTestViewModel {

	private static provider = new ViewModelProvider<MoodTestViewModel>(() => new MoodTestViewModel());

	public static requireInstance(): MoodTestViewModel {
		return this.provider.requireInstance();
	}

	public static releaseInstance() {
		return this.provider.releaseInstance();
	}

	readonly error: Event<Error>;
	readonly done: Event;

	readonly loading: boolean;
	readonly question: MoodTestViewModel.IapsQuestion;

	private session: MoodTestSession;

	private emitError(error: Error) {
		Vue.set(this, "error", new Event(error));
	}

	private emitDone() {
		Vue.set(this, "done", new Event());
	}

	private setLoading(loading: boolean) {
		Vue.set(this, "loading", loading);
	}

	private setQuestion(question: MoodTestViewModel.IapsQuestion) {
		Vue.set(this, "question", question);
	}

	startTest(userId: string, groupId: string, age: number, gender: string, residency: string, education: string) {
		this.setLoading(true);
		MoodTest.startTest(userId, groupId, age, gender, residency, education,
			(session) => {
				this.session = session;
				this.nextQuestion();
				this.setLoading(false);
			},
			this.emitError
		);
	};

	private nextQuestion() {
		const question = this.session.next();
		const viewModel = this;

		if (question) {
			if (question instanceof IapsQuestion) {
				this.setQuestion(new class extends MoodTestViewModel.IapsQuestion {

					readonly imageName = question.imageName;
					readonly imagePath = question.imagePath;

					selectPositiveMood() {
						question.selectNegativeMood();
					}

					selectNegativeMood() {
						question.selectNegativeMood();
					}

					rateMood(rating: number) {
						question.rateMood(rating);
						question.finish();
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

	export abstract class IapsQuestion {

		abstract readonly imageName: string;
		abstract readonly imagePath: string;

		abstract selectPositiveMood(): void;
		abstract selectNegativeMood(): void;
		abstract rateMood(rating: number): void;
	}
}
