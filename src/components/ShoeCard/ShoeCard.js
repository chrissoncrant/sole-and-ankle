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

  
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant === 'on-sale' && <SaleTag>Sale</SaleTag>}
          {variant === 'new-release' && <ReleasedTag>Just Released!</ReleasedTag>}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price 
            style={{
              '--color': variant === 'on-sale' && COLORS.gray[700],
              '--strike': variant === 'on-sale' && 'line-through'
            }}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 275px;
  /* max-width: 300px; */
`;

const Wrapper = styled.article`
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Tag = styled.div`
  position: absolute;
  top: 12px;
  right: -5px;
  height: 32px;
  line-height: 32px;
  padding-inline: 10px;
  border-radius: 3px;
  font-size: ${14/ 18}rem;
  background-color: green;
  font-weight: ${WEIGHTS.bold};
  color: ${COLORS.white};
`;

const SaleTag = styled(Tag)`
  background-color: ${COLORS.primary};
`

const ReleasedTag = styled(Tag)`
  background-color: ${COLORS.secondary};
`

const Image = styled.img`
  max-width: 100%;
  border-radius: 12px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--strike);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  color: ${COLORS.primary};
`;

export default ShoeCard;
