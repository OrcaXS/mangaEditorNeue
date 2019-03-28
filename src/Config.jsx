import React, { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Config = () => (
  <div>
    <h2>config.font_management</h2>
    <p>config.font_explanation</p>
    <div>
      <form>
        <input
          id="fontname"
          placeholder="fontInputPlaceHolder"
          type="text"
          name="fontname"
          required
        />
        <input
          value="$t('config.add_font')"
          type="submit"
        />
      </form>
      <div>
        <p lang="zh-cn">朝辞白帝彩云间</p>
        <p lang="zh-tw">朝辭白帝彩雲間</p>
        <p lang="ja-JP">朝に辭す白帝彩雲の間</p>
        <p lang="en-US">The quick brown fox jumps over the lazy dog</p>
        <p>config.preview_description</p>
      </div>
    </div>
    <div>
      <div>
        <button type="button">
          <FontAwesomeIcon
            icon="['fas', 'times']"
          />
        </button>
        <button type="button">
          font
        </button>
      </div>
    </div>
  </div>
);

export default Config;
