module.exports = {
  pathPrefix: "/portfolio",
  siteMetadata: {
    title: `Portfolio ― Alfiejz`,
    description: `Personal photography and cooking portfolio`,
    author: `Jiazuo Liu`,
    siteUrl: `https://alfiejz.github.io/portfolio/`
  },
  plugins: ["gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-mdx", {
    resolve: 'gatsby-plugin-sharp',
    options: {
      defaults: {
        formats: [`auto`, `webp`, `avif`]
      }
    }
  }, "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }]
};
