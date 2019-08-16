import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { styled } from 'linaria/react';
import db from '~/utils/db';

const Wrapper = styled.div`
  @apply p-4 w-full;
`;

const Heading = styled.h2`
  @apply mb-2;
  font-size: 2em;
  font-weight: 700;
`;

const Description = styled.p`
  max-width: 40em;
  line-height: 1.2;
`;

const PreviewArea = styled.div`
  @apply max-w-sm rounded overflow-hidden py-2 px-3 bg-gray-300 ml-auto;
`;

const MainArea = styled.div`
  @apply flex flex-row flex-wrap my-2;
`;

const InputArea = styled.form`
  @apply flex flex-row flex-no-wrap flex-grow items-center my-4 mr-4;
`;

const AddBtn = styled.input`
  @apply bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow ml-2 outline-none;
  height: 2.25em;
  cursor: pointer;
  line-height: 1.15;
`;

const FontInput = styled.input`
  @apply w-full block appearance-none ;
  text-align: start;
  font-size: 1em;
  border-radius: 4px;
  color: #999999;
  /* border: 0px solid #999999; */
  border: none;
  background-color: #f0f0f0;
  height: 2.25em;
  padding: 0em .5em;
  max-width: 21.25em;
  &:focus {
    @apply text-black;
  }
`;

const PreviewHint = styled.p`
  @apply text-gray-500;
  font-size: .8em;
  padding-top: .2em;
`;

const Config = () => {
  const { t } = useTranslation('config');
  const [fontnames, setFontnames] = useState<Set<string>>(new Set());
  const [preview, setPreview] = useState('');
  const [curFont, setCurFont] = useState('');

  useEffect(
    () => {
      db.transaction('rw', db.config, async () => {
        const fonts = await db.config.get('fonts');
        console.log('in transaction');

        if (!fonts) await db.config.put({ name: 'fonts', value: new Set() });
        // set the initial values
        if (fonts) setFontnames(fonts.value);
      }).catch((e) => {
        // log any errors
        console.error(e.stack || e);
      });

      // close the database connection if form is unmounted or the
      // database connection changes
      // return () => db.close();
    },
    [db]
  );

  const addFontname = (val: string) => {
    fontnames.add(val);
    setFontnames(fontnames);
    db.config.put({ name: 'fonts', value: fontnames });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addFontname(curFont);
    setCurFont('');
  };

  const handleSetFontname = (e: React.FormEvent<HTMLInputElement>) => {
    setCurFont(e.currentTarget.value);
  };

  const handleDelFont = (fontname: string) => {
    fontnames.delete(fontname);
    setFontnames(prev => {
      const newSet = new Set(prev);
      newSet.delete(fontname);
      return newSet;
    });
    db.config.put({ name: 'fonts', value: fontnames });
  };

  const customFontStyle = {
    fontFamily: `'${preview}', sans-serif`,
  }
  return (
    <Wrapper>
      <Heading>{t('font_management')}</Heading>
      <Description>{t('font_explanation')}</Description>
      <MainArea>
        <InputArea onSubmit={handleSubmit}>
          <FontInput
            id="fontname"
            placeholder={t('fontname_hint')}
            type="text"
            name="fontname"
            value={curFont}
            onChange={handleSetFontname}
            required
          />
          <AddBtn
            placeholder={t('add_font')}
            type="submit"
          />
        </InputArea>
        <PreviewArea style={customFontStyle}>
          <p lang="zh-cn">朝辞白帝彩云间</p>
          <p lang="zh-tw">朝辭白帝彩雲間</p>
          <p lang="ja-JP">朝に辭す白帝彩雲の間</p>
          <p lang="en">The quick brown fox jumps over the lazy dog</p>
          <PreviewHint>{t('preview_description')}</PreviewHint>
        </PreviewArea>
      </MainArea>
      <div>
        {[...fontnames].map(fontname => (
          <div key={fontname}>
            <button type="button" onClick={() => handleDelFont(fontname)}>
              <FontAwesomeIcon
                icon="times"
              />
            </button>
            <button
              type="button"
              onClick={() => setPreview(fontname)}
            >
              {fontname}
            </button>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Config;
