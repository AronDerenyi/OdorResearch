import {TimedViewModel} from "src/viewmodel/TimedViewModel";
import {NonWord} from "src/model/NonWord";
import {NonWordRecallingData} from "src/model/NonWordRecallingData";
import {EventData} from "src/model/EventData";

export class NonWordRecallingModel extends TimedViewModel {

	// internal
	private static readonly RECALLING_TIMER_MILLIS = 15000;

	private readonly nonWords: NonWord[];
	private readonly data: NonWordRecallingData[];
	private readonly finishCallback: () => void;

	private index: number = null;
	private currentData: NonWordRecallingData = null;
	private internalInput: string = "";

	constructor(
		nonWords: NonWord[],
		data: NonWordRecallingData[],
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

	get nonWord() {
		const nonWord = this.nonWords[this.index];
		return nonWord ? nonWord.nonWord : null;
	}

	get input() {
		return this.internalInput;
	}

	set input(input) {
		this.currentData.events.push(new EventData<string>(
			Date.now() - this.currentData.startTime,
			input
		));
		this.internalInput = input;
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

		this.currentData = new NonWordRecallingData();
		this.internalInput = "";

		this.currentData.nonWord = this.nonWord;
		this.currentData.meaning = this.strings[this.nonWords[this.index].meaningStringId];
		this.currentData.startTime = Date.now();
		this.currentData.events = [];

		this.startTimer(NonWordRecallingModel.RECALLING_TIMER_MILLIS, () => {
			this.currentData.input = this.input;

			this.data.push(this.currentData);
			this.currentData = null;
			this.next();
		});
	}
}
