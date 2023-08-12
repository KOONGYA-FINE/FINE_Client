import axios from "axios";
import { SERVER_URL } from "../store/jsonURL";

export type postType = {
    post_id: number,
    username: string,
    school: string,
    gender: string,
    nation: number,
    created_at: string,
    updated_at: string,
    title: string,
    content: string,
    image: string,
    interest: string,
    user_id: number,
}

export const GetAllMatchingPostsApi = async(page:number) => {
    try{
        const response = await axios.get(`${SERVER_URL}/posts/?order=-post_id&page=${page}`);
        console.log(response.data);
        return response;
    } catch(error) {
        console.log(error);
        return false;
    }
}

export const GetFilteredMatchingPostApi = async(page:number,interestStr:string, nationStr:string, genderStr:string) => {
    try{
        const response = await axios.get(`${SERVER_URL}/posts/?order=-post_id&page=${page}${interestStr}${nationStr}${genderStr}`);
        console.log(response.data);
        return response;
    } catch(error) {
        console.log(error);
        return false;
    }
}