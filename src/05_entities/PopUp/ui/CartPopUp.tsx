import React, {useEffect, useRef, useState} from 'react';
import {MyH2} from "../../../06_shared/ui/headings";
import {MyInput} from "../../../06_shared/ui/input";
import {MyTextArea} from "../../../06_shared/ui/textarea";
import {Button, ESizes, EType} from "../../Buttons";
import {usePopUpStore} from "../model/usePopUpStore";
import {useShopStore} from "../../ShopCart";
import {useCreateOrderMutation} from "../../FetchData";
import f from "compose-function";
import {Navbar, NavbarAdaptive} from "../../Navbar";
import {useLangStore} from "../../LangInfo";
import {Loading} from "../../../06_shared/ui/loading";

type CartPopUpProps = {}

type fieldContent = {
    data: string,
    isError: boolean
    textError: string
}

export const CartPopUp: React.FC<CartPopUpProps> = ({}) => {
    const popUpRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const {isActiveCart, setIsActiveCart} = usePopUpStore()
    const {purchases} = useShopStore()
    const {content} = useLangStore()

    const [createOrder,
        {data, isError,
            error, isLoading}] = useCreateOrderMutation()

    const [first_name, setFirst_name] = useState<fieldContent>({} as fieldContent)
    const [last_name, setLast_name] = useState<fieldContent>({} as fieldContent)
    const [phone, setPhone] = useState<fieldContent>({} as fieldContent)
    const [email, setEmail] = useState<fieldContent>({} as fieldContent)
    const [comment, setComment] = useState<fieldContent>({} as fieldContent)

    const handleHiddenDisplay = (e: React.MouseEvent<HTMLDivElement>) => {
        if (formRef.current && popUpRef.current && !formRef.current.contains(e.target as Node)) {
            popUpRef.current.style.display = 'none'
            setIsActiveCart(false)
        }
    };

    useEffect(() => {
        if (isError && error && 'data' in error && typeof error.data === 'object' && error.data) {
            type ErrorDetails = {
                details?: string
            }

            const errDetails = error.data as ErrorDetails

            if (errDetails && errDetails.details) {
                setComment(prevState =>
                    ({...prevState, isError: true, textError: errDetails.details ?? ''}))
            }

            type ErrorData = {
                first_name?: string[]
                last_name?: string[]
                phone?: string[]
                email?: string[]
            }

            const errorData = error.data as ErrorData

            if (errorData.first_name && Array.isArray(errorData.first_name) && errorData.first_name.length > 0) {
                setFirst_name(prevState => ({
                    ...prevState,
                    isError: true,
                    textError: errorData.first_name![0]
                }));
            }

            if (errorData.last_name && Array.isArray(errorData.last_name) && errorData.last_name.length > 0) {
                setLast_name(prevState => ({
                    ...prevState,
                    isError: true,
                    textError: errorData.last_name![0]
                }));
            }

            if (errorData.phone && Array.isArray(errorData.phone) && errorData.phone.length > 0) {
                setPhone(prevState => ({
                    ...prevState,
                    isError: true,
                    textError: errorData.phone![0]
                }));
            }

            if (errorData.email && Array.isArray(errorData.email) && errorData.email.length > 0) {
                setEmail(prevState => ({
                    ...prevState,
                    isError: true,
                    textError: errorData.email![0]
                }));
            }
        }
    }, [error]);

    useEffect(() => {
        if (isActiveCart && popUpRef.current)
            popUpRef.current.style.display = 'flex'
    }, [isActiveCart]);

    useEffect(() => {
        if (data) {
            window.location.href = data.approval_url
        }
    }, [data]);

    const handleCreateOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const fetchOrder = {
            "photo": "e0b0938f-4940-42db-8c60-df00d4cb6e2f",
            "service": 2,
            "amount": 2
        }

        type TOrder = typeof fetchOrder

        let orders: TOrder[] = []

        Object.keys(purchases).forEach(purKey => {
            Object.keys(purchases[purKey].services).forEach(serKey => {
                orders = [...orders, {
                    photo: purKey,
                    service: parseInt(serKey),
                    amount: purchases[purKey].services[parseInt(serKey)]
                }]
            })
        })

        createOrder({
            comment: comment.data,
            email: email.data,
            first_name: first_name.data,
            last_name: last_name.data,
            phone: phone.data,
            orders: orders.filter(order => order.amount !== 0)
        })
    };

    return (
        <div className={`fixed z-50 bg-black/[0.5] w-full h-full justify-center items-center ${isActiveCart ? 'flex' : 'hidden'}`}
             onClick={handleHiddenDisplay}
             ref={popUpRef}
        >
            <form className="flex flex-col bg-white px-10 py-5 rounded-3xl gap-y-3 relative overflow-hidden
            max-tb:w-full max-tb:h-full max-tb:rounded-none max-tb:p-0"
                  onSubmit={(e) => e.preventDefault()}
                  ref={formRef}
            >
                {isLoading &&
                    <div className="absolute z-20 top-0 left-0
                    w-full h-full bg-white/[0.45] flex justify-center items-center">
                        <Loading/>
                    </div>}
                <div className="tb:hidden w-full">
                    <Navbar isActiveCart/>
                    <NavbarAdaptive/>
                </div>
                <div className="max-tb:px-[5vw] flex flex-col gap-y-3
                max-ph:gap-y-1">
                    <div className="flex justify-center mb-2">
                        <MyH2 styles="text-[26px] uppercase text-center text-center !leading-[30.98px] !w-[28vw]
                                    max-tb:my-6
                                    max-ph:pl-0 max-ph:text-[24px]">
                            {content.provideContacts} {content.data}
                        </MyH2>
                    </div>
                    <div className="flex flex-col gap-y-3 max-tb:gap-y-3
                    max-ph:gap-y-2">
                        <MyInput placeholder={content.yourName}
                                 isError={first_name.isError} textError={first_name.textError}
                                 onChange={(e) =>
                                     setFirst_name(prevState =>
                                         ({...prevState, data: e.target.value, isError: false}))}/>
                        <MyInput placeholder={content.yourSurname}
                                 isError={last_name.isError} textError={last_name.textError}
                                 onChange={(e) =>
                                     setLast_name(prevState =>
                                         ({...prevState, data: e.target.value, isError: false}))}/>
                        <MyInput placeholder={content.yourPhone}
                                 isError={phone.isError} textError={phone.textError}
                                 onChange={(e) =>
                                     setPhone(prevState =>
                                         ({...prevState, data: e.target.value, isError: false}))}/>
                        <MyInput placeholder={content.yourEmail}
                                 isError={email.isError} textError={email.textError}
                                 onChange={(e) =>
                                     setEmail(prevState =>
                                         ({...prevState, data: e.target.value, isError: false}))}/>
                        <MyTextArea placeholder={content.yourComments}
                                    isError={comment.isError}
                                    textError={comment.textError}
                                    onChange={(e) =>
                                        setComment(prevState =>
                                            ({...prevState, data: e.target.value, isError: false}))}/>
                    </div>
                    <div className="flex justify-center mt-6 gap-x-3">
                        <Button size={ESizes.s} type={EType.border} onClick={() => {
                            setIsActiveCart(false)
                            popUpRef.current!.style.display = 'none'
                        }}>
                            {content.back}
                        </Button>
                        <Button size={ESizes.s} type={EType.blue} onClick={handleCreateOrder}
                                styles={"max-ph:!px-4"}
                        >
                            {content.goToPay}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};