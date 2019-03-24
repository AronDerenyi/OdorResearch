export class EventData {

	readonly time: number;
	readonly type: string;
	readonly message: string;

	constructor(time: number, type: string, message: string) {
		this.time = time;
		this.type = type;
		this.message = message;
	}
}