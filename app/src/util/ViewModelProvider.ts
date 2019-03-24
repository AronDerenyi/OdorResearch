export class ViewModelProvider<VM> {

	private readonly instanceProvider: () => VM;
	private instance: VM = null;
	private references = 0;

	constructor(instanceProvider: () => VM) {
		this.instanceProvider = instanceProvider;
	}

	requireInstance(): VM {
		this.references++;
		if (this.instance == null) {
			this.instance = this.instanceProvider();
		}
		return this.instance;
	}

	releaseInstance() {
		if (this.references > 0) this.references--;
		if (this.references <= 0) {
			this.references = 0;
			this.instance = null;
		}
	}
}