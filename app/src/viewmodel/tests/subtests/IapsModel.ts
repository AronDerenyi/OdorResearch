import {TimedViewModel} from "src/viewmodel/TimedViewModel";
import {STMCapacityData} from "src/model/STMCapacityData";
import {EventData} from "src/model/EventData";
import {IapsData} from "src/model/IapsData";
import {NonWordRecallingData} from "src/model/NonWordRecallingData";
import {Image} from "src/model/Image";

export class IapsModel extends TimedViewModel {

	// internal
	private static readonly RATING_COUNT = 5;

	private readonly images: Image[];
	private readonly data: IapsData[];
	private readonly finishCallback: () => void;

	private index: number = null;
	private currentData: IapsData = null;
	private internalSelected: boolean = null;
	private internalRating: number = null;

	constructor(
		images: Image[],
		data: IapsData[],
		finishCallback: () => void
	) {
		super();

		this.images = images;
		this.data = data;
		this.finishCallback = finishCallback;
	}

	start() {
		this.next();
	}

	get positive() { return this.strings["positive"] }
	get negative() { return this.strings["negative"] }
	get ratingCount() { return IapsModel.RATING_COUNT }

	get imageSources() {
		const sources: string[] = [];
		this.images.forEach((image) => sources.push(image.source));
		return sources;
	}

	get imageSource() {
		const image = this.images[this.index];
		return image ? image.source : null;
	}

	get selected() {
		return this.internalSelected;
	}

	set selected(selected) {
		this.currentData.selectEvent = new EventData<boolean>(
			Date.now() - this.currentData.startTime,
			selected
		);
		this.internalSelected = selected;
	}

	get rating() {
		return this.internalRating;
	}

	set rating(rating) {
		this.currentData.rateEvent = new EventData<number>(
			Date.now() - this.currentData.startTime,
			rating
		);
		this.internalRating = rating;

		this.currentData.rating = this.selected ? this.rating : -this.rating;
		this.data.push(this.currentData);

		this.internalSelected = null;
		this.internalRating = null;
		this.currentData = null;
		this.next();
	}

	get showRating() {
		return this.internalSelected !== null;
	}

	private next() {
		if (this.index + 1 >= this.images.length) {
			this.finishCallback();
			return;
		}

		if (this.index == null) {
			this.index = 0;
		} else {
			this.index++;
		}

		this.currentData = new IapsData();
		this.currentData.image = this.images[this.index].image;
		this.currentData.startTime = Date.now();
	}
}
