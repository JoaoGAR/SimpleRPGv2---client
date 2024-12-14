import './jobQueueInfo.css'
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Axios from 'axios';
import { ToastContainer, toast, Flip } from 'react-toastify';

const JobQueueInfo = ({ queue, listQueue, setListQueue, openRewardsDialog, setCharacter }) => {

    const job = queue.job;

    const handleClickGetRewwards = async (queueId) => {
        try {
            const response = await Axios.post('http://localhost:3001/api/job/finish', {
                queueId: queueId,
            });
            const { jobResult, status, message, travellingId, character } = response.data;

            if (status === 200) {
                setListQueue((prevListQueue) =>
                    prevListQueue.filter((value) => value.id !== queueId)
                );

                if (travellingId) {
                    setListQueue((prevListQueue) =>
                        prevListQueue.filter((value) => value.id !== travellingId)
                    );
                }

                openRewardsDialog(jobResult);
                setCharacter(character);

                toast.success('Trabalho concluído, recompensas adicionadas ao seu inventário.', {
                    position: 'top-right',
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    transition: Flip,
                });
            }

            if (status === 401) {
                toast.warning(`${message}`, {
                    position: 'top-right',
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Flip,
                });
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleClickDismissJob = async (queueId) => {
        try {
            const response = await Axios.post('http://localhost:3001/api/job/dismiss', {
                queueId: queueId,
            });
            const { status, message, travellingId } = response.data;

            if (status === 200) {
                setListQueue((prevListQueue) =>
                    prevListQueue.filter((value) => value.id !== queueId)
                );

                if (travellingId) {
                    setListQueue((prevListQueue) =>
                        prevListQueue.filter((value) => value.id !== travellingId)
                    );
                }

                toast.info('Trabalho removido da fila.', {
                    position: 'bottom-center',
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    transition: Flip,
                });
            }

            if (status === 401) {
                toast.warning(`${message}`, {
                    position: 'bottom-center',
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Flip,
                });
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div key={queue.id} className='row'>
            <div className='job-queue-info'>
                <div className='ribbon'><h2 className='text-uppercase'>{job.name}</h2></div>
                <div className='col-12 description'>
                    {job.description}
                </div>
                <div className='col-12 status'>
                    <span>Termina em: {dayjs(queue.endAt).format('DD/MM/YYYY HH:mm:ss')}</span>
                </div>
                <div className='row'>
                    {queue.jobId !== 1 ? (
                        <div className='col-12 d-flex justify-content-center'>
                            <div className='btn-group'>
                                <button type='button' className='btn btn-success' disabled={!(queue.jobStatus == 2)} onClick={() => handleClickGetRewwards(queue.id)}>Recompensas</button>
                                <button type='button' className='btn btn-danger' disabled={(queue.jobStatus == 2)} onClick={() => handleClickDismissJob(queue.id)}>Encerrar</button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
export default JobQueueInfo;