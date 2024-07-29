import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

type TProperties = {
    companyName: string
    portfolio: string
    favors: string
    contacts: string
    facebook: string
    more: string
    subscribe: string
    prices: string
    schedule: string
    ourContacts: string
    privacy: string
    allRightSecure: string
    addCart: string
    delCart: string
    continueView: string
    makeFavor: string
    choose: string
    formatPhoto: string
    cart: string
    name: string
    format: string
    price: string
    count: string
    totalPrice: string
    back: string
    notFoundFavors: string
    warningChooseFormat: string
    confirmFavor: string
    emptyCart: string
    total: string
    goToPay: string
    provideContacts: string
    data: string
    yourName: string
    yourSurname: string
    yourPhone: string
    yourEmail: string
    yourComments: string
    backMain: string
    notFoundPage: string
    successPayment: string
    notSuccessPayment: string
    errorPayment: string
    cancelFavor: string
    goToCart: string
    checkOut: string
    cookieTitle: string
    cookieParagraph: string
    morePrivacyPolitic: string
    agreeAndClose: string
    noEndingOrder: string
    continueWorkInThisAlbum: string
    justBack: string
    continueHere: string
}

type State = {
    content: TProperties
}

type Actions = {
    setLang: (lang: string) => void
}

export const useLangStore = create<State & Actions>()(
    devtools(
        persist(
            (set) => ({
                content: {} as TProperties,
                setLang: (lang) => set(state => {
                    if (lang === 'ru')
                        return {
                            content: {
                                companyName: 'школьный фотобанк',
                                portfolio: 'Портфолио',
                                contacts: 'Контакты',
                                favors: 'Услуги',
                                facebook: 'Мы на Facebook',
                                more: 'Показать ещё',
                                subscribe: 'Подписаться',
                                prices: 'Цены и услуги',
                                schedule: 'График',
                                ourContacts: 'Наши контакты',
                                privacy: 'Политика конфиденциальности',
                                allRightSecure: '2024 © Все права защищены',
                                addCart: 'Добавить в корзину',
                                delCart: 'Убрать из корзины',
                                choose: 'Выберите желаемый',
                                formatPhoto: 'формат фотографии',
                                continueView: 'Продолжить просмотр',
                                makeFavor: 'Заказать фотосессию',
                                cart: 'Корзина',
                                count: 'Количество',
                                format: "Формат",
                                price: 'Цена',
                                name: 'Название',
                                totalPrice: 'Общая цена',
                                back: 'Вернуться назад',
                                notFoundFavors: 'Заказов пока не найдено',
                                warningChooseFormat: 'Выберите желаемый формат фотографии!',
                                confirmFavor: 'Подтвердить заказ',
                                emptyCart: 'Корзина пока пустая',
                                total: 'Итого',
                                goToPay: 'Перейти к оплате',
                                data: 'данные',
                                provideContacts: 'Укажите контактные',
                                yourName: 'Имя ученика',
                                yourSurname: 'Фамилия ученика',
                                yourPhone: 'Ваш телефон, например, +372-xxxx-xxxx',
                                yourEmail: 'Ваш e-mail',
                                yourComments: 'Пожелания',
                                backMain: 'Вернуться на главную',
                                notFoundPage: 'Страница не найдена',
                                notSuccessPayment: 'Оплата не прошла',
                                cancelFavor: 'Заказ отменён',
                                errorPayment: 'Упс, что-то пошло не так...',
                                successPayment: 'Оплата прошла успешно',
                                goToCart: 'Вернуться в корзину',
                                checkOut: 'Оформить заказ',
                                agreeAndClose: 'Принять и закрыть',
                                continueHere: 'ПРОДОЛЖИТЬ ЗДЕСЬ',
                                continueWorkInThisAlbum: "ЖЕЛАЕТЕ ПРОДОЛЖИТЬ В ЭТОМ АЛЬБОМЕ И ВЕРНУТЬСЯ?",
                                cookieParagraph: `Этот сайт использует файлы cookie для хранения данных.
                                Продолжая использовать сайт, вы даёте согласие на работу с этими файлами.`,
                                cookieTitle: 'файлы cookies',
                                justBack: 'ВЕРНУТЬСЯ',
                                morePrivacyPolitic: 'Подробности о нашей политике конфиденциальности',
                                noEndingOrder: "У ВАС ЕСТЬ НЕ ЗАКОНЧЕННЫЙ ЗАКАЗ В АЛЬБОМЕ "
                            }
                        }

                    // ee
                    return {
                        content: {
                            companyName: 'kooli fotopank',
                            portfolio: 'Portfell',
                            contacts: 'Kontaktid',
                            favors: 'Teenused',
                            facebook: 'Oleme Facebookis',
                            more: 'Näita rohkem',
                            subscribe: 'Telli',
                            prices: 'Hinnad ja teenused',
                            schedule: 'Ajakava',
                            ourContacts: 'Meie kontaktid',
                            privacy: 'Privaatsuspoliitika',
                            allRightSecure: '2024 © Kõik õigused kaitstud',
                            addCart: "Lisa ostukorvi",
                            delCart: "Eemalda ostukorvist",
                            choose: 'Valige see, mida vajate',
                            formatPhoto: 'foto formaat',
                            continueView: 'Jätkake sirvimist',
                            makeFavor: 'Telli fotosessioon',
                            cart: 'Korv',
                            count: 'Kogus',
                            format: "Vorming",
                            price: 'Hind',
                            name: 'Eesnimi',
                            totalPrice: 'Koguhind',
                            back: 'Tagasi',
                            notFoundFavors: 'Tellimusi pole veel leitud',
                            warningChooseFormat: 'Valige oma eelistatud fotoformaat!',
                            confirmFavor: 'Kinnitage tellimus',
                            emptyCart: 'Korv on veel tühi',
                            total: 'Kokku',
                            goToPay: 'Mine makse juurde',
                            data: 'andmeid',
                            provideContacts: 'Palun andke kontaktandmed',
                            yourName: 'Õpilase nimi',
                            yourSurname: 'Õpilase perekonnanimi',
                            yourPhone: 'Teie telefon, näiteks +372-xxxx-xxxx',
                            yourEmail: 'Sinu email',
                            yourComments: 'Ometi meie',
                            backMain: 'Minge tagasi avalehele',
                            notFoundPage: 'lehte ei leitud',
                            notSuccessPayment: 'Makse ebaõnnestus',
                            cancelFavor: 'Tellimus tühistatud',
                            errorPayment: 'Hmm! Midagi läks valesti...',
                            successPayment: 'Makse sooritamine õnnestus',
                            goToCart: 'Tagasi ostukorvi',
                            checkOut: 'Kontrollimine',
                            agreeAndClose: 'Nõustuge ja sulgege',
                            continueHere: 'JÄTKAKE SIIN',
                            continueWorkInThisAlbum: "KAS TAHAD SELLE ALBUMIGA JÄTKATA JA TAGASI TULLA?",
                            cookieParagraph: `See sait kasutab andmete salvestamiseks küpsiseid.
                                 Saidi kasutamist jätkates nõustute nende failide kasutamisega.`,
                            cookieTitle: 'küpsised',
                            justBack: 'TAGASI',
                            morePrivacyPolitic: 'Üksikasjad meie privaatsuspoliitika kohta',
                            noEndingOrder: "TEIE ALBUMIS ON LÕPETAMATA TELLIMUS "
                        }
                    }
                })
            }), {name: 'useLangStore'}
        )
    )
)