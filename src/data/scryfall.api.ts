import collected from "./current-planeswalkers.json";

export interface PlaneswalkerCard {
	display_name: string;
	set: string;
	set_icon: string;
	price: number;
	isFoil: boolean;
}

const scryfall_card_url =
	"https://api.scryfall.com/cards/search?q=type%3Aplaneswalker%20(game%3Apaper)%20-is%3Areprint%20lang%3Aen&format=json&include_extras=false&include_multilingual=false&include_variations=false&unique=cards&order=released&dir=asc&page=";
const scryfall_set_url = "https://api.scryfall.com/sets";

async function scryfallRequest(requestUrl: string, page: number = 1) {
	let cards: any[] = [];

	while (true) {
		const repo = await fetch(requestUrl + page).then((r) => r.json());
		cards = [...cards, ...repo.data];

		if (repo.has_more === false) {
			break;
		}
		page++;
	}
	return cards;
}

export default async function requestHttp() {
	const cards = await scryfallRequest(scryfall_card_url, 1);
	const sets = await fetch(scryfall_set_url)
		.then((r) => r.json())
		.then((i) => i.data);

	const getSetIcon = (code: string) => {
		let set = sets.find((i: { code: string }) => i.code === code);
		return set ? set.icon_svg_uri.substr(0, set.icon_svg_uri.indexOf("?")) : null;
	};

	const getPriceString = (prices: { usd: any; usd_foil: any }) => {
		if (prices.usd) return [prices.usd, false];
		if (prices.usd_foil) return [prices.usd_foil, true];
		return ["---", false];
	};

	const data: PlaneswalkerCard[] = cards
		.filter((i) => !collected.find((m) => m.name === i.name && !m.isReprint))
		.map((card) => {
			let pricing = getPriceString(card.prices);

			return {
				name: card.name,
				display_name: card.name.indexOf("//") > -1 ? card.name.split("//")[1].trim() : card.name,
				set: card.set.toUpperCase(),
				set_icon: getSetIcon(card.set),
				price: pricing[0],
				isFoil: pricing[1],
			};
		});

	return data;
}
