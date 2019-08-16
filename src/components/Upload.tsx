import React, { useState, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uploadPicture, fetchBalloons } from '~/utils/fetch';
import MangaContext from '~/providers/manga';
import db from '~/utils/db';

enum STATUS {
  INIT,
  LOADING,
  SUCCESS,
  ERROR,
}

const Upload: React.FC<{ routeProps: RouteComponentProps }> = ({ routeProps }: { routeProps: RouteComponentProps }) => {
  const { history } = routeProps;
  const [file, setFile] = useState<File>(new File([''], 'filename'));
  const [status, setStatus] = useState<STATUS>(STATUS.INIT);
  const [errType, setErrType] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const fileInput = useRef(null);

  const addToDb = async (
    { info, balloons }:
    { info: FInfo; balloons: FBalloon[]}): Promise<string> => {
    const blobMap = await fetchBalloons({ balloons });
    db.transaction('rw', db.files, db.canvas, async (): Promise<void> => {
      await db.files.put({
        id: info.id,
        balloons: blobMap,
        bgImage: file,
      });
      const positionMap = new Map();
      balloons.forEach((balloon, idx) => {
        const textRectMap = new Map();
        Object.keys(balloon.textRect).forEach(tIdx => {
          textRectMap.set(Number(tIdx), balloon.textRect[tIdx]);
        });
        positionMap.set(idx, {
          boundingRect: balloon.boundingRect,
          textRectMap,
        });
      });
      await db.canvas.put({
        id: info.id,
        info,
        positionMap,
      });
    });
    return info.id;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      setStatus(STATUS.LOADING);
      const { data } = await uploadPicture(file);
      const id = await addToDb(data);
      setStatus(STATUS.SUCCESS);
      history.push(`/editor/${id}`);
    } catch (error) {
      setStatus(STATUS.ERROR);
      setErrType(error.constructor.name);
      setErrMsg(error.message);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { files } = e.currentTarget;
    if (files) setFile(files[0]);
  };

  return (
    <div>
      <form
        v-if="!isUploading"
        id="uploadForm"
        method="post"
        encType="multipart/form-data"
        onSubmit={onSubmit}
      >
        <label htmlFor="image_uploads">
          <div
            v-if="draggedIn"
          >
            <span>Release</span>
          </div>
          <div>
            <span>Click</span>
            <input
              id="image_uploads"
              ref={fileInput}
              type="file"
              name="files"
              accept=".jpg, .jpeg, .png"
              onChange={handleChange}
            />
            <span>
              <FontAwesomeIcon
                icon="plus"
              />
            </span>
            <span>Upload.dragfile</span>
          </div>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Upload;

