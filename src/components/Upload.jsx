import React, { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import remote from '~/scripts/fetchFile';

const Upload = () => {
  const [file, setFile] = useState({});
  const fileInput = React.createRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', file);
    await remote.uploadPicture(formData);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFile(fileInput);
    console.log(file);
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
