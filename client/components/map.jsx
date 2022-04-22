/* global google */

import React from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

let center = {
  lat: 33.680,
  lng: -117.828
};

// const places = [
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '8797 Irvine Center Dr Suite L, Irvine, CA 92618, United States',
//     geometry: {
//       location: {
//         lat: 33.6420336,
//         lng: -117.7418729
//       },
//       viewport: {
//         south: 33.64057657010728,
//         west: -117.7432925798927,
//         north: 33.64327622989272,
//         east: -117.7405929201073
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'Grand Auto Works',
//     opening_hours: {
//       open_now: true
//     },
//     photos: [
//       {
//         height: 1512,
//         html_attributions: [
//           '<a href="https://maps.google.com/maps/contrib/104231070737159481590">A Google User</a>'
//         ],
//         width: 2016
//       }
//     ],
//     place_id: 'ChIJ3-CQ9ePn3IAR1HJuN_WSLDw',
//     plus_code: {
//       compound_code: 'J7R5+R7 Irvine, California',
//       global_code: '8554J7R5+R7'
//     },
//     rating: 4.8,
//     reference: 'ChIJ3-CQ9ePn3IAR1HJuN_WSLDw',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 37,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '8797 Irvine Center Dr # F, Irvine, CA 92618, United States',
//     geometry: {
//       location: {
//         lat: 33.6420336,
//         lng: -117.7418729
//       },
//       viewport: {
//         south: 33.64066432010728,
//         west: -117.7433419298928,
//         north: 33.64336397989272,
//         east: -117.7406422701073
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'Irvine Auto Repair',
//     opening_hours: {
//       open_now: true
//     },
//     photos: [
//       {
//         height: 791,
//         html_attributions: [
//           '<a href="https://maps.google.com/maps/contrib/118113806544623415349">Irvine Auto Repair</a>'
//         ],
//         width: 1059
//       }
//     ],
//     place_id: 'ChIJ7S8AA1Xn3IARNvwgssMDRvU',
//     plus_code: {
//       compound_code: 'J7R5+R7 Irvine, California',
//       global_code: '8554J7R5+R7'
//     },
//     rating: 4.7,
//     reference: 'ChIJ7S8AA1Xn3IARNvwgssMDRvU',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 47,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '23011 Moulton Pkwy, Laguna Hills, CA 92653, United States',
//     geometry: {
//       location: {
//         lat: 33.628769,
//         lng: -117.7320713
//       },
//       viewport: {
//         south: 33.62748157010728,
//         west: -117.7334107798928,
//         north: 33.63018122989272,
//         east: -117.7307111201073
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'Hanlon Auto Service Center',
//     opening_hours: {
//       open_now: true
//     },
//     place_id: 'ChIJxTKupHDo3IARFHILiNGellU',
//     plus_code: {
//       compound_code: 'J7H9+G5 Laguna Hills, California',
//       global_code: '8554J7H9+G5'
//     },
//     rating: 4.8,
//     reference: 'ChIJxTKupHDo3IARFHILiNGellU',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 32,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '22701 Granite Way Unit A, Laguna Hills, CA 92653, United States',
//     geometry: {
//       location: {
//         lat: 33.6280181,
//         lng: -117.7334847
//       },
//       viewport: {
//         south: 33.62656207010728,
//         west: -117.7349426298928,
//         north: 33.62926172989272,
//         east: -117.7322429701073
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: '949 Auto Repair',
//     opening_hours: {
//       open_now: true
//     },
//     photos: [
//       {
//         height: 640,
//         html_attributions: [
//           '<a href="https://maps.google.com/maps/contrib/117642274619740991931">Econo Lube N&#39; Tune &amp; Brakes</a>'
//         ],
//         width: 480
//       }
//     ],
//     place_id: 'ChIJS7o-r_Hu3IARP9AJIGPBa8U',
//     plus_code: {
//       compound_code: 'J7H8+6J Laguna Hills, California',
//       global_code: '8554J7H8+6J'
//     },
//     rating: 4.6,
//     reference: 'ChIJS7o-r_Hu3IARP9AJIGPBa8U',
//     types: [
//       'car_repair',
//       'health',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 42,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '8787 Irvine Center Dr, Irvine, CA 92618, United States',
//     geometry: {
//       location: {
//         lat: 33.6424674,
//         lng: -117.7425253
//       },
//       viewport: {
//         south: 33.64112417010726,
//         west: -117.7440103298927,
//         north: 33.64382382989271,
//         east: -117.7413106701073
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'Car Tech Auto Service',
//     opening_hours: {
//       open_now: true
//     },
//     photos: [
//       {
//         height: 287,
//         html_attributions: [
//           '<a href="https://maps.google.com/maps/contrib/116008142988517855337">Car Tech Auto Service</a>'
//         ],
//         width: 512
//       }
//     ],
//     place_id: 'ChIJycWP7-Pn3IARpc5uJ-mR1K4',
//     plus_code: {
//       compound_code: 'J7R4+XX Irvine, California',
//       global_code: '8554J7R4+XX'
//     },
//     rating: 4.7,
//     reference: 'ChIJycWP7-Pn3IARpc5uJ-mR1K4',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 76,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '51 Auto Center Dr #10, Irvine, CA 92618, United States',
//     geometry: {
//       location: {
//         lat: 33.6340055,
//         lng: -117.7209198
//       },
//       viewport: {
//         south: 33.63275267010728,
//         west: -117.7223912298927,
//         north: 33.63545232989272,
//         east: -117.7196915701073
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: "Gene's Auto Repair",
//     opening_hours: {
//       open_now: true
//     },
//     photos: [
//       {
//         height: 2988,
//         html_attributions: [
//           '<a href="https://maps.google.com/maps/contrib/116707049032084264285">Jolie Hales</a>'
//         ],
//         width: 5312
//       }
//     ],
//     place_id: 'ChIJr1T4wW7o3IARGmBEL7WkgkM',
//     plus_code: {
//       compound_code: 'J7MH+JJ Irvine, California',
//       global_code: '8554J7MH+JJ'
//     },
//     rating: 4.8,
//     reference: 'ChIJr1T4wW7o3IARGmBEL7WkgkM',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 42,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '23251 Vista Grande Dr b, Laguna Hills, CA 92653, United States',
//     geometry: {
//       location: {
//         lat: 33.6242114,
//         lng: -117.7240553
//       },
//       viewport: {
//         south: 33.62278342010728,
//         west: -117.7254063798928,
//         north: 33.62548307989272,
//         east: -117.7227067201073
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'Antonio Romero Auto Repair',
//     opening_hours: {
//       open_now: true
//     },
//     photos: [
//       {
//         height: 3024,
//         html_attributions: [
//           '<a href="https://maps.google.com/maps/contrib/100854342163834505203">Oscar Garcia</a>'
//         ],
//         width: 4032
//       }
//     ],
//     place_id: 'ChIJeRldq2To3IARn_sordm57o0',
//     plus_code: {
//       compound_code: 'J7FG+M9 Laguna Hills, California',
//       global_code: '8554J7FG+M9'
//     },
//     rating: 4.7,
//     reference: 'ChIJeRldq2To3IARn_sordm57o0',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 59,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '23219 Peralta Dr, Laguna Hills, CA 92653, United States',
//     geometry: {
//       location: {
//         lat: 33.6248418,
//         lng: -117.7253957
//       },
//       viewport: {
//         south: 33.62360952010727,
//         west: -117.7267181298927,
//         north: 33.62630917989272,
//         east: -117.7240184701073
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'Laguna Hills Auto Services',
//     opening_hours: {
//       open_now: true
//     },
//     place_id: 'ChIJX5aGq2To3IARDHIvLexK3NM',
//     plus_code: {
//       compound_code: 'J7FF+WR Laguna Hills, California',
//       global_code: '8554J7FF+WR'
//     },
//     rating: 5,
//     reference: 'ChIJX5aGq2To3IARDHIvLexK3NM',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 6,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '22741 Aspan St c, Lake Forest, CA 92630, United States',
//     geometry: {
//       location: {
//         lat: 33.63133130000001,
//         lng: -117.7157582
//       },
//       viewport: {
//         south: 33.62996117010728,
//         west: -117.7170671798927,
//         north: 33.63266082989272,
//         east: -117.7143675201073
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'Lake Forest Auto Repair',
//     opening_hours: {
//       open_now: true
//     },
//     photos: [
//       {
//         height: 251,
//         html_attributions: [
//           '<a href="https://maps.google.com/maps/contrib/112690924453281305434">Lake Forest Auto Repair</a>'
//         ],
//         width: 251
//       }
//     ],
//     place_id: 'ChIJPQ1kw2fo3IAR_CUnhP6IaVg',
//     plus_code: {
//       compound_code: 'J7JM+GM Lake Forest, California',
//       global_code: '8554J7JM+GM'
//     },
//     rating: 4.3,
//     reference: 'ChIJPQ1kw2fo3IAR_CUnhP6IaVg',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 13,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '22861 Lake Forest Dr, Lake Forest, CA 92630, United States',
//     geometry: {
//       location: {
//         lat: 33.6308624,
//         lng: -117.7165132
//       },
//       viewport: {
//         south: 33.62958137010728,
//         west: -117.7178228798928,
//         north: 33.63228102989272,
//         east: -117.7151232201073
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'Padilla’s Auto Repair',
//     opening_hours: {
//       open_now: true
//     },
//     photos: [
//       {
//         height: 3024,
//         html_attributions: [
//           '<a href="https://maps.google.com/maps/contrib/101119017903514411121">Rob George</a>'
//         ],
//         width: 5376
//       }
//     ],
//     place_id: 'ChIJ3-t7y2fo3IARR2D5EDNowVU',
//     plus_code: {
//       compound_code: 'J7JM+89 Lake Forest, California',
//       global_code: '8554J7JM+89'
//     },
//     rating: 4.7,
//     reference: 'ChIJ3-t7y2fo3IARR2D5EDNowVU',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 106,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '23192 Verdugo Dr, Laguna Hills, CA 92653, United States',
//     geometry: {
//       location: {
//         lat: 33.62619919999999,
//         lng: -117.7291626
//       },
//       viewport: {
//         south: 33.62484937010727,
//         west: -117.7305124298927,
//         north: 33.62754902989271,
//         east: -117.7278127701072
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'Orange County European Auto Service',
//     opening_hours: {
//       open_now: true
//     },
//     photos: [
//       {
//         height: 1485,
//         html_attributions: [
//           '<a href="https://maps.google.com/maps/contrib/116384249407252781496">Orange County Imports</a>'
//         ],
//         width: 2048
//       }
//     ],
//     place_id: 'ChIJSRLdNgDp3IARRspSFONIekk',
//     plus_code: {
//       compound_code: 'J7GC+F8 Laguna Hills, California',
//       global_code: '8554J7GC+F8'
//     },
//     rating: 4.8,
//     reference: 'ChIJSRLdNgDp3IARRspSFONIekk',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 37,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '23221 Peralta Dr, Laguna Hills, CA 92653, United States',
//     geometry: {
//       location: {
//         lat: 33.6244544,
//         lng: -117.7253869
//       },
//       viewport: {
//         south: 33.62346102010727,
//         west: -117.7265861798927,
//         north: 33.62616067989272,
//         east: -117.7238865201073
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'Contreras Auto Repair LLC',
//     opening_hours: {
//       open_now: true
//     },
//     photos: [
//       {
//         height: 1440,
//         html_attributions: [
//           '<a href="https://maps.google.com/maps/contrib/110830867736839523753">Francisco Nicolas</a>'
//         ],
//         width: 2560
//       }
//     ],
//     place_id: 'ChIJU2Ajq2To3IARIYoF3dnnEvQ',
//     plus_code: {
//       compound_code: 'J7FF+QR Laguna Hills, California',
//       global_code: '8554J7FF+QR'
//     },
//     rating: 4.4,
//     reference: 'ChIJU2Ajq2To3IARIYoF3dnnEvQ',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 7,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '23512 Commerce Center Dr, Laguna Hills, CA 92653, United States',
//     geometry: {
//       location: {
//         lat: 33.624395,
//         lng: -117.719652
//       },
//       viewport: {
//         south: 33.62306022010728,
//         west: -117.7208535298928,
//         north: 33.62575987989272,
//         east: -117.7181538701073
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'Laguna Woods Auto Repair',
//     opening_hours: {
//       open_now: true
//     },
//     photos: [
//       {
//         height: 3264,
//         html_attributions: [
//           '<a href="https://maps.google.com/maps/contrib/100278641295418261329">A Google User</a>'
//         ],
//         width: 2448
//       }
//     ],
//     place_id: 'ChIJizbCgmHo3IARpnhx1hshTD0',
//     plus_code: {
//       compound_code: 'J7FJ+Q4 Laguna Hills, California',
//       global_code: '8554J7FJ+Q4'
//     },
//     rating: 4.7,
//     reference: 'ChIJizbCgmHo3IARpnhx1hshTD0',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 86,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '22701 Granite Way Suite B, Laguna Hills, CA 92653, United States',
//     geometry: {
//       location: {
//         lat: 33.6282126,
//         lng: -117.7335148
//       },
//       viewport: {
//         south: 33.62690237010728,
//         west: -117.7347334798927,
//         north: 33.62960202989272,
//         east: -117.7320338201073
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'Corner3 Garage',
//     opening_hours: {
//       open_now: true
//     },
//     photos: [
//       {
//         height: 666,
//         html_attributions: [
//           '<a href="https://maps.google.com/maps/contrib/109746747636880632119">Corner3 Garage</a>'
//         ],
//         width: 1000
//       }
//     ],
//     place_id: 'ChIJ3znsZHfo3IARiQwM3_bxKYQ',
//     plus_code: {
//       compound_code: 'J7H8+7H Laguna Hills, California',
//       global_code: '8554J7H8+7H'
//     },
//     rating: 4.5,
//     reference: 'ChIJ3znsZHfo3IARiQwM3_bxKYQ',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 70,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '23551 Commerce Center Dr # C, Laguna Hills, CA 92653, United States',
//     geometry: {
//       location: {
//         lat: 33.6236052,
//         lng: -117.7184391
//       },
//       viewport: {
//         south: 33.62221422010728,
//         west: -117.7197894798927,
//         north: 33.62491387989272,
//         east: -117.7170898201072
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'Southland Auto Care',
//     opening_hours: {
//       open_now: true
//     },
//     photos: [
//       {
//         height: 4032,
//         html_attributions: [
//           '<a href="https://maps.google.com/maps/contrib/110075606341715885456">asal bahrami</a>'
//         ],
//         width: 3024
//       }
//     ],
//     place_id: 'ChIJv_aQnmHo3IARE0hGcOHF_PM',
//     plus_code: {
//       compound_code: 'J7FJ+CJ Laguna Hills, California',
//       global_code: '8554J7FJ+CJ'
//     },
//     rating: 4.9,
//     reference: 'ChIJv_aQnmHo3IARE0hGcOHF_PM',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 14,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '22751 Aspan St, Lake Forest, CA 92630, United States',
//     geometry: {
//       location: {
//         lat: 33.6312186,
//         lng: -117.7154786
//       },
//       viewport: {
//         south: 33.62988812010727,
//         west: -117.7168628298927,
//         north: 33.63258777989272,
//         east: -117.7141631701073
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'OC Auto Care',
//     opening_hours: {
//       open_now: true
//     },
//     place_id: 'ChIJvR894Wfo3IARz0FK2CREAbA',
//     plus_code: {
//       compound_code: 'J7JM+FR Lake Forest, California',
//       global_code: '8554J7JM+FR'
//     },
//     rating: 4.9,
//     reference: 'ChIJvR894Wfo3IARz0FK2CREAbA',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 76,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '22482 Muirlands Blvd suit B, Lake Forest, CA 92630, United States',
//     geometry: {
//       location: {
//         lat: 33.6360573,
//         lng: -117.7116333
//       },
//       viewport: {
//         south: 33.63476562010727,
//         west: -117.7129314798927,
//         north: 33.63746527989272,
//         east: -117.7102318201073
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'National Auto Repair',
//     opening_hours: {
//       open_now: true
//     },
//     photos: [
//       {
//         height: 4032,
//         html_attributions: [
//           '<a href="https://maps.google.com/maps/contrib/115936412235194389842">A Google User</a>'
//         ],
//         width: 3024
//       }
//     ],
//     place_id: 'ChIJO8O7tObp3IARGmuESXxhnx8',
//     plus_code: {
//       compound_code: 'J7PQ+C8 Lake Forest, California',
//       global_code: '8554J7PQ+C8'
//     },
//     rating: 4,
//     reference: 'ChIJO8O7tObp3IARGmuESXxhnx8',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 19,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '51 Auto Center Dr # 8, Irvine, CA 92618, United States',
//     geometry: {
//       location: {
//         lat: 33.6344558,
//         lng: -117.7211348
//       },
//       viewport: {
//         south: 33.63308402010727,
//         west: -117.7225530798927,
//         north: 33.63578367989271,
//         east: -117.7198534201072
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'Karkrib Automotive Repair',
//     photos: [
//       {
//         height: 2100,
//         html_attributions: [
//           '<a href="https://maps.google.com/maps/contrib/117833766318955852791">Anthony Lagrata</a>'
//         ],
//         width: 1575
//       }
//     ],
//     place_id: 'ChIJr1T4wW7o3IARBzyHSah4VIs',
//     plus_code: {
//       compound_code: 'J7MH+QG Irvine, California',
//       global_code: '8554J7MH+QG'
//     },
//     rating: 4.9,
//     reference: 'ChIJr1T4wW7o3IARBzyHSah4VIs',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 11,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '23192 Verdugo Dr Unit A, Laguna Hills, CA 92653, United States',
//     geometry: {
//       location: {
//         lat: 33.6252757,
//         lng: -117.7291389
//       },
//       viewport: {
//         south: 33.62395147010727,
//         west: -117.7306131798927,
//         north: 33.62665112989271,
//         east: -117.7279135201073
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'British Worx OC',
//     opening_hours: {
//       open_now: true
//     },
//     photos: [
//       {
//         height: 2740,
//         html_attributions: [
//           '<a href="https://maps.google.com/maps/contrib/110648688078423769946">A Google User</a>'
//         ],
//         width: 3650
//       }
//     ],
//     place_id: 'ChIJNXLEpXvo3IARo2-7hNrMDE0',
//     plus_code: {
//       compound_code: 'J7GC+48 Laguna Hills, California',
//       global_code: '8554J7GC+48'
//     },
//     rating: 4.8,
//     reference: 'ChIJNXLEpXvo3IARo2-7hNrMDE0',
//     types: [
//       'car_repair',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 30,
//     html_attributions: []
//   },
//   {
//     business_status: 'OPERATIONAL',
//     formatted_address: '22701 Granite Way b, Laguna Hills, CA 92653, United States',
//     geometry: {
//       location: {
//         lat: 33.6280881,
//         lng: -117.7335346
//       },
//       viewport: {
//         south: 33.62660277010728,
//         west: -117.7348777798927,
//         north: 33.62930242989273,
//         east: -117.7321781201072
//       }
//     },
//     icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
//     icon_background_color: '#7B9EB0',
//     icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
//     name: 'Precision Auto Repair',
//     opening_hours: {
//       open_now: true
//     },
//     place_id: 'ChIJz0TyZHfo3IARigiSXz0NmH4',
//     plus_code: {
//       compound_code: 'J7H8+6H Laguna Hills, California',
//       global_code: '8554J7H8+6H'
//     },
//     rating: 2.3,
//     reference: 'ChIJz0TyZHfo3IARigiSXz0NmH4',
//     types: [
//       'car_repair',
//       'health',
//       'point_of_interest',
//       'establishment'
//     ],
//     user_ratings_total: 3,
//     html_attributions: []
//   }
// ];
class MyComponents extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      infoWindow: false,
      currentLocation: null,
      places: ''
    };
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.createMarker = this.createMarker.bind(this);
  }

  getLocation() {
    // eslint-disable-next-line
    const map = new google.maps.Map(
      document.getElementById('map'),
      {
        center: center,
        zoom: 13,
        streetViewControl: false
      });
    navigator.geolocation.getCurrentPosition(
      position => {
        center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        const request = {
          query: 'Mechanic',
          location: center,
          radius: '300'
        };
        const service = new google.maps.places.PlacesService(map);
        service.textSearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.setState({
              currentLocation: center,
              places: results
            }, () => {
              map.setCenter(this.state.currentLocation);
            });
          }
        });
      });
  }

  openInfoWindow(index) {
    this.setState({
      infoWindow: index
    });
  }

  closeInfoWindow() {
    this.setState({
      infoWindow: null
    });

  }

  myLocationMarker(location) {
    return (
      <>
        <Marker icon={'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png'} position={location} onClick={() => this.openInfoWindow('myLocation')}>
          {this.state.infoWindow === 'myLocation' && <InfoWindow position={location} onCloseClick={() => this.closeInfoWindow()}>
            <div>
              <p className='fw-bolder m-0'>Your Location</p>
            </div>
          </InfoWindow>}
        </Marker>
      </>
    );

  }

  createMarker(place, index) {
    const { formatted_address: address, geometry, name } = place;
    const splitAddress = address.split(',');
    return (
        <>
        <Marker key={index} position={geometry.location} onClick={() => this.openInfoWindow(index)}>
        {this.state.infoWindow === index && <InfoWindow position={geometry.location} key={`A${index}`} onCloseClick={() => this.closeInfoWindow()}>
          <div key={`B${index}`}>
            <p className='fw-bolder m-0'>{name}</p>
            <p className='m-0'>{splitAddress[0]}</p>
            <p className='m-0'>{splitAddress[1]}</p>
            <p className='m-0'>{splitAddress[2]}</p>
          </div>
        </InfoWindow>}
        </Marker>
        </>
    );
  }

  render() {
    return (
      <>
          <button onClick={this.getLocation}>Get Location</button>
          <GoogleMap
            mapContainerStyle={containerStyle}
            mapContainerClassName='map-size'
            center={this.state.currentLocation ? this.state.currentLocation : center}
            zoom={14}
          >
          {this.state.places && this.state.places.map((place, index) => this.createMarker(place, index))}
          {this.state.places && this.myLocationMarker(this.state.currentLocation)}
          </GoogleMap>
          <div id="map"></div>
      </>

    );
  }
}

export default MyComponents;
