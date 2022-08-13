import { data } from '../data/maavee-products.json';

const {
	allEpProduct: {
		nodes: allProducts,
	}
} = data;

const searchTerm = 'animation       zzz   ';
const keyWords = searchTerm.split(' ').filter(Boolean);

function searched (product) {
	if (!searchTerm) return true;
	
	const dirtySearchString = [
		(product.attributes?.name) || '',
		(product.attributes?.description) || '',
		(product.attributes?.extensions?.products_product_details_?.product_brand_name) || '',
		(product.attributes?.extensions?.products_product_details_?.product_tags) || '',
		(product.attributes?.extensions?.products_carousel_?.new_to_maavee && 'new') || '',
	].join(' ');
	const cleanSearchString = dirtySearchString.replace(/(<([^>]+)>)/gi, ''); // Exclude static HTML tags from search string.

	for (let i = 0; i < keyWords.length; i += 1) {
		if (cleanSearchString.toLowerCase().includes(keyWords[i].toLowerCase())) {
			return true;
		}
	}

	return false;
}

function getSearchResults () {
	return allProducts.filter(searched);
}

getSearchResults('animation       zzz   ');
