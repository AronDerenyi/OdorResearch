import {TimedViewModel} from "src/viewmodel/TimedViewModel";
import {NonWord} from "src/model/NonWord";
import {NonWordRepetitionData} from "src/model/NonWordRepetitionData";
import {EventData} from "src/model/EventData";

export class NonWordRepetitionModel extends TimedViewModel {

	// internal
	private static readonly LEARNING_TIMER_MILLIS = 10000;
	private static readonly REPEATING_TIMER_MILLIS = 5000;

	private readonly nonWords: NonWord[];
	private readonly data: NonWordRepetitionData[];
	private readonly finishCallback: () => void;

	private index: number = null;
	private currentData: NonWordRepetitionData = null;
	private repeating: boolean = false;
	private internalInput: string = "";

	constructor(
		nonWords: NonWord[],
		data: NonWordRepetitionData[],
		finishCallback: () => void
	) {
		super();

		this.nonWords = nonWords;
		this.data = data;
		this.finishCallback = finishCallback;
	}

	start() {
		this.next();
	}

	get meaning() {
		const nonWord = this.nonWords[this.index];
		return this.strings[nonWord ? nonWord.meaningStringId : null];
	}

	get showNonWord() {
		return !this.repeating;
	}

	get nonWord() {
		const nonWord = this.nonWords[this.index];
		return nonWord ? nonWord.nonWord : null;
	}

	get input() {
		return this.internalInput;
	}

	set input(input) {
		if (this.repeating) {
			this.currentData.events.push(new EventData<string>(
				Date.now() - this.currentData.startTime - NonWordRepetitionModel.LEARNING_TIMER_MILLIS,
				input
			));
			this.internalInput = input;
		}
	}

	private next() {
		if (this.index + 1 >= this.nonWords.length) {
			this.finishCallback();
			return;
		}

		if (this.index == null) {
			this.index = 0;
		} else {
			this.index++;
		}

		this.startLearning();
	}

	private startLearning() {
		this.currentData = new NonWordRepetitionData();
		this.repeating = false;
		this.internalInput = "";

		this.currentData.nonWord = this.nonWord;
		this.currentData.startTime = Date.now();
		this.currentData.events = [];

		this.startTimer(NonWordRepetitionModel.LEARNING_TIMER_MILLIS, () => {
			this.startRepeating();
		});
	}

	private startRepeating() {
		this.repeating = true;
		this.internalInput = "";

		this.startTimer(NonWordRepetitionModel.REPEATING_TIMER_MILLIS, () => {
			this.currentData.input = this.input;

			this.data.push(this.currentData);
			this.currentData = null;
			this.next();
		});
	}
}
