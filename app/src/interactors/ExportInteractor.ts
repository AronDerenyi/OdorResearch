export class ExportInteractor {

	static exportJSON(name: string, data: any) {
		const json = JSON.stringify(data);

		const element = document.createElement("a");
		element.setAttribute("href", "data:application/json;charset=utf-8," + encodeURIComponent(json));
		element.setAttribute("download", name);
		element.setAttribute("target", "_blank");
		element.style.display = "none";

		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
}
