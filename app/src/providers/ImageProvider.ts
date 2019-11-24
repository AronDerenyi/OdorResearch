import $ from 'jquery'
import {NonWord} from "src/model/NonWord";
import {Image} from "src/model/Image";

export class ImageProvider {

	static getMood1(): Image[] {
		const images: Image[] = [];

		// noinspection JSIgnoredPromiseFromCall
		$.ajax({
			async: false,
			url: "assets/images/mood1.json",
			success: (result) => {
				result.forEach((image: any) => {
					images.push(new Image(
						image,
						"assets/images/" + image
					));
				});
			}
		});

		return images;
	}

	static getMood2(): Image[] {
		const images: Image[] = [];

		// noinspection JSIgnoredPromiseFromCall
		$.ajax({
			async: false,
			url: "assets/images/mood2.json",
			success: (result) => {
				result.forEach((image: any) => {
					images.push(new Image(
						image,
						"assets/images/" + image
					));
				});
			}
		});

		return images;
	}
}
