import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class Itis implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ITIS',
		name: 'itis',
		icon: 'file:itis.svg',
		group: ['transform'],
		version: 1,
		description: 'Authoritative taxonomic information on plants, animals, fungi, and microbes of North America and the world',
		defaults: {
			name: 'ITIS',
			color: '#558594',
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
						name: 'Metadata',
						value: 'metadata',
					},
					{
						name: 'Name',
						value: 'name',
					},
					{
						name: 'Name Usage',
						value: 'nameUsage',
					},
					{
						name: 'Name Usage Search',
						value: 'nameUsageSearch',
					},
					{
						name: 'Name Usage Suggest',
						value: 'nameUsageSuggest',
					},
					{
						name: 'Reference',
						value: 'reference',
					},
					{
						name: 'Synonym',
						value: 'synonym',
					},
					{
						name: 'Taxon',
						value: 'taxon',
					},
					{
						name: 'Tree',
						value: 'tree',
					},
					{
						name: 'Vernacular',
						value: 'vernacular',
					},
				],
				default: '',
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
							'metadata',
							'name',
							'nameUsage',
							'nameUsageSearch',
							'nameUsageSuggest',
							'reference',
							'synonym',
							'taxon',
							'tree',
							'vernacular',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a resource',
					},
				],
				default: 'get',
				description: 'The operation to perform.',
			},
			{
				displayName: 'Query',
				name: 'q',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'nameUsageSearch',
							'nameUsageSuggest',
						],
					},
				},
				default:'',
				description:'The search query',
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
							'nameUsage',
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
						required: false,
						description: 'The name usage ID',
					},
					{
						displayName: 'Query',
						name: 'q',
						type: 'string',
						required: false,
						default:'',
						description:'The name usage search query',
					},
					{
						displayName: 'Rank',
						name: 'rank',
						type: 'options',
						default: '',
						required: false,
						description: 'The name usage rank',
						options: [
							{
								name: 'Domain',
								value: 'DOMAIN',
							},
							{
								name: 'Realm',
								value: 'REALM',
							},
							{
								name: 'Subrealm',
								value: 'SUBREALM',
							},
							{
								name: 'Superkingdom',
								value: 'SUPERKINGDOM',
							},
							{
								name: 'Kingdom',
								value: 'KINGDOM',
							},
							{
								name: 'Subkingdom',
								value: 'SUBKINGDOM',
							},
							{
								name: 'Infrakingdom',
								value: 'INFRAKINGDOM',
							},
							{
								name: 'Superphylum',
								value: 'SUPERPHYLUM',
							},
							{
								name: 'Phylum',
								value: 'PHYLUM',
							},
							{
								name: 'Subphylum',
								value: 'SUBPHYLUM',
							},
							{
								name: 'Infraphylum',
								value: 'INFRAPHYLUM',
							},
							{
								name: 'Parvphylum',
								value: 'PARVPHYLUM',
							},
							{
								name: 'Microphylum',
								value: 'MICROPHYLUM',
							},
							{
								name: 'Nanophylum',
								value: 'NANOPHYLUM',
							},
							{
								name: 'Gigaclass',
								value: 'GIGACLASS',
							},
							{
								name: 'Megaclass',
								value: 'MEGACLASS',
							},
							{
								name: 'Superclass',
								value: 'SUPERCLASS',
							},
							{
								name: 'Class',
								value: 'CLASS',
							},
							{
								name: 'Subclass',
								value: 'SUBCLASS',
							},
							{
								name: 'Infraclass',
								value: 'INFRACLASS',
							},
							{
								name: 'Subterclass',
								value: 'SUBTERCLASS',
							},
							{
								name: 'Parvclass',
								value: 'PARVCLASS',
							},
							{
								name: 'Superdivision',
								value: 'SUPERDIVISION',
							},
							{
								name: 'Division',
								value: 'DIVISION',
							},
							{
								name: 'Subdivision',
								value: 'SUBDIVISION',
							},
							{
								name: 'Infradivision',
								value: 'INFRADIVISION',
							},
							{
								name: 'Superlegion',
								value: 'SUPERLEGION',
							},
							{
								name: 'Legion',
								value: 'LEGION',
							},
							{
								name: 'Sublegion',
								value: 'SUBLEGION',
							},
							{
								name: 'Infralegion',
								value: 'INFRALEGION',
							},
							{
								name: 'Megacohort',
								value: 'MEGACOHORT',
							},
							{
								name: 'Supercohort',
								value: 'SUPERCOHORT',
							},
							{
								name: 'Cohort',
								value: 'COHORT',
							},
							{
								name: 'Subcohort',
								value: 'SUBCOHORT',
							},
							{
								name: 'Infracohort',
								value: 'INFRACOHORT',
							},
							{
								name: 'Gigaorder',
								value: 'GIGAORDER',
							},
							{
								name: 'Magnorder',
								value: 'MAGNORDER',
							},
							{
								name: 'Grandorder',
								value: 'GRANDORDER',
							},
							{
								name: 'Mirorder',
								value: 'MIRORDER',
							},
							{
								name: 'Superorder',
								value: 'SUPERORDER',
							},
							{
								name: 'Order',
								value: 'ORDER',
							},
							{
								name: 'Nanorder',
								value: 'NANORDER',
							},
							{
								name: 'Hypoorder',
								value: 'HYPOORDER',
							},
							{
								name: 'Minorder',
								value: 'MINORDER',
							},
							{
								name: 'Suborder',
								value: 'SUBORDER',
							},
							{
								name: 'Infraorder',
								value: 'INFRAORDER',
							},
							{
								name: 'Parvorder',
								value: 'PARVORDER',
							},
							{
								name: 'Megafamily',
								value: 'MEGAFAMILY',
							},
							{
								name: 'Grandfamily',
								value: 'GRANDFAMILY',
							},
							{
								name: 'Superfamily',
								value: 'SUPERFAMILY',
							},
							{
								name: 'Epifamily',
								value: 'EPIFAMILY',
							},
							{
								name: 'Family',
								value: 'FAMILY',
							},
							{
								name: 'Subfamily',
								value: 'SUBFAMILY',
							},
							{
								name: 'Infrafamily',
								value: 'INFRAFAMILY',
							},
							{
								name: 'Supertribe',
								value: 'SUPERTRIBE',
							},
							{
								name: 'Tribe',
								value: 'TRIBE',
							},
							{
								name: 'Subtribe',
								value: 'SUBTRIBE',
							},
							{
								name: 'Infratribe',
								value: 'INFRATRIBE',
							},
							{
								name: 'Suprageneric Name',
								value: 'SUPRAGENERIC_NAME',
							},
							{
								name: 'Genus',
								value: 'GENUS',
							},
							{
								name: 'Subgenus',
								value: 'SUBGENUS',
							},
							{
								name: 'Infragenus',
								value: 'INFRAGENUS',
							},
							{
								name: 'Supersection',
								value: 'SUPERSECTION',
							},
							{
								name: 'Section',
								value: 'SECTION',
							},
							{
								name: 'Subsection',
								value: 'SUBSECTION',
							},
							{
								name: 'Superseries',
								value: 'SUPERSERIES',
							},
							{
								name: 'Series',
								value: 'SERIES',
							},
							{
								name: 'Subseries',
								value: 'SUBSERIES',
							},
							{
								name: 'Infrageneric Name',
								value: 'INFRAGENERIC_NAME',
							},
							{
								name: 'Species Aggregate',
								value: 'SPECIES_AGGREGATE',
							},
							{
								name: 'Species',
								value: 'SPECIES',
							},
							{
								name: 'Infraspecific Name',
								value: 'INFRASPECIFIC_NAME',
							},
							{
								name: 'Grex',
								value: 'GREX',
							},
							{
								name: 'Subspecies',
								value: 'SUBSPECIES',
							},
							{
								name: 'Cultivar Group',
								value: 'CULTIVAR_GROUP',
							},
							{
								name: 'Convariety',
								value: 'CONVARIETY',
							},
							{
								name: 'Infrasubspecific Name',
								value: 'INFRASUBSPECIFIC_NAME',
							},
							{
								name: 'Proles',
								value: 'PROLES',
							},
							{
								name: 'Natio',
								value: 'NATIO',
							},
							{
								name: 'Aberration',
								value: 'ABERRATION',
							},
							{
								name: 'Morph',
								value: 'MORPH',
							},
							{
								name: 'Variety',
								value: 'VARIETY',
							},
							{
								name: 'Subvariety',
								value: 'SUBVARIETY',
							},
							{
								name: 'Form',
								value: 'FORM',
							},
							{
								name: 'Subform',
								value: 'SUBFORM',
							},
							{
								name: 'Pathovar',
								value: 'PATHOVAR',
							},
							{
								name: 'Biovar',
								value: 'BIOVAR',
							},
							{
								name: 'Chemovar',
								value: 'CHEMOVAR',
							},
							{
								name: 'Morphovar',
								value: 'MORPHOVAR',
							},
							{
								name: 'Phagovar',
								value: 'PHAGOVAR',
							},
							{
								name: 'Serovar',
								value: 'SEROVAR',
							},
							{
								name: 'Chemoform',
								value: 'CHEMOFORM',
							},
							{
								name: 'Forma Specialis',
								value: 'FORMA_SPECIALIS',
							},
							{
								name: 'Cultivar',
								value: 'CULTIVAR',
							},
							{
								name: 'Strain',
								value: 'STRAIN',
							},
							{
								name: 'Other',
								value: 'OTHER',
							},
							{
								name: 'Unranked',
								value: 'UNRANKED',
							},
						],
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'The result paging offset',
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 10,
						description: 'The result paging limit',
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
							'nameUsageSearch',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Content',
						name: 'content',
						type: 'options',
						default: '',
						required: false,
						description: 'The type of content to search',
						options: [
							{
								name: 'Authorship',
								value: 'AUTHORSHIP',
							},
							{
								name: 'Scientific Name',
								value: 'SCIENTIFIC_NAME',
							},
						],
					},
					{
						displayName: 'Facet',
						name: 'facet',
						type: 'multiOptions',
						default: '',
						required: false,
						description: 'The search facets',
						options: [
							{
								name: 'Alpha Index',
								value: 'ALPHAINDEX',
							},
							{
								name: 'Authorship',
								value: 'AUTHORSHIP',
							},
							{
								name: 'Authorship Year',
								value: 'AUTHORSHIP_YEAR',
							},
							{
								name: 'Catalogue Key',
								value: 'CATALOGUE_KEY',
							},
							{
								name: 'Dataset Key',
								value: 'DATASET_KEY',
							},
							{
								name: 'Decision Mode',
								value: 'DECISION_MODE',
							},
							{
								name: 'Environment',
								value: 'ENVIRONMENT',
							},
							{
								name: 'Extinct',
								value: 'EXTINCT',
							},
							{
								name: 'Field',
								value: 'FIELD',
							},
							{
								name: 'Issue',
								value: 'ISSUE',
							},
							{
								name: 'Name ID',
								value: 'NAME_ID',
							},
							{
								name: 'Name Type',
								value: 'NAME_TYPE',
							},
							{
								name: 'Nomenclatural Code',
								value: 'NOM_CODE',
							},
							{
								name: 'Nomenclatural Status',
								value: 'NOM_STATUS',
							},
							{
								name: 'Origin',
								value: 'ORIGIN',
							},
							{
								name: 'Published In ID',
								value: 'PUBLISHED_IN_ID',
							},
							{
								name: 'Publisher Key',
								value: 'PUBLISHER_KEY',
							},
							{
								name: 'Rank',
								value: 'RANK',
							},
							{
								name: 'Sector Dataset Key',
								value: 'SECTOR_DATASET_KEY',
							},
							{
								name: 'Sector Key',
								value: 'SECTOR_KEY',
							},
							{
								name: 'Status',
								value: 'STATUS',
							},
							{
								name: 'Taxon ID',
								value: 'TAXON_ID',
							},
							{
								name: 'Unsafe',
								value: 'UNSAFE',
							},
							{
								name: 'Usage ID',
								value: 'USAGE_ID',
							},
						],
					},
					{
						displayName: 'Facet Limit',
						name: 'facetLimit',
						type: 'number',
						default: '',
						required: false,
						description: 'The search facet limit',
					},
					{
						displayName: 'Fuzzy',
						name: 'fuzzy',
						type: 'boolean',
						default: false,
						required: false,
						description: 'Enables fuzzy search',
					},
					{
						displayName: 'Minimum Rank',
						name: 'minRank',
						type: 'options',
						default: '',
						required: false,
						description: 'The minimum rank',
						options: [
							{
								name: 'Domain',
								value: 'DOMAIN',
							},
							{
								name: 'Realm',
								value: 'REALM',
							},
							{
								name: 'Subrealm',
								value: 'SUBREALM',
							},
							{
								name: 'Superkingdom',
								value: 'SUPERKINGDOM',
							},
							{
								name: 'Kingdom',
								value: 'KINGDOM',
							},
							{
								name: 'Subkingdom',
								value: 'SUBKINGDOM',
							},
							{
								name: 'Infrakingdom',
								value: 'INFRAKINGDOM',
							},
							{
								name: 'Superphylum',
								value: 'SUPERPHYLUM',
							},
							{
								name: 'Phylum',
								value: 'PHYLUM',
							},
							{
								name: 'Subphylum',
								value: 'SUBPHYLUM',
							},
							{
								name: 'Infraphylum',
								value: 'INFRAPHYLUM',
							},
							{
								name: 'Parvphylum',
								value: 'PARVPHYLUM',
							},
							{
								name: 'Microphylum',
								value: 'MICROPHYLUM',
							},
							{
								name: 'Nanophylum',
								value: 'NANOPHYLUM',
							},
							{
								name: 'Gigaclass',
								value: 'GIGACLASS',
							},
							{
								name: 'Megaclass',
								value: 'MEGACLASS',
							},
							{
								name: 'Superclass',
								value: 'SUPERCLASS',
							},
							{
								name: 'Class',
								value: 'CLASS',
							},
							{
								name: 'Subclass',
								value: 'SUBCLASS',
							},
							{
								name: 'Infraclass',
								value: 'INFRACLASS',
							},
							{
								name: 'Subterclass',
								value: 'SUBTERCLASS',
							},
							{
								name: 'Parvclass',
								value: 'PARVCLASS',
							},
							{
								name: 'Superdivision',
								value: 'SUPERDIVISION',
							},
							{
								name: 'Division',
								value: 'DIVISION',
							},
							{
								name: 'Subdivision',
								value: 'SUBDIVISION',
							},
							{
								name: 'Infradivision',
								value: 'INFRADIVISION',
							},
							{
								name: 'Superlegion',
								value: 'SUPERLEGION',
							},
							{
								name: 'Legion',
								value: 'LEGION',
							},
							{
								name: 'Sublegion',
								value: 'SUBLEGION',
							},
							{
								name: 'Infralegion',
								value: 'INFRALEGION',
							},
							{
								name: 'Megacohort',
								value: 'MEGACOHORT',
							},
							{
								name: 'Supercohort',
								value: 'SUPERCOHORT',
							},
							{
								name: 'Cohort',
								value: 'COHORT',
							},
							{
								name: 'Subcohort',
								value: 'SUBCOHORT',
							},
							{
								name: 'Infracohort',
								value: 'INFRACOHORT',
							},
							{
								name: 'Gigaorder',
								value: 'GIGAORDER',
							},
							{
								name: 'Magnorder',
								value: 'MAGNORDER',
							},
							{
								name: 'Grandorder',
								value: 'GRANDORDER',
							},
							{
								name: 'Mirorder',
								value: 'MIRORDER',
							},
							{
								name: 'Superorder',
								value: 'SUPERORDER',
							},
							{
								name: 'Order',
								value: 'ORDER',
							},
							{
								name: 'Nanorder',
								value: 'NANORDER',
							},
							{
								name: 'Hypoorder',
								value: 'HYPOORDER',
							},
							{
								name: 'Minorder',
								value: 'MINORDER',
							},
							{
								name: 'Suborder',
								value: 'SUBORDER',
							},
							{
								name: 'Infraorder',
								value: 'INFRAORDER',
							},
							{
								name: 'Parvorder',
								value: 'PARVORDER',
							},
							{
								name: 'Megafamily',
								value: 'MEGAFAMILY',
							},
							{
								name: 'Grandfamily',
								value: 'GRANDFAMILY',
							},
							{
								name: 'Superfamily',
								value: 'SUPERFAMILY',
							},
							{
								name: 'Epifamily',
								value: 'EPIFAMILY',
							},
							{
								name: 'Family',
								value: 'FAMILY',
							},
							{
								name: 'Subfamily',
								value: 'SUBFAMILY',
							},
							{
								name: 'Infrafamily',
								value: 'INFRAFAMILY',
							},
							{
								name: 'Supertribe',
								value: 'SUPERTRIBE',
							},
							{
								name: 'Tribe',
								value: 'TRIBE',
							},
							{
								name: 'Subtribe',
								value: 'SUBTRIBE',
							},
							{
								name: 'Infratribe',
								value: 'INFRATRIBE',
							},
							{
								name: 'Suprageneric Name',
								value: 'SUPRAGENERIC_NAME',
							},
							{
								name: 'Genus',
								value: 'GENUS',
							},
							{
								name: 'Subgenus',
								value: 'SUBGENUS',
							},
							{
								name: 'Infragenus',
								value: 'INFRAGENUS',
							},
							{
								name: 'Supersection',
								value: 'SUPERSECTION',
							},
							{
								name: 'Section',
								value: 'SECTION',
							},
							{
								name: 'Subsection',
								value: 'SUBSECTION',
							},
							{
								name: 'Superseries',
								value: 'SUPERSERIES',
							},
							{
								name: 'Series',
								value: 'SERIES',
							},
							{
								name: 'Subseries',
								value: 'SUBSERIES',
							},
							{
								name: 'Infrageneric Name',
								value: 'INFRAGENERIC_NAME',
							},
							{
								name: 'Species Aggregate',
								value: 'SPECIES_AGGREGATE',
							},
							{
								name: 'Species',
								value: 'SPECIES',
							},
							{
								name: 'Infraspecific Name',
								value: 'INFRASPECIFIC_NAME',
							},
							{
								name: 'Grex',
								value: 'GREX',
							},
							{
								name: 'Subspecies',
								value: 'SUBSPECIES',
							},
							{
								name: 'Cultivar Group',
								value: 'CULTIVAR_GROUP',
							},
							{
								name: 'Convariety',
								value: 'CONVARIETY',
							},
							{
								name: 'Infrasubspecific Name',
								value: 'INFRASUBSPECIFIC_NAME',
							},
							{
								name: 'Proles',
								value: 'PROLES',
							},
							{
								name: 'Natio',
								value: 'NATIO',
							},
							{
								name: 'Aberration',
								value: 'ABERRATION',
							},
							{
								name: 'Morph',
								value: 'MORPH',
							},
							{
								name: 'Variety',
								value: 'VARIETY',
							},
							{
								name: 'Subvariety',
								value: 'SUBVARIETY',
							},
							{
								name: 'Form',
								value: 'FORM',
							},
							{
								name: 'Subform',
								value: 'SUBFORM',
							},
							{
								name: 'Pathovar',
								value: 'PATHOVAR',
							},
							{
								name: 'Biovar',
								value: 'BIOVAR',
							},
							{
								name: 'Chemovar',
								value: 'CHEMOVAR',
							},
							{
								name: 'Morphovar',
								value: 'MORPHOVAR',
							},
							{
								name: 'Phagovar',
								value: 'PHAGOVAR',
							},
							{
								name: 'Serovar',
								value: 'SEROVAR',
							},
							{
								name: 'Chemoform',
								value: 'CHEMOFORM',
							},
							{
								name: 'Forma Specialis',
								value: 'FORMA_SPECIALIS',
							},
							{
								name: 'Cultivar',
								value: 'CULTIVAR',
							},
							{
								name: 'Strain',
								value: 'STRAIN',
							},
							{
								name: 'Other',
								value: 'OTHER',
							},
							{
								name: 'Unranked',
								value: 'UNRANKED',
							},
						],
					},
					{
						displayName: 'Maximum Rank',
						name: 'maxRank',
						type: 'options',
						default: '',
						required: false,
						description: 'The maximum rank',
						options: [
							{
								name: 'Domain',
								value: 'DOMAIN',
							},
							{
								name: 'Realm',
								value: 'REALM',
							},
							{
								name: 'Subrealm',
								value: 'SUBREALM',
							},
							{
								name: 'Superkingdom',
								value: 'SUPERKINGDOM',
							},
							{
								name: 'Kingdom',
								value: 'KINGDOM',
							},
							{
								name: 'Subkingdom',
								value: 'SUBKINGDOM',
							},
							{
								name: 'Infrakingdom',
								value: 'INFRAKINGDOM',
							},
							{
								name: 'Superphylum',
								value: 'SUPERPHYLUM',
							},
							{
								name: 'Phylum',
								value: 'PHYLUM',
							},
							{
								name: 'Subphylum',
								value: 'SUBPHYLUM',
							},
							{
								name: 'Infraphylum',
								value: 'INFRAPHYLUM',
							},
							{
								name: 'Parvphylum',
								value: 'PARVPHYLUM',
							},
							{
								name: 'Microphylum',
								value: 'MICROPHYLUM',
							},
							{
								name: 'Nanophylum',
								value: 'NANOPHYLUM',
							},
							{
								name: 'Gigaclass',
								value: 'GIGACLASS',
							},
							{
								name: 'Megaclass',
								value: 'MEGACLASS',
							},
							{
								name: 'Superclass',
								value: 'SUPERCLASS',
							},
							{
								name: 'Class',
								value: 'CLASS',
							},
							{
								name: 'Subclass',
								value: 'SUBCLASS',
							},
							{
								name: 'Infraclass',
								value: 'INFRACLASS',
							},
							{
								name: 'Subterclass',
								value: 'SUBTERCLASS',
							},
							{
								name: 'Parvclass',
								value: 'PARVCLASS',
							},
							{
								name: 'Superdivision',
								value: 'SUPERDIVISION',
							},
							{
								name: 'Division',
								value: 'DIVISION',
							},
							{
								name: 'Subdivision',
								value: 'SUBDIVISION',
							},
							{
								name: 'Infradivision',
								value: 'INFRADIVISION',
							},
							{
								name: 'Superlegion',
								value: 'SUPERLEGION',
							},
							{
								name: 'Legion',
								value: 'LEGION',
							},
							{
								name: 'Sublegion',
								value: 'SUBLEGION',
							},
							{
								name: 'Infralegion',
								value: 'INFRALEGION',
							},
							{
								name: 'Megacohort',
								value: 'MEGACOHORT',
							},
							{
								name: 'Supercohort',
								value: 'SUPERCOHORT',
							},
							{
								name: 'Cohort',
								value: 'COHORT',
							},
							{
								name: 'Subcohort',
								value: 'SUBCOHORT',
							},
							{
								name: 'Infracohort',
								value: 'INFRACOHORT',
							},
							{
								name: 'Gigaorder',
								value: 'GIGAORDER',
							},
							{
								name: 'Magnorder',
								value: 'MAGNORDER',
							},
							{
								name: 'Grandorder',
								value: 'GRANDORDER',
							},
							{
								name: 'Mirorder',
								value: 'MIRORDER',
							},
							{
								name: 'Superorder',
								value: 'SUPERORDER',
							},
							{
								name: 'Order',
								value: 'ORDER',
							},
							{
								name: 'Nanorder',
								value: 'NANORDER',
							},
							{
								name: 'Hypoorder',
								value: 'HYPOORDER',
							},
							{
								name: 'Minorder',
								value: 'MINORDER',
							},
							{
								name: 'Suborder',
								value: 'SUBORDER',
							},
							{
								name: 'Infraorder',
								value: 'INFRAORDER',
							},
							{
								name: 'Parvorder',
								value: 'PARVORDER',
							},
							{
								name: 'Megafamily',
								value: 'MEGAFAMILY',
							},
							{
								name: 'Grandfamily',
								value: 'GRANDFAMILY',
							},
							{
								name: 'Superfamily',
								value: 'SUPERFAMILY',
							},
							{
								name: 'Epifamily',
								value: 'EPIFAMILY',
							},
							{
								name: 'Family',
								value: 'FAMILY',
							},
							{
								name: 'Subfamily',
								value: 'SUBFAMILY',
							},
							{
								name: 'Infrafamily',
								value: 'INFRAFAMILY',
							},
							{
								name: 'Supertribe',
								value: 'SUPERTRIBE',
							},
							{
								name: 'Tribe',
								value: 'TRIBE',
							},
							{
								name: 'Subtribe',
								value: 'SUBTRIBE',
							},
							{
								name: 'Infratribe',
								value: 'INFRATRIBE',
							},
							{
								name: 'Suprageneric Name',
								value: 'SUPRAGENERIC_NAME',
							},
							{
								name: 'Genus',
								value: 'GENUS',
							},
							{
								name: 'Subgenus',
								value: 'SUBGENUS',
							},
							{
								name: 'Infragenus',
								value: 'INFRAGENUS',
							},
							{
								name: 'Supersection',
								value: 'SUPERSECTION',
							},
							{
								name: 'Section',
								value: 'SECTION',
							},
							{
								name: 'Subsection',
								value: 'SUBSECTION',
							},
							{
								name: 'Superseries',
								value: 'SUPERSERIES',
							},
							{
								name: 'Series',
								value: 'SERIES',
							},
							{
								name: 'Subseries',
								value: 'SUBSERIES',
							},
							{
								name: 'Infrageneric Name',
								value: 'INFRAGENERIC_NAME',
							},
							{
								name: 'Species Aggregate',
								value: 'SPECIES_AGGREGATE',
							},
							{
								name: 'Species',
								value: 'SPECIES',
							},
							{
								name: 'Infraspecific Name',
								value: 'INFRASPECIFIC_NAME',
							},
							{
								name: 'Grex',
								value: 'GREX',
							},
							{
								name: 'Subspecies',
								value: 'SUBSPECIES',
							},
							{
								name: 'Cultivar Group',
								value: 'CULTIVAR_GROUP',
							},
							{
								name: 'Convariety',
								value: 'CONVARIETY',
							},
							{
								name: 'Infrasubspecific Name',
								value: 'INFRASUBSPECIFIC_NAME',
							},
							{
								name: 'Proles',
								value: 'PROLES',
							},
							{
								name: 'Natio',
								value: 'NATIO',
							},
							{
								name: 'Aberration',
								value: 'ABERRATION',
							},
							{
								name: 'Morph',
								value: 'MORPH',
							},
							{
								name: 'Variety',
								value: 'VARIETY',
							},
							{
								name: 'Subvariety',
								value: 'SUBVARIETY',
							},
							{
								name: 'Form',
								value: 'FORM',
							},
							{
								name: 'Subform',
								value: 'SUBFORM',
							},
							{
								name: 'Pathovar',
								value: 'PATHOVAR',
							},
							{
								name: 'Biovar',
								value: 'BIOVAR',
							},
							{
								name: 'Chemovar',
								value: 'CHEMOVAR',
							},
							{
								name: 'Morphovar',
								value: 'MORPHOVAR',
							},
							{
								name: 'Phagovar',
								value: 'PHAGOVAR',
							},
							{
								name: 'Serovar',
								value: 'SEROVAR',
							},
							{
								name: 'Chemoform',
								value: 'CHEMOFORM',
							},
							{
								name: 'Forma Specialis',
								value: 'FORMA_SPECIALIS',
							},
							{
								name: 'Cultivar',
								value: 'CULTIVAR',
							},
							{
								name: 'Strain',
								value: 'STRAIN',
							},
							{
								name: 'Other',
								value: 'OTHER',
							},
							{
								name: 'Unranked',
								value: 'UNRANKED',
							},
						],
					},
					{
						displayName: 'Reverse',
						name: 'reverse',
						type: 'boolean',
						default: false,
						required: false,
						description: 'Order results in reverse',
					},
					{
						displayName: 'Sort By',
						name: 'sortBy',
						type: 'options',
						default: 'RELEVANCE',
						required: false,
						options: [
							{
								name: 'Name',
								value: 'NAME',
							},
							{
								name: 'Native',
								value: 'NATIVE',
							},
							{
								name: 'Relevance',
								value: 'RELEVANCE',
							},
							{
								name: 'Taxonomic',
								value: 'TAXONOMIC',
							},
						],
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						default: '',
						required: false,
						description: 'The type of search',
						options: [
							{
								name: 'Exact',
								value: 'EXACT',
							},
							{
								name: 'Prefix',
								value: 'PREFIX',
							},
							{
								name: 'Whole Words',
								value: 'WHOLE_WORDS',
							},
						],
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'The result paging offset',
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 10,
						description: 'The result paging limit',
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
							'nameUsageSuggest',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Accepted',
						name: 'accepted',
						type: 'boolean',
						default: false,
						required: false,
						description: 'Suggest only scientific names that have an accepted taxonomic status',
					},
					{
						displayName: 'Fuzzy',
						name: 'fuzzy',
						type: 'boolean',
						default: false,
						required: false,
						description: 'Enables fuzzy search',
					},
					{
						displayName: 'Minimum Rank',
						name: 'minRank',
						type: 'options',
						default: '',
						required: false,
						description: 'The minimum rank',
						options: [
							{
								name: 'Domain',
								value: 'DOMAIN',
							},
							{
								name: 'Realm',
								value: 'REALM',
							},
							{
								name: 'Subrealm',
								value: 'SUBREALM',
							},
							{
								name: 'Superkingdom',
								value: 'SUPERKINGDOM',
							},
							{
								name: 'Kingdom',
								value: 'KINGDOM',
							},
							{
								name: 'Subkingdom',
								value: 'SUBKINGDOM',
							},
							{
								name: 'Infrakingdom',
								value: 'INFRAKINGDOM',
							},
							{
								name: 'Superphylum',
								value: 'SUPERPHYLUM',
							},
							{
								name: 'Phylum',
								value: 'PHYLUM',
							},
							{
								name: 'Subphylum',
								value: 'SUBPHYLUM',
							},
							{
								name: 'Infraphylum',
								value: 'INFRAPHYLUM',
							},
							{
								name: 'Parvphylum',
								value: 'PARVPHYLUM',
							},
							{
								name: 'Microphylum',
								value: 'MICROPHYLUM',
							},
							{
								name: 'Nanophylum',
								value: 'NANOPHYLUM',
							},
							{
								name: 'Gigaclass',
								value: 'GIGACLASS',
							},
							{
								name: 'Megaclass',
								value: 'MEGACLASS',
							},
							{
								name: 'Superclass',
								value: 'SUPERCLASS',
							},
							{
								name: 'Class',
								value: 'CLASS',
							},
							{
								name: 'Subclass',
								value: 'SUBCLASS',
							},
							{
								name: 'Infraclass',
								value: 'INFRACLASS',
							},
							{
								name: 'Subterclass',
								value: 'SUBTERCLASS',
							},
							{
								name: 'Parvclass',
								value: 'PARVCLASS',
							},
							{
								name: 'Superdivision',
								value: 'SUPERDIVISION',
							},
							{
								name: 'Division',
								value: 'DIVISION',
							},
							{
								name: 'Subdivision',
								value: 'SUBDIVISION',
							},
							{
								name: 'Infradivision',
								value: 'INFRADIVISION',
							},
							{
								name: 'Superlegion',
								value: 'SUPERLEGION',
							},
							{
								name: 'Legion',
								value: 'LEGION',
							},
							{
								name: 'Sublegion',
								value: 'SUBLEGION',
							},
							{
								name: 'Infralegion',
								value: 'INFRALEGION',
							},
							{
								name: 'Megacohort',
								value: 'MEGACOHORT',
							},
							{
								name: 'Supercohort',
								value: 'SUPERCOHORT',
							},
							{
								name: 'Cohort',
								value: 'COHORT',
							},
							{
								name: 'Subcohort',
								value: 'SUBCOHORT',
							},
							{
								name: 'Infracohort',
								value: 'INFRACOHORT',
							},
							{
								name: 'Gigaorder',
								value: 'GIGAORDER',
							},
							{
								name: 'Magnorder',
								value: 'MAGNORDER',
							},
							{
								name: 'Grandorder',
								value: 'GRANDORDER',
							},
							{
								name: 'Mirorder',
								value: 'MIRORDER',
							},
							{
								name: 'Superorder',
								value: 'SUPERORDER',
							},
							{
								name: 'Order',
								value: 'ORDER',
							},
							{
								name: 'Nanorder',
								value: 'NANORDER',
							},
							{
								name: 'Hypoorder',
								value: 'HYPOORDER',
							},
							{
								name: 'Minorder',
								value: 'MINORDER',
							},
							{
								name: 'Suborder',
								value: 'SUBORDER',
							},
							{
								name: 'Infraorder',
								value: 'INFRAORDER',
							},
							{
								name: 'Parvorder',
								value: 'PARVORDER',
							},
							{
								name: 'Megafamily',
								value: 'MEGAFAMILY',
							},
							{
								name: 'Grandfamily',
								value: 'GRANDFAMILY',
							},
							{
								name: 'Superfamily',
								value: 'SUPERFAMILY',
							},
							{
								name: 'Epifamily',
								value: 'EPIFAMILY',
							},
							{
								name: 'Family',
								value: 'FAMILY',
							},
							{
								name: 'Subfamily',
								value: 'SUBFAMILY',
							},
							{
								name: 'Infrafamily',
								value: 'INFRAFAMILY',
							},
							{
								name: 'Supertribe',
								value: 'SUPERTRIBE',
							},
							{
								name: 'Tribe',
								value: 'TRIBE',
							},
							{
								name: 'Subtribe',
								value: 'SUBTRIBE',
							},
							{
								name: 'Infratribe',
								value: 'INFRATRIBE',
							},
							{
								name: 'Suprageneric Name',
								value: 'SUPRAGENERIC_NAME',
							},
							{
								name: 'Genus',
								value: 'GENUS',
							},
							{
								name: 'Subgenus',
								value: 'SUBGENUS',
							},
							{
								name: 'Infragenus',
								value: 'INFRAGENUS',
							},
							{
								name: 'Supersection',
								value: 'SUPERSECTION',
							},
							{
								name: 'Section',
								value: 'SECTION',
							},
							{
								name: 'Subsection',
								value: 'SUBSECTION',
							},
							{
								name: 'Superseries',
								value: 'SUPERSERIES',
							},
							{
								name: 'Series',
								value: 'SERIES',
							},
							{
								name: 'Subseries',
								value: 'SUBSERIES',
							},
							{
								name: 'Infrageneric Name',
								value: 'INFRAGENERIC_NAME',
							},
							{
								name: 'Species Aggregate',
								value: 'SPECIES_AGGREGATE',
							},
							{
								name: 'Species',
								value: 'SPECIES',
							},
							{
								name: 'Infraspecific Name',
								value: 'INFRASPECIFIC_NAME',
							},
							{
								name: 'Grex',
								value: 'GREX',
							},
							{
								name: 'Subspecies',
								value: 'SUBSPECIES',
							},
							{
								name: 'Cultivar Group',
								value: 'CULTIVAR_GROUP',
							},
							{
								name: 'Convariety',
								value: 'CONVARIETY',
							},
							{
								name: 'Infrasubspecific Name',
								value: 'INFRASUBSPECIFIC_NAME',
							},
							{
								name: 'Proles',
								value: 'PROLES',
							},
							{
								name: 'Natio',
								value: 'NATIO',
							},
							{
								name: 'Aberration',
								value: 'ABERRATION',
							},
							{
								name: 'Morph',
								value: 'MORPH',
							},
							{
								name: 'Variety',
								value: 'VARIETY',
							},
							{
								name: 'Subvariety',
								value: 'SUBVARIETY',
							},
							{
								name: 'Form',
								value: 'FORM',
							},
							{
								name: 'Subform',
								value: 'SUBFORM',
							},
							{
								name: 'Pathovar',
								value: 'PATHOVAR',
							},
							{
								name: 'Biovar',
								value: 'BIOVAR',
							},
							{
								name: 'Chemovar',
								value: 'CHEMOVAR',
							},
							{
								name: 'Morphovar',
								value: 'MORPHOVAR',
							},
							{
								name: 'Phagovar',
								value: 'PHAGOVAR',
							},
							{
								name: 'Serovar',
								value: 'SEROVAR',
							},
							{
								name: 'Chemoform',
								value: 'CHEMOFORM',
							},
							{
								name: 'Forma Specialis',
								value: 'FORMA_SPECIALIS',
							},
							{
								name: 'Cultivar',
								value: 'CULTIVAR',
							},
							{
								name: 'Strain',
								value: 'STRAIN',
							},
							{
								name: 'Other',
								value: 'OTHER',
							},
							{
								name: 'Unranked',
								value: 'UNRANKED',
							},
						],
					},
					{
						displayName: 'Maximum Rank',
						name: 'maxRank',
						type: 'options',
						default: '',
						required: false,
						description: 'The maximum rank',
						options: [
							{
								name: 'Domain',
								value: 'DOMAIN',
							},
							{
								name: 'Realm',
								value: 'REALM',
							},
							{
								name: 'Subrealm',
								value: 'SUBREALM',
							},
							{
								name: 'Superkingdom',
								value: 'SUPERKINGDOM',
							},
							{
								name: 'Kingdom',
								value: 'KINGDOM',
							},
							{
								name: 'Subkingdom',
								value: 'SUBKINGDOM',
							},
							{
								name: 'Infrakingdom',
								value: 'INFRAKINGDOM',
							},
							{
								name: 'Superphylum',
								value: 'SUPERPHYLUM',
							},
							{
								name: 'Phylum',
								value: 'PHYLUM',
							},
							{
								name: 'Subphylum',
								value: 'SUBPHYLUM',
							},
							{
								name: 'Infraphylum',
								value: 'INFRAPHYLUM',
							},
							{
								name: 'Parvphylum',
								value: 'PARVPHYLUM',
							},
							{
								name: 'Microphylum',
								value: 'MICROPHYLUM',
							},
							{
								name: 'Nanophylum',
								value: 'NANOPHYLUM',
							},
							{
								name: 'Gigaclass',
								value: 'GIGACLASS',
							},
							{
								name: 'Megaclass',
								value: 'MEGACLASS',
							},
							{
								name: 'Superclass',
								value: 'SUPERCLASS',
							},
							{
								name: 'Class',
								value: 'CLASS',
							},
							{
								name: 'Subclass',
								value: 'SUBCLASS',
							},
							{
								name: 'Infraclass',
								value: 'INFRACLASS',
							},
							{
								name: 'Subterclass',
								value: 'SUBTERCLASS',
							},
							{
								name: 'Parvclass',
								value: 'PARVCLASS',
							},
							{
								name: 'Superdivision',
								value: 'SUPERDIVISION',
							},
							{
								name: 'Division',
								value: 'DIVISION',
							},
							{
								name: 'Subdivision',
								value: 'SUBDIVISION',
							},
							{
								name: 'Infradivision',
								value: 'INFRADIVISION',
							},
							{
								name: 'Superlegion',
								value: 'SUPERLEGION',
							},
							{
								name: 'Legion',
								value: 'LEGION',
							},
							{
								name: 'Sublegion',
								value: 'SUBLEGION',
							},
							{
								name: 'Infralegion',
								value: 'INFRALEGION',
							},
							{
								name: 'Megacohort',
								value: 'MEGACOHORT',
							},
							{
								name: 'Supercohort',
								value: 'SUPERCOHORT',
							},
							{
								name: 'Cohort',
								value: 'COHORT',
							},
							{
								name: 'Subcohort',
								value: 'SUBCOHORT',
							},
							{
								name: 'Infracohort',
								value: 'INFRACOHORT',
							},
							{
								name: 'Gigaorder',
								value: 'GIGAORDER',
							},
							{
								name: 'Magnorder',
								value: 'MAGNORDER',
							},
							{
								name: 'Grandorder',
								value: 'GRANDORDER',
							},
							{
								name: 'Mirorder',
								value: 'MIRORDER',
							},
							{
								name: 'Superorder',
								value: 'SUPERORDER',
							},
							{
								name: 'Order',
								value: 'ORDER',
							},
							{
								name: 'Nanorder',
								value: 'NANORDER',
							},
							{
								name: 'Hypoorder',
								value: 'HYPOORDER',
							},
							{
								name: 'Minorder',
								value: 'MINORDER',
							},
							{
								name: 'Suborder',
								value: 'SUBORDER',
							},
							{
								name: 'Infraorder',
								value: 'INFRAORDER',
							},
							{
								name: 'Parvorder',
								value: 'PARVORDER',
							},
							{
								name: 'Megafamily',
								value: 'MEGAFAMILY',
							},
							{
								name: 'Grandfamily',
								value: 'GRANDFAMILY',
							},
							{
								name: 'Superfamily',
								value: 'SUPERFAMILY',
							},
							{
								name: 'Epifamily',
								value: 'EPIFAMILY',
							},
							{
								name: 'Family',
								value: 'FAMILY',
							},
							{
								name: 'Subfamily',
								value: 'SUBFAMILY',
							},
							{
								name: 'Infrafamily',
								value: 'INFRAFAMILY',
							},
							{
								name: 'Supertribe',
								value: 'SUPERTRIBE',
							},
							{
								name: 'Tribe',
								value: 'TRIBE',
							},
							{
								name: 'Subtribe',
								value: 'SUBTRIBE',
							},
							{
								name: 'Infratribe',
								value: 'INFRATRIBE',
							},
							{
								name: 'Suprageneric Name',
								value: 'SUPRAGENERIC_NAME',
							},
							{
								name: 'Genus',
								value: 'GENUS',
							},
							{
								name: 'Subgenus',
								value: 'SUBGENUS',
							},
							{
								name: 'Infragenus',
								value: 'INFRAGENUS',
							},
							{
								name: 'Supersection',
								value: 'SUPERSECTION',
							},
							{
								name: 'Section',
								value: 'SECTION',
							},
							{
								name: 'Subsection',
								value: 'SUBSECTION',
							},
							{
								name: 'Superseries',
								value: 'SUPERSERIES',
							},
							{
								name: 'Series',
								value: 'SERIES',
							},
							{
								name: 'Subseries',
								value: 'SUBSERIES',
							},
							{
								name: 'Infrageneric Name',
								value: 'INFRAGENERIC_NAME',
							},
							{
								name: 'Species Aggregate',
								value: 'SPECIES_AGGREGATE',
							},
							{
								name: 'Species',
								value: 'SPECIES',
							},
							{
								name: 'Infraspecific Name',
								value: 'INFRASPECIFIC_NAME',
							},
							{
								name: 'Grex',
								value: 'GREX',
							},
							{
								name: 'Subspecies',
								value: 'SUBSPECIES',
							},
							{
								name: 'Cultivar Group',
								value: 'CULTIVAR_GROUP',
							},
							{
								name: 'Convariety',
								value: 'CONVARIETY',
							},
							{
								name: 'Infrasubspecific Name',
								value: 'INFRASUBSPECIFIC_NAME',
							},
							{
								name: 'Proles',
								value: 'PROLES',
							},
							{
								name: 'Natio',
								value: 'NATIO',
							},
							{
								name: 'Aberration',
								value: 'ABERRATION',
							},
							{
								name: 'Morph',
								value: 'MORPH',
							},
							{
								name: 'Variety',
								value: 'VARIETY',
							},
							{
								name: 'Subvariety',
								value: 'SUBVARIETY',
							},
							{
								name: 'Form',
								value: 'FORM',
							},
							{
								name: 'Subform',
								value: 'SUBFORM',
							},
							{
								name: 'Pathovar',
								value: 'PATHOVAR',
							},
							{
								name: 'Biovar',
								value: 'BIOVAR',
							},
							{
								name: 'Chemovar',
								value: 'CHEMOVAR',
							},
							{
								name: 'Morphovar',
								value: 'MORPHOVAR',
							},
							{
								name: 'Phagovar',
								value: 'PHAGOVAR',
							},
							{
								name: 'Serovar',
								value: 'SEROVAR',
							},
							{
								name: 'Chemoform',
								value: 'CHEMOFORM',
							},
							{
								name: 'Forma Specialis',
								value: 'FORMA_SPECIALIS',
							},
							{
								name: 'Cultivar',
								value: 'CULTIVAR',
							},
							{
								name: 'Strain',
								value: 'STRAIN',
							},
							{
								name: 'Other',
								value: 'OTHER',
							},
							{
								name: 'Unranked',
								value: 'UNRANKED',
							},
						],
					},
					{
						displayName: 'Reverse',
						name: 'reverse',
						type: 'boolean',
						default: false,
						required: false,
						description: 'Order results in reverse',
					},
					{
						displayName: 'Sort By',
						name: 'sortBy',
						type: 'options',
						default: 'RELEVANCE',
						required: false,
						options: [
							{
								name: 'Name',
								value: 'NAME',
							},
							{
								name: 'Native',
								value: 'NATIVE',
							},
							{
								name: 'Relevance',
								value: 'RELEVANCE',
							},
							{
								name: 'Taxonomic',
								value: 'TAXONOMIC',
							},
						],
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'The result paging offset',
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 10,
						description: 'The result paging limit',
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
							'reference',
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
						required: false,
						description: 'The ID for the reference',
					},
					{
						displayName: 'Issue',
						name: 'issue',
						type: 'string',
						required: false,
						default: '',
						description: 'Filters by reference issue: https://api.checklistbank.org/vocab/issue',
					},
					{
						displayName: 'Query',
						name: 'q',
						type: 'string',
						required: false,
						default:'',
						description:'The reference search query',
					},
					{
						displayName: 'Sort By',
						name: 'sortBy',
						type: 'options',
						default: '',
						required: false,
						description: 'Sets the sorting order for references',
						options: [
							{
								name: 'Native',
								value: 'NATIVE',
							},
							{
								name: 'Relevance',
								value: 'RELEVANCE',
							},
							{
								name: 'Year',
								value: 'YEAR',
							},
						],
					},
					{
						displayName: 'Year',
						name: 'year',
						type: 'number',
						required: false,
						default: '',
						description: 'Filters by reference year',
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'The result paging offset',
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 10,
						description: 'The result paging limit',
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
							'tree',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Children',
						name: 'children',
						type: 'boolean',
						default: false,
						required: false,
						description: 'Show the children taxa for the taxon ID',
					},
					{
						displayName: 'Count By',
						name: 'countBy',
						type: 'options',
						default: '',
						required: false,
						description: 'The rank to count by',
						options: [
							{
								name: 'Domain',
								value: 'DOMAIN',
							},
							{
								name: 'Realm',
								value: 'REALM',
							},
							{
								name: 'Subrealm',
								value: 'SUBREALM',
							},
							{
								name: 'Superkingdom',
								value: 'SUPERKINGDOM',
							},
							{
								name: 'Kingdom',
								value: 'KINGDOM',
							},
							{
								name: 'Subkingdom',
								value: 'SUBKINGDOM',
							},
							{
								name: 'Infrakingdom',
								value: 'INFRAKINGDOM',
							},
							{
								name: 'Superphylum',
								value: 'SUPERPHYLUM',
							},
							{
								name: 'Phylum',
								value: 'PHYLUM',
							},
							{
								name: 'Subphylum',
								value: 'SUBPHYLUM',
							},
							{
								name: 'Infraphylum',
								value: 'INFRAPHYLUM',
							},
							{
								name: 'Parvphylum',
								value: 'PARVPHYLUM',
							},
							{
								name: 'Microphylum',
								value: 'MICROPHYLUM',
							},
							{
								name: 'Nanophylum',
								value: 'NANOPHYLUM',
							},
							{
								name: 'Gigaclass',
								value: 'GIGACLASS',
							},
							{
								name: 'Megaclass',
								value: 'MEGACLASS',
							},
							{
								name: 'Superclass',
								value: 'SUPERCLASS',
							},
							{
								name: 'Class',
								value: 'CLASS',
							},
							{
								name: 'Subclass',
								value: 'SUBCLASS',
							},
							{
								name: 'Infraclass',
								value: 'INFRACLASS',
							},
							{
								name: 'Subterclass',
								value: 'SUBTERCLASS',
							},
							{
								name: 'Parvclass',
								value: 'PARVCLASS',
							},
							{
								name: 'Superdivision',
								value: 'SUPERDIVISION',
							},
							{
								name: 'Division',
								value: 'DIVISION',
							},
							{
								name: 'Subdivision',
								value: 'SUBDIVISION',
							},
							{
								name: 'Infradivision',
								value: 'INFRADIVISION',
							},
							{
								name: 'Superlegion',
								value: 'SUPERLEGION',
							},
							{
								name: 'Legion',
								value: 'LEGION',
							},
							{
								name: 'Sublegion',
								value: 'SUBLEGION',
							},
							{
								name: 'Infralegion',
								value: 'INFRALEGION',
							},
							{
								name: 'Megacohort',
								value: 'MEGACOHORT',
							},
							{
								name: 'Supercohort',
								value: 'SUPERCOHORT',
							},
							{
								name: 'Cohort',
								value: 'COHORT',
							},
							{
								name: 'Subcohort',
								value: 'SUBCOHORT',
							},
							{
								name: 'Infracohort',
								value: 'INFRACOHORT',
							},
							{
								name: 'Gigaorder',
								value: 'GIGAORDER',
							},
							{
								name: 'Magnorder',
								value: 'MAGNORDER',
							},
							{
								name: 'Grandorder',
								value: 'GRANDORDER',
							},
							{
								name: 'Mirorder',
								value: 'MIRORDER',
							},
							{
								name: 'Superorder',
								value: 'SUPERORDER',
							},
							{
								name: 'Order',
								value: 'ORDER',
							},
							{
								name: 'Nanorder',
								value: 'NANORDER',
							},
							{
								name: 'Hypoorder',
								value: 'HYPOORDER',
							},
							{
								name: 'Minorder',
								value: 'MINORDER',
							},
							{
								name: 'Suborder',
								value: 'SUBORDER',
							},
							{
								name: 'Infraorder',
								value: 'INFRAORDER',
							},
							{
								name: 'Parvorder',
								value: 'PARVORDER',
							},
							{
								name: 'Megafamily',
								value: 'MEGAFAMILY',
							},
							{
								name: 'Grandfamily',
								value: 'GRANDFAMILY',
							},
							{
								name: 'Superfamily',
								value: 'SUPERFAMILY',
							},
							{
								name: 'Epifamily',
								value: 'EPIFAMILY',
							},
							{
								name: 'Family',
								value: 'FAMILY',
							},
							{
								name: 'Subfamily',
								value: 'SUBFAMILY',
							},
							{
								name: 'Infrafamily',
								value: 'INFRAFAMILY',
							},
							{
								name: 'Supertribe',
								value: 'SUPERTRIBE',
							},
							{
								name: 'Tribe',
								value: 'TRIBE',
							},
							{
								name: 'Subtribe',
								value: 'SUBTRIBE',
							},
							{
								name: 'Infratribe',
								value: 'INFRATRIBE',
							},
							{
								name: 'Suprageneric Name',
								value: 'SUPRAGENERIC_NAME',
							},
							{
								name: 'Genus',
								value: 'GENUS',
							},
							{
								name: 'Subgenus',
								value: 'SUBGENUS',
							},
							{
								name: 'Infragenus',
								value: 'INFRAGENUS',
							},
							{
								name: 'Supersection',
								value: 'SUPERSECTION',
							},
							{
								name: 'Section',
								value: 'SECTION',
							},
							{
								name: 'Subsection',
								value: 'SUBSECTION',
							},
							{
								name: 'Superseries',
								value: 'SUPERSERIES',
							},
							{
								name: 'Series',
								value: 'SERIES',
							},
							{
								name: 'Subseries',
								value: 'SUBSERIES',
							},
							{
								name: 'Infrageneric Name',
								value: 'INFRAGENERIC_NAME',
							},
							{
								name: 'Species Aggregate',
								value: 'SPECIES_AGGREGATE',
							},
							{
								name: 'Species',
								value: 'SPECIES',
							},
							{
								name: 'Infraspecific Name',
								value: 'INFRASPECIFIC_NAME',
							},
							{
								name: 'Grex',
								value: 'GREX',
							},
							{
								name: 'Subspecies',
								value: 'SUBSPECIES',
							},
							{
								name: 'Cultivar Group',
								value: 'CULTIVAR_GROUP',
							},
							{
								name: 'Convariety',
								value: 'CONVARIETY',
							},
							{
								name: 'Infrasubspecific Name',
								value: 'INFRASUBSPECIFIC_NAME',
							},
							{
								name: 'Proles',
								value: 'PROLES',
							},
							{
								name: 'Natio',
								value: 'NATIO',
							},
							{
								name: 'Aberration',
								value: 'ABERRATION',
							},
							{
								name: 'Morph',
								value: 'MORPH',
							},
							{
								name: 'Variety',
								value: 'VARIETY',
							},
							{
								name: 'Subvariety',
								value: 'SUBVARIETY',
							},
							{
								name: 'Form',
								value: 'FORM',
							},
							{
								name: 'Subform',
								value: 'SUBFORM',
							},
							{
								name: 'Pathovar',
								value: 'PATHOVAR',
							},
							{
								name: 'Biovar',
								value: 'BIOVAR',
							},
							{
								name: 'Chemovar',
								value: 'CHEMOVAR',
							},
							{
								name: 'Morphovar',
								value: 'MORPHOVAR',
							},
							{
								name: 'Phagovar',
								value: 'PHAGOVAR',
							},
							{
								name: 'Serovar',
								value: 'SEROVAR',
							},
							{
								name: 'Chemoform',
								value: 'CHEMOFORM',
							},
							{
								name: 'Forma Specialis',
								value: 'FORMA_SPECIALIS',
							},
							{
								name: 'Cultivar',
								value: 'CULTIVAR',
							},
							{
								name: 'Strain',
								value: 'STRAIN',
							},
							{
								name: 'Other',
								value: 'OTHER',
							},
							{
								name: 'Unranked',
								value: 'UNRANKED',
							},
						],
					},
					{
						displayName: 'Include Extinct',
						name: 'extinct',
						type: 'boolean',
						default: false,
						required: false,
						description: 'Include extinct taxa',
					},
					{
						displayName: 'Include Placeholder',
						name: 'insertPlaceholder',
						type: 'boolean',
						default: false,
						required: false,
						description: 'Include a placeholder `Not assigned` when a name does not exist at a rank',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						default: '',
						required: false,
						options: [
							{
								name: 'Catalogue',
								value: 'CATALOGUE',
							},
							{
								name: 'Source',
								value: 'SOURCE',
							},
						],
					},
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						required: false,
						default: '',
						description: 'The root ID',
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
							'name',
							'synonym',
							'taxon',
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
						required: false,
						description: 'The ID for the name, taxon, or synonym',
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'The result paging offset',
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 10,
						description: 'The result paging limit',
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
							'vernacular',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Query',
						name: 'q',
						type: 'string',
						required: false,
						default:'',
						description:'The vernacular name search query',
					},
					{
						displayName: 'Language',
						name: 'language',
						type: 'string',
						required: false,
						default:'',
						description:'The 3 letter code (ISO 639-3) for the vernacular name language: https://api.checklistbank.org/vocab/language',
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'The result paging offset',
					},
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 10,
						description: 'The result paging limit',
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
		const apiUrl = `https://api.checklistbank.org/dataset/2144`;

		for (let i = 0; i < items.length; i++) {
			if (resource === 'decision') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					let idEndpoint = '';
					if (additionalFields.id) {
						idEndpoint = `/${additionalFields.id}`;
					}

					if (additionalFields.broken) {
						qs.broken = additionalFields.broken;
					}
					if (additionalFields.mode) {
						qs.mode = additionalFields.mode;
					}
					if (additionalFields.modifiedBy) {
						qs.modifiedBy = additionalFields.modifiedBy;
					}
					if (additionalFields.name) {
						qs.name = additionalFields.name;
					}
					if (additionalFields.rank) {
						qs.rank = additionalFields.rank;
					}
					if (additionalFields.subjectDatasetKey) {
						qs.subjectDatasetKey = additionalFields.subjectDatasetKey;
					}
					if (additionalFields.limit) {
						qs.limit = additionalFields.limit;
					}
					if (additionalFields.offset) {
						qs.offset = additionalFields.offset;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/decision${idEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'estimate') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					let idEndpoint = '';
					if (additionalFields.id) {
						idEndpoint = `/${additionalFields.id}`;
					}

					if (additionalFields.broken) {
						qs.broken = additionalFields.broken;
					}
					if (additionalFields.modifiedBy) {
						qs.modifiedBy = additionalFields.modifiedBy;
					}
					if (additionalFields.name) {
						qs.name = additionalFields.name;
					}
					if (additionalFields.rank) {
						qs.rank = additionalFields.rank;
					}
					if (additionalFields.max) {
						qs.max = additionalFields.max;
					}
					if (additionalFields.min) {
						qs.min = additionalFields.min;
					}
					if (additionalFields.limit) {
						qs.limit = additionalFields.limit;
					}
					if (additionalFields.offset) {
						qs.offset = additionalFields.offset;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/estimate${idEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'metadata') {
				if (operation === 'get') {
					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}.json`,
						json: true,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'name') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					let idEndpoint = '';
					if (additionalFields.id) {
						idEndpoint = `/${additionalFields.id}`;
					}

					if (additionalFields.limit) {
						qs.limit = additionalFields.limit;
					}
					if (additionalFields.offset) {
						qs.offset = additionalFields.offset;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/name${idEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'nameUsage') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					let idEndpoint = '';
					if (additionalFields.id) {
						idEndpoint = `/${additionalFields.id}`;
					}

					if (additionalFields.limit) {
						qs.limit = additionalFields.limit;
					}
					if (additionalFields.offset) {
						qs.offset = additionalFields.offset;
					}
					if (additionalFields.q) {
						qs.q = additionalFields.q;
					}
					if (additionalFields.rank) {
						qs.rank = additionalFields.rank;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/nameusage${idEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'nameUsageSuggest') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					const q = this.getNodeParameter('q', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					qs.q = q;

					if (additionalFields.accepted) {
						qs.accepted = additionalFields.accepted;
					}
					if (additionalFields.fuzzy) {
						qs.fuzzy = additionalFields.fuzzy;
					}
					if (additionalFields.limit) {
						qs.limit = additionalFields.limit;
					}
					if (additionalFields.minRank) {
						qs.minRank = additionalFields.minRank;
					}
					if (additionalFields.maxRank) {
						qs.maxRank = additionalFields.maxRank;
					}
					if (additionalFields.offset) {
						qs.offset = additionalFields.offset;
					}
					if (additionalFields.reverse) {
						qs.reverse = additionalFields.reverse;
					}
					if (additionalFields.sortBy) {
						qs.sortBy = additionalFields.sortBy;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/nameusage/suggest`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'nameUsageSearch') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					const q = this.getNodeParameter('q', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					qs.q = q;

					if (additionalFields.content) {
						qs.content = additionalFields.content;
					}
					if (additionalFields.facet) {
						qs.facet = additionalFields.facet;
					}
					if (additionalFields.facetLimit) {
						qs.facetLimit = additionalFields.facetLimit;
					}
					if (additionalFields.fuzzy) {
						qs.fuzzy = additionalFields.fuzzy;
					}
					if (additionalFields.limit) {
						qs.limit = additionalFields.limit;
					}
					if (additionalFields.minRank) {
						qs.minRank = additionalFields.minRank;
					}
					if (additionalFields.maxRank) {
						qs.maxRank = additionalFields.maxRank;
					}
					if (additionalFields.offset) {
						qs.offset = additionalFields.offset;
					}
					if (additionalFields.reverse) {
						qs.reverse = additionalFields.reverse;
					}
					if (additionalFields.sortBy) {
						qs.sortBy = additionalFields.sortBy;
					}
					if (additionalFields.type) {
						qs.type = additionalFields.type;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/nameusage/search`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'reference') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					let idEndpoint = '';
					if (additionalFields.id) {
						idEndpoint = `/${additionalFields.id}`;
					}

					if (additionalFields.q) {
						qs.q = additionalFields.q;
					}
					if (additionalFields.year) {
						qs.year = additionalFields.year;
					}
					if (additionalFields.issue) {
						qs.issue = additionalFields.issue;
					}
					if (additionalFields.sortBy) {
						qs.sortBy = additionalFields.sortBy;
					}
					if (additionalFields.offset) {
						qs.offset = additionalFields.offset;
					}
					if (additionalFields.limit) {
						qs.limit = additionalFields.limit;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/reference${idEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'source') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					let idEndpoint = '';
					if (additionalFields.id) {
						idEndpoint = `/${additionalFields.id}`;
					}

					if (additionalFields.notCurrentOnly) {
						qs.notCurrentOnly = additionalFields.notCurrentOnly;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/source${idEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'synonym') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					let idEndpoint = '';
					if (additionalFields.id) {
						idEndpoint = `/${additionalFields.id}`;
					}

					if (additionalFields.limit) {
						qs.limit = additionalFields.limit;
					}
					if (additionalFields.offset) {
						qs.offset = additionalFields.offset;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/synonym${idEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'taxon') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					let idEndpoint = '';
					if (additionalFields.id) {
						idEndpoint = `/${additionalFields.id}`;
					}

					if (additionalFields.limit) {
						qs.limit = additionalFields.limit;
					}
					if (additionalFields.offset) {
						qs.offset = additionalFields.offset;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/taxon${idEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'tree') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					let idEndpoint = '';
					let childrenEndpoint = '';
					if (additionalFields.id) {
						idEndpoint = `/${additionalFields.id}`;
						if (additionalFields.children) {
							childrenEndpoint = '/children';
						}
					}

					if (additionalFields.countBy) {
						qs.countBy = additionalFields.countBy;
					}
					if (additionalFields.extinct) {
						qs.extinct = additionalFields.extinct;
					}
					if (additionalFields.insertPlaceholder) {
						qs.insertPlaceholder = additionalFields.insertPlaceholder;
					}
					if (additionalFields.type) {
						qs.type = additionalFields.type;
					}
					if (additionalFields.offset) {
						qs.offset = additionalFields.offset;
					}
					if (additionalFields.limit) {
						qs.limit = additionalFields.limit;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/tree${idEndpoint}${childrenEndpoint}`,
						json: true,
						qs,
					};

					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			} else if (resource === 'vernacular') {
				if (operation === 'get') {
					const qs: IDataObject = {};
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

					if (additionalFields.q) {
						qs.q = additionalFields.q;
					}
					if (additionalFields.language) {
						qs.language = additionalFields.language;
					}
					if (additionalFields.offset) {
						qs.offset = additionalFields.offset;
					}
					if (additionalFields.limit) {
						qs.limit = additionalFields.limit;
					}

					const options: IHttpRequestOptions = {
						headers: {
							'Accept': 'application/json',
						},
						method: 'GET',
						url: `${apiUrl}/vernacular`,
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
