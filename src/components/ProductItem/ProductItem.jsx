import styles from './styles.module.scss';
import reLoadIcon from '@icons/svgs/reloadIcon.svg';
import heartIcon from '@icons/svgs/heart.svg';
import cartIcon from '@icons/svgs/cartIcon.svg';
import cls from 'classnames';
import Button from '@components/Button/Button';

function ProductItem({
    src,
    prevSrc,
    name,
    price,
    isNotHomePage = false,
    details
}) {
    const {
        boxImg,
        showImgWhenHover,
        showFncWhenHover,
        boxIcon,
        title,
        priceCl,
        boxSize,
        size,
        textCenter,
        boxBtn
    } = styles;

    const { size: sizes } = details;

    return (
        <div>
            <div className={boxImg}>
                <img src={src} alt='' />
                <img src={prevSrc} alt='' className={showImgWhenHover} />

                <div className={showFncWhenHover}>
                    <div className={boxIcon}>
                        <img src={cartIcon} alt='' />
                    </div>
                    <div className={boxIcon}>
                        <img src={heartIcon} alt='' />
                    </div>
                    <div className={boxIcon}>
                        <img src={reLoadIcon} alt='' />
                    </div>
                    <div className={boxIcon}>
                        <img src={cartIcon} alt='' />
                    </div>
                </div>
            </div>

            {isNotHomePage && (
                <div className={boxSize}>
                    {sizes.map((item, index) => {
                        return (
                            <div className={size} key={index}>
                                {item.name}
                            </div>
                        );
                    })}
                </div>
            )}
            <div className={cls(title, { [textCenter]: isNotHomePage })}>
                {name}
            </div>
            <div className={cls(priceCl, { [textCenter]: isNotHomePage })}>
                Brand 01
            </div>
            <div className={cls(priceCl, { [textCenter]: isNotHomePage })}>
                ${price}
            </div>

            {isNotHomePage && (
                <div className={boxBtn}>
                    <Button content={'ADD TO CART'} />
                </div>
            )}
        </div>
    );
}

export default ProductItem;
