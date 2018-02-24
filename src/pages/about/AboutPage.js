import React from 'react'
import Case from 'case'
import { FolderStructure } from '../../components'

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

const pages = (name) => [
  `${Case.pascal(name)}Page.js`,
  index
]

const features = (name) => ({
  components: [
    `${Case.pascal(name)}Container.js`,
    index
  ],
  redux: redux(Case.camel(name)),
  [index]: index
})

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
    pages: {
      home: pages('home'),
      about: pages('about'),
      [index]: index
    },
    config,
    utils,
    lang: language,
    features: {
      product: features('product'),
      shop: features('shop'),
      cart: features('cart'),
      'reducers.js': 'reducers.js',
      [index]: index,
    },
    [index]: index
  },
  '.gitignore': '.gitignore',
  'package.json': 'package.json',
  'README.md': 'README.md',
}

const AbotPage = () => (
  <div>
    <h3>My Project Folder Structure</h3>
    <FolderStructure data={myProjectStructure} />
  </div>
)

export default AbotPage
