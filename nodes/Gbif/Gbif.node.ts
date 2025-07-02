import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

function setUrlParameters(parameter: string, values: string, urlParams= ''): string {
	values.split(',').forEach((value: string) => {
		urlParams += `&${parameter}=${value}`;
	});
	return urlParams;
}

export class Gbif implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GBIF',
		name: 'gbif',
		icon: 'file:gbif.svg',
		group: ['transform'],
		version: 1,
		description: 'GBIF provides free and open access to biodiversity data',
		defaults: {
			name: 'GBIF',
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
						name: 'Collection',
						value: 'collection',
					},
					{
						name: 'Dataset',
						value: 'dataset',
					},
					{
						name: 'Dataset Search',
						value: 'datasetSearch',
					},
					{
						name: 'Installation',
						value: 'installation',
					},
					{
						name: 'Institution',
						value: 'institution',
					},
					{
						name: 'Occurrence',
						value: 'occurrence',
					},
					{
						name: 'Occurrence Count',
						value: 'occurrenceCounts',
					},
					{
						name: 'Occurrence Search',
						value: 'occurrenceSearch',
					},
					{
						name: 'Occurrence Search Catalog Number',
						value: 'occurrenceSearchCatalogNumber',
					},
					{
						name: 'Occurrence Search Collection Code',
						value: 'occurrenceSearchCollectionCode',
					},
					{
						name: 'Occurrence Search Occurrence ID',
						value: 'occurrenceSearchOccurrenceId',
					},
					{
						name: 'Occurrence Search Recorded By',
						value: 'occurrenceSearchRecordedBy',
					},
					{
						name: 'Occurrence Search Record Number',
						value: 'occurrenceSearchRecordNumber',
					},
					{
						name: 'Occurrence Search Institution Code',
						value: 'occurrenceSearchInstitutionCode',
					},
					{
						name: 'Organization',
						value: 'organization',
					},
					{
						name: 'Name Parser',
						value: 'nameParser',
					},
					{
						name: 'Network',
						value: 'network',
					},
					{
						name: 'Node',
						value: 'node',
					},
					{
						name: 'Species',
						value: 'species',
					},
					{
						name: 'Species Match',
						value: 'speciesMatch',
					},
					{
						name: 'Species Search',
						value: 'speciesSearch',
					},
					{
						name: 'Species Suggest',
						value: 'speciesSuggest',
					},
				],
				default: 'collection',
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
							'collection',
							'dataset',
							'datasetSearch',
							'installation',
							'institution',
							'occurrence',
							'occurrenceCounts',
							'occurrenceSearch',
							'occurrenceSearchCatalogNumber',
							'occurrenceSearchCollectionCode',
							'occurrenceSearchOccurrenceId',
							'occurrenceSearchRecordedBy',
							'occurrenceSearchRecordNumber',
							'occurrenceSearchInstitutionCode',
							'organization',
							'nameParser',
							'network',
							'node',
							'species',
							'speciesMatch',
							'speciesSearch',
							'speciesSuggest',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a resource',
						action: 'Get a collection',
					},
				],
				default: 'get',
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				default: '',
				description: 'The taxon ID',
				displayOptions: {
					show: {
						resource: [
							'species',
						],
						operation: [
							'get',
						],
					},
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				default: '',
				description: 'The collection ID',
				displayOptions: {
					show: {
						resource: [
							'collection',
						],
						operation: [
							'get',
						],
					},
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				default: '',
				description: 'The dataset ID',
				displayOptions: {
					show: {
						resource: [
							'dataset',
						],
						operation: [
							'get',
						],
					},
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				default: '',
				description: 'The installation ID',
				displayOptions: {
					show: {
						resource: [
							'installation',
						],
						operation: [
							'get',
						],
					},
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				default: '',
				description: 'The institution ID',
				displayOptions: {
					show: {
						resource: [
							'institution',
						],
						operation: [
							'get',
						],
					},
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				default: '',
				description: 'The network ID',
				displayOptions: {
					show: {
						resource: [
							'network',
						],
						operation: [
							'get',
						],
					},
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				required: true,
				default: '',
				description: 'Unless using the optional datasetKey parameter, use the occurrence key as the ID (e.g., 1039520441). Otherwise with the datasetKey parameter, use the occurrenceID as the ID (e.g., urn:uuid:59ceb2e9-00b5-4fb8-a79b-71d644ae106c, urn:catalog:UAZ:Ornithology:UAz-004647, SANT:SANT-Algae:27907-A, etc.).',
				displayOptions: {
					show: {
						resource: [
							'occurrence',
						],
						operation: [
							'get',
						],
					},
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				default: '',
				description: 'The organization ID',
				displayOptions: {
					show: {
						resource: [
							'organization',
						],
						operation: [
							'get',
						],
					},
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				default: '',
				description: 'The node ID',
				displayOptions: {
					show: {
						resource: [
							'node',
						],
						operation: [
							'get',
						],
					},
				},
			},
			{
				displayName: 'Scientific Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The scientific name to parse',
				displayOptions: {
					show: {
						resource: [
							'nameParser',
						],
						operation: [
							'get',
						],
					},
				},
			},
			{
				displayName: 'Sub-Resource',
				name: 'subResource',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'collection',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						name: '',
						value: '',
					},
					{
						name: 'Comment',
						value: 'comment',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Contact Person',
						value: 'contactPerson',
					},
					{
						name: 'Identifier',
						value: 'identifier',
					},
					{
						name: 'Machine Tag',
						value: 'machineTag',
					},
					{
						name: 'Master Source Metadata',
						value: 'masterSourceMetadata',
					},
					{
						name: 'Occurrence Mapping',
						value: 'occurrenceMapping',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
				],
			},
			{
				displayName: 'Sub-Resource',
				name: 'subResource',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'dataset',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						name: '',
						value: '',
					},
					{
						name: 'Comment',
						value: 'comment',
					},
					{
						name: 'Constituents',
						value: 'constituents',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'Endpoint',
						value: 'endpoint',
					},
					{
						name: 'Identifier',
						value: 'identifier',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
					{
						name: 'Machine Tag',
						value: 'machineTag',
					},
					{
						name: 'Metadata',
						value: 'metadata',
					},
					{
						name: 'Networks',
						value: 'networks',
					},
				],
			},
			{
				displayName: 'Sub-Resource',
				name: 'subResource',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'installation',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						name: '',
						value: '',
					},
					{
						name: 'Comment',
						value: 'comment',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Dataset',
						value: 'dataset',
					},
					{
						name: 'Endpoint',
						value: 'endpoint',
					},
					{
						name: 'Identifier',
						value: 'identifier',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
					{
						name: 'Machine Tag',
						value: 'machineTag',
					},
				],
			},
			{
				displayName: 'Sub-Resource',
				name: 'subResource',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'institution',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						name: '',
						value: '',
					},
					{
						name: 'Comment',
						value: 'comment',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Contact Person',
						value: 'contactPerson',
					},
					{
						name: 'Identifier',
						value: 'identifier',
					},
					{
						name: 'Machine Tag',
						value: 'machineTag',
					},
					{
						name: 'Master Source Metadata',
						value: 'masterSourceMetadata',
					},
					{
						name: 'Occurrence Mapping',
						value: 'occurrenceMapping',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
				],
			},
			{
				displayName: 'Sub-Resource',
				name: 'subResource',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'occurrence',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						name: '',
						value: '',
					},
					{
						name: 'Fragment',
						value: 'fragment',
					},
					{
						name: 'Verbatim',
						value: 'verbatim',
					},
				],
			},
			{
				displayName: 'Sub-Resource',
				name: 'subResource',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'occurrenceCounts',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						name: '',
						value: '',
					},
					{
						name: 'Basis Of Record',
						value: 'basisOfRecord',
					},
					{
						name: 'Countries',
						value: 'countries',
					},
					{
						name: 'Datasets',
						value: 'datasets',
					},
					{
						name: 'Publishing Countries',
						value: 'publishingCountries',
					},
					{
						name: 'Year',
						value: 'year',
					},
				],
			},
			{
				displayName: 'Sub-Resource',
				name: 'subResource',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'network',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						name: '',
						value: '',
					},
					{
						name: 'Comment',
						value: 'comment',
					},
					{
						name: 'Constituents',
						value: 'constituents',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Endpoint',
						value: 'endpoint',
					},
					{
						name: 'Identifier',
						value: 'identifier',
					},
					{
						name: 'Machine Tag',
						value: 'machineTag',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
				],
			},
			{
				displayName: 'Sub-Resource',
				name: 'subResource',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'organization',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						name: '',
						value: '',
					},
					{
						name: 'Comment',
						value: 'comment',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Endpoint',
						value: 'endpoint',
					},
					{
						name: 'Hosted Dataset',
						value: 'hostedDataset',
					},
					{
						name: 'Identifier',
						value: 'identifier',
					},
					{
						name: 'Installation',
						value: 'installation',
					},
					{
						name: 'Machine Tag',
						value: 'machineTag',
					},
					{
						name: 'Published Dataset',
						value: 'publishedDataset',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
				],
			},
			{
				displayName: 'Sub-Resource',
				name: 'subResource',
				type: 'options',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'node',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						name: '',
						value: '',
					},
					{
						name: 'Comment',
						value: 'comment',
					},
					{
						name: 'Dataset',
						value: 'dataset',
					},
					{
						name: 'Endpoint',
						value: 'endpoint',
					},
					{
						name: 'Identifier',
						value: 'identifier',
					},
					{
						name: 'Installation',
						value: 'installation',
					},
					{
						name: 'Machine Tag',
						value: 'machineTag',
					},
					{
						name: 'Organization',
						value: 'organization',
					},
					{
						name: 'Pending Endorsement',
						value: 'pendingEndorsement',
					},
					{
						name: 'Tag',
						value: 'tag',
					},

				],
			},
			{
				displayName: 'Sub-Resource',
				name: 'subResource',
				type: 'options',
				options: [
					{
						name: '',
						value: '',
					},
					{
						name: 'Children',
						value: 'children',
					},
					{
						name: 'Combinations',
						value: 'combinations',
					},
					{
						name: 'Descriptions',
						value: 'descriptions',
					},
					{
						name: 'Distributions',
						value: 'distributions',
					},
					{
						name: 'Media',
						value: 'media',
					},
					{
						name: 'Name',
						value: 'name',
					},
					{
						name: 'Parents',
						value: 'parents',
					},
					{
						name: 'References',
						value: 'references',
					},
					{
						name: 'Species Profiles',
						value: 'speciesProfiles',
					},
					{
						name: 'Synonyms',
						value: 'synonyms',
					},
					{
						name: 'Type Specimens',
						value: 'typeSpecimens',
					},
					{
						name: 'Verbatim',
						value: 'verbatim',
					},
					{
						name: 'Vernacular Names',
						value: 'vernacularNames',
					},
				],
				default: '',
				displayOptions: {
					show: {
						resource: [
							'species',
						],
						operation: [
							'get',
						],
					},
				},
			},
			{
				displayName: 'Query',
				name: 'q',
				type: 'string',
				default: '',
				description: 'Simple full text search parameter as a simple word or a phrase',
				displayOptions: {
					show: {
						resource: [
							'datasetSearch',
							'occurrenceSearch',
							'occurrenceSearchCatalogNumber',
							'occurrenceSearchCollectionCode',
							'occurrenceSearchOccurrenceId',
							'occurrenceSearchRecordedBy',
							'occurrenceSearchRecordNumber',
							'occurrenceSearchInstitutionCode',
							'speciesSearch',
							'speciesSuggest',
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
							'dataset',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						description: 'Filters by country given as a ISO 639-1 (2 letter) country code',
					},
					{
						displayName: 'Identifier',
						name: 'identifier',
						type: 'string',
						default: '',
						description: 'The value for this parameter can be a simple string or integer (e.g., identifier=120)',
					},
					{
						displayName: 'Identifier Type',
						name: 'identifierType',
						type: 'options',
						default: 'cites',
						options: [
							{
								name: 'CITES',
								value: 'cites',
							},
							{
								name: 'DOI',
								value: 'doi',
							},
							{
								name: 'FTP',
								value: 'ftp',
							},
							{
								name: 'GBIF Node',
								value: 'gbif_node',
							},
							{
								name: 'GBIF Participant',
								value: 'gbif_participant',
							},
							{
								name: 'GBIF Portal',
								value: 'gbif_portal',
							},
							{
								name: 'GRSciColl ID',
								value: 'grscicoll_id',
							},
							{
								name: 'GRSciColl URI',
								value: 'grscicoll_uri',
							},
							{
								name: 'GRID',
								value: 'grid',
							},
							{
								name: 'Handler',
								value: 'handler',
							},
							{
								name: 'IH IRN',
								value: 'ih_irn',
							},
							{
								name: 'LSID',
								value: 'lsid',
							},
							{
								name: 'ROR',
								value: 'ror',
							},
							{
								name: 'Unknown',
								value: 'unknown',
							},
							{
								name: 'URI',
								value: 'uri',
							},
							{
								name: 'URL',
								value: 'url',
							},
							{
								name: 'UUID',
								value: 'uuid',
							},
						],
					},
					{
						displayName: 'Machine Tag Name',
						name: 'machineTagName',
						type: 'string',
						default: '',
						description: 'Filters for entities with a machine tag with the specified name (use in combination with the machineTagNamespace parameter)',
					},
					{
						displayName: 'Machine Tag Namespace',
						name: 'machineTagNamespace',
						type: 'string',
						default: '',
						description: 'Filters for entities with a machine tag in the specified namespace',
					},
					{
						displayName: 'Machine Tag Value',
						name: 'machineTagValue',
						type: 'string',
						default: '',
						description: 'Filters for entities with a machine tag with the specified value (use in combination with the machineTagNamespace and machineTagName parameters)',
					},
					{
						displayName: 'Query',
						name: 'q',
						type: 'string',
						default: '',
						description: 'Simple search parameter. The value for this parameter can be a simple word or a phrase. Wildcards can be added to the simple word parameters only, e.g. q=*puma*.',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						default: 'checklist',
						description: 'Filters by type of dataset',
						options: [
							{
								name: 'Checklist',
								value: 'checklist',
							},
							{
								name: 'Metadata',
								value: 'metadata',
							},
							{
								name: 'Occurrence',
								value: 'occurrence',
							},
							{
								name: 'Sampling Event',
								value: 'sampling_event',
							},
						],
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
							'datasetSearch',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Continent',
						name: 'continent',
						type: 'options',
						default: 'africa',
						description: 'Filter datasets by their continent',
						options: [
							{
								name: 'Africa',
								value: 'africa',
							},
							{
								name: 'Antarctica',
								value: 'antarctica',
							},
							{
								name: 'Asia',
								value: 'asia',
							},
							{
								name: 'Europe',
								value: 'europe',
							},
							{
								name: 'North America',
								value: 'north_america',
							},
							{
								name: 'Oceania',
								value: 'oceania',
							},
							{
								name: 'South America',
								value: 'south_america',
							},
						],
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						description: 'Filters by country given as a ISO 639-1 (2 letter) country code',
					},
					{
						displayName: 'Decade',
						name: 'decade',
						type: 'string',
						default: '',
						description: 'Filters datasets by their temporal coverage broken down to decades. Decades are given as a full year, e.g. 1880, 1960, 2000, etc, and will return datasets wholly contained in the decade as well as those that cover the entire decade or more.',
					},
					{
						displayName: 'Endorsing Node Key',
						name: 'endorsingNodeKey',
						type: 'string',
						default: '',
						description: 'Node key that endorsed this dataset\'s publisher',
					},
					{
						displayName: 'Facet',
						name: 'facet',
						type: 'multiOptions',
						default: [],
						options: [
							{
								name: 'Country',
								value: 'country',
							},
							{
								name: 'Decade',
								value: 'decade',
							},
							{
								name: 'Hosting Organization',
								value: 'hostingOrg',
							},
							{
								name: 'Keyword',
								value: 'keyword',
							},
							{
								name: 'Publishing Country',
								value: 'publishingCountry',
							},
							{
								name: 'Publishing Organization',
								value: 'publishingOrg',
							},
							{
								name: 'Sub-Type',
								value: 'subtype',
							},
							{
								name: 'Type',
								value: 'type',
							},
						],
					},
					{
						displayName: 'Hosting Country',
						name: 'hostingCountry',
						type: 'string',
						default: '',
						description: 'Filters datasets by their hosting organization\'s country given as a ISO 639-1 (2 letter) country code',
					},
					{
						displayName: 'Hosting Organization',
						name: 'hostingOrg',
						type: 'string',
						default: '',
						description: 'Filters datasets by their hosting organization UUID key',
					},
					{
						displayName: 'Facet Minimum Count',
						name: 'facetMincount',
						type: 'number',
						default: '',
						description: 'Used in combination with the facet parameter (e.g., set facetMincount=1000 to exclude facets with a count less than 1000)',
					},
					{
						displayName: 'Identifier',
						name: 'identifier',
						type: 'string',
						default: '',
						description: 'The value for this parameter can be a simple string or integer (e.g., identifier=120)',
					},
					{
						displayName: 'Identifier Type',
						name: 'identifierType',
						type: 'options',
						default: 'cites',
						options: [
							{
								name: 'CITES',
								value: 'cites',
							},
							{
								name: 'DOI',
								value: 'doi',
							},
							{
								name: 'FTP',
								value: 'ftp',
							},
							{
								name: 'GBIF Node',
								value: 'gbif_node',
							},
							{
								name: 'GBIF Participant',
								value: 'gbif_participant',
							},
							{
								name: 'GBIF Portal',
								value: 'gbif_portal',
							},
							{
								name: 'GRSciColl ID',
								value: 'grscicoll_id',
							},
							{
								name: 'GRSciColl URI',
								value: 'grscicoll_uri',
							},
							{
								name: 'GRID',
								value: 'grid',
							},
							{
								name: 'Handler',
								value: 'handler',
							},
							{
								name: 'IH IRN',
								value: 'ih_irn',
							},
							{
								name: 'LSID',
								value: 'lsid',
							},
							{
								name: 'ROR',
								value: 'ror',
							},
							{
								name: 'Unknown',
								value: 'unknown',
							},
							{
								name: 'URI',
								value: 'uri',
							},
							{
								name: 'URL',
								value: 'url',
							},
							{
								name: 'UUID',
								value: 'uuid',
							},
						],
					},
					{
						displayName: 'Keyword',
						name: 'keyword',
						type: 'string',
						default: '',
						description: 'Filters datasets by a case insensitive plain text keyword. The search is done on the merged collection of tags, the dataset keywordCollections and temporalCoverages.',
					},
					{
						displayName: 'License',
						name: 'license',
						type: 'options',
						default: '',
						options: [
							{
								name: '',
								value: '',
							},
							{
								name: 'CC0 1.0',
								value: 'cc0_1_0',
							},
							{
								name: 'CC BY 4.0',
								value: 'cc_by_4_0',
							},
							{
								name: 'CC BY NC 4.0',
								value: 'cc_by_nc_4_0',
							},
							{
								name: 'Unspecified',
								value: 'unspecified',
							},
							{
								name: 'Unsupported',
								value: 'unsupported',
							},
						],
					},
					{
						displayName: 'Machine Tag Name',
						name: 'machineTagName',
						type: 'string',
						default: '',
						description: 'Filters for entities with a machine tag with the specified name (use in combination with the machineTagNamespace parameter)',
					},
					{
						displayName: 'Machine Tag Namespace',
						name: 'machineTagNamespace',
						type: 'string',
						default: '',
						description: 'Filters for entities with a machine tag in the specified namespace',
					},
					{
						displayName: 'Machine Tag Value',
						name: 'machineTagValue',
						type: 'string',
						default: '',
						description: 'Filters for entities with a machine tag with the specified value (use in combination with the machineTagNamespace and machineTagName parameters)',
					},
					{
						displayName: 'Network Key',
						name: 'networkKey',
						type: 'string',
						default: '',
						description: 'Network associated to a dataset',
					},
					{
						displayName: 'Project ID',
						name: 'projectId',
						type: 'string',
						default: '',
						description: 'Filter or facet based on the project ID of a given dataset. A dataset can have a project ID if it is the result of a project. Multiple datasets can have the same project ID.',
					},
					{
						displayName: 'Publishing Country',
						name: 'publishingCountry',
						type: 'string',
						description: 'Filters datasets by their owning organization\'s country given as a ISO 639-1 (2 letter) country code',
						default: '',
					},
					{
						displayName: 'Publishing Organization',
						name: 'publishingOrg',
						type: 'string',
						description: 'Filters datasets by their publishing organization UUID key',
						default: '',
					},
					{
						displayName: 'Sub-Type',
						name: 'subtype',
						type: 'options',
						default: 'derived_from_occurrence',
						options: [
							{
								name: 'Derived From Occurrence',
								value: 'derived_from_occurrence',
							},
							{
								name: 'Global Species Dataset',
								value: 'global_species_dataset',
							},
							{
								name: 'Inventory Regional',
								value: 'inventory_regional',
							},
							{
								name: 'Inventory Thematic',
								value: 'inventory_thematic',
							},
							{
								name: 'Observation',
								value: 'observation',
							},
							{
								name: 'Nomenclator Authority',
								value: 'nomenclator_authority',
							},
							{
								name: 'Specimen',
								value: 'specimen',
							},
							{
								name: 'Taxonomic Authority',
								value: 'taxonomic_authority',
							},
						],
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						default: 'checklist',
						description: 'Filters by type of dataset',
						options: [
							{
								name: 'Checklist',
								value: 'checklist',
							},
							{
								name: 'Metadata',
								value: 'metadata',
							},
							{
								name: 'Occurrence',
								value: 'occurrence',
							},
							{
								name: 'Sampling Event',
								value: 'sampling_event',
							},
						],
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
							'occurrence',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Dataset Key',
						name: 'datasetKey',
						type: 'string',
						default: '',
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
							'occurrenceSearch',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Basis of Record',
						name: 'basisOfRecord',
						type: 'options',
						default: 'fossil_specimen',
						options: [
							{
								name: 'Fossil Specimen',
								value: 'fossil_specimen',
							},
							{
								name: 'Human Observation',
								value: 'human_observation',
							},
							{
								name: 'Literature',
								value: 'literature',
							},
							{
								name: 'Living Specimen',
								value: 'living_specimen',
							},
							{
								name: 'Machine Observation',
								value: 'machine_observation',
							},
							{
								name: 'Material Citation',
								value: 'material_citation',
							},
							{
								name: 'Material Sample',
								value: 'material_sample',
							},
							{
								name: 'Observation',
								value: 'observation',
							},
							{
								name: 'Occurrence',
								value: 'occurrence',
							},
							{
								name: 'Preserved Specimen',
								value: 'preserved_specimen',
							},
						],
					},
					{
						displayName: 'Catalog Number',
						name: 'catalogNumber',
						type: 'string',
						default: '',
						description: 'An identifier of any form assigned by the source within a physical collection or digital dataset for the record which may not be unique, but should be fairly unique in combination with the institution and collection code',
					},
					{
						displayName: 'Class Key',
						name: 'classKey',
						type: 'string',
						default: '',
						description: 'The class classification key',
					},
					{
						displayName: 'Collection Code',
						name: 'collectionCode',
						type: 'string',
						default: '',
						description: 'An identifier of any form assigned by the source to identify the physical collection or digital dataset uniquely within the context of an institution',
					},
					{
						displayName: 'Continent',
						name: 'continent',
						type: 'options',
						default: 'africa',
						description: 'Filter datasets by their continent',
						options: [
							{
								name: 'Africa',
								value: 'africa',
							},
							{
								name: 'Antarctica',
								value: 'antarctica',
							},
							{
								name: 'Asia',
								value: 'asia',
							},
							{
								name: 'Europe',
								value: 'europe',
							},
							{
								name: 'North America',
								value: 'north_america',
							},
							{
								name: 'Oceania',
								value: 'oceania',
							},
							{
								name: 'South America',
								value: 'south_america',
							},
						],
					},
					{
						displayName: 'Coordinate Uncertainty In Meters',
						name: 'coordinateUncertaintyInMeters',
						type: 'string',
						default: '',
						description: 'The horizontal distance (in meters) from the given decimalLatitude and decimalLongitude describing the smallest circle containing the whole of the Location (e.g., use "100,200" for an uncertainty of 100 - 200 meters)',
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						description: 'The 2-letter country code (as per ISO-3166-1) of the country in which the occurrence was recorded',
					},
					{
						displayName: 'Crawl ID',
						name: 'crawlId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Dataset ID',
						name: 'datasetId',
						type: 'string',
						default: '',
						description: 'The ID of the dataset',
					},
					{
						displayName: 'Dataset Key',
						name: 'datasetKey',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Dataset Name',
						name: 'datasetName',
						type: 'string',
						default: '',
						description: 'The name of the dataset',
					},
					{
						displayName: 'Decimal Latitude',
						name: 'decimalLatitude',
						type: 'string',
						default: '',
						description: 'Latitude in decimals between -90 and 90 based on spatial reference system WGS84 (e.g., -81.14,-80.79)',
					},
					{
						displayName: 'Decimal Longitude',
						name: 'decimalLongitude',
						type: 'string',
						default: '',
						description: 'Longitude in decimals between -180 and 180 based on spatial reference system WGS84 (e.g., -160.38,-154.23)',
					},
					{
						displayName: 'Depth',
						name: 'depth',
						type: 'string',
						default: '',
						description: 'Depth in meters relative to altitude (e.g., use 10,30 for 10 to 30 meters below a lake surface with given altitude)',
					},
					{
						displayName: 'Elevation',
						name: 'elevation',
						type: 'string',
						default: '',
						description: 'Elevation (altitude) in meters above sea level (e.g., 10000,14000 for an altitude of 10000 to 14000 meters)',
					},
					{
						displayName: 'Establishment Means',
						name: 'establishmentMeans',
						type: 'options',
						default: 'introduced',
						description: 'Whether the taxon is native, introduced, invasive, etc',
						options: [
							{
								name: 'Introduced',
								value: 'introduced',
							},
							{
								name: 'Invasive',
								value: 'invasive',
							},
							{
								name: 'Managed',
								value: 'managed',
							},
							{
								name: 'Native',
								value: 'native',
							},
							{
								name: 'Naturalised',
								value: 'naturalised',
							},
							{
								name: 'Uncertain',
								value: 'uncertain',
							},
						],
					},
					{
						displayName: 'Event Date',
						name: 'eventDate',
						type: 'string',
						default: '',
						description: 'Occurrence date in ISO 8601 format: yyyy, yyyy-MM, yyyy-MM-dd, or MM-dd (e.g., use 2021-01-01 for an exact date or use 2021-01-01,2021-01-31 for a date range)',
					},
					{
						displayName: 'Event ID',
						name: 'eventId',
						type: 'string',
						default: '',
						description: 'An identifier for the information associated with a sampling event',
					},
					{
						displayName: 'Family Key',
						name: 'familyKey',
						type: 'string',
						default: '',
						description: 'The family classification key',
					},
					{
						displayName: 'Format',
						name: 'format',
						type: 'options',
						default: '',
						description: 'The export format',
						options: [
							{
								name: '',
								value: '',
							},
							{
								name: 'Comma Separated Value',
								value: 'CSV',
							},
							{
								name: 'Tab Separated Value',
								value: 'TSV',
							},
						],
					},
					{
						displayName: 'From Date',
						name: 'fromDate',
						type: 'string',
						default: '',
						description: 'Start partial date of a date range in the format of yyyy-MM (e.g., 2015-11)',
					},
					{
						displayName: 'GADM Geographic Identifier',
						name: 'gadmGid',
						type: 'string',
						default: '',
						description: 'A GADM geographic identifier at any level (e.g., AGO, AGO.1_1, AGO.1.1_1 or AGO.1.1.1_1)',
					},
					{
						displayName: 'GADM Region Level',
						name: 'gadmLevel',
						type: 'options',
						default: '0',
						description: 'A GADM region level, valid values range from 0 to 3',
						options: [
							{
								name: '0',
								value: '0',
							},
							{
								name: '1',
								value: '1',
							},
							{
								name: '2',
								value: '2',
							},
							{
								name: '3',
								value: '3',
							},
						],
					},
					{
						displayName: 'GADM Level 0 Geographic Identifier',
						name: 'gadmLevel0Gid',
						type: 'string',
						default: '',
						description: 'A GADM geographic identifier at the zero level (e.g., AGO)',
					},
					{
						displayName: 'GADM Level 1 Geographic Identifier',
						name: 'gadmLevel1Gid',
						type: 'string',
						default: '',
						description: 'A GADM geographic identifier at the one level (e.g., AGO.1_1)',
					},
					{
						displayName: 'GADM Level 2 Geographic Identifier',
						name: 'gadmLevel2Gid',
						type: 'string',
						default: '',
						description: 'A GADM geographic identifier at the two level (e.g., AFG.1.1_1)',
					},
					{
						displayName: 'GADM Level 3 Geographic Identifier',
						name: 'gadmLevel3Gid',
						type: 'string',
						default: '',
						description: 'A GADM geographic identifier at the three level (e.g., AFG.1.1.1_1)',
					},
					{
						displayName: 'Genus Key',
						name: 'genusKey',
						type: 'string',
						default: '',
						description: 'The genus classification key',
					},
					{
						displayName: 'Geographic Distance',
						name: 'geoDistance',
						type: 'string',
						default: '',
						description: 'Filters to match occurrence records with coordinate values within a specified distance of a coordinate, it supports units: in, yd, ft, km, mmi, mm, cm, mi, or m (e.g., 90m,100m)',
					},
					{
						displayName: 'Geometry',
						name: 'geometry',
						type: 'string',
						default: '',
						description: 'Searches for occurrences inside a polygon described in Well Known Text (WKT) format. Only POINT, LINESTRING, LINEARRING, POLYGON and MULTIPOLYGON are accepted WKT types (e.g., POLYGON((30.1 10.1, 40 40, 20 40, 10 20, 30.1 10.1))). Polygons must have anticlockwise ordering of points, or will give unpredictable results. A clockwise polygon represents the opposite area: the Earth\'s surface with a \'hole\' in it and such queries are not supported.',
					},
					{
						displayName: 'Has Coordinate',
						name: 'hasCoordinate',
						type: 'boolean',
						default: false,
						description: 'Limits searches to occurrence records which contain a value in both latitude and longitude (e.g., hasCoordinate=true limits to occurrence records with coordinate values and hasCoordinate=false limits to occurrence records without coordinate values)',
					},
					{
						displayName: 'Has Geospatial Issue',
						name: 'hasGeospatialIssue',
						type: 'boolean',
						default: false,
						description: 'Includes/excludes occurrence records which contain spatial issues as determined by GBIF\'s record interpretation (e.g., hasGeospatialIssue=true returns only those records with spatial issues while hasGeospatialIssue=false includes only records without spatial issues. The absence of this parameter returns any record with or without spatial issues.).',
					},
					{
						displayName: 'Identified By',
						name: 'identifiedBy',
						type: 'string',
						default: '',
						description: 'The person who provided the taxonomic identification of the occurrence',
					},
					{
						displayName: 'Identified By ID',
						name: 'identifiedById',
						type: 'string',
						default: '',
						description: 'Identifier (e.g., ORCID) for the person who provided the taxonomic identification of the occurrence',
					},
					{
						displayName: 'Institution Code',
						name: 'institutionCode',
						type: 'string',
						default: '',
						description: 'An identifier of any form assigned by the source to identify the institution. Institution codes are not guaranteeed to be unique.',
					},
					{
						displayName: 'Issue',
						name: 'issue',
						type: 'options',
						default: '',
						description: 'A specific interpretation issue',
						options: [
							{
								name: '',
								value: '',
							},
							{
								name: 'Ambiguous Collection',
								value: 'ambiguous_collection',
							},
							{
								name: 'Ambiguous Institution',
								value: 'ambiguous_institution',
							},
							{
								name: 'Basis of Record Invalid',
								value: 'basis_of_record_invalid',
							},
							{
								name: 'Collection Match Fuzzy',
								value: 'collection_match_fuzzy',
							},
							{
								name: 'Collection Match None',
								value: 'collection_match_none',
							},
							{
								name: 'Continent Country Mismatch',
								value: 'continent_country_mismatch',
							},
							{
								name: 'Continent Derived From Coordinates',
								value: 'continent_derived_from_coordinates',
							},
							{
								name: 'Continent Invalid',
								value: 'continent_invalid',
							},
							{
								name: 'Coordinate Accuracy Invalid',
								value: 'coordinate_accuracy_invalid',
							},
							{
								name: 'Coordinate Invalid',
								value: 'coordinate_invalid',
							},
							{
								name: 'Coordinate Out of Range',
								value: 'coordinate_out_of_range',
							},
							{
								name: 'Coordinate Precision Invalid',
								value: 'coordinate_precision_invalid',
							},
							{
								name: 'Coordinate Precision Uncertainty Mismatch',
								value: 'coordinate_precision_uncertainty_mismatch',
							},
							{
								name: 'Coordinate Reprojected',
								value: 'coordinate_reprojected',
							},
							{
								name: 'Coordinate Reprojection Failed',
								value: 'coordinate_reprojection_failed',
							},
							{
								name: 'Coordinate Reprojection Suspicious',
								value: 'coordinate_reprojection_suspicious',
							},
							{
								name: 'Coordinate Rounded',
								value: 'coordinate_rounded',
							},
							{
								name: 'Coordinate Uncertainty Meters Invalid',
								value: 'coordinate_uncertainty_meters_invalid',
							},
							{
								name: 'Country Coordinate Mismatch',
								value: 'country_coordinate_mismatch',
							},
							{
								name: 'Country Derived From Coordinates',
								value: 'country_derived_from_coordinates',
							},
							{
								name: 'Country Invalid',
								value: 'country_invalid',
							},
							{
								name: 'Country Mismatch',
								value: 'country_mismatch',
							},
							{
								name: 'Depth Min Max Swapped',
								value: 'depth_min_max_swapped',
							},
							{
								name: 'Depth Non-Numeric',
								value: 'depth_non_numeric',
							},
							{
								name: 'Depth Not Metric',
								value: 'depth_not_metric',
							},
							{
								name: 'Depth Unlikely',
								value: 'depth_unlikely',
							},
							{
								name: 'Different Owner Institution',
								value: 'different_owner_institution',
							},
							{
								name: 'Elevation Min Max Swapped',
								value: 'elevation_min_max_swapped',
							},
							{
								name: 'Elevation Non-Numeric',
								value: 'elevation_non_numeric',
							},
							{
								name: 'Elevation Not Metric',
								value: 'elevation_not_metric',
							},
							{
								name: 'Elevation Unlikely',
								value: 'elevation_unlikely',
							},
							{
								name: 'Footprint SRS Invalid',
								value: 'footprint_srs_invalid',
							},
							{
								name: 'Footprint WKT Invalid',
								value: 'footprint_wkt_invalid',
							},
							{
								name: 'Footprint WKT Mismatch',
								value: 'footprint_wkt_mismatch',
							},
							{
								name: 'Geodetic Datum Assumed WGS84',
								value: 'geodetic_datum_assumed_wgs84',
							},
							{
								name: 'Geodetic Datum Invalid',
								value: 'geodetic_datum_invalid',
							},
							{
								name: 'Georeferenced Date Invalid',
								value: 'georeferenced_date_invalid',
							},
							{
								name: 'Georeferenced Date Unlikely',
								value: 'georeferenced_date_unlikely',
							},
							{
								name: 'Identified Date Invalid',
								value: 'identified_date_invalid',
							},
							{
								name: 'Identified Date Unlikely',
								value: 'identified_date_unlikely',
							},
							{
								name: 'Individual Count Conflicts With Occurrence Status',
								value: 'individual_count_conflicts_with_occurrence_status',
							},
							{
								name: 'Individual Count Invalid',
								value: 'individual_count_invalid',
							},
							{
								name: 'Institution Collection Mismatch',
								value: 'institution_collection_mismatch',
							},
							{
								name: 'Institution Match Fuzzy',
								value: 'institution_match_fuzzy',
							},
							{
								name: 'Institution Match None',
								value: 'institution_match_none',
							},
							{
								name: 'Interpretation Error',
								value: 'interpretation_error',
							},
							{
								name: 'Modified Date Invalid',
								value: 'modified_date_invalid',
							},
							{
								name: 'Modified Date Unlikely',
								value: 'modified_date_unlikely',
							},
							{
								name: 'Multimedia Date Invalid',
								value: 'multimedia_date_invalid',
							},
							{
								name: 'Multimedia URI Invalid',
								value: 'multimedia_uri_invalid',
							},
							{
								name: 'Occurrence Status Inferred From Basis of Record',
								value: 'occurrence_status_inferred_from_basis_of_record',
							},
							{
								name: 'Occurrence Status Inferred From Individual Count',
								value: 'occurrence_status_inferred_from_individual_count',
							},
							{
								name: 'Occurrence Status Unparsable',
								value: 'occurrence_status_unparsable',
							},
							{
								name: 'Possibly On Loan',
								value: 'possibly_on_loan',
							},
							{
								name: 'Presumed Negated Latitude',
								value: 'presumed_negated_latitude',
							},
							{
								name: 'Presumed Negated Longitude',
								value: 'presumed_negated_longitude',
							},
							{
								name: 'Presumed Swapped Coordinate',
								value: 'presumed_swapped_coordinate',
							},
							{
								name: 'Recorded Date Invalid',
								value: 'recorded_date_invalid',
							},
							{
								name: 'Recorded Date Mismatch',
								value: 'recorded_date_mismatch',
							},
							{
								name: 'Recorded Date Unlikely',
								value: 'recorded_date_unlikely',
							},
							{
								name: 'References URI Invalid',
								value: 'references_uri_invalid',
							},
							{
								name: 'Taxon Match Aggregate',
								value: 'taxon_match_aggregate',
							},
							{
								name: 'Taxon Match Fuzzy',
								value: 'taxon_match_fuzzy',
							},
							{
								name: 'Taxon Match Higher Rank',
								value: 'taxon_match_higherrank',
							},
							{
								name: 'Taxon Match None',
								value: 'taxon_match_none',
							},
							{
								name: 'Type Status Invalid',
								value: 'type_status_invalid',
							},
							{
								name: 'Zero Coordinate',
								value: 'zero_coordinate',
							},
						],
					},
					{
						displayName: 'Kingdom Key',
						name: 'kingdomKey',
						type: 'string',
						default: '',
						description: 'The kingdom classification key',
					},
					{
						displayName: 'Last Interpreted',
						name: 'lastInterpreted',
						type: 'string',
						default: '',
						description: 'The date the record was last changed in GBIF in ISO-8601 format: yyyy, yyyy-MM, yyyy-MM-dd, or MM-dd (e.g., 2020,2021 for year range 2020 - 2021), which is not necessarily the date the record was first/last changed by the publisher. Data is re-interpreted when GBIF changes the taxonomic backbone, geographic data sources, or interpretation processes.',
					},
					{
						displayName: 'License',
						name: 'license',
						type: 'options',
						default: '',
						description: 'The type license applied to the dataset or record',
						options: [
							{
								name: '',
								value: '',
							},
							{
								name: 'CC0 1.0',
								value: 'cc0_1_0',
							},
							{
								name: 'CC BY 4.0',
								value: 'cc_by_4_0',
							},
							{
								name: 'CC BY NC 4.0',
								value: 'cc_by_nc_4_0',
							},
							{
								name: 'Unspecified',
								value: 'unspecified',
							},
							{
								name: 'Unsupported',
								value: 'unsupported',
							},
						],
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'string',
						default: '20',
						description: 'The limit of results to return with a maximum of 300',
					},
					{
						displayName: 'Locality',
						name: 'locality',
						type: 'string',
						default: '',
						description: 'The specific description of the place',
					},
					{
						displayName: 'Media Type',
						name: 'mediaType',
						type: 'options',
						default: '',
						description: 'The kind of multimedia associated with an occurrence',
						options: [
							{
								name: '',
								value: '',
							},
							{
								name: 'Moving Image',
								value: 'MovingImage',
							},
							{
								name: 'Sound',
								value: 'Sound',
							},
							{
								name: 'Still Image',
								value: 'StillImage',
							},
						],
					},
					{
						displayName: 'Modified',
						name: 'modified',
						type: 'string',
						default: '',
						description: 'The most recent date-time on which the resource was changed, according to the publisher',
					},
					{
						displayName: 'Month',
						name: 'month',
						type: 'string',
						default: '',
						description: 'The month of the year, starting with 1 for January (e.g., 1 for January or 1,4 for January through April)',
					},
					{
						displayName: 'Network Key',
						name: 'networkKey',
						type: 'string',
						default: '',
						description: 'The GBIF Network to which the occurrence belongs',
					},
					{
						displayName: 'Occurrence ID',
						name: 'occurrenceId',
						type: 'string',
						default: '',
						description: 'A single globally unique identifier for the occurrence record as provided by the publisher',
					},
					{
						displayName: 'Occurrence Status',
						name: 'occurrenceStatus',
						type: 'options',
						default: '',
						description: 'The presence or absence of the occurrence',
						options: [
							{
								name: '',
								value: '',
							},
							{
								name: 'Absent',
								value: 'absent',
							},
							{
								name: 'Present',
								value: 'Present',
							},
						],
					},
					{
						displayName: 'Order Key',
						name: 'orderKey',
						type: 'string',
						default: '',
						description: 'The order classification key',
					},
					{
						displayName: 'Organism ID',
						name: 'organismId',
						type: 'string',
						default: '',
						description: 'An identifier for the Organism instance (as opposed to a particular digital record of the Organism). May be a globally unique identifier or an identifier specific to the data set.',
					},
					{
						displayName: 'Organism Quantity',
						name: 'organismQuantity',
						type: 'string',
						default: '',
						description: 'A number or enumeration value for the quantity of organisms',
					},
					{
						displayName: 'Organism Quantity Type',
						name: 'organismQuantityType',
						type: 'string',
						default: '',
						description: 'The type of quantification system used for the quantity of organisms',
					},
					{
						displayName: 'Other Catalog Numbers',
						name: 'otherCatalogNumbers',
						type: 'string',
						default: '',
						description: 'Previous or alternate fully qualified catalog numbers',
					},
					{
						displayName: 'Phylum Key',
						name: 'phylumKey',
						type: 'string',
						default: '',
						description: 'The phylum classification key',
					},
					{
						displayName: 'Preparations',
						name: 'preparations',
						type: 'string',
						default: '',
						description: 'Preparation or preservation method for a specimen',
					},
					{
						displayName: 'Programme',
						name: 'programme',
						type: 'string',
						default: '',
						description: 'A group of activities, often associated with a specific funding stream, such as the GBIF BID programme',
					},
					{
						displayName: 'Project ID',
						name: 'projectId',
						type: 'string',
						default: '',
						description: 'The identifier for a project, which is often assigned by a funded programme',
					},
					{
						displayName: 'Protocol',
						name: 'protocol',
						type: 'string',
						default: '',
						description: 'Protocol or mechanism used to provide the occurrence record',
					},
					{
						displayName: 'Publishing Country',
						name: 'publishingCountry',
						type: 'string',
						default: '',
						description: 'The 2-letter country code (as per ISO-3166-1) of the publishing organization\'s country',
					},
					{
						displayName: 'Publishing Organization',
						name: 'publishingOrg',
						type: 'string',
						default: '',
						description: 'The publishing organization (e.g., Illinois Natural History Survey)',
					},
					{
						displayName: 'Recorded By',
						name: 'recordedBy',
						type: 'string',
						default: '',
						description: 'The person who recorded the occurrence (e.g., Carl Linnaeus)',
					},
					{
						displayName: 'Recorded By ID',
						name: 'recordedById',
						type: 'string',
						default: '',
						description: 'Identifier (e.g., ORCID) for the person who recorded the occurrence',
					},
					{
						displayName: 'Record Number',
						name: 'recordNumber',
						type: 'string',
						default: '',
						description: 'An identifier given to the record at the time it was recorded in the field',
					},
					{
						displayName: 'Relative Organism Quantity',
						name: 'relativeOrganismQuantity',
						type: 'string',
						default: '',
						description: 'The relative measurement of the quantity of the organism (e.g., without absolute units)',
					},
					{
						displayName: 'Repatriated',
						name: 'repatriated',
						type: 'boolean',
						default: false,
						description: 'Searches for records whose publishing country is different from the country in which it was recorded',
					},
					{
						displayName: 'Sample Size Unit',
						name: 'sampleSizeUnit',
						type: 'string',
						default: '',
						description: 'The unit of measurement of the size (time duration, length, area, or volume) of a sample in a sampling event',
					},
					{
						displayName: 'Sample Size Value',
						name: 'sampleSizeValue',
						type: 'string',
						default: '',
						description: 'A numeric value for a measurement of the size (time duration, length, area, or volume) of a sample in a sampling event',
					},
					{
						displayName: 'Sampling Protocol',
						name: 'samplingProtocol',
						type: 'string',
						default: '',
						description: 'The name of, reference to, or description of the method or protocol used during a sampling event',
					},
					{
						displayName: 'Scientific Name',
						name: 'scientificName',
						type: 'string',
						default: '',
						description: 'Searches for a scientific name from the GBIF backbone (including synonyms) using the species match service to retrieve a taxonKey. Only unique scientific names will return results, homonyms (including many monomials) will return nothing. Consider using the taxonKey parameter instead and the species match service directly.',
					},
					{
						displayName: 'Species Key',
						name: 'speciesKey',
						type: 'string',
						default: '',
						description: 'The species classification key',
					},
					{
						displayName: 'State or Province',
						name: 'stateProvince',
						type: 'string',
						default: '',
						description: 'The name of the next smaller administrative region than country (state, province, canton, department, region, etc.) in which the Location occurs',
					},
					{
						displayName: 'Subgenus Key',
						name: 'subgenusKey',
						type: 'string',
						default: '',
						description: 'The subgenus classification key',
					},
					{
						displayName: 'Taxon Key',
						name: 'taxonKey',
						type: 'string',
						default: '',
						description: 'A taxon key from the GBIF backbone, including all children and synonyms of the taxon (e.g., taxonKey=212 will return all species of birds)',
					},
					{
						displayName: 'To Date',
						name: 'toDate',
						type: 'string',
						default: '',
						description: 'End partial date of a date range in the format of yyyy-MM (e.g., 2015-11)',
					},
					{
						displayName: 'Type Status',
						name: 'typeStatus',
						type: 'options',
						default: '',
						description: 'Nomenclatural type (type status, typified scientific name, publication) applied to the subject',
						options: [
							{
								name: '',
								value: '',
							},
							{
								name: 'Allolectotype',
								value: 'allolectotype',
							},
							{
								name: 'Alloneotype',
								value: 'alloneotype',
							},
							{
								name: 'Allotype',
								value: 'allotype',
							},
							{
								name: 'Cotype',
								value: 'cotype',
							},
							{
								name: 'Epitype',
								value: 'epitype',
							},
							{
								name: 'Exepitype',
								value: 'exepitype',
							},
							{
								name: 'Exholotype',
								value: 'exholotype',
							},
							{
								name: 'Exisotype',
								value: 'exisotype',
							},
							{
								name: 'Exlectotype',
								value: 'exlectotype',
							},
							{
								name: 'Exneotype',
								value: 'exneotype',
							},
							{
								name: 'Exparatype',
								value: 'exparatype',
							},
							{
								name: 'Exsyntype',
								value: 'exsyntype',
							},
							{
								name: 'Extype',
								value: 'extype',
							},
							{
								name: 'Hapantotype',
								value: 'hapantotype',
							},
							{
								name: 'Holotype',
								value: 'holotype',
							},
							{
								name: 'Hypotype',
								value: 'hypotype',
							},
							{
								name: 'Iconotype',
								value: 'iconotype',
							},
							{
								name: 'Isolectotype',
								value: 'isolectotype',
							},
							{
								name: 'Isoneotype',
								value: 'isoneotype',
							},
							{
								name: 'Isoparatype',
								value: 'isoparatype',
							},
							{
								name: 'Isosyntype',
								value: 'isosyntype',
							},
							{
								name: 'Isotype',
								value: 'isotype',
							},
							{
								name: 'Lectotype',
								value: 'lectotype',
							},
							{
								name: 'Neotype',
								value: 'neotype',
							},
							{
								name: 'Notatype',
								value: 'notatype',
							},
							{
								name: 'Original Material',
								value: 'originalmaterial',
							},
							{
								name: 'Paralectotype',
								value: 'paralectotype',
							},
							{
								name: 'Paraneotype',
								value: 'paraneotype',
							},
							{
								name: 'Paratype',
								value: 'paratype',
							},
							{
								name: 'Plastoholotype',
								value: 'plastoholotype',
							},
							{
								name: 'Plastoisotype',
								value: 'plastoisotype',
							},
							{
								name: 'Plastolectotype',
								value: 'plastolectotype',
							},
							{
								name: 'Plastoneotype',
								value: 'plastoneotype',
							},
							{
								name: 'Plastoparatype',
								value: 'plastoparatype',
							},
							{
								name: 'Plastosyntype',
								value: 'plastosyntype',
							},
							{
								name: 'Plastotype',
								value: 'plastotype',
							},
							{
								name: 'Plesiotype',
								value: 'plesiotype',
							},
							{
								name: 'Secondary Type',
								value: 'secondarytype',
							},
							{
								name: 'Supplementary Type',
								value: 'supplementarytype',
							},
							{
								name: 'Syntype',
								value: 'syntype',
							},
							{
								name: 'Topotype',
								value: 'topotype',
							},
							{
								name: 'Type',
								value: 'type',
							},
							{
								name: 'Type Genus',
								value: 'type_genus',
							},
							{
								name: 'Type Species',
								value: 'type_species',
							},
						],
					},
					{
						displayName: 'Verbatim Scientific Name',
						name: 'verbatimScientificName',
						type: 'string',
						default: '',
						description: 'The scientific name provided to GBIF by the data publisher prior to interpretation and processing by GBIF',
					},
					{
						displayName: 'Verbatim Taxon ID',
						name: 'verbatimTaxonId',
						type: 'string',
						default: '',
						description: 'The taxon identifier provided to GBIF by the data publisher',
					},
					{
						displayName: 'Water Body',
						name: 'waterBody',
						type: 'string',
						default: '',
						description: 'The name of the water body in which the Locations occurs (e.g., Lake Michigan)',
					},
					{
						displayName: 'Year',
						name: 'year',
						type: 'string',
						default: '',
						description: 'The 4 digit year with 98 interpreted as AD 98 (e.g., 2020,2022 for the year range 2020 through 2022, or 2020 for the exact year 2020)',
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
							'occurrenceCounts',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Basis of Record',
						name: 'basisOfRecord',
						type: 'options',
						default: 'FOSSIL_SPECIMEN',
						description: 'Filters occurrence counts by basis of record',
						options: [
							{
								name: 'Fossil Specimen',
								value: 'FOSSIL_SPECIMEN',
							},
							{
								name: 'Human Observation',
								value: 'HUMAN_OBSERVATION',
							},
							{
								name: 'Literature',
								value: 'LITERATURE',
							},
							{
								name: 'Living Specimen',
								value: 'LIVING_SPECIMEN',
							},
							{
								name: 'Machine Observation',
								value: 'MACHINE_OBSERVATION',
							},
							{
								name: 'Material Citation',
								value: 'MATERIAL_CITATION',
							},
							{
								name: 'Material Sample',
								value: 'MATERIAL_SAMPLE',
							},
							{
								name: 'Observation',
								value: 'OBSERVATION',
							},
							{
								name: 'Occurrence',
								value: 'OCCURRENCE',
							},
							{
								name: 'Preserved Specimen',
								value: 'PRESERVED_SPECIMEN',
							},
						],
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						description: 'Filters occurrence counts by country given as a ISO 639-1 (2 letter) country code',
					},
					{
						displayName: 'Dataset Key',
						name: 'datasetKey',
						type: 'string',
						default: '',
						description: 'Filters occurrence counts by dataset key',
					},
					{
						displayName: 'Is Georeferenced',
						name: 'isGeoreferenced',
						type: 'boolean',
						default: false,
						description: 'Filters occurrence counts by whether they are georeferenced or not',
					},
					{
						displayName: 'Issue',
						name: 'issue',
						type: 'multiOptions',
						default: [],
						description: 'Filter by indexing issue',
						options: [
							{
								name: '',
								value: '',
							},
							{
								name: 'Accepted Name Missing',
								value: 'ACCEPTED_NAME_MISSING',
							},
							{
								name: 'Accepted Name Not Unique',
								value: 'ACCEPTED_NAME_NOT_UNIQUE',
							},
							{
								name: 'Accepted Name Usage ID Invalid',
								value: 'ACCEPTED_NAME_USAGE_ID_INVALID',
							},
							{
								name: 'Alt Identifier Invalid',
								value: 'ALT_IDENTIFIER_INVALID',
							},
							{
								name: 'Backbone Match Aggregate',
								value: 'BACKBONE_MATCH_AGGREGATE',
							},
							{
								name: 'Backbone Match Fuzzy',
								value: 'BACKBONE_MATCH_FUZZY',
							},
							{
								name: 'Backbone Match None',
								value: 'BACKBONE_MATCH_NONE',
							},
							{
								name: 'Basionym Author Mismatch',
								value: 'BASIONYM_AUTHOR_MISMATCH',
							},
							{
								name: 'Bib Reference Invalid',
								value: 'BIB_REFERENCE_INVALID',
							},
							{
								name: 'Chained Synoym',
								value: 'CHAINED_SYNOYM',
							},
							{
								name: 'Classification Not Applied',
								value: 'CLASSIFICATION_NOT_APPLIED',
							},
							{
								name: 'Classification Rank Order Invalid',
								value: 'classification_rank_order_invalid',
							},
							{
								name: 'Conflicting Basionym Combination',
								value: 'CONFLICTING_BASIONYM_COMBINATION',
							},
							{
								name: 'Description Invalid',
								value: 'DESCRIPTION_INVALID',
							},
							{
								name: 'Distribution Invalid',
								value: 'DISTRIBUTION_INVALID',
							},
							{
								name: 'Homonym',
								value: 'HOMONYM',
							},
							{
								name: 'Multimedia Invalid',
								value: 'MULTIMEDIA_INVALID',
							},
							{
								name: 'Name Parent Mismatch',
								value: 'NAME_PARENT_MISMATCH',
							},
							{
								name: 'No Species',
								value: 'NO_SPECIES',
							},
							{
								name: 'Nomenclatural Status Invalid',
								value: 'NOMENCLATURAL_STATUS_INVALID',
							},
							{
								name: 'Original Name Derived',
								value: 'ORIGINAL_NAME_DERIVED',
							},
							{
								name: 'Original Name Not Unique',
								value: 'ORIGINAL_NAME_NOT_UNIQUE',
							},
							{
								name: 'Original Name Usage ID Invalid',
								value: 'ORIGINAL_NAME_USAGE_ID_INVALID',
							},
							{
								name: 'Orthographic Variant',
								value: 'ORTHOGRAPHIC_VARIANT',
							},
							{
								name: 'Parent Cycle',
								value: 'PARENT_CYCLE',
							},
							{
								name: 'Parent Name Not Unique',
								value: 'PARENT_NAME_NOT_UNIQUE',
							},
							{
								name: 'Parent Name Usage ID Invalid',
								value: 'PARENT_NAME_USAGE_ID_INVALID',
							},
							{
								name: 'Partially Parsable',
								value: 'PARTIALLY_PARSABLE',
							},
							{
								name: 'Published Before Genus',
								value: 'PUBLISHED_BEFORE_GENUS',
							},
							{
								name: 'Rank Invalid',
								value: 'RANK_INVALID',
							},
							{
								name: 'Relationship Missing',
								value: 'RELATIONSHIP_MISSING',
							},
							{
								name: 'Scientific Name Assembled',
								value: 'SCIENTIFIC_NAME_ASSEMBLED',
							},
							{
								name: 'Species Profile Invalid',
								value: 'SPECIES_PROFILE_INVALID',
							},
							{
								name: 'Taxonomic Status Invalid',
								value: 'TAXONOMIC_STATUS_INVALID',
							},
							{
								name: 'Taxonomic Status Mismatch',
								value: 'TAXONOMIC_STATUS_MISMATCH ',
							},
							{
								name: 'Unparsable',
								value: 'UNPARSABLE',
							},
							{
								name: 'Vernacular Name Invalid',
								value: 'VERNACULAR_NAME_INVALID',
							},
						],
					},
					{
						displayName: 'Protocol',
						name: 'protocol',
						type: 'string',
						default: '',
						description: 'Filters occurrence counts by protocol or mechanism used to provide the occurrence record',
					},
					{
						displayName: 'Publishing Country',
						name: 'publishingCountry',
						type: 'string',
						default: '',
						description: 'Filters occurrence counts by publishing country given as a ISO 639-1 (2 letter) country code',
					},
					{
						displayName: 'Taxon Key',
						name: 'taxonKey',
						type: 'string',
						default: '',
						description: 'Filters occurrence counts by taxon key',
					},
					{
						displayName: 'Type Status',
						name: 'typeStatus',
						type: 'options',
						default: '',
						description: 'Filters occurence counts by nomenclatural type (type status, typified scientific name, publication) applied to the subject',
						options: [
							{
								name: '',
								value: '',
							},
							{
								name: 'Allolectotype',
								value: 'ALLOLECTOTYPE',
							},
							{
								name: 'Alloneotype',
								value: 'ALLONEOTYPE',
							},
							{
								name: 'Allotype',
								value: 'ALLOTYPE',
							},
							{
								name: 'Cotype',
								value: 'COTYPE',
							},
							{
								name: 'Epitype',
								value: 'EPITYPE',
							},
							{
								name: 'Exepitype',
								value: 'EXEPITYPE',
							},
							{
								name: 'Exholotype',
								value: 'EXHOLOTYPE',
							},
							{
								name: 'Exisotype',
								value: 'EXISOTYPE',
							},
							{
								name: 'Exlectotype',
								value: 'EXLECTOTYPE',
							},
							{
								name: 'Exneotype',
								value: 'EXNEOTYPE',
							},
							{
								name: 'Exparatype',
								value: 'EXPARATYPE',
							},
							{
								name: 'Exsyntype',
								value: 'EXSYNTYPE',
							},
							{
								name: 'Extype',
								value: 'EXTYPE',
							},
							{
								name: 'Hapantotype',
								value: 'HAPANTOTYPE',
							},
							{
								name: 'Holotype',
								value: 'HOLOTYPE',
							},
							{
								name: 'Hypotype',
								value: 'HYPOTYPE',
							},
							{
								name: 'Iconotype',
								value: 'ICONOTYPE',
							},
							{
								name: 'Isolectotype',
								value: 'ISOLECTOTYPE',
							},
							{
								name: 'Isoneotype',
								value: 'ISONEOTYPE',
							},
							{
								name: 'Isoparatype',
								value: 'ISOPARATYPE',
							},
							{
								name: 'Isosyntype',
								value: 'ISOSYNTYPE',
							},
							{
								name: 'Isotype',
								value: 'ISOTYPE',
							},
							{
								name: 'Lectotype',
								value: 'LECTOTYPE',
							},
							{
								name: 'Neotype',
								value: 'NEOTYPE',
							},
							{
								name: 'Notatype',
								value: 'NOTATYPE',
							},
							{
								name: 'Original Material',
								value: 'ORIGINALMATERIAL',
							},
							{
								name: 'Paralectotype',
								value: 'PARALECTOTYPE',
							},
							{
								name: 'Paraneotype',
								value: 'PARANEOTYPE',
							},
							{
								name: 'Paratype',
								value: 'PARATYPE',
							},
							{
								name: 'Plastoholotype',
								value: 'PLASTOHOLOTYPE',
							},
							{
								name: 'Plastoisotype',
								value: 'PLASTOISOTYPE',
							},
							{
								name: 'Plastolectotype',
								value: 'PLASTOLECTOTYPE',
							},
							{
								name: 'Plastoneotype',
								value: 'PLASTONEOTYPE',
							},
							{
								name: 'Plastoparatype',
								value: 'PLASTOPARATYPE',
							},
							{
								name: 'Plastosyntype',
								value: 'PLASTOSYNTYPE',
							},
							{
								name: 'Plastotype',
								value: 'PLASTOTYPE',
							},
							{
								name: 'Plesiotype',
								value: 'PLESIOTYPE',
							},
							{
								name: 'Secondary Type',
								value: 'SECONDARYTYPE',
							},
							{
								name: 'Supplementary Type',
								value: 'SUPPLEMENTARYTYPE',
							},
							{
								name: 'Syntype',
								value: 'SYNTYPE',
							},
							{
								name: 'Topotype',
								value: 'TOPOTYPE',
							},
							{
								name: 'Type',
								value: 'TYPE',
							},
							{
								name: 'Type Genus',
								value: 'TYPE_GENUS',
							},
							{
								name: 'Type Species',
								value: 'TYPE_SPECIES',
							},
						],
					},
					{
						displayName: 'Year',
						name: 'year',
						type: 'string',
						default: '',
						description: 'Filters occurrence counts by year of the occurrence',
					},
				],
			},
			{
				displayName: 'Additional Fields',
				name: 'limit',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'occurrenceSearchCatalogNumber',
							'occurrenceSearchCollectionCode',
							'occurrenceSearchOccurrenceId',
							'occurrenceSearchRecordedBy',
							'occurrenceSearchRecordNumber',
							'occurrenceSearchInstitutionCode',
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
							'species',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Dataset Key',
						name: 'datasetKey',
						type: 'string',
						default: '',
						description: 'Filters by the checklist dataset key (a uuid)',
					},
					{
						displayName: 'Language',
						name: 'language',
						type: 'options',
						options: [
							{
								name: 'Abkhazian',
								value: 'ab',
							},
							{
								name: 'Afar',
								value: 'aa',
							},
							{
								name: 'Afrikaans',
								value: 'af',
							},
							{
								name: 'Akan',
								value: 'ak',
							},
							{
								name: 'Albanian',
								value: 'sq',
							},
							{
								name: 'Amharic',
								value: 'am',
							},
							{
								name: 'Arabic',
								value: 'ar',
							},
							{
								name: 'Aragonese',
								value: 'an',
							},
							{
								name: 'Armenian',
								value: 'hy',
							},
							{
								name: 'Assamese',
								value: 'as',
							},
							{
								name: 'Avaric',
								value: 'av',
							},
							{
								name: 'Avestan',
								value: 'ae',
							},
							{
								name: 'Aymara',
								value: 'ay',
							},
							{
								name: 'Azerbaijani',
								value: 'az',
							},
							{
								name: 'Bambara',
								value: 'bm',
							},
							{
								name: 'Bashkir',
								value: 'ba',
							},
							{
								name: 'Basque',
								value: 'eu',
							},
							{
								name: 'Belarusian',
								value: 'be',
							},
							{
								name: 'Bengali',
								value: 'bn',
							},
							{
								name: 'Bislama',
								value: 'bi',
							},
							{
								name: 'Bosnian',
								value: 'bs',
							},
							{
								name: 'Breton',
								value: 'br',
							},
							{
								name: 'Bulgarian',
								value: 'bg',
							},
							{
								name: 'Burmese',
								value: 'my',
							},
							{
								name: 'Catalan, Valencian',
								value: 'ca',
							},
							{
								name: 'Chamorro',
								value: 'ch',
							},
							{
								name: 'Chechen',
								value: 'ce',
							},
							{
								name: 'Chichewa, Chewa, Nyanja',
								value: 'ny',
							},
							{
								name: 'Chinese',
								value: 'zh',
							},
							{
								name: 'Church Slavic, Old Slavonic, Church Slavonic, Old Bulgarian, Old Church Slavonic',
								value: 'cu',
							},
							{
								name: 'Chuvash',
								value: 'cv',
							},
							{
								name: 'Cornish',
								value: 'kw',
							},
							{
								name: 'Corsican',
								value: 'co',
							},
							{
								name: 'Cree',
								value: 'cr',
							},
							{
								name: 'Croatian',
								value: 'hr',
							},
							{
								name: 'Czech',
								value: 'cs',
							},
							{
								name: 'Danish',
								value: 'da',
							},
							{
								name: 'Divehi, Dhivehi, Maldivian',
								value: 'dv',
							},
							{
								name: 'Dutch, Flemish',
								value: 'nl',
							},
							{
								name: 'Dzongkha',
								value: 'dz',
							},
							{
								name: 'English',
								value: 'en',
							},
							{
								name: 'Esperanto',
								value: 'eo',
							},
							{
								name: 'Estonian',
								value: 'et',
							},
							{
								name: 'Ewe',
								value: 'ee',
							},
							{
								name: 'Faroese',
								value: 'fo',
							},
							{
								name: 'Fijian',
								value: 'fj',
							},
							{
								name: 'Finnish',
								value: 'fi',
							},
							{
								name: 'French',
								value: 'fr',
							},
							{
								name: 'Western Frisian',
								value: 'fy',
							},
							{
								name: 'Fulah',
								value: 'ff',
							},
							{
								name: 'Gaelic, Scottish Gaelic',
								value: 'gd',
							},
							{
								name: 'Galician',
								value: 'gl',
							},
							{
								name: 'Ganda',
								value: 'lg',
							},
							{
								name: 'Georgian',
								value: 'ka',
							},
							{
								name: 'German',
								value: 'de',
							},
							{
								name: 'Greek, Modern (1453–)',
								value: 'el',
							},
							{
								name: 'Kalaallisut, Greenlandic',
								value: 'kl',
							},
							{
								name: 'Guarani',
								value: 'gn',
							},
							{
								name: 'Gujarati',
								value: 'gu',
							},
							{
								name: 'Haitian, Haitian Creole',
								value: 'ht',
							},
							{
								name: 'Hausa',
								value: 'ha',
							},
							{
								name: 'Hebrew',
								value: 'he',
							},
							{
								name: 'Herero',
								value: 'hz',
							},
							{
								name: 'Hindi',
								value: 'hi',
							},
							{
								name: 'Hiri Motu',
								value: 'ho',
							},
							{
								name: 'Hungarian',
								value: 'hu',
							},
							{
								name: 'Icelandic',
								value: 'is',
							},
							{
								name: 'Ido',
								value: 'io',
							},
							{
								name: 'Igbo',
								value: 'ig',
							},
							{
								name: 'Indonesian',
								value: 'id',
							},
							{
								name: 'Interlingua (International Auxiliary Language Association)',
								value: 'ia',
							},
							{
								name: 'Interlingue, Occidental',
								value: 'ie',
							},
							{
								name: 'Inuktitut',
								value: 'iu',
							},
							{
								name: 'Inupiaq',
								value: 'ik',
							},
							{
								name: 'Irish',
								value: 'ga',
							},
							{
								name: 'Italian',
								value: 'it',
							},
							{
								name: 'Japanese',
								value: 'ja',
							},
							{
								name: 'Javanese',
								value: 'jv',
							},
							{
								name: 'Kannada',
								value: 'kn',
							},
							{
								name: 'Kanuri',
								value: 'kr',
							},
							{
								name: 'Kashmiri',
								value: 'ks',
							},
							{
								name: 'Kazakh',
								value: 'kk',
							},
							{
								name: 'Central Khmer',
								value: 'km',
							},
							{
								name: 'Kikuyu, Gikuyu',
								value: 'ki',
							},
							{
								name: 'Kinyarwanda',
								value: 'rw',
							},
							{
								name: 'Kirghiz, Kyrgyz',
								value: 'ky',
							},
							{
								name: 'Komi',
								value: 'kv',
							},
							{
								name: 'Kongo',
								value: 'kg',
							},
							{
								name: 'Korean',
								value: 'ko',
							},
							{
								name: 'Kuanyama, Kwanyama',
								value: 'kj',
							},
							{
								name: 'Kurdish',
								value: 'ku',
							},
							{
								name: 'Lao',
								value: 'lo',
							},
							{
								name: 'Latin',
								value: 'la',
							},
							{
								name: 'Latvian',
								value: 'lv',
							},
							{
								name: 'Limburgan, Limburger, Limburgish',
								value: 'li',
							},
							{
								name: 'Lingala',
								value: 'ln',
							},
							{
								name: 'Lithuanian',
								value: 'lt',
							},
							{
								name: 'Luba-Katanga',
								value: 'lu',
							},
							{
								name: 'Luxembourgish, Letzeburgesch',
								value: 'lb',
							},
							{
								name: 'Macedonian',
								value: 'mk',
							},
							{
								name: 'Malagasy',
								value: 'mg',
							},
							{
								name: 'Malay',
								value: 'ms',
							},
							{
								name: 'Malayalam',
								value: 'ml',
							},
							{
								name: 'Maltese',
								value: 'mt',
							},
							{
								name: 'Manx',
								value: 'gv',
							},
							{
								name: 'Maori',
								value: 'mi',
							},
							{
								name: 'Marathi',
								value: 'mr',
							},
							{
								name: 'Marshallese',
								value: 'mh',
							},
							{
								name: 'Mongolian',
								value: 'mn',
							},
							{
								name: 'Nauru',
								value: 'na',
							},
							{
								name: 'Navajo, Navaho',
								value: 'nv',
							},
							{
								name: 'North Ndebele',
								value: 'nd',
							},
							{
								name: 'South Ndebele',
								value: 'nr',
							},
							{
								name: 'Ndonga',
								value: 'ng',
							},
							{
								name: 'Nepali',
								value: 'ne',
							},
							{
								name: 'Norwegian',
								value: 'no',
							},
							{
								name: 'Norwegian Bokmål',
								value: 'nb',
							},
							{
								name: 'Norwegian Nynorsk',
								value: 'nn',
							},
							{
								name: 'Sichuan Yi, Nuosu',
								value: 'ii',
							},
							{
								name: 'Occitan',
								value: 'oc',
							},
							{
								name: 'Ojibwa',
								value: 'oj',
							},
							{
								name: 'Oriya',
								value: 'or',
							},
							{
								name: 'Oromo',
								value: 'om',
							},
							{
								name: 'Ossetian, Ossetic',
								value: 'os',
							},
							{
								name: 'Pali',
								value: 'pi',
							},
							{
								name: 'Pashto, Pushto',
								value: 'ps',
							},
							{
								name: 'Persian',
								value: 'fa',
							},
							{
								name: 'Polish',
								value: 'pl',
							},
							{
								name: 'Portuguese',
								value: 'pt',
							},
							{
								name: 'Punjabi, Panjabi',
								value: 'pa',
							},
							{
								name: 'Quechua',
								value: 'qu',
							},
							{
								name: 'Romanian, Moldavian, Moldovan',
								value: 'ro',
							},
							{
								name: 'Romansh',
								value: 'rm',
							},
							{
								name: 'Rundi',
								value: 'rn',
							},
							{
								name: 'Russian',
								value: 'ru',
							},
							{
								name: 'Northern Sami',
								value: 'se',
							},
							{
								name: 'Samoan',
								value: 'sm',
							},
							{
								name: 'Sango',
								value: 'sg',
							},
							{
								name: 'Sanskrit',
								value: 'sa',
							},
							{
								name: 'Sardinian',
								value: 'sc',
							},
							{
								name: 'Serbian',
								value: 'sr',
							},
							{
								name: 'Shona',
								value: 'sn',
							},
							{
								name: 'Sindhi',
								value: 'sd',
							},
							{
								name: 'Sinhala, Sinhalese',
								value: 'si',
							},
							{
								name: 'Slovak',
								value: 'sk',
							},
							{
								name: 'Slovenian',
								value: 'sl',
							},
							{
								name: 'Somali',
								value: 'so',
							},
							{
								name: 'Southern Sotho',
								value: 'st',
							},
							{
								name: 'Spanish, Castilian',
								value: 'es',
							},
							{
								name: 'Sundanese',
								value: 'su',
							},
							{
								name: 'Swahili',
								value: 'sw',
							},
							{
								name: 'Swati',
								value: 'ss',
							},
							{
								name: 'Swedish',
								value: 'sv',
							},
							{
								name: 'Tagalog',
								value: 'tl',
							},
							{
								name: 'Tahitian',
								value: 'ty',
							},
							{
								name: 'Tajik',
								value: 'tg',
							},
							{
								name: 'Tamil',
								value: 'ta',
							},
							{
								name: 'Tatar',
								value: 'tt',
							},
							{
								name: 'Telugu',
								value: 'te',
							},
							{
								name: 'Thai',
								value: 'th',
							},
							{
								name: 'Tibetan',
								value: 'bo',
							},
							{
								name: 'Tigrinya',
								value: 'ti',
							},
							{
								name: 'Tonga (Tonga Islands)',
								value: 'to',
							},
							{
								name: 'Tsonga',
								value: 'ts',
							},
							{
								name: 'Tswana',
								value: 'tn',
							},
							{
								name: 'Turkish',
								value: 'tr',
							},
							{
								name: 'Turkmen',
								value: 'tk',
							},
							{
								name: 'Twi',
								value: 'tw',
							},
							{
								name: 'Uighur, Uyghur',
								value: 'ug',
							},
							{
								name: 'Ukrainian',
								value: 'uk',
							},
							{
								name: 'Urdu',
								value: 'ur',
							},
							{
								name: 'Uzbek',
								value: 'uz',
							},
							{
								name: 'Venda',
								value: 've',
							},
							{
								name: 'Vietnamese',
								value: 'vi',
							},
							{
								name: 'Volapük',
								value: 'vo',
							},
							{
								name: 'Walloon',
								value: 'wa',
							},
							{
								name: 'Welsh',
								value: 'cy',
							},
							{
								name: 'Wolof',
								value: 'wo',
							},
							{
								name: 'Xhosa',
								value: 'xh',
							},
							{
								name: 'Yiddish',
								value: 'yi',
							},
							{
								name: 'Yoruba',
								value: 'yo',
							},
							{
								name: 'Zhuang, Chuang',
								value: 'za',
							},
							{
								name: 'Zulu',
								value: 'zu',
							},
						],
						default: 'ab',
						description: 'Language for vernacular names, given as an ISO 639-1 two-letter code',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Filters by a name string',
					},
					{
						displayName: 'Source ID',
						name: 'sourceId',
						type: 'string',
						default: '',
						description: 'Filters by the source identifier',
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
							'speciesMatch',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Filters by a name string',
					},
					{
						displayName: 'Rank',
						name: 'rank',
						type: 'options',
						default: 'aberration',
						options: [
							{
								name: 'Aberration',
								value: 'aberration',
							},
							{
								name: 'Biovar',
								value: 'biovar',
							},
							{
								name: 'Chemoform',
								value: 'chemoform',
							},
							{
								name: 'Chemovar',
								value: 'chemovar',
							},
							{
								name: 'Class',
								value: 'class',
							},
							{
								name: 'Cohort',
								value: 'cohort',
							},
							{
								name: 'Convariety',
								value: 'convariety',
							},
							{
								name: 'Cultivar',
								value: 'cultivar',
							},
							{
								name: 'Cultivar Group',
								value: 'cultivar_group',
							},
							{
								name: 'Domain',
								value: 'domain',
							},
							{
								name: 'Family',
								value: 'family',
							},
							{
								name: 'Form',
								value: 'form',
							},
							{
								name: 'Forma Specialis',
								value: 'forma_specialis',
							},
							{
								name: 'Genus',
								value: 'genus',
							},
							{
								name: 'Grandorder',
								value: 'grandorder',
							},
							{
								name: 'Grex',
								value: 'grex',
							},
							{
								name: 'Infraclass',
								value: 'infraclass',
							},
							{
								name: 'Infracohort',
								value: 'infracohort',
							},
							{
								name: 'Infrafamily',
								value: 'infrafamily',
							},
							{
								name: 'Infrageneric Name',
								value: 'infrageneric_name',
							},
							{
								name: 'Infragenus',
								value: 'infragenus',
							},
							{
								name: 'Infrakingdom',
								value: 'infrakingdom',
							},
							{
								name: 'Infralegion',
								value: 'infralegion',
							},
							{
								name: 'Infraorder',
								value: 'infraorder',
							},
							{
								name: 'Infraphylum',
								value: 'infraphylum',
							},
							{
								name: 'Infraspecific Name',
								value: 'infraspecific_name',
							},
							{
								name: 'Infrasubspecific Name',
								value: 'infrasubspecific_name',
							},
							{
								name: 'Infratribe',
								value: 'infratribe',
							},
							{
								name: 'Kingdom',
								value: 'kingdom',
							},
							{
								name: 'Legion',
								value: 'legion',
							},
							{
								name: 'Magnorder',
								value: 'magnorder',
							},
							{
								name: 'Morph',
								value: 'morph',
							},
							{
								name: 'Morphovar',
								value: 'morphovar',
							},
							{
								name: 'Natio',
								value: 'natio',
							},
							{
								name: 'Order',
								value: 'order',
							},
							{
								name: 'Other',
								value: 'other',
							},
							{
								name: 'Parvclass',
								value: 'parvclass',
							},
							{
								name: 'Parvorder',
								value: 'parvorder',
							},
							{
								name: 'Pathovar',
								value: 'pathovar',
							},
							{
								name: 'Phagovar',
								value: 'phagovar',
							},
							{
								name: 'Phylum',
								value: 'phylum',
							},
							{
								name: 'Proles',
								value: 'proles',
							},
							{
								name: 'Race',
								value: 'race',
							},
							{
								name: 'Section',
								value: 'section',
							},
							{
								name: 'Series',
								value: 'series',
							},
							{
								name: 'Serovar',
								value: 'serovar',
							},
							{
								name: 'Species',
								value: 'species',
							},
							{
								name: 'Species Aggregate',
								value: 'species_aggregate',
							},
							{
								name: 'Strain',
								value: 'strain',
							},
							{
								name: 'Subclass',
								value: 'subclass',
							},
							{
								name: 'Subcohort',
								value: 'subcohort',
							},
							{
								name: 'Subfamily',
								value: 'subfamily',
							},
							{
								name: 'Subform',
								value: 'subform',
							},
							{
								name: 'Subgenus',
								value: 'subgenus',
							},
							{
								name: 'Subkingdom',
								value: 'subkingdom',
							},
							{
								name: 'Sublegion',
								value: 'sublegion',
							},
							{
								name: 'Suborder',
								value: 'suborder',
							},
							{
								name: 'Subphylum',
								value: 'subphylum',
							},
							{
								name: 'Subsection',
								value: 'subsection',
							},
							{
								name: 'Subseries',
								value: 'subseries',
							},
							{
								name: 'Subspecies',
								value: 'subspecies',
							},
							{
								name: 'Subtribe',
								value: 'subtribe',
							},
							{
								name: 'Subvariety',
								value: 'subvariety',
							},
							{
								name: 'Superclass',
								value: 'superclass',
							},
							{
								name: 'Supercohort',
								value: 'supercohort',
							},
							{
								name: 'Superfamily',
								value: 'superfamily',
							},
							{
								name: 'Superkingdom',
								value: 'superkingdom',
							},
							{
								name: 'Superlegion',
								value: 'superlegion',
							},
							{
								name: 'Superorder',
								value: 'superorder',
							},
							{
								name: 'Superphylum',
								value: 'superphylum',
							},
							{
								name: 'Supertribe',
								value: 'supertribe',
							},
							{
								name: 'Suprageneric Name',
								value: 'suprageneric_name',
							},
							{
								name: 'Tribe',
								value: 'tribe',
							},
							{
								name: 'Unranked',
								value: 'unranked',
							},
							{
								name: 'Variety',
								value: 'variety',
							},
						],
						description: 'Filters by taxonomic rank',
					},
					{
						displayName: 'Strict',
						name: 'strict',
						type: 'boolean',
						default: false,
						description: 'If true it (fuzzy) matches only the given name, but never a taxon in the upper classification',
					},
					{
						displayName: 'Verbose',
						name: 'verbose',
						type: 'boolean',
						default: false,
						description: 'If true it shows alternative matches which were considered but then rejected',
					},
					{
						displayName: 'Kingdom',
						name: 'kingdom',
						type: 'string',
						default: '',
						description: 'Optional for species match endpoint: kingdom classification accepting a canonical name',
					},
					{
						displayName: 'Phylum',
						name: 'phylum',
						type: 'string',
						default: '',
						description: 'Optional for species match endpoint: phylum classification accepting a canonical name',
					},
					{
						displayName: 'Class',
						name: 'class',
						type: 'string',
						default: '',
						description: 'Optional for species match endpoint: class classification accepting a canonical name',
					},
					{
						displayName: 'Order',
						name: 'order',
						type: 'string',
						default: '',
						description: 'Optional for species match endpoint: order classification accepting a canonical name',
					},
					{
						displayName: 'Family',
						name: 'family',
						type: 'string',
						default: '',
						description: 'Optional for species match endpoint: family classification accepting a canonical name',
					},
					{
						displayName: 'Genus',
						name: 'genus',
						type: 'string',
						default: '',
						description: 'Optional for species match endpoint: genus classification accepting a canonical name',
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
							'speciesSearch',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Dataset Key',
						name: 'datasetKey',
						type: 'string',
						default: '',
						description: 'Filters by the checklist dataset key (a uuid)',
					},
					{
						displayName: 'Facet',
						name: 'facet',
						type: 'multiOptions',
						default: [],
						options: [
							{
								name: 'Constituent Key',
								value: 'constituent_key',
							},
							{
								name: 'Dataset Key',
								value: 'dataset_key',
							},
							{
								name: 'Habitat',
								value: 'habitat',
							},
							{
								name: 'Higher Taxon Key',
								value: 'highertaxon_key',
							},
							{
								name: 'Is Exintct',
								value: 'is_extinct',
							},
							{
								name: 'Issue',
								value: 'issue',
							},
							{
								name: 'Name Type',
								value: 'name_type',
							},
							{
								name: 'Nomenclatural Status',
								value: 'nomenclatural_status',
							},
							{
								name: 'Rank',
								value: 'rank',
							},
							{
								name: 'Status',
								value: 'status',
							},
							{
								name: 'Threat',
								value: 'threat',
							},
							{
								name: 'Type',
								value: 'type',
							},
						],
					},
					{
						displayName: 'Facet Minimum Count',
						name: 'facetMincount',
						type: 'number',
						default: '',
						description: 'Used in combination with the facet parameter (e.g., set facetMincount=1000 to exclude facets with a count less than 1000)',
					},
					{
						displayName: 'Habitat',
						name: 'habitat',
						type: 'multiOptions',
						options: [
							{
								name: 'Freshwater',
								value: 'freshwater',
							},
							{
								name: 'Marine',
								value: 'marine',
							},
							{
								name: 'Terrestrial',
								value: 'terrestrial',
							},
						],
						default: [],
					},
					{
						displayName: 'Higher Taxon Key',
						name: 'higherTaxonKey',
						type: 'string',
						default: '',
						description: 'Filters by any of the higher Linnean rank keys (within the respective checklist and not searching nub keys across all checklists)',
					},
					{
						displayName: 'Is Extinct',
						name: 'isExtinct',
						type: 'boolean',
						default: false,
						description: 'Filters by extinction status',
					},
					{
						displayName: 'Issue',
						name: 'issue',
						type: 'multiOptions',
						default: [],
						description: 'Filter by indexing issue',
						options: [
							{
								name: 'Accepted Name Missing',
								value: 'accepted_name_missing',
							},
							{
								name: 'Accepted Name Not Unique',
								value: 'accepted_name_not_unique',
							},
							{
								name: 'Accepted Name Usage ID Invalid',
								value: 'accepted_name_usage_id_invalid',
							},
							{
								name: 'Alt Identifier Invalid',
								value: 'alt_identifier_invalid',
							},
							{
								name: 'Backbone Match Aggregate',
								value: 'backbone_match_aggregate',
							},
							{
								name: 'Backbone Match Fuzzy',
								value: 'backbone_match_fuzzy',
							},
							{
								name: 'Backbone Match None',
								value: 'backbone_match_none',
							},
							{
								name: 'Basionym Author Mismatch',
								value: 'basionym_author_mismatch',
							},
							{
								name: 'Bib Reference Invalid',
								value: 'bib_reference_invalid',
							},
							{
								name: 'Chained Synoym',
								value: 'chained_synoym',
							},
							{
								name: 'Classification Not Applied',
								value: 'classification_not_applied',
							},
							{
								name: 'Classification Rank Order Invalid',
								value: 'classification_rank_order_invalid',
							},
							{
								name: 'Conflicting Basionym Combination',
								value: 'conflicting_basionym_combination',
							},
							{
								name: 'Description Invalid',
								value: 'description_invalid',
							},
							{
								name: 'Distribution Invalid',
								value: 'distribution_invalid',
							},
							{
								name: 'Homonym',
								value: 'homonym',
							},
							{
								name: 'Multimedia Invalid',
								value: 'multimedia_invalid',
							},
							{
								name: 'Name Parent Mismatch',
								value: 'name_parent_mismatch',
							},
							{
								name: 'No Species',
								value: 'no_species',
							},
							{
								name: 'Nomenclatural Status Invalid',
								value: 'nomenclatural_status_invalid',
							},
							{
								name: 'Original Name Derived',
								value: 'original_name_derived',
							},
							{
								name: 'Original Name Not Unique',
								value: 'original_name_not_unique',
							},
							{
								name: 'Original Name Usage ID Invalid',
								value: 'original_name_usage_id_invalid',
							},
							{
								name: 'Orthographic Variant',
								value: 'orthographic_variant',
							},
							{
								name: 'Parent Cycle',
								value: 'parent_cycle',
							},
							{
								name: 'Parent Name Not Unique',
								value: 'parent_name_not_unique',
							},
							{
								name: 'Parent Name Usage ID Invalid',
								value: 'parent_name_usage_id_invalid',
							},
							{
								name: 'Partially Parsable',
								value: 'partially_parsable',
							},
							{
								name: 'Published Before Genus',
								value: 'published_before_genus',
							},
							{
								name: 'Rank Invalid',
								value: 'rank_invalid',
							},
							{
								name: 'Relationship Missing',
								value: 'relationship_missing',
							},
							{
								name: 'Scientific Name Assembled',
								value: 'scientific_name_assembled',
							},
							{
								name: 'Species Profile Invalid',
								value: 'species_profile_invalid',
							},
							{
								name: 'Taxonomic Status Invalid',
								value: 'taxonomic_status_invalid',
							},
							{
								name: 'Taxonomic Status Mismatch',
								value: 'taxonomic_status_mismatch ',
							},
							{
								name: 'Unparsable',
								value: 'unparsable',
							},
							{
								name: 'Vernacular Name Invalid',
								value: 'vernacular_name_invalid',
							},
						],
					},
					{
						displayName: 'Name Type',
						name: 'nameType',
						type: 'multiOptions',
						default: [],
						description: 'Filters by the name type',
						options: [
							{
								name: 'Blacklisted',
								value: 'blacklisted',
							},
							{
								name: 'Candidatus',
								value: 'candidatus',
							},
							{
								name: 'Cultivar',
								value: 'cultivar',
							},
							{
								name: 'Doubtful',
								value: 'doubtful',
							},
							{
								name: 'Hybrid',
								value: 'hybrid',
							},
							{
								name: 'Informal',
								value: 'informal',
							},
							{
								name: 'No Name',
								value: 'no_name',
							},
							{
								name: 'OTU',
								value: 'otu',
							},
							{
								name: 'Placeholder',
								value: 'placeholder',
							},
							{
								name: 'Scientific',
								value: 'scientific',
							},
							{
								name: 'Virus',
								value: 'virus',
							},
						],
					},
					{
						displayName: 'Nomenclatural Status',
						name: 'nomenclaturalStatus',
						type: 'multiOptions',
						default: [],
						description: 'Filter by nomenclatural status',
						options: [
							{
								name: 'Aborted',
								value: 'aborted',
							},
							{
								name: 'Alternative',
								value: 'alternative',
							},
							{
								name: 'Ambiguous',
								value: 'ambiguous',
							},
							{
								name: 'Confused',
								value: 'confused',
							},
							{
								name: 'Conserved',
								value: 'conserved',
							},
							{
								name: 'Conserved Proposed',
								value: 'conserved_proposed',
							},
							{
								name: 'Corrected',
								value: 'corrected',
							},
							{
								name: 'Denied',
								value: 'denied',
							},
							{
								name: 'Doubtful',
								value: 'doubtful',
							},
							{
								name: 'Forgotten',
								value: 'forgotten',
							},
							{
								name: 'Illegitimate',
								value: 'illegitimate',
							},
							{
								name: 'Invalid',
								value: 'invalid',
							},
							{
								name: 'Legitimate',
								value: 'legitimate ',
							},
							{
								name: 'New Combination',
								value: 'new_combination',
							},
							{
								name: 'New Genus',
								value: 'new_genus',
							},
							{
								name: 'New Species',
								value: 'new_species',
							},
							{
								name: 'Nudum',
								value: 'nudum',
							},
							{
								name: 'Null Name',
								value: 'null_name',
							},
							{
								name: 'Obscure',
								value: 'obscure',
							},
							{
								name: 'Original Combination',
								value: 'original_combination',
							},
							{
								name: 'Orthographic Variant',
								value: 'orthographic_variant',
							},
							{
								name: 'Protected',
								value: 'protected',
							},
							{
								name: 'Provisional',
								value: 'provisional',
							},
							{
								name: 'Rejected',
								value: 'rejected',
							},
							{
								name: 'Rejected Outright',
								value: 'rejected_outright',
							},
							{
								name: 'Rejected Outright Proposed',
								value: 'rejected_outright_proposed',
							},
							{
								name: 'Rejected Proposed',
								value: 'rejected_proposed',
							},
							{
								name: 'Replacement',
								value: 'replacement',
							},
							{
								name: 'Subnudum',
								value: 'subnudum',
							},
							{
								name: 'Superfluous',
								value: 'superfluous',
							},
							{
								name: 'Suppressed',
								value: 'suppressed',
							},
							{
								name: 'Validly Published',
								value: 'validly_published',
							},
						],
					},
					{
						displayName: 'Rank',
						name: 'rank',
						type: 'options',
						default: 'aberration',
						options: [
							{
								name: 'Aberration',
								value: 'aberration',
							},
							{
								name: 'Biovar',
								value: 'biovar',
							},
							{
								name: 'Chemoform',
								value: 'chemoform',
							},
							{
								name: 'Chemovar',
								value: 'chemovar',
							},
							{
								name: 'Class',
								value: 'class',
							},
							{
								name: 'Cohort',
								value: 'cohort',
							},
							{
								name: 'Convariety',
								value: 'convariety',
							},
							{
								name: 'Cultivar',
								value: 'cultivar',
							},
							{
								name: 'Cultivar Group',
								value: 'cultivar_group',
							},
							{
								name: 'Domain',
								value: 'domain',
							},
							{
								name: 'Family',
								value: 'family',
							},
							{
								name: 'Form',
								value: 'form',
							},
							{
								name: 'Forma Specialis',
								value: 'forma_specialis',
							},
							{
								name: 'Genus',
								value: 'genus',
							},
							{
								name: 'Grandorder',
								value: 'grandorder',
							},
							{
								name: 'Grex',
								value: 'grex',
							},
							{
								name: 'Infraclass',
								value: 'infraclass',
							},
							{
								name: 'Infracohort',
								value: 'infracohort',
							},
							{
								name: 'Infrafamily',
								value: 'infrafamily',
							},
							{
								name: 'Infrageneric Name',
								value: 'infrageneric_name',
							},
							{
								name: 'Infragenus',
								value: 'infragenus',
							},
							{
								name: 'Infrakingdom',
								value: 'infrakingdom',
							},
							{
								name: 'Infralegion',
								value: 'infralegion',
							},
							{
								name: 'Infraorder',
								value: 'infraorder',
							},
							{
								name: 'Infraphylum',
								value: 'infraphylum',
							},
							{
								name: 'Infraspecific Name',
								value: 'infraspecific_name',
							},
							{
								name: 'Infrasubspecific Name',
								value: 'infrasubspecific_name',
							},
							{
								name: 'Infratribe',
								value: 'infratribe',
							},
							{
								name: 'Kingdom',
								value: 'kingdom',
							},
							{
								name: 'Legion',
								value: 'legion',
							},
							{
								name: 'Magnorder',
								value: 'magnorder',
							},
							{
								name: 'Morph',
								value: 'morph',
							},
							{
								name: 'Morphovar',
								value: 'morphovar',
							},
							{
								name: 'Natio',
								value: 'natio',
							},
							{
								name: 'Order',
								value: 'order',
							},
							{
								name: 'Other',
								value: 'other',
							},
							{
								name: 'Parvclass',
								value: 'parvclass',
							},
							{
								name: 'Parvorder',
								value: 'parvorder',
							},
							{
								name: 'Pathovar',
								value: 'pathovar',
							},
							{
								name: 'Phagovar',
								value: 'phagovar',
							},
							{
								name: 'Phylum',
								value: 'phylum',
							},
							{
								name: 'Proles',
								value: 'proles',
							},
							{
								name: 'Race',
								value: 'race',
							},
							{
								name: 'Section',
								value: 'section',
							},
							{
								name: 'Series',
								value: 'series',
							},
							{
								name: 'Serovar',
								value: 'serovar',
							},
							{
								name: 'Species',
								value: 'species',
							},
							{
								name: 'Species Aggregate',
								value: 'species_aggregate',
							},
							{
								name: 'Strain',
								value: 'strain',
							},
							{
								name: 'Subclass',
								value: 'subclass',
							},
							{
								name: 'Subcohort',
								value: 'subcohort',
							},
							{
								name: 'Subfamily',
								value: 'subfamily',
							},
							{
								name: 'Subform',
								value: 'subform',
							},
							{
								name: 'Subgenus',
								value: 'subgenus',
							},
							{
								name: 'Subkingdom',
								value: 'subkingdom',
							},
							{
								name: 'Sublegion',
								value: 'sublegion',
							},
							{
								name: 'Suborder',
								value: 'suborder',
							},
							{
								name: 'Subphylum',
								value: 'subphylum',
							},
							{
								name: 'Subsection',
								value: 'subsection',
							},
							{
								name: 'Subseries',
								value: 'subseries',
							},
							{
								name: 'Subspecies',
								value: 'subspecies',
							},
							{
								name: 'Subtribe',
								value: 'subtribe',
							},
							{
								name: 'Subvariety',
								value: 'subvariety',
							},
							{
								name: 'Superclass',
								value: 'superclass',
							},
							{
								name: 'Supercohort',
								value: 'supercohort',
							},
							{
								name: 'Superfamily',
								value: 'superfamily',
							},
							{
								name: 'Superkingdom',
								value: 'superkingdom',
							},
							{
								name: 'Superlegion',
								value: 'superlegion',
							},
							{
								name: 'Superorder',
								value: 'superorder',
							},
							{
								name: 'Superphylum',
								value: 'superphylum',
							},
							{
								name: 'Supertribe',
								value: 'supertribe',
							},
							{
								name: 'Suprageneric Name',
								value: 'suprageneric_name',
							},
							{
								name: 'Tribe',
								value: 'tribe',
							},
							{
								name: 'Unranked',
								value: 'unranked',
							},
							{
								name: 'Variety',
								value: 'variety',
							},
						],
						description: 'Filters by taxonomic rank',
					},
					{
						displayName: 'Source ID',
						name: 'sourceId',
						type: 'string',
						default: '',
						description: 'Filters by the source identifier',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						default: 'accepted',
						description: 'The taxonomic status of a taxon',
						options: [
							{
								name: 'Accepted',
								value: 'accepted',
							},
							{
								name: 'Doubtful',
								value: 'doubtful',
							},
							{
								name: 'Synonym',
								value: 'synonym',
							},
							{
								name: 'Heterotypic Synonym',
								value: 'heterotypic_synonym',
							},
							{
								name: 'Homotypic Synonym',
								value: 'homotypic_synonym',
							},
							{
								name: 'Proparte Synonym',
								value: 'proparte_synonym',
							},
							{
								name: 'Misapplied',
								value: 'misapplied',
							},
						],
					},
					{
						name: 'threat',
						displayName: 'Threat',
						type: 'multiOptions',
						default: [],
						description: 'Filter by threat status',
						options: [
							{
								name: 'Critically Endangered',
								value: 'critically_endangered',
							},
							{
								name: 'Data Deficient',
								value: 'data_deficient',
							},
							{
								name: 'Endangered',
								value: 'endangered',
							},
							{
								name: 'Extinct',
								value: 'extinct',
							},
							{
								name: 'Extinct In The Wild',
								value: 'extinct_in_the_wild',
							},
							{
								name: 'Least Concern',
								value: 'least_concern',
							},
							{
								name: 'Near Threatened',
								value: 'near_threatened',
							},
							{
								name: 'Not Applicable',
								value: 'not_applicable',
							},
							{
								name: 'Not Evaluated',
								value: 'not_evaluated',
							},
							{
								name: 'Regionally Extinct',
								value: 'regionally_extinct',
							},
							{
								name: 'Vulnerable',
								value: 'vulnerable',
							},
						],
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
							'speciesSuggest',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Dataset Key',
						name: 'datasetKey',
						type: 'string',
						default: '',
						description: 'Filters by the checklist dataset key (a uuid)',
					},
					{
						displayName: 'Rank',
						name: 'rank',
						type: 'options',
						default: 'aberration',
						options: [
							{
								name: 'Aberration',
								value: 'aberration',
							},
							{
								name: 'Biovar',
								value: 'biovar',
							},
							{
								name: 'Chemoform',
								value: 'chemoform',
							},
							{
								name: 'Chemovar',
								value: 'chemovar',
							},
							{
								name: 'Class',
								value: 'class',
							},
							{
								name: 'Cohort',
								value: 'cohort',
							},
							{
								name: 'Convariety',
								value: 'convariety',
							},
							{
								name: 'Cultivar',
								value: 'cultivar',
							},
							{
								name: 'Cultivar Group',
								value: 'cultivar_group',
							},
							{
								name: 'Domain',
								value: 'domain',
							},
							{
								name: 'Family',
								value: 'family',
							},
							{
								name: 'Form',
								value: 'form',
							},
							{
								name: 'Forma Specialis',
								value: 'forma_specialis',
							},
							{
								name: 'Genus',
								value: 'genus',
							},
							{
								name: 'Grandorder',
								value: 'grandorder',
							},
							{
								name: 'Grex',
								value: 'grex',
							},
							{
								name: 'Infraclass',
								value: 'infraclass',
							},
							{
								name: 'Infracohort',
								value: 'infracohort',
							},
							{
								name: 'Infrafamily',
								value: 'infrafamily',
							},
							{
								name: 'Infrageneric Name',
								value: 'infrageneric_name',
							},
							{
								name: 'Infragenus',
								value: 'infragenus',
							},
							{
								name: 'Infrakingdom',
								value: 'infrakingdom',
							},
							{
								name: 'Infralegion',
								value: 'infralegion',
							},
							{
								name: 'Infraorder',
								value: 'infraorder',
							},
							{
								name: 'Infraphylum',
								value: 'infraphylum',
							},
							{
								name: 'Infraspecific Name',
								value: 'infraspecific_name',
							},
							{
								name: 'Infrasubspecific Name',
								value: 'infrasubspecific_name',
							},
							{
								name: 'Infratribe',
								value: 'infratribe',
							},
							{
								name: 'Kingdom',
								value: 'kingdom',
							},
							{
								name: 'Legion',
								value: 'legion',
							},
							{
								name: 'Magnorder',
								value: 'magnorder',
							},
							{
								name: 'Morph',
								value: 'morph',
							},
							{
								name: 'Morphovar',
								value: 'morphovar',
							},
							{
								name: 'Natio',
								value: 'natio',
							},
							{
								name: 'Order',
								value: 'order',
							},
							{
								name: 'Other',
								value: 'other',
							},
							{
								name: 'Parvclass',
								value: 'parvclass',
							},
							{
								name: 'Parvorder',
								value: 'parvorder',
							},
							{
								name: 'Pathovar',
								value: 'pathovar',
							},
							{
								name: 'Phagovar',
								value: 'phagovar',
							},
							{
								name: 'Phylum',
								value: 'phylum',
							},
							{
								name: 'Proles',
								value: 'proles',
							},
							{
								name: 'Race',
								value: 'race',
							},
							{
								name: 'Section',
								value: 'section',
							},
							{
								name: 'Series',
								value: 'series',
							},
							{
								name: 'Serovar',
								value: 'serovar',
							},
							{
								name: 'Species',
								value: 'species',
							},
							{
								name: 'Species Aggregate',
								value: 'species_aggregate',
							},
							{
								name: 'Strain',
								value: 'strain',
							},
							{
								name: 'Subclass',
								value: 'subclass',
							},
							{
								name: 'Subcohort',
								value: 'subcohort',
							},
							{
								name: 'Subfamily',
								value: 'subfamily',
							},
							{
								name: 'Subform',
								value: 'subform',
							},
							{
								name: 'Subgenus',
								value: 'subgenus',
							},
							{
								name: 'Subkingdom',
								value: 'subkingdom',
							},
							{
								name: 'Sublegion',
								value: 'sublegion',
							},
							{
								name: 'Suborder',
								value: 'suborder',
							},
							{
								name: 'Subphylum',
								value: 'subphylum',
							},
							{
								name: 'Subsection',
								value: 'subsection',
							},
							{
								name: 'Subseries',
								value: 'subseries',
							},
							{
								name: 'Subspecies',
								value: 'subspecies',
							},
							{
								name: 'Subtribe',
								value: 'subtribe',
							},
							{
								name: 'Subvariety',
								value: 'subvariety',
							},
							{
								name: 'Superclass',
								value: 'superclass',
							},
							{
								name: 'Supercohort',
								value: 'supercohort',
							},
							{
								name: 'Superfamily',
								value: 'superfamily',
							},
							{
								name: 'Superkingdom',
								value: 'superkingdom',
							},
							{
								name: 'Superlegion',
								value: 'superlegion',
							},
							{
								name: 'Superorder',
								value: 'superorder',
							},
							{
								name: 'Superphylum',
								value: 'superphylum',
							},
							{
								name: 'Supertribe',
								value: 'supertribe',
							},
							{
								name: 'Suprageneric Name',
								value: 'suprageneric_name',
							},
							{
								name: 'Tribe',
								value: 'tribe',
							},
							{
								name: 'Unranked',
								value: 'unranked',
							},
							{
								name: 'Variety',
								value: 'variety',
							},
						],
						description: 'Filters by taxonomic rank',
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
			const apiUrl = 'https://api.gbif.org/v1';

			if (resource === 'collection') {
				if (operation === 'get') {
					const collectionId = this.getNodeParameter('id', i) as string;
					const subResource = this.getNodeParameter('subResource', i) as string;
					const qs: IDataObject = {};

					let idEndpoint = '';
					if (collectionId !== '') {
						idEndpoint = '/' + collectionId;
					}
					let subResourceEndpoint = '';
					if (subResource !== '') {
						subResourceEndpoint = '/' + subResource;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/grscicoll/collection${idEndpoint}${subResourceEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'dataset') {
				if (operation === 'get') {
					const datasetId = this.getNodeParameter('id', i) as string;
					const subResource = this.getNodeParameter('subResource', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					let idEndpoint = '';
					if (datasetId !== '') {
						idEndpoint = '/' + datasetId;
					}
					let subResourceEndpoint = '';
					if (subResource !== '') {
						subResourceEndpoint = '/' + subResource;
					}


					if (additionalFields.country) {
						qs.country = additionalFields.country;
					}
					if (additionalFields.identifier) {
						qs.identifier = additionalFields.identifier;
					}
					if (additionalFields.identifierType) {
						qs.identifierType = additionalFields.identifierType;
					}
					if (additionalFields.machineTagName) {
						qs.machineTagName = additionalFields.machineTagName;
					}
					if (additionalFields.machineTagNamespace) {
						qs.machineTagNamespace = additionalFields.machineTagNamespace;
					}
					if (additionalFields.machineTagValue) {
						qs.machineTagValue = additionalFields.machineTagValue;
					}
					if (additionalFields.q) {
						qs.q = additionalFields.q;
					}
					if (additionalFields.type) {
						qs.type = additionalFields.type;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/dataset${idEndpoint}${subResourceEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'datasetSearch') {
				if (operation === 'get') {
					const q = this.getNodeParameter('q', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					if (q) {
						qs.q = q;
					}

					if (additionalFields.continent) {
						qs.continent = additionalFields.continent;
					}
					if (additionalFields.country) {
						qs.country = additionalFields.country;
					}
					if (additionalFields.decade) {
						qs.decade = additionalFields.decade;
					}
					if (additionalFields.facet) {
						qs.facet = additionalFields.facet;
					}
					if (additionalFields.facetMincount) {
						qs.facetMincount = additionalFields.facetMincount;
					}
					if (additionalFields.hostingCountry) {
						qs.hostingCountry = additionalFields.hostingCountry;
					}
					if (additionalFields.hostingOrg) {
						qs.hostingOrg = additionalFields.hostingOrg;
					}
					if (additionalFields.identifier) {
						qs.identifier = additionalFields.identifier;
					}
					if (additionalFields.identifierType) {
						qs.identifierType = additionalFields.identifierType;
					}
					if (additionalFields.keyword) {
						qs.keyword = additionalFields.keyword;
					}
					if (additionalFields.license) {
						qs.license = additionalFields.license;
					}
					if (additionalFields.networkKey) {
						qs.networkKey = additionalFields.networkKey;
					}
					if (additionalFields.projectId) {
						qs.projectId = additionalFields.projectId;
					}
					if (additionalFields.publishingCountry) {
						qs.publishingCountry = additionalFields.publishingCountry;
					}
					if (additionalFields.publishingOrg) {
						qs.publishingOrg = additionalFields.publishingOrg;
					}
					if (additionalFields.subtype) {
						qs.subtype = additionalFields.subtype;
					}
					if (additionalFields.type) {
						qs.type = additionalFields.type;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/dataset/search`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'installation') {
				if (operation === 'get') {
					const installationId = this.getNodeParameter('id', i) as string;
					const subResource = this.getNodeParameter('subResource', i) as string;
					const qs: IDataObject = {};

					let idEndpoint = '';
					if (installationId !== '') {
						idEndpoint = '/' + installationId;
					}
					let subResourceEndpoint = '';
					if (subResource !== '') {
						subResourceEndpoint = '/' + subResource;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/installation${idEndpoint}${subResourceEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'institution') {
				if (operation === 'get') {
					const institutionId = this.getNodeParameter('id', i) as string;
					const subResource = this.getNodeParameter('subResource', i) as string;
					const qs: IDataObject = {};

					let idEndpoint = '';
					if (institutionId !== '') {
						idEndpoint = '/' + institutionId;
					}
					let subResourceEndpoint = '';
					if (subResource !== '') {
						subResourceEndpoint = '/' + subResource;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/grscicoll/institution${idEndpoint}${subResourceEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'nameParser') {
				if (operation === 'get') {

					const name = this.getNodeParameter('name', i) as string;
					qs.name = name;

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/parser/name`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'network') {
				if (operation === 'get') {
					const networkId = this.getNodeParameter('id', i) as string;
					const subResource = this.getNodeParameter('subResource', i) as string;
					const qs: IDataObject = {};

					let idEndpoint = '';
					if (networkId !== '') {
						idEndpoint = '/' + networkId;
					}
					let subResourceEndpoint = '';
					if (subResource !== '') {
						subResourceEndpoint = '/' + subResource;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/network${idEndpoint}${subResourceEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'node') {
				if (operation === 'get') {
					const nodeId = this.getNodeParameter('id', i) as string;
					const subResource = this.getNodeParameter('subResource', i) as string;
					const qs: IDataObject = {};

					let idEndpoint = '';
					if (nodeId !== '') {
						idEndpoint = '/' + nodeId;
					}
					let subResourceEndpoint = '';
					if (subResource !== '') {
						subResourceEndpoint = '/' + subResource;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/node${idEndpoint}${subResourceEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'occurrence') {
				if (operation === 'get') {
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const id = this.getNodeParameter('id', i) as string;
					const subResource = this.getNodeParameter('subResource', i) as string;
					const qs: IDataObject = {};

					let idEndpoint = '';
					if (id !== '') {
						idEndpoint = '/' + id;
					}
					let datasetEndpoint = '';
					if (additionalFields.datasetKey !== '' && additionalFields.datasetKey != null) {
						datasetEndpoint = '/' + additionalFields.datasetKey;
					}
					let subResourceEndpoint = '';
					if (subResource !== '') {
						subResourceEndpoint = '/' + subResource;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/occurrence${datasetEndpoint}${idEndpoint}${subResourceEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'occurrenceCounts') {
				if (operation === 'get') {
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const subResource = this.getNodeParameter('subResource', i) as string;
					const qs: IDataObject = {};

					if (additionalFields.basisOfRecord) {
						qs.basisOfRecord = additionalFields.basisOfRecord;
					}
					if (additionalFields.country) {
						qs.country = additionalFields.country;
					}
					if (additionalFields.isGeoreferenced) {
						qs.isGeoreferenced = additionalFields.isGeoreferenced;
					}
					if (additionalFields.taxonKey) {
						qs.taxonKey = additionalFields.taxonKey;
					}
					if (additionalFields.publishingCountry) {
						qs.publishingCountry = additionalFields.publishingCountry;
					}
					if (additionalFields.year) {
						qs.year = additionalFields.year;
					}

					let subResourceEndpoint = '';
					if (subResource !== '') {
						subResourceEndpoint = 's/' + subResource;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/occurrence/count${subResourceEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'occurrenceSearch') {
				if (operation === 'get') {
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const q = this.getNodeParameter('q', i) as string;
					const qs: IDataObject = {};

					qs.q = q;

					if (additionalFields.datasetKey) {
						qs.datasetKey = additionalFields.datasetKey;
					}
					if (additionalFields.basisOfRecord) {
						qs.basisOfRecord = additionalFields.basisOfRecord;
					}
					if (additionalFields.catalogNumber) {
						qs.catalogNumber = additionalFields.catalogNumber;
					}
					if (additionalFields.classKey) {
						qs.classKey = additionalFields.classKey;
					}
					if (additionalFields.collectionCode) {
						qs.collectionCode = additionalFields.collectionCode;
					}
					if (additionalFields.continent) {
						qs.continent = additionalFields.continent;
					}
					if (additionalFields.coordinateUncertaintyInMeters) {
						qs.coordinateUncertaintyInMeters = additionalFields.coordinateUncertaintyInMeters;
					}
					if (additionalFields.country) {
						qs.country = additionalFields.country;
					}
					if (additionalFields.crawlId) {
						qs.crawlId = additionalFields.crawlId;
					}
					if (additionalFields.datasetId) {
						qs.datasetId = additionalFields.datasetId;
					}
					if (additionalFields.datasetName) {
						qs.datasetName = additionalFields.datasetName;
					}
					if (additionalFields.decimalLatitude) {
						qs.decimalLatitude = additionalFields.decimalLatitude;
					}
					if (additionalFields.decimalLongitude) {
						qs.decimalLongitude = additionalFields.decimalLongitude;
					}
					if (additionalFields.depth) {
						qs.depth = additionalFields.depth;
					}
					if (additionalFields.elevation) {
						qs.elevation = additionalFields.elevation;
					}
					if (additionalFields.establishmentMeans) {
						qs.establishmentMeans = additionalFields.establishmentMeans;
					}
					if (additionalFields.eventDate) {
						qs.eventDate = additionalFields.eventDate;
					}
					if (additionalFields.eventId) {
						qs.eventId = additionalFields.eventId;
					}
					if (additionalFields.familyKey) {
						qs.familyKey = additionalFields.familyKey;
					}
					if (additionalFields.format) {
						qs.format = additionalFields.format;
					}
					if (additionalFields.fromDate) {
						qs.fromDate = additionalFields.fromDate;
					}
					if (additionalFields.gadmGid) {
						qs.gadmGid = additionalFields.gadmGid;
					}
					if (additionalFields.gadmLevel) {
						qs.gadmLevel = additionalFields.gadmLevel;
					}
					if (additionalFields.gadmLevel0Gid) {
						qs.gadmLevel0Gid = additionalFields.gadmLevel0Gid;
					}
					if (additionalFields.gadmLevel1Gid) {
						qs.gadmLevel1Gid = additionalFields.gadmLevel1Gid;
					}
					if (additionalFields.gadmLevel2Gid) {
						qs.gadmLevel2Gid = additionalFields.gadmLevel2Gid;
					}
					if (additionalFields.gadmLevel3Gid) {
						qs.gadmLevel3Gid = additionalFields.gadmLevel3Gid;
					}
					if (additionalFields.geoDistance) {
						qs.geoDistance = additionalFields.geoDistance;
					}
					if (additionalFields.geometry) {
						qs.geometry = additionalFields.geometry;
					}
					if (additionalFields.hasCoordinate) {
						qs.hasCoordinate = additionalFields.hasCoordinate;
					}
					if (additionalFields.hasGeospatialIssue) {
						qs.hasGeospatialIssue = additionalFields.hasGeospatialIssue;
					}
					if (additionalFields.identifiedBy) {
						qs.identifiedBy = additionalFields.identifiedBy;
					}
					if (additionalFields.identifiedById) {
						qs.identifiedById = additionalFields.identifiedById;
					}
					if (additionalFields.institutionCode) {
						qs.institutionCode = additionalFields.institutionCode;
					}
					if (additionalFields.issue) {
						qs.issue = additionalFields.issue;
					}
					if (additionalFields.kingdomKey) {
						qs.kingdomKey = additionalFields.kingdomKey;
					}
					if (additionalFields.lastInterpreted) {
						qs.lastInterpreted = additionalFields.lastInterpreted;
					}
					if (additionalFields.license) {
						qs.license = additionalFields.license;
					}
					if (additionalFields.limit) {
						qs.limit = additionalFields.limit;
					}
					if (additionalFields.locality) {
						qs.locality = additionalFields.locality;
					}
					if (additionalFields.mediaType) {
						qs.mediaType = additionalFields.mediaType;
					}
					if (additionalFields.modified) {
						qs.modified = additionalFields.modified;
					}
					if (additionalFields.month) {
						qs.month = additionalFields.month;
					}
					if (additionalFields.networkKey) {
						qs.networkKey = additionalFields.networkKey;
					}
					if (additionalFields.occurrenceId) {
						qs.occurrenceId = additionalFields.occurrenceId;
					}
					if (additionalFields.occurrenceStatus) {
						qs.occurrenceStatus = additionalFields.occurrenceStatus;
					}
					if (additionalFields.orderKey) {
						qs.orderKey = additionalFields.orderKey;
					}
					if (additionalFields.organismId) {
						qs.organismId = additionalFields.organismId;
					}
					if (additionalFields.organismQuantity) {
						qs.organismQuantity = additionalFields.organismQuantity;
					}
					if (additionalFields.organismQuantityType) {
						qs.organismQuantityType = additionalFields.organismQuantityType;
					}
					if (additionalFields.otherCatalogNumbers) {
						qs.otherCatalogNumbers = additionalFields.otherCatalogNumbers;
					}
					if (additionalFields.phylumKey) {
						qs.phylumKey = additionalFields.phylumKey;
					}
					if (additionalFields.preparations) {
						qs.preparations = additionalFields.preparations;
					}
					if (additionalFields.programme) {
						qs.programme = additionalFields.programme;
					}
					if (additionalFields.projectId) {
						qs.projectId = additionalFields.projectId;
					}
					if (additionalFields.protocol) {
						qs.protocol = additionalFields.protocol;
					}
					if (additionalFields.publishingCountry) {
						qs.publishingCountry = additionalFields.publishingCountry;
					}
					if (additionalFields.publishingOrg) {
						qs.publishingOrg = additionalFields.publishingOrg;
					}
					if (additionalFields.recordedBy) {
						qs.recordedBy = additionalFields.recordedBy;
					}
					if (additionalFields.recordedById) {
						qs.recordedById = additionalFields.recordedById;
					}
					if (additionalFields.recordNumber) {
						qs.recordNumber = additionalFields.recordNumber;
					}
					if (additionalFields.relativeOrganismQuantity) {
						qs.relativeOrganismQuantity = additionalFields.relativeOrganismQuantity;
					}
					if (additionalFields.repatriated) {
						qs.repatriated = additionalFields.repatriated;
					}
					if (additionalFields.sampleSizeUnit) {
						qs.sampleSizeUnit = additionalFields.sampleSizeUnit;
					}
					if (additionalFields.sampleSizeValue) {
						qs.sampleSizeValue = additionalFields.sampleSizeValue;
					}
					if (additionalFields.samplingProtocol) {
						qs.samplingProtocol = additionalFields.samplingProtocol;
					}
					if (additionalFields.scientificName) {
						qs.scientificName = additionalFields.scientificName;
					}
					if (additionalFields.speciesKey) {
						qs.speciesKey = additionalFields.speciesKey;
					}
					if (additionalFields.stateProvince) {
						qs.stateProvince = additionalFields.stateProvince;
					}
					if (additionalFields.subgenusKey) {
						qs.subgenusKey = additionalFields.subgenusKey;
					}
					if (additionalFields.taxonKey) {
						qs.taxonKey = additionalFields.taxonKey;
					}
					if (additionalFields.toDate) {
						qs.toDate = additionalFields.toDate;
					}
					if (additionalFields.typeStatus) {
						qs.typeStatus = additionalFields.typeStatus;
					}
					if (additionalFields.userCountry) {
						qs.userCountry = additionalFields.userCountry;
					}
					if (additionalFields.verbatimScientificName) {
						qs.verbatimScientificName = additionalFields.verbatimScientificName;
					}
					if (additionalFields.verbatimTaxonId) {
						qs.verbatimTaxonId = additionalFields.verbatimTaxonId;
					}
					if (additionalFields.waterBody) {
						qs.waterBody = additionalFields.waterBody;
					}
					if (additionalFields.year) {
						qs.year = additionalFields.year;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/occurrence/search`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'occurrenceSearchCatalogNumber') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					qs.limit = this.getNodeParameter('limit', i) as number;
					qs.q = this.getNodeParameter('q', i) as string;

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/occurrence/search/catalogNumber`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'occurrenceSearchCollectionCode') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					qs.limit = this.getNodeParameter('limit', i) as number;
					qs.q = this.getNodeParameter('q', i) as string;

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/occurrence/search/collectionCode`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'occurrenceSearchOccurrenceId') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					qs.limit = this.getNodeParameter('limit', i) as number;
					qs.q = this.getNodeParameter('q', i) as string;

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/occurrence/search/occurrenceId`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'occurrenceSearchRecordedBy') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					qs.limit = this.getNodeParameter('limit', i) as number;
					qs.q = this.getNodeParameter('q', i) as string;

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/occurrence/search/recordedBy`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'occurrenceSearchRecordNumber') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					qs.limit = this.getNodeParameter('limit', i) as number;
					qs.q = this.getNodeParameter('q', i) as string;

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/occurrence/search/recordNumber`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'occurrenceSearchInstitutionCode') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					qs.limit = this.getNodeParameter('limit', i) as number;
					qs.q = this.getNodeParameter('q', i) as string;

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/occurrence/search/institutionCode`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'organization') {
				if (operation === 'get') {
					const organizationId = this.getNodeParameter('id', i) as string;
					const subResource = this.getNodeParameter('subResource', i) as string;
					const qs: IDataObject = {};

					let idEndpoint = '';
					if (organizationId !== '') {
						idEndpoint = '/' + organizationId;
					}
					let subResourceEndpoint = '';
					if (subResource !== '') {
						subResourceEndpoint = '/' + subResource;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/organization${idEndpoint}${subResourceEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'species') {
				if (operation === 'get') {

					const taxonId = this.getNodeParameter('id', i) as string;
					const subResource = this.getNodeParameter('subResource', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					let idEndpoint = '';
					if (taxonId !== '') {
						idEndpoint = '/' + taxonId;
					}
					let subResourceEndpoint = '';
					if (subResource !== '') {
						subResourceEndpoint = '/' + subResource;
					}

					if (additionalFields.datasetKey) {
						qs.datasetKey = additionalFields.datasetKey;
					}
					if (additionalFields.facetMincount) {
						qs.facetMincount = additionalFields.facetMincount;
					}

					if (additionalFields.isExtinct) {
						qs.isExtinct = additionalFields.isExtinct;
					}
					if (additionalFields.language) {
						qs.language = additionalFields.language;
					}
					if (additionalFields.q) {
						qs.q = additionalFields.q;
					}
					if (additionalFields.sourceId) {
						qs.sourceId = additionalFields.sourceId;
					}

					let urlParams = '';
					if (additionalFields.facet) {
						urlParams = setUrlParameters('facet', additionalFields.facet as string, urlParams);
					}
					if (additionalFields.habitat) {
						urlParams = setUrlParameters('habitat', additionalFields.habitat as string, urlParams);
					}
					if (additionalFields.issue) {
						urlParams = setUrlParameters('issue', additionalFields.issue as string, urlParams);
					}
					if (additionalFields.nameType) {
						urlParams = setUrlParameters('nameType', additionalFields.nameType as string, urlParams);
					}
					if (additionalFields.nomenclaturalStatus) {
						urlParams = setUrlParameters('nomenclaturalStatus', additionalFields.nomenclaturalStatus as string, urlParams);
					}
					if (additionalFields.rank) {
						urlParams = setUrlParameters('rank', additionalFields.rank as string, urlParams);
					}
					if (additionalFields.status) {
						urlParams = setUrlParameters('status', additionalFields.status as string, urlParams);
					}
					if (additionalFields.threat) {
						urlParams = setUrlParameters('threat', additionalFields.threat as string, urlParams);
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/species${idEndpoint}${subResourceEndpoint}?${urlParams}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);

				}
			} else if (resource === 'speciesSearch') {
				if (operation === 'get') {

					const q = this.getNodeParameter('q', i) as IDataObject;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					qs.q = q;

					if (additionalFields.datasetKey) {
						qs.datasetKey = additionalFields.datasetKey;
					}
					if (additionalFields.facetMincount) {
						qs.facetMincount = additionalFields.facetMincount;
					}
					if (additionalFields.higherTaxonKey) {
						qs.higherTaxonKey = additionalFields.higherTaxonKey;
					}
					if (additionalFields.isExtinct) {
						qs.isExtinct = additionalFields.isExtinct;
					}
					if (additionalFields.rank) {
						qs.rank = additionalFields.rank;
					}
					if (additionalFields.sourceId) {
						qs.sourceId = additionalFields.sourceId;
					}

					let urlParams = '';
					if (additionalFields.facet) {
						urlParams = setUrlParameters('facet', additionalFields.facet as string, urlParams);
					}
					if (additionalFields.habitat) {
						urlParams = setUrlParameters('habitat', additionalFields.habitat as string, urlParams);
					}
					if (additionalFields.issue) {
						urlParams = setUrlParameters('issue', additionalFields.issue as string, urlParams);
					}
					if (additionalFields.nameType) {
						urlParams = setUrlParameters('nameType', additionalFields.nameType as string, urlParams);
					}
					if (additionalFields.nomenclaturalStatus) {
						urlParams = setUrlParameters('nomenclaturalStatus', additionalFields.nomenclaturalStatus as string, urlParams);
					}
					if (additionalFields.status) {
						urlParams = setUrlParameters('status', additionalFields.status as string, urlParams);
					}
					if (additionalFields.threat) {
						urlParams = setUrlParameters('threat', additionalFields.threat as string, urlParams);
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/species/search`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);

				}
			} else if (resource === 'speciesMatch') {
				if (operation === 'get') {

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					if (additionalFields.name) {
						qs.name = additionalFields.name;
					}
					if (additionalFields.rank) {
						qs.rank = additionalFields.rank;
					}

					if (additionalFields.strict) {
						qs.strict = additionalFields.strict;
					}
					if (additionalFields.verbose) {
						qs.verbose = additionalFields.verbose;
					}

					if (additionalFields.kingdom) {
						qs.kingdom = additionalFields.kingdom;
					}
					if (additionalFields.phylum) {
						qs.phylum = additionalFields.phylum;
					}
					if (additionalFields.class) {
						qs.class = additionalFields.class;
					}
					if (additionalFields.order) {
						qs.order = additionalFields.order;
					}
					if (additionalFields.family) {
						qs.family = additionalFields.family;
					}
					if (additionalFields.genus) {
						qs.genus = additionalFields.genus;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/species/match`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'speciesSuggest') {
				if (operation === 'get') {

					const q = this.getNodeParameter('q', i) as IDataObject;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					qs.q = q;

					if (additionalFields.datasetKey) {
						qs.datasetKey = additionalFields.datasetKey;
					}
					if (additionalFields.rank) {
						qs.rank = additionalFields.rank;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/species/suggest`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
