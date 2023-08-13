import axios from "axios";
import { SERVER_URL } from "../store/jsonURL";

export const GetMatchingPostsForLandingApi = async() => {
    try{
        const response = await axios.get(`${SERVER_URL}/posts/?order=-post_id&page=1`);
        console.log(response.data);
        return response;
    } catch(error) {
        console.log(error);
        return false;
    }
}