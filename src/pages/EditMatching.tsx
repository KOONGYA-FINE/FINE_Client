import { CommonFlex } from "../common/commonstyle";
import { MatchingWrapper, MatchingWrapperBox } from "../styles/MatchingStyle";

const EditMatching = () => {
  return (
    <>
      <MatchingWrapperBox className="edit">
        <MatchingWrapper className="title">매칭</MatchingWrapper>
        <MatchingWrapper className="editcontent">내용</MatchingWrapper>
        <MatchingWrapper className="select">아래로 내려가려나?</MatchingWrapper>
      </MatchingWrapperBox>
      <CommonFlex>
        <button>버튼</button>
      </CommonFlex>
    </>
  );
};

export default EditMatching;
