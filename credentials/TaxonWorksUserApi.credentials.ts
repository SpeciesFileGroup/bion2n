import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class TaxonWorksUserApi implements ICredentialType {
	name = 'taxonWorksUserApi';
	displayName = 'TaxonWorks User API';
	documentationUrl = 'https://api.taxonworks.org';
	properties: INodeProperties[] = [
		{
			displayName: 'User API token',
			name: 'token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
