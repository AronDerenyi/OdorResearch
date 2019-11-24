import {Dictionary, ReadonlyDictionary} from "src/util/Collections";
import {Disposable} from "src/util/Disposable";
import $ from 'jquery'
import {NonWord} from "src/model/NonWord";

export class StringProvider {

	static getNonWords(): NonWord[] {
		const nonWords: NonWord[] = [];

		// noinspection JSIgnoredPromiseFromCall
		$.ajax({
			async: false,
			url: "assets/nonwords/default.json",
			success: (result) => {
				JSON.parse(result).foreach((nonWord: any) => {
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
