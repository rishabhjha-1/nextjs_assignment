import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex h-full bg-gray-100 fixed">
      {/* Sidebar */}
      <div className="w-80 shadow-md p-[53.5px_20.5px] gap-[48px] rounded-tl-[12px] rounded-sm bg-[#F6F7F5]">
        <h2 className="text-2xl font-bold text-center mb-5">PopDop</h2>
        <nav>
          <ul className="space-y-2 mx-auto">
            <li className="flex justify-center items-center h-12 rounded-2xl hover:bg-[#D9D9D9]   hover:font-bold">
              <Link
                href="/"
                className="flex items-center  bg-transparent justify-center gap-1 "
              >
                <svg
                  width="23"
                  height="13"
                  viewBox="0 0 23 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 1.5H6.5C3.73858 1.5 1.5 3.73858 1.5 6.5C1.5 9.26142 3.73858 11.5 6.5 11.5H8.5C11.2614 11.5 13.5 9.26142 13.5 6.5M16 11.5H16.5C19.2614 11.5 21.5 9.26143 21.5 6.5C21.5 3.73858 19.2614 1.5 16.5 1.5H14.5C11.7386 1.5 9.5 3.73858 9.5 6.5"
                    stroke="#131313"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                home
              </Link>
            </li>
            <li className="flex justify-center items-center h-12 rounded-2xl  hover:bg-[#D9D9D9]   hover:font-bold">
              <Link
                href="/population"
                className="flex items-center  bg-transparent gap-1  justify-center"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5 21.5H6.7C5.57989 21.5 5.01984 21.5 4.59202 21.282C4.21569 21.0903 3.90973 20.7843 3.71799 20.408C3.5 19.9802 3.5 19.4201 3.5 18.3V3.5M7.5 11V18M12 6V18M16.5 11V18M21 6V18"
                    stroke="#131313"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                population
              </Link>
            </li>
            <li className="flex justify-center items-center h-12 rounded-2xl  hover:bg-[#D9D9D9]   hover:font-bold">
              <Link
                href="/about"
                className="flex items-center gap-1  bg-transparent justify-center "
              >
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 10.5001L10.5 15M10.5 7.16462V7.12507M1.5 16.125L1.5 4.87498C1.5 3.01103 3.01104 1.5 4.875 1.5L16.125 1.5C17.989 1.5 19.5 3.01103 19.5 4.87498L19.5 16.125C19.5 17.989 17.989 19.5 16.125 19.5H4.875C3.01104 19.5 1.5 17.989 1.5 16.125Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                about
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
