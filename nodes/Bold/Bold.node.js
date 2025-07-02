'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Bold = void 0;
function setUrlParameters(parameter, values, urlParams = '') {
	values.split(',').forEach((value) => {
		urlParams += `&${parameter}=${value}`;
	});
	return urlParams;
}
class Bold {
	constructor() {
		this.description = {
			displayName: 'BOLD',
			name: 'bold',
			icon: 'file:bold.svg',
			group: ['transform'],
			version: 1,
			description: 'A DNA barcode reference library',
			defaults: {
				name: 'BOLD',
				color: '#8dbe42',
			},
			inputs: ['main'],
			outputs: ['main'],
			credentials: [],
			properties: [
				{
					displayName: 'Resource',
					name: 'resource',
					type: 'options',
					options: [
						{
							name: 'Combined (Specimen + Sequence)',
							value: 'combined',
						},
						{
							name: 'Sequence',
							value: 'sequence',
						},
						{
							name: 'Specimen',
							value: 'specimen',
						},
						{
							name: 'Stats',
							value: 'stats',
						},
					],
					default: '',
					required: true,
					description: 'Resource to consume',
				},
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: ['combined', 'sequence', 'specimen', 'stats'],
						},
					},
					options: [
						{
							name: 'Get',
							value: 'get',
							description: 'Get a resource',
						},
					],
					default: 'get',
					description: 'The operation to perform.',
				},
				{
					displayName: 'Additional Fields',
					name: 'additionalFields',
					type: 'collection',
					placeholder: 'Add Field',
					default: {},
					displayOptions: {
						show: {
							resource: ['combined', 'sequence', 'specimen', 'stats'],
							operation: ['get'],
						},
					},
					options: [
						{
							displayName: 'BINs',
							name: 'bin',
							type: 'string',
							default: '',
							description:
								'A pipe-separated list of Barcode Index Numbers (e.g., BOLD:AAA5125|BOLD:AAA5126)',
						},
						{
							displayName: 'Container',
							name: 'container',
							type: 'string',
							default: '',
							description: 'A pipe-separated list of datasets or projects (e.g., SSBAA|SSBAB)',
						},
						{
							displayName: 'Geography',
							name: 'geo',
							type: 'string',
							default: '',
							description:
								'A pipe-separated list of geographical names for countries and province/states (e.g., Canada|Alaska)',
						},
						{
							displayName: 'IDs',
							name: 'ids',
							type: 'string',
							default: '',
							description:
								'A pipe-separated list of process or sample identifiers (e.g., ACRJP618-11|ACRJP619-11)',
						},
						{
							displayName: 'Institutions',
							name: 'institutions',
							type: 'string',
							default: '',
							description:
								'A pipe-separated list of institutions (e.g., Biodiversity Institute of Ontario|York University)',
						},
						{
							displayName: 'Researchers',
							name: 'researchers',
							type: 'string',
							default: '',
							description:
								'A pipe-separated list of researchers (e.g., Thibaud Decaens|Rodolphe Rougerie)',
						},
						{
							displayName: 'Taxon',
							name: 'taxon',
							type: 'string',
							default: '',
							description: 'A taxon name or pipe-separated list of taxa (e.g., Aves|Reptilia)',
						},
					],
				},
			],
		};
	}
	async execute() {
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);
		const qs = {};
		for (let i = 0; i < items.length; i++) {
			const additionalFields = this.getNodeParameter('additionalFields', i);
			let apiUrl = '';
			qs.format = 'json';
			if (additionalFields.bin) {
				qs.bin = additionalFields.bin;
			}
			if (additionalFields.container) {
				qs.container = additionalFields.container;
			}
			if (additionalFields.geo) {
				qs.geo = additionalFields.geo;
			}
			if (additionalFields.ids) {
				qs.ids = additionalFields.ids;
			}
			if (additionalFields.institutions) {
				qs.institutions = additionalFields.institutions;
			}
			if (additionalFields.researchers) {
				qs.researchers = additionalFields.researchers;
			}
			if (additionalFields.taxon) {
				qs.taxon = additionalFields.taxon;
			}
			if (resource === 'combined') {
				apiUrl = 'http://www.boldsystems.org/index.php/API_Public/combined';
			} else if (resource === 'sequence') {
				apiUrl = 'http://www.boldsystems.org/index.php/API_Public/sequence';
			} else if (resource === 'specimen') {
				apiUrl = 'http://www.boldsystems.org/index.php/API_Public/specimen';
			} else if (resource === 'stats') {
				apiUrl = 'http://www.boldsystems.org/index.php/API_Public/stats';
			}
			if (operation === 'get') {
				const options = {
					headers: {
						Accept: 'application/json',
					},
					method: 'GET',
					uri: `${apiUrl}`,
					json: true,
					qs,
				};
				responseData = await this.helpers.request(options);
				if (resource === 'combined' || resource === 'specimen') {
					responseData = responseData['bold_records']['records'];
				}
				returnData.push(responseData);
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
exports.Bold = Bold;
//# sourceMappingURL=Bold.node.js.map
