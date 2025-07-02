import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class Bionomia implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Bionomia',
		name: 'bionomia',
		icon: 'file:bionomia.svg',
		group: ['transform'],
		version: 1,
		description: 'Link natural history specimens to the world\'s collectors',
		defaults: {
			name: 'Bionomia',
			color: '#012429',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Occurrence',
						value: 'occurrence',
					},
					{
						name: 'Occurrence Search',
						value: 'occurrenceSearch',
					},
					{
						name: 'Parse',
						value: 'parse',
					},
					{
						name: 'People',
						value: 'people',
					},
					{
						name: 'People Search',
						value: 'peopleSearch',
					},
					{
						name: 'Specimens',
						value: 'specimens',
					},
				],
				default: 'parse',
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
							'occurrence',
							'occurrenceSearch',
							'parse',
							'people',
							'peopleSearch',
							'specimens',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a parsed human name',
					},
				],
				default: 'get',
				description: 'The operation to perform.',
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'people',
							'specimens',
						],
					},
				},
				default:'',
				description:'The ORCID or Wikidata ID for a person',
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'occurrence',
						],
					},
				},
				default:'',
				description:'The occurrence ID provided by the Global Biodiversity Information Facility (GBIF)',
			},
			{
				displayName: 'Human name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'parse',
						],
					},
				},
				default:'',
				description:'The human name to parse',
			},
			{
				displayName: 'Query',
				name: 'q',
				type: 'string',
				required: false,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'peopleSearch',
						],
					},
				},
				default: '',
				description:'The search query',
			},
			{
				displayName: 'Dataset Key',
				name: 'datasetKey',
				type: 'string',
				required: true,
				default: '',
				description: 'A UUID provided by the Global Biodiversity Information Facility (GBIF)',
				displayOptions: {
					show: {
						resource: [
							'occurrenceSearch',
						],
						operation: [
							'get',
						],
					},
				},
			},
			{
				displayName: 'Occurrence ID',
				name: 'occurrenceID',
				type: 'string',
				required: true,
				default: '',
				description: 'The occurrence ID from the data provider',
				displayOptions: {
					show: {
						resource: [
							'occurrenceSearch',
						],
						operation: [
							'get',
						],
					},
				},
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
							'peopleSearch',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Date',
						name: 'date',
						type: 'string',
						default: '',
						description: 'A date expressed as YYYY-MM-DD, YYYY-MM, or YYYY',
					},
					{
						displayName: 'Families Collected',
						name: 'familiesCollected',
						type: 'string',
						default: '',
						description: 'Comma-separated list of taxonomic families collected',
					},
					{
						displayName: 'Families Identified',
						name: 'familiesIdentified',
						type: 'string',
						default: '',
						description: 'Comma-separated list of taxonomic families identified',
					},
					{
						displayName: 'Strict',
						name: 'strict',
						type: 'boolean',
						default: false,
						description: 'Controls if there must be match for families collected, families identified, and date when those parameters are present',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: 0,
						description: 'The results page number',
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 30,
						description: 'The number of results to return per page',
					},
				],
			},
		],
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			if (resource === 'occurrence') {
				if (operation === 'get') {
					const id = this.getNodeParameter('id', i) as string;

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/ld+json',
						},
						method: 'GET',
						url: `https://bionomia.net/occurrence/${id}`,
						json: true,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'occurrenceSearch') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					const datasetKey = this.getNodeParameter('datasetKey', i) as string;
					const occurrenceID = this.getNodeParameter('occurrenceID', i) as string;

					qs.datasetKey = datasetKey;
					qs.occurrenceID = occurrenceID;

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `https://bionomia.net/occurrences/search`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'parse') {
				if (operation === 'get') {
					let name = this.getNodeParameter('name', i) as string;
					name = encodeURIComponent(name);

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `https://api.bionomia.net/parse?names=` + name,
						json: true,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData[0]);
				}
			} else if (resource === 'people') {
				if (operation === 'get') {
					const id = this.getNodeParameter('id', i) as string;

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/ld+json',
						},
						method: 'GET',
						url: `https://bionomia.net/${id}`,
						json: true,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'peopleSearch') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					const q = this.getNodeParameter('q', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					qs.q = q;

					if (typeof additionalFields.date !== 'undefined') {
						qs.date = additionalFields.date;
					}
					if (typeof additionalFields.familiesCollected !== 'undefined') {
						qs.families_collected = additionalFields.familiesCollected;
					}
					if (typeof additionalFields.familiesIdentified !== 'undefined') {
						qs.families_identified = additionalFields.familiesIdentified;
					}
					if (typeof additionalFields.strict !== 'undefined') {
						qs.strict = additionalFields.strict;
					}
					if (typeof additionalFields.page !== 'undefined') {
						qs.page = additionalFields.page;
					}
					if (typeof additionalFields.limit !== 'undefined') {
						qs.limit = additionalFields.limit;
					}


					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `https://api.bionomia.net/users/search`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'specimens') {
				if (operation === 'get') {
					const id = this.getNodeParameter('id', i) as string;

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/ld+json',
						},
						method: 'GET',
						url: `https://bionomia.net/${id}/specimens.jsonld`,
						json: true,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
