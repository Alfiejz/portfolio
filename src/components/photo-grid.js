import * as React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as photoGridStyles from "../components/photo-grid.module.css"


const PhotoGrid = ({ photos, columnSizes }) => {

  const useWindowWidth = () => {
    const isBrowser = typeof window !== 'undefined'
    const [width, setWidth] = React.useState(isBrowser ? window.innerWidth : 0)
    React.useEffect(() => {
      if (!isBrowser) return false
      const handleResize = () => setWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    })
    return width
  }

  var totalHeights = [];
  var photoColumns = [];

  var columns = columnSizes[0];
  if(typeof window !== 'undefined'){
    if (window.innerWidth >= 720) {
      columns = columnSizes[1]
    }
    if (window.innerWidth >= 1080) {
      columns = columnSizes[2]
    }
  }

  function initialiseArrays() {
    totalHeights = [];
    photoColumns = [];

    for (let i = 0; i < columns; i++) {
      totalHeights.push(0)
      photoColumns.push([])
    }
  }

  initialiseArrays();

  function assignPosition(image) {
    let minHeight = Math.min.apply(Math, totalHeights)
    let minHeightIndex = totalHeights.indexOf(minHeight);
    
    photoColumns[minHeightIndex].push(image)
    totalHeights[minHeightIndex] += image.childImageSharp.gatsbyImageData.height / image.childImageSharp.gatsbyImageData.width
  }

  photos.map((image) => (assignPosition(image)))

  var columnIndex = 0
  
  function generateColumnKey() {
    let key = "c" + columnIndex
    columnIndex++
    return key
  }

  const width = useWindowWidth()
  
  return (
    <div className={photoGridStyles.photoGrid}>
      {photoColumns.map((photoColumn) => (
        <div className={photoGridStyles.photoColumn} style={{width: `calc(100% / ${columns})`}} key={generateColumnKey()}>
          {photoColumn.map((photo) => (
            <GatsbyImage image={getImage(photo)} alt="photo" key={photo.childImageSharp.id}/>
          ))}
        </div>
      ))}
    </div>
  )
}

export default PhotoGrid