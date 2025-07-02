'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ZooBank = void 0;
class ZooBank {
	constructor() {
		this.description = {
			displayName: 'ZooBank',
			name: 'zooBank',
			icon: 'file:zooBank.svg',
			group: ['transform'],
			version: 1,
			description:
				'ZooBank is a central, authoritative and comprehensive resource for scientific names in zoology',
			defaults: {
				name: 'ZooBank',
				color: '#31309c',
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
							name: 'Authors',
							value: 'authors',
						},
						{
							name: 'GNIE Matching',
							value: 'gnieMatching',
						},
						{
							name: 'Identifiers',
							value: 'identifiers',
						},
						{
							name: 'Publications',
							value: 'publications',
						},
						{
							name: 'Statistics',
							value: 'statistics',
						},
						{
							name: 'Taxon Name Usages',
							value: 'taxonNameUsages',
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
							resource: [
								'authors',
								'gnieMatching',
								'identifiers',
								'publications',
								'statistics',
								'taxonNameUsages',
							],
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
							resource: ['authors'],
							operation: ['get'],
						},
					},
					options: [
						{
							displayName: 'ID',
							name: 'id',
							type: 'string',
							required: false,
							default: '',
							description: 'An author UUID (e.g., 8C466CBE-3F7D-4DC9-8CBD-26DD3F57E212',
						},
						{
							displayName: 'Search Term',
							name: 'searchTerm',
							type: 'string',
							required: false,
							default: '',
							description: 'A search term',
						},
						{
							displayName: 'Term',
							name: 'term',
							type: 'string',
							required: false,
							default: '',
							description: 'An autocomplete term',
						},
					],
				},
				{
					displayName: 'Additional Fields',
					name: 'additionalFields',
					type: 'collection',
					placeholder: 'Add Field',
					default: {},
					displayOptions: {
						show: {
							resource: ['gnieMatching'],
							operation: ['get'],
						},
					},
					options: [
						{
							displayName: 'ID',
							name: 'id',
							type: 'string',
							required: false,
							default: '',
							description: 'A protonym UUID (e.g., FFF7160A-372D-40E9-9611-23AF5D9EAC4C)',
						},
					],
				},
				{
					displayName: 'Additional Fields',
					name: 'additionalFields',
					type: 'collection',
					placeholder: 'Add Field',
					default: {},
					displayOptions: {
						show: {
							resource: ['identifiers'],
							operation: ['get'],
						},
					},
					options: [
						{
							displayName: 'ID',
							name: 'id',
							type: 'string',
							required: false,
							default: '',
							description: 'A UUID (e.g., 6EA8BB2A-A57B-47C1-953E-042D8CD8E0E2)',
						},
					],
				},
				{
					displayName: 'Additional Fields',
					name: 'additionalFields',
					type: 'collection',
					placeholder: 'Add Field',
					default: {},
					displayOptions: {
						show: {
							resource: ['publications'],
							operation: ['get'],
						},
					},
					options: [
						{
							displayName: 'ID',
							name: 'id',
							type: 'string',
							required: false,
							default: '',
							description: 'A publication UUID (e.g., 427D7953-E8FC-41E8-BEA7-8AE644E6DE77)',
						},
						{
							displayName: 'Search Term',
							name: 'searchTerm',
							type: 'string',
							required: false,
							default: '',
							description: 'A search term',
						},
						{
							displayName: 'Term',
							name: 'term',
							type: 'string',
							required: false,
							default: '',
							description: 'An autocomplete term',
						},
					],
				},
				{
					displayName: 'Additional Fields',
					name: 'additionalFields',
					type: 'collection',
					placeholder: 'Add Field',
					default: {},
					displayOptions: {
						show: {
							resource: ['statistics'],
							operation: ['get'],
						},
					},
					options: [
						{
							displayName: 'Start Date',
							name: 'startDate',
							type: 'string',
							default: false,
							description: 'The start date in format mm/dd/yyyy',
						},
						{
							displayName: 'End Date',
							name: 'endDate',
							type: 'string',
							default: false,
							description: 'The end date in format mm/dd/yyyy',
						},
						{
							displayName: 'Period',
							name: 'period',
							type: 'options',
							options: [
								{
									name: 'Day',
									value: 'day',
								},
								{
									name: 'Month',
									value: 'month',
								},
								{
									name: 'Year',
									value: 'year',
								},
							],
							default: 'day',
						},
					],
				},
				{
					displayName: 'Additional Fields',
					name: 'additionalFields',
					type: 'collection',
					placeholder: 'Add Field',
					default: {},
					displayOptions: {
						show: {
							resource: ['taxonNameUsages'],
							operation: ['get'],
						},
					},
					options: [
						{
							displayName: 'ID',
							name: 'id',
							type: 'string',
							required: false,
							default: '',
							description: 'An taxon name usage UUID (e.g., 6EA8BB2A-A57B-47C1-953E-042D8CD8E0E2)',
						},
						{
							displayName: 'Scientific Name',
							name: 'sciName',
							type: 'string',
							required: false,
							default: '',
							description: 'A scientific name (e.g.,  Aedes aegtypi)',
						},
						{
							displayName: 'Search Term',
							name: 'searchTerm',
							type: 'string',
							required: false,
							default: '',
							description: 'A search term',
						},
					],
				},
			],
		};
	}
	async execute() {
		const items = this.getInputData();
		let responseData;
		let returnData = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);
		const qs = {};
		for (let i = 0; i < items.length; i++) {
			let apiUrl = '';
			if (resource === 'authors') {
				const additionalFields = this.getNodeParameter('additionalFields', i);
				let idEndpoint = '';
				if (additionalFields.id) {
					idEndpoint = `/${additionalFields.id}`;
				}
				if (additionalFields.searchTerm) {
					qs['search_term'] = additionalFields.searchTerm;
				}
				if (additionalFields.term) {
					qs['term'] = additionalFields.term;
				}
				apiUrl = `http://zoobank.org/Authors.json${idEndpoint}`;
			} else if (resource === 'gnieMatching') {
				const additionalFields = this.getNodeParameter('additionalFields', i);
				let idEndpoint = '';
				if (additionalFields.id) {
					idEndpoint = `/${additionalFields.id}`;
				}
				apiUrl = `http://zoobank.org/MatchingTaxonNames.json/${idEndpoint}`;
			} else if (resource === 'identifiers') {
				const additionalFields = this.getNodeParameter('additionalFields', i);
				let idEndpoint = '';
				if (additionalFields.id) {
					idEndpoint = `/${additionalFields.id}`;
				}
				apiUrl = `http://zoobank.org/Identifiers.json/${idEndpoint}`;
			} else if (resource === 'publications') {
				const additionalFields = this.getNodeParameter('additionalFields', i);
				let idEndpoint = '';
				if (additionalFields.id) {
					idEndpoint = `/${additionalFields.id}`;
				}
				if (additionalFields.searchTerm) {
					qs['search_term'] = additionalFields.searchTerm;
				}
				if (additionalFields.term) {
					qs['term'] = additionalFields.term;
				}
				apiUrl = `http://zoobank.org/References.json${idEndpoint}`;
			} else if (resource === 'statistics') {
				const additionalFields = this.getNodeParameter('additionalFields', i);
				if (additionalFields.startDate) {
					qs['start_date'] = additionalFields.startDate;
				}
				if (additionalFields.endDate) {
					qs['end_date'] = additionalFields.endDate;
				}
				if (additionalFields.period) {
					qs['period'] = additionalFields.period;
				}
				apiUrl = `http://zoobank.org/Statistics.json`;
			} else if (resource === 'taxonNameUsages') {
				const additionalFields = this.getNodeParameter('additionalFields', i);
				let idEndpoint = '';
				if (additionalFields.id) {
					idEndpoint = `/${additionalFields.id}`;
				}
				if (additionalFields.sciName) {
					let sciName = additionalFields.sciName;
					if (typeof sciName === 'string') {
						sciName = sciName.replace(/ /g, '_');
					}
					idEndpoint = `/${sciName}`;
				}
				if (additionalFields.searchTerm) {
					qs['search_term'] = additionalFields.searchTerm;
				}
				apiUrl = `http://zoobank.org/NomenclaturalActs.json${idEndpoint}`;
				console.log(apiUrl);
				console.log(qs);
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
				if (resource === 'authors') {
					responseData = responseData[0];
					returnData.push(responseData);
				} else if (resource === 'gnieMatching') {
					responseData = responseData['DATA'];
					returnData.push(responseData);
				} else if (resource === 'identifiers') {
					returnData.push(responseData);
					returnData = returnData[0];
				} else if (resource === 'publications') {
					returnData.push(responseData);
					returnData = returnData[0];
				} else if (resource === 'statistics') {
					returnData.push(responseData['data']);
					returnData = returnData[0];
				} else if (resource === 'taxonNameUsages') {
					console.log(responseData);
					returnData.push(responseData);
					returnData = returnData[0];
				}
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
exports.ZooBank = ZooBank;
//# sourceMappingURL=ZooBank.node.js.map
