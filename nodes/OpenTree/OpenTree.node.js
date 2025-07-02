'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OpenTree = void 0;
class OpenTree {
	constructor() {
		this.description = {
			displayName: 'OpenTree',
			name: 'openTree',
			icon: 'file:openTree.svg',
			group: ['output'],
			version: 1,
			description:
				'Open Tree of Life constructs a comprehensive, dynamic and digitally-available tree of life by synthesizing published phylogenetic trees',
			defaults: {
				name: 'OpenTree',
				color: '#9f8e58',
			},
			subtitle: '={{$parameter["operation"] + ":" + $parameter["resource"]}}',
			inputs: ['main'],
			outputs: ['main'],
			credentials: [],
			properties: [
				{
					displayName: 'Resource',
					name: 'resource',
					type: 'options',
					options: [
						{
							name: 'Studies: Find studies',
							value: 'studies_find_studies',
							description: 'Return a list of studies that match a given property',
						},
						{
							name: 'Studies: Find trees',
							value: 'studies_find_trees',
							description:
								'Return a list of trees (and the studies that contain them) that match a given property',
						},
						{
							name: 'Studies: Properties',
							value: 'studies_properties',
							description:
								'Return a list of properties that can be used to search studies and trees',
						},
						{
							name: 'Studies: Study + Tree',
							value: 'studies_study',
							description: 'Return a study or tree from a study',
						},
						{
							name: 'Synthetic tree: About',
							value: 'tree_of_life_about',
							description: 'Return information about the current synthetic tree',
						},
						{
							name: 'Synthetic tree: Node info',
							value: 'tree_of_life_node_info',
							description: 'Get information about a node in the tree',
						},
						{
							name: 'Synthetic tree: Most recent common ancestor',
							value: 'tree_of_life_mrca',
							description:
								'Return the most recent common ancestor of a list of nodes in the synthetic tree',
						},
						{
							name: 'Synthetic tree: Subtree',
							value: 'tree_of_life_subtree',
							description: 'Return the subtree below a given node',
						},
						{
							name: 'Synthetic tree: Induced subtree',
							value: 'tree_of_life_induced_subtree',
							description:
								'Return the induced subtree on the synthetic tree that relates a list of nodes',
						},
						{
							name: 'Taxonomic name reconciliation: Match names',
							value: 'tnrs_match_names',
							description: 'Returns a list of potential matches to known taxonomic names',
						},
						{
							name: 'Taxonomic name reconciliation: Autocomplete name',
							value: 'tnrs_autocomplete_name',
							description:
								'Given an input string, return a list of potential matches based on taxonomic names that begin with that string',
						},
						{
							name: 'Taxonomic name reconciliation: Contexts',
							value: 'tnrs_contexts',
							description:
								'Return a list of pre-defined taxonomic contexts (i.e. clades), which can be used to limit the scope of tnrs queries',
						},
						{
							name: 'Taxonomic name reconciliation: Infer context',
							value: 'tnrs_infer_context',
							description: 'Return a taxonomic context given a list of taxonomic names',
						},
						{
							name: 'Taxonomy: About',
							value: 'taxonomy_about',
							description: 'Return information about the taxonomy, including version',
						},
						{
							name: 'Taxonomy: Most recent common ancestor',
							value: 'taxonomy_mrca',
							description:
								'Given a set of OTT ids, get the taxon that is the most recent common ancestor (the MRCA) of all the identified taxa',
						},
						{
							name: 'Taxonomy: Subtree',
							value: 'taxonomy_subtree',
							description:
								'Given an OTT id, return complete taxonomy subtree descended from specified taxon',
						},
						{
							name: 'Taxonomy: Taxon info',
							value: 'taxonomy_taxon_info',
							description: 'Given an OTT id, return information about the specified taxon',
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
							resource: ['studies_study'],
						},
					},
					options: [
						{
							name: 'Get',
							value: 'get',
							description: 'Get a parsed resource',
						},
					],
					default: 'get',
					description: 'The operation to perform.',
				},
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					displayOptions: {
						show: {
							resource: [
								'studies_find_studies',
								'studies_find_trees',
								'studies_properties',
								'taxonomy_about',
								'taxonomy_mrca',
								'taxonomy_subtree',
								'taxonomy_taxon_info',
								'tree_of_life_about',
								'tree_of_life_mrca',
								'tree_of_life_node_info',
								'tree_of_life_subtree',
								'tree_of_life_induced_subtree',
								'tnrs_autocomplete_name',
								'tnrs_contexts',
								'tnrs_infer_context',
								'tnrs_match_names',
							],
						},
					},
					options: [
						{
							name: 'Post',
							value: 'post',
							description: 'Post to a resource',
						},
					],
					default: 'post',
					description: 'The operation to perform.',
				},
				{
					displayName: 'Include source list',
					name: 'include_source_list',
					type: 'boolean',
					displayOptions: {
						show: {
							operation: ['post'],
							resource: ['tree_of_life_about'],
						},
					},
					description: 'Return an ordered list of source trees',
					default: 'false',
				},
				{
					displayName: 'Additional Fields',
					name: 'additionalFields',
					type: 'collection',
					placeholder: 'Add Field',
					default: {},
					displayOptions: {
						show: {
							resource: ['tree_of_life_node_info'],
							operation: ['post'],
						},
					},
					options: [
						{
							displayName: 'Node ID',
							name: 'node_id',
							type: 'string',
							description:
								'The node ID of the node of interest. This argument may not be combined with node_ids or ott_id.',
							default: '',
						},
						{
							displayName: 'Node IDs',
							name: 'node_ids',
							type: 'string',
							description:
								'A comma-separated list of node IDs (e.g., mrcaott102ott8118,mrcaott102ott283439,ott816256). This argument may not be combined with node_id or ott_id.',
							default: '',
						},
						{
							displayName: 'Open Tree Taxonomy ID',
							name: 'ott_id',
							type: 'string',
							description:
								'The Open Tree Taxonomy (OTT) ID of the node of interest. This argument may not be combined with node_id or node_ids.',
							default: '',
						},
						{
							displayName: 'Include lineage',
							name: 'include_lineage',
							type: 'boolean',
							description: 'Include the ancestral lineage of the node in the synthetic tree.',
							default: false,
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
							resource: ['tree_of_life_mrca'],
							operation: ['post'],
						},
					},
					options: [
						{
							displayName: 'Exclude Node IDs',
							name: 'exclude_node_ids',
							type: 'string',
							description:
								'A comma-separated list of node IDs to exclude (e.g., mrcaott102ott8118,mrcaott102ott283439,ott816256).',
							default: '',
						},
						{
							displayName: 'Node IDs',
							name: 'node_ids',
							type: 'string',
							description:
								'A comma-separated list of node IDs (e.g., mrcaott102ott8118,mrcaott102ott283439,ott816256). This argument may not be combined with node_id or ott_id.',
							default: '',
						},
						{
							displayName: 'Open Tree Taxonomy IDs',
							name: 'ott_ids',
							type: 'string',
							description:
								'A comma-separated list of Open Tree Taxonomy (OTT) IDs (e.g., 292466,267845,316878,102710). This argument may not be combined with node_id or node_ids.',
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
							resource: ['tree_of_life_subtree'],
							operation: ['post'],
						},
					},
					options: [
						{
							displayName: 'Node ID',
							name: 'node_id',
							type: 'string',
							description:
								'The node ID of the node of interest. This argument may not be combined with ott_id.',
							default: '',
						},
						{
							displayName: 'Open Tree Taxonomy ID',
							name: 'ott_id',
							type: 'string',
							description:
								'The Open Tree Taxonomy (OTT) ID of the node of interest. This argument may not be combined with node_id.',
							default: '',
						},
						{
							displayName: 'Format',
							name: 'format',
							type: 'options',
							options: [
								{
									name: 'Arguson',
									value: 'arguson',
								},
								{
									name: 'Newick',
									value: 'newick',
								},
							],
							description: 'Defines the tree format.',
							default: 'newick',
						},
						{
							displayName: 'Label format',
							name: 'label_format',
							type: 'options',
							displayOptions: {
								show: {
									format: ['newick'],
								},
							},
							options: [
								{
									name: 'Name',
									value: 'name',
								},
								{
									name: 'ID',
									value: 'id',
								},
								{
									name: 'Name and ID',
									value: 'name_and_id',
								},
							],
							description: 'Defines the label type for Newick format.',
							default: 'name_and_id',
						},
						{
							displayName: 'Height limit',
							name: 'height_limit',
							type: 'number',
							description:
								'The maximum number of edges on path between root and tips; limits the depth of the subtree; default = 3 with format=arguson; default = -1 (no limit) with format=newick.',
							default: 3,
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
							resource: ['tree_of_life_induced_subtree'],
							operation: ['post'],
						},
					},
					options: [
						{
							displayName: 'Node IDs',
							name: 'node_ids',
							type: 'string',
							description:
								'A comma-separated list of node IDs (e.g., mrcaott102ott8118,mrcaott102ott283439,ott816256).',
							default: '',
						},
						{
							displayName: 'Open Tree Taxonomy IDs',
							name: 'ott_ids',
							type: 'string',
							description: 'A comma-separated list of OTT IDs (e.g., 292466,267845,316878,102710).',
							default: '',
						},
						{
							displayName: 'Label format',
							name: 'label_format',
							type: 'options',
							options: [
								{
									name: 'Name',
									value: 'name',
								},
								{
									name: 'ID',
									value: 'id',
								},
								{
									name: 'Name and ID',
									value: 'name_and_id',
								},
							],
							description: 'Defines the label type for Newick format.',
							default: 'name_and_id',
						},
					],
				},
				{
					displayName: 'Open Tree Taxonomy IDs',
					name: 'ott_ids',
					type: 'string',
					description: 'A comma-separated list of OTT IDs (e.g., 292466,267845,316878,102710).',
					default: '',
					required: true,
					displayOptions: {
						show: {
							resource: ['taxonomy_mrca'],
							operation: ['post'],
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
							resource: ['taxonomy_subtree'],
							operation: ['post'],
						},
					},
					options: [
						{
							displayName: 'Open Tree Taxonomy ID',
							name: 'ott_id',
							type: 'string',
							description: 'An OTT ID of the taxon of interest (e.g., 292466).',
							default: '',
						},
						{
							displayName: 'Label format',
							name: 'label_format',
							type: 'options',
							options: [
								{
									name: 'Name',
									value: 'name',
								},
								{
									name: 'ID',
									value: 'id',
								},
								{
									name: 'Name and ID',
									value: 'name_and_id',
								},
							],
							description: 'Defines the label type for Newick format.',
							default: 'name_and_id',
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
							resource: ['taxonomy_taxon_info'],
							operation: ['post'],
						},
					},
					options: [
						{
							displayName: 'Open Tree Taxonomy ID',
							name: 'ott_id',
							type: 'string',
							description: 'An OTT ID of the taxon of interest (e.g., 292466).',
							default: '',
						},
						{
							displayName: 'Source ID',
							name: 'source_id',
							type: 'string',
							description:
								'A source taxonomy id for the taxon of interest, in the form prefix:id (e.g., ncbi:9443 or irmng:11338). Valid prefixes are currently ncbi, gbif, worms, if, and irmng. Either ott_id or source_id must be given, but not both.',
							default: '',
						},
						{
							displayName: 'Include children',
							name: 'include_children',
							type: 'boolean',
							description:
								'Whether or not to include information about all the children of this taxon.',
							default: false,
						},
						{
							displayName: 'Include lineage',
							name: 'include_lineage',
							type: 'boolean',
							description:
								'Whether or not to include information about all the higher level taxa that include this taxon.',
							default: false,
						},
						{
							displayName: 'Include terminal descendants',
							name: 'include_terminal_descendants',
							type: 'boolean',
							description: 'Provide a list of terminal OTT ids contained by this taxon.',
							default: false,
						},
					],
				},
				{
					displayName: 'Names',
					name: 'names',
					type: 'string',
					default: '',
					required: true,
					description:
						'A pipe-separated list of taxon names to be queried (e.g., Aedes aegypti|Ochlerotatus triseriatus). Currently limited to 1000 names.',
					displayOptions: {
						show: {
							resource: ['tnrs_match_names'],
							operation: ['post'],
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
							resource: ['tnrs_match_names'],
							operation: ['post'],
						},
					},
					options: [
						{
							displayName: 'Context name',
							name: 'context_name',
							type: 'options',
							description: 'The name of the taxonomic context to be searched.',
							options: [
								{
									name: 'All life',
									value: 'All life',
								},
								{
									name: 'Amoebozoa',
									value: 'Amoebozoa',
								},
								{
									name: 'Amphibians',
									value: 'Amphibians',
								},
								{
									name: 'Animals',
									value: 'Animals',
								},
								{
									name: 'Annelids',
									value: 'Annelids',
								},
								{
									name: 'Apusozoa',
									value: 'Apusozoa',
								},
								{
									name: 'Arachnids',
									value: 'Arachnids',
								},
								{
									name: 'Archaea',
									value: 'Archaea',
								},
								{
									name: 'Arthropods',
									value: 'Arthropods',
								},
								{
									name: 'Ascomycetes',
									value: 'Ascomycetes',
								},
								{
									name: 'Aster',
									value: 'Aster',
								},
								{
									name: 'Asteraceae',
									value: 'Asteraceae',
								},
								{
									name: 'Asterales',
									value: 'Asterales',
								},
								{
									name: 'Asterids',
									value: 'Asterids',
								},
								{
									name: 'Bacteria',
									value: 'Bacteria',
								},
								{
									name: 'Basidiomycetes',
									value: 'Basidiomycetes',
								},
								{
									name: 'Birds',
									value: 'Birds',
								},
								{
									name: 'Campanulaceae',
									value: 'Campanulaceae',
								},
								{
									name: 'Centrohelida',
									value: 'Centrohelida',
								},
								{
									name: 'Ciliates',
									value: 'Ciliates',
								},
								{
									name: 'Club mosses',
									value: 'Club mosses',
								},
								{
									name: 'Cnidarians',
									value: 'Cnidarians',
								},
								{
									name: 'Diatoms',
									value: 'Diatoms',
								},
								{
									name: 'Eudicots',
									value: 'Eudicots',
								},
								{
									name: 'Excavata',
									value: 'Excavata',
								},
								{
									name: 'Ferns',
									value: 'Ferns',
								},
								{
									name: 'Flowering plants',
									value: 'Flowering plants',
								},
								{
									name: 'Forams',
									value: 'Forams',
								},
								{
									name: 'Fungi',
									value: 'Fungi',
								},
								{
									name: 'Haptophyta',
									value: 'Haptophyta',
								},
								{
									name: 'Hornworts',
									value: 'Hornworts',
								},
								{
									name: 'Insects',
									value: 'Insects',
								},
								{
									name: 'Land plants',
									value: 'Land plants',
								},
								{
									name: 'Liverworts',
									value: 'Liverworts',
								},
								{
									name: 'Lobelia',
									value: 'Lobelia',
								},
								{
									name: 'Mammals',
									value: 'Mammals',
								},
								{
									name: 'Molluscs',
									value: 'Molluscs',
								},
								{
									name: 'Monocots',
									value: 'Monocots',
								},
								{
									name: 'Mosses',
									value: 'Mosses',
								},
								{
									name: 'Nematodes',
									value: 'Nematodes',
								},
								{
									name: 'Platyhelminthes',
									value: 'Platyhelminthes',
								},
								{
									name: 'Rosids',
									value: 'Rosids',
								},
								{
									name: 'SAR group',
									value: 'SAR group',
								},
								{
									name: 'Seed plants',
									value: 'Seed plants',
								},
								{
									name: 'Symphyotrichum',
									value: 'Symphyotrichum',
								},
								{
									name: 'Tetrapods',
									value: 'Tetrapods',
								},
								{
									name: 'Vascular plants',
									value: 'Vascular plants',
								},
								{
									name: 'Vertebrates',
									value: 'Vertebrates',
								},
							],
							default: 'All life',
						},
						{
							displayName: 'Approximate matching',
							name: 'do_approximate_matching',
							type: 'boolean',
							description:
								'Whether or not to perform approximate string (a.k.a. "fuzzy") matching. Will greatly improve speed if false.',
							default: false,
						},
						{
							displayName: 'Include suppressed',
							name: 'include_suppressed',
							type: 'boolean',
							description:
								'When false, we suppress taxa with certain flags from the TNRS service. The taxonomy documentation contains a list of the these flags. https://github.com/OpenTreeOfLife/reference-taxonomy/wiki/Taxon-flags#flags-leading-to-taxa-being-unavailable-for-tnrs',
							default: false,
						},
					],
				},
				{
					displayName: 'Name',
					name: 'name',
					type: 'string',
					default: '',
					required: true,
					description: 'A string containing a single name (or partial name prefix) to be queried.',
					displayOptions: {
						show: {
							resource: ['tnrs_autocomplete_name'],
							operation: ['post'],
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
							resource: ['tnrs_autocomplete_name'],
							operation: ['post'],
						},
					},
					options: [
						{
							displayName: 'Context name',
							name: 'context_name',
							type: 'options',
							description: 'The name of the taxonomic context to be searched.',
							options: [
								{
									name: 'All life',
									value: 'All life',
								},
								{
									name: 'Amoebozoa',
									value: 'Amoebozoa',
								},
								{
									name: 'Amphibians',
									value: 'Amphibians',
								},
								{
									name: 'Animals',
									value: 'Animals',
								},
								{
									name: 'Annelids',
									value: 'Annelids',
								},
								{
									name: 'Apusozoa',
									value: 'Apusozoa',
								},
								{
									name: 'Arachnids',
									value: 'Arachnids',
								},
								{
									name: 'Archaea',
									value: 'Archaea',
								},
								{
									name: 'Arthropods',
									value: 'Arthropods',
								},
								{
									name: 'Ascomycetes',
									value: 'Ascomycetes',
								},
								{
									name: 'Aster',
									value: 'Aster',
								},
								{
									name: 'Asteraceae',
									value: 'Asteraceae',
								},
								{
									name: 'Asterales',
									value: 'Asterales',
								},
								{
									name: 'Asterids',
									value: 'Asterids',
								},
								{
									name: 'Bacteria',
									value: 'Bacteria',
								},
								{
									name: 'Basidiomycetes',
									value: 'Basidiomycetes',
								},
								{
									name: 'Birds',
									value: 'Birds',
								},
								{
									name: 'Campanulaceae',
									value: 'Campanulaceae',
								},
								{
									name: 'Centrohelida',
									value: 'Centrohelida',
								},
								{
									name: 'Ciliates',
									value: 'Ciliates',
								},
								{
									name: 'Club mosses',
									value: 'Club mosses',
								},
								{
									name: 'Cnidarians',
									value: 'Cnidarians',
								},
								{
									name: 'Diatoms',
									value: 'Diatoms',
								},
								{
									name: 'Eudicots',
									value: 'Eudicots',
								},
								{
									name: 'Excavata',
									value: 'Excavata',
								},
								{
									name: 'Ferns',
									value: 'Ferns',
								},
								{
									name: 'Flowering plants',
									value: 'Flowering plants',
								},
								{
									name: 'Forams',
									value: 'Forams',
								},
								{
									name: 'Fungi',
									value: 'Fungi',
								},
								{
									name: 'Haptophyta',
									value: 'Haptophyta',
								},
								{
									name: 'Hornworts',
									value: 'Hornworts',
								},
								{
									name: 'Insects',
									value: 'Insects',
								},
								{
									name: 'Land plants',
									value: 'Land plants',
								},
								{
									name: 'Liverworts',
									value: 'Liverworts',
								},
								{
									name: 'Lobelia',
									value: 'Lobelia',
								},
								{
									name: 'Mammals',
									value: 'Mammals',
								},
								{
									name: 'Molluscs',
									value: 'Molluscs',
								},
								{
									name: 'Monocots',
									value: 'Monocots',
								},
								{
									name: 'Mosses',
									value: 'Mosses',
								},
								{
									name: 'Nematodes',
									value: 'Nematodes',
								},
								{
									name: 'Platyhelminthes',
									value: 'Platyhelminthes',
								},
								{
									name: 'Rosids',
									value: 'Rosids',
								},
								{
									name: 'SAR group',
									value: 'SAR group',
								},
								{
									name: 'Seed plants',
									value: 'Seed plants',
								},
								{
									name: 'Symphyotrichum',
									value: 'Symphyotrichum',
								},
								{
									name: 'Tetrapods',
									value: 'Tetrapods',
								},
								{
									name: 'Vascular plants',
									value: 'Vascular plants',
								},
								{
									name: 'Vertebrates',
									value: 'Vertebrates',
								},
							],
							default: 'All life',
						},
						{
							displayName: 'Include suppressed',
							name: 'include_suppressed',
							type: 'boolean',
							description:
								'When false, we suppress taxa with certain flags from the TNRS service. The taxonomy documentation contains a list of the these flags. https://github.com/OpenTreeOfLife/reference-taxonomy/wiki/Taxon-flags#flags-leading-to-taxa-being-unavailable-for-tnrs',
							default: false,
						},
					],
				},
				{
					displayName: 'Names',
					name: 'names',
					type: 'string',
					default: '',
					required: true,
					description:
						'A pipe-separated list of taxon names to be queried (e.g., Aedes aegypti|Ochlerotatus triseriatus). Currently limited to 1000 names.',
					displayOptions: {
						show: {
							resource: ['tnrs_infer_context'],
							operation: ['post'],
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
							resource: ['studies_find_studies'],
							operation: ['post'],
						},
					},
					options: [
						{
							displayName: 'Property',
							name: 'property',
							type: 'options',
							description: 'The property to be searched.',
							options: [
								{
									name: 'dc:subject',
									value: 'dc:subject',
								},
								{
									name: 'dc:date',
									value: 'dc:date',
								},
								{
									name: 'ot:messages',
									value: 'ot:messages',
								},
								{
									name: 'dc:title',
									value: 'dc:title',
								},
								{
									name: 'skos:changeNote',
									value: 'skos:changeNote',
								},
								{
									name: 'ot:studyPublicationReference',
									value: 'ot:studyPublicationReference',
								},
								{
									name: 'ot:candidateTreeForSynthesis',
									value: 'ot:candidateTreeForSynthesis',
								},
								{
									name: 'ot:taxonLinkPrefixes',
									value: 'ot:taxonLinkPrefixes',
								},
								{
									name: 'treebaseId',
									value: 'treebaseId',
								},
								{
									name: 'ot:focalCladeOTTTaxonName',
									value: 'ot:focalCladeOTTTaxonName',
								},
								{
									name: 'prism:modificationDate',
									value: 'prism:modificationDate',
								},
								{
									name: 'dc:contributor',
									value: 'dc:contributor',
								},
								{
									name: 'dc:creator',
									value: 'dc:creator',
								},
								{
									name: 'xmlns',
									value: 'xmlns',
								},
								{
									name: 'ot:curatorName',
									value: 'ot:curatorName',
								},
								{
									name: 'prism:number',
									value: 'prism:number',
								},
								{
									name: 'tb:identifier.study.tb1',
									value: 'tb:identifier.study.tb1',
								},
								{
									name: 'id',
									value: 'id',
								},
								{
									name: 'ot:otusElementOrder',
									value: 'ot:otusElementOrder',
								},
								{
									name: 'ot:dataDeposit',
									value: 'ot:dataDeposit',
								},
								{
									name: 'skos:historyNote',
									value: 'skos:historyNote',
								},
								{
									name: 'ot:treesElementOrder',
									value: 'ot:treesElementOrder',
								},
								{
									name: 'prism:endingPage',
									value: 'prism:endingPage',
								},
								{
									name: 'prism:section',
									value: 'prism:section',
								},
								{
									name: 'nexml2json',
									value: 'nexml2json',
								},
								{
									name: 'ot:notIntendedForSynthesis',
									value: 'ot:notIntendedForSynthesis',
								},
								{
									name: 'ntrees',
									value: 'ntrees',
								},
								{
									name: 'treesById',
									value: 'treesById',
								},
								{
									name: 'about',
									value: 'about',
								},
								{
									name: 'prism:publicationName',
									value: 'prism:publicationName',
								},
								{
									name: 'tb:identifier.study',
									value: 'tb:identifier.study',
								},
								{
									name: 'ot:studyYear',
									value: 'ot:studyYear',
								},
								{
									name: 'otusById',
									value: 'otusById',
								},
								{
									name: 'nexmljson',
									value: 'nexmljson',
								},
								{
									name: 'ot:annotationEvents',
									value: 'ot:annotationEvents',
								},
								{
									name: 'prism:doi',
									value: 'prism:doi',
								},
								{
									name: 'ot:studyId',
									value: 'ot:studyId',
								},
								{
									name: 'prism:pageRange',
									value: 'prism:pageRange',
								},
								{
									name: 'dc:publisher',
									value: 'dc:publisher',
								},
								{
									name: 'ot:studyPublication',
									value: 'ot:studyPublication',
								},
								{
									name: 'prism:volume',
									value: 'prism:volume',
								},
								{
									name: 'tb:title.study',
									value: 'tb:title.study',
								},
								{
									name: 'ot:agents',
									value: 'ot:agents',
								},
								{
									name: 'generator',
									value: 'generator',
								},
								{
									name: 'prism:publicationDate',
									value: 'prism:publicationDate',
								},
								{
									name: 'ot:tag',
									value: 'ot:tag',
								},
								{
									name: 'ot:comment',
									value: 'ot:comment',
								},
								{
									name: 'ot:focalClade',
									value: 'ot:focalClade',
								},
								{
									name: 'prism:startingPage',
									value: 'prism:startingPage',
								},
								{
									name: 'xhtml:license',
									value: 'xhtml:license',
								},
								{
									name: 'prism:creationDate',
									value: 'prism:creationDate',
								},
								{
									name: 'version',
									value: 'version',
								},
								{
									name: 'dcterms:bibliographicCitation',
									value: 'dcterms:bibliographicCitation',
								},
							],
							default: '',
						},
						{
							displayName: 'Value',
							name: 'value',
							type: 'string',
							description:
								'The value to be searched. This must be passed as a string, but will be converted to the datatype corresponding to the specified searchable value. To find all studies, omit both the property and the value from your query.',
							default: '',
						},
						{
							displayName: 'Exact matching only',
							name: 'exact',
							type: 'boolean',
							description:
								'Whether to perform exact matching only. Note that fuzzy matching is only available for some string properties.',
							default: false,
						},
						{
							displayName: 'Verbose',
							name: 'verbose',
							type: 'boolean',
							description:
								'Whether or not to include all metadata. The default of false will only return the study ID.',
							default: false,
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
							resource: ['studies_find_trees'],
							operation: ['post'],
						},
					},
					options: [
						{
							displayName: 'Property',
							name: 'property',
							type: 'options',
							description: 'The property to be searched.',
							options: [
								{
									name: 'ot:messages',
									value: 'ot:messages',
								},
								{
									name: 'xsi:type',
									value: 'xsi:type',
								},
								{
									name: 'ot:nearestTaxonMRCAName',
									value: 'ot:nearestTaxonMRCAName',
								},
								{
									name: 'meta',
									value: 'meta',
								},
								{
									name: 'ot:specifiedRoot',
									value: 'ot:specifiedRoot',
								},
								{
									name: 'ot:reasonsToExcludeFromSynthesis',
									value: 'ot:reasonsToExcludeFromSynthesis',
								},
								{
									name: 'tb:quality.tree',
									value: 'tb:quality.tree',
								},
								{
									name: 'ot:branchLengthTimeUnit',
									value: 'ot:branchLengthTimeUnit',
								},
								{
									name: 'ot:nodeLabelMode',
									value: 'ot:nodeLabelMode',
								},
								{
									name: 'ot:rootNodeId',
									value: 'ot:rootNodeId',
								},
								{
									name: 'ot:inGroupClade',
									value: 'ot:inGroupClade',
								},
								{
									name: 'ot:ottTaxonName',
									value: 'ot:ottTaxonName',
								},
								{
									name: 'ot:branchLengthDescription',
									value: 'ot:branchLengthDescription',
								},
								{
									name: 'ot:studyId',
									value: 'ot:studyId',
								},
								{
									name: 'ot:MRCAName',
									value: 'ot:MRCAName',
								},
								{
									name: 'ot:unrootedTree',
									value: 'ot:unrootedTree',
								},
								{
									name: 'tb:kind.tree',
									value: 'tb:kind.tree',
								},
								{
									name: 'tb:type.tree',
									value: 'tb:type.tree',
								},
								{
									name: 'edgeBySourceId',
									value: 'edgeBySourceId',
								},
								{
									name: 'ot:nodeLabelDescription',
									value: 'ot:nodeLabelDescription',
								},
								{
									name: 'nodeById',
									value: 'nodeById',
								},
								{
									name: 'ot:curatedType',
									value: 'ot:curatedType',
								},
								{
									name: 'ot:nearestTaxonMRCAOttId',
									value: 'ot:nearestTaxonMRCAOttId',
								},
								{
									name: 'ot:tag',
									value: 'ot:tag',
								},
								{
									name: 'rootedge',
									value: 'rootedge',
								},
								{
									name: 'label',
									value: 'label',
								},
								{
									name: 'ntips',
									value: 'ntips',
								},
								{
									name: 'tb:ntax.tree',
									value: 'tb:ntax.tree',
								},
								{
									name: 'ot:ottId',
									value: 'ot:ottId',
								},
								{
									name: 'ot:nodeLabelTimeUnit',
									value: 'ot:nodeLabelTimeUnit',
								},
								{
									name: 'ot:outGroupEdge',
									value: 'ot:outGroupEdge',
								},
								{
									name: 'ot:branchLengthMode',
									value: 'ot:branchLengthMode',
								},
								{
									name: 'ot:MRCAOttId',
									value: 'ot:MRCAOttId',
								},
							],
							default: '',
						},
						{
							displayName: 'Value',
							name: 'value',
							type: 'string',
							description:
								'The value to be searched. This must be passed as a string, but will be converted to the datatype corresponding to the specified searchable value. To find all studies, omit both the property and the value from your query.',
							default: '',
						},
						{
							displayName: 'Exact matching only',
							name: 'exact',
							type: 'boolean',
							description:
								'Whether to perform exact matching only. Note that fuzzy matching is only available for some string properties.',
							default: false,
						},
						{
							displayName: 'Verbose',
							name: 'verbose',
							type: 'boolean',
							description:
								'Whether or not to include all metadata. The default of false will only return the study ID.',
							default: false,
						},
					],
				},
				{
					displayName: 'Study ID',
					name: 'study_id',
					type: 'string',
					default: '',
					required: true,
					description: 'The ID for the study of interest.',
					displayOptions: {
						show: {
							resource: ['studies_study'],
							operation: ['get'],
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
							resource: ['studies_study'],
							operation: ['get'],
						},
					},
					options: [
						{
							displayName: 'Tree ID',
							name: 'tree_id',
							type: 'string',
							description: 'The property to be searched.',
							default: '',
						},
					],
				},
			],
		};
	}
	async execute() {
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);
		const qs = {};
		const body = {};
		for (let i = 0; i < items.length; i++) {
			const apiUrl = 'https://api.opentreeoflife.org/v3';
			let endpoint = '';
			if (resource === 'tree_of_life_about') {
				endpoint = '/tree_of_life/about';
				body.include_source_list = this.getNodeParameter('include_source_list', i);
			} else if (resource === 'tree_of_life_node_info') {
				endpoint = '/tree_of_life/node_info';
				const additionalFields = this.getNodeParameter('additionalFields', i);
				if (additionalFields.node_id) {
					body.node_id = additionalFields.node_id;
				}
				if (additionalFields.node_ids) {
					const nodeIds = additionalFields.node_ids;
					body.node_ids = nodeIds.split(',');
				}
				if (additionalFields.ott_id) {
					body.ott_id = Number(additionalFields.ott_id);
				}
				if (additionalFields.include_lineage) {
					body.include_lineage = additionalFields.include_lineage;
				}
			} else if (resource === 'tree_of_life_mrca') {
				endpoint = '/tree_of_life/mrca';
				const additionalFields = this.getNodeParameter('additionalFields', i);
				if (additionalFields.node_ids) {
					const nodeIds = additionalFields.node_ids;
					body.node_ids = nodeIds.split(',');
				}
				if (additionalFields.exclude_node_ids) {
					const excludeNodeIds = additionalFields.exclude_node_ids;
					body.exclude_node_ids = excludeNodeIds.split(',');
				}
				if (additionalFields.ott_ids) {
					const ottIds = additionalFields.ott_ids;
					body.ott_ids = ottIds.split(',').map((element) => Number(element));
				}
			} else if (resource === 'tree_of_life_subtree') {
				endpoint = '/tree_of_life/subtree';
				const additionalFields = this.getNodeParameter('additionalFields', i);
				if (additionalFields.node_id) {
					body.node_id = additionalFields.node_id;
				}
				if (additionalFields.ott_id) {
					body.ott_id = Number(additionalFields.ott_id);
				}
				if (additionalFields.format) {
					body.format = additionalFields.format;
				}
				if (additionalFields.label_format) {
					body.label_format = additionalFields.label_format;
				}
				if (additionalFields.height_limit) {
					body.height_limit = additionalFields.height_limit;
				}
			} else if (resource === 'tree_of_life_induced_subtree') {
				endpoint = '/tree_of_life/induced_subtree';
				const additionalFields = this.getNodeParameter('additionalFields', i);
				if (additionalFields.node_ids) {
					const nodeIds = additionalFields.node_ids;
					body.node_ids = nodeIds.split(',');
				}
				if (additionalFields.ott_ids) {
					const ottIds = additionalFields.ott_ids;
					body.ott_ids = ottIds.split(',').map((element) => Number(element));
				}
				if (additionalFields.label_format) {
					body.label_format = additionalFields.label_format;
				}
			} else if (resource === 'taxonomy_about') {
				endpoint = '/taxonomy/about';
			} else if (resource === 'taxonomy_mrca') {
				endpoint = '/taxonomy/mrca';
				const ottIds = this.getNodeParameter('ott_ids', i);
				body.ott_ids = ottIds.split(',').map((element) => Number(element));
			} else if (resource === 'taxonomy_subtree') {
				endpoint = '/taxonomy/subtree';
				const additionalFields = this.getNodeParameter('additionalFields', i);
				if (additionalFields.ott_id) {
					body.ott_id = Number(additionalFields.ott_id);
				}
				if (additionalFields.label_format) {
					body.label_format = additionalFields.label_format;
				}
			} else if (resource === 'taxonomy_taxon_info') {
				endpoint = '/taxonomy/taxon_info';
				const additionalFields = this.getNodeParameter('additionalFields', i);
				if (additionalFields.ott_id) {
					body.ott_id = Number(additionalFields.ott_id);
				}
				if (additionalFields.source_id) {
					body.source_id = additionalFields.source_id;
				}
				if (additionalFields.include_children) {
					body.include_children = additionalFields.include_children;
				}
				if (additionalFields.include_lineage) {
					body.include_lineage = additionalFields.include_lineage;
				}
				if (additionalFields.include_terminal_descendants) {
					body.include_terminal_descendants = additionalFields.include_terminal_descendants;
				}
			} else if (resource === 'tnrs_match_names') {
				endpoint = '/tnrs/match_names';
				const additionalFields = this.getNodeParameter('additionalFields', i);
				const names = this.getNodeParameter('names', i);
				body.names = names.split('|').map((element) => String(element));
				if (additionalFields.context_name) {
					body.context_name = additionalFields.context_name;
				}
				if (additionalFields.do_approximate_matching) {
					body.do_approximate_matching = additionalFields.do_approximate_matching;
				}
				if (additionalFields.include_suppressed) {
					body.include_suppressed = additionalFields.include_suppressed;
				}
			} else if (resource === 'tnrs_autocomplete_name') {
				endpoint = '/tnrs/autocomplete_name';
				const additionalFields = this.getNodeParameter('additionalFields', i);
				body.name = this.getNodeParameter('name', i);
				if (additionalFields.context_name) {
					body.context_name = additionalFields.context_name;
				}
				if (additionalFields.include_suppressed) {
					body.include_suppressed = additionalFields.include_suppressed;
				}
			} else if (resource === 'tnrs_contexts') {
				endpoint = '/tnrs/contexts';
			} else if (resource === 'tnrs_infer_context') {
				endpoint = '/tnrs/infer_context';
				const names = this.getNodeParameter('names', i);
				body.names = names.split('|').map((element) => String(element));
			} else if (resource === 'studies_find_studies') {
				endpoint = '/studies/find_studies';
				const additionalFields = this.getNodeParameter('additionalFields', i);
				if (additionalFields.property) {
					body.property = additionalFields.property;
				}
				if (additionalFields.value) {
					body.value = additionalFields.value;
				}
				if (additionalFields.exact) {
					body.exact = additionalFields.exact;
				}
				if (additionalFields.verbose) {
					body.verbose = additionalFields.verbose;
				}
			} else if (resource === 'studies_find_trees') {
				endpoint = '/studies/find_trees';
				const additionalFields = this.getNodeParameter('additionalFields', i);
				if (additionalFields.property) {
					body.property = additionalFields.property;
				}
				if (additionalFields.value) {
					body.value = additionalFields.value;
				}
				if (additionalFields.exact) {
					body.exact = additionalFields.exact;
				}
				if (additionalFields.verbose) {
					body.verbose = additionalFields.verbose;
				}
			} else if (resource === 'studies_properties') {
				endpoint = '/studies/properties';
			} else if (resource === 'studies_study') {
				const studyId = this.getNodeParameter('study_id', i);
				const additionalFields = this.getNodeParameter('additionalFields', i);
				endpoint = `/study/${studyId}`;
				if (additionalFields.tree_id) {
					endpoint = `/study/${studyId}/tree/${additionalFields.tree_id}`;
				}
			}
			if (operation === 'get') {
				const options = {
					headers: {
						Accept: 'application/json',
					},
					method: 'GET',
					uri: `${apiUrl}${endpoint}`,
					json: true,
					qs,
				};
				responseData = await this.helpers.request(options);
				if (resource === 'parse') {
					responseData = responseData[0];
				}
				returnData.push(responseData);
			} else if (operation === 'post') {
				console.log(`${apiUrl}${endpoint}`);
				const options = {
					headers: {
						Accept: 'application/json',
					},
					method: 'POST',
					uri: `${apiUrl}${endpoint}`,
					json: true,
					body,
				};
				responseData = await this.helpers.request(options);
				if (resource === 'parse') {
					responseData = responseData[0];
				}
				returnData.push(responseData);
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
exports.OpenTree = OpenTree;
//# sourceMappingURL=OpenTree.node.js.map
