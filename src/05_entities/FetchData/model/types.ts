const fetchMainInfo = {
    "service_disclaimer": [
        "Вариант оформления фото класса выбирается до фотографирования.",
        "Готовые фото класса предоставляются в электронном виде классному руководителю для проверки.",
        "Образцы портретов и фото с друзьями будут предоставлены в электронном виде через классного руководителя."
    ],
    "title": "ФОТОСЕССИИ В ТАЛЛИНЕ",
    "description": "Ваши школьные моменты, запечатленные профессиональным фотографом",
    "title_for_about": "Хотите узнать о нас больше?",
    "subtitle_for_about": "Много интересного у нас в Instagram",
    "services": [
        {
            "id": 1,
            "title": "Фото в дигитальном виде",
            "description": "Фото в цифровом формате без сжатия",
            "price": "3.00",
            "photo_type": 1
        },
        {
            "id": 2,
            "title": "Фото в дигитальном виде",
            "description": "Фото в цифровом формате без сжатия",
            "price": "3.00",
            "photo_type": 3
        },
        {
            "id": 3,
            "title": "Фото в дигитальном виде",
            "description": "Фото в цифровом формате без сжатия",
            "price": "3.00",
            "photo_type": 4
        },
        {
            "id": 4,
            "title": "Портрет Малый",
            "description": "Портрет формата А6 (10х15)",
            "price": "1.50",
            "photo_type": 1
        },
        {
            "id": 5,
            "title": "Портрет Средний",
            "description": "Формат А5 (15х21)",
            "price": "3.00",
            "photo_type": 1
        },
        {
            "id": 6,
            "title": "Портрет Большой",
            "description": "Портрет формата А4 (21х30)",
            "price": "5.00",
            "photo_type": 1
        },
        {
            "id": 7,
            "title": "Фото с другом",
            "description": "Фото с другом (обычный размер 10х15)",
            "price": "2.00",
            "photo_type": 3
        },
        {
            "id": 8,
            "title": "Фото класса большое",
            "description": "Формат А4 (21х30)",
            "price": "5.00",
            "photo_type": 2
        },
        {
            "id": 9,
            "title": "Фото класса малое",
            "description": "Формат А5 (15х21)",
            "price": "3.00",
            "photo_type": 2
        }
    ],
    "info": {
        "email": "fotolife.school@gmail.com",
        "phone": "+37258256779",
        "text": "PHOTOBOUTIQUE OU Reg №: 12430562\r\nEE491010220236822220 \r\nTallinn, 10113",
        "privacy_policy": "/media/privacy_policy/privacy_policy.pdf",
        "facebook": "https://www.facebook.com/FotolifeSchool",
        "instagram": "https://www.instagram.com/fotolife_sport/",
        "geo_location": "https://www.google.com/maps?q=59.437,24.7535"
    },
    "language_code": "ru"
}

export type TMainInfo = typeof fetchMainInfo

const fetchGalleryPortfolioPhotoType = {
    "id": 2,
    "title": "Фото с классом",
    "code": "foto-s-klassom"
}

export type TGalleryPortfolioPhotoType = typeof fetchGalleryPortfolioPhotoType

const fetchListGalleryPortfolio = {
    "count": 3,
    "next": "http://194.50.153.7/api/v1/main/portfolio?page=2&page_size=1&photo_type=1",
    "previous": null,
    "results": [
        {
            "file": "http://194.50.153.7/media/portfolio/69402812_425435891410974_1297674394249272001_n.jpg",
            "photo_type": 1
        }
    ]
}

export type TListGalleryPortfolio = typeof fetchListGalleryPortfolio

const fetchListGalleryAlbum = {
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": "5b1b2152-c612-4000-950b-cad6ffab7a75",
            "file": "http://194.50.153.7/media/1-a/75225417_795849997557235_7038620346691507837_n.jpg"
        }
    ]
}

export type TListGalleryAlbum = typeof fetchListGalleryAlbum

const fetchGalleryAlbumPhotoTypes = {
    "title": "1 А",
    "photo_types": [
        {
            "id": 1,
            "title": "Портрет",
            "code": "portert"
        }
    ]
}

export type TGalleryAlbumPhotoTypes = typeof fetchGalleryAlbumPhotoTypes

const fetchShopService = {
    "id": 2,
    "title": "Фото с классом",
    "description": "Формат А4 (21х30)",
    "price": "3.00",
    "photo_type": 2
}

export type TShopService = typeof fetchShopService

const fetchOrder = {
    "first_name": "Denis",
    "last_name": "Duginov",
    "phone": "+372 799 2222",
    "email": "denisduginov17@gmail.com",
    "comment": "test",
    "orders": [
        {
            "photo": "e0b0938f-4940-42db-8c60-df00d4cb6e2f",
            "service": 2,
            "amount": 2
        }
    ]
}

export type TOrder = typeof fetchOrder

const fetchResponseCreateOrder = {
    "id": "ec9baf27-26e8-4b07-93a5-bc9e759a64d1",
    "first_name": "Denis",
    "last_name": "Duginov",
    "phone": "+3727992222",
    "email": "denisduginov17@gmail.com",
    "approval_url": "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-81L352064E382711P"
}

export type TRespCreateOrder = typeof fetchResponseCreateOrder

export type TPayment = {
    paymentId: string
}

const fetchLanguageCode = {
    "language_code": "ru"
}

export type TRespLanguageCode = typeof fetchLanguageCode

const fetchAlbumUploadPhoto = {
    "title": "Test2",
    "photo_types": [
        {
            "id": 1,
            "title": "Портерт",
            "code": "portert"
        },
        {
            "id": 3,
            "title": "Календарь",
            "code": "kalendar"
        },
        {
            "id": 2,
            "title": "Фото класса",
            "code": "foto-s-klassom"
        },
        {
            "id": 4,
            "title": "Фото с другом",
            "code": "foto-s-drugom"
        },
        {
            "id": 5,
            "title": "Репортаж",
            "code": "reportazh"
        }
    ]
}

export type TRespAlbumUploadPhoto = typeof fetchAlbumUploadPhoto

const reqUploadAlbumPhotos = {
    "album": "2b92aaab-ec06-4ccf-8e18-3aafd956d108",
    "photo_type": "2",
    "files": ["/9j/4AAQSkZJRgABAQEBLAEsAAD"]
}

export type TReqUploadAlbumPhotos = typeof reqUploadAlbumPhotos

export type TSchedule = {
    period: string
    date: string
    comment: string
    title: string
}