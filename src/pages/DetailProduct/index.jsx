import { getDetailProduct, getRelatedProduct } from '@/apis/productsService';
import InformationProduct from '@/pages/DetailProduct/components/Infomation';
import ReviewProduct from '@/pages/DetailProduct/components/Review';
import { handleAddProductToCartCommon } from '@/utils/helper';
import AccordionMenu from '@components/AccordionMenu';
import Button from '@components/Button/Button';
import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';
import PaymentMethods from '@components/PaymentMethods/PaymentMethods';
import SliderCommon from '@components/SliderCommon/SliderCommon';
import cls from 'classnames';
import { useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { TfiReload } from 'react-icons/tfi';
import { useNavigate, useParams } from 'react-router-dom';
import ReactImageMagnifier from 'simple-image-magnifier/react';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { ToastContext } from '@/contexts/ToastProvider';
import Cookies from 'js-cookie';
import { addProductToCart } from '@/apis/cartService';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const INCREMENT = 'increment';
const DECREMENT = 'decrement';

function DetailProduct() {
    const {
        container,
        navigateSection,
        contentSection,
        price,
        imageBox,
        imageBoxItem,
        infoBox,
        description,
        boxSize,
        size,
        titleSize,
        functionInfo,
        boxBtn,
        incrementAmount,
        orSection,
        addFunc,
        info,
        active,
        clear,
        activeDisabledBtn,
        loading,
        emptyData
    } = styles;

    const [menuSelected, setMenuSelected] = useState(1);
    const [sizeSelected, setSizeSelected] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState();
    const [relatedData, setRelatedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const param = useParams();
    const navigate = useNavigate();
    const { setIsOpen, setType, handleGetListProductsCart } =
        useContext(SideBarContext);
    const { toast } = useContext(ToastContext);
    const userId = Cookies.get('userId');
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [isLoadingBtnBuyNow, setIsLoadingBtnBuyNow] = useState(false);

    const images = [
        'https://pos.nvncdn.com/f2fe44-24897/ps/20230821_o5LKOchlIF.jpeg',
        'https://pos.nvncdn.com/f2fe44-24897/ps/20230818_WBen1qWfCq.jpeg',
        'https://pos.nvncdn.com/f2fe44-24897/ps/20230818_gWTNTGRu66.jpeg'
    ];

    const dataAccordionMenu = [
        {
            id: 1,
            titleMenu: 'ADDITIONAL INFORMATION',
            content: <InformationProduct />
        },
        {
            id: 2,
            titleMenu: 'REVIEW (0)',
            content: <ReviewProduct />
        }
    ];

    const handleRenderZoomImage = src => {
        return (
            <ReactImageMagnifier
                srcPreview={src}
                srcOriginal={src}
                width={295}
                height={350}
            />
        );
    };

    const handleSetMenuSelected = id => {
        setMenuSelected(id);
    };

    const handleSelectedSize = size => {
        setSizeSelected(size);
    };

    const handleClearSizeSeleted = () => {
        setSizeSelected('');
    };

    const handleSetQuantity = type => {
        if (quantity < 1) return;

        setQuantity(prev =>
            type === INCREMENT ? (prev += 1) : quantity === 1 ? 1 : (prev -= 1)
        );
    };

    const fetchDataDetail = async id => {
        setIsLoading(true);
        try {
            const data = await getDetailProduct(id);

            setData(data);
            setIsLoading(false);
        } catch (error) {
            toast.error('Có lỗi khi tải dữ liệu');
            setData();
            setIsLoading(false);
        }
    };

    const fetchDataRelatedProduct = async id => {
        setIsLoading(true);
        try {
            const data = await getRelatedProduct(id);
            setRelatedData(data);
            setIsLoading(false);
        } catch (error) {
            setRelatedData([]);
            toast.error('Có lỗi khi tải dữ liệu');
            setIsLoading(false);
        }
    };

    const handleAdd = () => {
        handleAddProductToCartCommon(
            userId,
            setIsOpen,
            setType,
            toast,
            sizeSelected,
            param.id,
            quantity,
            setIsLoadingBtn,
            handleGetListProductsCart
        );
    };

    const handleBuyNow = () => {
        const data = {
            userId,
            productId: param.id,
            quantity,
            size: sizeSelected
        };

        setIsLoadingBtnBuyNow(true);
        addProductToCart(data)
            .then(res => {
                toast.success('Add Product to cart successfully!');
                setIsLoadingBtnBuyNow(false);
                navigate('/cart');
            })
            .catch(err => {
                toast.error('Add Product to cart failed!');
                setIsLoadingBtnBuyNow(false);
            });
    };

    useEffect(() => {
        if (param.id) {
            fetchDataDetail(param.id);
            fetchDataRelatedProduct(param.id);
        }
    }, [param]);

    return (
        <div>
            <MyHeader />

            <div className={container}>
                <MainLayout>
                    <div className={navigateSection}>
                        <div>Home {'>'} Men</div>
                        <div className='' style={{ cursor: 'pointer' }}>
                            {'<'} Return to previous page{' '}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className={loading}>
                            <LoadingTextCommon />
                        </div>
                    ) : (
                        <>
                            {!data ? (
                                <div className={emptyData}>
                                    <p>No Result</p>
                                    <div>
                                        <Button
                                            content={'Back to Our Shop'}
                                            onClick={() => navigate('/shop')}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className={contentSection}>
                                    <div className={imageBox}>
                                        <Carousel
                                            showArrows={false} // Hiển thị mũi tên điều hướng
                                            showThumbs={true} // Hiển thị thumbnails
                                            showStatus={false} // Ẩn trạng thái (ví dụ: 1/5)
                                            infiniteLoop={true} // Lặp vô hạn
                                            autoPlay={true} // Tự động chạy
                                            interval={3000} // Chuyển slide sau 3 giây
                                            stopOnHover={true} // Dừng khi hover
                                            emulateTouch={true} // Hỗ trợ swipe trên desktop
                                        >
                                            {images.map((image, index) => (
                                                <div key={index}>
                                                    <img
                                                        className={imageBoxItem}
                                                        src={image}
                                                        alt={`Slide ${
                                                            index + 1
                                                        }`}
                                                    />
                                                </div>
                                            ))}
                                        </Carousel>
                                    </div>
                                    <div className={infoBox}>
                                        <h1>{data?.name}</h1>
                                        <p className={price}>${data?.price}</p>
                                        <p className={description}>
                                            {data?.description}
                                        </p>

                                        <p className={titleSize}>
                                            Size {sizeSelected}
                                        </p>
                                        <div className={boxSize}>
                                            {data?.size.map(
                                                (itemSize, index) => {
                                                    return (
                                                        <div
                                                            className={cls(
                                                                size,
                                                                {
                                                                    [active]:
                                                                        sizeSelected ===
                                                                        itemSize.name
                                                                }
                                                            )}
                                                            key={index}
                                                            onClick={() =>
                                                                handleSelectedSize(
                                                                    itemSize.name
                                                                )
                                                            }
                                                        >
                                                            {itemSize.name}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>

                                        {sizeSelected && (
                                            <p
                                                className={clear}
                                                onClick={handleClearSizeSeleted}
                                            >
                                                clear
                                            </p>
                                        )}

                                        <div className={functionInfo}>
                                            <div className={incrementAmount}>
                                                <div
                                                    onClick={() =>
                                                        handleSetQuantity(
                                                            DECREMENT
                                                        )
                                                    }
                                                >
                                                    -
                                                </div>
                                                <div>{quantity}</div>
                                                <div
                                                    onClick={() =>
                                                        handleSetQuantity(
                                                            INCREMENT
                                                        )
                                                    }
                                                >
                                                    +
                                                </div>
                                            </div>

                                            <div className={boxBtn}>
                                                <Button
                                                    content={
                                                        isLoadingBtn ? (
                                                            <LoadingTextCommon />
                                                        ) : (
                                                            'Add to Cart'
                                                        )
                                                    }
                                                    customClassname={
                                                        !sizeSelected &&
                                                        activeDisabledBtn
                                                    }
                                                    onClick={handleAdd}
                                                />
                                            </div>
                                        </div>

                                        <div className={orSection}>
                                            <div></div>
                                            <span>OR</span>
                                            <div></div>
                                        </div>

                                        <div>
                                            <Button
                                                content={
                                                    isLoadingBtnBuyNow ? (
                                                        <LoadingTextCommon />
                                                    ) : (
                                                        'Buy now'
                                                    )
                                                }
                                                customClassname={
                                                    !sizeSelected &&
                                                    activeDisabledBtn
                                                }
                                                onClick={handleBuyNow}
                                            />
                                        </div>

                                        <div className={addFunc}>
                                            <div>
                                                <CiHeart />
                                            </div>

                                            <div>
                                                <TfiReload />
                                            </div>
                                        </div>

                                        <div>
                                            <PaymentMethods />
                                        </div>

                                        <div className={info}>
                                            <div>
                                                Brand: <span>Brand 03</span>
                                            </div>

                                            <div>
                                                SKU: <span>87654</span>
                                            </div>

                                            <div>
                                                Category: <span>Men</span>
                                            </div>
                                        </div>

                                        {dataAccordionMenu.map(
                                            (item, index) => (
                                                <AccordionMenu
                                                    titleMenu={item.titleMenu}
                                                    contentJsx={item.content}
                                                    key={index}
                                                    onClick={() =>
                                                        handleSetMenuSelected(
                                                            item.id
                                                        )
                                                    }
                                                    isSelected={
                                                        menuSelected === item.id
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {relatedData.length ? (
                        <div>
                            <h2>Related products</h2>

                            <SliderCommon
                                data={relatedData}
                                isProductItem
                                showItem={4}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                </MainLayout>
            </div>

            <MyFooter />
        </div>
    );
}

export default DetailProduct;
