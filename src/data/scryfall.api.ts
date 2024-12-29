import collected from "./current-planeswalkers.json";

export interface PlaneswalkerCard {
	display_name: string;
	collector_number: string;
	set: string;
	set_name: string;
	set_icon: string;
	price: number | null;
	image_src: string;
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

	const getCardImage = (card: any, isFlipCard: boolean): string => {
		if (isFlipCard) {
			let planeswalker = card.card_faces.find((i: any) => i.type_line.indexOf("Planeswalker") > -1);
			return planeswalker.image_uris.border_crop;
		}
		return card.image_uris.border_crop;
	};

	const getCardName = (card: any, isFlipCard: boolean): string => {
		if (isFlipCard) {
			let planeswalker = card.card_faces.find((i: any) => i.type_line.indexOf("Planeswalker") > -1);
			return planeswalker.name;
		}

		return card.name;
	};

	const getPriceString = (prices: { usd: any; usd_foil: any }) => {
		if (prices.usd) return [prices.usd, false];
		if (prices.usd_foil) return [prices.usd_foil, true];
		return [null, false];
	};

	const getSetIcon = (code: string) => {
		let set = sets.find((i: { code: string }) => i.code === code);
		return set ? set.icon_svg_uri.substr(0, set.icon_svg_uri.indexOf("?")) : null;
	};

	const data: PlaneswalkerCard[] = cards
		.filter((i) => !collected.find((m) => m.name === i.name && !m.isReprint))
		.map((card) => {
			let pricing = getPriceString(card.prices);
			let isFlipCard = ["transform", "modal_dfc"].includes(card.layout) as boolean;

			return {
				name: card.name,
				collector_number: card.collector_number.padStart(3, "0"),
				display_name: getCardName(card, isFlipCard),
				set: card.set.toUpperCase(),
				set_name: card.set_name,
				set_icon: getSetIcon(card.set),
				price: pricing[0],
				isFoil: pricing[1],
				image_src: getCardImage(card, isFlipCard),
			};
		});

	return data;
}
