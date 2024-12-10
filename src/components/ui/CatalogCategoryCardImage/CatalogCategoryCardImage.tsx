import { FaUpload } from 'react-icons/fa6';

import staticData from '@/data/common.json';
import logo from '@assets/logo.png';

import { CatalogCategoryCardImageProps } from './types';

import { Img, ImgBox } from './CatalogCategoryCardImage.styled';

export const CatalogCategoryCardImage: React.FC<
  CatalogCategoryCardImageProps
> = ({ category }) => {
  const { imgText, noImgText } = staticData.catalogCard;
  const imgLinkText =
    category && category?.img.length > 15
      ? `${category?.img.slice(0, 15)}...`
      : category?.img;

  return (
    <div style={{ display: 'flex', gap: 8, backgroundColor: '#ffb' }}>
      <div>
        <span>{`${imgText}: `}</span>
        {category?.img || category?.img !== '' ? (
          <span>{imgLinkText}</span>
        ) : (
          <>
            <span>{noImgText}</span>

            <form>
              <input
                type="file"
                id="imageUpload"
                name="image"
                accept="image/*"
              />

              <button type="submit" style={{ border: 'none', padding: 6 }}>
                <FaUpload size={16} />
              </button>
            </form>
          </>
        )}
      </div>

      <ImgBox>
        <Img
          src={category?.img || category?.img !== '' ? category?.img : logo}
        />
      </ImgBox>
    </div>
  );
};
