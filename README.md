# FINE_Client
LikeLion 11th Hackathon Client

## File Tree(src)
📦src <br>
 ┣ 📂apis <br>
 ┃ ┣ 📜foodapi.ts <br>
 ┃ ┣ 📜landingapi.ts <br>
 ┃ ┣ 📜loginapi.ts <br>
 ┃ ┣ 📜matchingGet.ts <br>
 ┃ ┣ 📜matchingWriting.ts <br>
 ┃ ┣ 📜mypagapis.ts <br>
 ┃ ┣ 📜scrapapi.ts <br>
 ┃ ┗ 📜signupapi.ts <br>
 ┣ 📂assets <br>
 ┃ ┣ 📂fonts <br>
 ┃ ┃ ┣ 📜KatahdinRound.otf <br>
 ┃ ┃ ┗ 📜Poppins-Regular.ttf <br>
 ┃ ┗ 📜react.svg <br>
 ┣ 📂common <br>
 ┃ ┣ 📜commonstyle.tsx <br>
 ┃ ┣ 📜font.css <br>
 ┃ ┗ 📜icons.tsx <br>
 ┣ 📂components <br>
 ┃ ┣ 📂food <br>
 ┃ ┃ ┣ 📜FilterInfiniteScrollFoodGrid.tsx <br>
 ┃ ┃ ┣ 📜FoodCardBox.tsx <br>
 ┃ ┃ ┣ 📜FoodEditButton.tsx <br>
 ┃ ┃ ┣ 📜FoodEditForm.tsx <br>
 ┃ ┃ ┣ 📜FoodRegisterForm.tsx <br>
 ┃ ┃ ┣ 📜FoodReviewPhoto.tsx <br>
 ┃ ┃ ┣ 📜FoodTagButton.tsx <br>
 ┃ ┃ ┣ 📜FooterFoodReview.tsx <br>
 ┃ ┃ ┣ 📜HeaderFoodReview.tsx <br>
 ┃ ┃ ┣ 📜InfoCard.tsx <br>
 ┃ ┃ ┗ 📜SearchFilterScrollFoodGrid.tsx <br>
 ┃ ┣ 📂landing <br>
 ┃ ┃ ┣ 📜FoodInfoGrid.tsx <br>
 ┃ ┃ ┣ 📜MachingCardBox.tsx <br>
 ┃ ┃ ┗ 📜MatchingCard.tsx <br>
 ┃ ┣ 📂login <br>
 ┃ ┃ ┗ 📜Loginform.tsx <br>
 ┃ ┣ 📂matching <br>
 ┃ ┃ ┣ 📂scrap <br>
 ┃ ┃ ┃ ┗ 📜ScrapButton.tsx <br>
 ┃ ┃ ┣ 📜CardBox.tsx <br>
 ┃ ┃ ┣ 📜FilterInfiniteScrollGrid.tsx <br>
 ┃ ┃ ┣ 📜InfiniteScrollGrid.tsx <br>
 ┃ ┃ ┣ 📜MatchingEditForm.tsx <br>
 ┃ ┃ ┣ 📜MatchingInterestRegister.tsx <br>
 ┃ ┃ ┣ 📜MatchingWritingForm.tsx <br>
 ┃ ┃ ┗ 📜SpecificMatchingForm.tsx <br>
 ┃ ┣ 📂mypage <br>
 ┃ ┃ ┣ 📜EditUserInfoBox.tsx <br>
 ┃ ┃ ┣ 📜MatchingPostUserInfo.tsx <br>
 ┃ ┃ ┣ 📜MatchingScrapUserInfo.tsx <br>
 ┃ ┃ ┗ 📜ViewUserInfoBox.tsx <br>
 ┃ ┣ 📂signup <br>
 ┃ ┃ ┣ 📜SignUpAccountForm.tsx <br>
 ┃ ┃ ┗ 📜SignUpInfoForm.tsx <br>
 ┃ ┗ 📂utils <br>
 ┃ ┃ ┣ 📜FineGoogleMap.tsx <br>
 ┃ ┃ ┣ 📜GoogleMapSearch.tsx <br>
 ┃ ┃ ┣ 📜HeaderCompo.tsx <br>
 ┃ ┃ ┣ 📜PhotoProp.tsx <br>
 ┃ ┃ ┣ 📜StarEvaluation.tsx <br>
 ┃ ┃ ┣ 📜StarInput.tsx <br>
 ┃ ┃ ┗ 📜StarRating.tsx <br>
 ┣ 📂hooks <br>
 ┃ ┣ 📜interestArray.tsx <br>
 ┃ ┣ 📜useCheckMine.tsx <br>
 ┃ ┣ 📜useGetLanguage.tsx <br>
 ┃ ┣ 📜useGetMatchingProps.tsx <br>
 ┃ ┣ 📜useGetReviewProps.tsx <br>
 ┃ ┣ 📜useGetToken.tsx <br>
 ┃ ┗ 📜useRoutePageFunc.tsx <br>
 ┣ 📂locales <br>
 ┃ ┣ 📂en <br>
 ┃ ┃ ┗ 📜translation.json <br>
 ┃ ┣ 📂ko <br>
 ┃ ┃ ┗ 📜translation.json <br>
 ┃ ┗ 📜i18n.ts <br>
 ┣ 📂pages <br>
 ┃ ┣ 📂food <br>
 ┃ ┃ ┣ 📜FoodEdit.tsx <br>
 ┃ ┃ ┣ 📜FoodMain.tsx <br>
 ┃ ┃ ┣ 📜FoodRegister.tsx <br>
 ┃ ┃ ┣ 📜FoodReview.tsx <br>
 ┃ ┃ ┣ 📜FoodReviewMain.tsx <br>
 ┃ ┃ ┗ 📜FoodSearch.tsx <br>
 ┃ ┣ 📜EditMatching.tsx <br>
 ┃ ┣ 📜Landing.tsx <br>
 ┃ ┣ 📜Login.tsx <br>
 ┃ ┣ 📜Matching.tsx <br>
 ┃ ┣ 📜MatchingMain.tsx <br>
 ┃ ┣ 📜MatchingPageWrapper.tsx <br>
 ┃ ┣ 📜MyPage.tsx <br>
 ┃ ┣ 📜RegisterMatching.tsx <br>
 ┃ ┣ 📜SignupAccount.tsx <br>
 ┃ ┗ 📜SignupInfo.tsx <br>
 ┣ 📂store <br>
 ┃ ┣ 📜atom.tsx <br>
 ┃ ┣ 📜jsonURL.ts <br>
 ┃ ┣ 📜optiondata.tsx <br>
 ┃ ┣ 📜regExp.ts <br>
 ┃ ┗ 📜tagoptionData.tsx <br>
 ┣ 📂styles <br>
 ┃ ┣ 📜MatchingStyle.ts <br>
 ┃ ┗ 📜loginFontStyle.ts <br>
 ┣ 📜App.css <br>
 ┣ 📜App.tsx <br>
 ┣ 📜index.css <br>
 ┣ 📜main.tsx <br>
 ┣ 📜router.tsx <br>
 ┗ 📜vite-env.d.ts <br>
