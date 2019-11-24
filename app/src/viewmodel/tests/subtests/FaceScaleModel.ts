import {ViewModel} from "src/viewmodel/ViewModel";
import {QuestionsData} from "src/model/QuestionsData";
import {GottschalkData} from "src/model/GottschalkData";
import {EventData} from "src/model/EventData";
import {ValenceData} from "src/model/ValenceData";

export class ValenceModel extends ViewModel {

	// internal
	private static readonly MIN_PLEASANTNESS = 1;
	private static readonly MAX_PLEASANTNESS = 5;
	private static readonly MIN_IMPACT = 1;
	private static readonly MAX_IMPACT = 5;

	private readonly data: ValenceData;
	private readonly finishCallback: () => void;
	private internalPleasantness: number = null;
	private internalImpact: number = null;
	private internalExpectation: string = "";

	constructor(
		data: ValenceData,
		finishCallback: () => void
	) {
		super();

		this.data = data;
		this.finishCallback = finishCallback;
	}

	start() {
		this.data.startTime = Date.now();
		this.data.pleasantnessEvents = [];
		this.data.impactEvents = [];
		this.data.expectationEvents = [];
	}

	get showFinish() {
		return this.pleasantness != null &&
			this.impact != null &&
			this.expectation.length > 0;
	}

	finish() {
		this.data.pleasantness = this.pleasantness;
		this.data.impact = this.impact;
		this.data.expectation = this.expectation;
		this.finishCallback();
	}

	get pleasantnessTitle() { return this.strings["pleasantness_title"] }
	get minPleasantness() { return ValenceModel.MIN_PLEASANTNESS }
	get maxPleasantness() { return ValenceModel.MAX_PLEASANTNESS }
	get pleasantness() {
		return this.internalPleasantness;
	}
	set pleasantness(pleasantness) {
		this.data.pleasantnessEvents.push(new EventData(Date.now() - this.data.startTime, pleasantness));
		this.internalPleasantness = pleasantness;
	}

	get impactTitle() { return this.strings["impact_title"] }
	get minImpact() { return ValenceModel.MIN_IMPACT }
	get maxImpact() { return ValenceModel.MAX_IMPACT }
	get impact() {
		return this.internalImpact;
	}
	set impact(impact) {
		this.data.impactEvents.push(new EventData(Date.now() - this.data.startTime, impact));
		this.internalImpact = impact;
	}

	get expectationTitle() { return this.strings["expectation_title"] }
	get expectationHint() { return this.strings["expectation_hint"] }
	get expectation() {
		return this.internalExpectation;
	}
	set expectation(expectation) {
		this.data.expectationEvents.push(new EventData(Date.now() - this.data.startTime, expectation));
		this.internalExpectation = expectation;
	}
}
