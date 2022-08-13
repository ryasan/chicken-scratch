import React, { useState } from 'react';
import parse from 'html-react-parser';
import {
	Col,
	Container,
	Form,
	ListGroup,
	Row,
	Stack
} from 'react-bootstrap';
import { data } from './data.json';

const {
	allEpProduct: {
		nodes: products
	}
} = data;

export default function App () {
	const [searchTerm, setSearchTerm] = useState('');
	const keyWords = searchTerm.split(' ').filter(Boolean);

	function renderDiv (string) {
		let htmlString = string || '';
		const cleanString = htmlString.replace(/(<([^>]+)>)/gi, '');
		const patterns = keyWords.map(word => new RegExp(word, 'i'));

		if (keyWords.length > 0) {
			htmlString = cleanString.split(' ').map(word => {
				if (patterns.some(pattern => pattern.test(word))) {
					return `<mark>${ word }</mark>`;
				}

				return word;
			}).join(' ');
		}

		return <div>{parse(htmlString)}</div>;
	}

	return (
		<Container>
			<h1 className="my-4">Product Search</h1>
			<Form.Control
				className="my-4"
				placeholder="Search..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<Stack className="my-4" gap={3}>
				{products.filter(product => {
					if (searchTerm === '') return true;

					const dirtySearchString = [
						(product.attributes?.sku) || '',
						(product.attributes?.name) || '',
						(product.attributes?.description) || '',
						(product.attributes?.extensions?.products_product_details_?.product_tags) || '',
						(product.attributes?.extensions?.products_product_details_?.product_brand_name) || '',
						(product.attributes?.extensions?.products_carousel_?.new_to_maavee && 'new') || '',
					].join(' ');
					const cleanSearchString = dirtySearchString.replace(/(<([^>]+)>)/gi, '');

					for (let i = 0; i < keyWords.length; i += 1) {
						if (cleanSearchString.toLowerCase().includes(keyWords[i].toLowerCase())) {
							return true;
						}
					}

					return cleanSearchString.toLowerCase().includes(searchTerm.toLowerCase());
				}).map((product, idx) => (
					<ListGroup key={idx}>
						<ListGroup.Item variant="primary">
							{renderDiv(product.attributes?.name)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col sm={2}>
									<strong>description:</strong>
								</Col>
								<Col>
									{renderDiv(product.attributes?.description)}
								</Col>
							</Row>
							<Row>
								<Col sm={2}>
									<strong>brand:</strong>
								</Col>
								<Col>
									{renderDiv(product.attributes?.extensions?.products_product_details_?.product_brand_name)}
								</Col>
							</Row>
							<Row>
								<Col sm={2}>
									<strong>tags:</strong>
								</Col>
								<Col>
									{renderDiv(product.attributes?.extensions?.products_product_details_?.product_tags)}
								</Col>
							</Row>
						</ListGroup.Item>
					</ListGroup>
				))}
			</Stack>
		</Container>
	);
}
