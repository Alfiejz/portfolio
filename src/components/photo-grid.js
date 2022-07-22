import * as React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as photoGridStyles from "../components/photo-grid.module.css"


const PhotoGrid = ({ photos, columns }) => {

  var totalHeights = [];
  var photoColumns = [];

  for (let i = 0; i < columns; i++) {
    totalHeights.push(0)
    photoColumns.push([])
  }

  function assignPosition(image) {
    let minHeight = Math.min.apply(Math, totalHeights)
    let minHeightIndex = totalHeights.indexOf(minHeight);
    
    photoColumns[minHeightIndex].push(image)
    totalHeights[minHeightIndex] += image.childImageSharp.gatsbyImageData.height / image.childImageSharp.gatsbyImageData.width
  }

  photos.map((photo) => (assignPosition(photo)))

  return (
    <div className={photoGridStyles.photoGrid}>
      {photoColumns.map((photoColumn) => (
        <div className={photoGridStyles.photoColumn}>
          {photoColumn.map((photo) => (
            <GatsbyImage image={getImage(photo)} alt="photo" loading="eager"/>
          ))}
        </div>
      ))}
    </div>

  )
}

export default PhotoGrid