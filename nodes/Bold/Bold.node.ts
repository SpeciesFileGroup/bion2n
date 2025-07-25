import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

export class Bold implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BOLD',
		name: 'bold',
		icon: 'file:bold.svg',
		group: ['transform'],
		version: 1,
		description: 'A DNA barcode reference library',
		defaults: {
			name: 'BOLD',
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
						name: 'Combined (Specimen + Sequence)',
						value: 'combined',
					},
					{
						name: 'Sequence',
						value: 'sequence',
					},
					{
						name: 'Speciman',
						value: 'specimen',
					},
					{
						name: 'Stat',
						value: 'stats',
					},
				],
				default: 'combined',
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
							'combined',
							'sequence',
							'specimen',
							'stats',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a resource',
						action: 'Get a combined',
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
							'combined',
							'sequence',
							'specimen',
							'stats',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'BINs',
						name: 'bin',
						type: 'string',
						default: '',
						description: 'A pipe-separated list of Barcode Index Numbers (e.g., BOLD:AAA5125|BOLD:AAA5126)',
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
						description: 'A pipe-separated list of geographical names for countries and province/states (e.g., Canada|Alaska)',
					},
					{
						displayName: 'IDs',
						name: 'ids',
						type: 'string',
						default: '',
						description: 'A pipe-separated list of process or sample identifiers (e.g., ACRJP618-11|ACRJP619-11)',
					},
					{
						displayName: 'Institutions',
						name: 'institutions',
						type: 'string',
						default: '',
						description: 'A pipe-separated list of institutions (e.g., Biodiversity Institute of Ontario|York University)',
					},
					{
						displayName: 'Researchers',
						name: 'researchers',
						type: 'string',
						default: '',
						description: 'A pipe-separated list of researchers (e.g., Thibaud Decaens|Rodolphe Rougerie)',
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


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const qs: IDataObject = {};

		for (let i = 0; i < items.length; i++) {
			const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
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
			}
			else if (resource === 'sequence') {
				apiUrl = 'http://www.boldsystems.org/index.php/API_Public/sequence';
			}
			else if (resource === 'specimen') {
				apiUrl = 'http://www.boldsystems.org/index.php/API_Public/specimen';
			}
			else if (resource === 'stats') {
				apiUrl = 'http://www.boldsystems.org/index.php/API_Public/stats';
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
				if (resource === 'combined' || resource === 'specimen') {
					responseData = responseData['bold_records']['records'];
				}

				returnData.push(responseData);
			}

		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
