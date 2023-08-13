import { useParams } from "react-router-dom";
import { postScrapMatchingApi } from "../../../apis/scrapapi";
import { UserInfoAtom } from "../../../store/atom";
import { useRecoilValue } from "recoil";

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
  return <button onClick={scrapFunc}>스크랩</button>;
};

export default ScrapButton;
