// 'use client';

export default function NotFound() {
    return (
        <div className='h-sh flex flex-col items-center justify-center w-1/2 sm:w-full xs:w-full lg:w-1/2 z-10'>
            <div id="notfound" className=" w-full">
                <div className="notfound w-full px-12">
                    <h1 className="mt-12">404</h1>
                    <h2>Oops! Page Not Be Found</h2>
                    <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
                </div>
            </div>
        </div>
    );
}
