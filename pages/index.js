import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { currencyFormat } from '../utils/currencyFormat'
import { getUrl } from '../utils/getImageUrl'
import { api_url } from '../utils/getApiUrl'

export default function Home({ dishes }) {
  const [searchName, setSearchName] = useState('')
  const [searchCuisine, setSearchCuisine] = useState('')
  const [searchType, setSearchType] = useState('')
  return (
    <div className={styles.main}>
      <div className={styles.inputBox}>
        <input type="text" placeholder="Search By Name" onChange={event => {setSearchName(event.target.value)}} />
        <input type="text" placeholder="Search By Cuisine" onChange={event => {setSearchCuisine(event.target.value)}} />
        <input type="text" placeholder="Search By Type" onChange={event => {setSearchType(event.target.value)}} />
      </div>
      <div className={styles.dishes}>
      {dishes.filter((dish) => {
        let nameFlag = 0;
        let cuisineFlag = 0;
        let typeFlag = 0;
        if (dish.name.toLowerCase().includes(searchName.toLowerCase())) {
          nameFlag = 1
        }
        if (dish.cuisine.toLowerCase().includes(searchCuisine.toLowerCase())) {
          cuisineFlag = 1
        }
        if (dish.type.toLowerCase().includes(searchType.toLowerCase())) {
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