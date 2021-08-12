import Head from 'next/head'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { currencyFormat } from '../utils/currencyFormat'
import { getUrl } from '../utils/getImageUrl'
import { api_url } from '../utils/getApiUrl'

export default function Home({ dishes }) {

  const [cuisineOptions, setCuisineOptions] = useState([])
  const [typeOptions, setTypeOptions] = useState([])

  const [searchName, setSearchName] = useState('')
  const [searchCuisine, setSearchCuisine] = useState('')
  const [searchType, setSearchType] = useState('')

  useEffect(() => {

    dishes.map(dish => {
      if(!cuisineOptions.includes(dish.cuisine)){
        setCuisineOptions([...cuisineOptions, dish.cuisine])
      }
    })

    dishes.map(dish => {
      if(!typeOptions.includes(dish.type)){
        setTypeOptions([...typeOptions, dish.type])
      }
    })

  }, [dishes, cuisineOptions, typeOptions]);

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Our Menu</h1>
      <hr></hr>
      <div className={styles.inputBox}>
        <input type="text" placeholder="Search By Name" onChange={event => {setSearchName(event.target.value)}} />
        
        <select id="dropdown" onChange={event => {setSearchCuisine(event.target.value)}}>
              <option key="blank">Select Cuisine</option>
              {cuisineOptions.map(opt => (
                <option key={opt} className={"optionClass"}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
              ))}
        </select>

        <select id="dropdown" onChange={event => {setSearchType(event.target.value)}}>
              <option key="blank">Select Type</option>
              {typeOptions.map(opt => (
                <option key={opt} className={"optionClass"}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
              ))}
        </select>
      </div>
      <hr></hr>
      <div className={styles.dishes}>
      {dishes.filter((dish) => {
        let nameFlag = 0;
        let cuisineFlag = 0;
        let typeFlag = 0;
        if (dish.name.toLowerCase().includes(searchName.toLowerCase())) {
          nameFlag = 1
        }
        if (dish.cuisine.toLowerCase().includes(searchCuisine.toLowerCase()) || searchCuisine == 'Select Cuisine') {
          cuisineFlag = 1
        }
        if (dish.type.toLowerCase().includes(searchType.toLowerCase()) || searchType == 'Select Type') {
          typeFlag = 1
        }
        if(nameFlag && cuisineFlag && typeFlag){
          return dish
        }
      } 
      ).map(dish => (
        <div key={dish.name} className={styles.dish}>
          <Link href={`/dishes/${dish.slug}`}>
            <a>
            <div className={styles.dishBox}>
              <div className={styles.dishImage}><img src={getUrl(dish.image)}></img></div>
              <div className={styles.dishInfo}>{dish.name}</div><div className={styles.currency}>{currencyFormat(dish.price)}</div>
            </div>
            </a>
          </Link>
        </div>
      ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {

  const rawdishes = await fetch(`${api_url}/dishes/`)
  const dishes = await rawdishes.json()

  return {
    props: {
      dishes
    }
  }
}