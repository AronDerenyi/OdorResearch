import {ViewModel} from "src/viewmodel/ViewModel";
import {TestSession} from "src/model/TestSession";
import {StorageInteractor} from "src/interactors/StorageInteractor";

export class DashboardModel extends ViewModel {

	// internal
	private sessions: TestSession[] = [];
	private deletingSessionIndex: number = null;

	constructor() {
		super();
	}

	private updateSessions() {
		this.sessions = StorageInteractor.getSessions();
	}

	get sessionCount() { return this.sessions.length }
	sessionGroupCode(index: number) { return this.sessions[index].groupCode }
	sessionUserCode(index: number) { return this.sessions[index].userCode }

	deleteSession(index: number) {
		this.deletingSessionIndex = index;
	}
	confirmDeletion() {
		this.deletingSessionIndex = null;
	}
	cancelDeletion() {
		this.deletingSessionIndex = null;
	}
}
