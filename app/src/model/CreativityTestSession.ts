import {TestSession} from "src/model/TestSession";
import {QuestionsData} from "src/model/QuestionsData";
import {STMCapacityData} from "src/model/STMCapacityData";
import {NonWordRepetitionData} from "src/model/NonWordRepetitionData";
import {GottschalkData} from "src/model/GottschalkData";
import {AssociationData} from "src/model/AssociationData";
import {ValenceData} from "src/model/ValenceData";
import {UnusualUseData} from "src/model/UnusualUseData";
import {TellegenData} from "src/model/TellegenData";

export class CreativityTestSession extends TestSession {

	questions: QuestionsData;
	tellegen: TellegenData;
	unusualUseBrick: UnusualUseData;
	unusualUseToothbrush: UnusualUseData;
	valence: ValenceData;
	association: AssociationData;
}