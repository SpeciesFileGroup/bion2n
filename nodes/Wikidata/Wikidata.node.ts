import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

export class Wikidata implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Wikidata',
		name: 'wikidata',
		icon: 'file:wikidata.svg',
		group: ['transform'],
		version: 1,
		description: 'Wikidata is a free and open knowledge base that can be read and edited by both humans and machines',
		defaults: {
			name: 'Wikidata',
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
						name: 'Query',
						value: 'query',
					},
				],
				default: 'query',
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
							'query',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a SPARQL query result',
						action: 'Get a query',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Server',
				name: 'server',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'query',
						],
					},
				},
				default:'https://query.wikidata.org',
				description:'The Wikibase server',
			},
			{
				displayName: 'SPARQL Query',
				name: 'query',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'query',
						],
					},
				},
				default:'',
				description:'A SPARQL query',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		//const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		// const qs: IDataObject = {};

		for (let i = 0; i < items.length; i++) {
			try {
				const apiUrl = this.getNodeParameter('server', i) as IDataObject;
				if (operation === 'get') {
					const query = encodeURIComponent(this.getNodeParameter('query', i) as string);

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/sparql?format=json&query=${query}`,
						json: true,
					};

					responseData = await this.helpers.request(options);
					returnData.push(...responseData['results']['bindings']);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(i)[0].json, error, pairedItem: i });
				} else {
					if (error.context) {
						error.context.itemIndex = i;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex: i,
					});
				}
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
