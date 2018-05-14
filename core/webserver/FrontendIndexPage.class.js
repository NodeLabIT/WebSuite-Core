"use strict";

const tpl = require("node-tpl");

class FrontendIndexPage {

	/**
	 * Initialisiert die Klasse für die Frontend-Index-Page. Dabei wird die Frontend-Index-Page kompiliert und ein
	 * Event-Listener registriert, der die Seite neu kompiliert, wenn an den allgemeinen Einstellungen der Seite etwas
	 * geändert wird.
	 * */
	static init() {
		this.compileIndexPage();
		WebSuite.getEventHandler().on("general-configuration-changed", () => {
			console.log("general configuration changed. recompiling...");
			this.compileIndexPage();
		});
	}

	/**
	 * Gibt die kompilierte Frontend-Index-Page zurück, die dann an den Client gesendet werden kann.
	 *
	 * @return {String}
	 * */
	static getIndexPage() {
		return this.compiledIndexPage;
	}

	/**
	 * Kompiliert die Frontend-Index-Page der WebSuite und schreibt dabei alle Daten aus der page.json in die angegebene
	 * Template-Datei.
	 * */
	static compileIndexPage() {
		global.FileUtil.readFile(`${global._dir}/data/page.json`).then((pageData) => {
			pageData = JSON.parse(pageData);

			const data = {
				/*meta: [
					{
						name: "",
						lang: "",
						content: ""
					}
				],
				link: [
					{
						href: "",
						rel: "",
						type: ""
					}
				],
				script: [
					{
						src: ""
					}
				]*/
				meta: pageData.metas,
				link: [],
				script: [],
				title: pageData.title,
				description: pageData.description,
				keywords: pageData.keywords,
				footerScript: pageData.footerScript
			};

			tpl.assign("title" , pageData.title);
			tpl.assign("description" , pageData.description);

			tpl.assign("metas" , pageData.metas);
			tpl.assign("links" , pageData.links);
			tpl.assign("scripts" , pageData.scripts);

			tpl.setcwd(__dirname);

			this.compiledIndexPage = tpl.fetch("index.tpl");
		}).catch((err) => {
			this.compiledIndexPage = null;
			console.log(err.message);
		});
	}

}

module.exports = FrontendIndexPage;