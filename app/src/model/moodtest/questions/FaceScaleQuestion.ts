import {Dictionary} from "src/util/Collections";
import {Question} from "src/model/test/Question";
import {IapsAsset} from "src/model/assets/IapsAsset";

export class FaceScaleQuestion extends Question {

	static readonly QUESTION_TYPE = "face_scale";

	static readonly DETAIL_FACE = "face";

	static readonly EVENT_FACE_SELECTED = "face_selected";

	private face: number = null;

	constructor() {
		super(FaceScaleQuestion.QUESTION_TYPE, {});
	}

	protected onFinish(): Dictionary<string> {
		return {
			[FaceScaleQuestion.DETAIL_FACE]: this.face.toString()
		};
	}

	selectFace(face: number) {
		if (this.face != null) throw Error("The face has already been selected.");
		this.face = face;
		this.event(FaceScaleQuestion.EVENT_FACE_SELECTED, face.toString());
	}
}