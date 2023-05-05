import { useEffect, useState } from 'react';
import { axiosInstance as axios } from '../config/AxiosConfig';
import { IContractFilter } from "../models/interfaces/contract/IContractFilter";
import { IContractPage } from "../models/interfaces/contract/IContractPage";
import { BASE_CONTRACT_URL, DEFAULT_PAGE } from '../constants/GlobalConstants';
import { formToJSON } from 'axios';

export const useFetchPage = (refreshCounter: number, filter: IContractFilter, id: number) => {
    const [page, setPage] = useState<IContractPage>(DEFAULT_PAGE);
    useEffect(() => {
        fetchPage();
    }, [refreshCounter, filter]);

    const fetchPage = () => {

        const loadPage = async () => {
            const result = await axios.post(BASE_CONTRACT_URL + id + '/page', JSON.stringify(filter))
                .then(response => {

                    setPage(response.data)

                })
                .catch(error => console.log(error))
        }
        loadPage();
        return page;
    }
    return page;
}

export const useEdit = () => {
    let serverResponse = '';

    const editContract = async (id: number, role: FormData) => {
        const updateUrl = BASE_CONTRACT_URL + id;

        const result = await axios.put(updateUrl, formToJSON(role))
            .then(response => {
            })
            .catch(error => {
                console.log(error)
                if (error.response) {
                    console.log(error)
                    serverResponse = error.response.data;
                }
            })
        return serverResponse;
    }
    return editContract;
}