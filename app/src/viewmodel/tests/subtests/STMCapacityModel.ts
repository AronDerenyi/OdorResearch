import {TimedViewModel} from "src/viewmodel/TimedViewModel";
import {STMCapacityData} from "src/model/STMCapacityData";
import {EventData} from "src/model/EventData";

export class STMCapacityModel extends TimedViewModel {

	// internal
	private static readonly LEARNING_TIMER_PER_NUMBER_MILLIS = 1500;
	private static readonly LEARNING_TIMER_EXTRA_MILLIS = 3000;
	private static readonly REPEATING_TIMER_PER_NUMBER_MILLIS = 1000;
	private static readonly REPEATING_TIMER_EXTRA_MILLIS = 3000;

	private readonly numbersList: number[][];
	private readonly data: STMCapacityData[];
	private readonly finishCallback: () => void;

	private index: number = null;
	private currentData: STMCapacityData = null;
	private repeating: boolean = false;
	private internalInput: number[];

	constructor(
		numbersList: number[][],
		data: STMCapacityData[],
		finishCallback: () => void
	) {
		super();

		this.numbersList = numbersList;
		this.data = data;
		this.finishCallback = finishCallback;
	}

	start() {
		this.next();
	}

	get showNumbers() {
		return !this.repeating;
	}

	get numbers() {
		return this.numbersList[this.index];
	}

	get input() {
		return this.internalInput;
	}

	addInput(input: number) {
		if (this.repeating && this.internalInput.length < this.numbers.length) {
			this.currentData.events.push(new EventData<number>(
				Date.now() - this.currentData.startTime -
				this.numbers.length * STMCapacityModel.LEARNING_TIMER_PER_NUMBER_MILLIS -
				STMCapacityModel.LEARNING_TIMER_EXTRA_MILLIS,
				input
			));
			this.internalInput.push(input);
		}
	}

	private next() {
		if (this.index + 1 >= this.numbersList.length) {
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
		this.currentData = new STMCapacityData();
		this.repeating = false;
		this.internalInput = [];

		this.currentData.numbers = Object.assign([], this.numbers);
		this.currentData.startTime = Date.now();
		this.currentData.events = [];

		this.startTimer(
			this.numbers.length * STMCapacityModel.LEARNING_TIMER_PER_NUMBER_MILLIS +
			STMCapacityModel.LEARNING_TIMER_EXTRA_MILLIS,
			() => {
				this.startRepeating();
			}
		);
	}

	private startRepeating() {
		this.repeating = true;
		this.internalInput = [];

		this.startTimer(
			this.numbers.length * STMCapacityModel.REPEATING_TIMER_PER_NUMBER_MILLIS +
			STMCapacityModel.REPEATING_TIMER_EXTRA_MILLIS,
			() => {
				this.currentData.input = Object.assign([], this.input);

				this.data.push(this.currentData);
				this.currentData = null;
				this.next();
			}
		);
	}
}
