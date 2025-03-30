import CountdownTimer from '@components/CountdownTimer/CountdownTimer';
import styles from '../styles.module.scss';
import Button from '@components/Button/Button';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Banner() {
    const {
        containerBanner,
        contentBox,
        title,
        boxBtn,
        countDownBox,
        BannerItem
    } = styles;
    const targetDate = '2025-12-31T00:00:00';

    const images = [
        'https://pos.nvncdn.com/f2fe44-24897/bn/20240819_srR7m5MK.gif',
        'https://pos.nvncdn.com/f2fe44-24897/bn/20231111_IYVBO4f7.png',
        'https://pos.nvncdn.com/f2fe44-24897/bn/20231017_qyjMDBbk.jpeg',
        'https://pos.nvncdn.com/f2fe44-24897/bn/20230502_pbXVPyhe.png',
        'https://pos.nvncdn.com/f2fe44-24897/bn/20240819_srR7m5MK.gif'
    ];

    return (
        <>
            <div className={containerBanner}>
                <Carousel
                    showArrows={true} // Hiển thị mũi tên điều hướng
                    showThumbs={true} // Hiển thị thumbnails
                    showStatus={false} // Ẩn trạng thái (ví dụ: 1/5)
                    infiniteLoop={true} // Lặp vô hạn
                    autoPlay={true} // Tự động chạy
                    interval={3000} // Chuyển slide sau 3 giây
                    stopOnHover={true} // Dừng khi hover
                    emulateTouch={true} // Hỗ trợ swipe trên desktop
                    dynamicHeight={false} // Đặt chiều cao cố định (tùy chọn)
                >
                    {images.map((image, index) => (
                        <div key={index}>
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className={BannerItem}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </>
    );
}

export default Banner;
