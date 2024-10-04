import { Heart, LucideShoppingCart } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="z-20 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center whitespace-nowrap text-2xl font-semibold">
            StudCommerce
          </span>
        </a>
        <div className="flex gap-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <div className="flex gap-4">
            <Link href="/favourites">
              <button
                type="button"
                className="relative inline-flex items-center rounded-lg bg-neutral-200 p-3 text-center text-black focus:outline-none focus:ring-4"
              >
                <Heart />
              </button>
            </Link>

            <Link href="/cart">
              <button
                type="button"
                className="relative inline-flex items-center rounded-lg bg-neutral-200 p-3 text-center text-black focus:outline-none focus:ring-4"
              >
                <LucideShoppingCart />
                <span className="sr-only">Notifications</span>

                <div
                  className={`absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-primary text-xs font-bold text-white`}
                >
                  20
                </div>
              </button>
            </Link>
          </div>

          <button
            type="button"
            className="rounded-lg bg-primary px-4 py-2 text-center font-bold text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Log out
          </button>

          <div>Image</div>

          {/* <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button> */}
        </div>

        {/* <div
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse">
            <li>
              <a
                href="#"
                className="block rounded bg-primary px-3 py-2 text-white md:bg-transparent md:p-0"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent"
              >
                Contact
              </a>
            </li>
          </ul>
        </div> */}

        <form>
          <input
            className="p-3"
            type="text"
            name="search"
            id="search"
            placeholder="Search for anything"
          />
        </form>
      </div>
    </nav>
  );
};

export default Header;
