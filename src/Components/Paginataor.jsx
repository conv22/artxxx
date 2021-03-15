import style from "./paginator.module.css"
import { useState, useEffect } from "react"

export function Paginator({ sortOption, page, setnumberPage, total_pages, loadMovies, setPaginator }) {
    const onPageChanged = p => {
        window.scrollTo(0, 0)
        loadMovies(p)
        setnumberPage(p)
    }
    const [pages, setPages] = useState([])

    const portionSize = 5
    const portionCount = Math.ceil(total_pages / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    useEffect(() => {
        console.log(1)
        const loadPages = () => {
            const pages = []
            for (let i = 1; i <= total_pages; i++) {
                pages.push(i)
            }
            setPages(pages)
        }
        loadPages()
    }, [total_pages])

    return (
        <div className={style.pagination}>
            <div>
                {portionNumber > 1 && (
                    <div
                        onClick={() => {
                            setPortionNumber(portionNumber - 1)
                            onPageChanged(leftPortionPageNumber - 1)
                        }}>
                        пред
                    </div>
                )}
                <div>
                    {pages
                        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                        .map(p => {
                            return (
                                <span
                                    className={page === p ? style.selectNumberPage : style.numberPage}
                                    key={p}
                                    onClick={() => onPageChanged(p)}>
                                    {p}
                                </span>
                            )
                        })}
                </div>
                {portionCount > portionNumber && (
                    <div
                        onClick={() => {
                            setPortionNumber(portionNumber + 1)
                            onPageChanged(rightPortionPageNumber + 1)
                        }}>
                        след
                    </div>
                )}
            </div>
        </div>
    )
}
