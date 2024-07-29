import React, {useEffect, useState} from 'react';
import {MyH2} from "../../../06_shared/ui/headings";
import {Button, ESizes, EType} from "../../../05_entities/Buttons";
import {payment} from "../../../06_shared/assets";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {TPayment, useLazyGetCancelPaymentQuery, useLazyGetConfirmPaymentQuery} from "../../../05_entities/FetchData";
import 'ldrs/spiral';
import {useLangStore} from "../../../05_entities/LangInfo";
import {Loading} from "../../../06_shared/ui/loading";
import {useShopStore} from "../../../05_entities/ShopCart";

// Default values shown

type PaymentProps = {}

type TStatusCode = {
    status: number
}

export const Payment: React.FC<PaymentProps> = ({}) => {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const location = useLocation()

    const [params, setParams] =
        useState<TPayment>({} as TPayment)
    const [mainText, setMainText] =
        useState<string>('')

    const [triggerCancel,
        {data: cancelData, error:
            cancelError,
            isError: isCancelError, isLoading: isLoadingCancel}] =
        useLazyGetCancelPaymentQuery()
    const [triggerConfirm,
        {data: confirmData, error: confirmError,
            isError: isConfirmError, isLoading: isLoadingConfirm}] =
        useLazyGetConfirmPaymentQuery();

    const {content} = useLangStore()
    const {clearPurchase} = useShopStore()

    useEffect(() => {
        setParams({
            paymentId: searchParams.get('paymentId') ?? ''
        })
    }, [searchParams])

    useEffect(() => {
        if (params.paymentId && location.pathname === '/confirm-payment') {
            triggerConfirm({...params})
        }

        if (params.paymentId && location.pathname === '/cancel-payment') {
            triggerCancel({...params})
        }
    }, [params]);

    useEffect(() => {
        if (!isConfirmError) {
            setMainText(content.successPayment)
            clearPurchase()
        }

        if (confirmError && 'status' in confirmError) {
            const confCode = confirmError as TStatusCode
            if (confCode.status === 402) {
                setMainText(content.notSuccessPayment)
            }

            if (confCode.status !== 402) {
                setMainText(content.errorPayment)
            }
        }
    }, [confirmData, confirmError]);

    useEffect(() => {
        if (!isCancelError) {
            setMainText(content.cancelFavor)
        } else {
            setMainText(content.errorPayment)
        }
    }, [cancelData, cancelError]);

    return (
        <div className="flex w-full py-[25vh] relative overflow-hidden
        max-tb:flex-col max-tb:py-[0vw] max-tb:items-center max-tb:justify-center max-tb:gap-y-4">
            <div className="flex flex-col items-start gap-y-8
            max-tb:justify-center max-tb:items-center">
                {(isLoadingCancel || isLoadingConfirm)
                    ? <Loading/>
                    : <MyH2 styles="max-tb:ml-[3vw] max-tb:w-[60vw] max-tb:text-center">{mainText}</MyH2>}
                <div className="max-tb:hidden">
                    <Button size={ESizes.s} type={EType.blue}
                            onClick={(e) => navigate('/')}>
                        {content.backMain}
                    </Button>
                </div>
            </div>
            <img src={payment.visual} alt="Success payment"
                 className="absolute h-[90%] right-0 top-1/2 -translate-y-1/2
                 max-tb:relative max-tb:top-0 max-tb:translate-y-0 max-tb:h-[50%]"/>
            <div className="tb:hidden">
                <Button size={ESizes.s} type={EType.blue}
                        onClick={(e) => navigate('/')}>
                    {content.backMain}
                </Button>
            </div>
        </div>
    );
};