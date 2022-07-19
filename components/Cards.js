import { useContext } from "react"
import { ArxomContext } from "../context/ArxomContext"
import { Card } from "./Card"

const styles = {
    container: `h-full w-full flex flex-col ml-[80px] mt-[50px]`,
    title: `text-2xl font-bold mb-[40px] mt-[30px]`,
    cards: `flex items-center flex-wrap gap-[80px]`
}

export const Cards = () => {
    const {assets} = useContext(ArxomContext)
    return (
        <div className={styles.container}>
            <div className={styles.title}>New Release</div>
            <div className={styles.cards}>
                {assets.map((item) => {
                    return <Card key={item.id} item={item.attributes} />
                })}
            </div>
        </div>
    )
}