"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wikidata = void 0;
class Wikidata {
    constructor() {
        this.description = {
            displayName: 'Wikidata',
            name: 'wikidata',
            icon: 'file:wikidata.svg',
            group: ['transform'],
            version: 1,
            description: 'Wikidata is a free and open knowledge base that can be read and edited by both humans and machines',
            defaults: {
                name: 'Wikidata',
                color: '#990000',
            },
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
                            name: 'Query',
                            value: 'query',
                        },
                    ],
                    default: 'query',
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
                                'query',
                            ],
                        },
                    },
                    options: [
                        {
                            name: 'Get',
                            value: 'get',
                            description: 'Get a SPARQL query result',
                        },
                    ],
                    default: 'get',
                    description: 'The operation to perform.',
                },
                {
                    displayName: 'Server',
                    name: 'server',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: [
                                'get',
                            ],
                            resource: [
                                'query',
                            ],
                        },
                    },
                    default: 'https://query.wikidata.org',
                    description: 'The Wikibase server',
                },
                {
                    displayName: 'SPARQL Query',
                    name: 'query',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: [
                                'get',
                            ],
                            resource: [
                                'query',
                            ],
                        },
                    },
                    default: '',
                    description: 'A SPARQL query',
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
        for (let i = 0; i < items.length; i++) {
            const apiUrl = this.getNodeParameter('server', i);
            if (operation === 'get') {
                const query = encodeURIComponent(this.getNodeParameter('query', i));
                const options = {
                    headers: {
                        'Accept': 'application/json',
                    },
                    method: 'GET',
                    uri: `${apiUrl}/sparql?format=json&query=${query}`,
                    json: true,
                };
                responseData = await this.helpers.request(options);
                returnData.push(responseData['results']['bindings'][0]);
            }
        }
        return [this.helpers.returnJsonArray(returnData)];
    }
}
exports.Wikidata = Wikidata;
//# sourceMappingURL=Wikidata.node.js.map