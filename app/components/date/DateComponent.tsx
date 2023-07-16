export default function DateComponent() {
    let now = new Date();
    const month = now.toLocaleString('en-US', { month: 'short' });
    const day = now.getDate();
    return (
        <>
            <div className="float-left">
                <div className="flex flex-row">
                    <time className="border-2 border-blue-500 rounded-md inline-block relative w-10 h-10">
                        <span className="text-center leading-[1] block absolute w-full top-[1.4em] text-sm text-blue-500 font-bold">{ day}</span>
                        <span className="text-center leading-[1] font-sans uppercase bg-blue-500 text-white block absolute left-0 right-0 w-full h-[1em] top-0 text-[10px] pt-[3px] pb-[14px] font-bold">{ month}</span>
                    </time>
                    <h2 className="font-bold text-[40px] leading-[21px] text-gray-800 mt-2 ms-4">Today</h2>
                </div>
            </div>
        </>
    );
}