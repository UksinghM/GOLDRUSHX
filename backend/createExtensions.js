// // // Script to insert sample extensions into the ExtendEase database
// // const mongoose = require('mongoose');
// // const Extension = require('./models/Extension');

// // // Update the database name to match your project
// // mongoose.connect('mongodb://localhost:27017/ExtendEase', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // }).then(() => {
// //   console.log('✅ Connected to MongoDB');
// // }).catch((err) => {
// //   console.error('❌ MongoDB connection error:', err);
// // });

// // const extensions = [
// //   {
// //     name: 'ES7+ React/Redux/React-Native snippets',
// //     identifier: 'es7-react-js-snippets',
// //     publisher: 'dsznajder',
// //     version: '4.4.3',
// //     description: 'Snippets for React, Redux, React-Native.',
// //     category: 'Snippets',
// //     features: ['JSX', 'hooks', 'useEffect', 'Redux snippets'],
// //     developer: 'dsznajder',
// //     published: true,
// //     stats: { downloads: 2500000, rating: 4.7 }
// //   },
// //   {
// //     name: 'Prettier - Code formatter',
// //     identifier: 'prettier-vscode',
// //     publisher: 'esbenp',
// //     version: '9.0.0',
// //     description: 'Code formatter using prettier',
// //     category: 'Formatter',
// //     features: ['Auto format on save', 'consistent styling'],
// //     developer: 'Esben Petersen',
// //     published: true,
// //     stats: { downloads: 5000000, rating: 4.8 }
// //   },
// //   {
// //     name: 'MongoDB for VS Code',
// //     identifier: 'mongodb-vscode',
// //     publisher: 'mongodb',
// //     version: '1.0.0',
// //     description: 'Connect to your MongoDB cluster and explore data',
// //     category: 'Database',
// //     features: ['Browse collections', 'run queries', 'visualize results'],
// //     developer: 'MongoDB Inc.',
// //     published: true,
// //     stats: { downloads: 1000000, rating: 4.5 }
// //   }
// // ];

// // const insertExtensions = async () => {
// //   try {
// //     for (const ext of extensions) {
// //       const exists = await Extension.findOne({ identifier: ext.identifier });
// //       if (exists) {
// //         console.log(`🟡 Extension "${ext.identifier}" already exists.`);
// //         continue;
// //       }

// //       const newExt = new Extension(ext);
// //       await newExt.save();
// //       console.log(`✅ Added: ${ext.name}`);
// //     }
// //   } catch (err) {
// //     console.error('❌ Error inserting extensions:', err);
// //   } finally {
// //     mongoose.disconnect();
// //   }
// // };

// // insertExtensions();


// // createExtensions.js
// require('dotenv').config();
// const mongoose = require('mongoose');
// const Extension = require('./models/Extension');

// // Connect to MongoDB using the cloud URI from .env
// mongoose.connect(process.env.DB_URL)
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch((err) => console.error('❌ MongoDB connection error:', err));

// const extensions = [
//   {
//     name: 'ES7+ React/Redux/React-Native snippets',
//     identifier: 'es7-react-js-snippets',
//     publisher: 'dsznajder',
//     version: '4.4.3',
//     description: 'Snippets for React, Redux, React-Native.',
//     category: 'Snippets',
//     features: ['JSX', 'hooks', 'useEffect', 'Redux snippets'],
//     developer: 'dsznajder',
//     published: true,
//     stats: { downloads: 2500000, rating: 4.7 }
//   },
//    {
//     name: 'ES7+ React/Redux/React-Native snippets',
//     identifier: 'es7-react-js-snippets',
//     publisher: 'dsznajder',
//     version: '4.4.3',
//     description: 'Snippets for React, Redux, React-Native.',
//     category: 'Snippets',
//     features: ['JSX', 'hooks', 'useEffect', 'Redux snippets'],
//     developer: 'dsznajder',
//     published: true,
//     stats: { downloads: 2500000, rating: 4.7 }
//   },
//   {
//     name: 'Prettier - Code formatter',
//     identifier: 'prettier-vscode',
//     publisher: 'esbenp',
//     version: '9.0.0',
//     description: 'Code formatter using prettier',
//     category: 'Formatter',
//     features: ['Auto format on save', 'consistent styling'],
//     developer: 'Esben Petersen',
//     published: true,
//     stats: { downloads: 5000000, rating: 4.8 }
//   },
//   {
//     name: 'MongoDB for VS Code',
//     identifier: 'mongodb-vscode',
//     publisher: 'mongodb',
//     version: '1.0.0',
//     description: 'Connect to your MongoDB cluster and explore data',
//     category: 'Database',
//     features: ['Browse collections', 'run queries', 'visualize results'],
//     developer: 'MongoDB Inc.',
//     published: true,
//     stats: { downloads: 1000000, rating: 4.5 }
//   }
// ];

// const insertExtensions = async () => {
//   try {
//     for (const ext of extensions) {
//       const exists = await Extension.findOne({ identifier: ext.identifier });
//       if (exists) {
//         console.log(`🟡 Extension "${ext.identifier}" already exists.`);
//         continue;
//       }

//       const newExt = new Extension(ext);
//       await newExt.save();
//       console.log(`✅ Added: ${ext.name}`);
//     }
//   } catch (err) {
//     console.error('❌ Error inserting extensions:', err);
//   } finally {
//     mongoose.disconnect();
//   }
// };

// insertExtensions();

