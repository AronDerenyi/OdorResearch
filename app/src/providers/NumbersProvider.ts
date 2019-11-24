import $ from 'jquery'
import {NonWord} from "src/model/NonWord";

export class NumbersProvider {

	static getMemory(): number[][] {
		let numbers: number[][];

		// noinspection JSIgnoredPromiseFromCall
		$.ajax({
			async: false,
			url: "assets/numbers/memory.json",
			success: (result) => {
				numbers = result;
			}
		});

		return numbers;
	}
}
