import Vue from "vue";
import {Locale} from "src/locale/Locale";
import {ViewModel} from "src/viewmodel/ViewModel";
import {Word} from "src/model/Word";

export class WordLearningModel extends ViewModel {

	readonly timerProgress: number = 1;
	readonly timerMinutes: number = 0;
	readonly timerSeconds: number = 0;

	readonly meaning: string = "Meaning";
	readonly word: string = "Word";
	readonly showWord: boolean;

	// internal
	private readonly words: Word[];
	private readonly learningLength: number;
	private readonly repeatingLength: number;
	private readonly finishCallback: () => void;

	private index: number;
	private internalInput: string = "";

	constructor(words: Word[], learningLength: number, repeatingLength: number, finishCallback: () => void) {
		super();

		this.words = words;
		this.learningLength = learningLength;
		this.repeatingLength = repeatingLength;
		this.finishCallback = finishCallback;

		this.localeChanged();
		this.addDisposable(Locale.watchLocale(() => this.localeChanged()));

		this.nextWord();
	}

	get input(): string {
		return this.internalInput;
	}

	set input(input: string) {
		this.internalInput = input;
	}

	private nextWord() {
		if (this.index == null) {
			this.index = 0;
		} else {
			this.index++;
		}

		if (this.index >= this.words.length) {
			this.finishCallback();
		} else {
			this.updateMeaning();

			Vue.set(this, "showWord", true);
			Vue.set(this, "word", this.words[this.index].word);
			Vue.set(this, "input", "");

			this.startTimer(this.learningLength, () => {
				Vue.set(this, "showWord", false);
				this.startTimer(this.repeatingLength, () => {
					this.nextWord();
				});
			});
		}
	}

	private startTimer(length: number, endCallback: () => void) {
		const end = Date.now() / 1000 + length;
		const timer = setInterval(() => {
			const remaining = Math.max(0, end - Date.now() / 1000);

			Vue.set(this, "timerProgress", remaining / length);
			Vue.set(this, "timerMinutes", Math.floor(remaining / 60));
			Vue.set(this, "timerSeconds", Math.floor(remaining % 60));

			if (remaining <= 0) {
				clearInterval(timer);
				endCallback();
			}
		});
	}

	private localeChanged() {
		this.updateMeaning();
	}

	private updateMeaning() {
		if (this.index != null) {
			Vue.set(this, "meaning", Locale.getString(this.words[this.index].meaningStringId));
		}
	}
}
