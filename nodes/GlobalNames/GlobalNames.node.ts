import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

export class GlobalNames implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GlobalNames',
		name: 'globalNames',
		icon: 'file:globalNames.svg',
		group: ['transform'],
		version: 1,
		description: 'GlobalNames helps parse, find, and verify scientific names',
		defaults: {
			name: 'GlobalNames',
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
						name: 'Finder',
						value: 'finder',
					},
					{
						name: 'Parse',
						value: 'parse',
					},
					{
						name: 'Verify',
						value: 'verify',
					},
				],
				default: 'parse',
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
							'finder',
						],
					},
				},
				options: [
					{
						name: 'Post',
						value: 'post',
						description: 'Find scientific names',
						action: 'Post a finder',
					},
				],
				default: 'post',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'parse',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a parsed scientific name',
						action: 'Get a parse',
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
							'verify',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a scientific name verification',
						action: 'Get a verify',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Scientific Name',
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
							'verify',
						],
					},
				},
				default:'',
				description:'A biological scientific name',
			},
			{
				displayName: 'With Details',
				name: 'withDetails',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'parse',
							'verify',
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
							'finder',
						],
						operation: [
							'post',
						],
					},
				},
				options: [
					{
						displayName: 'Bytes Offset',
						name: 'bytesOffset',
						type: 'boolean',
						default: false,
						description: 'This flag changes how the position of a detected name in text is calculated. Normally a name\'s start and end positions are given as the number of UTF-8 characters from the beginning of the text. If bytesOffset flag is true, the start and end offsets are recalculated in the number of bytes.',
					},
					{
						displayName: 'Language',
						name: 'language',
						type: 'string',
						default: '',
						description: 'The language of the text (e.g., eng). Language value is used for calculation of Bayesian odds. If this parameter is not given, english language is used by default. Currently only English and German languages are supported.',
					},
					{
						displayName: 'No Bayes',
						name: 'noBayes',
						type: 'boolean',
						default: false,
						description: 'If this flag is true, only heuristic algorithms are used for name detection',
					},
					{
						displayName: 'Odds Details',
						name: 'oddsDetails',
						type: 'boolean',
						default: false,
						description: 'If true, the result will contain odds of all features used for calculation of NaiveBayes odds. The odds describe probabiliby of a name to be \'real\'. The higher the odds, the higher the probability that a dectected name is not a false positive. Odds are calculated by multiplication of the odds of separate features. Odds details explain how the final odds value is calculated.',
					},
					{
						displayName: 'Return Content',
						name: 'returnContent',
						type: 'boolean',
						default: false,
						description: 'If this flag is true, the text used for the name detection is returned back. This flag is especially useful if the input was not a plain UTF-8 text and had to be prepared for name-finding. Then the returned content can be used together with start and end fields of detected name-strings to locate the strings in the text.',
					},
					{
						displayName: 'Text',
						name: 'text',
						type: 'string',
						default: '',
						description: 'Contains the text which will be checked for scientific names. If this parameter is not empty, the URL paramter is ignored.',
					},
					{
						displayName: 'Unique Names',
						name: 'uniqueNames',
						type: 'boolean',
						default: false,
						description: 'If this flag is true, the output returns a list of unique names, instead of a list of all name occurrences. Unique list of names does not provide position information of a name in the text.',
					},
					{
						displayName: 'URL',
						name: 'url',
						type: 'string',
						default: '',
						description: 'If text parameter is empty, and URL is given, GNfinder will process the URL and will find names in the content of its body',
					},
					{
						displayName: 'Verification',
						name: 'verification',
						type: 'boolean',
						default: false,
						description: 'When this flag is true, there is an addional verification step for detected names. This step requires internet connection and uses the Global Names verification API for queries.',
					},
					{
						displayName: 'Words Around',
						name: 'wordsAround',
						type: 'number',
						default: 0,
						description: 'Allows to see the context surrounding a name-string. The wordsAround parameter sets the number of words returned to output, which are located immediately before or after a detected name. Default is 0, maximum value is 5.',
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
							'parse',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Cultivars',
						name: 'cultivars',
						type: 'boolean',
						default: false,
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
			let apiUrl = '';
			if (resource === 'finder') {
				const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
				if (typeof additionalFields.bytesOffset !== 'undefined') {
					qs['bytesOffset'] = additionalFields.bytesOffset;
				}
				if (additionalFields.language) {
					qs['language'] = additionalFields.language;
				}
				if (typeof additionalFields.noBayes !== 'undefined') {
					qs['noBayes'] = additionalFields.noBayes;
				}
				if (typeof additionalFields.oddsDetails !== 'undefined') {
					qs['oddsDetails'] = additionalFields.oddsDetails;
				}
				if (typeof additionalFields.returnContent !== 'undefined') {
					qs['returnContent'] = additionalFields.returnContent;
				}
				if (typeof additionalFields.text !== 'undefined') {
					qs['text'] = additionalFields.text;
				}
				if (typeof additionalFields.uniqueNames !== 'undefined') {
					qs['uniqueNames'] = additionalFields.uniqueNames;
				}
				if (typeof additionalFields.url !== 'undefined') {
					qs['url'] = additionalFields.url;
				}
				if (typeof additionalFields.verification !== 'undefined') {
					qs['verification'] = additionalFields.verification;
				}
				if (typeof additionalFields.wordsAround !== 'undefined') {
					qs['wordsAround'] = additionalFields.wordsAround;
				}

				apiUrl = 'https://finder.globalnames.org/api/v0/find';
			}
			if (resource === 'parse') {
				const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
				qs['with_details'] = this.getNodeParameter('withDetails', i) as IDataObject;
				qs['cultivars'] = additionalFields.cultivars;
				apiUrl = 'https://parser.globalnames.org/api/v1/';
			}
			else if (resource === 'verify') {
				apiUrl = 'https://verifier.globalnames.org/api/v0/verifications/';
			}

			if (operation === 'get') {
				let name = this.getNodeParameter('name', i) as string;

				name = encodeURIComponent(name);

				const options: IHttpRequestOptions = {
					headers: {
						'Accept': 'application/json',
					},
					method: 'GET',
					url: `${apiUrl}${name}`,
					json: true,
					qs,
				};

				responseData = await this.helpers.request(options);
				if (resource === 'parse') {
					responseData = responseData[0];
				}

				returnData.push(responseData);
			} else if (operation === 'post') {

				const options: IHttpRequestOptions = {
					headers: {
						'Accept': 'application/json',
					},
					method: 'POST',
					url: `${apiUrl}`,
					json: true,
					body: qs,
				};

				responseData = await this.helpers.request(options);
				returnData.push(responseData);
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
