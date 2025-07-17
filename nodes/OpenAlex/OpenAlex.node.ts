import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

export class OpenAlex implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'OpenAlex',
		name: 'openAlex',
		icon: 'file:openAlex.svg',
		group: ['transform'],
		version: 1,
		description: 'OpenAlex is a free, open, and comprehensive index of scholarly papers, authors, institutions, and more.',
		defaults: {
			name: 'OpenAlex',
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
						name: 'Authors',
						value: 'authors',
					},
					{
						name: 'Funders',
						value: 'funders',
					},
					{
						name: 'Institutions',
						value: 'institutions',
					},
					{
						name: 'Keywords',
						value: 'keywords',
					},
					{
						name: 'Publishers',
						value: 'publishers',
					},
					{
						name: 'Sources',
						value: 'sources',
					},
					{
						name: 'Topics',
						value: 'topics',
					},
					{
						name: 'Works',
						value: 'works',
					},
				],
				default: 'works',
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
							'funders',
							'institutions',
							'keywords',
							'publishers',
							'sources',
							'topics',
							'works',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a resource',
						action: 'Get a resource',
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
							'authors',
							'funders',
							'institutions',
							'keywords',
							'publishers',
							'sources',
							'topics',
							'works',
						],
					},
				},
				default:'',
				description:'Your email address is required by OpenAlex to use their API. It is used to contact you in case of any issues with your requests.',
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
							'funders',
							'institutions',
							'keywords',
							'publishers',
							'sources',
							'topics',
							'works',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Filters',
						name: 'filters',
						type: 'string',
						default: '',
						required: false,
						description: 'Filters to apply to the request. For example, "is_oa:true" to filter for open access works. See the API documentation for an extensive list of available filters.',
					},
					{
						displayName: 'Group By',
						name: 'groupBy',
						type: 'string',
						default: '',
						required: false,
						description: 'Get counts of resources grouped by a specific field. For example, group_by=has_doi will return the number of works with and without DOIs. See the API documentation for available fields to group by.',
					},
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						required: false,
						description: 'The unique identifier for the resource. This is optional and can be used to retrieve a single item directly by its ID. External IDs can also be used including "doi", "pmid", "pmcid", or "mag".',
					},
					{
						displayName: 'Search Query',
						name: 'search',
						type: 'string',
						default: '',
						required: false,
						description: 'The search query to use for searching OpenAlex.',
					},
					{
						displayName: 'Random result',
						name: 'random',
						type: 'boolean',
						default: false,
						required: false,
						description: 'If set to true, the API will return a random result instead of a specific resource. This is useful for getting a random sample of works or authors. Note: this cannot be used in combination with other parameters.',
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
					{
						displayName: 'Select Fields',
						name: 'select',
						type: 'string',
						default: '',
						required: false,
						description: 'Comma-separated list of fields to include in the response. This can be used to limit the amount of data returned. For example, "id,display_name,doi" will return only those fields for each resource.',
					}
				],
			}
		],
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const additionalFields = this.getNodeParameter('additionalFields', 0) as IDataObject;
		const qs: IDataObject = {};

		for (let i = 0; i < items.length; i++) {
			let apiUrl = '';
			const email = this.getNodeParameter('email', i) as string;
			qs['email'] = email;

			let urlPrefix = '';
			let urlSuffix = '';
			if (additionalFields.filters) {
				qs['filter'] = additionalFields.filters;
			}
			if (additionalFields.groupBy) {
				qs['group_by'] = additionalFields.groupBy;
			}
			if (additionalFields.id) {
				urlSuffix = `/${encodeURIComponent(additionalFields.id as string)}`;
			}
			if (additionalFields.page) {
				qs['page'] = additionalFields.page;
			}
			if (additionalFields.random) {
				urlSuffix = '/random';
			}
			if (additionalFields.search) {
				qs['search'] = additionalFields.search;
			}
			if (additionalFields['select']) {
				qs['select'] = additionalFields['select'];
			}

			apiUrl = `https://api.openalex.org/${urlPrefix}${resource}${urlSuffix}`;

			console.log('API URL:', apiUrl);
			console.log('Query Parameters:', qs);

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
			returnData.push(responseData);

		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
