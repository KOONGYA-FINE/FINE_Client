export interface GenderOpt {
    readonly value : string;
    readonly label : string;
}

export const genderOptionsKO: readonly GenderOpt[] = [
    { value: "M", label: "남성" },
    { value: "F", label: "여성" },
];

export const genderOptionsEN: readonly GenderOpt[] = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
];

export interface NationOpt {
    readonly value: number;
    readonly label: string;
}

export const nationOptionsKO: readonly NationOpt[] = [
    {value: 0, label: "네덜란드"},
    {value: 1, label: "대만"},
    {value: 2, label: "대한민국"},
    {value: 3, label: "덴마크"},
    {value: 4, label: "독일"},
    {value: 5, label: "러시아"},
    {value: 6, label: "말레이시아"},
    {value: 7, label: "멕시코"},
    {value: 8, label: "미국"},
    {value: 9, label: "베트남"},
    {value: 10, label: "벨기에"},
    {value: 11, label: "브라질"},
    {value: 12, label: "스웨덴"},
    {value: 13, label: "스위스"},
    {value: 14, label: "스페인"},
    {value: 15, label: "싱가포르"},
    {value: 16, label: "영국"},
    {value: 17, label: "오스트리아"},
    {value: 18, label: "이탈리아"},
    {value: 19, label: "인도네시아"},
    {value: 20, label: "일본"},
    {value: 21, label: "중국"},
    {value: 22, label: "체코"},
    {value: 23, label: "칠레"},
    {value: 24, label: "캄보디아"},
    {value: 25, label: "캐나다"},
    {value: 26, label: "콜롬비아"},
    {value: 27, label: "태국"},
    {value: 28, label: "터키"},
    {value: 29, label: "파키스탄"},
    {value: 30, label: "포르투갈"},
    {value: 31, label: "폴란드"},
    {value: 32, label: "프랑스"},
    {value: 33, label: "핀란드"},
    {value: 34, label: "필리핀"},
    {value: 35, label: "헝가리"},
    {value: 36, label: "호주"},
    {value: 37, label: "홍콩"},
];

export const nationOptionsEN: readonly NationOpt[] = [
    {value: 0, label: "Netherlands"},
    {value: 1, label: "Taiwan"},
    {value: 2, label: "South Korea"},
    {value: 3, label: "Denmark"},
    {value: 4, label: "Germany"},
    {value: 5, label: "Russia"},
    {value: 6, label: "Malaysia"},
    {value: 7, label: "Mexico"},
    {value: 8, label: "United States"},
    {value: 9, label: "Vietnam"},
    {value: 10, label: "Belgium"},
    {value: 11, label: "Brazil"},
    {value: 12, label: "Sweden"},
    {value: 13, label: "Switzerland"},
    {value: 14, label: "Spain"},
    {value: 15, label: "Singapore"},
    {value: 16, label: "United Kingdom"},
    {value: 17, label: "Austria"},
    {value: 18, label: "Italy"},
    {value: 19, label: "Indonesia"},
    {value: 20, label: "Japan"},
    {value: 21, label: "China"},
    {value: 22, label: "Czech Republic"},
    {value: 23, label: "Chile"},
    {value: 24, label: "Cambodia"},
    {value: 25, label: "Canada"},
    {value: 26, label: "Colombia"},
    {value: 27, label: "Thailand"},
    {value: 28, label: "Turkey"},
    {value: 29, label: "Pakistan"},
    {value: 30, label: "Portugal"},
    {value: 31, label: "Poland"},
    {value: 32, label: "France"},
    {value: 33, label: "Finland"},
    {value: 34, label: "Philippines"},
    {value: 35, label: "Hungary"},
    {value: 36, label: "Australia"},
    {value: 37, label: "Hong Kong"},
];
