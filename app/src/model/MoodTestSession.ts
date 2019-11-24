import {TestSession} from "src/model/TestSession";
import {QuestionsData} from "src/model/QuestionsData";
import {AssociationData} from "src/model/AssociationData";
import {ValenceData} from "src/model/ValenceData";
import {PanasData} from "src/model/PanasData";
import {EffectData} from "src/model/EffectData";
import {OsgoodData} from "src/model/OsgoodData";
import {IapsData} from "src/model/IapsData";
import {FaceScaleData} from "src/model/FaceScaleData";
import {ColorData} from "src/model/ColorData";

export class MoodTestSession extends TestSession {

	questions: QuestionsData;
	faceScale1: FaceScaleData;
	faceScale2: FaceScaleData;
	panas1: PanasData;
	panas2: PanasData;
	iaps1: IapsData[];
	iaps2: IapsData[];
	osgood: OsgoodData;
	valence: ValenceData;
	effect: EffectData;
	color: ColorData;
	association: AssociationData;
}