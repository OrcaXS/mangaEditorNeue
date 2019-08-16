import ky from 'ky';
import { FetchError } from './error';

const uploadUrl = `${process.env.API_PREFIX}upload/v2/`;

function uploadPicture(file: File): Promise<FResult> {
  const formData = new FormData();
  formData.append('files', file);
  try {
    return ky.post(uploadUrl, { body: formData }).json<FResult>();
  } catch (error) {
    throw new FetchError('Error uploading', error);
  }
}

function downloadPictureFromUrl(url: string): Promise<Blob> {
  try {
    return ky.get(url).blob();
  } catch (error) {
    throw new FetchError('Error downloading', error);
  }
}

async function fetchBalloons(
  { balloons }: { balloons: FBalloon[] }
): Promise<Map<number, Blob>> {
  try {
    const blobMap = new Map();
    console.log({ balloons });
    const promises = balloons.map(async (balloon, idx): Promise<void> => {
      const blob = await ky.get(balloon.filledMaskURL).blob();
      blobMap.set(idx, blob);
    });
    await Promise.all(promises);
    return blobMap;
    // console.log(balloonBlobs);
  } catch (error) {
    console.log(error);
    throw new FetchError(error);
  }
}

export {
  fetchBalloons,
  uploadPicture,
  downloadPictureFromUrl,
};
