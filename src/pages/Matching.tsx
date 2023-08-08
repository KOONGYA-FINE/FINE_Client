import { CommonFlex } from "../common/commonstyle";
import { MatchingWrapper, MatchingWrapperBox } from "../styles/MatchingStyle";

const Matching = () => {
  return (
    <>
      <MatchingWrapperBox>
        <MatchingWrapper className="title">매칭</MatchingWrapper>
        <MatchingWrapper className="interest">
          아래로 내려가려나?
        </MatchingWrapper>
        <MatchingWrapper className="content">내용</MatchingWrapper>
        <MatchingWrapper className="img">이미지</MatchingWrapper>
      </MatchingWrapperBox>
      <CommonFlex>
        <button>버튼</button>
        <button>버튼</button>
      </CommonFlex>
      <CommonFlex>
        <button>버튼</button>
        <button>버튼</button>
      </CommonFlex>
    </>
  );
};

export default Matching;
