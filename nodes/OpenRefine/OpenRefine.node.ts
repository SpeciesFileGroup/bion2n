import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

export class OpenRefine implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'OpenRefine',
		name: 'openRefine',
		icon: 'file:openRefine.svg',
		group: ['transform'],
		version: 1,
		description: 'OpenRefine is an open-source desktop application for data wrangling',
		defaults: {
			name: 'OpenRefine',
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
						name: 'AsyncProcesses',
						value: 'asyncProcesses',
					},
					{
						name: 'Expression',
						value: 'expression',
					},
					{
						name: 'Export',
						value: 'export',
					},
					{
						name: 'Operations',
						value: 'operations',
					},
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Project Metadata',
						value: 'projectMetadata',
					},
					{
						name: 'Project Models',
						value: 'projectModels',
					},
					{
						name: 'Project Tags',
						value: 'projectTags',
					},

				],
				default: 'operations',
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
							'project',
						],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create an OpenRefine project',
						action: 'Create a project',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an OpenRefine project',
						action: 'Delete a project',
					},
				],
				default: 'create',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'projectMetadata',
						],
					},
				},
				options: [
					{
						name: 'List',
						value: 'list',
						description: 'List resources',
						action: 'List all resources',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an OpenRefine resource',
						action: 'Update a resource',
					},
				],
				default: 'list',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'projectTags',
						],
					},
				},
				options: [
					{
						name: 'Update',
						value: 'update',
						description: 'Update an OpenRefine resource',
						action: 'Update a resource',
					},
				],
				default: 'update',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'operations',
						],
					},
				},
				options: [
					{
						name: 'Apply',
						value: 'apply',
						description: 'Apply an OpenRefine operation',
						action: 'Apply an operation',
					},
				],
				default: 'apply',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'export',
						],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create an OpenRefine resource',
						action: 'Create a resource',
					},
				],
				default: 'create',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'expression',
						],
					},
				},
				options: [
					{
						name: 'Preview',
						value: 'preview',
						description: 'Preview an OpenRefine expression',
						action: 'Preview an expression',
					},
				],
				default: 'preview',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'asyncProcesses',
							'projectModels',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get OpenRefine resource',
						action: 'Get a resource',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Server',
				name: 'server',
				type: 'string',
				required: true,
				default:'http://127.0.0.1:3333',
				description:'The OpenRefine server (keeping the default address will likely be correct unless you changed your OpenRefine server address or port number)',
			},
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'apply',
							'create',
							'delete',
							'get',
							'preview',
							'update',
						],
						resource: [
							'asyncProcesses',
							'export',
							'expression',
							'operations',
							'project',
							'projectModels',
							'projectTags',
						],
					},
				},
				default:'',
				description:'The ID of an OpenRefine project',
			},
			{
				displayName: 'Project Name',
				name: 'projectName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'project',
						],
					},
				},
				default:'',
				description:'The project name.',
			},
			{
				displayName: 'Project JSON',
				name: 'projectJson',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'project',
						],
					},
				},
				default:'',
				description:'This is the data in JSON format needed to create a project. It should be a valid JSON string representing the data you want to load into OpenRefine. Currently only starting a project from JSON is supported because n8n primarily operates on JSON. Open an issue in the BioN2N repository if you need other formats supported.',
			},
			{
				displayName: 'Record Path',
				name: 'recordPath',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'project',
						],
					},
				},
				default: '["_", "_"]',
				description: 'The record path for the project. This is used to specify the structure of the data in the project JSON. The default value is `["_", "_"]`, which is suitable for most JSON structures. You can change this to match your specific data structure.',
			},
			{
				displayName: 'Load at most',
				name: 'loadAtMost',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'project',
						],
					},
				},
				description: 'If set to true, the project will be created with a limit on the number of rows loaded. This is useful for large datasets to avoid performance issues.',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 1000,
				typeOptions: {
					minValue: 0,
				},
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'project',
						],
						loadAtMost: [true],
					},
				},
				description: 'The maximum number of rows to load into the project. This is only applicable when "Load at most" is set to true. The default value is 1000, but you can adjust it based on your needs.',
			},
			{
				displayName: 'Trim Strings',
				name: 'trimStrings',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'project',
						],
					},
				},
				description: 'If set to true, all string values in the project will be trimmed of leading and trailing whitespace. This is useful for cleaning up data before processing it further.',
			},
			{
				displayName: 'Guess Cell Value Types',
				name: 'guessCellValueTypes',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'project',
						],
					},
				},
				description: 'If set to true, OpenRefine will attempt to automatically determine the data types of the cells in the project. This can help with data processing and analysis, but may not be necessary for all projects.',
			},
			{
				displayName: 'Store Empty Strings',
				name: 'storeEmptyStrings',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'project',
						],
					},
				},
				description: 'If set to true, OpenRefine will keep empty string values. This can be useful for preserving the original data structure, but may not be necessary for all projects.',
			},
			{
				displayName: 'Include File Sources',
				name: 'includeFileSources',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'project',
						],
					},
				},
				description: 'If set to true, OpenRefine will include file sources in the project.'
			},
			{
				displayName: 'Include Archive File Name',
				name: 'includeArchiveFileName',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						operation: [
							'create',
						],
						resource: [
							'project',
						],
					},
				},
				description: 'If set to true, OpenRefine will include the name of the archive file in the project. This can be useful for tracking the source of the data, especially when working with multiple files or datasets.',
			},
			{
				displayName: 'Operations JSON',
				name: 'operationsJson',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'apply',
						],
						resource: [
							'operations',
						],
					},
				},
				default: '',
				description: 'The operations JSON to apply to the project. This should be a valid OpenRefine operations JSON string. You can find examples of valid operations JSON in the OpenRefine documentation.',
			},
			{
				displayName: 'Column Index',
				name: 'columnIndex',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						operation: [
							'preview',
						],
						resource: [
							'expression',
						],
					},
				},
				description: 'The index of the column on which to preview the expression. The index is zero-based, so the first cell is index 0.',
			},
			{
				displayName: 'Row Indices',
				name: 'rowIndices',
				type: 'string',
				default: '[0,1]',
				displayOptions: {
					show: {
						operation: [
							'preview',
						],
						resource: [
							'expression',
						],
					},
				},
				description: 'An array of row indices on which to preview the expression. The index is zero-based, so the first row is index 0.',
			},
			{
				displayName: 'Expression',
				name: 'expression',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'preview',
						],
						resource: [
							'expression',
						],
					},
				},
				default: '',
				description: 'The OpenRefine expression to preview. This should be a valid OpenRefine expression string.',
			},
			{
				displayName: 'Repeat',
				name: 'repeat',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						operation: [
							'preview',
						],
						resource: [
							'expression',
						],
					},
				},
				description: 'If set to true, the expression will be repeated. This is useful for testing expressions that may produce different results on subsequent runs.',
			},
			{
				displayName: 'Repeat Count',
				name: 'repeatCount',
				type: 'number',
				default: 1,
				typeOptions: {
					minValue: 1,
				},
				displayOptions: {
					show: {
						operation: [
							'preview',
						],
						resource: [
							'expression',
						],
						repeat: [true],
					},
				},
				description: 'The number of times to repeat the expression. This is only applicable when "Repeat" is set to true. The default value is 1, but you can adjust it based on your needs.',
			},
			{
				displayName: 'Add Tags',
				name: 'newTags',
				type: 'string',
				required: false,
				displayOptions: {
					show: {
						operation: [
							'update',
						],
						resource: [
							'projectTags',
						],
					},
				},
				default: '',
				description: 'The new tags to add to the project. This should be a comma-separated list of tags. For example, "tag1, tag2, tag3".',
			},
			{
				displayName: 'Remove Tags',
				name: 'oldTags',
				type: 'string',
				required: false,
				displayOptions: {
					show: {
						operation: [
							'update',
						],
						resource: [
							'projectTags',
						],
					},
				},
				default: '',
				description: 'The tags to remove from the project. This should be a comma-separated list of tags. For example, "tag1, tag2, tag3".',
			}
		],
	};

	async getCsrfToken(apiUrl: string, helpers: IExecuteFunctions['helpers']): Promise<string> {
		try {
			const options: IHttpRequestOptions = {
			headers: {
				'Accept': 'application/json',
			},
			method: 'GET',
			url: `${apiUrl}/command/core/get-csrf-token`,
			json: true,
		};

		let	responseData = await helpers.request(options);

		return responseData.token as string;
		} catch (err) {
        console.error('Error fetching CSRF Token:', err);
        throw err;
    }
	}


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const apiUrl = this.getNodeParameter('server', 0) as string;
		const csrfToken = await OpenRefine.prototype.getCsrfToken.call(this, apiUrl, this.helpers);

		for (let i = 0; i < items.length; i++) {
			try {

				switch (`${resource}:${operation}`) {
					//const filePath = encodeURIComponent(this.getNodeParameter('filePath', i) as string);

					case 'project:create': {
						const projectJsonRaw = this.getNodeParameter('projectJson', i);
						const projectJson = typeof projectJsonRaw === 'string' ? projectJsonRaw : JSON.stringify(projectJsonRaw);
						const projectName = this.getNodeParameter('projectName', i) as string;
						let recordPath = this.getNodeParameter('recordPath', 0) as string;
						const loadAtMost = this.getNodeParameter('loadAtMost', 0) as boolean;
						const trimStrings = this.getNodeParameter('trimStrings', 0) as boolean;
						const guessCellValueTypes = this.getNodeParameter('guessCellValueTypes', 0) as boolean;
						const storeEmptyStrings = this.getNodeParameter('storeEmptyStrings', 0) as boolean;
						const includeFileSources = this.getNodeParameter('includeFileSources', 0) as boolean;
						const includeArchiveFileName = this.getNodeParameter('includeArchiveFileName', 0) as boolean;

						recordPath = JSON.parse(recordPath);

						let projectOptions;
						if (loadAtMost) {
							const limit = this.getNodeParameter('limit', 0) as number;
							projectOptions = { "recordPath": recordPath, "limit": limit, "trimStrings": trimStrings, "guessCellValueTypes": guessCellValueTypes, "storeEmptyStrings": storeEmptyStrings, "includeFileSources": includeFileSources, "includeArchiveFileName": includeArchiveFileName };
						} else {
							projectOptions = { "recordPath": recordPath, "trimStrings": trimStrings, "guessCellValueTypes": guessCellValueTypes, "storeEmptyStrings": storeEmptyStrings, "includeFileSources": includeFileSources, "includeArchiveFileName": includeArchiveFileName };
						}

						const options: any = {
							headers: {
									'Accept': 'application/json',
							},
							method: 'POST',
							url: `${apiUrl}/command/core/create-project-from-upload?csrf_token=${csrfToken}`,
							json: true,
							formData: {
									format: 'text/json',
									'project-file': {
											value: Buffer.from(projectJson, 'utf-8'),
											options: {
													filename: 'project.json',
													contentType: 'application/json'
											}
									},
									'project-name': projectName,
									'options': JSON.stringify(projectOptions),
							},
							followAllRedirects: false,
							followRedirect: false,
							resolveWithFullResponse: true,
							simple: false,
						};

						const response = await this.helpers.request(options);

						let projectId: string | undefined = undefined;
						if (response.statusCode === 302 && response.headers.location) {
								const match = response.headers.location.match(/project=([0-9]+)/);
								if (match) {
										projectId = match[1];
								}
						}

						returnData.push({
								json: {
										statusCode: response.statusCode,
										location: response.headers.location,
										projectId: projectId,
										message: projectId ? 'Project created' : 'Project created, but ID not found in redirect',
								}
						});
						break;
					}
					case 'projectMetadata:list': {
						const options: IHttpRequestOptions = {
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/x-www-form-urlencoded',
							},
							method: 'GET',
							url: `${apiUrl}/command/core/get-all-project-metadata`,
							body: `csrf_token=${csrfToken}`,
							json: true,
						};

						responseData = await this.helpers.request(options);
						const projectsObj = responseData['projects'];
						const projectsArr = Object.entries(projectsObj).map(([id, data]) => ({ id, data }));
						returnData.push(...projectsArr);
						break;
					}
					case 'project:delete': {
						const projectId = this.getNodeParameter('projectId', i) as string;
						const options: IHttpRequestOptions = {
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/x-www-form-urlencoded',
							},
							method: 'POST',
							url: `${apiUrl}/command/core/delete-project`,
							body: `project=${projectId}&csrf_token=${csrfToken}`,
							json: true,
						};

						responseData = await this.helpers.request(options);
						returnData.push(responseData);
						break;
					}
					case 'asyncProcesses:get': {
						const projectId = this.getNodeParameter('projectId', i) as string;
						const options: IHttpRequestOptions = {
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/x-www-form-urlencoded',
							},
							method: 'GET',
							url: `${apiUrl}/command/core/get-processes?project=${projectId}&csrf_token=${csrfToken}`,
							json: true,
						};

						responseData = await this.helpers.request(options);
						returnData.push(responseData);
						break;
					}

					case 'expression:preview': {
						const expression = this.getNodeParameter('expression', i) as string;
						const projectId = this.getNodeParameter('projectId', i) as string;
						const columnIndex = this.getNodeParameter('columnIndex', i) as number;
						const rowIndices = this.getNodeParameter('rowIndices', i) as string;
						const repeat = this.getNodeParameter('repeat', i) as boolean;
						const repeatCount = this.getNodeParameter('repeatCount', i) as number;
						const options: IHttpRequestOptions = {
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/x-www-form-urlencoded',
							},
							method: 'POST',
							url: `${apiUrl}/command/core/preview-expression`,
							body: `project=${projectId}&expression=${encodeURIComponent(expression)}&csrf_token=${csrfToken}&cellIndex=${columnIndex}&rowIndices=${encodeURIComponent(rowIndices)}&repeat=${repeat}&repeatCount=${repeatCount}`,
							json: true,
						};

						responseData = await this.helpers.request(options);
						returnData.push(responseData);
						break;
					}
					case 'operations:apply': {
						const projectId = this.getNodeParameter('projectId', i) as string;
						const operationsJson = this.getNodeParameter('operationsJson', i) as string;
						const options: IHttpRequestOptions = {
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/x-www-form-urlencoded',
							},
							method: 'POST',
							url: `${apiUrl}/command/core/apply-operations`,
							body: `project=${projectId}&operations=${encodeURIComponent(operationsJson)}&csrf_token=${csrfToken}`,
							json: true,
						};

						responseData = await this.helpers.request(options);
						returnData.push(responseData);
						break;
				} case 'export:create': {
						const projectId = this.getNodeParameter('projectId', i) as string;

						//const prefix = '{"rows" : ['
						const prefix = '[';
						const separator = ', ';
						const suffix = ']';
						//const suffix = ']}';

						// get the column names from the project metadata
						const modelsOptions: IHttpRequestOptions = {
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/x-www-form-urlencoded',
							},
							method: 'GET',
							url: `${apiUrl}/command/core/get-models?project=${projectId}&csrf_token=${csrfToken}`,
							json: true,
						};
						const modelsResponse = await this.helpers.request(modelsOptions);
						let columns = modelsResponse['columnModel']['columns'];

						let template = '{'
						for (const column of columns) {
							const columnName = column.name;
							template += `"${columnName}" : {{jsonize(cells["${columnName}"].value)}},`;
						}

						// remove the last comma
						template = template.slice(0, -1);
						template = `${template}}`

						const body = [
								`project=${encodeURIComponent(projectId)}`,
								`csrf_token=${encodeURIComponent(csrfToken)}`,
								`format=template`,
								`prefix=${encodeURIComponent(prefix)}`,
								`suffix=${encodeURIComponent(suffix)}`,
								`separator=${encodeURIComponent(separator)}`,
								`template=${encodeURIComponent(template)}`
						].join('&');

						const options: any = {
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/x-www-form-urlencoded',
							},
							method: 'POST',
							url: `${apiUrl}/command/core/export-rows/test.txt`,
							body,
							json: true,
						};

						const responseData = await this.helpers.request(options);
						for (const row of responseData) {
								returnData.push({ json: row });
						}
						break;
				} case 'projectModels:get': {
					const projectId = this.getNodeParameter('projectId', i) as string;
					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/x-www-form-urlencoded',
						},
						method: 'GET',
						url: `${apiUrl}/command/core/get-models?project=${projectId}&csrf_token=${csrfToken}`,
						json: true,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
					break;
				} case 'projectTags:update': {
					const projectId = this.getNodeParameter('projectId', i) as string;
					const oldTags = this.getNodeParameter('oldTags', i) as string;
					const newTags = this.getNodeParameter('newTags', i) as string;
					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/x-www-form-urlencoded',
						},
						method: 'POST',
						url: `${apiUrl}/command/core/set-project-tags`,
						body: `project=${projectId}&old=${encodeURIComponent(oldTags)}&new=${encodeURIComponent(newTags)}&csrf_token=${csrfToken}`,
						json: true,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
					break;
				}
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
