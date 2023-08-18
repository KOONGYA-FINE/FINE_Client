import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { getAllPlacesApi } from '../../apis/foodapi';
import { foodGetType } from '../food/FilterInfiniteScrollFoodGrid';
import {FaLocationDot} from 'react-icons/fa6'

export const FoodInfoGrid = () => {
    const postList : foodGetType[] = [];
    const [bigFoodData, setBigFoodData] = useState<foodGetType>();
    const [foodData, setFoodData] = useState<foodGetType[]>(postList);

    const getPlaces = async() => {
        const result = await getAllPlacesApi(1, ''); 
        if(result===false) {
            alert("불러오기 오류 발생");
        } else {
            console.log(result?.data.data);
            setBigFoodData(result?.data.data[0])
            setFoodData((foodData).concat([result?.data.data[1], result?.data.data[2], result?.data.data[3], result?.data.data[4]]));
        }
    }

    useEffect(()=>{
        getPlaces();
    }, [])

  return (
    <FoodWrapper>
        {(bigFoodData)&&
            <BigFoodBox>
                <img src={bigFoodData.image} />
                <div className='restaurant-info'>
                    <div className='button-box'>Latest Review</div>
                    <h2>{bigFoodData.name}</h2>
                    <div className='address'><a className='location'><FaLocationDot /></a>{bigFoodData.address}</div>
                </div>
            </BigFoodBox>
        }
        <SmallFoodWrapper>
            {(foodData)&&foodData.map((food, idx:number)=>(
                <SmallFoodBox key={idx}>
                    <img src={food.image} />
                    <div className='restaurant-info'>
                        <h3>{food.name}</h3>
                        <div className='address'><a className='location'><FaLocationDot /></a>{food.address}</div>
                    </div>
                </SmallFoodBox>
            ))}
        </SmallFoodWrapper>
    </FoodWrapper>
  )
}

const FoodWrapper = styled.div`
    display: flex;
    flex-basis: 90vh;
    justify-content: space-between;
`

const BigFoodBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    & > img{
        width: 80%;
    }
    & > .restaurant-info{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: start;
        margin: 0 5% 0 5%;
        .button-box{
            padding: 1% 5% 1% 5%;
            background-color: #22AA55;
            border-radius: 7px;
        }
        .address{
            .location{
                color: green;
            }
        }
    }
`

const SmallFoodWrapper = styled.div`
    display: flex;
    width: 45%;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`

const SmallFoodBox = styled.div`
    display: flex;
    justify-content: center;
    & > img{
        width: 30%;
        border-radius: 10px;
    }
    & > .restaurant-info{
        display: flex;
        width: 60%;
        flex-direction: column;
        align-items: flex-start;
        margin: 0 5% 0 5%;
        text-align: start;
        .address{
            .location{
                color: green;
            }
        }
    }
`