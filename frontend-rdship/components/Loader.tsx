const Loader = () => {
    return (
        <div className="loader-container flex flex-col items-center justify-center h-screen w-full bg-[#ffffff80] z-[100] fixed top-0 left-0 ">
            <div className="loader flex flex-col items-center justify-center">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-[red] border-r-[transparent] border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"></div>
                <div className="mt-2.5 text-primary text-lg text-[red]">&nbsp; Loading...</div>
            </div>
        </div>
    )
}

export default Loader;