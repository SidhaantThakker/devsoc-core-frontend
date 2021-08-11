import { getUrl } from '../../utils/getImageUrl'
import { currencyFormat } from '../../utils/currencyFormat'
import { api_url } from '../../utils/getApiUrl'
import Head from 'next/head'
import BuyButton from '../../components/BuyButton'

const Dish = ({dish}) => {
    return (
        <div>
            <Head>
                <title>{dish.name}</title>
            </Head>
            <img src={getUrl(dish.image)} />
            <h3>{dish.name}</h3>
            <h5>{currencyFormat(dish.price)}</h5>
            <p>{dish.description}</p>
            <BuyButton dish={dish}/>
        </div>
    )
}

export async function getStaticProps({params: {slug}}){
    const rawdish = await fetch(`${api_url}/dishes/?slug=${slug}`)
    const found = await rawdish.json()

    return {
        props: {
            dish: found[0]
        }
    }
}

export async function getStaticPaths(){
    const rawdishes = await fetch(`${api_url}/dishes/`)
    const dishes = await rawdishes.json()

    return {
        paths: dishes.map(dish => ({
            params: {slug: String(dish.slug)}
        })),
        fallback: false
    }
}
export default Dish