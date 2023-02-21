export default function Pagination() {
  return (
    <div className="bg-gray-50 mt-7.5 py-3 flex items-center justify-between">
      <div className="mb:flex justify-between w-full">
        <div className="flex">
          <p className="font-OpenSansRegular flex items-center text-grey-150 text-ft14">
            Show{" "}
            <span className="font-OpenSansSemiBold text-black-50 font-semibold">
              &nbsp;1&nbsp;
            </span>{" "}
            to{" "}
            <span className="font-OpenSansSemiBold text-black-50 font-semibold">
              &nbsp;5&nbsp;
            </span>{" "}
            of{" "}
            <span className="font-OpenSansSemiBold text-black-50 font-semibold">
              &nbsp;50&nbsp;
            </span>
          </p>
          <a
            href="#"
            className="z-10 bg-white ml-10pe gap-x-1.5 w-16 rounded-xsm shadow-sm relative inline-flex items-center px-2 py-1 font-OpenSansSemiBold text-black-50 font-semibold"
          >
            5
            <img src="images/arrow.png" />
          </a>
        </div>
        <div className="shadow-sm mt-7.5pe mb:mt-0">
          <nav className="relative z-0 inline-flex" aria-label="Pagination">
            <a
              href="#"
              className="relative rounded-l-xsm inline-flex items-center px-2 py-2 border-r border-grey-50 bg-white "
            >
              <span className="sr-only">Previous</span>
              <img className="h-6 w-4" src="images/left-arrow.png" />
            </a>

            <a
              href="#"
              aria-current="page"
              className="z-10 bg-white relative inline-flex items-center px-4 py-2 text-grey-150 text-ft14"
            >
              1
            </a>
            <a
              href="#"
              className="z-10 bg-white relative inline-flex items-center px-4 py-2 text-grey-150 text-ft14"
            >
              2
            </a>
            <a
              href="#"
              className="z-10 bg-white relative inline-flex items-center px-4 py-2 text-grey-150 text-ft14"
            >
              3
            </a>
            <span className="z-10 bg-white relative inline-flex items-center px-4 py-2 text-grey-150 text-ft14">
              ...
            </span>

            <a
              href="#"
              className="relative inline-flex rounded-r-xsm items-center px-2 py-2  border-l border-grey-50 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <img className="h-6 w-4" src="images/right-arrow.png" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
