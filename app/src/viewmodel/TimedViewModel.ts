import {ViewModel} from "src/viewmodel/ViewModel";
import Vue from "vue";

export class TimedViewModel extends ViewModel {

	readonly timerProgress: number = 0;
	readonly timerMinutes: number = 0;
	readonly timerSeconds: number = 0;

	protected startTimer(lengthMillis: number, endCallback: () => void) {
		const endMillis = Date.now() + lengthMillis;
		const timer = setInterval(() => {
			const remainingMillis = Math.max(0, endMillis - Date.now());
			const remainingSeconds = remainingMillis / 1000;

			Vue.set(this, "timerProgress", remainingMillis / lengthMillis);
			Vue.set(this, "timerMinutes", Math.floor(remainingSeconds / 60));
			Vue.set(this, "timerSeconds", Math.floor(remainingSeconds % 60));

			if (remainingMillis <= 0) {
				clearInterval(timer);
				endCallback();
			}
		});
	}
}
