import React, { useEffect } from "react";
import GoogleMapSearch from "../../components/utils/GoogleMapSearch";
import { placesState } from "../../store/atom";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import InfoCard from "../../components/food/InfoCard";
// import useCheckMine from "../../hooks/useCheckMine";

const FoodSearch: React.FC = () => {
  const placesInfo = useRecoilValue(placesState);
  useEffect(() => {
    console.log(placesInfo);
  }, [placesInfo]);
  // 글 조회시 본인인지 아닌지 확인 여부
  // const checkMine = useCheckMine();
  // const onClick = () => {
  //   if (checkMine === false) {
  //     alert("본인이 아닙니다");
  //   } else {
  //     alert("본인이 맞군요!");
  //   }
  // };
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
          <div>Please Search Location First!</div>
        )}
      </CardWrapper>
      {/* <button onClick={onClick}>테스트</button> */}
    </>
  );
};

export default FoodSearch;

export const CardWrapper = styled.div`
  display: flex;
  height: 40vh;
  overflow: scroll;
  flex-wrap: wrap;
`;
export const Card = styled.div`
  width: 30vw;
  height: 25vh;
`;

export const CardImg = styled.img`
  width: 50%;
  height: 50%;
`;
