import React from 'react'
import { Helmet } from 'react-helmet'
import { URL } from '../../config'

const SEO = ({ path, title }) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <link rel="canonical" href={URL(path)} />
  </Helmet>
) 


export default SEO
