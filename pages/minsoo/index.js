import { useState, useEffect } from 'react';

export default function Home() {
    const [toast, setToast] = useState(0)

    const handleClick = async (e) => {
        e.preventDefault()

        document.querySelector('#submit').disabled = true;
        
        var form = document.getElementById("form");
        var elements = form.elements;
        for (var i = 0, len = elements.length; i < len; ++i) {
            elements[i].readOnly = true;
        }
        
        let date = document.querySelector('#date').value
        date = date.split('-')
        date = date[1] + '/' + date[2] + '/' + date[0]
        const category = document.querySelector('#category').value
        const note = document.querySelector('#note').value
        const amount = document.querySelector('#amount').value
        
        const apiResponse = await fetch("/api/minsoo_api", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date,
                note,
                category,
                amount,
            })
        });
        console.log(apiResponse.status)
        
        document.querySelector('#amount').value = ''
        document.querySelector('#note').value = ''
        for (var i = 0, len = elements.length; i < len; ++i) {
            elements[i].readOnly = false;
        }
        
        document.querySelector('#submit').disabled = false;

        if(apiResponse.status == 200) {
            setToast(1)
        } else {
            setToast(2)
        }
        setTimeout(() => {
            setToast(0)
        }, 1000)
    }

    const fillMetro = () => {
        document.querySelector('#category').value = 'transport'
        document.querySelector('#note').value = 'metro'
        document.querySelector('#amount').value = '2.90'
        document.querySelector('#date').value = new Date().toISOString().split('T')[0]
    }

    useEffect(() => {
        document.querySelector('#date').value = new Date().toISOString().split('T')[0]
    }, [])

    return (
        <main className="px-8 pt-8">
                <form id="form" onSubmit={handleClick} className='flex flex-col w-3/5 gap-2'>
                <div className='flex flex-wrap justify-between gap-2 my-1'>
                    <div className='flex flex-col flex-auto w-36'>
                        <label className='text-xs'>
                            Date
                        </label>
                        <input id="date" type="date" name="date" placeholder="Date" className='w-full h-10 border-2 rounded-md p-2 text-base'/>
                    </div>

                    <div className='flex flex-col flex-auto w-36'>
                        <label className='text-xs'>
                            Category
                        </label>
                        <select id="category" name="category" className='w-full h-10 border-2 rounded-md p-2 text-base'>
                            <option value="food">food</option>
                            <option value="transport">transport</option>
                            <option value="wants">wants</option>
                            <option value="etc">etc</option>
                        </select>
                    </div>

                    <div className='flex flex-col flex-auto w-36'>
                        <label className='text-xs'>
                            Amount
                        </label>
                        <input id="amount" type="number" step="0.01" name="amount" placeholder="$ x.xx" className='w-full h-10 border-2 rounded-md p-2 text-base'/>
                    </div>
                </div>

                <div className='flex flex-col flex-1 my-1'>
                    <label className='block text-xs'>
                        Note
                    </label>
                    <input id="note" type="text" name="note" placeholder="Describe transaction" className='w-full border-2 rounded-md p-2 text-base'/>
                </div>
                <button id="metro" onClick={fillMetro} type="button" className={'border-blue-300 border-2 hover:bg-blue-300 transition-colors flex-auto h-10 rounded-md p-1'}>metro 🚂</button>
                <button id="submit" type="submit" className={'bg-green-400 hover:bg-green-500 disabled:bg-gray-400 transition-colors flex-auto h-10 rounded-md p-1'}>Submit</button>
                <div>
                    {toast == 1 ? <p className='flex absolute bottom-1 right-1 items-center bg-green-400 w-32 h-10 rounded-md p-4 my-1'>Success</p> : null}
                    {toast == 2 ? <p className='flex absolute bottom-1 right-1 items-center bg-red-400 w-32 h-10 rounded-md p-4 my-1'>Failed</p> : null}
                </div>
            </form>
            
        </main>
    )
}