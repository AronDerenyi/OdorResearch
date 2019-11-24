import {Disposable} from "src/util/Disposable";
import {ReadonlyDictionary} from "src/util/Collections";
import {StringProvider} from "src/providers/StringProvider";

export class ViewModel implements Disposable {

	private readonly disposables: Disposable[] = [];
	private internalStrings: ReadonlyDictionary<string> = StringProvider.getStrings();

	constructor() {
		this.addDisposable(StringProvider.watchLanguage(() => {
			this.internalStrings = StringProvider.getStrings();
		}));
	}

	protected get strings(): ReadonlyDictionary<string> {
		return this.internalStrings;
	}

	protected addDisposable(disposable: Disposable) {
		this.disposables.push(disposable);
	}

	dispose() {
		this.disposables.forEach((disposable) => disposable.dispose());
	}
}

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
