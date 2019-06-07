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
          'subject': 'http://dbpedia.org/resource/East_Greenwich_High_School',
          'object': 'http://dbpedia.org/resource/Barack_Obama',
          'property': 'http://dbpedia.org/ontology/alumni'
        },
        {
          'subject': 'http://dbpedia.org/resource/East_Greenwich_High_School',
          'object': 'http://dbpedia.org/resource/US',
          'property': 'http://dbpedia.org/ontology/country'
        },
        {
          'subject': 'http://dbpedia.org/resource/United_States',
          'object': 'http://dbpedia.org/resource/US',
          'property': 'http://www.w3.org/2002/07/owl#sameAs'
        }
      ],
      'pathScore': 0.4402080260821762,
      'pathText': 'East Greenwich High School\'s alumnus is Barack Obama. East Greenwich High School\'s country is United States.'
    }
  ],
  'graphScore': 0.9999539880183966,
  'defaultPath': {
    'subject': 'http://dbpedia.org/resource/Barack_Obama',
    'object': 'http://dbpedia.org/resource/United_States',
    'property': 'http://dbpedia.org/ontology/nationality'
  }
};
