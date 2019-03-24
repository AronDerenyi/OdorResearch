import Path from "path";
import FS from "fs";
import {IapsAsset} from "src/model/assets/IapsAsset";

export class AssetApi {

	static readonly ASSET_DIRECTORY = "assets";
	static readonly IAPS_DIRECTORY = "iaps";

	static getIapsAssets(assetsCallback: (assets: Array<IapsAsset>) => void, errorCallback: (error: Error) => void) {
		const path = Path.resolve(__dirname, this.ASSET_DIRECTORY, this.IAPS_DIRECTORY);

		FS.readdir(path, (error, files) => {
			if (!error) {
				const assets: Array<IapsAsset> = [];

				files.forEach((name) => {
					const path = Path.resolve(__dirname, this.ASSET_DIRECTORY, this.IAPS_DIRECTORY, name);
					assets.push(new IapsAsset(name, path));
				});

				assetsCallback(assets);
			} else {
				errorCallback(error);
			}
		});
	}
}