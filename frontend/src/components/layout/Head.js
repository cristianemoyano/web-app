import React from 'react'
import { Header } from 'semantic-ui-react'

const Head = ({title}) => (
  <div>
    <Header as='h1'>{title}</Header>
  </div>
)

export default Head;