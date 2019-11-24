import {TestSession} from "src/model/TestSession";
import {AssociationData} from "src/model/AssociationData";
import {NonWordRecallingData} from "src/model/NonWordRecallingData";

export class MemoryReturningTestSession extends TestSession {

	nonWordRecalling: NonWordRecallingData[];
	association: AssociationData;
}