import {ViewModel} from "src/viewmodel/ViewModel";
import {TestSession} from "src/model/TestSession";
import {StorageInteractor} from "src/interactors/StorageInteractor";
import {ExportInteractor} from "src/interactors/ExportInteractor";

export class DashboardModel extends ViewModel {

	// internal
	private sessions: TestSession[] = [];
	private deleting: {group: string, user: string} = null;

	constructor() {
		super();
		this.updateSessions();
	}

	private updateSessions() {
		this.sessions = StorageInteractor.getSessions();
	}

	get title() { return this.strings["sessions"] }

	get sessionList() {
		let sessionList: {group: string, user: string}[] = [];
		this.sessions.forEach((session) => {
			sessionList.push({
				group: session.groupCode,
				user: session.userCode
			})
		});
		return sessionList;
	}

	saveSession(group: string, user: string) {
		let session = this.sessions.find((session) => {
			return session.groupCode === group &&
				session.userCode === user;
		});

		if (session) {
			ExportInteractor.exportJSON(
				session.groupCode + "_" + session.userCode + ".json",
				session
			);
		}
	}

	deleteSession(group: string, user: string) {
		this.deleting = {group, user};
	}

	get showConfirmDeletion() {
		return !(this.deleting === null);
	}

	confirmDeletion() {
		this.deleting = null;
	}

	cancelDeletion() {
		this.deleting = null;
	}
}
