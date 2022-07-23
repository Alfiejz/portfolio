import * as React from "react"
import "../styles/reset.css"
import "../styles/index.css"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet";

import PhotoGrid from "../components/photo-grid"

const IndexPage = ({ data }) => {

  const photos = data.allFile.nodes

  const typeWriterSpeed = 50
  const menuItem1 = "Photography"
  const menuItem2 = "Cooking"
  var menuItem1Index = 0
  var menuItem2Index = 0

  function typeWriter() {
    let menuItemsComplete = true
    if (menuItem1Index < menuItem1.length) {
      menuItemsComplete = false
      document.getElementById("menuItem1").innerHTML += menuItem1.charAt(menuItem1Index);
      menuItem1Index++;
    }
    if (menuItem2Index < menuItem2.length) {
      menuItemsComplete = false
      document.getElementById("menuItem2").innerHTML += menuItem2.charAt(menuItem2Index);
      menuItem2Index++;
    }
    if (!menuItemsComplete) {
      setTimeout(typeWriter, typeWriterSpeed);
    }
  }

  React.useEffect(() => {
    setTimeout(typeWriter, typeWriterSpeed);
  }, []);

  return (
    <>
      <Helmet>
        <title>{data.site.siteMetadata.title}</title>
        <meta charSet="utf-8"/>
        <meta name="description" content={data.site.siteMetadata.description}/>
        <meta name="author" content={data.site.siteMetadata.author}/>
      </Helmet>
      <body>
        <div id="sideBar">
          <div id="sideBarTextWrapper">
            <title>Home Page</title>
            <h1>
              Alfiejz
            </h1>
            <div>
              <h2 id="menuItem1"></h2>
              <h2 id="menuItem2"></h2>
            </div>
          </div>
        </div>
        <div id="indexPhotoGrid">
          <PhotoGrid photos={photos} largeColumns={4} columnSizes={[4, 3, 2]}></PhotoGrid>
        </div>
      </body>
    </>
  )
}

export const query = graphql`
  query MyQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    allFile(filter: {absolutePath: {regex: "//photoGrids/index//"}}) {
      nodes {
        childImageSharp {
          gatsbyImageData(
            width: 960
            quality: 100
          )
        }
        id
      }
    }
  }
`

export default IndexPage