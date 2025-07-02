import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class TaxonWorksProjectApi implements ICredentialType {
	name = 'taxonWorksProjectApi';
	displayName = 'TaxonWorks Project API';
	documentationUrl = 'https://api.taxonworks.org';
	properties: INodeProperties[] = [
		{
			displayName: 'Project API token',
			name: 'projectToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'Project ID',
			name: 'projectId',
			type: 'string',
			default: '',
		},
	];
}
