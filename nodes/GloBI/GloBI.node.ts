import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class GloBI implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GloBI',
		name: 'gloBI',
		icon: 'file:gloBI.svg',
		group: ['transform'],
		version: 1,
		description: 'Global Biotic Interactions (GloBI) provides open access to finding species interaction data',
		defaults: {
			name: 'GloBI',
			color: '#007934',
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
						name: 'Interaction',
						value: 'interaction',
					},
					{
						name: 'Taxon',
						value: 'taxon',
					},
				],
				default: 'interaction',
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
							'interaction',
							'taxon',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a parsed scientific name',
					},
				],
				default: 'get',
				description: 'The operation to perform.',
			},
			{
				displayName: 'Source Taxon Name',
				name: 'sourceTaxon',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'interaction',
							'taxon',
						],
					},
				},
				default:'',
				description: 'The source taxon (e.g., Aedes aegypti)',
			},
			{
				displayName: 'Interaction Type',
				required: true,
				name: 'interactionType',
				type: 'options',
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'interaction',
							'taxon',
						],
					},
				},
				options: [
					{
						name: 'Eats',
						value: 'eats',
					},
					{
						name: 'Eaten By',
						value: 'eatenBy',
					},
					{
						name: 'Preys On',
						value: 'preysOn',
					},
					{
						name: 'Preyed Upon By',
						value: 'preyedUponBy',
					},
					{
						name: 'Kills',
						value: 'kills',
					},
					{
						name: 'Killed By',
						value: 'killedBy',
					},
					{
						name: 'Parasite Of',
						value: 'parasiteOf',
					},
					{
						name: 'Has Parasite',
						value: 'hasParasite',
					},
					{
						name: 'Endoparasite Of',
						value: 'endoparasiteOf',
					},
					{
						name: 'Has Endoparasite',
						value: 'hasEndoparasite',
					},
					{
						name: 'Ectoparasite Of',
						value: 'ectoparasiteOf',
					},
					{
						name: 'Has Ectoparasite',
						value: 'hasEctoparasite',
					},
					{
						name: 'Parasitoid Of',
						value: 'parasitoidOf',
					},
					{
						name: 'Has Parasitoid',
						value: 'hasParasitoid',
					},
					{
						name: 'Host Of',
						value: 'hostOf',
					},
					{
						name: 'Has Host',
						value: 'hasHost',
					},
					{
						name: 'Pollinates',
						value: 'pollinates',
					},
					{
						name: 'Pollinated By',
						value: 'pollinatedBy',
					},
					{
						name: 'Pathogen Of',
						value: 'pathogenOf',
					},
					{
						name: 'Has Pathogen',
						value: 'hasPathogen',
					},
					{
						name: 'Vector Of',
						value: 'vectorOf',
					},
					{
						name: 'Has Vector',
						value: 'hasVector',
					},
					{
						name: 'Dispersal Vector Of',
						value: 'dispersalVectorOf',
					},
					{
						name: 'Has Dispersal Vector',
						value: 'hasDispersalVector',
					},
					{
						name: 'Has Habitat',
						value: 'hasHabitat',
					},
					{
						name: 'Creates Habitat For',
						value: 'createsHabitatFor',
					},
					{
						name: 'Epiphyte Of',
						value: 'epiphyteOf',
					},
					{
						name: 'Has Epiphyte',
						value: 'hasEpiphyte',
					},
					{
						name: 'Provides Nutrients For',
						value: 'providesNutrientsFor',
					},
					{
						name: 'Acquires Nutrients From',
						value: 'acquiresNutrientsFrom',
					},
					{
						name: 'Symbiont Of',
						value: 'symbiontOf',
					},
					{
						name: 'Mutualist Of',
						value: 'mutualistOf',
					},
					{
						name: 'Commensalist Of',
						value: 'commensalistOf',
					},
					{
						name: 'Flowers Visited By',
						value: 'flowersVisitedBy',
					},
					{
						name: 'Visits Flowers Of',
						value: 'visitsFlowersOf',
					},
					{
						name: 'Ecologically Related To',
						value: 'ecologicallyRelatedTo',
					},
					{
						name: 'Co-Occurs With',
						value: 'coOccursWith',
					},
					{
						name: 'Co-Roosts With',
						value: 'coRoostsWith',
					},
					{
						name: 'Interacts With',
						value: 'interactsWith',
					},
					{
						name: 'Adjacent To',
						value: 'adjacentTo',
					},
				],
				default: '',
			},
			{
				displayName: 'Target Taxon Name',
				name: 'targetTaxon',
				type: 'string',
				required: false,
				displayOptions: {
					show: {
						operation: [
							'get',
						],
						resource: [
							'interaction',
							'taxon',
						],
					},
				},
				default:'',
				description: 'The target taxon (e.g., Homo sapiens)',
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
							'interaction',
							'taxon',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Output Format',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'csv',
								value: 'csv',
							},
							{
								name: 'dot',
								value: 'dot',
							},
							{
								name: 'json',
								value: 'json',
							},
						],
						default: 'json',
					},
					{
						displayName: 'Include Observations',
						name: 'includeObservations',
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

		let apiUrl = '';
		for (let i = 0; i < items.length; i++) {
			const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
			if (resource === 'interaction') {
				const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
				const sourceTaxon = this.getNodeParameter('sourceTaxon', i) as string;
				const interactionType = this.getNodeParameter('interactionType', i) as string;
				const targetTaxon = this.getNodeParameter('targetTaxon', i) as string;
				apiUrl = `https://api.globalbioticinteractions.org/interaction`;
				apiUrl.replace('+', '%20');
				qs['sourceTaxon'] = sourceTaxon;
				qs['targetTaxon'] = targetTaxon;
				qs['interactionType'] = interactionType;
				qs['type'] = additionalFields.type;
				qs['includeObservations'] = additionalFields.includeObservations;
			} else if (resource === 'taxon') {
				const sourceTaxon = encodeURIComponent(this.getNodeParameter('sourceTaxon', i) as string);
				const interactionType = encodeURIComponent(this.getNodeParameter('interactionType', i) as string);
				const targetTaxon = encodeURIComponent(this.getNodeParameter('targetTaxon', i) as string);
				apiUrl = `https://api.globalbioticinteractions.org/taxon/${sourceTaxon}/${interactionType}/${targetTaxon}`;
				apiUrl.replace('+', '%20');
				qs['type'] = additionalFields.type;
				qs['includeObservations'] = additionalFields.includeObservations;
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
				// if (resource === 'interact') {
				// 	responseData = responseData[0];
				// }

				returnData.push(responseData);
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
