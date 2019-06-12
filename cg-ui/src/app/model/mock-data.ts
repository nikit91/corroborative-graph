import {CgData} from './cg-data';

export const GRAPHDATA: CgData = {
  'pathList': [
    {
      'path': [
        {
          'subject': 'http://dbpedia.org/resource/Joe_Biden',
          'object': 'http://dbpedia.org/resource/Barack_Obama',
          'property': 'http://dbpedia.org/ontology/president'
        },
        {
          'subject': 'http://dbpedia.org/resource/United_States',
          'object': 'http://dbpedia.org/resource/Joe_Biden',
          'property': 'http://dbpedia.org/ontology/leader'
        }
      ],
      'pathScore': 0.38296189210948894,
      'pathText': 'Joe Biden\'s president is Barack Obama. United States\' leader is Joe Biden.'
    },
    {
      'path': [
        {
          'subject': 'http://dbpedia.org/resource/Barack_Obama',
          'object': 'http://dbpedia.org/resource/Illinois',
          'property': 'http://dbpedia.org/ontology/region'
        },
        {
          'subject': 'http://dbpedia.org/resource/Illinois',
          'object': 'http://dbpedia.org/resource/United_States',
          'property': 'http://dbpedia.org/ontology/country'
        }
      ],
      'pathScore': 0.5372672243647795,
      'pathText': 'Barack Obama\'s region is Illinois. Illinois\' country is United States.'
    },
    {
      'path': [
        {
          'subject': 'http://dbpedia.org/resource/Carlton_W._Reeves',
          'object': 'http://dbpedia.org/resource/Barack_Obama',
          'property': 'http://dbpedia.org/ontology/appointer'
        },
        {
          'subject': 'http://dbpedia.org/resource/Carlton_W._Reeves',
          'object': 'http://dbpedia.org/resource/United_States',
          'property': 'http://dbpedia.org/ontology/birthPlace'
        }
      ],
      'pathScore': 0.3217161063154906,
      'pathText': 'Carlton W. Reeves\' appointer is Barack Obama. Carlton W. Reeves\' birth place is United States.'
    },
    {
      'path': [
        {
          'subject': 'http://dbpedia.org/resource/Richard_Holbrooke',
          'object': 'http://dbpedia.org/resource/Barack_Obama',
          'property': 'http://dbpedia.org/ontology/president'
        },
        {
          'subject': 'http://dbpedia.org/resource/Richard_Holbrooke',
          'object': 'http://dbpedia.org/resource/United_States',
          'property': 'http://dbpedia.org/ontology/deathPlace'
        }
      ],
      'pathScore': 0.4537394157529029,
      'pathText': 'Richard Holbrooke\'s president is Barack Obama. Richard Charles Albert Holbrooke\'s death place is United States.'
    }
  ],
  'graphScore': 0.9999539880183966,
  'defaultPath': {
    'subject': 'http://dbpedia.org/resource/Barack_Obama',
    'object': 'http://dbpedia.org/resource/United_States',
    'property': 'http://dbpedia.org/ontology/nationality'
  }
};
