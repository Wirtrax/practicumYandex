import { FC } from 'react';
import style from './OrderFeedStyle.module.css';

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        more?: string | number | null;
    }
}

interface FoodProps {
    imgUrl: string;
    plus?: number | null;
}

const Food: FC<FoodProps> = ({ imgUrl, plus }) => {
    return (
        <div className={style.imgIngridientInFeed} more={plus || undefined}>
            <img src={imgUrl} alt="" />
        </div>
    );
};

export default Food;