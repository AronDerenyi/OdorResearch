import $ from 'jquery'
import {NonWord} from "src/model/NonWord";

export class NonWordProvider {

	static getAll(): NonWord[] {
		const nonWords: NonWord[] = [];

		// noinspection JSIgnoredPromiseFromCall
		$.ajax({
			async: false,
			url: "assets/nonwords/all.json",
			success: (result) => {
				result.forEach((nonWord: any) => {
					nonWords.push(new NonWord(
						nonWord["nonWord"],
						nonWord["meaningStringId"]
					));
				});
			}
		});

		return nonWords;
	}

	static getMemory(): NonWord[] {
		const nonWords: NonWord[] = [];

		// noinspection JSIgnoredPromiseFromCall
		$.ajax({
			async: false,
			url: "assets/nonwords/memory.json",
			success: (result) => {
				result.forEach((nonWord: any) => {
					nonWords.push(new NonWord(
						nonWord["nonWord"],
						nonWord["meaningStringId"]
					));
				});
			}
		});

		return nonWords;
	}
}
