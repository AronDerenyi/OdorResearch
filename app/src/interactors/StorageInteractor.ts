import {TestSession} from "src/model/TestSession";

export class StorageInteractor {

	private static readonly SESSION_PREFIX = "session:";

	static storeSession(session: TestSession) {
		const key = StorageInteractor.SESSION_PREFIX + session.groupCode + "_" + session.userCode;
		localStorage.setItem(key, JSON.stringify(session));
	}

	static deleteSession(groupCode: string, userCode: string) {
		const key = StorageInteractor.SESSION_PREFIX + groupCode + "_" + userCode;
		localStorage.removeItem(key);
	}

	static getSessions(): TestSession[] {
		const sessions: TestSession[] = [];

		for (let index = 0; index < localStorage.length; index++) {
			const key = localStorage.key(index);
			if (key.startsWith(StorageInteractor.SESSION_PREFIX)) {
				sessions.push(JSON.parse(localStorage.getItem(key)));
			}
		}

		return sessions;
	}
}
