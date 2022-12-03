import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number' 
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'
  ;

  const TAGSTYLES = {
    onSale: {
      bgColor: '#C5295D',
      display: 'block',
      text: 'On Sale!',
    },
    newRelease: {
      bgColor: '#6868D9',
      display: 'block',
      text: 'Just Released!'
    },
    default: {
      bgColor: '#6868D9',
      display: 'none',
    }
  }

  const tagDisplay = variant === "default" 
    ? TAGSTYLES.default 
    : variant === "on-sale" 
    ? TAGSTYLES.onSale
    : TAGSTYLES.newRelease
  ;

  console.log(tagDisplay)
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <Tag show={tagDisplay}>{tagDisplay.text}</Tag>
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 250px;
`;

const Wrapper = styled.article`
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Tag = styled.div`
  display: ${props => props.show.display};
  position: absolute;
  top: 12px;
  right: -5px;
  padding: 4px 16px;
  background-color: ${props => props.show.bgColor};
  color: ${COLORS.white};
  border-radius: 3px;
`;

const Image = styled.img`
  max-width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
