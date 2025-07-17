import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

export class Unpaywall implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Unpaywall',
		name: 'unpaywall',
		icon: 'file:unpaywall.svg',
		group: ['transform'],
		version: 1,
		description: 'Unpaywall harvests open access content from over 50,000 publishers and makes it easy to find, track, and use',
		defaults: {
			name: 'Unpaywall',
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
						name: 'DOI',
						value: 'doi',
					},
					{
						name: 'Search',
						value: 'search',
					},
				],
				default: 'doi',
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
							'doi',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a DOI',
						action: 'Get a DOI',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'search',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a search result',
						action: 'Get a search result',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'doi',
							'search',
						],
					},
				},
				default:'',
				description:'Your email address is required by Unpaywall to use their API. It is used to contact you in case of any issues with your requests.',
			},
			{
				displayName: 'DOI',
				name: 'doi',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'doi',
						],
					},
				},
			},
			{
				displayName: 'Search Query',
				name: 'query',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'search',
						],
					},
				},
				description: 'The search query to use for searching Unpaywall.',
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
							'search',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Is Open Access',
						name: 'isOpenAccess',
						type: 'boolean',
						default: true,
						description: 'Filter results to include only open access articles or non-open access articles.',
					},
					{
						displayName: 'Results Page',
						name: 'page',
						type: 'number',
						default: 1,
						typeOptions: {
							minValue: 1,
						},
						description: 'Sets the results page to return.',
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
		const qs: IDataObject = {};

		for (let i = 0; i < items.length; i++) {
			let apiUrl = '';
			const email = this.getNodeParameter('email', i) as string;
			qs['email'] = email;

			if (resource === 'search') {
				const query = this.getNodeParameter('query', i) as string;
				const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

				qs['query'] = query;
				if (typeof additionalFields.isOpenAccess !== 'undefined') {
					qs['is_oa'] = additionalFields.isOpenAccess;
				}
				if (additionalFields.page !== 'undefined') {
					qs['page'] = additionalFields.page;
				}

				apiUrl = 'https://api.unpaywall.org/v2/search';
			} else if (resource === 'doi') {
				const doi = this.getNodeParameter('doi', i) as string;
				apiUrl = 'https://api.unpaywall.org/v2/' + doi;
			}

			const options: IHttpRequestOptions = {
				headers: {
					'Accept': 'application/json',
				},
				method: 'GET',
				url: `${apiUrl}`,
				json: true,
				qs,
			};

			if (resource === 'doi') {
				responseData = await this.helpers.request(options);
				returnData.push(responseData);

			} else if (resource === 'search') {
				responseData = await this.helpers.request(options);
				returnData.push(...responseData['results']);
			}

		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
