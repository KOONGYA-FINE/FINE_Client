import React, { useEffect } from "react";
import GoogleMapSearch from "../../components/utils/GoogleMapSearch";
import { placesState } from "../../store/atom";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import InfoCard from "../../components/food/InfoCard";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../../hooks/useGetLanguage";
const FoodSearch: React.FC = () => {
  const { t } = useTranslation();
  useGetLanguage();
  const placesInfo = useRecoilValue(placesState);
  useEffect(() => {
    console.log(placesInfo);
  }, [placesInfo]);
  return (
    <>
      <GoogleMapSearch />
      <CardWrapper>
        {placesInfo.length > 1 ? (
          placesInfo.map((e, index) => {
            if (index >= 1) {
              return (
                <Card>
                  <InfoCard
                    address={e.address}
                    name={e.name}
                    phtotoProp={e?.phtotoProp}
                    rating={e.rating}
                    lat={e.lat}
                    lng={e.lng}
                    url={e.url}
                    tag={e.tag}
                  />
                </Card>
              );
            }
            return null; // 인덱스가 0인 경우는 무시
          })
        ) : (
          <div>{t(`review.map_search`)}</div>
        )}
      </CardWrapper>
    </>
  );
};

export default FoodSearch;

export const CardWrapper = styled.div`
  margin: 10px auto;
  display: flex;
  height: 40vh;
  overflow: scroll;
  flex-wrap: wrap;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const Card = styled.div`
  width: 25vw;
  height: 20vh;
  box-shadow: 0px 3px 5px #00000075;
  margin: 10px auto;
  border-radius: 10px;
`;

export const CardImg = styled.img`
  width: 50%;
  height: 50%;
`;
