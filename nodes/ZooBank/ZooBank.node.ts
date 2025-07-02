import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

export class ZooBank implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ZooBank',
		name: 'zooBank',
		icon: 'file:zooBank.svg',
		group: ['transform'],
		version: 1,
		description: 'ZooBank is a central, authoritative and comprehensive resource for scientific names in zoology',
		defaults: {
			name: 'ZooBank',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Author',
						value: 'authors',
					},
					{
						name: 'GNIE Matching',
						value: 'gnieMatching',
					},
					{
						name: 'Identifier',
						value: 'identifiers',
					},
					{
						name: 'Publication',
						value: 'publications',
					},
					{
						name: 'Statistic',
						value: 'statistics',
					},
					{
						name: 'Taxon Name Usage',
						value: 'taxonNameUsages',
					},
				],
				default: 'authors',
				required: true,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
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
						action: 'Get an authors',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: [
							'authors',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default:'',
						description:'An author UUID (e.g., 8C466CBE-3F7D-4DC9-8CBD-26DD3F57E212',
					},
					{
						displayName: 'Search Term',
						name: 'searchTerm',
						type: 'string',
						default:'',
						description:'A search term',
					},
					{
						displayName: 'Term',
						name: 'term',
						type: 'string',
						default:'',
						description:'An autocomplete term',
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
						resource: [
							'gnieMatching',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default:'',
						description:'A protonym UUID (e.g., FFF7160A-372D-40E9-9611-23AF5D9EAC4C)',
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
						resource: [
							'identifiers',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default:'',
						description:'A UUID (e.g., 6EA8BB2A-A57B-47C1-953E-042D8CD8E0E2)',
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
						resource: [
							'publications',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default:'',
						description:'A publication UUID (e.g., 427D7953-E8FC-41E8-BEA7-8AE644E6DE77)',
					},
					{
						displayName: 'Search Term',
						name: 'searchTerm',
						type: 'string',
						default:'',
						description:'A search term',
					},
					{
						displayName: 'Term',
						name: 'term',
						type: 'string',
						default:'',
						description:'An autocomplete term',
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
						resource: [
							'statistics',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Start Date',
						name: 'startDate',
						type: 'string',
						default: '',
						description: 'The start date in format mm/dd/yyyy',
					},
					{
						displayName: 'End Date',
						name: 'endDate',
						type: 'string',
						default: '',
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
						resource: [
							'taxonNameUsages',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default:'',
						description:'An taxon name usage UUID (e.g., 6EA8BB2A-A57B-47C1-953E-042D8CD8E0E2)',
					},
					{
						displayName: 'Scientific Name',
						name: 'sciName',
						type: 'string',
						default:'',
						description: 'A scientific name (e.g., Aedes aegtypi)',
					},
					{
						displayName: 'Search Term',
						name: 'searchTerm',
						type: 'string',
						default:'',
						description:'A search term',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		let returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const qs: IDataObject = {};

		for (let i = 0; i < items.length; i++) {
			let apiUrl = '';
			if (resource === 'authors') {
				const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

				let idEndpoint = '';
				if (additionalFields.id) {
					idEndpoint = `/${additionalFields.id}`;
				}
				if (additionalFields.searchTerm) {  // TODO: report ZooBank search_term parameter bug
					qs['search_term'] = additionalFields.searchTerm;
				}
				if (additionalFields.term) {
					qs['term'] = additionalFields.term;
				}

				apiUrl = `http://zoobank.org/Authors.json${idEndpoint}`;
			}
			else if (resource === 'gnieMatching') {
				const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

				let idEndpoint = '';
				if (additionalFields.id) {
					idEndpoint = `/${additionalFields.id}`;
				}

				apiUrl = `http://zoobank.org/MatchingTaxonNames.json/${idEndpoint}`;
			}
			else if (resource === 'identifiers') {
				const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

				let idEndpoint = '';
				if (additionalFields.id) {
					idEndpoint = `/${additionalFields.id}`;
				}

				apiUrl = `http://zoobank.org/Identifiers.json/${idEndpoint}`;
			}
			else if (resource === 'publications') {
				const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

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
			}
			else if (resource === 'statistics') {
				const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

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
			}
			else if (resource === 'taxonNameUsages') {
				const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

				let idEndpoint = '';
				if (additionalFields.id) {
					idEndpoint = `/${additionalFields.id}`;
				}
				if (additionalFields.sciName) {  // if they give both an ID and a sciName, take sciName
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
			}

			if (operation === 'get') {

				const options: IHttpRequestOptions = {
					headers: {
						'Accept': 'application/json',
					},
					method: 'GET',
					url: `${apiUrl}`,
					json: true,
					qs,
				};

				responseData = await this.helpers.request(options);
				if (resource === 'authors') {
					responseData = responseData[0];
					returnData.push(responseData);
				}
				else if (resource === 'gnieMatching') {
					responseData = responseData['DATA'];
					returnData.push(responseData);
				}
				else if (resource === 'identifiers') {
					returnData.push(responseData);
					returnData = returnData[0];
				}
				else if (resource === 'publications') {
					returnData.push(responseData);
					returnData = returnData[0];
				}
				else if (resource === 'statistics') {
					returnData.push(responseData['data']);
					returnData = returnData[0];
				}
				else if (resource === 'taxonNameUsages') {
					returnData.push(responseData);
					returnData = returnData[0];
				}

			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
