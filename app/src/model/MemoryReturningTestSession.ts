import {TestSession} from "src/model/TestSession";
import {AssociationData} from "src/model/AssociationData";
import {QuestionsTempData} from "src/model/QuestionsTempData";
import {NonWordRecallingData} from "src/model/NonWordRecallingData";

export class MemoryRecallTestSession extends TestSession {

	questions: QuestionsTempData;
	nonWordRecalling: NonWordRecallingData[];
	association: AssociationData;
}