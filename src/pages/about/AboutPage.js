import React from 'react'
import { FolderStructure, App } from '../../components'

const index = 'index.js'

const assets = {
  images: [
    '.gitkeep',
  ],
  [index]: index
}

const config = [
  'endpoint.js',
  'store.js',
  'rootReducers.js',
  'theme.js',
]

const redux = (name) => [
  index,
  `${name}Actions.js`,
  `${name}ActionTypes.js`,
  `${name}Connector.js`,
  `${name}Endpoints.js`,
  `${name}Reducer.js`,
  `${name}Selector.js`,
  `${name}Utils.js`,
]

// const constants = [
//   'endpoint.js',
// ]

const language =  [
  'common.js',
  index,
]

const utils = {
  modular: {
    'async-action-types': [
      'asyncActionTypes.js',
      index,
    ],
    reducer: [
      index,
      'NormalizeReducer.js',
      'Reducer.js',
      'FullStackReducer.js',
      'classReducer.js',
    ],
    [index]: index,
    'store.js': 'store.js'
  },
  [index]: index
}

// My Project Structure
const myProjectStructure = {
  pubilc: [
    'index.html',
    'favicon.ico',
    'mainfest.json'
  ],
  src: {
    assets,
    components: {
      HandleError: [
        'HandleError.js',
        index
      ],
      [index]: index,
    },
    config,
    utils,
    lang: language,
    features: {
      product: {
        components: [
          'ProductContainer.js',
          index
        ],
        redux: redux('product'),
        [index]: index
      },
      'reducers.js': 'reducers.js',
      [index]: index,
    },
    [index]: index
  },
  '.gitignore': '.gitignore',
  'package.json': 'package.json',
}

// Modular Structure
// const modularStructure = {
//   pubilc: [
//     'index.html'
//   ],
//   src: {
//     constants,
//     utils,
//     language,
//     config: [
//       'endpoint.js',
//       'api.js',
//     ],
//     common: {
//       Layouts: [
//         'Layouts.js',
//         index
//       ],
//       [index]: index
//     },
//     features: {
//       product: [
//         index
//       ],
//       [index]: index,
//     },
//     [index]: index,
//   },
//   '.babelrc': '.babelrc',
//   '.gitignore': '.gitignore',
//   'package.json': 'package.json',
// }

const AbotPage = (props) => (
  <App {...props}>
    <h3>My Project Folder Structure</h3>
    <FolderStructure data={myProjectStructure} />
  </App>
)

export default AbotPage
