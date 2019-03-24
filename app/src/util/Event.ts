export class Event<T = void> {

	static handle<T>(newEvent: Event<T>, oldEvent: Event<T>, handle: (value: T) => void) {
		if (newEvent != null && newEvent !== oldEvent) {
			handle.call(this, newEvent.value);
		}
	}

	readonly value: T;

	constructor(value: T = null) {
		this.value = value;
	}
}