
export const UserSkeleton = () => {
    return (
        <div className='animate-pulse flex flex-col items-center gap-2.5 mb-4'>
            <div className='w-32 h-32 ring-1 ring-offset-4 rounded-full bg-slate-200'></div>
            <span className='w-32 h-3 rounded-xl bg-slate-200'></span>
            <h2 className='w-64 h-3 rounded-xl bg-slate-200'></h2>
        </div>
    )
}