import {Dictionary} from "src/util/Collections";
import {Session} from "src/model/test/Session";
import {IapsAsset} from "src/model/assets/IapsAsset";
import {IapsQuestion} from "src/model/moodtest/questions/IapsQuestion";

export class MoodTestSession extends Session<IapsQuestion> {

	static readonly DETAIL_AGE = "age";
	static readonly DETAIL_GENDER = "gender";
	static readonly DETAIL_RESIDENCY = "residency";
	static readonly DETAIL_EDUCATION = "education";

	private readonly iapsImages: Array<IapsAsset> = [];

	constructor(userId: string, groupId: string, age: number, gender: string, residency: string, education: string,
	            iapsAssets: Array<IapsAsset>) {

		super(userId, groupId, {
			[MoodTestSession.DETAIL_AGE]: age.toString(),
			[MoodTestSession.DETAIL_GENDER]: gender,
			[MoodTestSession.DETAIL_RESIDENCY]: residency,
			[MoodTestSession.DETAIL_EDUCATION]: education
		});

		iapsAssets.forEach(asset => this.iapsImages.push(asset));
	}

	protected onFinish(): Dictionary<string> {
		return {};
	}

	protected onNext(index: number): IapsQuestion {
		if (index < this.iapsImages.length) {
			return new IapsQuestion(this.iapsImages[index]);
		} else {
			return null;
		}
	}
}