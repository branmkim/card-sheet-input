import { useState, useEffect } from 'react'

export default function Home() {
    const [toast, setToast] = useState(false)

    const handleClick = async (e) => {
        e.preventDefault()
        const date = document.querySelector('#date').value
        const card = document.querySelector('#card').value
        const amount = document.querySelector('#amount').value
        const note = document.querySelector('#note').value
        const apiResponse = await fetch("/api/hello", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date,
                card,
                amount,
                note
            })
        });
        console.log(apiResponse.status)
        document.querySelector('#form').reset()
        setToast(true)
        setTimeout(() => {
            setToast(false)
        }, 1000)
    }

    return (
        <main>
            <form id="form" onSubmit={handleClick} className='flex flex-col w-80%'>
                <div className='flex justify-between gap-2 my-1'>
                    <div className='flex-1 w-36'>
                        <label className='text-xs'>
                            Date
                        </label>
                        <input id="date" type="date" name="date" placeholder="Date" className='w-full h-10 border-2 rounded-md p-2 text-base'/>
                    </div>

                    <div className='flex-1 w-36'>
                        <label className='text-xs'>
                            Card
                        </label>
                        <select id="card" name="card" className='w-full h-10 border-2 rounded-md p-2 text-base'>
                            <option value="1">Capital One</option>
                            <option value="2">Prime</option>
                        </select>
                    </div>

                    <div className='flex-1 w-36'>
                        <label className='text-xs'>
                            Amount
                        </label>
                        <input id="amount" type="tel" name="amount" placeholder="$ x.xx" className='w-full h-10 border-2 rounded-md p-2 text-base'/>
                    </div>
                </div>

                <div className='flex-1 my-1'>
                    <label className='block text-xs'>
                        Note
                    </label>
                    <input id="note" type="text" name="note" placeholder="Describe transaction" className='w-full border-2 rounded-md p-2 text-base'/>
                </div>
                <button type="submit" className='bg-green-400 hover:bg-green-500 transition-colors flex-auto h-10 rounded-md p-1 my-1'>Submit</button>
                <div>
                    {toast ? <p className='flex absolute bottom-1 right-1 items-center bg-green-400 w-32 h-10 rounded-md p-2 my-1'>Success</p> : null}
                </div>
            </form>
            
        </main>
    )
}