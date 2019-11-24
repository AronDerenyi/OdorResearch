import {TestSession} from "src/model/TestSession";
import {QuestionsData} from "src/model/QuestionsData";
import {STMCapacityData} from "src/model/STMCapacityData";
import {NonWordRepetitionData} from "src/model/NonWordRepetitionData";
import {GottschalkData} from "src/model/GottschalkData";
import {AssociationData} from "src/model/AssociationData";

export class MemoryTestSession extends TestSession {

	questions: QuestionsData;
	stmCapacity: STMCapacityData[];
	nonWordRepetition: NonWordRepetitionData[];
	gottschalk: GottschalkData;
	association: AssociationData;
}