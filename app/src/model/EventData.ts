export class EventData<T> {

	time: number;
	value: T;

	constructor(
		time: number = null,
		value: T = null
	) {
		this.time = time;
		this.value = value;
	}
}