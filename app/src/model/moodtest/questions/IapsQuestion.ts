import {Dictionary} from "src/util/Collections";
import {Question} from "src/model/test/Question";
import {IapsAsset} from "src/model/assets/IapsAsset";

export class IapsQuestion extends Question {

	static readonly QUESTION_TYPE = "iaps";

	static readonly DETAIL_IMAGE = "image";
	static readonly DETAIL_RATING = "rating";

	static readonly EVENT_MOOD_SELECTED = "mood_selected";
	static readonly EVENT_MOOD_RATED = "mood_rated";

	readonly imageName: string;
	readonly imagePath: string;

	private moodPositive: boolean = null;
	private moodRating: number = null;

	constructor(image: IapsAsset) {
		super(IapsQuestion.QUESTION_TYPE, {
			[IapsQuestion.DETAIL_IMAGE]: image.name
		});

		this.imageName = image.name;
		this.imagePath = image.path;
	}

	protected onFinish(): Dictionary<string> {
		const rating = this.moodPositive ? this.moodRating : -this.moodRating;

		return {
			[IapsQuestion.DETAIL_RATING]: rating.toString()
		};
	}

	selectPositiveMood() {
		if (this.moodPositive != undefined) throw Error("The mood has already been selected.");
		this.moodPositive = true;
		this.event(IapsQuestion.EVENT_MOOD_SELECTED, "1");
	}

	selectNegativeMood() {
		if (this.moodPositive != undefined) throw Error("The mood has already been selected.");
		this.moodPositive = false;
		this.event(IapsQuestion.EVENT_MOOD_SELECTED, "0");
	}

	rateMood(rating: number) {
		if (this.moodPositive == undefined) throw Error("The mood hasn't been selected yet.");
		if (this.moodRating != undefined) throw Error("The mood has already been rated.");
		this.moodRating = rating;
		this.event(IapsQuestion.EVENT_MOOD_RATED, rating.toString());
	}
}