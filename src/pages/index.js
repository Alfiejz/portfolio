import * as React from "react"
import "../styles/reset.css"
import "../styles/index.css"
import { graphql } from "gatsby"

import PhotoGrid from "../components/photo-grid"

const IndexPage = ({ data }) => {

  const photos = data.allFile.nodes

  return (
    <body>
      <div id="sideBar">
        <div id="sideBarTextWrapper">
          <title>Home Page</title>
          <h1>
            Alfiejz
          </h1>
          <div>
            <h2>
              Photography
            </h2>
            <h2>
              Cooking
            </h2>
          </div>
        </div>
      </div>
      <div id="indexPhotoGrid">
        <PhotoGrid photos={photos} largeColumns={4} columnSizes={[4, 3, 2]}></PhotoGrid>
      </div>
    </body>
  )
}

export const query = graphql`
  query MyQuery {
    allFile(filter: {absolutePath: {regex: "//photoGrids/index//"}}) {
      nodes {
        childImageSharp {
          gatsbyImageData
        }
        id
      }
    }
  }
`

export default IndexPage
