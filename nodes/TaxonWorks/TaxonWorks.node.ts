import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

function setUrlParameters(parameter: string, values: string, urlParams= ''): string {
	values.split(',').forEach((value: string) => {
		urlParams += `&${parameter}=${value}`;
	});
	return urlParams;
}

function objectToString(array: object): string {
	let result = '';
	// @ts-ignore
	for (const item of array) {
		result += `${item},`;
	}
	return result.slice(0, -1);
}

export class TaxonWorks implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'TaxonWorks',
		name: 'taxonWorks',
		icon: 'file:taxonWorks.svg',
		group: ['transform'],
		version: 1,
		description: 'TaxonWorks is an integrated web-based workbench for taxonomists and biodiversity scientists',
		defaults: {
			name: 'TaxonWorks',
			color: '#00cc92',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'taxonWorksUserApi',
				required: true,
			},
			{
				name: 'taxonWorksProjectApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Asserted Distributions',
						value: 'assertedDistributions',
					},
					{
						name: 'Biological Associations',
						value: 'biologicalAssociation',
					},
					{
						name: 'Citations',
						value: 'citations',
					},
					{
						name: 'Collecting Events',
						value: 'collectingEvents',
					},
					{
						name: 'Collection Objects',
						value: 'collectionObjects',
					},
					{
						name: 'Contents',
						value: 'contents',
					},
					{
						name: 'Data Attributes',
						value: 'dataAttributes',
					},
					{
						name: 'Downloads',
						value: 'downloads',
					},
					{
						name: 'Identifiers',
						value: 'identifiers',
					},
					{
						name: 'Images',
						value: 'images',
					},
					{
						name: 'Notes',
						value: 'notes',
					},
					{
						name: 'Observation Matrices',
						value: 'observationMatrices',
					},
					{
						name: 'Observations',
						value: 'observations',
					},
					{
						name: 'OTUs',
						value: 'otus',
					},
					{
						name: 'People',
						value: 'people',
					},
					{
						name: 'Projects',
						value: 'projects',
					},
					{
						name: 'Sources',
						value: 'sources',
					},
					{
						name: 'Taxon Name Classifications',
						value: 'taxonNameClassification',
					},
					{
						name: 'Taxon Name Relationships',
						value: 'taxonNameRelationship',
					},
					{
						name: 'Taxon Names',
						value: 'taxonNames',
					},
				],
				default: 'taxonNames',
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
							'assertedDistributions',
							'biologicalAssociation',
							'citations',
							'collectingEvents',
							'collectionObjects',
							'contents',
							'dataAttributes',
							'downloads',
							'identifiers',
							'images',
							'notes',
							'observationMatrices',
							'observations',
							'otus',
							'people',
							'projects',
							'sources',
							'taxonNameClassification',
							'taxonNameRelationship',
							'taxonNames',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get resource',
					},
				],
				default: 'get',
				description: 'The operation to perform.',
			},
			{
				displayName: 'Server',
				name: 'host',
				type: 'string',
				required: true,
				default:'http://localhost:3000',
				description:'The TaxonWorks server (e.g., https://sfg.taxonworks.org)',
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
							'assertedDistributions',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Geographic Area ID',
						name: 'geographicAreaId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'OTU IDs',
						name: 'otuIds',
						type: 'string',
						default: 'A comma-separated list of OTU IDs (e.g., 1,2,3)',
					},
					{
						displayName: 'Recent',
						name: 'recent',
						type: 'boolean',
						default: '',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
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
							'biologicalAssociation',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Any Global ID',
						name: 'anyGlobalId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Biological Association Object Type',
						name: 'biologicalAssociationObjectType',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Biological Association Subject Type',
						name: 'biologicalAssociationSubjectType',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Biological Relationship ID',
						name: 'biologicalRelationshipId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Object Global ID',
						name: 'objectGlobalId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Subject Global ID',
						name: 'subjectGlobalId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
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
							'citations',
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
						default: '',
					},
					{
						displayName: 'Citation Object ID',
						name: 'citationObjectId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Citation Object Type',
						name: 'citationObjectType',
						type: 'options',
						default: '',
						options: [
							{
								name: 'Asserted Distribution',
								value: 'AssertedDistribution',
							},
							{
								name: 'Biological Association',
								value: 'BiologicalAssociation',
							},
							{
								name: 'Collection Object',
								value: 'CollectionObject',
							},
							{
								name: 'Common Name',
								value: 'CommonName',
							},
							{
								name: 'Image',
								value: 'Image',
							},
							{
								name: 'OTU',
								value: 'Otu',
							},
							{
								name: 'Taxon Name',
								value: 'TaxonName',
							},
							{
								name: 'Taxon Name Classification',
								value: 'TaxonNameClassification',
							},
							{
								name: 'Taxon Name Relationship',
								value: 'TaxonNameRelationship',
							},
							{
								name: 'Type Material',
								value: 'TypeMaterial',
							},
						],
					},
					{
						displayName: 'Original',
						name: 'isOriginal',
						type: 'options',
						options: [
							{
								name: 'Both',
								value: '',
							},
							{
								name: 'True',
								value: 'true',
							},
							{
								name: 'False',
								value: 'false',
							},
						],
						default: '',
					},
					{
						displayName: 'Source ID',
						name: 'sourceId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
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
							'collectingEvents',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Collecting Events Wildcards',
						name: 'collectingEventsWildcards',
						type: 'string',
						default: '',
						description: '',
					},
					{
						displayName: 'Collector IDs',
						name: 'collectorIds',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Collector IDs Or',
						name: 'collectorIdsOr',
						type: 'boolean',
						default: '',
						description: 'Find collecting events with ANY one of these collectors (true) or ALL of these collectors (false)',
					},
					{
						displayName: 'Geo JSON',
						name: 'geoJson',
						type: 'string',
						default: '',
						description: 'geoJSON of the search area. For example, try:\n\n {"type":"Polygon","coordinates":[[[-89.41223144531249,39.86231722624386],[-87.835693359375,39.86231722624386],[-87.835693359375,40.74621655456364],[-89.41223144531249,40.74621655456364],[-89.41223144531249,39.86231722624386]]]}',
					},
					{
						displayName: 'Geographic Area IDs',
						name: 'geographicAreaId',
						type: 'string',
						default: '',
						description: 'List of geographic area IDs for search',
					},
					{
						displayName: 'In Labels Wildcard',
						name: 'inLabels',
						type: 'string',
						default: '',
						description: 'Wildcard wrapped match against any label',
					},
					{
						displayName: 'In Verbatim Locality Wildcard',
						name: 'inVerbatimLocality',
						type: 'string',
						default: '',
						description: 'Wildcard wrapped match against verbatim locality (via attributes)',
					},
					{
						displayName: 'Keyword IDs And',
						name: 'keywordIdAnd',
						type: 'string',
						default: '',
						description: 'List of keyword IDs for associated collecting events where all enumerated keywords are present',
					},
					{
						displayName: 'Keyword IDs Or',
						name: 'keywordIdOr',
						type: 'string',
						default: '',
						description: 'List of keyword IDs for associated collecting events where any of the enumerated keywords are present.',
					},
					{
						displayName: 'MD5 Verbatim Labels',
						name: 'md5VerbatimLabels',
						type: 'string',
						default: '',
					},
					{
						displayName: 'OTU IDs',
						name: 'otuIds',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Recent',
						name: 'recent',
						type: 'options',
						options: [
							{
								name: 'Both',
								value: '',
							},
							{
								name: 'True',
								value: 'true',
							},
							{
								name: 'False',
								value: 'false',
							},
						],
						default: '',
						description: 'Include metadata for recent searches',
					},
					{
						displayName: 'Spatial Geographic Areas',
						name: 'spatialGeographicAreas',
						type: 'boolean',
						default: '',
						description: 'Find CollectingEvents having spatial geographic areas',
					},
					{
						displayName: 'Well Known Text',
						name: 'wkt',
						type: 'string',
						default: '',
						description: 'Well Known Text describing the search area',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
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
							'collectionObjects',
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
						default: '',
						description: 'A collection object ID',
					},
					{
						displayName: 'Ancestor ID',
						name: 'ancestorId',
						type: 'string',
						default: '',
						description: 'Include OTU ancestor in search',
					},
					{
						displayName: 'Biocuration Class IDs',
						name: 'biocurationClassId',
						type: 'string',
						default: '',
						description: 'Include metadata for biocuration classes by ID',
					},
					{
						displayName: 'Biocuration Relationship IDs',
						name: 'biocurationRelationshipId',
						type: 'string',
						default: '',
						description: 'Include metadata biological relationships by ID',
					},
					{
						displayName: 'Buffered Collecting Event',
						name: 'bufferedCollectingEvent',
						type: 'string',
						default: '',
						description: 'Include data where collecting event information contains this text value',
					},
					{
						displayName: 'Buffered Determinations',
						name: 'bufferedDeterminations',
						type: 'string',
						default: '',
						description: 'Include data where determination contains this text value',
					},
					{
						displayName: 'Buffered Other Labels',
						name: 'bufferedOtherLabels',
						type: 'string',
						default: '',
						description: 'Include data where other labels information contains this text value',
					},
					{
						displayName: 'Collecting Event',
						name: 'collectingEvent',
						type: 'boolean',
						default: '',
					},
					{
						displayName: 'Collecting Event IDs',
						name: 'collectingEventIds',
						type: 'string',
						default: '',
						description: 'List of IDs for associated collecting events',
					},
					{
						displayName: 'Collection Object Type',
						name: 'collectionObjectType',
						type: 'string',
						default: '',
						description: 'Type of collection object (e.g., "Specimen")',
					},
					{
						displayName: 'Collector IDs',
						name: 'collectorIds',
						type: 'string',
						default: '',
						description: 'IDs for collectors to be included in the search',
					},
					{
						displayName: 'Collector IDs Or',
						name: 'collectorIdsOr',
						type: 'boolean',
						default: '',
						description: 'IDs for any of the collectors are to be included in the search',
					},
					{
						displayName: 'Current Determinations',
						name: 'currentDeterminations',
						type: 'boolean',
						default: '',
						description: 'Include metadata for current determinations',
					},
					{
						displayName: 'Depictions',
						name: 'depictions',
						type: 'boolean',
						default: '',
						description: 'Include metadata for depicted objects',
					},
					{
						displayName: 'Determiner IDs',
						name: 'determinerIds',
						type: 'string',
						default: '',
						description: 'Include results which are related to any of these determiners (by ID)',
					},
					{
						displayName: 'Determiner IDs Or',
						name: 'determinerIdsOr',
						type: 'boolean',
						default: '',
						description: 'Include results from any of the determiner IDs',
					},
					{
						displayName: 'Darwin Core Indexed',
						name: 'determinerIds',
						type: 'boolean',
						default: '',
						description: 'Include metadata for Darwin Core indexed objects',
					},
					{
						displayName: 'End Date',
						name: 'endDate',
						type: 'dateTime',
						default: '',
						description: 'Limit search to dates prior to this value',
					},
					{
						displayName: 'Extract Buffered Collecting Event',
						name: 'exactBufferedCollectingEvent',
						type: 'string',
						default: '',
						description: 'Include data where collecting event information contains this exact text value',
					},
					{
						displayName: 'Extract Buffered Determinations',
						name: 'exactBufferedDeterminations',
						type: 'dateTime',
						default: '',
						description: 'Include data where determinations information contains this exact text value',
					},
					{
						displayName: 'Extract Buffered Other Labels',
						name: 'exactBufferedOtherLabels',
						type: 'dateTime',
						default: '',
						description: 'Include data where other labels information contains this exact text value',
					},
					{
						displayName: 'Geo JSON',
						name: 'geoJson',
						type: 'string',
						default: '',
						description: 'geoJSON of the search area. For example, try:\n\n {"type":"Polygon","coordinates":[[[-89.41223144531249,39.86231722624386],[-87.835693359375,39.86231722624386],[-87.835693359375,40.74621655456364],[-89.41223144531249,40.74621655456364],[-89.41223144531249,39.86231722624386]]]}',
					},
					{
						displayName: 'Geographic Area',
						name: 'geographicArea',
						type: 'boolean',
						default: '',
						description: 'Find if associated collecting event has a geographic area. Ignored if param not present',
					},
					{
						displayName: 'Geographic Area IDs',
						name: 'geographicAreaId',
						type: 'string',
						default: '',
						description: 'List of IDs for associated geographic areas',
					},
					{
						displayName: 'Georeferences',
						name: 'georeferences',
						type: 'boolean',
						default: '',
						description: 'Include metadata for associated collecting event georeferences',
					},
					{
						displayName: 'Identifier',
						name: 'identifier',
						type: 'string',
						default: '',
						description: 'Identifier associated with collection object',
					},
					{
						displayName: 'Identifier End',
						name: 'identifierEnd',
						type: 'string',
						default: '',
						description: 'Last part of identifier associated with collection object',
					},
					{
						displayName: 'Identifier Exact',
						name: 'identifierExact',
						type: 'string',
						default: '',
						description: 'Exact identifier associated with collection object',
					},
					{
						displayName: 'Identifier Start',
						name: 'identifierStart',
						type: 'string',
						default: '',
						description: 'First part of identifier associated with collection object',
					},
					{
						displayName: 'Identifiers',
						name: 'identifiers',
						type: 'boolean',
						default: '',
						description: 'Include metadata for associated collecting event identifiers',
					},
					{
						displayName: 'In Labels',
						name: 'inLabels',
						type: 'boolean',
						default: '',
						description: 'Search wildcard in all related collecting event labels',
					},
					{
						displayName: 'In Verbatim Locality',
						name: 'inVerbatimLocality',
						type: 'boolean',
						default: '',
						description: 'Search in verbatim locality in related collecting events',
					},
					{
						displayName: 'Is Type',
						name: 'isType',
						type: 'string',
						default: '',
						description: 'Include metadata for primary types by IDs',
					},
					{
						displayName: 'Keyword ID And',
						name: 'keywordIdAnd',
						type: 'string',
						default: '',
						description: 'Search must include all keyword IDs',
					},
					{
						displayName: 'Keyword ID Or',
						name: 'keywordIdOr',
						type: 'string',
						default: '',
						description: 'Search may include any of these keyword IDs',
					},
					{
						displayName: 'Loaned',
						name: 'loaned',
						type: 'boolean',
						default: '',
						description: 'Include metadata for loaned (borrowed) objects',
					},
					{
						displayName: 'MD5 Verbatim Labels',
						name: 'md5VerbatimLabels',
						type: 'string',
						default: '',
						description: 'Match MD5 verbatim label if in_labels is true',
					},
					{
						displayName: 'Namespace ID',
						name: 'namespaceId',
						type: 'string',
						default: '',
						description: 'Include metadata for associated identifier namespace by ID',
					},
					{
						displayName: 'Never Loaned',
						name: 'neverLoaned',
						type: 'boolean',
						default: '',
						description: 'Include metadata for collection objects never loaned',
					},
					{
						displayName: 'On Loan',
						name: 'onLoan',
						type: 'boolean',
						default: '',
						description: 'Include metadata for collection objects on loan',
					},
					{
						displayName: 'OTU IDs',
						name: 'otuIds',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Partial Overlap Dates',
						name: 'partialOverlapDates',
						type: 'boolean',
						default: '',
						description: 'Allow date overlaps',
					},
					{
						displayName: 'Preparation Type IDs',
						name: 'preparationTypeIds',
						type: 'string',
						default: '',
						description: 'The IDs for preparation types in the search',
					},
					{
						displayName: 'Project ID',
						name: 'projectId',
						type: 'string',
						default: '',
						description: 'The ID for the project to search',
					},
					{
						displayName: 'Radius',
						name: 'radius',
						type: 'string',
						default: '',
						description: 'Radius around location',
					},
					{
						displayName: 'Repository',
						name: 'repository',
						type: 'boolean',   // TODO: TW doc wrong on type?
						default: '',
						description: 'Include metadata for repository',
					},
					{
						displayName: 'Repository ID',
						name: 'repositoryId',
						type: 'string',
						default: '',
						description: 'Include metadata for repository by ID',
					},
					{
						displayName: 'SLED Image ID',
						name: 'sledImageId',
						type: 'string',
						default: '',
						description: 'Include metadata for SLED images by ID',
					},
					{
						displayName: 'Spatial Geographic Areas',
						name: 'spatialGeographicAreas',
						type: 'boolean',
						default: '',
						description: 'Find if associated collecting event has a geographic area. Ignored if param not present.',
					},
					{
						displayName: 'Start Date',
						name: 'startDate',
						type: 'dateTime',
						default: '',
						description: 'Limit search to dates later',
					},
					{
						displayName: 'Taxon Determinations',
						name: 'taxonDeterminations',
						type: 'boolean',
						default: '',
						description: 'Include taxon determinations',
					},
					{
						displayName: 'Type Material',
						name: 'typeMaterial',
						type: 'boolean',
						default: '',
						description: 'Include type material',
					},
					{
						displayName: 'Type Specimen Taxon Name ID',
						name: 'typeSpecimenTaxonNameID',
						type: 'string',
						default: '',
						description: 'Include metadata for specific type taxon by ID',
					},
					{
						displayName: 'User Date End',
						name: 'userDateEnd',
						type: 'dateTime',
						default: '',
						description: 'Limit search to user dates prior',
					},
					{
						displayName: 'User Date Start',
						name: 'userDateStart',
						type: 'dateTime',
						default: '',
						description: 'Limit search to user dates later',
					},
					{
						displayName: 'User ID',
						name: 'userId',
						type: 'string',
						default: '',
						description: 'ID of the user for date ranges',
					},
					{
						displayName: 'User Target',
						name: 'userTarget',
						type: 'options',
						default: '',
						options: [
							{
								name: 'Created',
								value: 'created',
							},
							{
								name: 'Updated',
								value: 'updated',
							},
						],
						description: 'ID of the user for date ranges',
					},
					{
						displayName: 'Validity',
						name: 'validity',
						type: 'boolean',
						default: '',
						description: 'Include metadata for valid. Used only in conjunction with ancestor_id.',
					},
					{
						displayName: 'With Buffered Collecting Event',
						name: 'withBufferedCollectingEvent',
						type: 'boolean',
						default: '',
						description: 'Return collection object with buffered collecting event',
					},
					{
						displayName: 'With Buffered Determinations',
						name: 'withBufferedDeterminations',
						type: 'boolean',
						default: '',
						description: 'Return collection object with buffered determinations',
					},
					{
						displayName: 'With Buffered Other Labels',
						name: 'withBufferedOtherLabels',
						type: 'boolean',
						default: '',
						description: 'Return collection object with buffered other labels',
					},
					{
						displayName: 'Well Known Text',
						name: 'wkt',
						type: 'string',
						default: '',
						description: 'Well Known Text describing the search area',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
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
							'contents',
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
						default: '',
					},
					{
						displayName: 'Citations',
						name: 'citations',
						type: 'boolean',
						default: 'false',
					},
					{
						displayName: 'Depictions',
						name: 'depictions',
						type: 'boolean',
						default: 'false',
					},
					{
						displayName: 'Exact',
						name: 'exact',
						type: 'boolean',
						default: 'false',
					},
					{
						displayName: 'OTU ID',
						name: 'otuIds',
						type: 'string',
						default: '',
						description: 'A comma-separated list of OTU IDs (e.g., 1,2,3)',
					},
					{
						displayName: 'Text',
						name: 'text',
						type: 'string',
						default: '',
						description: 'Text string to be searched for in the contents',
					},
					{
						displayName: 'Topic ID',
						name: 'topicIds',
						type: 'string',
						default: '',
						description: 'A comma-separated list of topic IDs (e.g. 1,2,3)',
					},
					{
						displayName: 'User Date Start',
						name: 'userDateStart',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'User Date End',
						name: 'userDateEnd',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'User Target',
						name: 'userTarget',
						type: 'options',
						options: [
							{
								name: 'Created',
								value: 'created',
							},
							{
								name: 'Updated',
								value: 'updated',
							},
						],
						default: 'updated',
					},
					{
						displayName: 'User ID',
						name: 'userId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
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
							'dataAttributes',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
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
							'downloads',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						name: 'id',
						value: '',
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
							'identifiers',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Identifier',
						name: 'identifier',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Identifier Object IDs',
						name: 'identifierObjectId',
						type: 'string',
						default: '',
						description: 'A comma-separated list of IDs (e.g., 1,2,3)',
					},
					{
						displayName: 'Identifier Object Types',
						name: 'identifierObjectType',
						type: 'string',
						default: '',
						description: 'A comma-separated list of object types',
					},
					{
						displayName: 'Namespace ID',
						name: 'namespaceId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Namespace Name',
						name: 'namespaceName',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Namespace Short Name',
						name: 'namespaceShortName',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Object Global ID',
						name: 'objectGlobalID',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
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
							'images',
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
						default: '',
					},
					{
						displayName: 'Ancestor ID Target',
						name: 'ancestorIdTarget',
						type: 'string',
						default: 'The object class of ancestor (e.g., OTU)',
					},
					{
						displayName: 'Biocuration Class IDs',
						name: 'biocurationClassIds',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Collection Object IDs',
						name: 'collectionObjectIds',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Depiction',
						name: 'depiction',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Identifier',
						name: 'identifier',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Identifier Start',
						name: 'identifierStart',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Identifier End',
						name: 'identifierEnd',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Identifier Exact',
						name: 'identifierEnd',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Image IDs',
						name: 'imageIds',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Keyword IDs And',
						name: 'keywordIdsAnd',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Keyword IDs Or',
						name: 'keywordIdsOr',
						type: 'string',
						default: '',
					},
					{
						displayName: 'OTU IDs',
						name: 'otuIds',
						type: 'string',
						default: '',
					},
					{
						displayName: 'SLED Image IDs',
						name: 'sledImageIds',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Taxon Name IDs',
						name: 'taxonNameIds',
						type: 'string',
						default: '',
					},
					{
						displayName: 'User Date Start',
						name: 'userDateStart',
						type: 'string',
						default: '',
					},
					{
						displayName: 'User Date End',
						name: 'userDateEnd',
						type: 'string',
						default: '',
					},
					{
						displayName: 'User ID',
						name: 'userId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'User Target',
						name: 'userTarget',
						type: 'options',
						options: [
							{
								name: 'Created',
								value: 'created',
							},
							{
								name: 'Updated',
								value: 'updated',
							},
						],
						default: 'updated',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Per',
						name: 'Per',
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
							'notes',
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
						default: '',
						description: 'Note ID',
					},
					{
						displayName: 'Note Object IDs',
						name: 'noteObjectIds',
						type: 'string',
						default: '',
						description: 'Comma-separated IDs for the note objects (e.g., 1,2,3)',
					},
					{
						displayName: 'Note Object Types',
						name: 'noteObjectTypes',
						type: 'multiOptions',
						options: [
							{
								name: 'Asserted Distribution',
								value: 'AssertedDistribution',
							},
							{
								name: 'Attribution',
								value: 'Attribution',
							},
							{
								name: 'Biological Association',
								value: 'BiologicalAssociation',
							},
							{
								name: 'Biological Relationship',
								value: 'BiologicalRelationship',
							},
							{
								name: 'Character State',
								value: 'CharacterState',
							},
							{
								name: 'Citation',
								value: 'Citation',
							},
							{
								name: 'Collecting Event',
								value: 'CollectingEvent',
							},
							{
								name: 'Collection Object Observation',
								value: 'CollectionObjectObservation',
							},
							{
								name: 'Collection Object',
								value: 'CollectionObject',
							},
							{
								name: 'Collection Profile',
								value: 'CollectionProfile',
							},
							{
								name: 'Common Name',
								value: 'CommonName',
							},
							{
								name: 'Descriptor',
								value: 'Descriptor',
							},
							{
								name: 'Documentation',
								value: 'Documentation',
							},
							{
								name: 'Document',
								value: 'Document',
							},
							{
								name: 'Gene Attribute',
								value: 'GeneAttribute',
							},
							{
								name: 'Georeference',
								value: 'Georeference',
							},
							{
								name: 'Image',
								value: 'Image',
							},
							{
								name: 'Label',
								value: 'Label',
							},
							{
								name: 'Loan Item',
								value: 'LoanItem',
							},
							{
								name: 'Loan',
								value: 'Loan',
							},
							{
								name: 'Observation Matrix Column Item',
								value: 'ObservationMatrixColumnItem',
							},
							{
								name: 'Observation Matrix Column',
								value: 'ObservationMatrixColumn',
							},
							{
								name: 'Observation Matrix',
								value: 'ObservationMatrix',
							},
							{
								name: 'Observation Matrix Row Item',
								value: 'ObservationMatrixRowItem',
							},
							{
								name: 'Observation Matrix Row',
								value: 'ObservationMatrixRow',
							},
							{
								name: 'Observation',
								value: 'Observation',
							},
							{
								name: 'Organization',
								value: 'Organization',
							},
							{
								name: 'OTU',
								value: 'Otu',
							},
							{
								name: 'Person',
								value: 'Person',
							},
							{
								name: 'Repository',
								value: 'Repository',
							},
							{
								name: 'Sequence',
								value: 'Sequence',
							},
							{
								name: 'Sequence Relationship',
								value: 'SequenceRelationship',
							},
							{
								name: 'Serial',
								value: 'Serial',
							},
							{
								name: 'SLED Image',
								value: 'SledImage',
							},
							{
								name: 'Source',
								value: 'Source',
							},
							{
								name: 'Sqed Depiction',
								value: 'SqedDepiction',
							},
							{
								name: 'Taxon Determination',
								value: 'TaxonDetermination',
							},
							{
								name: 'Taxon Name Classification',
								value: 'TaxonNameClassification',
							},
							{
								name: 'Taxon Name',
								value: 'TaxonName',
							},
							{
								name: 'Taxon Name Relationship',
								value: 'TaxonNameRelationship',
							},
							{
								name: 'Type Material',
								value: 'TypeMaterial',
							},
							{
								name: 'User',
								value: 'User',
							},
						],
						default: '',
						description: 'Object type for the note',
					},
					{
						displayName: 'Object Global ID',
						name: 'objectGlobalId',
						type: 'string',
						default: '',
						description: 'Identifier for the note\'s source',
					},
					{
						displayName: 'Text',
						name: 'text',
						type: 'string',
						default: '',
						description: 'Text string to search for in notes',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
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
							'observations',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Collection Object ID',
						name: 'collectionObjectId',
						type: 'string',
						default: '',
						description: 'Identifier for the collection object for which the observation is made',
					},
					{
						displayName: 'Descriptor ID',
						name: 'descriptorId',
						type: 'string',
						default: '',
						description: 'Identifier for the descriptor',
					},
					{
						displayName: 'Observation Object Global ID',
						name: 'observationObjectGlobalId',
						type: 'string',
						default: '',
						description: 'Identifier for the observation object global ID for which the observation was made.',
					},
					{
						displayName: 'OTU ID',
						name: 'otuId',
						type: 'string',
						default: '',
						description: 'Identifier for the otu for which the observation is made',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
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
							'observationMatrices',
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
						default: '',
					},
					{
						displayName: 'Observation Matrix IDs',
						name: 'observationMatrixIds',
						type: 'string',
						default: '',
						description: 'A comma-separated list of observation matrix IDs (e.g., 1,2,3)',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
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
							'otus',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Biological Association IDs',
						name: 'biologicalAssociationIds',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Data Attributes',
						name: 'dataAttributes',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Label of the OTU',
					},
					{
						displayName: 'OTU ID',
						name: 'otuId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'OTU IDs',
						name: 'otuIds',
						type: 'string',
						default: '',
						description: 'Comma-separated list of OTU IDs (e.g., 1,2,3',
					},
					{
						displayName: 'Taxon Name Classification IDs',
						name: 'taxonNameClassificationIds',
						type: 'string',
						default: '',
						description: 'Comma-separated list of taxon name classification IDs (e.g., 1,2,3)',
					},
					{
						displayName: 'Taxon Name IDs',
						name: 'taxonNameIds',
						type: 'string',
						default: '',
						description: 'Comma-separated list of taxon name IDs (e.g., 1,2,3)',
					},
					{
						displayName: 'Taxon Name Relationship IDs',
						name: 'taxonNameRelationshipIds',
						type: 'string',
						default: '',
						description: 'Comma-separated list of taxon name relationship IDs (e.g., 1,2,3)',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
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
							'people',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Active After Year',
						name: 'activeAfterYear',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Active Before Year',
						name: 'activeBeforeYear',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Born After Year',
						name: 'bornAfterYear',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Born Before Year',
						name: 'bornBeforeYear',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Died After Year',
						name: 'diedAfterYear',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Died Before Year',
						name: 'diedBeforeYear',
						type: 'number',
						default: '',
					},
					{
						displayName: 'First Name',
						name: 'firstName',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Last Name',
						name: 'lastName',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Last Name Starts With',
						name: 'lastNameStartsWith',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Levenshtein Cutoff',
						name: 'levenshtenCuttoff',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Person Wildcard',
						name: 'personWildcard',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Role',
						name: 'role',
						type: 'multiOptions',
						default: '',
						options: [
							{
								name: 'Accession Provider',
								value: 'AccessionProvider',
							},
							{
								name: 'Attribution Copyright Holder',
								value: 'AttributionCopyrightHolder',
							},
							{
								name: 'Attribution Creator',
								value: 'AttributionCreator',
							},
							{
								name: 'Attribution Editor',
								value: 'AttributionEditor',
							},
							{
								name: 'Attribution Owner',
								value: 'AttributionOwner',
							},
							{
								name: 'Collector',
								value: 'Collector',
							},
							{
								name: 'Deaccession Recipient',
								value: 'DeaccessionRecipient',
							},
							{
								name: 'Determiner',
								value: 'Determiner',
							},
							{
								name: 'Extractor',
								value: 'Extractor',
							},
							{
								name: 'Georeferencer',
								value: 'Georeferencer',
							},
							{
								name: 'Loan Recipient',
								value: 'LoanRecipient',
							},
							{
								name: 'Loan Supervisor',
								value: 'LoanSupervisor',
							},
							{
								name: 'Source Author',
								value: 'SourceAuthor',
							},
							{
								name: 'Source Editor',
								value: 'SourceEditor',
							},
							{
								name: 'Source Source',
								value: 'SourceSource',
							},
							{
								name: 'Taxon Name Author',
								value: 'TaxonNameAuthor',
							},
							{
								name: 'Verifier',
								value: 'Verifier',
							},
						],
					},
					{
						displayName: 'Source ID',
						name: 'sourceId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
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
							'sources',
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
						default: '',
						description: 'The source ID',
					},
					{
						displayName: 'Author',
						name: 'author',
						type: 'string',
						default: '',
						description: 'Filter by author name',
					},
					{
						displayName: 'Author IDs',
						name: 'authorIds',
						type: 'string',
						default: '',
						description: 'Comma-separated list of author IDs (e.g., 1,2,3)',
					},
					{
						displayName: 'Citations',
						name: 'citations',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Documents',
						name: 'documents',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Exact Author',
						name: 'exactAuthor',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Exact Title',
						name: 'exactTitle',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Identifier',
						name: 'identifier',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Identifier Start',
						name: 'identifierStart',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Identifier End',
						name: 'identifierEnd',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Identifier Exact',
						name: 'identifierExact',
						type: 'string',
						default: '',
					},
					{
						displayName: 'IDs',
						name: 'ids',
						type: 'string',
						default: '',
						description: 'A comma-separated list of IDs (e.g., 1,2,3)',
					},
					{
						displayName: 'In Project',
						name: 'inProject',
						type: 'boolean',
						default: '',
					},
					{
						displayName: 'Keyword ID And',
						name: 'keywordIdAnd',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Keyword ID Or',
						name: 'keywordIdOr',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Nomenclature',
						name: 'nomenclature',
						type: 'boolean',
						default: '',
					},
					{
						displayName: 'Notes',
						name: 'notes',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Project ID',
						name: 'projectId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Recent',
						name: 'recent',
						type: 'boolean',
						default: '',
					},
					{
						displayName: 'Roles',
						name: 'roles',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Source Type',
						name: 'sourceType',
						type: 'options',
						default: '',
						options: [
							{
								name: 'BibTex',
								value: 'Source::Bibtex',
							},
							{
								name: 'Human',
								value: 'Source::Human',
							},
							{
								name: 'Verbatim',
								value: 'Source::Verbatim',
							},
						],
						description: '',
					},
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Topic IDs',
						name: 'topicIds',
						type: 'string',
						default: '',
					},
					{
						displayName: 'With DOI',
						name: 'withDoi',
						type: 'boolean',
						default: '',
					},
					{
						displayName: 'User Date Start',
						name: 'userDateStart',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'User Date End',
						name: 'userDateEnd',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Year Start',
						name: 'yearStart',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Year End',
						name: 'yearEnd',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
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
							'taxonNameClassification',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Taxon Name IDs',
						name: 'taxonNameId',
						type: 'string',
						default: '',
						description: 'A comma-separated list of IDs (e.g., 1,2,3)',
					},
					{
						displayName: 'Taxon Name Classification Type',
						name: 'taxonNameClassificationType',
						type: 'multiOptions',
						options: [
							{
								name: 'ICZN Available',
								value: 'TaxonNameClassification::Iczn::Available',
							},
							{
								name: 'ICZN Invalid',
								value: 'TaxonNameClassification::Iczn::Available::Invalid',
							},
							{
								name: 'ICZN Homonym',
								value: 'TaxonNameClassification::Iczn::Available::Invalid::Homonym',
							},
							{
								name: 'ICZN Homonymy of Type Genus',
								value: 'TaxonNameClassification::Iczn::Available::Invalid::HomonymyOfTypeGenus',
							},
							{
								name: 'ICZN Suppression of Type Genus',
								value: 'TaxonNameClassification::Iczn::Available::Invalid::SuppressionOfTypeGenus',
							},
							{
								name: 'ICZN Synonymy of Type Genus Before 1961',
								value: 'TaxonNameClassification::Iczn::Available::Invalid::SynonymyOfTypeGenusBefore1961',
							},
							{
								name: 'ICZN Official List of Family Group Names in Zoology',
								value: 'TaxonNameClassification::Iczn::Available::OfficialListOfFamilyGroupNamesInZoology',
							},
							{
								name: 'ICZN Official List of Generic Names in Zoology',
								value: 'TaxonNameClassification::Iczn::Available::OfficialListOfGenericNamesInZoology',
							},
							{
								name: 'ICZN Official List of Specific Names in Zoology',
								value: 'TaxonNameClassification::Iczn::Available::OfficialListOfSpecificNamesInZoology',
							},
							{
								name: 'ICZN Official List of Works Approved as Available',
								value: 'TaxonNameClassification::Iczn::Available::OfficialListOfWorksApprovedAsAvailable',
							},
							{
								name: 'ICZN Valid',
								value: 'TaxonNameClassification::Iczn::Available::Valid',
							},
							{
								name: 'ICZN Nomen Dubium',
								value: 'TaxonNameClassification::Iczn::Available::Valid::NomenDubium',
							},
							{
								name: 'ICZN Nomen Inquirendum',
								value: 'TaxonNameClassification::Iczn::Available::Valid::NomenInquirendum',
							},
							{
								name: 'ICZN Collective Group',
								value: 'TaxonNameClassification::Iczn::CollectiveGroup',
							},
							{
								name: 'ICN Effectively Published',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished',
							},
							{
								name: 'ICN Invalidly Published',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::InvalidlyPublished',
							},
							{
								name: 'ICN as Synonym',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::InvalidlyPublished::AsSynonym',
							},
							{
								name: 'ICN Nomen Nudum',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::InvalidlyPublished::NomenNudum',
							},
							{
								name: 'ICN Non-Binomial',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::InvalidlyPublished::NonBinomial',
							},
							{
								name: 'ICN Not Latin',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::InvalidlyPublished::NotLatin',
							},
							{
								name: 'ICN Provisional',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::InvalidlyPublished::Provisional',
							},
							{
								name: 'ICN Rejected Publication',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::InvalidlyPublished::RejectedPublication',
							},
							{
								name: 'ICN Tautonym',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::InvalidlyPublished::Tautonym',
							},
							{
								name: 'ICN Validly Published',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished',
							},
							{
								name: 'ICN Illegitimate',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Illegitimate',
							},
							{
								name: 'ICN Homonym',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Illegitimate::Homonym',
							},
							{
								name: 'ICN Incorrect Original Spelling',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Illegitimate::IncorrectOriginalSpelling',
							},
							{
								name: 'ICN Superfluous',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Illegitimate::Superfluous',
							},
							{
								name: 'ICN Legitimate',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate',
							},
							{
								name: 'ICN Adopted By Person',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::AdoptedByPersoon',
							},
							{
								name: 'ICN Autonym',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::Autonym',
							},
							{
								name: 'ICN Conserved',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::Conserved',
							},
							{
								name: 'ICN Conserved Spelling',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::ConservedSpelling',
							},
							{
								name: 'ICN Correct',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::Correct',
							},
							{
								name: 'ICN Incorrect',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::Incorrect',
							},
							{
								name: 'ICN Nomen Novum',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::NomenNovum',
							},
							{
								name: 'ICN Nothotaxon',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::Nothotaxon',
							},
							{
								name: 'ICN Official List',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::OfficialList',
							},
							{
								name: 'ICN Sanctioned',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::Sanctioned',
							},
							{
								name: 'ICNP Effectively Published',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished',
							},
							{
								name: 'ICNP Invalidly Published',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::InvalidlyPublished',
							},
							{
								name: 'ICNP Nomen Nudum',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::InvalidlyPublished::NomenNudum',
							},
							{
								name: 'ICNP Validly Published',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished',
							},
							{
								name: 'ICNP Illegitimate',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Illegitimate',
							},
							{
								name: 'ICNP Homonym',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Illegitimate::Homonym',
							},
							{
								name: 'ICNP Not in Official List',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Illegitimate::NotInOfficialList',
							},
							{
								name: 'ICNP Rejected',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Illegitimate::Rejected',
							},
							{
								name: 'ICNP Legitimate',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Legitimate',
							},
							{
								name: 'ICNP Candidatus',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Legitimate::Candidatus',
							},
							{
								name: 'ICNP Correct',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Legitimate::Correct',
							},
							{
								name: 'ICNP Incorrect',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Legitimate::Incorrect',
							},
							{
								name: 'ICNP Nomen Novum',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Legitimate::NomenNovum',
							},
							{
								name: 'ICNP Official List',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Legitimate::OfficialList',
							},
							{
								name: 'ICZN Fossil',
								value: 'TaxonNameClassification::Iczn::Fossil',
							},
							{
								name: 'ICZN Ichnotaxon',
								value: 'TaxonNameClassification::Iczn::Fossil::Ichnotaxon',
							},
							{
								name: 'ICN Fossil',
								value: 'TaxonNameClassification::Icn::Fossil',
							},
							{
								name: 'ICN Hybrid',
								value: 'TaxonNameClassification::Icn::Hybrid',
							},
							{
								name: 'ICVCN Invalid',
								value: 'TaxonNameClassification::Icvcn::Invalid',
							},
							{
								name: 'ICN Not Effectively Published',
								value: 'TaxonNameClassification::Icn::NotEffectivelyPublished',
							},
							{
								name: 'ICNP Not Effectively Published',
								value: 'TaxonNameClassification::Icnp::NotEffectivelyPublished',
							},
							{
								name: 'ICZN Unavailable',
								value: 'TaxonNameClassification::Iczn::Unavailable',
							},
							{
								name: 'ICZN Based on Suppressed Genus',
								value: 'TaxonNameClassification::Iczn::Unavailable::BasedOnSuppressedGenus',
							},
							{
								name: 'ICZN Excluded',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded',
							},
							{
								name: 'ICZN Based on Fossil Genus Formula',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::BasedOnFossilGenusFormula',
							},
							{
								name: 'ICZN Hypothetical Concept',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::HypotheticalConcept',
							},
							{
								name: 'ICZN Infrasubspecific',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::Infrasubspecific',
							},
							{
								name: 'ICZN Name for Hybrid',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::NameForHybrid',
							},
							{
								name: 'ICZN Name for Terratological Specimen',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::NameForTerratologicalSpecimen',
							},
							{
								name: 'ICZN Not for Nomenclature',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::NotForNomenclature',
							},
							{
								name: 'ICZN Temporary Name',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::TemporaryName',
							},
							{
								name: 'ICZN Work of Extant Animal After 1930',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::WorkOfExtantAnimalAfter1930',
							},
							{
								name: 'ICZN Zoological Formula',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::ZoologicalFormula',
							},
							{
								name: 'ICZN Less Than Two Letters',
								value: 'TaxonNameClassification::Iczn::Unavailable::LessThanTwoLetters',
							},
							{
								name: 'ICZN Nomen Nudum',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum',
							},
							{
								name: 'ICZN Ambiguous Generic Placement',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::AmbiguousGenericPlacement',
							},
							{
								name: 'ICZN Anonymous Authorship After 1950',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::AnonymousAuthorshipAfter1950',
							},
							{
								name: 'ICZN Citation of Unavailable Name',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::CitationOfUnavailableName',
							},
							{
								name: 'ICZN Conditionally Proposed After 1960',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::ConditionallyProposedAfter1960',
							},
							{
								name: 'ICZN Electronic Only Publication Before 2012',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::ElectronicOnlyPublicationBefore2012',
							},
							{
								name: 'ICZN Electronic Publication Not In PDF Format',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::ElectronicPublicationNotInPdfFormat',
							},
							{
								name: 'ICZN Electronic Publication Not Registered In ZooBank',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::ElectronicPublicationNotRegisteredInZoobank',
							},
							{
								name: 'ICZN Electronic Publication Without ISSN or ISBN',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::ElectronicPublicationWithoutIssnOrIsbn',
							},
							{
								name: 'ICZN Ichnotaxon Without Type Species After 1999',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::IchnotaxonWithoutTypeSpeciesAfter1999',
							},
							{
								name: 'ICZN Interpolated Name',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::InterpolatedName',
							},
							{
								name: 'ICZN No Description',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NoDescription',
							},
							{
								name: 'ICZN No Diagnosis After 1930',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NoDiagnosisAfter1930',
							},
							{
								name: 'ICZN No Diagnosis After 1930 and Rejected Before 2000',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NoDiagnosisAfter1930AndRejectedBefore2000',
							},
							{
								name: 'ICZN No Type Deposition Statement After 1999',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NoTypeDepositionStatementAfter1999',
							},
							{
								name: 'ICZN No Type Fixation After 1930',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NoTypeFixationAfter1930',
							},
							{
								name: 'ICZN No Type Genus Citation After 1999',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NoTypeGenusCitationAfter1999',
							},
							{
								name: 'ICZN No Type Specimen Fixation After 1999',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NoTypeSpecimenFixationAfter1999',
							},
							{
								name: 'ICZN Not Based on Available Genus Name',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NotBasedOnAvailableGenusName',
							},
							{
								name: 'ICZN Not From Genus Name',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NotFromGenusName',
							},
							{
								name: 'ICZN Not Indicated As New After 1999',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NotIndicatedAsNewAfter1999',
							},
							{
								name: 'ICZN Published As Synonym After 1960',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::PublishedAsSynonymAfter1960',
							},
							{
								name: 'ICZN Published As Synonym and Not Validated Before 1961',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::PublishedAsSynonymAndNotValidatedBefore1961',
							},
							{
								name: 'ICZN Replacement Name Without Type Fixation After 1930',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::ReplacementNameWithoutTypeFixationAfter1930',
							},
							{
								name: 'ICZN Non-Binominal',
								value: 'TaxonNameClassification::Iczn::Unavailable::NonBinominal',
							},
							{
								name: 'ICZN Not Uninominal',
								value: 'TaxonNameClassification::Iczn::Unavailable::NonBinominal::NotUninominal',
							},
							{
								name: 'ICZN Species Not Binominal',
								value: 'TaxonNameClassification::Iczn::Unavailable::NonBinominal::SpeciesNotBinominal',
							},
							{
								name: 'ICZN Subgenus Not Intercalare',
								value: 'TaxonNameClassification::Iczn::Unavailable::NonBinominal::SubgenusNotIntercalare',
							},
							{
								name: 'ICZN Subspecies Not Trinominal',
								value: 'TaxonNameClassification::Iczn::Unavailable::NonBinominal::SubspeciesNotTrinominal',
							},
							{
								name: 'ICZN Not Latin',
								value: 'TaxonNameClassification::Iczn::Unavailable::NotLatin',
							},
							{
								name: 'ICZN Not Latinized After 1899',
								value: 'TaxonNameClassification::Iczn::Unavailable::NotLatinizedAfter1899',
							},
							{
								name: 'ICZN Not Latinized Before 1900 and Not Accepted',
								value: 'TaxonNameClassification::Iczn::Unavailable::NotLatinizedBefore1900AndNotAccepted',
							},
							{
								name: 'ICZN Not Nominative Plural',
								value: 'TaxonNameClassification::Iczn::Unavailable::NotNominativePlural',
							},
							{
								name: 'ICZN Not Noun in Nominative Singular',
								value: 'TaxonNameClassification::Iczn::Unavailable::NotNounInNominativeSingular',
							},
							{
								name: 'ICZN Not Noun or Adjective',
								value: 'TaxonNameClassification::Iczn::Unavailable::NotNounOrAdjective',
							},
							{
								name: 'ICZN Not Scientific Plural',
								value: 'TaxonNameClassification::Iczn::Unavailable::NotScientificPlural',
							},
							{
								name: 'ICZN Pre-Linnean',
								value: 'TaxonNameClassification::Iczn::Unavailable::PreLinnean',
							},
							{
								name: 'ICZN Suppressed',
								value: 'TaxonNameClassification::Iczn::Unavailable::Suppressed',
							},
							{
								name: 'ICZN Not In Official List of Available Names In Zoology',
								value: 'TaxonNameClassification::Iczn::Unavailable::Suppressed::NotInOfficialListOfAvailableNamesInZoology',
							},
							{
								name: 'ICZN Official Index of Rejected and Invalid Works In Zoology',
								value: 'TaxonNameClassification::Iczn::Unavailable::Suppressed::OfficialIndexOfRejectedAndInvalidWorksInZoology',
							},
							{
								name: 'ICZN Official Index of Rejected Family Group Names In Zoology',
								value: 'TaxonNameClassification::Iczn::Unavailable::Suppressed::OfficialIndexOfRejectedFamilyGroupNamesInZoology',
							},
							{
								name: 'ICZN Official Index of Rejected Generic Names in Zoology',
								value: 'TaxonNameClassification::Iczn::Unavailable::Suppressed::OfficialIndexOfRejectedGenericNamesInZoology',
							},
							{
								name: 'ICZN Official Index of Rejected Specific Names in Zoology',
								value: 'TaxonNameClassification::Iczn::Unavailable::Suppressed::OfficialIndexOfRejectedSpecificNamesInZoology',
							},
							{
								name: 'ICZN Unavailable and Not Used as Valid Before 2000',
								value: 'TaxonNameClassification::Iczn::Unavailable::UnavailableAndNotUsedAsValidBefore2000',
							},
							{
								name: 'ICZN Unavailable and Rejected By Author Before 2000',
								value: 'TaxonNameClassification::Iczn::Unavailable::UnavailableAndRejectedByAuthorBefore2000',
							},
							{
								name: 'ICZN Unavailable Under ICZN',
								value: 'TaxonNameClassification::Iczn::Unavailable::UnavailableUnderIczn',
							},
							{
								name: 'ICZN Variety or Form After 1960',
								value: 'TaxonNameClassification::Iczn::Unavailable::VarietyOrFormAfter1960',
							},
							{
								name: 'ICVCN Valid',
								value: 'TaxonNameClassification::Icvcn::Valid',
							},
							{
								name: 'ICVCN Accepted',
								value: 'TaxonNameClassification::Icvcn::Valid::Accepted',
							},
							{
								name: 'ICVCN Unaccepted',
								value: 'TaxonNameClassification::Icvcn::Valid::Unaccepted',
							},
							{
								name: 'Latinized Feminine',
								value: 'TaxonNameClassification::Latinized::Gender::Feminine',
							},
							{
								name: 'Latinized Masculine',
								value: 'TaxonNameClassification::Latinized::Gender::Masculine',
							},
							{
								name: 'Latinized Neuter',
								value: 'TaxonNameClassification::Latinized::Gender::Neuter',
							},
							{
								name: 'Latinized Adjective',
								value: 'TaxonNameClassification::Latinized::PartOfSpeech::Adjective',
							},
							{
								name: 'Latinized Noun In Apposition',
								value: 'TaxonNameClassification::Latinized::PartOfSpeech::NounInApposition',
							},
							{
								name: 'Latinized Noun In Genitive Case',
								value: 'TaxonNameClassification::Latinized::PartOfSpeech::NounInGenitiveCase',
							},
							{
								name: 'Latinized Participle',
								value: 'TaxonNameClassification::Latinized::PartOfSpeech::Participle',
							},
						],
						default: '',
					},
					{
						displayName: 'Taxon Name Classification Set',
						name: 'taxonNameClassificationSet',
						type: 'multiOptions',
						options: [
							{
								name: 'Exceptions',
								value: 'exceptions',
							},
							{
								name: 'Invalidating',
								value: 'invalidating',
							},
							{
								name: 'Validating',
								value: 'validating',
							},
						],
						default: '',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
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
							'taxonNameRelationship',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Object Taxon Name IDs',
						name: 'objectTaxonNameId',
						type: 'string',
						default: '',
						description: 'A comma-separated list of IDs (e.g., 1,2,3)',
					},
					{
						displayName: 'Subject Taxon Name IDs',
						name: 'subjectTaxonNameId',
						type: 'string',
						default: '',
						description: 'A comma-separated list of IDs (e.g., 1,2,3)',
					},
					{
						displayName: 'Taxon Name IDs',
						name: 'taxonNameId',
						type: 'string',
						default: '',
						description: 'A comma-separated list of IDs (e.g., 1,2,3)',
					},
					{
						displayName: 'Taxon Name Classification Set',
						name: 'taxonNameClassificationSet',
						type: 'multiOptions',
						options: [
							{
								name: 'Exceptions',
								value: 'exceptions',
							},
							{
								name: 'Invalidating',
								value: 'invalidating',
							},
							{
								name: 'Validating',
								value: 'validating',
							},
						],
						default: '',
					},
					{
						displayName: 'Taxon Name Relationship Type',
						name: 'taxonNameRelationshipType',
						type: 'multiOptions',
						default: '',
						options: [
							{
								name: 'ICZN unavailable or invalid, linked to',
								value: 'TaxonNameRelationship::Iczn::Invalidating',
							},
							{
								name: 'ICZN homonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Homonym',
							},
							{
								name: 'ICZN primary homonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Homonym::Primary',
							},
							{
								name: 'ICZN forgotten primary homonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Homonym::Primary::Forgotten',
							},
							{
								name: 'ICZN suppressed primary homonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Homonym::Primary::Suppressed',
							},
							{
								name: 'ICZN secondary homonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Homonym::Secondary',
							},
							{
								name: 'ICZN secondary homonym replaced before 1961 of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Homonym::Secondary::Secondary1961',
							},
							{
								name: 'ICZN misapplication, linked to',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Misapplication',
							},
							{
								name: 'ICZN synonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym',
							},
							{
								name: 'ICZN nomen oblitum of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::ForgottenName',
							},
							{
								name: 'ICZN objective synonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Objective',
							},
							{
								name: 'ICZN replaced by',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Objective::ReplacedHomonym',
							},
							{
								name: 'ICZN synonymic homonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Objective::SynonymicHomonym',
							},
							{
								name: 'ICZN unjustified emendation for',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Objective::UnjustifiedEmendation',
							},
							{
								name: 'ICZN unnecessary replacement for',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Objective::UnnecessaryReplacementName',
							},
							{
								name: 'ICZN subjective synonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Subjective',
							},
							{
								name: 'ICZN suppressed under',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Suppression',
							},
							{
								name: 'ICZN conditionaly suppressed under',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Suppression::Conditional',
							},
							{
								name: 'ICZN partially suppressed under',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Suppression::Partial',
							},
							{
								name: 'ICZN totally suppressed under',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Suppression::Total',
							},
							{
								name: 'ICZN family-group name form of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Usage::FamilyGroupNameForm',
							},
							{
								name: 'ICZN family-group name original form of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Usage::FamilyGroupNameOriginalForm',
							},
							{
								name: 'ICZN incorrect original spelling of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Usage::IncorrectOriginalSpelling',
							},
							{
								name: 'ICZN misspelling of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Usage::Misspelling',
							},
							{
								name: 'ICZN has priority as a result of the first revisor action over',
								value: 'TaxonNameRelationship::Iczn::PotentiallyValidating::FirstRevisorAction',
							},
							{
								name: 'ICZN nomen novum for',
								value: 'TaxonNameRelationship::Iczn::PotentiallyValidating::ReplacementName',
							},
							{
								name: 'ICZN reinstated for',
								value: 'TaxonNameRelationship::Iczn::PotentiallyValidating::ReinstatedName',
							},
							{
								name: 'ICZN validated as replacement for family-group name based on genus synonym before 1961 for',
								value: 'TaxonNameRelationship::Iczn::PotentiallyValidating::FamilyBefore1961',
							},
							{
								name: 'ICZN conserved for',
								value: 'TaxonNameRelationship::Iczn::Validating::ConservedName',
							},
							{
								name: 'ICZN conserved work for',
								value: 'TaxonNameRelationship::Iczn::Validating::ConservedWork',
							},
							{
								name: 'ICZN incertae sedis in',
								value: 'TaxonNameRelationship::Iczn::Validating::UncertainPlacement',
							},
							{
								name: 'ICN alternative family name of',
								value: 'TaxonNameRelationship::Icn::Accepting::AlternativeFamilyName',
							},
							{
								name: 'ICN conserved of',
								value: 'TaxonNameRelationship::Icn::Accepting::ConservedName',
							},
							{
								name: 'ICN sanctioned of',
								value: 'TaxonNameRelationship::Icn::Accepting::SanctionedName',
							},
							{
								name: 'ICN unaccepted name of',
								value: 'TaxonNameRelationship::Icn::Unaccepting',
							},
							{
								name: 'ICN junior homonym of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Homonym',
							},
							{
								name: 'ICN junior synonym of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Synonym',
							},
							{
								name: 'ICN heterotypic synonym of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Synonym::Heterotypic',
							},
							{
								name: 'ICN homotypic synonym of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Synonym::Homotypic',
							},
							{
								name: 'ICN alternative name of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Synonym::Homotypic::AlternativeName',
							},
							{
								name: 'ICN isonym of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Synonym::Homotypic::Isonym',
							},
							{
								name: 'ICN orthographic variant of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Synonym::Homotypic::OrthographicVariant',
							},
							{
								name: 'ICN misapplication of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Misapplication',
							},
							{
								name: 'ICN unaccepted name of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Usage',
							},
							{
								name: 'ICN basionym of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Synonym::Homotypic::Basionym',
							},
							{
								name: 'ICN misspelling of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Usage::Misspelling',
							},
							{
								name: 'ICNP conserved of',
								value: 'TaxonNameRelationship::Icnp::Accepting::ConservedName',
							},
							{
								name: 'ICNP unaccepted name of',
								value: 'TaxonNameRelationship::Icnp::Unaccepting',
							},
							{
								name: 'ICNP junior synonym of',
								value: 'TaxonNameRelationship::Icnp::Unaccepting::Synonym',
							},
							{
								name: 'ICNP heterotypic later synonym of',
								value: 'TaxonNameRelationship::Icnp::Unaccepting::Synonym::Heterotypic',
							},
							{
								name: 'ICNP homotypic later synonym of',
								value: 'TaxonNameRelationship::Icnp::Unaccepting::Synonym::Homotypic',
							},
							{
								name: 'ICNP later homonym of',
								value: 'TaxonNameRelationship::Icnp::Unaccepting::Homonym',
							},
							{
								name: 'ICNP misapplication of',
								value: 'TaxonNameRelationship::Icnp::Unaccepting::Misapplication',
							},
							{
								name: 'ICNP unaccepted name of',
								value: 'TaxonNameRelationship::Icnp::Unaccepting::Usage',
							},
							{
								name: 'ICNP misspelling of',
								value: 'TaxonNameRelationship::Icnp::Unaccepting::Usage::Misspelling',
							},
							{
								name: 'ICVCN incertae sedis in',
								value: 'TaxonNameRelationship::Icvcn::Accepting::UncertainPlacement',
							},
							{
								name: 'ICVCN unaccepted name of',
								value: 'TaxonNameRelationship::Icvcn::Unaccepting',
							},
							{
								name: 'ICVCN suppressed under',
								value: 'TaxonNameRelationship::Icvcn::Unaccepting::Supressed',
							},
						],
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
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
							'taxonNames',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Author',
						name: 'author',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Authors',
						name: 'authors',
						type: 'options',
						options: [
							{
								name: 'Both',
								value: '',
							},
							{
								name: 'With',
								value: 'true',
							},
							{
								name: 'Without',
								value: 'false',
							},
						],
						default: '',
					},
					{
						displayName: 'Citations',
						name: 'citations',
						type: 'boolean',
						default: '',
					},
					{
						displayName: 'Date Range',
						name: 'dateRange',
						type: 'collection',
						placeholder: '',
						default: {},
						options: [
							{
								displayName: 'Date Target',
								name: 'userDateTarget',
								type: 'options',
								options: [
									{
										name: 'Both',
										value: '',
									},
									{
										name: 'Created',
										value: 'created',
									},
									{
										name: 'Updated',
										value: 'updated',
									},
								],
								default: '',
							},
							{
								displayName: 'Date Start',
								name: 'userDateStart',
								type: 'dateTime',
								default: '',
							},
							{
								displayName: 'Date End',
								name: 'userDateEnd',
								type: 'dateTime',
								default: '',
							},
						],
					},
					{
						displayName: 'Descendants',
						name: 'descendants',
						type: 'options',
						options: [
							{
								name: 'N/A',
								value: '',
							},
							{
								name: 'Ancestors',
								value: 'false',
							},
							{
								name: 'Descendants',
								value: 'true',
							},
						],
						default: '',
					},
					{
						displayName: 'Exact',
						name: 'exact',
						type: 'boolean',
						default: '',
					},
					{
						displayName: 'Etymology',
						name: 'etymology',
						type: 'options',
						options: [
							{
								name: 'Both',
								value: '',
							},
							{
								name: 'With',
								value: 'true',
							},
							{
								name: 'Without',
								value: 'false',
							},
						],
						default: '',
					},
					{
						displayName: 'Leaves',
						name: 'leaves',
						type: 'options',
						options: [
							{
								name: 'Both',
								value: '',
							},
							{
								name: 'With',
								value: 'true',
							},
							{
								name: 'Without',
								value: 'false',
							},
						],
						default: '',
					},
					{
						displayName: 'Nomenclature Code',
						name: 'nomenclatureCode',
						type: 'multiOptions',
						options: [
							{
								name: 'Any Code',
								value: '',
							},
							{
								name: 'ICZN (Animals)',
								value: 'ICZN',
							},
							{
								name: 'ICN (Plants)',
								value: 'ICN',
							},
							{
								name: 'ICNP (Bacteria)',
								value: 'ICNP',
							},
							{
								name: 'ICVCN (Viruses)',
								value: 'ICVCN',
							},
						],
						default: '',
					},
					{
						displayName: 'Nomenclature Group',
						name: 'nomenclatureGroup',
						type: 'options',
						options: [
							{
								name: 'Any Rank',
								value: '',
							},
							{
								name: 'Higher',
								value: 'Higher',
							},
							{
								name: 'Family',
								value: 'Family',
							},
							{
								name: 'Genus',
								value: 'Genus',
							},
							{
								name: 'Species',
								value: 'Species',
							},
						],
						default: '',
						description: 'Nomenclatural rank group',
					},
					{
						displayName: 'OTUs',
						name: 'otus',
						type: 'options',
						options: [
							{
								name: 'Both',
								value: '',
							},
							{
								name: 'With',
								value: 'true',
							},
							{
								name: 'Without',
								value: 'false',
							},
						],
						default: '',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: '0',
					},
					{
						displayName: 'Per',
						name: 'per',
						type: 'number',
						default: '100',
					},
					{
						displayName: 'Scientific Name',
						name: 'sciName',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Taxon Name ID',
						name: 'taxonNameId',
						type: 'string',
						default: '',
						description: 'Comma-separated list of Taxon Name IDs (e.g., 1,2,3)',
					},
					{
						displayName: 'Taxon Name Relationship Type',
						name: 'taxonNameRelationshipType',
						type: 'multiOptions',
						default: '',
						options: [
							{
								name: 'ICZN unavailable or invalid, linked to',
								value: 'TaxonNameRelationship::Iczn::Invalidating',
							},
							{
								name: 'ICZN homonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Homonym',
							},
							{
								name: 'ICZN primary homonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Homonym::Primary',
							},
							{
								name: 'ICZN forgotten primary homonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Homonym::Primary::Forgotten',
							},
							{
								name: 'ICZN suppressed primary homonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Homonym::Primary::Suppressed',
							},
							{
								name: 'ICZN secondary homonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Homonym::Secondary',
							},
							{
								name: 'ICZN secondary homonym replaced before 1961 of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Homonym::Secondary::Secondary1961',
							},
							{
								name: 'ICZN misapplication, linked to',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Misapplication',
							},
							{
								name: 'ICZN synonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym',
							},
							{
								name: 'ICZN nomen oblitum of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::ForgottenName',
							},
							{
								name: 'ICZN objective synonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Objective',
							},
							{
								name: 'ICZN replaced by',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Objective::ReplacedHomonym',
							},
							{
								name: 'ICZN synonymic homonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Objective::SynonymicHomonym',
							},
							{
								name: 'ICZN unjustified emendation for',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Objective::UnjustifiedEmendation',
							},
							{
								name: 'ICZN unnecessary replacement for',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Objective::UnnecessaryReplacementName',
							},
							{
								name: 'ICZN subjective synonym of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Subjective',
							},
							{
								name: 'ICZN suppressed under',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Suppression',
							},
							{
								name: 'ICZN conditionaly suppressed under',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Suppression::Conditional',
							},
							{
								name: 'ICZN partially suppressed under',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Suppression::Partial',
							},
							{
								name: 'ICZN totally suppressed under',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Synonym::Suppression::Total',
							},
							{
								name: 'ICZN family-group name form of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Usage::FamilyGroupNameForm',
							},
							{
								name: 'ICZN family-group name original form of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Usage::FamilyGroupNameOriginalForm',
							},
							{
								name: 'ICZN incorrect original spelling of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Usage::IncorrectOriginalSpelling',
							},
							{
								name: 'ICZN misspelling of',
								value: 'TaxonNameRelationship::Iczn::Invalidating::Usage::Misspelling',
							},
							{
								name: 'ICZN has priority as a result of the first revisor action over',
								value: 'TaxonNameRelationship::Iczn::PotentiallyValidating::FirstRevisorAction',
							},
							{
								name: 'ICZN nomen novum for',
								value: 'TaxonNameRelationship::Iczn::PotentiallyValidating::ReplacementName',
							},
							{
								name: 'ICZN reinstated for',
								value: 'TaxonNameRelationship::Iczn::PotentiallyValidating::ReinstatedName',
							},
							{
								name: 'ICZN validated as replacement for family-group name based on genus synonym before 1961 for',
								value: 'TaxonNameRelationship::Iczn::PotentiallyValidating::FamilyBefore1961',
							},
							{
								name: 'ICZN conserved for',
								value: 'TaxonNameRelationship::Iczn::Validating::ConservedName',
							},
							{
								name: 'ICZN conserved work for',
								value: 'TaxonNameRelationship::Iczn::Validating::ConservedWork',
							},
							{
								name: 'ICZN incertae sedis in',
								value: 'TaxonNameRelationship::Iczn::Validating::UncertainPlacement',
							},
							{
								name: 'ICN alternative family name of',
								value: 'TaxonNameRelationship::Icn::Accepting::AlternativeFamilyName',
							},
							{
								name: 'ICN conserved of',
								value: 'TaxonNameRelationship::Icn::Accepting::ConservedName',
							},
							{
								name: 'ICN sanctioned of',
								value: 'TaxonNameRelationship::Icn::Accepting::SanctionedName',
							},
							{
								name: 'ICN unaccepted name of',
								value: 'TaxonNameRelationship::Icn::Unaccepting',
							},
							{
								name: 'ICN junior homonym of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Homonym',
							},
							{
								name: 'ICN junior synonym of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Synonym',
							},
							{
								name: 'ICN heterotypic synonym of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Synonym::Heterotypic',
							},
							{
								name: 'ICN homotypic synonym of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Synonym::Homotypic',
							},
							{
								name: 'ICN alternative name of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Synonym::Homotypic::AlternativeName',
							},
							{
								name: 'ICN isonym of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Synonym::Homotypic::Isonym',
							},
							{
								name: 'ICN orthographic variant of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Synonym::Homotypic::OrthographicVariant',
							},
							{
								name: 'ICN misapplication of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Misapplication',
							},
							{
								name: 'ICN unaccepted name of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Usage',
							},
							{
								name: 'ICN basionym of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Synonym::Homotypic::Basionym',
							},
							{
								name: 'ICN misspelling of',
								value: 'TaxonNameRelationship::Icn::Unaccepting::Usage::Misspelling',
							},
							{
								name: 'ICNP conserved of',
								value: 'TaxonNameRelationship::Icnp::Accepting::ConservedName',
							},
							{
								name: 'ICNP unaccepted name of',
								value: 'TaxonNameRelationship::Icnp::Unaccepting',
							},
							{
								name: 'ICNP junior synonym of',
								value: 'TaxonNameRelationship::Icnp::Unaccepting::Synonym',
							},
							{
								name: 'ICNP heterotypic later synonym of',
								value: 'TaxonNameRelationship::Icnp::Unaccepting::Synonym::Heterotypic',
							},
							{
								name: 'ICNP homotypic later synonym of',
								value: 'TaxonNameRelationship::Icnp::Unaccepting::Synonym::Homotypic',
							},
							{
								name: 'ICNP later homonym of',
								value: 'TaxonNameRelationship::Icnp::Unaccepting::Homonym',
							},
							{
								name: 'ICNP misapplication of',
								value: 'TaxonNameRelationship::Icnp::Unaccepting::Misapplication',
							},
							{
								name: 'ICNP unaccepted name of',
								value: 'TaxonNameRelationship::Icnp::Unaccepting::Usage',
							},
							{
								name: 'ICNP misspelling of',
								value: 'TaxonNameRelationship::Icnp::Unaccepting::Usage::Misspelling',
							},
							{
								name: 'ICVCN incertae sedis in',
								value: 'TaxonNameRelationship::Icvcn::Accepting::UncertainPlacement',
							},
							{
								name: 'ICVCN unaccepted name of',
								value: 'TaxonNameRelationship::Icvcn::Unaccepting',
							},
							{
								name: 'ICVCN suppressed under',
								value: 'TaxonNameRelationship::Icvcn::Unaccepting::Supressed',
							},
						],
					},
					{
						displayName: 'Taxon Name Classification Type',
						name: 'taxonNameClassificationType',
						type: 'multiOptions',
						default: '',
						options: [
							{
								name: 'ICZN available',
								value: 'TaxonNameClassification::Iczn::Available',
							},
							{
								name: 'ICZN invalid',
								value: 'TaxonNameClassification::Iczn::Available::Invalid',
							},
							{
								name: 'ICZN homonym',
								value: 'TaxonNameClassification::Iczn::Available::Invalid::Homonym',
							},
							{
								name: 'ICZN homonymy of type genus',
								value: 'TaxonNameClassification::Iczn::Available::Invalid::HomonymyOfTypeGenus',
							},
							{
								name: 'ICZN suppression of type genus',
								value: 'TaxonNameClassification::Iczn::Available::Invalid::SuppressionOfTypeGenus',
							},
							{
								name: 'ICZN synonymy of type genus before 1961',
								value: 'TaxonNameClassification::Iczn::Available::Invalid::SynonymyOfTypeGenusBefore1961',
							},
							{
								name: 'ICZN official list of family group names in zoology',
								value: 'TaxonNameClassification::Iczn::Available::OfficialListOfFamilyGroupNamesInZoology',
							},
							{
								name: 'ICZN official list of generic names in zoology',
								value: 'TaxonNameClassification::Iczn::Available::OfficialListOfGenericNamesInZoology',
							},
							{
								name: 'ICZN official list of specific names in zoology',
								value: 'TaxonNameClassification::Iczn::Available::OfficialListOfSpecificNamesInZoology',
							},
							{
								name: 'ICZN official list of works approved as available',
								value: 'TaxonNameClassification::Iczn::Available::OfficialListOfWorksApprovedAsAvailable',
							},
							{
								name: 'ICZN valid',
								value: 'TaxonNameClassification::Iczn::Available::Valid',
							},
							{
								name: 'ICZN nomen dubium',
								value: 'TaxonNameClassification::Iczn::Available::Valid::NomenDubium',
							},
							{
								name: 'ICZN nomen inquirendum',
								value: 'TaxonNameClassification::Iczn::Available::Valid::NomenInquirendum',
							},
							{
								name: 'ICZN collective group',
								value: 'TaxonNameClassification::Iczn::CollectiveGroup',
							},
							{
								name: 'ICN effectively published',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished',
							},
							{
								name: 'ICN invalidly published',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::InvalidlyPublished',
							},
							{
								name: 'ICN as synonym',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::InvalidlyPublished::AsSynonym',
							},
							{
								name: 'ICN nomen nudum',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::InvalidlyPublished::NomenNudum',
							},
							{
								name: 'ICN non binomial',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::InvalidlyPublished::NonBinomial',
							},
							{
								name: 'ICN not latin',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::InvalidlyPublished::NotLatin',
							},
							{
								name: 'ICN provisional',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::InvalidlyPublished::Provisional',
							},
							{
								name: 'ICN rejected publication',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::InvalidlyPublished::RejectedPublication',
							},
							{
								name: 'ICN tautonym',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::InvalidlyPublished::Tautonym',
							},
							{
								name: 'ICN validly published',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished',
							},
							{
								name: 'ICN illegitimate',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Illegitimate',
							},
							{
								name: 'ICN homonym',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Illegitimate::Homonym',
							},
							{
								name: 'ICN incorrect original spelling',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Illegitimate::IncorrectOriginalSpelling',
							},
							{
								name: 'ICN superfluous',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Illegitimate::Superfluous',
							},
							{
								name: 'ICN legitimate',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate',
							},
							{
								name: 'ICN adopted by persoon',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::AdoptedByPersoon',
							},
							{
								name: 'ICN autonym',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::Autonym',
							},
							{
								name: 'ICN conserved',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::Conserved',
							},
							{
								name: 'ICN conserved spelling',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::ConservedSpelling',
							},
							{
								name: 'ICN correct',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::Correct',
							},
							{
								name: 'ICN incorrect',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::Incorrect',
							},
							{
								name: 'ICN nomen novum',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::NomenNovum',
							},
							{
								name: 'ICN nothotaxon',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::Nothotaxon',
							},
							{
								name: 'ICN official list',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::OfficialList',
							},
							{
								name: 'ICN sanctioned',
								value: 'TaxonNameClassification::Icn::EffectivelyPublished::ValidlyPublished::Legitimate::Sanctioned',
							},
							{
								name: 'ICNP effectively published',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished',
							},
							{
								name: 'ICNP invalidly published',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::InvalidlyPublished',
							},
							{
								name: 'ICNP nomen nudum',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::InvalidlyPublished::NomenNudum',
							},
							{
								name: 'ICNP validly published',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished',
							},
							{
								name: 'ICNP illegitimate',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Illegitimate',
							},
							{
								name: 'ICNP homonym',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Illegitimate::Homonym',
							},
							{
								name: 'ICNP not in official list',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Illegitimate::NotInOfficialList',
							},
							{
								name: 'ICNP rejected',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Illegitimate::Rejected',
							},
							{
								name: 'ICNP legitimate',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Legitimate',
							},
							{
								name: 'ICNP candidatus',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Legitimate::Candidatus',
							},
							{
								name: 'ICNP correct',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Legitimate::Correct',
							},
							{
								name: 'ICNP incorrect',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Legitimate::Incorrect',
							},
							{
								name: 'ICNP nomen novum',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Legitimate::NomenNovum',
							},
							{
								name: 'ICNP official list',
								value: 'TaxonNameClassification::Icnp::EffectivelyPublished::ValidlyPublished::Legitimate::OfficialList',
							},
							{
								name: 'ICZN fossil',
								value: 'TaxonNameClassification::Iczn::Fossil',
							},
							{
								name: 'ICZN ichnotaxon',
								value: 'TaxonNameClassification::Iczn::Fossil::Ichnotaxon',
							},
							{
								name: 'ICN fossil',
								value: 'TaxonNameClassification::Icn::Fossil',
							},
							{
								name: 'ICN hybrid',
								value: 'TaxonNameClassification::Icn::Hybrid',
							},
							{
								name: 'ICVCN invalid',
								value: 'TaxonNameClassification::Icvcn::Invalid',
							},
							{
								name: 'ICN not effectively published',
								value: 'TaxonNameClassification::Icn::NotEffectivelyPublished',
							},
							{
								name: 'ICNP not effectively published',
								value: 'TaxonNameClassification::Icnp::NotEffectivelyPublished',
							},
							{
								name: 'ICZN unavailable',
								value: 'TaxonNameClassification::Iczn::Unavailable',
							},
							{
								name: 'ICZN based on suppressed genus',
								value: 'TaxonNameClassification::Iczn::Unavailable::BasedOnSuppressedGenus',
							},
							{
								name: 'ICZN excluded',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded',
							},
							{
								name: 'ICZN based on fossil genus formula',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::BasedOnFossilGenusFormula',
							},
							{
								name: 'ICZN hypothetical concept',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::HypotheticalConcept',
							},
							{
								name: 'ICZN infrasubspecific',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::Infrasubspecific',
							},
							{
								name: 'ICZN name for hybrid',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::NameForHybrid',
							},
							{
								name: 'ICZN name for terratological specimen',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::NameForTerratologicalSpecimen',
							},
							{
								name: 'ICZN not for nomenclature',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::NotForNomenclature',
							},
							{
								name: 'ICZN temporary name',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::TemporaryName',
							},
							{
								name: 'ICZN work of extant animal after 1930',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::WorkOfExtantAnimalAfter1930',
							},
							{
								name: 'ICZN zoological formula',
								value: 'TaxonNameClassification::Iczn::Unavailable::Excluded::ZoologicalFormula',
							},
							{
								name: 'ICZN less than two letters',
								value: 'TaxonNameClassification::Iczn::Unavailable::LessThanTwoLetters',
							},
							{
								name: 'ICZN nomen nudum',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum',
							},
							{
								name: 'ICZN ambiguous generic placement',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::AmbiguousGenericPlacement',
							},
							{
								name: 'ICZN anonymous authorship after 1950',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::AnonymousAuthorshipAfter1950',
							},
							{
								name: 'ICZN citation of unavailable name',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::CitationOfUnavailableName',
							},
							{
								name: 'ICZN conditionally proposed after 1960',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::ConditionallyProposedAfter1960',
							},
							{
								name: 'ICZN electronic only publication before 2012',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::ElectronicOnlyPublicationBefore2012',
							},
							{
								name: 'ICZN electronic publication not in pdf format',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::ElectronicPublicationNotInPdfFormat',
							},
							{
								name: 'ICZN electronic publication not registered in zoobank',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::ElectronicPublicationNotRegisteredInZoobank',
							},
							{
								name: 'ICZN electronic publication without issn or isbn',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::ElectronicPublicationWithoutIssnOrIsbn',
							},
							{
								name: 'ICZN ichnotaxon without type species after 1999',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::IchnotaxonWithoutTypeSpeciesAfter1999',
							},
							{
								name: 'ICZN interpolated name',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::InterpolatedName',
							},
							{
								name: 'ICZN no description',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NoDescription',
							},
							{
								name: 'ICZN no diagnosis after 1930',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NoDiagnosisAfter1930',
							},
							{
								name: 'ICZN no diagnosis after 1930 and rejected before 2000',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NoDiagnosisAfter1930AndRejectedBefore2000',
							},
							{
								name: 'ICZN no type deposition statement after 1999',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NoTypeDepositionStatementAfter1999',
							},
							{
								name: 'ICZN no type fixation after 1930',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NoTypeFixationAfter1930',
							},
							{
								name: 'ICZN no type genus citation after 1999',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NoTypeGenusCitationAfter1999',
							},
							{
								name: 'ICZN no type specimen fixation after 1999',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NoTypeSpecimenFixationAfter1999',
							},
							{
								name: 'ICZN not based on available genus name',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NotBasedOnAvailableGenusName',
							},
							{
								name: 'ICZN not from genus name',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NotFromGenusName',
							},
							{
								name: 'ICZN not indicated as new after 1999',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::NotIndicatedAsNewAfter1999',
							},
							{
								name: 'ICZN published as synonym after 1960',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::PublishedAsSynonymAfter1960',
							},
							{
								name: 'ICZN published as synonym and not validated before 1961',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::PublishedAsSynonymAndNotValidatedBefore1961',
							},
							{
								name: 'ICZN replacement name without type fixation after 1930',
								value: 'TaxonNameClassification::Iczn::Unavailable::NomenNudum::ReplacementNameWithoutTypeFixationAfter1930',
							},
							{
								name: 'ICZN non binominal',
								value: 'TaxonNameClassification::Iczn::Unavailable::NonBinominal',
							},
							{
								name: 'ICZN not uninominal',
								value: 'TaxonNameClassification::Iczn::Unavailable::NonBinominal::NotUninominal',
							},
							{
								name: 'ICZN species not binominal',
								value: 'TaxonNameClassification::Iczn::Unavailable::NonBinominal::SpeciesNotBinominal',
							},
							{
								name: 'ICZN subgenus not intercalare',
								value: 'TaxonNameClassification::Iczn::Unavailable::NonBinominal::SubgenusNotIntercalare',
							},
							{
								name: 'ICZN subspecies not trinominal',
								value: 'TaxonNameClassification::Iczn::Unavailable::NonBinominal::SubspeciesNotTrinominal',
							},
							{
								name: 'ICZN not latin',
								value: 'TaxonNameClassification::Iczn::Unavailable::NotLatin',
							},
							{
								name: 'ICZN not latinized after 1899',
								value: 'TaxonNameClassification::Iczn::Unavailable::NotLatinizedAfter1899',
							},
							{
								name: 'ICZN not latinized before 1900 and not accepted',
								value: 'TaxonNameClassification::Iczn::Unavailable::NotLatinizedBefore1900AndNotAccepted',
							},
							{
								name: 'ICZN not nominative plural',
								value: 'TaxonNameClassification::Iczn::Unavailable::NotNominativePlural',
							},
							{
								name: 'ICZN not noun in nominative singular',
								value: 'TaxonNameClassification::Iczn::Unavailable::NotNounInNominativeSingular',
							},
							{
								name: 'ICZN not noun or adjective',
								value: 'TaxonNameClassification::Iczn::Unavailable::NotNounOrAdjective',
							},
							{
								name: 'ICZN not scientific plural',
								value: 'TaxonNameClassification::Iczn::Unavailable::NotScientificPlural',
							},
							{
								name: 'ICZN pre linnean',
								value: 'TaxonNameClassification::Iczn::Unavailable::PreLinnean',
							},
							{
								name: 'ICZN suppressed',
								value: 'TaxonNameClassification::Iczn::Unavailable::Suppressed',
							},
							{
								name: 'ICZN not in official list of available names in zoology',
								value: 'TaxonNameClassification::Iczn::Unavailable::Suppressed::NotInOfficialListOfAvailableNamesInZoology',
							},
							{
								name: 'ICZN official index of rejected and invalid works in zoology',
								value: 'TaxonNameClassification::Iczn::Unavailable::Suppressed::OfficialIndexOfRejectedAndInvalidWorksInZoology',
							},
							{
								name: 'ICZN official index of rejected family group names in zoology',
								value: 'TaxonNameClassification::Iczn::Unavailable::Suppressed::OfficialIndexOfRejectedFamilyGroupNamesInZoology',
							},
							{
								name: 'ICZN official index of rejected generic names in zoology',
								value: 'TaxonNameClassification::Iczn::Unavailable::Suppressed::OfficialIndexOfRejectedGenericNamesInZoology',
							},
							{
								name: 'ICZN official index of rejected specific names in zoology',
								value: 'TaxonNameClassification::Iczn::Unavailable::Suppressed::OfficialIndexOfRejectedSpecificNamesInZoology',
							},
							{
								name: 'ICZN unavailable and not used as valid before 2000',
								value: 'TaxonNameClassification::Iczn::Unavailable::UnavailableAndNotUsedAsValidBefore2000',
							},
							{
								name: 'ICZN unavailable and rejected by author before 2000',
								value: 'TaxonNameClassification::Iczn::Unavailable::UnavailableAndRejectedByAuthorBefore2000',
							},
							{
								name: 'ICZN unavailable under iczn',
								value: 'TaxonNameClassification::Iczn::Unavailable::UnavailableUnderIczn',
							},
							{
								name: 'ICZN variety or form after 1960',
								value: 'TaxonNameClassification::Iczn::Unavailable::VarietyOrFormAfter1960',
							},
							{
								name: 'ICVCN valid',
								value: 'TaxonNameClassification::Icvcn::Valid',
							},
							{
								name: 'ICVCN accepted',
								value: 'TaxonNameClassification::Icvcn::Valid::Accepted',
							},
							{
								name: 'ICVCN unaccepted',
								value: 'TaxonNameClassification::Icvcn::Valid::Unaccepted',
							},
							{
								name: 'Latinized feminine',
								value: 'TaxonNameClassification::Latinized::Gender::Feminine',
							},
							{
								name: 'Latinized masculine',
								value: 'TaxonNameClassification::Latinized::Gender::Masculine',
							},
							{
								name: 'Latinized neuter',
								value: 'TaxonNameClassification::Latinized::Gender::Neuter',
							},
							{
								name: 'Latinized adjective',
								value: 'TaxonNameClassification::Latinized::PartOfSpeech::Adjective',
							},
							{
								name: 'Latinized noun in apposition',
								value: 'TaxonNameClassification::Latinized::PartOfSpeech::NounInApposition',
							},
							{
								name: 'Latinized noun in genitive case',
								value: 'TaxonNameClassification::Latinized::PartOfSpeech::NounInGenitiveCase',
							},
							{
								name: 'Latinized participle',
								value: 'TaxonNameClassification::Latinized::PartOfSpeech::Participle',
							},
						],
					},
					{
						displayName: 'Taxon Name Type',
						name: 'taxonNameType',
						type: 'options',
						options: [
							{
								name: 'Any',
								value: '',
							},
							{
								name: 'Combination',
								value: 'Combination',
							},
							{
								name: 'Hybrid',
								value: 'Hybrid',
							},
							{
								name: 'Protonym',
								value: 'Protonym',
							},
						],
						default: '',
					},
					{
						displayName: 'Type Metadata',
						name: 'typeMetadata',
						type: 'options',
						options: [
							{
								name: 'Both',
								value: '',
							},
							{
								name: 'With',
								value: 'true',
							},
							{
								name: 'Without',
								value: 'false',
							},
						],
						default: '',
					},
					{
						displayName: 'Validity',
						name: 'validity',
						type: 'options',
						options: [
							{
								name: 'Both',
								value: '',
							},
							{
								name: 'Only Valid',
								value: 'true',
							},
							{
								name: 'Only Invalid',
								value: 'false',
							},
						],
						default: '',
					},
					{
						displayName: 'Year',
						name: 'year',
						type: 'number',
						default: '',
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
		const userCredentials = await this.getCredentials('taxonWorksUserApi') as IDataObject;
		const projectCredentials = await this.getCredentials('taxonWorksProjectApi') as IDataObject;

		for (let i = 0; i < items.length; i++) {

			const host = this.getNodeParameter('host', i) as string;

			if (resource === 'assertedDistributions') {
				if (operation === 'get') {

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					if (additionalFields.geographicAreaId) {
						qs.geographic_area_id = additionalFields.geographicAreaId;
					}
					if (additionalFields.recent) {
						qs.recent = additionalFields.recent;
					}
					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}
					qs.token = userCredentials.token;
					qs.project_token = projectCredentials.projectToken;

					let urlParams = '';
					if (additionalFields.otuIds) {
						urlParams = setUrlParameters('otu_id[]', additionalFields.otuIds as string, urlParams);
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/asserted_distributions?token=${userCredentials.token}&project_token=${projectCredentials.projectToken}${urlParams}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);

				}
			}
			else if (resource === 'biologicalAssociation') {
				if (operation === 'get') {

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					if (additionalFields.anyGlobalId) {
						qs.any_global_id = additionalFields.anyGlobalId;
					}
					if (additionalFields.biologicalAssociationObjectType) {
						qs.biological_association_object_type = additionalFields.biologicalAssociationObjectType;
					}
					if (additionalFields.biologicalAssociationSubjectType) {
						qs.biological_association_subject_type = additionalFields.biologicalAssociationSubjectType;
					}
					if (additionalFields.biologicalRelationshipId) {
						qs.biological_relationship_id = additionalFields.biologicalRelationshipId;
					}
					if (additionalFields.objectGlobalId) {
						qs.object_global_id = additionalFields.objectGlobalId;
					}
					if (additionalFields.subjectGlobalId) {
						qs.subject_global_id = additionalFields.subjectGlobalId;
					}
					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/biological_associations?token=${userCredentials.token}&project_token=${projectCredentials.projectToken}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);

				}
			}
			else if (resource === 'citations') {
				if (operation === 'get') {

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					let endpoint = '';
					if (additionalFields.id) {
						qs.id = additionalFields.id;
						endpoint = `/${additionalFields.id}`;
					}
					if (additionalFields.citationObjectId) {
						qs.citation_object_id = additionalFields.citationObjectId;
					}
					if (additionalFields.citationObjectType) {
						qs.citation_object_type = additionalFields.citationObjectType;
					}
					if (additionalFields.isOriginal) {
						qs.is_original = additionalFields.isOriginal;
					}
					if (typeof additionalFields.sourceId !== 'undefined') {
						qs.source_id = additionalFields.sourceId;
					}
					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/citations${endpoint}?token=${userCredentials.token}&project_token=${projectCredentials.projectToken}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);

				}
			}
			else if (resource === 'collectingEvents') {
				if (operation === 'get') {

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};


					if (additionalFields.collectorIdsOr) {
						qs.collector_ids_or = additionalFields.collectorIdsOr;
					}
					if (additionalFields.geoJson) {
						qs.geo_json = additionalFields.geoJson;
					}
					if (additionalFields.inLabels) {  // TODO: inLabels doesn't work?
						qs.in_labels = additionalFields.inLabels;
					}
					if (additionalFields.inVerbatimLocality) {
						qs.in_verbatim_locality = additionalFields.inVerbatimLocality;
					}
					if (additionalFields.keywordIdAnd) {  // TODO: handle keywordIdAnd
						qs.keyword_id_and = additionalFields.keywordIdAnd;
					}
					if (additionalFields.keywordIdOr) {  // TODO: handle keywordIdOr
						qs.keyword_id_or = additionalFields.keywordIdOr;
					}
					if (additionalFields.md5VerbatimLabels) {
						qs.md5_verbatim_labels = additionalFields.md5VerbatimLabels;
					}
					if (additionalFields.recent) {
						qs.recent = additionalFields.recent;
					}
					if (additionalFields.spatialGeographicAreas) {
						qs.spatial_geographic_areas = additionalFields.spatialGeographicAreas;
					}
					if (additionalFields.wkt) {
						qs.wkt = additionalFields.wkt;
					}
					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}

					let urlParams = '';
					if (additionalFields.collectingEventsWildcards) {
						urlParams = setUrlParameters('collecting_events_wildcards[]', additionalFields.collectingEventsWildcards as string, urlParams);
					}
					if (additionalFields.collectorIds) {
						urlParams = setUrlParameters('collector_id[]', additionalFields.collectorIds as string, urlParams);
					}
					if (additionalFields.geographicAreaId) {
						urlParams = setUrlParameters('geographic_area_id[]', additionalFields.geographicAreaId as string, urlParams);
					}
					if (additionalFields.otuIds) {
						urlParams = setUrlParameters('otu_id[]', additionalFields.otuIds as string, urlParams);
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/collecting_events?token=${userCredentials.token}&project_token=${projectCredentials.projectToken}${urlParams}${urlParams}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);

				}
			}
			else if (resource === 'collectionObjects') {
				if (operation === 'get') {
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					let idEndpoint = '';
					if (additionalFields.id) {
						idEndpoint = `/${additionalFields.id}`;
					}
					if (additionalFields.ancestorId) {
						qs.ancestor_id = additionalFields.ancestorId;
					}
					if (additionalFields.bufferedCollectingEvent) {
						qs.buffered_collecting_event = additionalFields.bufferedCollectingEvent;
					}
					if (additionalFields.bufferedDeterminations) {
						qs.buffered_determinations = additionalFields.bufferedDeterminations;
					}
					if (additionalFields.bufferedOtherLabels) {
						qs.buffered_other_labels = additionalFields.bufferedOtherLabels;
					}
					if (additionalFields.collectingEvent) {
						qs.collecting_event = additionalFields.collectingEvent;
					}
					if (additionalFields.collectionObjectType) {
						qs.collecting_object_type = additionalFields.collectionObjectType;
					}
					if (additionalFields.currentDeterminations) {
						qs.current_determinations = additionalFields.currentDeterminations;
					}
					if (additionalFields.depictions) {
						qs.depictions = additionalFields.depictions;
					}
					if (additionalFields.dwcIndexed) {
						qs.dwc_indexed = additionalFields.depdwcIndexedictions;
					}
					if (additionalFields.startDate) {
						qs.start_date = additionalFields.startDate;
					}
					if (additionalFields.endDate) {
						qs.end_date = additionalFields.endDate;
					}
					if (additionalFields.exactBufferedCollectingEvent) {
						qs.exact_buffered_collecting_event = additionalFields.exactBufferedCollectingEvent;
					}
					if (additionalFields.exactBufferedDeterminations) {
						qs.exact_buffered_determinations = additionalFields.exactBufferedDeterminations;
					}
					if (additionalFields.exactBufferedOtherLabels) {
						qs.exact_buffered_other_labels = additionalFields.exactBufferedOtherLabels;
					}
					if (additionalFields.geoJson) {
						qs.geo_json = additionalFields.geoJson;
					}
					if (additionalFields.geographicArea) {
						qs.geographic_area = additionalFields.geographicArea;
					}
					if (additionalFields.georeferences) {
						qs.georeferences = additionalFields.georeferences;
					}
					if (additionalFields.identifier) {
						qs.identifier = additionalFields.identifier;
					}
					if (additionalFields.identifierStart) {
						qs.identifier_start = additionalFields.identifierStart;
					}
					if (additionalFields.identifierEnd) {
						qs.identifier_end = additionalFields.identifierEnd;
					}
					if (additionalFields.identifierExact) {
						qs.identifier_exact = additionalFields.identifierExact;
					}
					if (additionalFields.identifiers) {
						qs.identifiers = additionalFields.identifiers;
					}
					if (additionalFields.inLabels) {
						qs.in_labels = additionalFields.inLabels;
					}
					if (additionalFields.inVerbatimLocality) {
						qs.in_verbatim_locality = additionalFields.inVerbatimLocality;
					}
					if (additionalFields.loaned) {
						qs.loaned = additionalFields.loaned;
					}
					if (additionalFields.md5VerbatimLabel) {
						qs.md5_verbatim_label = additionalFields.md5VerbatimLabel;
					}
					if (additionalFields.namespaceId) {
						qs.namespace_id = additionalFields.namespaceId;
					}
					if (additionalFields.neverLoaned) {
						qs.never_loaned = additionalFields.neverLoaned;
					}
					if (additionalFields.onLoan) {
						qs.on_loan = additionalFields.onLoan;
					}
					if (additionalFields.partialOverlapDates) {
						qs.partial_overlap_dates = additionalFields.partialOverlapDates;
					}
					if (additionalFields.projectId) {
						qs.project_id = additionalFields.projectId;
					}
					if (additionalFields.radius) {
						qs.radius = additionalFields.radius;
					}
					if (additionalFields.repository) {
						qs.repository = additionalFields.repository;
					}
					if (additionalFields.repositoryId) {
						qs.repository_id = additionalFields.repositoryId;
					}
					if (additionalFields.sledImageId) {
						qs.sled_image_id = additionalFields.sledImageId;
					}
					if (additionalFields.spatialGeographicAreas) {
						qs.spatial_geographic_areas = additionalFields.spatialGeographicAreas;
					}
					if (additionalFields.taxonDeterminations) {
						qs.taxon_determinations = additionalFields.taxonDeterminations;
					}
					if (additionalFields.typeMaterial) {
						qs.type_material = additionalFields.typeMaterial;
					}
					if (additionalFields.typeSpecimenTaxonNameId) {
						qs.type_specimen_taxon_name_id = additionalFields.typeSpecimenTaxonNameId;
					}
					if (additionalFields.userDateStart) {
						qs.user_date_start = additionalFields.userDateStart;
					}
					if (additionalFields.userDateEnd) {
						qs.user_date_end = additionalFields.userDateEnd;
					}
					if (additionalFields.userId) {
						qs.user_id = additionalFields.userId;
					}
					if (additionalFields.userTarget) {
						qs.user_target = additionalFields.userTarget;
					}
					if (additionalFields.validity) {
						qs.validity = additionalFields.validity;
					}
					if (additionalFields.withBufferedCollectingEvent) {
						qs.with_buffered_collecting_event = additionalFields.withBufferedCollectingEvent;
					}
					if (additionalFields.withBufferedDeterminations) {
						qs.with_buffered_determinations = additionalFields.withBufferedDeterminations;
					}
					if (additionalFields.withBufferedOtherLabels) {
						qs.with_buffered_other_labels = additionalFields.withBufferedOtherLabels;
					}
					if (additionalFields.wkt) {
						qs.wkt = additionalFields.wkt;
					}
					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}

					let urlParams = '';
					if (additionalFields.biocurationClassIds) {
						urlParams = setUrlParameters('biocuration_class_ids[]', additionalFields.biocurationClassIds as string, urlParams);
					}
					if (additionalFields.biologicalRelationshipIds) {
						urlParams = setUrlParameters('biological_relationship_ids[]', additionalFields.biologicalRelationshipIds as string, urlParams);
					}
					if (additionalFields.collectingEventIds) {
						urlParams = setUrlParameters('collecting_event_ids[]', additionalFields.collectingEventIds as string, urlParams);
					}
					if (additionalFields.collectorIdsOr) {
						urlParams = setUrlParameters('collector_ids_or[]', additionalFields.collectorIdsOr as string, urlParams);
					}
					if (additionalFields.determinerId) {
						urlParams = setUrlParameters('determiner_id[]', additionalFields.determinerId as string, urlParams);
					}
					if (additionalFields.determinerIdOr) {
						urlParams = setUrlParameters('determiner_id_or[]', additionalFields.determinerIdOr as string, urlParams);
					}
					if (additionalFields.geographicAreaIds) {
						urlParams = setUrlParameters('geographic_area_ids[]', additionalFields.geographicAreaIds as string, urlParams);
					}
					if (additionalFields.isType) {
						urlParams = setUrlParameters('is_type[]', additionalFields.isType as string, urlParams);
					}
					if (additionalFields.isType) {
						urlParams = setUrlParameters('is_type[]', additionalFields.isType as string, urlParams);
					}
					if (additionalFields.keywordIdAnd) {
						urlParams = setUrlParameters('keyword_id_and[]', additionalFields.keywordIdAnd as string, urlParams);
					}
					if (additionalFields.keywordIdOr) {
						urlParams = setUrlParameters('keyword_id_or[]', additionalFields.keywordIdOr as string, urlParams);
					}
					if (additionalFields.otuIds) {
						urlParams = setUrlParameters('otu_ids[]', additionalFields.otuIds as string, urlParams);
					}
					if (additionalFields.preparationTypeId) {
						urlParams = setUrlParameters('preparation_type_id[]', additionalFields.preparationTypeId as string, urlParams);
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/collection_objects${idEndpoint}?token=${userCredentials.token}&project_token=${projectCredentials.projectToken}${urlParams}`,
						json: true,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			}
			else if (resource === 'contents') {
				if (operation === 'get') {
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					let idEndpoint = '';
					if (additionalFields.id) {
						idEndpoint = `/${additionalFields.id}`;
					}
					if (additionalFields.citations) {
						qs.citations = additionalFields.citations;
					}
					if (additionalFields.depictions) {
						qs.depictions = additionalFields.depictions;
					}
					if (additionalFields.exact) {
						qs.exact = additionalFields.exact;
					}
					if (additionalFields.text) {
						qs.text = additionalFields.text;
					}
					if (additionalFields.userDateStart) {
						qs.user_date_start = additionalFields.userDateStart;
					}
					if (additionalFields.userDateEnd) {
						qs.user_date_end = additionalFields.userDateEnd;
					}
					if (additionalFields.userId) {
						qs.user_id = additionalFields.userId;
					}
					if (additionalFields.userTarget) {
						qs.user_target = additionalFields.userTarget;
					}
					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}
					qs.token = userCredentials.token;
					qs.project_token = projectCredentials.projectToken;

					let urlParams = '';
					if (additionalFields.otuIds) {
						urlParams = setUrlParameters('otu_id[]', additionalFields.otuIds as string, urlParams);
					}
					if (additionalFields.topicIds) {
						urlParams = setUrlParameters('topic_id[]', additionalFields.topicIds as string, urlParams);
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/contents${idEndpoint}?token=${userCredentials.token}&project_token=${projectCredentials.projectToken}${urlParams}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			}
			else if (resource === 'dataAttributes') {
				if (operation === 'get') {

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}
					qs.token = userCredentials.token;
					qs.project_token = projectCredentials.projectToken;

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/data_attributes`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);

				}
			}
			else if (resource === 'downloads') {
				if (operation === 'get') {

					// TODO: TW downloads endpoint doesn't seem to work?
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};
					qs.token = userCredentials.token;
					qs.project_token = projectCredentials.projectToken;

					let endpoint = '';
					if (additionalFields.id) {
						endpoint = `/${additionalFields.id}`;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/downloads${endpoint}?token=${userCredentials.token}&project_token=${projectCredentials.projectToken}`,
						json: true,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);

				}
			}
			else if (resource === 'identifiers') {
				if (operation === 'get') {
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					if (additionalFields.identifier) {
						qs.identifier = additionalFields.identifier;
					}
					if (additionalFields.namespaceId) {
						qs.namespace_id = additionalFields.namespaceId;
					}
					if (additionalFields.namespaceName) {
						qs.namespace_name = additionalFields.namespaceName;
					}
					if (additionalFields.namespaceShortName) {
						qs.namespace_short_name = additionalFields.namespaceShortName;
					}
					if (additionalFields.objectGlobalId) {
						qs.object_global_id = additionalFields.objectGlobalId;
					}
					if (additionalFields.type) {
						qs.type = additionalFields.type;
					}
					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}
					qs.token = userCredentials.token;
					qs.project_token = projectCredentials.projectToken;

					let urlParams = '';
					if (additionalFields.identifierObjectId) {
						urlParams = setUrlParameters('identifier_object_id[]', additionalFields.identifierObjectId as string, urlParams);
					}
					if (additionalFields.identifierObjectType) {
						// @ts-ignore
						urlParams = setUrlParameters('identifier_object_type[]', additionalFields.identifierObjectType, urlParams);
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/identifiers?token=${userCredentials.token}&project_token=${projectCredentials.projectToken}${urlParams}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);

				}
			}
			else if (resource === 'images') {
				if (operation === 'get') {
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					let endpointId = '';
					if (additionalFields.id) {
						endpointId = `/${additionalFields.id}`;
					}
					if (additionalFields.ancestorIdTarget) {
						qs.ancestor_id_target = additionalFields.ancestorIdTarget;
					}
					if (additionalFields.depiction) {
						qs.depiction = additionalFields.depiction;
					}
					if (additionalFields.identifier) {
						qs.identifier = additionalFields.identifier;
					}
					if (additionalFields.identifierStart) {
						qs.identifier_start = additionalFields.identifierStart;
					}
					if (additionalFields.identifierEnd) {
						qs.identifier_end = additionalFields.identifierEnd;
					}
					if (additionalFields.identifierExact) {
						qs.identifier_exact = additionalFields.identifierExact;
					}
					if (additionalFields.userDateStart) {
						qs.user_date_start = additionalFields.userDateStart;
					}
					if (additionalFields.userDateEnd) {
						qs.user_date_end = additionalFields.userDateEnd;
					}
					if (additionalFields.userId) {
						qs.user_id = additionalFields.userId;
					}
					if (additionalFields.userTarget) {
						qs.user_target = additionalFields.userTarget;
					}
					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}
					qs.token = userCredentials.token;
					qs.project_token = projectCredentials.projectToken;

					let urlParams = '';
					if (additionalFields.biocurationClassIds) {
						urlParams = setUrlParameters('biocuration_class_id[]', additionalFields.biocurationClassIds as string, urlParams);
					}
					if (additionalFields.collectionObjectIds) {
						urlParams = setUrlParameters('collection_object_id[]', additionalFields.collectionObjectIds as string, urlParams);
					}
					if (additionalFields.imageIds) {
						urlParams = setUrlParameters('image_id[]', additionalFields.imageId as string, urlParams);
					}
					if (additionalFields.keywordIdAnd) {
						urlParams = setUrlParameters('keyword_id_and[]', additionalFields.keywordIdAnd as string, urlParams);
					}
					if (additionalFields.keywordIdOr) {
						urlParams = setUrlParameters('keyword_id_or[]', additionalFields.keywordIdOr as string, urlParams);
					}
					if (additionalFields.otuIds) {
						urlParams = setUrlParameters('otu_id[]', additionalFields.otuIds as string, urlParams);
					}
					if (additionalFields.sledImageIds) {
						urlParams = setUrlParameters('sled_image_id[]', additionalFields.sledImageIds as string, urlParams);
					}
					if (additionalFields.taxonNameIds) {
						urlParams = setUrlParameters('taxon_name_id[]', additionalFields.taxonNameIds as string, urlParams);
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/images${endpointId}?token=${userCredentials.token}&project_token=${projectCredentials.projectToken}${urlParams}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);


				}
			}
			else if (resource === 'notes') {
				if (operation === 'get') {
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					let endpoint = '';
					if (additionalFields.id) {
						endpoint = `/${additionalFields.id}`;
					}
					if (additionalFields.objectGlobalId) {
						qs.object_global_id = additionalFields.objectGlobalId;
					}
					if (additionalFields.text) {
						qs.text = additionalFields.text;
					}
					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}
					qs.token = userCredentials.token;
					qs.project_token = projectCredentials.projectToken;

					let urlParams = '';
					if (additionalFields.noteObjectIds) {
						urlParams = setUrlParameters('note_object_id[]', additionalFields.noteObjectIds as string, urlParams);
					}
					if (additionalFields.noteObjectTypes) {
						urlParams = setUrlParameters('note_object_type[]', additionalFields.noteObjectTypes as string, urlParams);
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/notes${endpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);

				}
			}
			else if (resource === 'observationMatrices') {
				if (operation === 'get') {
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					let endpointId = '';
					if (additionalFields.id) {
						endpointId = `/${additionalFields.id}`;
					}
					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}
					qs.token = userCredentials.token;
					qs.project_token = projectCredentials.projectToken;

					let urlParams = '';
					if (additionalFields.observationMatrixIds) {
						urlParams = setUrlParameters('observation_matrix_id[]', additionalFields.observationMatrixIds as string, urlParams);
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/observation_matrices${endpointId}?token=${qs.token}&project_token=${qs.project_token}${urlParams}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);

				}
			}
			else if (resource === 'observations') {
				if (operation === 'get') {
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					if (additionalFields.collectionObjectId) {
						qs.collection_object_id = additionalFields.collectionObjectId;
					}
					if (additionalFields.descriptorId) {
						qs.descriptor_id = additionalFields.descriptorId;
					}
					if (additionalFields.observationObjectGlobalId) {
						qs.observation_object_global_id = additionalFields.observationObjectGlobalId;
					}
					if (additionalFields.otuId) {
						qs.otu_id = additionalFields.otuId;
					}
					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}
					qs.token = userCredentials.token;
					qs.project_token = projectCredentials.projectToken;

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/observations`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			}
			else if (resource === 'otus') {
				if (operation === 'get') {

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};


					if (additionalFields.dataAttributes) {
						qs.data_attributes = additionalFields.dataAttributes;
					}
					if (additionalFields.name) {
						qs.name = additionalFields.name;
					}
					if (additionalFields.otuId) {
						qs.otu_id = additionalFields.otuId;
					}
					if (additionalFields.taxonNameId) {
						qs.taxon_name_id = additionalFields.taxonNameId;
					}
					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}

					let urlParams = '';
					if (additionalFields.otuIds) {
						urlParams = setUrlParameters('otu_ids[]', additionalFields.otuIds as string, urlParams);
					}
					if (additionalFields.assertedDistributionIds) {
						urlParams = setUrlParameters('asserted_distribution_ids[]', additionalFields.assertedDistributionIds as string, urlParams);
					}
					if (additionalFields.biologicalAssociationIds) {
						urlParams = setUrlParameters('biological_association_ids[]', additionalFields.biologicalAssociationIds as string, urlParams);
					}
					if (additionalFields.taxonNameClassificationIds) {
						urlParams = setUrlParameters('taxon_name_classification_ids[]', additionalFields.taxonNameClassificationIds as string, urlParams);
					}
					if (additionalFields.taxonNameIds) {
						urlParams = setUrlParameters('taxon_name_ids[]', additionalFields.taxonNameIds as string, urlParams);
					}
					if (additionalFields.taxonNameRelationshipsIds) {
						urlParams = setUrlParameters('taxon_name_relationships_ids[]', additionalFields.taxonNameRelationshipsIds as string, urlParams);
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/otus?token=${userCredentials.token}&project_token=${projectCredentials.projectToken}${urlParams}`,
						json: true,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			}
			else if (resource === 'people') {
				if (operation === 'get') {

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					if (additionalFields.activeAfterYear) {
						qs.active_after_year = additionalFields.activeAfterYear;
					}
					if (additionalFields.activeBeforeYear) {
						qs.active_before_year = additionalFields.activeBeforeYear;
					}
					if (additionalFields.bornAfterYear) {
						qs.born_after_year = additionalFields.bornAfterYear;
					}
					if (additionalFields.bornBeforeYear) {
						qs.born_before_year = additionalFields.bornBeforeYear;
					}
					if (additionalFields.diedAfteryear) {
						qs.died_after_year = additionalFields.diedAfteryear;
					}
					if (additionalFields.diedBeforeYear) {
						qs.died_before_year = additionalFields.diedBeforeYear;
					}
					if (additionalFields.firstName) {
						qs.first_name = additionalFields.firstName;
					}
					if (additionalFields.lastName) {
						qs.last_name = additionalFields.lastName;
					}
					if (additionalFields.lastNameStartsWith) {
						qs.last_name_starts_with = additionalFields.lastNameStartsWith;
					}
					if (additionalFields.levenshteinCutoff) {
						qs.levenshtein_cutoff = additionalFields.levenshteinCutoff;
					}
					if (additionalFields.sourceId) {
						qs.source_id = additionalFields.sourceId;
					}
					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}
					qs.token = userCredentials.token;
					qs.project_token = projectCredentials.projectToken;
					qs.project_id = projectCredentials.projectId;

					let urlParams = '';
					if (additionalFields.personWildcard) {
						urlParams = setUrlParameters('person_wildcard[]', additionalFields.personWildcard as string, urlParams);
					}

					if (additionalFields.role) {
						// @ts-ignore
						urlParams = setUrlParameters('role[]', objectToString(additionalFields.role), urlParams);
					}


					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/people?token=${userCredentials.token}&project_token=${projectCredentials.projectToken}${urlParams}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			}
			else if (resource === 'projects') {
				if (operation === 'get') {

					const qs: IDataObject = {};
					qs.token = userCredentials.token;
					qs.project_token = projectCredentials.projectToken;

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			}
			else if (resource === 'sources') {
				if (operation === 'get') {

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					let idEndpoint = '';
					if (additionalFields.id) {
						idEndpoint = `/${additionalFields.id}`;
					}
					if (additionalFields.author) {
						qs.author = additionalFields.author;
					}
					if (additionalFields.citations) {
						qs.citations = additionalFields.citations;
					}
					if (additionalFields.documents) {
						qs.documents = additionalFields.documents;
					}
					if (additionalFields.exactAuthor) {
						qs.exactAuthor = additionalFields.exactAuthor;
					}
					if (additionalFields.exactTitle) {
						qs.exactTitle = additionalFields.exactTitle;
					}
					if (additionalFields.identifier) {
						qs.identifier = additionalFields.identifier;
					}
					if (additionalFields.identifierStart) {
						qs.identifier_start = additionalFields.identifierStart;
					}
					if (additionalFields.identifierEnd) {
						qs.identifier_end = additionalFields.identifierEnd;
					}
					if (additionalFields.identifierExact) {
						qs.identifier_exact = additionalFields.identifierExact;
					}
					if (additionalFields.inProject) {
						qs.in_project = additionalFields.inProject;
					}
					if (additionalFields.nomenclature) {
						qs.nomenclature = additionalFields.nomenclature;
					}
					if (additionalFields.notes) {
						qs.notes = additionalFields.notes;
					}
					if (additionalFields.projectId) {
						qs.project_id = additionalFields.projectId;
					}
					if (additionalFields.recent) {
						qs.recent = additionalFields.recent;
					}
					if (additionalFields.roles) {
						qs.roles = additionalFields.roles;
					}
					if (additionalFields.sourceType) {
						qs.source_type = additionalFields.sourceType;
					}
					if (additionalFields.title) {
						qs.title = additionalFields.title;
					}
					if (additionalFields.withDoi) {
						qs.with_doi = additionalFields.withDoi;
					}
					if (additionalFields.userDateStart) {
						qs.user_date_start = additionalFields.userDateStart;
					}
					if (additionalFields.userDateEnd) {
						qs.user_date_end = additionalFields.userDateEnd;
					}
					if (additionalFields.yearStart) {
						qs.year_start = additionalFields.yearStart;
					}
					if (additionalFields.yearEnd) {
						qs.year_end = additionalFields.yearEnd;
					}
					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}
					qs.token = userCredentials.token;
					qs.project_token = projectCredentials.projectToken;

					let urlParams = '';
					if (additionalFields.authorIds) {
						urlParams = setUrlParameters('author_id[]', additionalFields.authorIds as string, urlParams);
					}
					if (additionalFields.ids) {
						urlParams = setUrlParameters('ids[]', additionalFields.ids as string, urlParams);
					}
					if (additionalFields.keywordIdOr) {
						urlParams = setUrlParameters('keyword_id_or[]', additionalFields.keywordIdOr as string, urlParams);
					}
					if (additionalFields.keywordIdAnd) {
						urlParams = setUrlParameters('keyword_id_and[]', additionalFields.keywordIdAnd as string, urlParams);
					}
					if (additionalFields.topicIds) {
						urlParams = setUrlParameters('topic_ids[]', additionalFields.topicIds as string, urlParams);
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/sources${idEndpoint}?token=${userCredentials.token}&project_token=${projectCredentials.projectToken}${urlParams}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);

				}
			}
			else if (resource === 'taxonNameClassification') {
				if (operation === 'get') {

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}
					qs.token = userCredentials.token;
					qs.project_token = projectCredentials.projectToken;

					let urlParams = '';
					if (additionalFields.taxonNameId) {
						// @ts-ignore
						urlParams = setUrlParameters('taxon_name_id[]', additionalFields.taxonNameId, urlParams);
					}
					if (additionalFields.taxonNameClassificationType) {
						// @ts-ignore
						urlParams = setUrlParameters('taxon_name_classification_type[]', objectToString(additionalFields.taxonNameClassificationType), urlParams);
					}
					if (additionalFields.taxonNameClassificationSet) {
						// @ts-ignore
						urlParams = setUrlParameters('taxon_name_classification_set[]', objectToString(additionalFields.taxonNameClassificationSet), urlParams);
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/taxon_name_classifications?token=${userCredentials.token}&project_token=${projectCredentials.projectToken}${urlParams}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);

				}
			}
			else if (resource === 'taxonNameRelationship') {
				if (operation === 'get') {

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}
					qs.token = userCredentials.token;
					qs.project_token = projectCredentials.projectToken;

					let urlParams = '';
					if (additionalFields.objectTaxonNameId) {
						// @ts-ignore
						urlParams = setUrlParameters('object_taxon_name_id[]', additionalFields.objectTaxonNameId, urlParams);
					}
					if (additionalFields.subjectTaxonNameId) {
						// @ts-ignore
						urlParams = setUrlParameters('subject_taxon_name_id[]', additionalFields.subjectTaxonNameId, urlParams);
					}
					if (additionalFields.taxonNameId) {
						// @ts-ignore
						urlParams = setUrlParameters('taxon_name_id[]', additionalFields.taxonNameId, urlParams);
					}
					if (additionalFields.taxonNameClassificationSet) {
						// @ts-ignore
						urlParams = setUrlParameters('taxon_name_classification_set[]', objectToString(additionalFields.taxonNameClassificationSet), urlParams);
					}
					if (additionalFields.taxonNameRelationshipType) {
						// @ts-ignore
						urlParams = setUrlParameters('taxon_name_relationship_type[]', objectToString(additionalFields.taxonNameRelationshipType), urlParams);
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/taxon_name_relationships?token=${userCredentials.token}&project_token=${projectCredentials.projectToken}${urlParams}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);

				}
			}
			else if (resource === 'taxonNames') {
				if (operation === 'get') {

					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const qs: IDataObject = {};

					if (additionalFields.sciName) {
						qs.name = additionalFields.sciName;
					}
					if (additionalFields.author) {
						qs.author = additionalFields.author;
					}
					if (additionalFields.authors) {
						qs.authors = additionalFields.authors;
					}
					if (additionalFields.citations) {
						qs.citations = additionalFields.citations;
					}
					if (additionalFields.descendants) {
						qs.descendants = additionalFields.descendants;
					}
					if (additionalFields.etymology) {
						qs.etymology = additionalFields.etymology;
					}
					if (additionalFields.exact) {
						qs.exact = additionalFields.exact;
					}
					if (additionalFields.leaves) {
						qs.leaves = additionalFields.leaves;
					}
					if (additionalFields.nomenclatureGroup) {
						qs.nomenclature_group = additionalFields.nomenclatureGroup;
					}
					if (additionalFields.otus) {
						qs.otus = additionalFields.otus;
					}
					if (additionalFields.typeMetadata) {
						qs.type_metadata = additionalFields.typeMetadata;
					}
					if (additionalFields.userDateTarget) {
						qs.user_date_target = additionalFields.userDateTarget;
					}
					if (additionalFields.userDateStart) {
						qs.user_date_start = additionalFields.userDateStart;
					}
					if (additionalFields.userDateEnd) {
						qs.user_date_end = additionalFields.userDateEnd;
					}
					if (additionalFields.validity) {
						qs.validity = additionalFields.validity;
					}
					if (additionalFields.year) {
						qs.year = additionalFields.year;
					}
					if (additionalFields.page) {
						qs.page = additionalFields.page;
					}
					if (additionalFields.per) {
						qs.per = additionalFields.per;
					}

					let urlParams = '';
					if (additionalFields.nomenclatureCode) {
						// @ts-ignore
						urlParams = setUrlParameters('nomenclature_code[]', objectToString(additionalFields.nomenclatureCode), urlParams);
					}
					if (additionalFields.taxonNameId) {
						// @ts-ignore
						urlParams = setUrlParameters('taxon_name_id[]', additionalFields.taxonNameId, urlParams);
					}
					if (additionalFields.taxonNameRelationshipType) {
						// @ts-ignore
						urlParams = setUrlParameters('taxon_name_relationship_type[]', objectToString(additionalFields.taxonNameRelationshipType), urlParams);
					}
					if (additionalFields.taxonNameClassificationType) {
						// @ts-ignore
						urlParams = setUrlParameters('taxon_name_classification_type[]', objectToString(additionalFields.taxonNameClassificationType), urlParams);
					}
					if (additionalFields.taxonNameType) {
						// @ts-ignore
						urlParams = setUrlParameters('taxon_name_type[]', objectToString(additionalFields.taxonNameType), urlParams);
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${host}/api/v1/taxon_names?token=${userCredentials.token}&project_token=${projectCredentials.projectToken}${urlParams}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			}
		}
		return [this.helpers.returnJsonArray(returnData[0])];
	}
}
