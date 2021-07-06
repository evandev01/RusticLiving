import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to Rustic Living',
  description: "More than furniture, It's a way of life!",
  keywords: 'furniture, custom furniture, country sheek, farm table, barn door',
}

export default Meta
