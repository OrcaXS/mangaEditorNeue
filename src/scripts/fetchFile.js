import ky from 'ky';
// import db from './db';
import { FetchError } from '~/utils/error';

const uploadUrl = `${process.env.API_PREFIX}upload/v2/`;

async function uploadPicture(formData) {
  try {
    const result = await ky.post(uploadUrl, { body: formData }).json();
    return result;
  } catch (error) {
    throw new FetchError('Error uploading', error);
  }
}

async function downloadPictureFromUrl(url) {
  try {
    const blob = await ky.get(url).blob();
    return blob;
  } catch (error) {
    throw new FetchError('Error downloading', error);
  }
}

// async function parallelFetchToDb({ id, balloonUrls, balloonCount }) {
//   const blobs = {}; // TODO
//   const urlProms = {};
//   const balloonBlobs = {};
//   try {
//     for (let i = 0; i < balloonCount; i += 1) {
//       // console.log(balloonUrls[i]);
//       urlProms[i] = downloadPictureFromUrl(balloonUrls[i]);
//     }
//     // console.log(urlProms);
//     // return await urlProm;
//     for (let i = 0; i < balloonCount; i += 1) {
//       // eslint-disable-next-line no-await-in-loop
//       const blob = await urlProms[i];
//       // console.log(blob);
//       // console.log(i);
//       if (!(blob instanceof Blob)) throw new Error('Not blob');
//       // eslint-disable-next-line no-await-in-loop
//       balloonBlobs[i] = blob;
//     }
//     await db.addBalloonBlobsToFile({ id, blobs: balloonBlobs });
//     // console.log(balloonBlobs);
//   } catch (error) {
//     throw new FetchError('Error downloading', error);
//   }
// }

const remote = {
  uploadPicture,
  downloadPictureFromUrl,
  // parallelFetchToDb,
};

export default remote;
