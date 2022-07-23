import * as React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as photoGridStyles from "../components/photo-grid.module.css"


const PhotoGrid = ({ photos, columnSizes }) => {

  var totalHeights = [];
  var photoColumns = [];

  var columns = columnSizes[0];
  if(typeof window !== 'undefined'){
    if (window.innerWidth <= 1280) {
      columns = columnSizes[1]
    }
    if (window.innerWidth <= 720) {
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

  return (
    <div className={photoGridStyles.photoGrid}>
      {photoColumns.map((photoColumn) => (
        <div className={photoGridStyles.photoColumn} style={{width: `calc(100% / ${columns})`}}>
          {photoColumn.map((photo) => (
            <GatsbyImage image={getImage(photo)} alt="photo" loading="eager"/>
          ))}
        </div>
      ))}
    </div>

  )
}

export default PhotoGrid