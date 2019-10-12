import * as Path from "path";
import {app, BrowserWindow} from "electron";

app.on("ready", function () {
	const window = new BrowserWindow({
		width: 960,
		height: 600,
		minWidth: 800,
		minHeight: 540,
		frame: false,
		titleBarStyle: "hidden",
		webPreferences: {nodeIntegration: true}
	});

	window.loadFile(Path.resolve(__dirname, "index.html"));
	// window.webContents.toggleDevTools(); // TODO: Remove after debugging
});

app.on("window-all-closed", function () {
	app.quit();
});
