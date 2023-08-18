import { useParams } from "react-router-dom";
import { postScrapMatchingApi } from "../../../apis/scrapapi";
import { UserInfoAtom } from "../../../store/atom";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

const ScrapButton = () => {
  const { idx } = useParams();
  const numberIdx: number = parseInt(idx!);
  const token = localStorage.getItem("access_token") as string;
  const userInfo = useRecoilValue(UserInfoAtom);
  const scrapFunc = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = await postScrapMatchingApi(
      userInfo.user.id,
      numberIdx,
      token
    );
    if (result.status === 201 || result.status === 200) {
      if (result.data.is_deleted === false) {
        alert("scrap");
      } else {
        alert("scrap cancel");
      }
    } else {
      alert("failed");
    }
  };
  return <ScrapbuttonComp onClick={scrapFunc}>스크랩</ScrapbuttonComp>;
};

export default ScrapButton;

const ScrapbuttonComp = styled.button`
  width: 120px;
  height: 25px;
  gap: 8px;
  padding: 4px 0px;
  border-radius: 10px;
  background-color: rgba(230, 244, 235, 1);
  color: rgba(34, 170, 85, 1);
  border-color: transparent;
`;
