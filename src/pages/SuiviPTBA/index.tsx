import React, { useEffect } from 'react'
import usePageLooper from '../../contexts/PageLooper/hook';
import Component from './Component';
import { PAGE_T } from '../../types';

export default () => {
    const { addPages, ptba_ziboData } = usePageLooper();

    useEffect(() => {
        const newPages: PAGE_T[] = ptba_ziboData.map((value, index) => {
            return {
                id: `ptba-zibo-${index}`,
                component: <Component data={value} />,
                duration: 50000,
                preload: true
            }
        })

        addPages(newPages, 'PTBA_ZIBO');
    }, [ptba_ziboData])

    return (null)
}
