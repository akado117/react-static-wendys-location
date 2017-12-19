import axios from 'axios';
import fs from 'fs';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import TestData from './src/testData';
import { transformGetAllStoresResponse, buildCityStateStoreNumLink } from './src/helpers/DataHelpers';
import { filter } from 'lodash';

export default {
    getSiteProps: () => ({
        title: 'React Static',
    }),
    getRoutes: async () => {
        const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
        const { data: stores } = await axios.get('https://wenet.wendys.com/SiteWise/rest/sis/store/allInformation');
        // fs.writeFile('test.txt', JSON.stringify(transformGetAllStoresResponse(stores.stores)), function(err) {
        //     if (err) return console.log(err);
        //     console.log('fileSaved');
        // });

        const {cities, states, locations} = transformGetAllStoresResponse(stores.stores)
        const stateRoutes = Object.keys(cities).map(key => ({
            path: `/state/${key}`,
            component: 'src/containers/Layout',
            getProps: () => ({
                cities: cities[key],
                currentState: filter(states, state => state.lowerCaseShortCode === key)[0],
            }),
        }));
        const locationKeys = Object.keys(locations);
        const locationRoutes = [];
        const cityRoutes = locationKeys.map((key) => {
            locations[key].forEach(location => locationRoutes.push({
                path: `/location/${buildCityStateStoreNumLink(location)}`,
                component: 'src/containers/LocationPage',
                getProps: () => ({
                    location,
                }),
            }));
            return {
                path: `/city/${key}`,
                component: 'src/containers/Layout',
                getProps: () => ({
                    locations: locations[key],
                }),
            };
        });
        return [
            {
                path: '/',
                component: 'src/containers/Layout',
                getProps: () => ({
                    states,
                }),
            },
            ...stateRoutes,
            ...cityRoutes,
            ...locationRoutes,
            {
                path: '/about',
                component: 'src/containers/About',
            },
            {
                path: '/blog',
                component: 'src/containers/Blog',
                getProps: () => ({
                    posts,
                }),
                children: posts.map(post => ({
                    path: `/post/${post.id}`,
                    component: 'src/containers/Post',
                    getProps: () => ({
                        post,
                    }),
                })),
            },
            {
                is404: true,
                component: 'src/containers/404',
            },
        ];
    },
  webpack: (config, {defaultLoaders, stage}) => {
      config.module.rules = [
          {
              oneOf: [
                  {
                      test: /\.s(a|c)ss$/,
                      use: stage === 'dev'
                          ? [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}]
                          : ExtractTextPlugin.extract({
                              use: [
                                  {
                                      loader: 'css-loader',
                                      options: {
                                          importLoaders: 1,
                                          minimize: true,
                                          sourceMap: false,
                                      },
                                  },
                                  {
                                      loader: 'sass-loader',
                                      options: {includePaths: ['src/']},
                                  },
                              ],
                          }),
                  },
                  defaultLoaders.cssLoader,
                  defaultLoaders.jsLoader,
                  defaultLoaders.fileLoader,
              ],
          },
      ]
      return config
  },
}
